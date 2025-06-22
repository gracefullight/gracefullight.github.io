import { useBlogPost } from "@docusaurus/plugin-content-blog/client";
import { useColorMode } from "@docusaurus/theme-common";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import OriginalGiscus from "@giscus/react";

// ? https://docs.github.com/ko/graphql/overview/explorer
// ? https://github.com/giscus/giscus-component
export default function Giscus() {
  const { i18n } = useDocusaurusContext();
  const { isBlogPostPage } = useBlogPost();
  const { colorMode } = useColorMode();

  return (
    isBlogPostPage && (
      <OriginalGiscus
        category="General"
        categoryId="DIC_kwDOBJaKU84Ce0Bs"
        emitMetadata="1"
        inputPosition="top"
        lang={i18n.currentLocale}
        loading="lazy"
        mapping="url"
        reactionsEnabled="1"
        repo="gracefullight/gracefullight.github.io"
        repoId="MDEwOlJlcG9zaXRvcnk3Njk3NDY3NQ=="
        strict="1"
        term="Welcome to @giscus/react component!"
        theme={colorMode}
      />
    )
  );
}
