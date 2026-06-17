import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP, ScrollTrigger } from "../lib/gsap";

/**
 * Services — a pinned horizontal-scroll **parallax carousel**. The section pins
 * full-bleed and an inner strip (intro panel → 8 service cards → CTA panel) slides
 * left as you scroll (pin + a single scrubbed x tween — NOT ScrollSmoother; see
 * DECISIONS). Each card's image is oversized and **panned within its frame** based
 * on the card's position across the viewport, giving a parallax-depth feel
 * (style ref: parallax-carousel.framer.ai). Cards are contained (float with space
 * above/below), not full-height.
 *
 * Forced-dark to flow out of the AI section. Reduced motion → a static grid.
 * Card imagery is placeholder Unsplash for now (public/assets/services/).
 */

type Service = {
  title: string;
  copy: string;
  slug: string;
  image: string;
};

const SERVICES: Service[] = [
  {
    title: "Branding",
    copy: "We build brands that do more than exist — they captivate, endure, and lead.",
    slug: "branding",
    image: "/assets/services/s1.jpg"
  },
  {
    title: "Rebranding",
    copy: "Every great brand needs to evolve. Let's make sure yours evolves on purpose.",
    slug: "rebranding",
    image: "/assets/services/s2.jpg"
  },
  {
    title: "UX + UI Design",
    copy: "Research-led. Rigorously tested. Designed to be felt, not just seen.",
    slug: "ux-ui-design",
    image: "/assets/services/s3.jpg"
  },
  {
    title: "Website Design + Development",
    copy: "Craft an accessible web presence that connects deeply and turns browsers into believers.",
    slug: "website-design-development",
    image: "/assets/services/s4.jpg"
  },
  {
    title: "AI Product + Software Design",
    copy: "Designing for AI is a new discipline. Most teams are improvising. We're not.",
    slug: "ai-product-software-design",
    image: "/assets/services/s5.jpg"
  },
  {
    title: "Design Systems + Frameworks",
    copy: "Scale without chaos. Build once, build right, and never start from scratch again.",
    slug: "design-systems-frameworks",
    image: "/assets/services/s6.jpg"
  },
  {
    title: "Content + Marketing Design",
    copy: "Fuel your growth with creative that earns attention and demands action.",
    slug: "content-marketing-design",
    image: "/assets/services/s7.jpg"
  },
  {
    title: "Presentation Design",
    copy: "Your ideas deserve a stage worthy of them. We build that stage.",
    slug: "presentation-design",
    image: "/assets/services/s8.jpg"
  }
];

const GREEN = "#008a65";

// Contained carousel-card height (floats with space above/below in the pinned stage).
const PANEL_H = "clamp(440px,76vh,880px)";
// Image is scaled past the frame so the parallax pan never reveals an edge.
const IMG_SCALE = 1.26;
const PARALLAX = 0.1; // max pan as a fraction of card width (must stay < (IMG_SCALE-1)/2)

// Bottom-up scrim — dark enough behind the text, clears by mid-card so the image breathes.
const CARD_SCRIM =
  "linear-gradient(to top, rgba(5,6,9,0.92) 0%, rgba(5,6,9,0.68) 30%, rgba(5,6,9,0.22) 52%, rgba(5,6,9,0) 76%)";

function getReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function ServiceCard({ s, className }: { s: Service; className?: string }) {
  return (
    <a
      href={`/services/${s.slug}`}
      className={`group relative flex shrink-0 flex-col justify-end overflow-hidden rounded-[18px] border border-white/[0.06] transition-colors duration-500 hover:border-white/20 ${className ?? ""}`}
    >
      {/* parallax image — oversized, panned within the frame in onUpdate */}
      <img
        data-parallax
        src={s.image}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover will-change-transform"
        style={{ transform: `scale(${IMG_SCALE})` }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: CARD_SCRIM }}
      />
      <div className="relative">
        <h3
          className="font-display uppercase leading-[0.9] text-[#f6f3ec]"
          style={{ fontSize: "clamp(2rem, 2.7vw, 3.3rem)" }}
        >
          {s.title}
        </h3>
        <p className="mt-3 max-w-[32ch] font-sans text-[14.5px] leading-[1.5] text-[#c9ccc6]">
          {s.copy}
        </p>
        <span className="mt-6 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[#f2eee3]">
          <span
            className="h-px w-7 bg-[#008a65] transition-all duration-300 group-hover:w-12"
            aria-hidden="true"
          />
          View service
        </span>
      </div>
    </a>
  );
}

function IntroPanel() {
  return (
    <div
      className="relative flex w-[clamp(420px,54vw,720px)] shrink-0 flex-col justify-end pb-[clamp(22px,2.2vw,40px)] pr-[clamp(24px,4vw,80px)]"
      style={{ height: PANEL_H }}
    >
      <h2
        className="font-display uppercase leading-[0.9] text-[#f2eee3]"
        style={{ fontSize: "clamp(2.4rem, 6vw, 6rem)" }}
      >
        From brand identity to{" "}
        <span style={{ color: GREEN }}>AI-native</span> interfaces.
      </h2>
      <p
        className="mt-6 max-w-[46ch] font-sans leading-[1.55] text-[#c3bcad]"
        style={{ fontSize: "clamp(15px, 1.1vw, 18px)" }}
      >
        Intentional design is the foundation. Purposeful experience is the
        method. Results — for your users and your bottom line — are always the
        objective.
      </p>
      <span className="mt-9 inline-flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.2em] text-[#8d918d]">
        Scroll
        <span className="h-px w-12 bg-[#3a3f3b]" aria-hidden="true" />
        <span aria-hidden="true">→</span>
      </span>
    </div>
  );
}

