import BrowserOnly from "@docusaurus/BrowserOnly";
import Layout from "@theme/Layout";
import { useLocalStorageState, useResponsive } from "ahooks";
import { useState, type KeyboardEvent } from "react";

export default function DictionaryPage() {
  const [query, setQuery] = useState("");
  const [iframeSrc, setIframeSrc] = useState<{
    daum: string;
    naver: string;
  }>({
    daum: "https://dic.daum.net/index.do?dic=eng",
    naver: "https://en.dict.naver.com/#/main",
  });

  const [recentSearches, setRecentSearches] = useLocalStorageState<string[]>(
    "recentSearches",
    {
      defaultValue: [],
    },
  );

  const responsive = useResponsive();

  const search = (inputQuery: string) => {
    inputQuery = inputQuery.trim();
    if (inputQuery.length < 2) {
      alert("검색어는 최소 2글자 이상 입력해주세요.");
      return;
    }

    if (!/^[a-zA-Z-\s]*$/.test(inputQuery)) {
      alert("알파벳, 대시(-), 공백만 허용합니다.");
      return;
    }

    const updatedSearches = [
      inputQuery,
      ...recentSearches.filter((term) => term !== inputQuery),
    ].slice(0, 5);

    setRecentSearches(updatedSearches);
    setIframeSrc({
      daum: `https://dic.daum.net/search.do?q=${inputQuery}&dic=eng`,
      naver: `https://en.dict.naver.com/#/search?range=word&query=${inputQuery}`,
    });
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      search(query);
    }
  };

  return (
    <Layout>
      <div style={{ padding: "2.5rem" }}>
        <div
          style={{ marginBottom: "0.5rem", display: "flex", gap: "0.25rem" }}
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyPress}
            style={{
              flexGrow: 1,
              border: "1px solid #f49f3f",
              borderRadius: "0.25rem",
              padding: "0.5rem 1rem",
            }}
            placeholder="검색어를 입력하세요"
            pattern="[a-zA-Z-\s]*"
            title="알파벳, 대시(-), 공백만 허용합니다. 최소 2글자 이상 입력해주세요."
          />
          <button
            type="submit"
            onClick={() => search(query)}
            style={{
              background: "#f49f3f",
              border: 0,
              color: "white",
              padding: "0.5rem 1rem",
              borderRadius: "0.25rem",
              cursor: "pointer",
            }}
          >
            검색하기
          </button>
        </div>
        <div style={{ marginBottom: "1.5rem" }}>
          {recentSearches.map((term) => (
            <span
              key={term}
              onClick={() => search(term)}
              style={{
                margin: "0.25rem",
                padding: "0.25rem 0.5rem",
                border: "1px solid #f28913",
                borderRadius: "0.25rem",
                cursor: "pointer",
              }}
            >
              {term}
            </span>
          ))}
        </div>
        <BrowserOnly>
          {() => (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: responsive.md ? "1fr 1fr" : "1fr",
                gap: "1rem",
              }}
            >
              <iframe
                src={iframeSrc.daum}
                style={{
                  width: "100%",
                  height: "100vh",
                  borderRadius: "0.25rem",
                }}
                loading="lazy"
                referrerPolicy="no-referrer"
              ></iframe>
              <iframe
                src={iframeSrc.naver}
                style={{
                  width: "100%",
                  height: "100vh",
                  borderRadius: "0.25rem",
                }}
                loading="lazy"
                referrerPolicy="no-referrer"
              ></iframe>
            </div>
          )}
        </BrowserOnly>
      </div>
    </Layout>
  );
}
