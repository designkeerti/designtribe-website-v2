import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode, Ref } from "react";
import {
  humanAiItems,
  humanIntroItems,
  processRows,
  services,
  workItems
} from "../data/homeData";
import type {
  HumanAiItem,
  ProcessRow as ProcessRowType,
  Service,
  WorkItem
} from "../data/homeData";
import { usePageMotionReady, useRevealOnView } from "../hooks/useMotion";

type SectionHeaderProps = {
  id: string;
  title: ReactNode;
  body: ReactNode;
  bodyClassName?: string;
};

type MotionProps = {
  motionClassName?: string;
  motionStyle?: CSSProperties;
};

type MotionSectionProps = {
  motionRef?: Ref<HTMLElement>;
};

export type ThemeMode = "light" | "dark";

export const containerClass = "mx-auto w-[min(1152px,calc(100vw-48px))] max-sm:w-[calc(100vw-32px)]";
const figmaAsset = (name: string) => `/assets/figma-home/${name}`;
const motionDelay = (delay: string) => ({ "--motion-delay": delay } as CSSProperties);
const processRailHeights = [98, 244, 390, 536];
const heroVideoSrc = figmaAsset("hero-video-placeholder.mp4");
const rotatingSetHoldMs = 2000;
const rotatingCellTransitionMs = 430;
const rotatingCellGapMs = 500;
const rotatingCellStepMs = rotatingCellTransitionMs + rotatingCellGapMs;
const rotatingVisibleCellCount = 6;
const rotatingSetTransitionMs =
  rotatingCellStepMs * (rotatingVisibleCellCount - 1) + rotatingCellTransitionMs;

const themeAssets = {
  light: {
    headerLogo: figmaAsset("dt-logo.svg"),
    footerLogo: figmaAsset("footer-logo.svg"),
    sunIcon: figmaAsset("theme-light-sun.svg"),
    toggle: figmaAsset("theme-light-toggle.svg"),
    moonIcon: figmaAsset("theme-light-moon.svg")
  },
  dark: {
    headerLogo: figmaAsset("dt-logo-dark.svg"),
    footerLogo: figmaAsset("footer-logo-dark.svg"),
    sunIcon: figmaAsset("theme-dark-sun.svg"),
    toggle: figmaAsset("theme-dark-toggle.svg"),
    moonIcon: figmaAsset("theme-dark-moon.svg")
  }
} as const;

type TrustedLogo = {
  src: Record<ThemeMode, string>;
  alt: string;
  variant?: "cell" | "mark";
};

type IndustryItem = {
  src: Record<ThemeMode, string>;
  label: string;
};

const trustedLogoSets: TrustedLogo[][] = [
  [
    { src: { light: figmaAsset("client-01.svg"), dark: figmaAsset("client-01-dark.svg") }, alt: "SymphonyAI" },
    { src: { light: figmaAsset("client-02.svg"), dark: figmaAsset("client-02-dark.svg") }, alt: "Pitney Bowes" },
    { src: { light: figmaAsset("client-03.svg"), dark: figmaAsset("client-03-dark.svg") }, alt: "Prometric" },
    { src: { light: figmaAsset("client-04.svg"), dark: figmaAsset("client-04-dark.svg") }, alt: "Diebold Nixdorf" },
    { src: { light: figmaAsset("client-05.svg"), dark: figmaAsset("client-05-dark.svg") }, alt: "Integrify" },
    { src: { light: figmaAsset("client-06.svg"), dark: figmaAsset("client-06-dark.svg") }, alt: "WareIQ" }
  ],
  [
    { src: { light: figmaAsset("client-set2-01.svg"), dark: figmaAsset("client-set2-01-dark.svg") }, alt: "Absolute" },
    { src: { light: figmaAsset("client-set2-02.svg"), dark: figmaAsset("client-set2-02-dark.svg") }, alt: "GIZ" },
    { src: { light: figmaAsset("client-set2-03.svg"), dark: figmaAsset("client-set2-03-dark.svg") }, alt: "Lybrate" },
    { src: { light: figmaAsset("client-set2-04.svg"), dark: figmaAsset("client-set2-04-dark.svg") }, alt: "KMG" },
    { src: { light: figmaAsset("client-set2-05.svg"), dark: figmaAsset("client-set2-05-dark.svg") }, alt: "Safebay" },
    { src: { light: figmaAsset("client-set2-06.svg"), dark: figmaAsset("client-set2-06-dark.svg") }, alt: "Enphase" }
  ],
  [
    { src: { light: figmaAsset("client-set3-01.svg"), dark: figmaAsset("client-set3-01-dark.svg") }, alt: "Vitran" },
    { src: { light: figmaAsset("client-set3-02.svg"), dark: figmaAsset("client-set3-02-dark.svg") }, alt: "Greenstory" },
    { src: { light: figmaAsset("client-set3-03.svg"), dark: figmaAsset("client-set3-03-dark.svg") }, alt: "Asian Corporation" },
    { src: { light: figmaAsset("client-set3-04.svg"), dark: figmaAsset("client-set3-04-dark.svg") }, alt: "Gutenberg" },
    { src: { light: figmaAsset("client-set3-05.svg"), dark: figmaAsset("client-set3-05-dark.svg") }, alt: "Future Food Cast" },
    { src: { light: figmaAsset("client-set3-06.svg"), dark: figmaAsset("client-set3-06-dark.svg") }, alt: "GateFM" }
  ],
  [
    { src: { light: figmaAsset("client-set4-01.svg"), dark: figmaAsset("client-set4-01-dark.svg") }, alt: "NFT Kreator" },
    { src: { light: figmaAsset("client-set4-02.svg"), dark: figmaAsset("client-set4-02-dark.svg") }, alt: "CoFrsh" },
    { src: { light: figmaAsset("client-set4-03.svg"), dark: figmaAsset("client-set4-03-dark.svg") }, alt: "Curd" },
    { src: { light: figmaAsset("client-set4-04.svg"), dark: figmaAsset("client-set4-04-dark.svg") }, alt: "Crosstower" },
    { src: { light: figmaAsset("client-set4-05.svg"), dark: figmaAsset("client-set4-05-dark.svg") }, alt: "Kreatoverse" },
    { src: { light: figmaAsset("client-set4-06-fulton.svg"), dark: figmaAsset("client-set4-06-fulton-dark.svg") }, alt: "Fulton", variant: "mark" }
  ]
];

