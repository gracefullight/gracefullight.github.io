import type { WrapperProps } from "@docusaurus/types";
import type FooterType from "@theme-original/Footer";

import Footer from "@theme-original/Footer";

type Props = WrapperProps<typeof FooterType>;

export default function FooterWrapper(props: Props): JSX.Element {
  return (
    <>
      <Footer {...props} />
    </>
  );
}
