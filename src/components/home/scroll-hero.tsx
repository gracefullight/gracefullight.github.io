import type { MouseEvent, PointerEvent } from "react";
import type { ResearchSceneState } from "./research-scene";

import { useEffect, useRef, useState } from "react";
import { profile, researchInterests } from "./profile-data";
import styles from "./styles.module.css";

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const smoothstep = (start: number, end: number, value: number) => {
  const amount = clamp((value - start) / (end - start));
  return amount * amount * (3 - 2 * amount);
};
const storySteps = [
  { anchor: 0.33, end: 0.47, interest: 1, start: 0.2, title: "Perceive." },
  { anchor: 0.6, end: 0.74, interest: 0, start: 0.47, title: "Reason." },
  { anchor: 0.88, end: 1, interest: 2, start: 0.74, title: "Act." },
] as const;
type ResearchScene = ReturnType<
  typeof import("./research-scene").createResearchScene
>;

function updateStoryPanels(
  panels: NodeListOf<HTMLElement>,
  progress: number,
  reducedMotion: boolean,
) {
  for (const [index, panel] of panels.entries()) {
    const step = storySteps[index];
    const fadeIn = smoothstep(step.start - 0.04, step.start + 0.04, progress);
    const fadeOut =
      step.end < 1
        ? 1 - smoothstep(step.end - 0.04, step.end + 0.04, progress)
        : 1;
    const inStep =
      progress >= step.start && (progress < step.end || step.end === 1);
    const opacity = reducedMotion ? Number(inStep) : fadeIn * fadeOut;
    const direction = progress < step.start ? 1 : -1;
    panel.style.setProperty("--panel-opacity", String(opacity));
    panel.style.setProperty(
      "--panel-shift",
      `${direction * (1 - opacity) * 50}px`,
    );
    panel.inert = opacity < 0.5;
    panel.setAttribute("aria-hidden", String(opacity < 0.5));
  }
}

function updateStoryIntro(
  section: HTMLElement,
  intro: HTMLElement | null,
  progress: number,
  reducedMotion: boolean,
) {
  const opacity = reducedMotion
    ? Number(progress < 0.2)
    : 1 - smoothstep(0.12, 0.22, progress);
  if (intro) {
    intro.inert = opacity < 0.1;
    intro.setAttribute("aria-hidden", String(opacity < 0.1));
  }
  section.style.setProperty("--story-progress", String(progress));
  section.style.setProperty("--intro-opacity", String(opacity));
  section.style.setProperty("--story-shift", `${(1 - opacity) * -50}px`);
}