const industrySets: IndustryItem[][] = [
  [
    { src: { light: figmaAsset("industry-agriculture.svg"), dark: figmaAsset("industry-agriculture-dark.svg") }, label: "Agriculture & Farming" },
    { src: { light: figmaAsset("industry-ai.svg"), dark: figmaAsset("industry-ai-dark.svg") }, label: "Artificial Intelligence" },
    { src: { light: figmaAsset("industry-banking.svg"), dark: figmaAsset("industry-banking-dark.svg") }, label: "Banking & Finance" },
    { src: { light: figmaAsset("industry-clean-energy.svg"), dark: figmaAsset("industry-clean-energy-dark.svg") }, label: "Clean Energy" },
    { src: { light: figmaAsset("industry-ecom-logistics.svg"), dark: figmaAsset("industry-ecom-logistics-dark.svg") }, label: "E-com & Logistics" },
    { src: { light: figmaAsset("industry-ed-tech.svg"), dark: figmaAsset("industry-ed-tech-dark.svg") }, label: "Ed-Tech" }
  ],
  [
    { src: { light: figmaAsset("industry-food.svg"), dark: figmaAsset("industry-food-dark.svg") }, label: "Food & Beverage" },
    { src: { light: figmaAsset("industry-retail.svg"), dark: figmaAsset("industry-retail-dark.svg") }, label: "Retail & Distribution" },
    { src: { light: figmaAsset("industry-sap.svg"), dark: figmaAsset("industry-sap-dark.svg") }, label: "SAP Solutions" },
    { src: { light: figmaAsset("industry-shipping.svg"), dark: figmaAsset("industry-shipping-dark.svg") }, label: "Shipping and Mailing" },
    { src: { light: figmaAsset("industry-sustainability.svg"), dark: figmaAsset("industry-sustainability-dark.svg") }, label: "Sustainability" },
    { src: { light: figmaAsset("industry-web3-ai-tech.svg"), dark: figmaAsset("industry-web3-ai-tech-dark.svg") }, label: "Web3 & AI Tech" }
  ]
];

function HeaderLogo({ theme }: { theme: ThemeMode }) {
  return (
    <img
      className="h-[54px] w-[202.145px]"
      src={themeAssets[theme].headerLogo}
      alt="Design Tribe"
    />
  );
}

function ThemeControls({ theme, onToggle }: { theme: ThemeMode; onToggle: () => void }) {
  const isDark = theme === "dark";

  return (
    <button
      className="theme-toggle-button flex items-center gap-2"
      type="button"
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      aria-pressed={isDark}
      onClick={onToggle}
    >
      <img className="size-6" src={themeAssets[theme].sunIcon} alt="" aria-hidden="true" />
      <img className="h-6 w-12" src={themeAssets[theme].toggle} alt="" aria-hidden="true" />
      <img className="size-6" src={themeAssets[theme].moonIcon} alt="" aria-hidden="true" />
    </button>
  );
}

