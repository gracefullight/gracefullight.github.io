import type { WrapperProps } from "@docusaurus/types";
import type FooterType from "@theme-original/Footer";

import { useLocation } from "@docusaurus/router";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Footer from "@theme-original/Footer";
import { isHomepagePath } from "./home-route";

type Props = WrapperProps<typeof FooterType>;

export default function FooterWrapper(props: Props) {
  const { pathname } = useLocation();
  const homepagePath = useBaseUrl("/");
  if (isHomepagePath(pathname, homepagePath)) return null;
  return <Footer {...props} />;
}
