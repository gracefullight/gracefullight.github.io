import { Icon } from "@iconify/react";
import { useQuery } from "@tanstack/react-query";
import Layout from "@theme/Layout";
import { useLocalStorageState } from "ahooks";
import { useState } from "react";

export type Phonetic = { text?: string; audio?: string };
export type Definition = {
  definition: string;
  example?: string;
  synonyms?: string[];
  antonyms?: string[];
};
export type Meaning = { partOfSpeech: string; definitions: Definition[] };
export type DictResult = {
  word: string;
  phonetic?: string;
  phonetics?: Phonetic[];
  origin?: string;
  meanings?: Meaning[];
  error?: boolean;
} | null;

export default function DictionaryPage() {
  const [term, setTerm] = useState("");
  const [lastSearch, setLastSearch] = useState<string>("");
  const [recentSearches, setRecentSearches] = useLocalStorageState<string[]>(
    "recentSearches",
    {
      defaultValue: [],
    },
  );
  const queryResult = useQuery<DictResult, Error>({
    enabled: lastSearch.length >= 2,
    queryFn: async () => {
      const res = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(lastSearch)}`,
      );
      if (!res.ok) throw new Error("검색 결과가 없습니다.");
      const data: unknown = await res.json();
      if (
        Array.isArray(data) &&
        data.length > 0 &&
        typeof data[0] === "object" &&
        data[0] !== null &&
        "word" in data[0]
      ) {
        return data[0] as DictResult;
      }
      throw new Error("검색 결과가 없습니다.");
    },
    queryKey: ["dictionary", lastSearch],
    retry: false,
  });

  const search = (rawQuery: string) => {
    const trimmedQuery = rawQuery.trim();
    if (trimmedQuery.length < 2) {
      alert("검색어는 최소 2글자 이상 입력해주세요.");
      return;
    }
    if (!/^[A-Za-z\s-]*$/.test(trimmedQuery)) {
      alert("알파벳, 대시(-), 공백만 허용합니다.");
      return;
    }
    const updatedSearches = [
      trimmedQuery,
      ...(recentSearches?.filter((t) => t !== trimmedQuery) ?? []),
    ].slice(0, 5);

    setLastSearch(trimmedQuery);
    setRecentSearches(updatedSearches);
  };

  const playAudio = (url: string) => {
    const audio = new Audio(url.startsWith("//") ? `https:${url}` : url);
    audio.play();
  };

  const dictResult = queryResult.data;
  const loading = queryResult.isFetching;

  return (
    <Layout>
      <div style={{ padding: "2.5rem" }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void search(term);
          }}
          style={{ display: "flex", gap: "0.25rem", marginBottom: "0.5rem" }}
        >
          <input
            aria-label="영어 단어 검색"
            disabled={loading}
            minLength={2}
            onChange={(e) => setTerm(e.target.value)}
            pattern="[A-Za-z\s-]*"
            placeholder="검색어를 입력하세요"
            style={{
              border: "1px solid #f49f3f",
              borderRadius: "0.25rem",
              flexGrow: 1,
              padding: "0.5rem 1rem",
            }}
            title="알파벳, 대시(-), 공백만 허용합니다. 최소 2글자 이상 입력해주세요."
            type="text"
            value={term}
          />
          <button
            disabled={loading}
            style={{
              background: "#f49f3f",
              border: 0,
              borderRadius: "0.25rem",
              color: "white",
              cursor: "pointer",
              opacity: loading ? 0.7 : 1,
              padding: "0.5rem 1rem",
            }}
            type="submit"
          >
            검색하기
          </button>
        </form>
        <div style={{ marginBottom: "1.5rem" }}>
          {recentSearches?.map((term) => (
            <button
              key={term}
              onClick={() => {
                void search(term);
              }}
              onKeyDown={async (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  await search(term);
                }
              }}
              style={{
                background: "white",
                border: "1px solid #f28913",
                borderRadius: "0.25rem",
                color: "#f28913",
                cursor: "pointer",
                font: "inherit",
                margin: "0.25rem",
                padding: "0.25rem 0.5rem",
              }}
              tabIndex={0}
              type="button"
            >
              {term}
            </button>
          ))}
        </div>

        {/* 사전 검색 결과 영역 */}
        <div style={{ marginBottom: "2rem" }}>
          {loading && (
            <div style={{ color: "#888", marginBottom: "1rem" }}>
              검색 중...
            </div>
          )}
          {dictResult && !queryResult.isError && (
            <div
              style={{
                background: "#fff8f0",
                border: "1px solid #f49f3f",
                borderRadius: "0.5rem",
                boxShadow: "0 2px 8px rgba(244,159,63,0.08)",
                marginBottom: "1.5rem",
                maxWidth: 600,
                padding: "1.5rem",
              }}
            >
              <div
                style={{
                  alignItems: "center",
                  display: "flex",
                  gap: "0.5rem",
                  marginBottom: "0.5rem",
                }}
              >
                <span style={{ fontSize: "2rem", fontWeight: 700 }}>
                  {dictResult.word}
                </span>
                {dictResult.phonetics?.map((p, idx) => (
                  <span
                    key={p.audio || p.text || `phonetic-${idx}`}
                    style={{
                      alignItems: "center",
                      color: "#f49f3f",
                      display: "inline-flex",
                      fontSize: "1.1rem",
                      gap: "0.25rem",
                    }}
                  >
                    {p.text}
                    {p.audio && (
                      <button
                        aria-label="발음 듣기"
                        onClick={() => p.audio && playAudio(p.audio)}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          marginLeft: 2,
                          padding: 0,
                        }}
                        type="button"
                      >
                        <Icon
                          color="#f49f3f"
                          height={20}
                          icon="lucide:volume-2"
                          width={20}
                        />
                      </button>
                    )}
                  </span>
                ))}
              </div>
              {dictResult.origin && (
                <div
                  style={{
                    color: "#888",
                    fontSize: "0.95rem",
                    marginBottom: "1rem",
                  }}
                >
                  {dictResult.origin}
                </div>
              )}
              {dictResult.meanings?.map((m, idx) => (
                <div
                  key={m.partOfSpeech || `meaning-${idx}`}
                  style={{ marginBottom: "1.2rem" }}
                >
                  <div
                    style={{
                      color: "#f28913",
                      fontWeight: 600,
                      marginBottom: "0.3rem",
                    }}
                  >
                    {m.partOfSpeech}
                  </div>
                  {m.definitions?.map((d, didx) => (
                    <div
                      key={d.definition || `def-${didx}`}
                      style={{
                        borderLeft: "2px solid #f49f3f",
                        marginBottom: "0.5rem",
                        paddingLeft: "0.5rem",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "1.05rem",
                          marginBottom: "0.2rem",
                        }}
                      >
                        {d.definition}
                      </div>
                      {d.example && (
                        <div style={{ color: "#888", fontSize: "0.95rem" }}>
                          예시: {d.example}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
          {queryResult.isError && (
            <div
              role="alert"
              style={{ color: "#f28913", marginBottom: "1rem" }}
            >
              {queryResult.error?.message ?? "검색 결과가 없습니다."}
            </div>
          )}
        </div>

        {/* 기존 사전 사이트 새창 링크 영역 */}
        <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
          <a
            href={
              lastSearch
                ? `https://dictionary.cambridge.org/dictionary/english/${encodeURIComponent(lastSearch)}`
                : "https://dictionary.cambridge.org/dictionary/english/"
            }
            rel="noopener noreferrer"
            style={{
              background: "#fff6ef",
              border: "1px solid #ef8741",
              borderRadius: "0.25rem",
              color: "#ef8741",
              fontWeight: 600,
              padding: "0.75rem 1.5rem",
              textDecoration: "none",
              transition: "background 0.2s",
            }}
            target="_blank"
          >
            Cambridge Dictionary
          </a>
          <a
            href={
              lastSearch
                ? `https://dic.daum.net/search.do?q=${encodeURIComponent(lastSearch)}&dic=eng`
                : "https://dic.daum.net/index.do?dic=eng"
            }
            rel="noopener noreferrer"
            style={{
              background: "#e8ebf2",
              border: "1px solid #2a3550",
              borderRadius: "0.25rem",
              color: "#2a3550",
              fontWeight: 600,
              padding: "0.75rem 1.5rem",
              textDecoration: "none",
              transition: "background 0.2s",
            }}
            target="_blank"
          >
            Daum 사전
          </a>
          <a
            href={
              lastSearch
                ? `https://en.dict.naver.com/#/search?range=word&query=${encodeURIComponent(lastSearch)}`
                : "https://en.dict.naver.com/#/main"
            }
            rel="noopener noreferrer"
            style={{
              background: "#eaf8ed",
              border: "1px solid #57bd61",
              borderRadius: "0.25rem",
              color: "#57bd61",
              fontWeight: 600,
              padding: "0.75rem 1.5rem",
              textDecoration: "none",
              transition: "background 0.2s",
            }}
            target="_blank"
          >
            Naver 사전
          </a>
        </div>
      </div>
    </Layout>
  );
}
