import { useEffect, useRef, useState } from "react";

/**
 * Process — Direction A "sticky canvas". The whole composition is held in one
 * pinned viewport (via CSS position:sticky — no GSAP pin, no refreshPriority):
 * a section-header band (title + body), then a 2-column stage — the 4 steps as a
 * compact list with a progress rail on the LEFT (the active one bright, the
 * others dim), and a single large line-art canvas on the RIGHT that redraws per
 * step. As you scroll the (tall) section, the rail fills continuously and the
 * active step advances; the canvas crossfades. Forced-dark #07080b; Anton /
 * Hanken / Geist Mono; forest-green #008a65. No eyebrow — leads with the title.
 *
 * Mechanic: the section is ~SECTION_VH tall; an inner stage is position:sticky
 * top:0, so it holds the viewport while the section scrolls past. A passive
 * scroll listener maps the section's scroll progress (0→1) to the rail fill
 * (continuous, set on a ref — no re-render) and the active index (floor(p*4),
 * equality-guarded state). Because the steps don't scroll away, every step —
 * including the last — gets an equal quarter of dwell. No pin ⇒ can't jump on
 * entry and needs no refresh ordering.
 *
 * The canvas art is line-work standing in for the real per-step visuals (TBD).
 * Reduced motion OR < lg → a static, fully-visible list of all 4 steps.
 */

type Step = { n: string; name: string; copy: string; tag: string };

const STEPS: Step[] = [
  {
    n: "01",
    name: "Understand",
    copy: "Clarity on the business, audience, goals, and opportunity.",
    tag: "understand"
  },
  {
    n: "02",
    name: "Shape",
    copy: "Strategy, content, journeys, and design direction built into a clear plan.",
    tag: "shape"
  },
  {
    n: "03",
    name: "Build",
    copy: "Products, websites, presentations, and communication brought to life with design.",
    tag: "build"
  },
  {
    n: "04",
    name: "Improve",
    copy: "Refinement, optimisation, and support to keep the experience moving forward.",
    tag: "improve"
  }
];

const GREEN = "#008a65";
const GREEN_BRIGHT = "#16a07a";
// Section height = 1 viewport (the pinned stage) + this many per step of scrub.
const STEP_VH = 0.62;

function getReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function getDesktop() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(min-width: 1024px)").matches
  );
}

// Per-step line-art (the canvas). Stand-in for the real visuals.
function StepArt({ active }: { active: number }) {
  const stroke = GREEN_BRIGHT;
  const dim = "#2f3a35";
  const common = {
    width: 210,
    height: 210,
    viewBox: "0 0 130 130",
    fill: "none",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const
  };
  return (
    <div
      key={active}
      aria-hidden="true"
      className="dt-canvas-enter flex items-center justify-center"
    >
      {active === 0 && (
        <svg {...common}>
          <circle cx="65" cy="65" r="46" stroke={dim} />
          <circle cx="65" cy="65" r="26" stroke={dim} />
          <line x1="65" y1="6" x2="65" y2="22" stroke={stroke} />
          <line x1="65" y1="108" x2="65" y2="124" stroke={stroke} />
          <line x1="6" y1="65" x2="22" y2="65" stroke={stroke} />
          <line x1="108" y1="65" x2="124" y2="65" stroke={stroke} />
          <circle cx="65" cy="65" r="5" fill={stroke} stroke="none" />
          <circle cx="95" cy="40" r="2.5" fill={stroke} stroke="none" />
          <circle cx="40" cy="92" r="2.5" fill={stroke} stroke="none" />
        </svg>
      )}
      {active === 1 && (
        <svg {...common} viewBox="0 0 150 130" width={240}>
          <polyline points="20,100 55,55 95,75 130,28" stroke={stroke} />
          <circle cx="20" cy="100" r="4.5" fill="#0b0d10" stroke={stroke} />
          <circle cx="55" cy="55" r="4.5" fill="#0b0d10" stroke={stroke} />
          <circle cx="95" cy="75" r="4.5" fill="#0b0d10" stroke={stroke} />
          <circle cx="130" cy="28" r="4.5" fill={stroke} stroke={stroke} />
        </svg>
      )}
      {active === 2 && (
        <svg {...common}>
          <rect x="20" y="20" width="28" height="28" stroke={dim} />
          <rect x="51" y="20" width="28" height="28" fill={stroke} stroke="none" />
          <rect x="82" y="20" width="28" height="28" stroke={dim} />
          <rect x="20" y="51" width="28" height="28" fill={stroke} stroke="none" />
          <rect x="51" y="51" width="28" height="28" stroke={dim} />
          <rect x="82" y="51" width="28" height="28" fill={stroke} stroke="none" />
          <rect x="20" y="82" width="28" height="28" stroke={dim} />
          <rect x="51" y="82" width="28" height="28" fill={stroke} stroke="none" />
          <rect x="82" y="82" width="28" height="28" stroke={dim} />
        </svg>
      )}
      {active === 3 && (
        <svg {...common}>
          <rect x="33" y="33" width="64" height="64" rx="16" stroke={stroke} />
          <path d="M97 49 A36 36 0 1 1 81 33" stroke={dim} />
          <path d="M95 30 L99 48 L82 45 Z" fill={stroke} stroke="none" />
        </svg>
      )}
    </div>
  );
}

