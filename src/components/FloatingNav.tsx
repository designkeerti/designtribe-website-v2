import type { CSSProperties } from "react";

/**
 * Floating pill nav — bottom-centre, shown once the showreel section takes over
 * (the hero's top nav hides at the same time). Styled after the awwwards
 * `menu-float` bar: a dark rounded pill (logo · nav · CTA) over the reel.
 */

const LOGO = "/assets/design-tribe-logo.svg";

const LINKS = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" }
];

const pillStyle: CSSProperties = {
  background: "rgba(20, 20, 22, 0.72)",
  backdropFilter: "blur(14px)",
  WebkitBackdropFilter: "blur(14px)",
  boxShadow: "0 10px 34px rgba(0, 0, 0, 0.42)"
};

type FloatingNavProps = {
  visible: boolean;
};

export function FloatingNav({ visible }: FloatingNavProps) {
  return (
    <nav
      aria-label="Primary"
      className="fixed bottom-[clamp(16px,3.2vh,30px)] left-1/2 z-[120] -translate-x-1/2"
      style={{
        opacity: visible ? 1 : 0,
        transform: `translateX(-50%) translateY(${visible ? "0px" : "18px"})`,
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 0.5s ease, transform 0.5s cubic-bezier(0.22,1,0.36,1)"
      }}
    >
      <div
        className="flex items-center gap-1 rounded-[14px] border border-white/10 p-1.5"
        style={pillStyle}
      >
        {/* logo + wordmark */}
        <a
          href="#top"
          className="flex shrink-0 items-center rounded-[10px] px-3 py-2.5 transition-colors hover:bg-white/5"
          aria-label="Design Tribe — top"
        >
          <img src={LOGO} alt="Design Tribe" className="h-[22px] w-auto" />
        </a>

        <span className="mx-0.5 hidden h-6 w-px bg-white/10 md:block" aria-hidden="true" />

        {/* nav links */}
        <ul className="hidden items-center md:flex">
          {LINKS.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="block rounded-[10px] px-4 py-2.5 font-mono text-[12px] uppercase tracking-[0.1em] text-[#cfcabd] transition-colors hover:bg-white/5 hover:text-white"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="mailto:hello@designtribe.com"
          className="ml-0.5 shrink-0 whitespace-nowrap rounded-[10px] bg-[#f2eee3] px-4 py-2.5 font-mono text-[12px] font-bold uppercase tracking-[0.04em] text-[#15140f] transition-transform hover:-translate-y-0.5"
        >
          Get in touch
        </a>
      </div>
    </nav>
  );
}
