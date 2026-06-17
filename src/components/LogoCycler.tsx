import { useEffect, useRef, useState } from "react";

/**
 * Partner logos that swap themselves out at random — a small "trusted by" set
 * where each slot crossfades to a different logo on a stagger. Logos are forced
 * to a uniform soft-white (they ship in mixed greys) so they read as one set on
 * the dark stage. Reduced motion → static (no swapping).
 */

// Clean wordmark logos (paths-only, no background plates → render well inverted).
const LOGOS = [
  "/assets/figma-home/client-pitney-bowes.svg",
  "/assets/figma-home/client-prometric.svg",
  "/assets/figma-home/client-symphony-ai.svg",
  "/assets/figma-home/client-diebold-nixdorf.svg",
  "/assets/logos/trusted/wareiq.svg",
  "/assets/logos/trusted/safebay.svg",
  "/assets/logos/trusted/crosstower.svg",
  "/assets/logos/trusted/enphase.svg",
  "/assets/logos/trusted/precily-ai.svg",
  "/assets/logos/trusted/vitran-ai.svg",
  "/assets/logos/trusted/kreatorverse.svg",
  "/assets/logos/trusted/greenstory.svg",
  "/assets/logos/trusted/gatefm.svg",
  "/assets/logos/trusted/gutenberg.svg"
];

const LOGO_STYLE = {
  filter: "brightness(0) invert(1)",
  opacity: 0.78,
  transition: "opacity 360ms ease"
} as const;

function getReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** One slot — fades out, swaps its logo, fades back in when `src` changes. */
function LogoSlot({ src }: { src: string }) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [shown, setShown] = useState(src);

  useEffect(() => {
    if (src === shown) {
      return;
    }
    const el = imgRef.current;
    if (!el) {
      setShown(src);
      return;
    }
    el.style.opacity = "0";
    const t = window.setTimeout(() => setShown(src), 360);
    return () => window.clearTimeout(t);
  }, [src, shown]);

  useEffect(() => {
    const el = imgRef.current;
    if (el) {
      requestAnimationFrame(() => {
        el.style.opacity = "0.78";
      });
    }
  }, [shown]);

  return (
    <img
      ref={imgRef}
      src={shown}
      alt=""
      aria-hidden="true"
      className="h-full w-full object-contain object-left"
      style={LOGO_STYLE}
    />
  );
}

type LogoCyclerProps = {
  slots?: number;
  intervalMs?: number;
};

export function LogoCycler({ slots = 5, intervalMs = 2000 }: LogoCyclerProps) {
  const count = Math.min(slots, LOGOS.length);
  const [current, setCurrent] = useState<number[]>(() =>
    Array.from({ length: count }, (_, i) => i)
  );

  useEffect(() => {
    if (getReducedMotion()) {
      return;
    }
    const id = window.setInterval(() => {
      setCurrent((prev) => {
        const used = new Set(prev);
        const avail = LOGOS.map((_, i) => i).filter((i) => !used.has(i));
        if (avail.length === 0) {
          return prev;
        }
        const slot = Math.floor(Math.random() * prev.length);
        const next = avail[Math.floor(Math.random() * avail.length)];
        const copy = prev.slice();
        copy[slot] = next;
        return copy;
      });
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [intervalMs]);

  return (
    <div
      className="flex items-center gap-[clamp(24px,3.2vw,56px)]"
      aria-label="Selected partners"
    >
      {current.map((logoIndex, slot) => (
        <div
          key={slot}
          className="h-[clamp(34px,4.6vw,72px)] w-[clamp(120px,15vw,240px)] shrink-0"
        >
          <LogoSlot src={LOGOS[logoIndex]} />
        </div>
      ))}
    </div>
  );
}