export default function ScrollHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<ResearchScene | null>(null);
  const stateRef = useRef<ResearchSceneState>({
    activeInterest: 0,
    pointerX: 0,
    pointerY: 0,
    progress: 0,
    reducedMotion: false,
    typing: 0,
  });
  const [activeInterest, setActiveInterest] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    stateRef.current.activeInterest = activeInterest;
    sceneRef.current?.update(stateRef.current);
    if (stateRef.current.reducedMotion) {
      sceneRef.current?.render(performance.now());
    }
  }, [activeInterest]);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    if (!(section && canvas && stage)) return;

    let disposed = false;
    let inView = true;
    let frame = 0;
    let scene: ReturnType<
      typeof import("./research-scene").createResearchScene
    > | null = null;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const panels = section.querySelectorAll<HTMLElement>("[data-story-step]");
    let previousInterest = -1;
    const updateProgress = () => {
      const rect = section.getBoundingClientRect();
      const inset = Number.parseFloat(getComputedStyle(stage).top) || 0;
      const distance = Math.max(1, rect.height - stage.offsetHeight);
      const progress = clamp((inset - rect.top) / distance);
      stateRef.current.progress = progress;
      stateRef.current.reducedMotion = motion.matches;
      updateStoryIntro(section, introRef.current, progress, motion.matches);
      updateStoryPanels(panels, progress, motion.matches);
      const currentStep = storySteps.findLast((step) => progress >= step.start);
      const interest = currentStep?.interest ?? 0;
      if (interest !== previousInterest) {
        previousInterest = interest;
        stateRef.current.activeInterest = interest;
        setActiveInterest(interest);
      }
      scene?.update(stateRef.current);
      if (motion.matches) scene?.render(performance.now());
    };
    const render = (time: number) => {
      frame = 0;
      if (disposed || !inView || document.hidden || motion.matches) return;
      scene?.update(stateRef.current);
      scene?.render(time);
      frame = window.requestAnimationFrame(render);
    };
    const resume = () => {
      if (!frame && scene && inView && !document.hidden && !motion.matches) {
        frame = window.requestAnimationFrame(render);
      }
    };
    const updateMotion = () => {
      window.cancelAnimationFrame(frame);
      frame = 0;
      updateProgress();
      resume();
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      resume();
    });
    const resizeObserver = new ResizeObserver(() => {
      scene?.resize();
      updateProgress();
    });
    const onVisibility = () => {
      if (document.hidden) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      } else {
        resume();
      }
    };

    observer.observe(section);
    resizeObserver.observe(canvas);
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    document.addEventListener("visibilitychange", onVisibility);
    motion.addEventListener("change", updateMotion);
    updateProgress();

    void import("./research-scene")
      .then(({ createResearchScene }) => {
        if (disposed) return;
        scene = createResearchScene(canvas);
        sceneRef.current = scene;
        scene.resize();
        scene.update(stateRef.current);
        scene.render(performance.now());
        setReady(true);
        resume();
      })
      .catch((error: unknown) => {
        console.error("Failed to initialize the homepage scene", error);
        // The static illustration remains visible when WebGL is unavailable.
      });

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      document.removeEventListener("visibilitychange", onVisibility);
      motion.removeEventListener("change", updateMotion);
      scene?.dispose();
      sceneRef.current = null;
    };
  }, []);

  const selectInterest = (event: MouseEvent<HTMLButtonElement>) => {
    const interest = Number(event.currentTarget.dataset.interest);
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!(section && stage)) return;
    const step = storySteps.find((item) => item.interest === interest);
    if (!step) return;
    const rect = section.getBoundingClientRect();
    const inset = Number.parseFloat(getComputedStyle(stage).top) || 0;
    window.scrollTo({
      behavior: stateRef.current.reducedMotion ? "instant" : "smooth",
      top:
        window.scrollY +
        rect.top -
        inset +
        (rect.height - stage.offsetHeight) * step.anchor,
    });
  };
  const resetPointer = () => {
    stateRef.current.pointerX = 0;
    stateRef.current.pointerY = 0;
  };
  const movePointer = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    stateRef.current.pointerX =
      ((event.clientX - rect.left) / rect.width) * 2 - 1;
    stateRef.current.pointerY =
      ((event.clientY - rect.top) / rect.height) * 2 - 1;
  };
  const startTyping = () => {
    stateRef.current.typing += 1;
  };

  return (
    <section className={styles.scrollStory} ref={sectionRef}>
      <div className={styles.stickyStage} ref={stageRef}>
        <div aria-hidden="true" className={styles.stageGrid} />
        <div className={styles.heroIntro} ref={introRef}>
          <p className={styles.eyebrow}>
            SOFTWARE ENGINEERING <span aria-hidden="true">↗</span> AI RESEARCH
          </p>
          <h1>
            Eunkwang
            <br />
            <span>Shin.</span>
          </h1>
          <p className={styles.heroDescription}>{profile.intro}</p>
          <a className={styles.primaryLink} href="#research">
            Explore my work <span aria-hidden="true">↘</span>
          </a>
        </div>

        {storySteps.map((step, index) => (
          <div
            aria-hidden="true"
            className={styles.heroNext}
            data-story-step={index}
            key={step.title}
          >
            <p className={styles.eyebrow}>
              0{index + 1} /{" "}
              {researchInterests[step.interest].name.toUpperCase()}
            </p>
            <h2>{step.title}</h2>
            <p>{researchInterests[step.interest].description}</p>
          </div>
        ))}

        <div
          className={styles.sceneFrame}
          onPointerLeave={resetPointer}
          onPointerMove={movePointer}
        >
          <div aria-hidden="true" className={styles.sceneFallback}>
            <div className={styles.fallbackOrbit} />
            <div className={styles.fallbackSphere}>g.</div>
          </div>
          <canvas
            aria-hidden="true"
            className={styles.sceneCanvas}
            data-ready={ready}
            ref={canvasRef}
            tabIndex={-1}
          />
        </div>

        <div className={styles.stageFooter}>
          <span className={styles.scrollHint}>
            <span aria-hidden="true">↓</span> SCROLL TO EXPLORE
            <span aria-hidden="true" className={styles.scrollProgress}>
              <span />
            </span>
          </span>
          <fieldset
            aria-label="Explore research interests"
            className={styles.sceneControls}
          >
            {researchInterests.map((interest, index) => (
              <button
                aria-pressed={activeInterest === index}
                className={styles.sceneControl}
                data-interest={index}
                key={interest.name}
                onClick={selectInterest}
                type="button"
              >
                <span className={styles.controlNumber}>{interest.number}</span>
                {interest.name}
              </button>
            ))}
            <button
              aria-label="Type on keyboard"
              className={styles.typingButton}
              disabled={!ready}
              onClick={startTyping}
              type="button"
            >
              <span aria-hidden="true">⌨</span>
            </button>
          </fieldset>
        </div>
      </div>
    </section>
  );
}
