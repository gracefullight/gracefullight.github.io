import type { PointerEvent } from "react";
import type { HeroSceneState } from "./hero-scene";

import useBaseUrl from "@docusaurus/useBaseUrl";
import { useEffect, useRef, useState } from "react";
import HomeIcon from "./home-icon";
import { profile } from "./profile-data";
import styles from "./styles.module.css";

type HeroScene = ReturnType<typeof import("./hero-scene").createHeroScene>;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<HeroSceneState>({
    pointerX: 0,
    pointerY: 0,
    reducedMotion: false,
    typing: 0,
  });
  const [ready, setReady] = useState(false);
  const baseUrl = useBaseUrl("/");

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!(section && canvas)) return;

    let disposed = false;
    let inView = true;
    let frame = 0;
    let scene: HeroScene | null = null;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    stateRef.current.reducedMotion = motion.matches;

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
    const renderOnce = () => {
      scene?.update(stateRef.current);
      scene?.render(performance.now());
    };
    const updateMotion = () => {
      window.cancelAnimationFrame(frame);
      frame = 0;
      stateRef.current.reducedMotion = motion.matches;
      if (motion.matches) renderOnce();
      resume();
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      resume();
    });
    const resizeObserver = new ResizeObserver(() => {
      scene?.resize();
      if (motion.matches) renderOnce();
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
    document.addEventListener("visibilitychange", onVisibility);
    motion.addEventListener("change", updateMotion);

    void import("./hero-scene")
      .then(({ createHeroScene }) => {
        if (disposed) return;
        scene = createHeroScene(canvas, {
          baseUrl,
          onAssetLoaded: () => {
            // A running loop picks new props up; a paused one needs a frame.
            if (motion.matches || !frame) renderOnce();
          },
        });
        scene.resize();
        renderOnce();
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
      document.removeEventListener("visibilitychange", onVisibility);
      motion.removeEventListener("change", updateMotion);
      scene?.dispose();
    };
  }, [baseUrl]);

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
    <section className={styles.hero} ref={sectionRef}>
      <div className={styles.heroIntro}>
        <h1>
          Eunkwang
          <br />
          <span>Shin.</span>
        </h1>
        <p className={styles.heroDescription}>{profile.intro}</p>
        <div className={styles.heroActions}>
          <a className={styles.primaryLink} href="#writing">
            Latest posts <HomeIcon name="arrow-down" />
          </a>
          <a className={styles.heroSecondary} href="#experience">
            Experience <HomeIcon name="arrow-down" />
          </a>
        </div>
      </div>

      <div
        className={styles.sceneFrame}
        onPointerLeave={resetPointer}
        onPointerMove={movePointer}
      >
        <div aria-hidden="true" className={styles.sceneFallback}>
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

      <button
        aria-label="Type on keyboard"
        className={styles.typingButton}
        disabled={!ready}
        onClick={startTyping}
        title="Animate typing"
        type="button"
      >
        <HomeIcon name="keyboard" />
      </button>
    </section>
  );
}
