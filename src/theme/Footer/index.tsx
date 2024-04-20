import Docsly from "@docsly/react";
import "@docsly/react/styles.css";
import { useLocation } from "@docusaurus/router";
import { useBlogPost } from "@docusaurus/theme-common/internal";
import type { WrapperProps } from "@docusaurus/types";
import type FooterType from "@theme-original/Footer";
import Footer from "@theme-original/Footer";

type Props = WrapperProps<typeof FooterType>;

export default function FooterWrapper(props: Props): JSX.Element {
  const { pathname } = useLocation();
  const { isBlogPostPage } = useBlogPost();

  return (
    <>
      <Footer {...props} />
      {isBlogPostPage && (
        <Docsly
          publicId="pk_Z1AU7K6oDjYcBPJtAK9ev5TQ9W8WIJB3TDCn3JP2YtqlYzZd"
          pathname={pathname}
        />
      )}
    </>
  );
}
