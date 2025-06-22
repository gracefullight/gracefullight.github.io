import type { KeyboardEvent } from "react";

import BrowserOnly from "@docusaurus/BrowserOnly";
import Layout from "@theme/Layout";
import { useLocalStorageState, useResponsive } from "ahooks";
import { useState } from "react";

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

  const search = (rawQuery: string) => {
    const trimmedQuery = rawQuery.trim();
    if (trimmedQuery.length < 2) {
      alert("검색어는 최소 2글자 이상 입력해주세요.");
      return;
    }

    if (!/^[a-zA-Z-\s]*$/.test(trimmedQuery)) {
      alert("알파벳, 대시(-), 공백만 허용합니다.");
      return;
    }

    const updatedSearches = [
      trimmedQuery,
      ...(recentSearches?.filter((term) => term !== trimmedQuery) ?? []),
    ].slice(0, 5);

    setRecentSearches(updatedSearches);
    setIframeSrc({
      daum: `https://dic.daum.net/search.do?q=${trimmedQuery}&dic=eng`,
      naver: `https://en.dict.naver.com/#/search?range=word&query=${trimmedQuery}`,
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
          style={{ display: "flex", gap: "0.25rem", marginBottom: "0.5rem" }}
        >
          <input
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyPress}
            pattern="[a-zA-Z-\s]*"
            placeholder="검색어를 입력하세요"
            style={{
              border: "1px solid #f49f3f",
              borderRadius: "0.25rem",
              flexGrow: 1,
              padding: "0.5rem 1rem",
            }}
            title="알파벳, 대시(-), 공백만 허용합니다. 최소 2글자 이상 입력해주세요."
            type="text"
            value={query}
          />
          <button
            onClick={() => search(query)}
            style={{
              background: "#f49f3f",
              border: 0,
              borderRadius: "0.25rem",
              color: "white",
              cursor: "pointer",
              padding: "0.5rem 1rem",
            }}
            type="submit"
          >
            검색하기
          </button>
        </div>
        <div style={{ marginBottom: "1.5rem" }}>
          {recentSearches?.map((term) => (
            <button
              key={term}
              onClick={() => search(term)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  search(term);
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
        <BrowserOnly>
          {() => (
            <div
              style={{
                display: "grid",
                gap: "1rem",
                gridTemplateColumns: responsive.md ? "1fr 1fr" : "1fr",
              }}
            >
              <iframe
                loading="lazy"
                referrerPolicy="no-referrer"
                sandbox=""
                src={iframeSrc.daum}
                style={{
                  borderRadius: "0.25rem",
                  height: "100vh",
                  width: "100%",
                }}
                title="Daum Dictionary"
              />
              <iframe
                loading="lazy"
                referrerPolicy="no-referrer"
                sandbox=""
                src={iframeSrc.naver}
                style={{
                  borderRadius: "0.25rem",
                  height: "100vh",
                  width: "100%",
                }}
                title="Naver Dictionary"
              />
            </div>
          )}
        </BrowserOnly>
      </div>
    </Layout>
  );
}
