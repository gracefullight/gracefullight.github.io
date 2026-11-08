import Link from "@docusaurus/Link";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import Hero from "./hero";
import HomeIcon from "./home-icon";
import { POLYFORK_PROPS, polyforkAssetUrl } from "./polyfork-manifest";
import { education, experience, profile, projects } from "./profile-data";
import styles from "./styles.module.css";

export function HomeContact() {
  const [copied, setCopied] = useState(false);
  const [copyUnavailable, setCopyUnavailable] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    [],
  );

  const copyEmail = useCallback(async () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setCopyUnavailable(false);
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
      setCopyUnavailable(true);
    }
  }, []);

  return (
    <section aria-label="Contact" className={styles.contact} lang="en">
      <div className={styles.contactHeading}>
        <h2>Get in touch.</h2>
        <a className={styles.textLink} href={`mailto:${profile.email}`}>
          Write an email <HomeIcon name="mail" />
        </a>
      </div>
      <div className={styles.contactLinks}>
        <button
          aria-label="Copy email address"
          className={styles.emailButton}
          onClick={copyEmail}
          type="button"
        >
          <span aria-live="polite">
            {copied ? "Email address copied" : profile.email}
          </span>
          <HomeIcon name={copied ? "check" : "copy"} />
        </button>
        <div className={styles.socialLinks}>
          <a href={profile.github}>
            GitHub <HomeIcon name="arrow-up-right" />
          </a>
          <a href={profile.linkedin}>
            LinkedIn <HomeIcon name="arrow-up-right" />
          </a>
          <Link to="/archive/">
            Archives <HomeIcon name="arrow-right" />
          </Link>
        </div>
      </div>
      {copyUnavailable ? (
        <p className={styles.copyStatus} role="status">
          Copy is unavailable here. Use the email link to contact me.
        </p>
      ) : null}
      <p className={styles.copyright}>
        © {new Date().getFullYear()} {profile.name}
      </p>
      <p className={styles.assetCredit}>
        Scene props:{" "}
        {POLYFORK_PROPS.map((prop, index) => (
          <Fragment key={prop.id}>
            {index > 0 ? ", " : null}
            <a href={polyforkAssetUrl(prop.id)}>{prop.title}</a>
          </Fragment>
        ))}{" "}
        by <a href="https://polyfork.dev">Polyfork</a>, licensed under{" "}
        <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>.
        Materials and scale adapted.
      </p>
    </section>
  );
}

export default function ProfileHome() {
  return (
    <div lang="en">
      <Hero />

      {/* biome-ignore lint/correctness/useUniqueElementIds: Stable anchor on a single homepage instance. */}
      <section className={styles.section} id="experience">
        <div className={styles.sectionHeading}>
          <h2>Experience.</h2>
          <p>
            Production software across e-commerce, automotive platforms, defence
            systems, and AI products.
          </p>
        </div>
        <ol className={styles.timeline}>
          {experience.map((item) => (
            <li className={styles.timelineItem} key={item.company}>
              <p className={styles.timelinePeriod}>
                {item.period}
                <span>{item.location}</span>
              </p>
              <div>
                <h3>{item.company}</h3>
                <p className={styles.timelineRole}>{item.role}</p>
                <p>{item.summary}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* biome-ignore lint/correctness/useUniqueElementIds: Stable anchor on a single homepage instance. */}
      <section className={styles.section} id="projects">
        <div className={styles.sectionHeading}>
          <h2>Projects.</h2>
          <p>
            Open-source tools, coursework showcases, and published research.
          </p>
        </div>
        <div className={styles.projectGrid}>
          {projects.map((project) => (
            <article className={styles.project} key={project.title}>
              <h3>
                {project.url ? (
                  <a className={styles.projectLink} href={project.url}>
                    {project.title} <HomeIcon name="arrow-up-right" />
                  </a>
                ) : (
                  project.title
                )}
              </h3>
              <p className={styles.projectMeta}>{project.meta}</p>
              <p>{project.summary}</p>
            </article>
          ))}
        </div>
      </section>

      {/* biome-ignore lint/correctness/useUniqueElementIds: Stable anchor on a single homepage instance. */}
      <section className={styles.section} id="education">
        <div className={styles.sectionHeading}>
          <h2>Education.</h2>
        </div>
        <ol className={styles.timeline}>
          {education.map((item) => (
            <li className={styles.timelineItem} key={item.title}>
              <p className={styles.timelinePeriod}>{item.period}</p>
              <div>
                <h3>{item.title}</h3>
                <p className={styles.timelineRole}>{item.school}</p>
                {item.detail ? <p>{item.detail}</p> : null}
              </div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