export function ClientLogoStrip({ theme }: { theme: ThemeMode }) {
  const [activeLogoSetIndex, setActiveLogoSetIndex] = useState(0);
  const [previousLogoSetIndex, setPreviousLogoSetIndex] = useState(0);
  const [isLogoTransitioning, setIsLogoTransitioning] = useState(false);
  const [isLogoPaused, setIsLogoPaused] = useState(false);
  const activeLogoSet = trustedLogoSets[activeLogoSetIndex];
  const previousLogoSet = trustedLogoSets[previousLogoSetIndex];

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reducedMotionQuery.matches || isLogoPaused || isLogoTransitioning) {
      return undefined;
    }

    const rotationTimer = window.setTimeout(() => {
      setPreviousLogoSetIndex(activeLogoSetIndex);
      setActiveLogoSetIndex((currentIndex) => (currentIndex + 1) % trustedLogoSets.length);
      setIsLogoTransitioning(true);
    }, rotatingSetHoldMs);

    return () => window.clearTimeout(rotationTimer);
  }, [activeLogoSetIndex, isLogoPaused, isLogoTransitioning]);

  useEffect(() => {
    if (!isLogoTransitioning) {
      return undefined;
    }

    const transitionTimer = window.setTimeout(() => {
      setIsLogoTransitioning(false);
      setPreviousLogoSetIndex(activeLogoSetIndex);
    }, rotatingSetTransitionMs);

    return () => window.clearTimeout(transitionTimer);
  }, [activeLogoSetIndex, isLogoTransitioning]);

  return (
    <div
      className="motion-trusted-strip trusted-logo-strip"
      aria-label="Trusted company logos"
      onMouseEnter={() => setIsLogoPaused(true)}
      onMouseMove={() => setIsLogoPaused(true)}
      onMouseLeave={() => setIsLogoPaused(false)}
      onFocus={() => setIsLogoPaused(true)}
      onBlur={() => setIsLogoPaused(false)}
    >
      {activeLogoSet.map((logo, index) => (
        <div
          key={`trusted-logo-cell-${index}`}
          className={`motion-trusted-logo motion-stagger-item trusted-logo-cell relative flex h-20 items-center justify-center overflow-hidden ${logo.variant === "mark" ? "trusted-logo-cell--mark" : ""}`}
          style={motionDelay(`${110 + index * 65}ms`)}
          onPointerEnter={() => setIsLogoPaused(true)}
          onPointerMove={() => setIsLogoPaused(true)}
          onPointerDown={() => setIsLogoPaused(true)}
          onPointerLeave={() => setIsLogoPaused(false)}
        >
          {isLogoTransitioning ? (
            <img
              className={`trusted-logo-image trusted-logo-image--out ${previousLogoSet[index].variant === "mark" ? "trusted-logo-image--mark" : "trusted-logo-image--cell"}`}
              src={previousLogoSet[index].src[theme]}
              alt=""
              aria-hidden="true"
              style={motionDelay(`${index * rotatingCellStepMs}ms`)}
            />
          ) : null}
          <img
            className={`trusted-logo-image ${isLogoTransitioning ? "trusted-logo-image--in" : "trusted-logo-image--current"} ${logo.variant === "mark" ? "trusted-logo-image--mark" : "trusted-logo-image--cell"}`}
            src={logo.src[theme]}
            alt={logo.alt}
            style={motionDelay(`${index * rotatingCellStepMs}ms`)}
          />
        </div>
      ))}
    </div>
  );
}

export function Header({ theme, onToggleTheme }: { theme: ThemeMode; onToggleTheme: () => void }) {
  return (
    <header className="site-header motion-fade-down h-[54px]" data-motion-on-load="fade-down">
      <div className={`${containerClass} relative h-[54px]`}>
        <a className="absolute left-0 top-0 block h-[54px] w-[202.145px]" href="/" aria-label="Design Tribe home">
          <HeaderLogo theme={theme} />
        </a>
        <nav
          className="site-nav absolute left-[453px] top-0 hidden items-start justify-center text-sm font-medium leading-[21.7px] tracking-[-0.02em] lg:flex"
          aria-label="Primary navigation"
        >
          <a className="p-4" href="/services/branding">Services</a>
          <a className="p-4" href="/#work">Work</a>
          <a className="p-4" href="/#about">About Us</a>
        </nav>
        <div className="absolute left-[868px] top-0 hidden h-[54px] items-center px-4 py-[15px] lg:flex">
          <ThemeControls theme={theme} onToggle={onToggleTheme} />
        </div>
        <a
          className="header-cta absolute right-0 top-2 inline-flex items-center justify-center px-6 py-2 text-sm font-medium leading-[21.7px] tracking-[-0.02em]"
          href="/#contact"
        >
          Get Started
        </a>
      </div>
    </header>
  );
}

function SectionHeader({ id, title, body, bodyClassName = "section-copy" }: SectionHeaderProps) {
  return (
    <div className="motion-fade-up">
      <h2
        id={id}
        className="section-title m-0 w-[536px] max-w-full text-[40px] font-normal leading-[50px] tracking-[-0.02em] max-sm:text-[31px] max-sm:leading-[39px]"
      >
        {title}
      </h2>
      <p className={`mt-4 w-[536px] max-w-full whitespace-pre-line text-base font-normal leading-[24.8px] tracking-[-0.02em] ${bodyClassName}`}>
        {body}
      </p>
    </div>
  );
}

