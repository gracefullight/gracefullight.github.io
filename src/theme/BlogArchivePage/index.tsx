import type { WrapperProps } from "@docusaurus/types";
import BlogArchivePage from "@theme-original/BlogArchivePage";
import type BlogArchivePageType from "@theme/BlogArchivePage";

type Props = WrapperProps<typeof BlogArchivePageType>;

// ? https://github.com/facebook/docusaurus/blob/main/packages/docusaurus-theme-classic/src/theme/BlogArchivePage/index.tsx
export default function BlogArchivePageWrapper(props: Props): JSX.Element {
  const { archive, ...remains } = props;
  const DescendingArchive = {
    blogPosts: [...archive.blogPosts].reverse(),
  };

  return (
    <>
      <BlogArchivePage {...remains} archive={DescendingArchive} />
    </>
  );
}