function CtaPanel({ className }: { className?: string }) {
  return (
    <a
      href="mailto:hello@designtribe.com"
      className={`group relative flex shrink-0 flex-col justify-end overflow-hidden rounded-[18px] border border-[#008a65]/40 bg-gradient-to-br from-[#0c1512] to-[#07080b] ${className ?? ""}`}
    >
      <span
        className="font-mono text-[12px] uppercase tracking-[0.22em]"
        style={{ color: GREEN }}
      >
        Start a project
      </span>
      <h3
        className="mt-5 font-display uppercase leading-[0.95] text-[#f2eee3]"
        style={{ fontSize: "clamp(2.1rem, 4vw, 4.2rem)" }}
      >
        Let's make something worth making.
      </h3>
      <span
        className="mt-8 inline-flex w-fit items-center gap-2 rounded-full px-6 py-3 font-mono text-[13px] uppercase tracking-[0.12em] text-white transition-transform duration-300 group-hover:translate-x-1"
        style={{ backgroundColor: GREEN }}
      >
        Get started →
      </span>
    </a>
  );
}

export function ServicesScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  const [reducedMotion, setReducedMotion] = useState(getReducedMotion);

  useGSAP(
    () => {
      if (reducedMotion || !sectionRef.current || !stripRef.current) {
        return;
      }
      const section = sectionRef.current;
      const strip = stripRef.current;
      const parallaxImgs = gsap.utils.toArray<HTMLElement>(
        strip.querySelectorAll("[data-parallax]")
      );

      const amount = () => Math.max(0, strip.scrollWidth - window.innerWidth);

      // Pan each card's (oversized) image by a fraction of how far the card is
      // from the viewport centre → the image lags the card = parallax depth.
      const applyParallax = () => {
        const half = window.innerWidth / 2;
        for (const img of parallaxImgs) {
          const card = img.parentElement;
          if (!card) continue;
          const rect = card.getBoundingClientRect();
          const d = rect.left + rect.width / 2 - half;
          const max = rect.width * PARALLAX;
          const shift = gsap.utils.clamp(-max, max, -(d / half) * max);
          img.style.transform = `translate3d(${shift.toFixed(1)}px,0,0) scale(${IMG_SCALE})`;
        }
      };

      gsap.to(strip, {
        x: () => -amount(),
        ease: "none",
        // Run the parallax from the tween's onUpdate (every scrub-catchup frame),
        // not the ScrollTrigger's onUpdate which fires on raw scroll before the
        // scrubbed strip has caught up.
        onUpdate: applyParallax,
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${amount()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          // This pin sits BELOW the bento's pin, which (per DECISIONS) is created
          // in a plain useEffect — i.e. AFTER this useGSAP (useLayoutEffect) one.
          // Without a lower refresh priority, this trigger computes its start
          // before the bento's pin-spacer exists and pins ~1 viewport too early
          // (a jump as you enter from the AI section). Refresh after the bento.
          refreshPriority: -1
        }
      });

      applyParallax();

      // Anton loads async; its width changes the strip length → recompute once ready.
      if (document.fonts) {
        document.fonts.ready.then(() => ScrollTrigger.refresh());
      }
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

  // Keep the reduced-motion preference live.
  useEffect(() => {
    const q = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(q.matches);
    q.addEventListener("change", sync);
    return () => q.removeEventListener("change", sync);
  }, []);

  // ── Reduced motion: a static, fully-visible grid ────────────────────────────
  if (reducedMotion) {
    return (
      <section
        id="services"
        aria-label="Services"
        className="w-full bg-[#07080b] px-[clamp(20px,6vw,120px)] py-[clamp(72px,14vh,180px)] text-[#f2eee3]"
      >
        <div className="mx-auto w-full max-w-[1240px]">
          <h2
            className="max-w-[18ch] font-display uppercase leading-[0.9] text-[#f2eee3]"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)" }}
          >
            From brand identity to{" "}
            <span style={{ color: GREEN }}>AI-native</span> interfaces.
          </h2>
          <p className="mt-6 max-w-[60ch] font-sans text-[17px] leading-[1.55] text-[#c3bcad]">
            Intentional design is the foundation. Purposeful experience is the
            method. Results — for your users and your bottom line — are always
            the objective.
          </p>
          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {SERVICES.map((s) => (
              <ServiceCard
                key={s.slug}
                s={s}
                className="min-h-[340px] p-[clamp(22px,2.2vw,40px)]"
              />
            ))}
          </div>
          <div className="mt-5">
            <CtaPanel className="p-[clamp(28px,3vw,52px)]" />
          </div>
        </div>
      </section>
    );
  }

  // ── Motion: pinned horizontal parallax carousel ─────────────────────────────
  return (
    <section
      ref={sectionRef}
      id="services"
      aria-label="Services"
      className="relative h-[100svh] w-full overflow-hidden bg-[#07080b] text-[#f2eee3]"
    >
      {/* moving strip — contained cards, vertically centred */}
      <div
        ref={stripRef}
        className="flex h-full items-center gap-[clamp(16px,2vw,36px)] pl-[clamp(20px,6vw,120px)] pr-[clamp(20px,6vw,120px)] will-change-transform"
      >
        <IntroPanel />
        {SERVICES.map((s) => (
          <ServiceCard
            key={s.slug}
            s={s}
            className="h-[clamp(440px,76vh,880px)] w-[clamp(300px,34vw,440px)] p-[clamp(22px,2.2vw,40px)]"
          />
        ))}
        <CtaPanel className="h-[clamp(440px,76vh,880px)] w-[clamp(380px,44vw,600px)] p-[clamp(28px,3vw,52px)]" />
      </div>
    </section>
  );
}
