import OriginalDocsly from "@docsly/react";
import { useLocation } from "@docusaurus/router";
import { useBlogPost } from "@docusaurus/theme-common/internal";

import "@docsly/react/styles.css";

export default function Docsly() {
  const { pathname } = useLocation();
  const { isBlogPostPage } = useBlogPost();

  return (
    isBlogPostPage && (
      <OriginalDocsly
        publicId="pk_Z1AU7K6oDjYcBPJtAK9ev5TQ9W8WIJB3TDCn3JP2YtqlYzZd"
        pathname={pathname}
      />
    )
  );
}
