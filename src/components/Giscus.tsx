import { useColorMode } from "@docusaurus/theme-common";
import { useBlogPost } from "@docusaurus/theme-common/internal";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import OriginalGiscus from "@giscus/react";

export default function Giscus() {
  const { i18n } = useDocusaurusContext();
  const { isBlogPostPage } = useBlogPost();
  const { colorMode } = useColorMode();

  return (
    isBlogPostPage && (
      <OriginalGiscus
        repo="gracefullight/gracefullight.github.io"
        repoId="MDEwOlJlcG9zaXRvcnk3Njk3NDY3NQ=="
        category="General"
        categoryId="DIC_kwDOBJaKU84Ce0Bs"
        mapping="url"
        term="Welcome to @giscus/react component!"
        strict="1"
        reactionsEnabled="1"
        emitMetadata="1"
        inputPosition="top"
        theme={colorMode}
        lang={i18n.currentLocale}
        loading="lazy"
      />
    )
  );
}