function ServiceCard({ title, copy, motionClassName = "", motionStyle }: Service & MotionProps) {
  const isPresentationDesign = title === "Presentation Design";
  const serviceHref = title === "Branding" ? "/services/branding" : title === "Rebranding" ? "/services/rebranding" : undefined;
  const card = (
    <article
      className={`${motionClassName} service-card w-[536px] max-w-full shrink-0`}
      style={motionStyle}
    >
      <h3 className="card-title m-0 w-full text-[32px] font-normal leading-10 tracking-[-0.02em] max-sm:text-2xl">
        {title}
      </h3>
      <p className="card-copy mt-2 w-full whitespace-pre-line text-base font-normal leading-[24.8px] tracking-[-0.02em]">{copy}</p>
      <div className="visual-panel mt-4 h-[536px] w-full max-md:h-[360px]" aria-hidden="true">
        {isPresentationDesign ? (
          <img
            className="service-card-image"
            src={figmaAsset("presentation-design.jpg")}
            alt=""
            aria-hidden="true"
          />
        ) : null}
      </div>
    </article>
  );

  return serviceHref ? (
    <a className="service-card-link block no-underline" href={serviceHref}>
      {card}
    </a>
  ) : card;
}

function HumanIntroCard({ iconSrc, title, copy, motionClassName = "", motionStyle }: HumanAiItem & MotionProps) {
  return (
    <article className={`${motionClassName} human-intro-card w-[536px] max-w-full`} style={motionStyle}>
      <h2 className="theme-title m-0 flex items-center gap-4 text-[32px] font-normal leading-10 tracking-[-0.02em] max-sm:text-2xl">
        {iconSrc ? (
          <img className="theme-icon h-10 w-9 shrink-0" src={iconSrc} alt="" aria-hidden="true" />
        ) : null}
        {title}
      </h2>
      <p className="theme-copy ml-[52px] mt-4 text-base font-normal leading-[24.8px] tracking-[-0.02em] max-sm:ml-0">{copy}</p>
    </article>
  );
}

function HumanAiCard({ iconSrc, title, copy, motionClassName = "", motionStyle }: HumanAiItem & MotionProps) {
  return (
    <article
      className={`${motionClassName} w-[456px] max-w-full shrink-0`}
      style={motionStyle}
    >
      <h3 className="m-0 flex items-center gap-[18px] text-2xl font-medium leading-[30px] tracking-[-0.02em]">
        {iconSrc ? <img className="theme-icon size-6 shrink-0" src={iconSrc} alt="" aria-hidden="true" /> : null}
        {title}
      </h3>
      <p className="mt-2 text-base font-normal leading-[24.8px] tracking-[-0.02em]">{copy}</p>
    </article>
  );
}

type ProcessRowProps = ProcessRowType & MotionProps & {
  isActive?: boolean;
  onSelect?: () => void;
};

function ProcessRow({ number, title, copy, isActive = false, onSelect, motionClassName = "", motionStyle }: ProcessRowProps) {
  return (
    <article
      className={`${motionClassName} process-row relative`}
      style={motionStyle}
    >
      <button
        className={`process-row-content grid w-full cursor-pointer appearance-none grid-cols-[41px_1fr] gap-x-6 border-0 bg-transparent p-0 text-left ${isActive ? "opacity-100" : "opacity-[0.32]"}`}
        type="button"
        onClick={onSelect}
        aria-current={isActive ? "step" : undefined}
      >
        <span className="process-title text-right text-[32px] font-normal leading-10 tracking-[-0.02em] max-sm:text-2xl">
          {number}
        </span>
        <h3 className="process-title m-0 text-[32px] font-normal leading-10 tracking-[-0.02em] max-sm:text-2xl">
          {title}
        </h3>
        <p className="process-copy col-start-2 mt-2 w-[387px] max-w-full text-base font-normal leading-[24.8px] tracking-[-0.02em]">
          {copy}
        </p>
      </button>
      <span className="process-divider mt-6 block h-px w-full" aria-hidden="true" />
    </article>
  );
}

function IndustryImage({
  item,
  theme,
  state,
  motionStyle
}: {
  item: IndustryItem;
  theme: ThemeMode;
  state: "current" | "in" | "out";
  motionStyle?: CSSProperties;
}) {
  return (
    <img
      className={`trusted-logo-image industry-image trusted-logo-image--${state} trusted-logo-image--cell`}
      src={item.src[theme]}
      alt={state === "out" ? "" : item.label}
      aria-hidden={state === "out" ? "true" : undefined}
      style={motionStyle}
    />
  );
}

