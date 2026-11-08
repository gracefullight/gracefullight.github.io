import type { MouseEvent } from "react";

import Link from "@docusaurus/Link";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import HomeIcon from "./home-icon";
import { POLYFORK_PROPS, polyforkAssetUrl } from "./polyfork-manifest";
import {
  engineeringExperience,
  profile,
  researchInterests,
  selectedWork,
} from "./profile-data";
import ScrollHero from "./scroll-hero";
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
  const [expandedInterest, setExpandedInterest] = useState(0);
  const toggleInterest = (event: MouseEvent<HTMLButtonElement>) => {
    const index = Number(event.currentTarget.dataset.interest);
    setExpandedInterest(expandedInterest === index ? -1 : index);
  };

  return (
    <div lang="en">
      <ScrollHero />
      {/* biome-ignore lint/correctness/useUniqueElementIds: Stable anchor on a single homepage instance. */}
      <section className={styles.selectedWork} id="work">
        <div className={styles.sectionHeading}>
          <h2>Selected work.</h2>
          <p>
            Paper reviews and study notes on how models see, plan, and act. Each
            figure comes from the linked article.
          </p>
        </div>
        <div className={styles.workGallery}>
          {selectedWork.map((work) => (
            <article className={styles.workItem} key={work.url}>
              <figure className={styles.workPreview}>
                <img
                  alt={work.imageAlt}
                  decoding="async"
                  height={work.imageHeight}
                  loading="lazy"
                  src={work.image}
                  width={work.imageWidth}
                />
              </figure>
              <div className={styles.workDetails}>
                <h3>{work.title}</h3>
                <p className={styles.workKind}>{work.kind}</p>
                <p>{work.summary}</p>
                <Link className={styles.workLink} to={work.url}>
                  {work.action} <HomeIcon name="arrow-up-right" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className={styles.profileColumns}>
        {/* biome-ignore lint/correctness/useUniqueElementIds: Stable anchor on a single homepage instance. */}
        <section className={styles.researchColumn} id="research">
          <div className={styles.sectionHeading}>
            <h2>Research interests.</h2>
            <p>Three current reading directions, with the notes behind each.</p>
          </div>
          <div className={styles.interests}>
            {researchInterests.map((interest, index) => (
              <div className={styles.interest} key={interest.name}>
                <button
                  aria-controls={`interest-${index}`}
                  aria-expanded={expandedInterest === index}
                  data-interest={index}
                  onClick={toggleInterest}
                  type="button"
                >
                  <span>{interest.name}</span>
                  <HomeIcon
                    name={expandedInterest === index ? "minus" : "plus"}
                  />
                </button>
                <div
                  className={styles.interestDescription}
                  hidden={expandedInterest !== index}
                  id={`interest-${index}`}
                >
                  <p>{interest.workSummary}</p>
                  <Link className={styles.textLink} to={interest.workUrl}>
                    {interest.workLinkLabel}
                    <HomeIcon name="arrow-up-right" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* biome-ignore lint/correctness/useUniqueElementIds: Stable anchor on a single homepage instance. */}
        <section className={styles.experienceColumn} id="experience">
          <div className={styles.sectionHeading}>
            <h2>Engineering background.</h2>
            <p>
              Industry experience, open-source code, and the move to AI study.
            </p>
          </div>
          <div className={styles.experienceList}>
            {engineeringExperience.map((experience) => (
              <article className={styles.experience} key={experience.label}>
                <h3>{experience.title}</h3>
                <p>{experience.description}</p>
                <Link
                  className={styles.textLink}
                  hrefLang={experience.hrefLang}
                  to={experience.url}
                >
                  {experience.action}
                  <HomeIcon name="arrow-up-right" />
                </Link>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
