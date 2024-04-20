import type { WrapperProps } from "@docusaurus/types";
import Giscus from "@site/src/components/Giscus";
import type BlogPostItemType from "@theme-original/BlogPostItem";
import BlogPostItem from "@theme-original/BlogPostItem";

type Props = WrapperProps<typeof BlogPostItemType>;

// ? https://github.com/facebook/docusaurus/blob/main/packages/docusaurus-theme-classic/src/theme/BlogPostItem/index.tsx
export default function BlogPostItemWrapper(props: Props): JSX.Element {
  return (
    <>
      <BlogPostItem {...props} />
      <Giscus />
    </>
  );
}