function Header() {
  return (
    <div className="grid gap-x-16 gap-y-6 md:grid-cols-[1.1fr_0.9fr] md:items-end">
      <h2
        className="font-display uppercase leading-[0.92] text-[#f2eee3]"
        style={{ fontSize: "clamp(2.1rem, 4.6vw, 4.6rem)" }}
      >
        From idea to execution, we keep the{" "}
        <span style={{ color: GREEN }}>process clear.</span>
      </h2>
      <p
        className="max-w-[48ch] font-sans leading-[1.55] text-[#c3bcad]"
        style={{ fontSize: "clamp(15px, 1.05vw, 17px)" }}
      >
        We bring structure to every stage — understanding the problem, shaping
        the direction, building the experience, and improving it over time.
      </p>
    </div>
  );
}

// One compact step in the left list. Active = bright; others dim.
function StepRow({
  s,
  lit,
  staticMode
}: {
  s: Step;
  lit: boolean;
  staticMode: boolean;
}) {
  const on = lit || staticMode;
  return (
    <div
      className="transition-opacity duration-500"
      style={{ opacity: on ? 1 : 0.32 }}
    >
      <div className="flex items-baseline gap-x-4">
        <span
          className="font-display tabular-nums leading-none transition-colors duration-500"
          style={{
            fontSize: "clamp(30px, 2.6vw, 48px)",
            color: on ? GREEN_BRIGHT : "#454b46"
          }}
        >
          {s.n}
        </span>
        <h3
          className="font-display uppercase leading-none text-[#f2eee3]"
          style={{ fontSize: "clamp(24px, 2.4vw, 42px)" }}
        >
          {s.name}
        </h3>
      </div>
      <p
        className="mt-3 max-w-[42ch] font-sans leading-[1.5] text-[#c3bcad]"
        style={{ fontSize: "clamp(14px, 1vw, 16px)" }}
      >
        {s.copy}
      </p>
    </div>
  );
}

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  const [reducedMotion, setReducedMotion] = useState(getReducedMotion);
  const [desktop, setDesktop] = useState(getDesktop);
  const [active, setActive] = useState(0);

  const enableSticky = !reducedMotion && desktop;

  // Map the section's scroll progress to the rail fill (continuous, set on a ref
  // so it doesn't re-render) and the active step (floor(p*4), state). Plain
  // passive listener — no GSAP, no pin, fires on real scroll in both directions.
  useEffect(() => {
    if (!enableSticky || !sectionRef.current) {
      return;
    }
    const section = sectionRef.current;
    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const range = rect.height - window.innerHeight;
      const p = range > 0 ? Math.min(1, Math.max(0, -rect.top / range)) : 0;
      if (fillRef.current) {
        fillRef.current.style.height = `${(p * 100).toFixed(2)}%`;
      }
      const idx = Math.min(STEPS.length - 1, Math.floor(p * STEPS.length));
      setActive((cur) => (cur === idx ? cur : idx));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [enableSticky]);

  // Keep the reduced-motion / breakpoint preferences live.
  useEffect(() => {
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const dq = window.matchMedia("(min-width: 1024px)");
    const sync = () => {
      setReducedMotion(rm.matches);
      setDesktop(dq.matches);
    };
    rm.addEventListener("change", sync);
    dq.addEventListener("change", sync);
    return () => {
      rm.removeEventListener("change", sync);
      dq.removeEventListener("change", sync);
    };
  }, []);

  // ── Static: reduced motion or below lg — header band + all 4 steps, no sticky ─
  if (!enableSticky) {
    return (
      <section
        ref={sectionRef}
        id="process"
        aria-label="Our process"
        className="w-full bg-[#07080b] px-[clamp(20px,6vw,120px)] py-[clamp(72px,14vh,180px)] text-[#f2eee3]"
      >
        <div className="mx-auto w-full max-w-[1240px]">
          <Header />
          <div className="mt-[clamp(44px,8vh,80px)] flex flex-col gap-[clamp(28px,4vh,52px)]">
            {STEPS.map((s) => (
              <StepRow key={s.n} s={s} lit staticMode />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ── Sticky stage: one pinned viewport; scroll advances the active step ───────
  return (
    <section
      ref={sectionRef}
      id="process"
      aria-label="Our process"
      className="w-full bg-[#07080b] px-[clamp(20px,6vw,120px)] text-[#f2eee3]"
      style={{ minHeight: `${100 + STEPS.length * STEP_VH * 100}vh` }}
    >
      <div className="sticky top-0 flex min-h-screen items-center py-[clamp(24px,4vh,64px)]">
        <div className="mx-auto w-full max-w-[1240px]">
          <Header />

          <div className="mt-[clamp(28px,5vh,64px)] grid grid-cols-[1fr_1.05fr] items-center gap-x-[clamp(32px,5vw,96px)]">
            {/* left: rail + compact step list */}
            <div className="grid grid-cols-[3px_1fr] gap-x-[clamp(20px,3vw,44px)]">
              {/* progress rail */}
              <div className="relative w-[3px] self-stretch">
                <div className="absolute inset-0 rounded-full bg-white/10" />
                <div
                  ref={fillRef}
                  className="absolute inset-x-0 top-0 rounded-full"
                  style={{ height: "0%", backgroundColor: GREEN }}
                />
              </div>

              {/* steps */}
              <div className="flex flex-col gap-[clamp(16px,2.4vh,32px)]">
                {STEPS.map((s, i) => (
                  <StepRow key={s.n} s={s} lit={i === active} staticMode={false} />
                ))}
              </div>
            </div>

            {/* right: canvas that redraws per step */}
            <div className="relative flex h-[clamp(300px,60vh,560px)] items-center justify-center overflow-hidden rounded-[20px] border border-[#1d221f] bg-[#0b0d10]">
              <StepArt active={active} />
              <span className="absolute bottom-5 left-6 font-mono text-[12px] tracking-[0.08em] text-[#5f6b64]">
                {"// "}
                {STEPS[active].tag}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
