import type { MouseEvent } from "react";

import Link from "@docusaurus/Link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  engineeringExperience,
  profile,
  researchInterests,
  researchNotes,
} from "./profile-data";
import ScrollHero from "./scroll-hero";
import styles from "./styles.module.css";

export function HomeContact() {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    [],
  );

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  }, []);

  return (
    <section aria-label="Contact" className={styles.contact}>
      <div className={styles.contactHeading}>
        <p className={styles.eyebrow}>CONTACT</p>
        <a className={styles.textLink} href={`mailto:${profile.email}`}>
          Get in touch <span aria-hidden="true">↗</span>
        </a>
      </div>
      <div className={styles.contactLinks}>
        <button
          aria-label="Copy email address"
          className={styles.emailButton}
          onClick={copyEmail}
          type="button"
        >
          <span aria-live="polite">{copied ? "Copied!" : profile.email}</span>
          <span aria-hidden="true">{copied ? "✓" : "⧉"}</span>
        </button>
        <div className={styles.socialLinks}>
          <a href={profile.github}>GitHub ↗</a>
          <a href={profile.linkedin}>LinkedIn ↗</a>
          <Link to="/archive/">Archive ↗</Link>
        </div>
      </div>
    </section>
  );
}

export default function ProfileHome() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [expandedInterest, setExpandedInterest] = useState(0);
  const toggleInterest = (event: MouseEvent<HTMLButtonElement>) => {
    const index = Number(event.currentTarget.dataset.interest);
    setExpandedInterest(expandedInterest === index ? -1 : index);
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-visible", "true");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12 },
    );
    for (const element of root.querySelectorAll("[data-reveal]")) {
      observer.observe(element);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rootRef}>
      <ScrollHero />
      <section className={styles.introduction} data-reveal="">
        <p className={styles.eyebrow}>ABOUT</p>
        <h2>
          Engineering experience.
          <br />
          <span>Exploring AI research.</span>
        </h2>
        <p>
          I’m Eunkwang, also known as gracefullight. I build software, share
          what I learn, and am expanding my work into AI research.
        </p>
      </section>

      <div className={styles.profileColumns}>
        {/* biome-ignore lint/correctness/useUniqueElementIds: Stable anchor on a single homepage instance. */}
        <section className={styles.researchColumn} id="research">
          <div className={styles.sectionHeading} data-reveal="">
            <p className={styles.eyebrow}>01 / RESEARCH</p>
            <h2>Research.</h2>
            <p>
              My current interests include AI agents, computer vision, and
              robotics. I’m open to exploring new research directions.
            </p>
          </div>
          <h3 className={styles.subheading}>Research interests</h3>
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
                  <span className={styles.interestNumber}>
                    {interest.number}
                  </span>
                  <span>{interest.name}</span>
                  <span aria-hidden="true" className={styles.interestToggle}>
                    {expandedInterest === index ? "−" : "+"}
                  </span>
                </button>
                <div
                  className={styles.interestDescription}
                  hidden={expandedInterest !== index}
                  id={`interest-${index}`}
                >
                  {interest.description}
                </div>
              </div>
            ))}
          </div>
          <p className={styles.openNote}>
            <span aria-hidden="true">↗</span> Open to new research directions.
          </p>

          <div className={styles.notes} data-reveal="">
            <div className={styles.notesHeading}>
              <h3 className={styles.subheading}>Reading & research notes</h3>
              <Link aria-label="All AI writing" to="/tags/ai/">
                ↗
              </Link>
            </div>
            {researchNotes.map((note) => (
              <Link className={styles.noteLink} key={note.url} to={note.url}>
                <span className={styles.noteCategory}>{note.category}</span>
                <span className={styles.noteTitle}>{note.title}</span>
                <span aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
        </section>

        {/* biome-ignore lint/correctness/useUniqueElementIds: Stable anchor on a single homepage instance. */}
        <section className={styles.experienceColumn} id="experience">
          <div className={styles.sectionHeading} data-reveal="">
            <p className={styles.eyebrow}>02 / EXPERIENCE</p>
            <h2>Engineering.</h2>
            <p>
              A foundation in full-stack software engineering, industry, and
              open-source work.
            </p>
          </div>
          <div className={styles.experienceList}>
            {engineeringExperience.map((experience, index) => (
              <article
                className={styles.experience}
                data-reveal=""
                key={experience.label}
              >
                <span className={styles.experienceIndex}>0{index + 1}</span>
                <div>
                  <p className={styles.experienceLabel}>{experience.label}</p>
                  <h3>{experience.title}</h3>
                  <p>{experience.description}</p>
                  <Link className={styles.textLink} to={experience.url}>
                    {experience.label === "Open source"
                      ? "Explore GitHub"
                      : "Read the story"}
                    <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
