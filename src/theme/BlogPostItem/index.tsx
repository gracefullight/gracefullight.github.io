import React from "react";
import BlogPostItem from "@theme-original/BlogPostItem";
import type BlogPostItemType from "@theme/BlogPostItem";
import type { WrapperProps } from "@docusaurus/types";
import BrowserOnly from "@docusaurus/BrowserOnly";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import md5 from "crypto-js/md5";

// ? https://github.com/gitalk/gitalk#method-two-use-in-react
import "gitalk/dist/gitalk.css";
import GitalkComponent from "gitalk/dist/gitalk-component";
import Gitalk from "gitalk";

type Props = WrapperProps<typeof BlogPostItemType>;

const gitalkBaseOptions = {
  clientID: "b0950b3dc5e33a94677f",
  clientSecret: "adaca0132158e3e456a292ac2f3ba482c15f3a05",
  distractionFreeMode: true,
  // ? Can't get a post title from `useBlogPost`. it's an internal hook.
  // ? https://github.com/facebook/docusaurus/issues/7759
  labels: ["Gitalk"],
} as Gitalk.GitalkOptions;

// ? https://github.com/facebook/docusaurus/blob/main/packages/docusaurus-theme-classic/src/theme/BlogPostItem/index.tsx
export default function BlogPostItemWrapper(props: Props): JSX.Element {
  const {
    siteConfig: { projectName, organizationName },
  } = useDocusaurusContext();

  const gitalkOptions = {
    ...gitalkBaseOptions,
    repo: projectName,
    owner: organizationName,
    admin: [organizationName],
  };

  return (
    <>
      <BlogPostItem {...props} />
      <BrowserOnly>
        {() => {
          const isRootPage = ["/", "/index.html"].includes(
            window.location.pathname
          );

          return (
            !isRootPage && (
              <GitalkComponent
                options={{
                  ...gitalkOptions,
                  id: md5(window.location.pathname).toString(),
                }}
              />
            )
          );
        }}
      </BrowserOnly>
    </>
  );
}
