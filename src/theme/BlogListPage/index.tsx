import type { Props } from "@theme/BlogListPage";

import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import ProfileHome, { HomeContact } from "@site/src/components/home";
import HomeIcon from "@site/src/components/home/home-icon";
import {
  getTextLanguage,
  getWritingTitle,
  profile,
} from "@site/src/components/home/profile-data";
import styles from "@site/src/components/home/styles.module.css";
import BlogListPageStructuredData from "@theme/BlogListPage/StructuredData";
import Layout from "@theme/Layout";
import BlogListPage from "@theme-original/BlogListPage";

export default function BlogListPageWrapper(props: Props) {
  const homePath = useBaseUrl("/");
  if (props.metadata.permalink !== homePath) {
    return <BlogListPage {...props} />;
  }

  return (
    <Layout description={profile.intro} title="Eunkwang Shin | Software & AI">
      <BlogListPageStructuredData {...props} />
      <div className={styles.home}>
        {/* biome-ignore lint/correctness/useUniqueElementIds: This page renders once; the ID is a public navigation anchor. */}
        <main id="home" lang="en">
          <ProfileHome />
          {/* biome-ignore lint/correctness/useUniqueElementIds: Stable anchor for the homepage navigation. */}
          <section className={styles.writing} id="writing">
            <div className={styles.writingHeading}>
              <h2>Recent writing.</h2>
              <Link className={styles.textLink} to="/archive/">
                Browse the archive <HomeIcon name="arrow-right" />
              </Link>
            </div>
            <div className={styles.writingList}>
              {props.items.slice(0, 4).map(({ content: { metadata } }) => {
                const title = getWritingTitle(
                  metadata.title,
                  metadata.permalink,
                );
                return (
                  <Link
                    className={styles.writingLink}
                    key={metadata.permalink}
                    to={metadata.permalink}
                  >
                    <time dateTime={metadata.date}>
                      {new Intl.DateTimeFormat("en", {
                        month: "short",
                        timeZone: "UTC",
                        year: "numeric",
                      }).format(new Date(metadata.date))}
                    </time>
                    <h3 lang={getTextLanguage(title)}>{title}</h3>
                    <HomeIcon name="arrow-up-right" />
                  </Link>
                );
              })}
            </div>
          </section>
          <HomeContact />
        </main>
      </div>
    </Layout>
  );
}
