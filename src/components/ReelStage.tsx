import { useEffect, useRef, useState } from "react";
import { LogoCycler } from "./LogoCycler";
import { gsap, useGSAP, ScrollTrigger, SplitText } from "../lib/gsap";

/**
 * Showreel stage — sits directly below the hero (no reveal/fade).
 *
 * The autoplaying reel holds full-bleed for a beat, then video + headline ride
 * one rail that slides left: the reel exits stage-left while the oversized
 * headline scrolls in from the right, each character tumbling into place. It
 * rests with **"business" at the left margin**, the cycling partner logos just
 * beneath it.
 *
 * Reduced motion → a static closing frame (poster + headline + logos).
 */

const REEL_1080 = "/assets/reel/reel-1080.mp4";
const REEL_720 = "/assets/reel/reel-720.mp4";
const REEL_POSTER = "/assets/reel/reel-poster.jpg";

const HEADING = "Design that moves people. And business";
const ACCENT_WORDS = new Set([2, 3]); // "moves" "people." → forest green
const MINT = "#008a65"; // brand forest green (accent)

const TRACK_VH = 440;
const HOLD_END = 0.18; // reel holds full-bleed until here, then the rail slides
const HEADLINE_SIZE = "clamp(2.5rem, 11vw, 13rem)";

function getReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

const seg = (p: number, a: number, b: number) =>
  gsap.utils.clamp(0, 1, (p - a) / (b - a));

export function ReelStage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const logosRef = useRef<HTMLDivElement>(null);

  const charsRef = useRef<HTMLElement[]>([]);
  const charLeftRef = useRef<number[]>([]);
  const scatterRef = useRef<{ y: number; rot: number }[]>([]);
  const railTargetRef = useRef(0);

  const [reducedMotion, setReducedMotion] = useState(getReducedMotion);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const q = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(q.matches);
    sync();
    q.addEventListener("change", sync);
    return () => q.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reel autoplays (muted + inline); an observer on the video plays/pauses it by
  // real visibility, so it pauses once it has slid off-stage.
  useEffect(() => {
    if (reducedMotion) {
      return;
    }
    const video = videoRef.current;
    if (!video) {
      return;
    }
    video.muted = true;
    video.playsInline = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0 }
    );
    io.observe(video);
    return () => io.disconnect();
  }, [reducedMotion, mounted]);

  useGSAP(
    () => {
      if (reducedMotion || !stageRef.current || !textRef.current) {
        return;
      }
      const stage = stageRef.current;

      const split = SplitText.create(textRef.current, { type: "chars,words" });
      const words = split.words as HTMLElement[];
      words.forEach((w, i) => {
        if (ACCENT_WORDS.has(i)) {
          w.style.color = MINT;
        }
      });
      charsRef.current = split.chars as HTMLElement[];
      scatterRef.current = charsRef.current.map(() => ({
        y: gsap.utils.random(-220, 220),
        rot: gsap.utils.random(-22, 22)
      }));

      const backOut = gsap.parseEase("back.out(1.5)");

      const measure = () => {
        gsap.set(railRef.current, { x: 0 });
        charLeftRef.current = charsRef.current.map(
          (c) => c.getBoundingClientRect().left
        );
        const margin = window.innerWidth * 0.05;
        const biz = words[words.length - 1];
        railTargetRef.current = biz.getBoundingClientRect().left - margin;
        if (logosRef.current && panelRef.current) {
          const panel = panelRef.current.getBoundingClientRect();
          const r = biz.getBoundingClientRect();
          logosRef.current.style.left = `${r.left - panel.left}px`;
          logosRef.current.style.top = `${r.bottom - panel.top + Math.max(24, window.innerWidth * 0.02)}px`;
        }
      };
      measure();
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
          measure();
          ScrollTrigger.refresh();
        });
      }

      const applyScatter = (railX: number) => {
        const vw = window.innerWidth;
        const enterStart = vw * 0.96;
        const enterEnd = vw * 0.3;
        const chars = charsRef.current;
        const lefts = charLeftRef.current;
        const scatter = scatterRef.current;
        for (let i = 0; i < chars.length; i++) {
          const left = lefts[i] + railX;
          const eP = gsap.utils.clamp(
            0,
            1,
            (enterStart - left) / (enterStart - enterEnd)
          );
          const f = 1 - (backOut as (v: number) => number)(eP);
          chars[i].style.transform = `translate3d(0, ${scatter[i].y * f}%, 0) rotate(${scatter[i].rot * f}deg)`;
        }
      };

      const trigger = ScrollTrigger.create({
        trigger: stage,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.4,
        onUpdate: (self) => {
          const hp = seg(self.progress, HOLD_END, 1);
          const railX = -railTargetRef.current * hp;
          gsap.set(railRef.current, { x: railX });
          applyScatter(railX);
          if (logosRef.current) {
            gsap.set(logosRef.current, { autoAlpha: seg(hp, 0.82, 0.99) });
          }
        }
      });

      window.addEventListener("resize", measure);
      return () => {
        window.removeEventListener("resize", measure);
        trigger.kill();
        split.revert();
      };
    },
    { scope: stageRef, dependencies: [reducedMotion] }
  );

  // ── Reduced motion: a static closing frame ───────────────────────────────────
  if (reducedMotion) {
    return (
      <section className="relative flex min-h-[100svh] w-full flex-col items-start justify-center gap-12 overflow-hidden bg-[#050506] px-[clamp(20px,5vw,80px)] py-24">
        <img
          src={REEL_POSTER}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <h3
          className="relative max-w-[16ch] font-display uppercase leading-[0.95] text-[#f2eee3]"
          style={{ fontSize: "clamp(2.5rem, 8vw, 7rem)" }}
        >
          Design that <span style={{ color: MINT }}>moves people.</span> And business
        </h3>
        <div className="relative">
          <LogoCycler />
        </div>
      </section>
    );
  }

  // ── Motion: hold the reel, then the filmstrip rail ───────────────────────────
  return (
    <div ref={stageRef} className="relative w-full" style={{ height: `${TRACK_VH}vh` }}>
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-[#050506]">
        <div ref={railRef} className="absolute inset-0 z-0 flex items-center will-change-transform">
          {/* reel panel */}
          <div className="relative h-full w-screen shrink-0 overflow-hidden">
            {mounted && (
              <video
                ref={(el) => {
                  videoRef.current = el;
                  if (el) {
                    el.muted = true;
                  }
                }}
                className="h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                poster={REEL_POSTER}
                disablePictureInPicture
              >
                <source media="(max-width: 768px)" src={REEL_720} type="video/mp4" />
                <source src={REEL_1080} type="video/mp4" />
              </video>
            )}
            <div
              className="pointer-events-none absolute inset-0"
              style={{ boxShadow: "inset 0 0 200px 40px rgba(5,5,6,0.5)" }}
            />
          </div>

          {/* headline + logos panel */}
          <div ref={panelRef} className="relative shrink-0 pl-[14vw]">
            <h3
              ref={textRef}
              className="whitespace-nowrap font-display uppercase leading-none text-[#f2eee3]"
              style={{ fontSize: HEADLINE_SIZE }}
            >
              {HEADING}
            </h3>
            <div ref={logosRef} className="absolute" style={{ opacity: 0 }}>
              <LogoCycler />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