export function IndustryStrip({ theme }: { theme: ThemeMode }) {
  const [activeIndustrySetIndex, setActiveIndustrySetIndex] = useState(0);
  const [previousIndustrySetIndex, setPreviousIndustrySetIndex] = useState(0);
  const [isIndustryTransitioning, setIsIndustryTransitioning] = useState(false);
  const [isIndustryPaused, setIsIndustryPaused] = useState(false);
  const activeIndustrySet = industrySets[activeIndustrySetIndex];
  const previousIndustrySet = industrySets[previousIndustrySetIndex];

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reducedMotionQuery.matches || isIndustryPaused || isIndustryTransitioning) {
      return undefined;
    }

    const rotationTimer = window.setTimeout(() => {
      setPreviousIndustrySetIndex(activeIndustrySetIndex);
      setActiveIndustrySetIndex((currentIndex) => (currentIndex + 1) % industrySets.length);
      setIsIndustryTransitioning(true);
    }, rotatingSetHoldMs);

    return () => window.clearTimeout(rotationTimer);
  }, [activeIndustrySetIndex, isIndustryPaused, isIndustryTransitioning]);

  useEffect(() => {
    if (!isIndustryTransitioning) {
      return undefined;
    }

    const transitionTimer = window.setTimeout(() => {
      setIsIndustryTransitioning(false);
      setPreviousIndustrySetIndex(activeIndustrySetIndex);
    }, rotatingSetTransitionMs);

    return () => window.clearTimeout(transitionTimer);
  }, [activeIndustrySetIndex, isIndustryTransitioning]);

  return (
    <div
      className="industry-grid mt-20"
      aria-label="Industries"
      onMouseEnter={() => setIsIndustryPaused(true)}
      onMouseMove={() => setIsIndustryPaused(true)}
      onMouseLeave={() => setIsIndustryPaused(false)}
      onFocus={() => setIsIndustryPaused(true)}
      onBlur={() => setIsIndustryPaused(false)}
    >
      {activeIndustrySet.map((industry, index) => (
        <article
          key={`industry-cell-${index}`}
          className="motion-opacity-item motion-stagger-item industry-chip relative flex h-20 items-center justify-center overflow-hidden text-center"
          style={motionDelay(`${110 + index * 35}ms`)}
          aria-label={industry.label}
          onPointerEnter={() => setIsIndustryPaused(true)}
          onPointerMove={() => setIsIndustryPaused(true)}
          onPointerDown={() => setIsIndustryPaused(true)}
          onPointerLeave={() => setIsIndustryPaused(false)}
        >
          {isIndustryTransitioning ? (
            <IndustryImage
              item={previousIndustrySet[index]}
              theme={theme}
              state="out"
              motionStyle={motionDelay(`${index * rotatingCellStepMs}ms`)}
            />
          ) : null}
          <IndustryImage
            item={industry}
            theme={theme}
            state={isIndustryTransitioning ? "in" : "current"}
            motionStyle={motionDelay(`${index * rotatingCellStepMs}ms`)}
          />
        </article>
      ))}
    </div>
  );
}

function WorkCard({ title, meta, span, motionClassName = "", motionStyle }: WorkItem & MotionProps) {
  return (
    <article
      className={`${motionClassName} motion-work-card ${
        span === "full"
          ? "w-full"
          : "w-[536px] max-w-full"
      }`}
      style={motionStyle}
    >
      <div className="w-full max-w-full">
        <h3 className="work-title m-0 max-w-full whitespace-nowrap text-[32px] font-normal leading-10 tracking-[-0.02em] max-sm:whitespace-normal max-sm:text-2xl">
          {title}
        </h3>
        <p className="work-meta mt-2 text-base font-normal leading-[24.8px] tracking-[-0.02em]">{meta}</p>
      </div>
      <div className="visual-panel motion-work-visual mt-4 h-[536px] w-full max-md:h-[360px]" aria-hidden="true" />
    </article>
  );
}

function CTASection({ motionRef }: MotionSectionProps) {
  return (
    <section
      ref={motionRef}
      className={`${containerClass} cta-panel motion-fade-up motion-distance-md mt-40 flex items-start justify-between p-20 max-md:mt-24 max-md:flex-col max-md:gap-10 max-md:p-10 max-sm:p-6`}
      id="contact"
      aria-labelledby="cta-title"
      data-motion-reveal="cta"
      data-motion-state="idle"
    >
      <div className="w-[536px] max-w-full">
        <h2
          id="cta-title"
          className="motion-fade-up m-0 text-[40px] font-normal leading-[50px] tracking-[-0.02em] max-sm:text-[30px] max-sm:leading-[38px]"
          style={motionDelay("120ms")}
        >
          Let’s make something
          <br />
          worth making.
        </h2>
        <p
          className="motion-fade-up mt-4 max-w-[536px] text-base font-normal leading-[24.8px] tracking-[-0.02em]"
          style={motionDelay("180ms")}
        >
          If you&apos;re building something that matters and you want a design partner with the rigour, the range, and the conviction to do it justice - 
          <br />
          we should talk.
        </p>
      </div>
      <a
        className="cta-button motion-fade-up inline-flex shrink-0 items-center justify-center border px-6 py-2 text-sm font-medium leading-[21.7px] tracking-[-0.02em] max-md:mt-0"
        style={motionDelay("280ms")}
        href="mailto:hello@designtribe.com"
      >
        Get Started
      </a>
    </section>
  );
}

