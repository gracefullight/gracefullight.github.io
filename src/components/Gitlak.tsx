import type { FC } from "react";

import BrowserOnly from "@docusaurus/BrowserOnly";
import { useLocation } from "@docusaurus/router";
import { useBlogPost } from "@docusaurus/theme-common/internal";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { GitalkComponent as OriginalGitalkComponent } from "gitalk/dist/gitalk-component";
import { useEffect, useState } from "react";

import "gitalk/dist/gitalk.css";

const Gitlak: FC = () => {
  const { pathname } = useLocation();
  const {
    siteConfig: { projectName, organizationName },
  } = useDocusaurusContext();
  const { metadata, isBlogPostPage } = useBlogPost();

  const [id, setId] = useState("");

  useEffect(() => {
    const generateSHA1 = async (input: string) => {
      const encoder = new TextEncoder();
      const data = encoder.encode(input);
      const hashBuffer = await crypto.subtle.digest("SHA-1", data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");
      return hashHex;
    };

    generateSHA1(pathname).then(setId);
  }, [pathname]);

  const gitalkOptions = {
    clientID: "b0950b3dc5e33a94677f",
    clientSecret: "adaca0132158e3e456a292ac2f3ba482c15f3a05",
    repo: projectName,
    owner: organizationName,
    admin: [organizationName],
    title: metadata.title,
    id,
    distractionFreeMode: true,
    labels: ["Gitalk"],
  };

  return (
    <BrowserOnly>
      {() =>
        isBlogPostPage && <OriginalGitalkComponent options={gitalkOptions} />
      }
    </BrowserOnly>
  );
};

export default Gitlak;
