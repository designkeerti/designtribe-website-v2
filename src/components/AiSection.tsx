import { useRef } from "react";
import { gsap, useGSAP } from "../lib/gsap";

/**
 * "AI can do remarkable things." — the studio's stance on AI + human craft,
 * shown right after the bento zooms into its centre. A statement headline +
 * intro over a 2×2 grid of hairline-divided points, on the dark stage.
 */

const INTRO =
  "We have spent more time thinking about AI and design than most studios — because we design AI products ourselves, and because we have watched AI tools reshape the craft we love. Our conclusion is this: AI is a powerful instrument in skilled hands. In the wrong hands, it is a very efficient way to produce mediocre work at scale.";

const POINTS = [
  {
    head: "We design AI products.",
    body: "We have deep experience designing AI-native applications — agentic interfaces, LLM-powered tools, intelligent dashboards. We understand what AI can and cannot do at a product level, not just a conceptual one."
  },
  {
    head: "We use AI intelligently.",
    body: "We use AI tools in our practice where they genuinely accelerate quality work. We never use them as a substitute for human thinking, human empathy, or the irreducible craft of design."
  },
  {
    head: "We put the human back in the loop.",
    body: "In a world where AI is everywhere, the studios that will matter are those that restore what automation strips out: warmth, character, intention, and the quiet confidence of something made by people who cared."
  },
  {
    head: "We create economic value by doing so.",
    body: "Human-centred design isn't a soft ideal — it drives hard outcomes. Higher conversion, stronger retention, deeper loyalty, faster trust. The ROI of great design is real, and we are fluent in making that case."
  }
];

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function AiSection() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !rootRef.current) {
        return;
      }
      gsap.from("[data-ai-reveal]", {
        y: 30,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 72%" }
      });
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      className="relative w-full overflow-hidden bg-[#07080b] px-[clamp(20px,6vw,120px)] py-[clamp(72px,14vh,180px)] text-[#f2eee3]"
    >
      <div className="mx-auto w-full max-w-[1240px]">
        <div className="grid gap-x-16 gap-y-7 md:grid-cols-[1.05fr_0.95fr] md:items-end">
          <h2
            data-ai-reveal
            className="font-display uppercase leading-[0.92] text-[#f2eee3]"
            style={{ fontSize: "clamp(2.3rem, 5.6vw, 5.5rem)" }}
          >
            AI can do <span className="text-[#008a65]">remarkable</span> things.
          </h2>
          <p
            data-ai-reveal
            className="max-w-[52ch] font-sans leading-[1.55] text-[#c3bcad]"
            style={{ fontSize: "clamp(15px, 1.15vw, 19px)" }}
          >
            {INTRO}
          </p>
        </div>

        <div className="mt-[clamp(48px,9vh,104px)] grid gap-px overflow-hidden bg-[#1a1f1c] sm:grid-cols-2">
          {POINTS.map((p, i) => (
            <div
              key={p.head}
              data-ai-reveal
              className="group bg-[#07080b] p-[clamp(24px,3vw,52px)] transition-colors duration-300 hover:bg-[#0c0f12]"
            >
              <span className="font-mono text-[13px] tracking-[0.14em] text-[#008a65]">
                {`0${i + 1}`}
              </span>
              <h3
                className="mt-5 font-sans font-bold leading-[1.12] text-[#f2eee3]"
                style={{ fontSize: "clamp(20px, 1.9vw, 31px)" }}
              >
                {p.head}
              </h3>
              <p
                className="mt-3.5 max-w-[46ch] font-sans leading-[1.55] text-[#94928a]"
                style={{ fontSize: "clamp(14px, 0.95vw, 16px)" }}
              >
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