export function Footer({ motionRef, theme }: MotionSectionProps & { theme: ThemeMode }) {
  return (
    <footer
      ref={motionRef}
      className="site-footer pb-20 pt-40"
      id="about"
      data-motion-reveal="footer"
      data-motion-state="idle"
    >
      <div className={`${containerClass} motion-fade-up flex items-start justify-between gap-10 max-md:flex-col`}>
        <div className="flex items-center gap-6">
          <img className="h-[104px] w-[139px]" src={themeAssets[theme].footerLogo} alt="Design Tribe" />
          <div>
          <h2 className="footer-title m-0 text-2xl font-medium leading-[30px] tracking-[-0.02em] max-sm:text-xl">
            UXUI Studio Pvt Ltd.
          </h2>
          <address className="footer-copy mt-2 not-italic text-sm font-normal leading-[21.7px] tracking-[-0.02em]">
            <p>H P -03-01, Lower Ground Floor</p>
            <p>Birla Navya, Amoda 2, Sector 63 A</p>
            <p>Gurgaon, Haryana, India 122102</p>
          </address>
          </div>
        </div>
        <nav className="footer-nav grid h-[98px] w-[208px] grid-cols-2 grid-rows-3 gap-x-12 gap-y-4 text-sm font-normal leading-[21.7px] tracking-[-0.02em]" aria-label="Footer navigation">
          <a href="/#about">About Us</a>
          <a href="https://www.instagram.com/" rel="noreferrer" target="_blank">Instagram</a>
          <a href="/#work">Work</a>
          <a href="https://www.linkedin.com/" rel="noreferrer" target="_blank">LinkedIn</a>
          <a href="/services/branding">Services</a>
          <a href="https://www.facebook.com/" rel="noreferrer" target="_blank">Facebook</a>
        </nav>
      </div>
    </footer>
  );
}

type ThemedHomePageProps = {
  theme: ThemeMode;
  onToggleTheme: () => void;
};

