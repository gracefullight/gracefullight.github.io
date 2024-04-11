import type { WrapperProps } from "@docusaurus/types";
import type BlogPostItemType from "@theme-original/BlogPostItem";
import BlogPostItem from "@theme-original/BlogPostItem";
// TODO: https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest#browser_compatibility

// ? https://github.com/gitalk/gitalk#method-two-use-in-react
import "gitalk/dist/gitalk.css";

type Props = WrapperProps<typeof BlogPostItemType>;

// const gitalkBaseOptions = {
//   clientID: "b0950b3dc5e33a94677f",
//   clientSecret: "adaca0132158e3e456a292ac2f3ba482c15f3a05",
//   distractionFreeMode: true,
//   // ? Can't get a post title from `useBlogPost`. it's an internal hook.
//   // ? https://github.com/facebook/docusaurus/issues/7759
//   labels: ["Gitalk"],
// } as Gitalk.GitalkOptions;

// ? https://github.com/facebook/docusaurus/blob/main/packages/docusaurus-theme-classic/src/theme/BlogPostItem/index.tsx
export default function BlogPostItemWrapper(props: Props): JSX.Element {
  // const {
  //   siteConfig: { projectName, organizationName },
  // } = useDocusaurusContext();
  // const { pathname } = useLocation();
  // const [_, setGitalkOptions] = useState<Gitalk.GitalkOptions>({
  //   ...gitalkBaseOptions,
  //   repo: projectName,
  //   owner: organizationName,
  //   admin: [organizationName],
  // });

  // useEffect(() => {
  //   setGitalkOptions((prev) => ({
  //     ...prev,
  //     title: document.title,
  //     id: md5(pathname).toString(),
  //   }));
  // }, [pathname]);

  // const isRootPage = ["/", "/index.html"].includes(pathname);

  return (
    <>
      <BlogPostItem {...props} />
      {/*
      <BrowserOnly>
        {() => {
          return !isRootPage && <GitalkComponent options={gitalkOptions} />;
        }}
      </BrowserOnly>
      */}
    </>
  );
}
