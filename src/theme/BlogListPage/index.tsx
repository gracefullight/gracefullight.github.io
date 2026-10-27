import type { Props } from "@theme/BlogListPage";

import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import ProfileHome, { HomeContact } from "@site/src/components/home";
import { profile } from "@site/src/components/home/profile-data";
import styles from "@site/src/components/home/styles.module.css";
import BlogListPageStructuredData from "@theme/BlogListPage/StructuredData";
import BlogListPaginator from "@theme/BlogListPaginator";
import Layout from "@theme/Layout";
import BlogListPage from "@theme-original/BlogListPage";

export default function BlogListPageWrapper(props: Props) {
  const homePath = useBaseUrl("/");
  if (props.metadata.permalink !== homePath) {
    return <BlogListPage {...props} />;
  }

  return (
    <Layout
      description={profile.intro}
      title="Eunkwang Shin — Software Engineering & AI Research"
    >
      <BlogListPageStructuredData {...props} />
      <div className={styles.home}>
        {/* biome-ignore lint/correctness/useUniqueElementIds: This page renders once; the ID is a public navigation anchor. */}
        <main id="home">
          <ProfileHome />
          {/* biome-ignore lint/correctness/useUniqueElementIds: Stable anchor for the homepage navigation. */}
          <section className={styles.writing} id="writing">
            <div className={styles.writingHeading}>
              <div>
                <p className={styles.eyebrow}>03 / WRITING</p>
                <h2>Recent writing.</h2>
              </div>
              <Link className={styles.textLink} to="/archive/">
                All writing <span aria-hidden="true">↗</span>
              </Link>
            </div>
            <div className={styles.writingList}>
              {props.items.map(({ content: { metadata } }) => (
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
                  <h3>{metadata.title}</h3>
                  <span aria-hidden="true">↗</span>
                </Link>
              ))}
            </div>
            <div className={styles.paginator}>
              <BlogListPaginator metadata={props.metadata} />
            </div>
          </section>
          <HomeContact />
        </main>
      </div>
    </Layout>
  );
}