function ThemedHomePage({ theme, onToggleTheme }: ThemedHomePageProps) {
  const [activeProcessIndex, setActiveProcessIndex] = useState(0);
  const processScrollRef = useRef<HTMLDivElement | null>(null);
  const trustedRef = useRevealOnView<HTMLElement>();
  const servicesRef = useRevealOnView<HTMLElement>();
  const humanIntroRef = useRevealOnView<HTMLElement>();
  const humanAiRef = useRevealOnView<HTMLElement>();
  const processRef = useRevealOnView<HTMLElement>();
  const industriesRef = useRevealOnView<HTMLElement>();
  const workRef = useRevealOnView<HTMLElement>();
  const ctaRef = useRevealOnView<HTMLElement>();
  const footerRef = useRevealOnView<HTMLElement>();

  useEffect(() => {
    const processScrollArea = processScrollRef.current;
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktopQuery = window.matchMedia("(min-width: 1024px)");

    if (!processScrollArea || reducedMotionQuery.matches) {
      return undefined;
    }

    const stickyTop = 80;
    let frame = 0;

    const updateProcessStep = () => {
      frame = 0;

      if (!desktopQuery.matches) {
        setActiveProcessIndex(0);
        return;
      }

      const rect = processScrollArea.getBoundingClientRect();
      const scrollableDistance = Math.max(1, processScrollArea.offsetHeight - window.innerHeight);
      const progress = Math.min(0.999, Math.max(0, (stickyTop - rect.top) / scrollableDistance));
      const nextIndex = Math.min(processRows.length - 1, Math.floor(progress * processRows.length));

      setActiveProcessIndex((currentIndex) => (
        currentIndex === nextIndex ? currentIndex : nextIndex
      ));
    };

    const requestProcessStepUpdate = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(updateProcessStep);
    };

    updateProcessStep();
    window.addEventListener("scroll", requestProcessStepUpdate, { passive: true });
    window.addEventListener("resize", requestProcessStepUpdate);
    desktopQuery.addEventListener("change", updateProcessStep);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener("scroll", requestProcessStepUpdate);
      window.removeEventListener("resize", requestProcessStepUpdate);
      desktopQuery.removeEventListener("change", updateProcessStep);
    };
  }, []);

  const selectProcessStep = (index: number) => {
    setActiveProcessIndex(index);

    const processScrollArea = processScrollRef.current;
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktopQuery = window.matchMedia("(min-width: 1024px)");

    if (!processScrollArea || !desktopQuery.matches) {
      return;
    }

    const stickyTop = 80;
    const scrollAreaTop = window.scrollY + processScrollArea.getBoundingClientRect().top;
    const scrollableDistance = Math.max(1, processScrollArea.offsetHeight - window.innerHeight);
    const targetTop = scrollAreaTop - stickyTop + (scrollableDistance * index) / processRows.length + 2;

    window.scrollTo({
      top: targetTop,
      behavior: reducedMotionQuery.matches ? "auto" : "smooth"
    });
  };

  return (
    <div
      className="homepage min-h-screen"
      data-theme={theme}
    >
      <Header theme={theme} onToggleTheme={onToggleTheme} />
      <main>
        <section
          className={`${containerClass} mt-40 flex flex-col items-start gap-8 max-md:mt-24`}
          aria-labelledby="hero-title"
        >
          <div className="flex w-[450px] max-w-full flex-col items-start gap-4">
            <p className="hero-eyebrow m-0 inline-block px-4 py-2 text-sm font-normal leading-[21.7px] tracking-[-0.02em]">
              GUIDED BY HUMANS. POWERED BY AI.
            </p>
            <h1
              id="hero-title"
              className="hero-title m-0 w-full text-5xl font-normal leading-[60px] tracking-[-0.02em] max-sm:text-[40px] max-sm:leading-[50px]"
            >
              <span className="hero-heading__line motion-hero-line">
                <span className="motion-hero-line__inner" style={motionDelay("110ms")}>Design that thinks.</span>
              </span>
              <span className="hero-heading__line motion-hero-line">
                <span className="motion-hero-line__inner" style={motionDelay("200ms")}>Work that endures.</span>
              </span>
            </h1>
            <p className="hero-copy m-0 w-full text-base font-normal leading-[24.8px] tracking-[-0.02em]">
              We are a full-service design studio that brings together strategic rigour, human craft, and deep technical fluency to create brands, products, and experiences that move people and drive lasting business value.
            </p>
          </div>
          <video
            className="visual-panel motion-soft-scale aspect-video w-full object-cover"
            data-motion-on-load="soft-scale"
            style={motionDelay("260ms")}
            src={heroVideoSrc}
            aria-label="Design Tribe hero video"
            autoPlay
            controls
            loop
            muted
            playsInline
            preload="metadata"
          />
        </section>

        <section
          ref={trustedRef}
          className={`${containerClass} mt-40 max-md:mt-24`}
          aria-labelledby="trusted-title"
          data-motion-reveal="trusted"
          data-motion-state="idle"
        >
          <h2 id="trusted-title" className="section-kicker motion-fade-up mb-4 mt-0 text-base font-normal leading-[normal] tracking-[-0.02em]">
            Trusted by teams across industries
          </h2>
          <ClientLogoStrip theme={theme} />
        </section>

        <section
          ref={servicesRef}
          className={`${containerClass} mt-40 max-md:mt-24`}
          aria-labelledby="services-title"
          data-motion-reveal="services"
          data-motion-state="idle"
        >
          <SectionHeader
            id="services-title"
            title={
              <>
                Design that moves people.
                <br />
                And business.
              </>
            }
            body="Intentional design is the foundation. Purposeful experience is the method. Results - for your users and your bottom line - are always the objective. From brand identity to AI-native interfaces, we shape every touchpoint with precision and care."
          />
          <div className="mt-20 flex flex-wrap items-center gap-20">
            {services.map((service, index) => (
              <ServiceCard
                key={service.title}
                {...service}
                motionClassName="motion-fade-up motion-stagger-item motion-distance-md motion-duration-calm"
                motionStyle={motionDelay(`${130 + index * 75}ms`)}
              />
            ))}
          </div>
        </section>

        <section
          ref={humanIntroRef}
          className={`${containerClass} mt-20 flex flex-wrap items-center gap-20`}
          aria-label="Human and AI principles"
          data-motion-reveal="human-intro"
          data-motion-state="idle"
        >
          {humanIntroItems.map((item, index) => (
            <HumanIntroCard
              key={item.title}
              {...item}
              motionClassName="motion-fade-up motion-stagger-item motion-distance-sm motion-duration-soft"
              motionStyle={motionDelay(`${index * 90}ms`)}
            />
          ))}
        </section>

        <section
          ref={humanAiRef}
          className={`${containerClass} ai-panel motion-fade-up motion-distance-md mt-40 p-20 max-md:mt-24 max-md:p-10 max-sm:p-6`}
          aria-labelledby="human-ai-title"
          data-motion-reveal="human-ai"
          data-motion-state="idle"
        >
          <div className="w-[992px] max-w-full">
            <h2
              id="human-ai-title"
              className="panel-title motion-fade-up m-0 w-[576px] max-w-full text-[40px] font-normal leading-[50px] tracking-[-0.02em] max-sm:text-[31px]"
              style={motionDelay("120ms")}
            >
              AI can do remarkable things.
            </h2>
            <p
              className="panel-copy motion-fade-up mt-4 w-[576px] max-w-full text-base font-normal leading-[24.8px] tracking-[-0.02em]"
              style={motionDelay("180ms")}
            >
              We have spent more time thinking about AI and design than most studios — because we design AI products ourselves, and because we have watched AI tools reshape the craft we love. Our conclusion is this: AI is a powerful instrument in skilled hands. In the wrong hands, it is a very efficient way to produce mediocre work at scale.
            </p>
            <div className="mt-20 flex flex-wrap items-center gap-20">
              {humanAiItems.map((item, index) => (
                <HumanAiCard
                  key={item.title}
                  {...item}
                  motionClassName="motion-fade-up motion-stagger-item motion-distance-sm motion-duration-soft"
                  motionStyle={motionDelay(`${240 + index * 70}ms`)}
                />
              ))}
            </div>
          </div>
        </section>

        <section
          ref={processRef}
          className={`${containerClass} mt-40 max-md:mt-24`}
          aria-labelledby="process-title"
          data-motion-reveal="process"
          data-motion-state="idle"
        >
          <SectionHeader
            id="process-title"
            title={
              <>
                From idea to execution,
                <br />
                we keep the process clear.
              </>
            }
            body={
              <>
                We bring structure to every stage — understanding
                <br />
                the problem, shaping the direction, building the
                <br />
                experience, and improving it over time.
              </>
            }
          />
          <div ref={processScrollRef} className="process-scroll-section mt-20">
            <div className="process-sticky-stage">
              <div
                className="motion-fade-up motion-distance-md motion-duration-calm flex items-center gap-20 max-lg:flex-col max-lg:items-start"
                style={motionDelay("130ms")}
              >
                <div className="flex items-start gap-20">
                  <div className="process-rail relative h-[536px] w-1 shrink-0 overflow-hidden rounded-full" aria-hidden="true">
                    <span
                      className="process-progress block w-full rounded-full"
                      style={{ height: `${processRailHeights[activeProcessIndex]}px` }}
                    />
                  </div>
                  <div className="flex w-[452px] max-w-[calc(100vw-144px)] flex-col gap-6">
                    {processRows.map((row, index) => (
                      <ProcessRow
                        key={row.number}
                        {...row}
                        isActive={index === activeProcessIndex}
                        onSelect={() => selectProcessStep(index)}
                        motionClassName="motion-fade-up motion-stagger-item motion-distance-sm motion-duration-soft"
                        motionStyle={motionDelay(`${240 + index * 80}ms`)}
                      />
                    ))}
                  </div>
                </div>
                <div className="visual-panel h-[536px] w-[536px] max-w-full max-md:h-[360px]" aria-hidden="true" />
              </div>
            </div>
          </div>
        </section>

        <section
          ref={industriesRef}
          className={`${containerClass} mt-[159px] max-md:mt-24`}
          aria-labelledby="industries-title"
          data-motion-reveal="industries"
          data-motion-state="idle"
        >
          <SectionHeader
            id="industries-title"
            title={
              <>
                Built across industries.
                <br />
                Designed around
                <br />
                business needs.
              </>
            }
            body="We shape digital products, websites, presentations, and communication for businesses where clarity, trust, intelligence, and execution matter."
          />
          <IndustryStrip theme={theme} />
        </section>

        <section
          ref={workRef}
          className={`${containerClass} mt-40 max-md:mt-24`}
          id="work"
          aria-labelledby="work-title"
          data-motion-reveal="work"
          data-motion-state="idle"
        >
          <SectionHeader
            id="work-title"
            title={
              <>
                Work shaped around
                <br />
                real business needs.
              </>
            }
            body={
              <>
                We work across products, websites, presentations,
                <br />
                campaigns, and internal systems — helping teams
                <br />
                turn complex ideas into clear, usable, and effective
                <br />
                digital experiences.
              </>
            }
          />
          <div className="mt-20 flex flex-wrap items-center gap-20">
            {workItems.map((item, index) => (
              <WorkCard
                key={item.title}
                {...item}
                motionClassName="motion-fade-up motion-stagger-item motion-distance-md motion-duration-calm"
                motionStyle={motionDelay(`${130 + index * 85}ms`)}
              />
            ))}
          </div>
        </section>

        <CTASection motionRef={ctaRef} />
      </main>
      <Footer motionRef={footerRef} theme={theme} />
    </div>
  );
}

export function HomePage() {
  usePageMotionReady();
  const [activeTheme, setActiveTheme] = useState<ThemeMode>(() => {
    if (typeof window === "undefined") {
      return "light";
    }

    return window.localStorage.getItem("designtribe-theme") === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    window.localStorage.setItem("designtribe-theme", activeTheme);
  }, [activeTheme]);

  const toggleTheme = () => {
    setActiveTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  };

  return <ThemedHomePage theme={activeTheme} onToggleTheme={toggleTheme} />;
}
