import { useEffect, useRef, useState } from "react";
import {
  ClientLogoStrip,
  Footer,
  Header,
  IndustryStrip,
  containerClass
} from "./HomePage";
import type { ThemeMode } from "./HomePage";
import { usePageMotionReady, useRevealOnView } from "../hooks/useMotion";

type ServiceSlug =
  | "branding"
  | "rebranding"
  | "ux-ui-design"
  | "website-design-development"
  | "ai-product-software-design"
  | "design-systems-frameworks"
  | "content-marketing-design"
  | "presentation-design";

type ServiceProject = {
  service: string;
  client: string;
};

type ServicePageContent = {
  slug: ServiceSlug;
  heroTitle: string;
  heroCopy: string;
  activeLabel: string;
  sectionTitle: string;
  sectionCopy: string;
  projects: ServiceProject[];
  process: string[];
};

const serviceTabs = [
  { label: "Branding", slug: "branding" },
  { label: "Rebranding", slug: "rebranding" },
  { label: "UX + UI Design", slug: "ux-ui-design" },
  { label: "Website Design + Development", slug: "website-design-development" },
  { label: "AI Product + Software Design", slug: "ai-product-software-design" },
  { label: "Design Systems + Frameworks", slug: "design-systems-frameworks" },
  { label: "Content + Marketing Design", slug: "content-marketing-design" },
  { label: "Presentation Design", slug: "presentation-design" }
] as const;

const servicePages: Record<ServiceSlug, ServicePageContent> = {
  branding: {
    slug: "branding",
    activeLabel: "Branding",
    heroTitle: "Before a single pixel is placed, we think. Deeply, honestly, and with your future in mind.",
    heroCopy:
      "Great design doesn't just look good — it works hard. We partner with ambitious organizations to craft identities, experiences, and digital products that people actually love to use. Explore what we can do together.",
    sectionTitle: "Before a single pixel is placed, we think. Deeply, honestly, and with your future in mind.",
    sectionCopy:
      "Whether you're launching something new or giving a beloved brand the foundations it always deserved, we approach every engagement with the same discipline: understand first, design second, always with the long view in mind.",
    projects: [
      { service: "Branding", client: "WareIQ" },
      { service: "Branding", client: "Integritty" },
      { service: "Branding", client: "Safebay" },
      { service: "Branding", client: "Enphase" },
      { service: "Branding", client: "Vitani.ai" },
      { service: "Branding", client: "Greenstory" },
      { service: "Branding", client: "Future Food Cast" },
      { service: "Branding", client: "KMG" }
    ],
    process: ["Strategy", "Adaptable artistry", "Messaging + Voice", "Brand handbooks"]
  },
  rebranding: {
    slug: "rebranding",
    activeLabel: "Rebranding",
    heroTitle: "We don't change for sake. We change because something better is possible.",
    heroCopy:
      "We lead full rebrand engagements: from the honest diagnostic at the start, through the tension of letting go of what's familiar, to the clarity and momentum of launching something your team is genuinely proud to represent.",
    sectionTitle: "Before a single pixel is placed, we think. Deeply, honestly, and with your future in mind.",
    sectionCopy:
      "Whether you're launching something new or giving a beloved brand the foundations it always deserved, we approach every engagement with the same discipline: understand first, design second, always with the long view in mind.",
    projects: [
      { service: "Rebranding", client: "GateFM" },
      { service: "Rebranding", client: "Fulton County" },
      { service: "Rebranding", client: "Asian Corporation" },
      { service: "Rebranding", client: "Crosstower" }
    ],
    process: [
      "Assessment before action",
      "Preserving what matters",
      "Future-proof positioning",
      "Future-proof positioning"
    ]
  },
  "ux-ui-design": {
    slug: "ux-ui-design",
    activeLabel: "UX + UI Design",
    heroTitle: "Good UX isn't invisible. It's the reason people come back",
    heroCopy:
      "We embed into your product reality, learn your users, and design with the full picture in mind. Every screen is designed to earn its place.",
    sectionTitle: "Good UX isn't invisible. It's the reason people come back",
    sectionCopy:
      "We embed into your product reality, learn your users, and design with the full picture in mind. Every screen is designed to earn its place.",
    projects: [
      { service: "UX + UI Design", client: "SymphonyAI" },
      { service: "UX + UI Design", client: "Diebold Nixdorf" },
      { service: "UX + UI Design", client: "Pitney Bowes" },
      { service: "UX + UI Design", client: "Integritty" },
      { service: "UX + UI Design", client: "WareIQ" },
      { service: "UX + UI Design", client: "Safebay" }
    ],
    process: [
      "Discovery + User research",
      "Information architecture",
      "High-fidelity design",
      "Usability testing"
    ]
  },
  "website-design-development": {
    slug: "website-design-development",
    activeLabel: "Website Design + Development",
    heroTitle: "We don't hand off a finished site and disappear. We hand over control.",
    heroCopy:
      "The result is a site that doesn't just look like a great brand — it works like one. Fast, flexible, accessible, and built to evolve alongside your organization without requiring a rebuild every two years.",
    sectionTitle: "We don't hand off a finished site and disappear. We hand over control.",
    sectionCopy:
      "We embed into your product reality, learn your users, and design with the full picture in mind. Every screen is designed to earn its place.",
    projects: [
      { service: "Website Design + Development", client: "SymphonyAI" },
      { service: "Website Design + Development", client: "Diebold Nixdorf" },
      { service: "Website Design + Development", client: "Pitney Bowes" },
      { service: "Website Design + Development", client: "Integritty" },
      { service: "Website Design + Development", client: "WareIQ" },
      { service: "Website Design + Development", client: "Safebay" }
    ],
    process: [
      "Strategy + architecture",
      "UX, UI, and accessibility",
      "In-house development",
      "Empowering your team"
    ]
  },
  "ai-product-software-design": {
    slug: "ai-product-software-design",
    activeLabel: "AI Product + Software Design",
    heroTitle: "The interface is where AI's promise meets human reality. That gap is where we work.",
    heroCopy:
      "Whether you're building an AI-native SaaS product, embedding intelligence into an existing enterprise platform, or designing the interface layer for a custom LLM application, we bring the frameworks, patterns, and craft that the moment demands.",
    sectionTitle: "The interface is where AI's promise meets human reality. That gap is where we work.",
    sectionCopy:
      "Whether you're building an AI-native SaaS product, embedding intelligence into an existing enterprise platform, or designing the interface layer for a custom LLM application, we bring the frameworks, patterns, and craft that the moment demands.",
    projects: [
      { service: "AI Product + Software Design", client: "SymphonyAI" },
      { service: "AI Product + Software Design", client: "Diebold Nixdorf" },
      { service: "AI Product + Software Design", client: "Pitney Bowes" },
      { service: "AI Product + Software Design", client: "Integritty" },
      { service: "AI Product + Software Design", client: "WareIQ" },
      { service: "AI Product + Software Design", client: "Safebay" }
    ],
    process: [
      "Designing for uncertainty",
      "Agentic interface design",
      "Prompt UX + conversational design",
      "AI-powered dashboards"
    ]
  },
  "design-systems-frameworks": {
    slug: "design-systems-frameworks",
    activeLabel: "Design Systems + Frameworks",
    heroTitle:
      "A design system is only valuable if people use it. We build the kind they actually want to.",
    heroCopy: "We build design systems that are genuinely used, genuinely loved, and genuinely maintained.",
    sectionTitle:
      "A design system is only valuable if people use it. We build the kind they actually want to.",
    sectionCopy:
      "We embed into your product reality, learn your users, and design with the full picture in mind. Every screen is designed to earn its place.",
    projects: [
      { service: "Design Systems + Frameworks", client: "SymphonyAI" },
      { service: "Design Systems + Frameworks", client: "Diebold Nixdorf" },
      { service: "Design Systems + Frameworks", client: "Pitney Bowes" },
      { service: "Design Systems + Frameworks", client: "Integritty" },
      { service: "Design Systems + Frameworks", client: "WareIQ" },
      { service: "Design Systems + Frameworks", client: "Safebay" }
    ],
    process: [
      "Audit + foundations",
      "Component libraries",
      "Accessible by default",
      "Governance + adoption"
    ]
  },
  "content-marketing-design": {
    slug: "content-marketing-design",
    activeLabel: "Content + Marketing Design",
    heroTitle: "The best marketing creative doesn't interrupt. It earns its place in someone's day.",
    heroCopy:
      "Embedded in your growth ambitions, aligned to your brand, and producing the volume and variety of work that modern marketing demands — without ever letting the standard slip.",
    sectionTitle: "The best marketing creative doesn't interrupt. It earns its place in someone's day.",
    sectionCopy:
      "We embed into your product reality, learn your users, and design with the full picture in mind. Every screen is designed to earn its place.",
    projects: [
      { service: "Content + Marketing Design", client: "SymphonyAI" },
      { service: "Content + Marketing Design", client: "Diebold Nixdorf" },
      { service: "Content + Marketing Design", client: "Pitney Bowes" },
      { service: "Content + Marketing Design", client: "Integritty" },
      { service: "Content + Marketing Design", client: "WareIQ" },
      { service: "Content + Marketing Design", client: "Safebay" }
    ],
    process: [
      "Campaign creative",
      "Content systems",
      "Digital advertising",
      "Brand-coherent"
    ]
  },
  "presentation-design": {
    slug: "presentation-design",
    activeLabel: "Presentation Design",
    heroTitle: "The best presentations don't just inform. They shift how the room thinks.",
    heroCopy:
      "Investor pitches, board reviews, product launches, keynotes, sales decks, and the strategic narratives that shape how an organization sees itself and its future. We don't make slides look better. We make arguments land harder.",
    sectionTitle: "The best presentations don't just inform. They shift how the room thinks.",
    sectionCopy:
      "We embed into your product reality, learn your users, and design with the full picture in mind. Every screen is designed to earn its place.",
    projects: [
      { service: "Presentation Design", client: "SymphonyAI" },
      { service: "Presentation Design", client: "Diebold Nixdorf" },
      { service: "Presentation Design", client: "Pitney Bowes" },
      { service: "Presentation Design", client: "Integritty" },
      { service: "Presentation Design", client: "WareIQ" },
      { service: "Presentation Design", client: "Safebay" }
    ],
    process: [
      "Narrative structure",
      "Visual storytelling",
      "Investor + pitch decks",
      "Sales + proposal decks"
    ]
  }
};

const processCopy = [
  "Clarity on the business, audience, goals, and opportunity.",
  "Strategy, content, journeys, and design direction built into a clear plan.",
  "Products, websites, presentations, and communication brought to life with design.",
  "Refinement, optimisation, and support to keep the experience moving forward."
];

const figmaAsset = (name: string) => `/assets/figma-home/${name}`;
const processRailHeights = [98, 244, 390, 536];

function useThemeState() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window === "undefined") {
      return "light";
    }

    return window.localStorage.getItem("designtribe-theme") === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    window.localStorage.setItem("designtribe-theme", theme);
  }, [theme]);

  return {
    theme,
    toggleTheme: () => setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"))
  };
}

function ServiceTabs({ activeLabel }: { activeLabel: string }) {
  return (
    <nav
      className="service-tabs-scroll motion-fade-up flex w-full items-center gap-9 overflow-x-auto overflow-y-hidden"
      aria-label="Service categories"
    >
      {serviceTabs.map((tab) => {
        const isActive = tab.label === activeLabel;

        return (
          <a
            key={tab.label}
            className={`shrink-0 p-2 text-center text-base leading-5 tracking-[-0.02em] no-underline ${isActive ? "border-b border-current font-medium" : "font-normal opacity-[0.56]"}`}
            href={`/services/${tab.slug}`}
            aria-current={isActive ? "page" : undefined}
          >
            {tab.label}
          </a>
        );
      })}
    </nav>
  );
}

function ServiceProjectCard({ service, client }: ServiceProject) {
  return (
    <article className="service-card w-[536px] max-w-full shrink-0">
      <div className="flex flex-col gap-2">
        <h3 className="card-title m-0 text-[32px] font-normal leading-10 tracking-[-0.02em]">{service}</h3>
        <p className="card-copy m-0 text-base font-normal leading-[24.8px] tracking-[-0.02em]">{client}</p>
      </div>
      <div className="visual-panel mt-4 h-[302px] w-full" aria-hidden="true" />
    </article>
  );
}

function ServiceProcess({ titles }: { titles: string[] }) {
  const [activeProcessIndex, setActiveProcessIndex] = useState(0);
  const processScrollRef = useRef<HTMLDivElement | null>(null);

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
      const nextIndex = Math.min(titles.length - 1, Math.floor(progress * titles.length));

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
  }, [titles.length]);

  return (
    <section className={`${containerClass} mt-40 max-md:mt-24`} aria-labelledby="service-process-title">
      <div className="motion-fade-up flex w-[536px] max-w-full flex-col gap-4">
        <h2
          id="service-process-title"
          className="section-title m-0 text-[40px] font-normal leading-[50px] tracking-[-0.02em] max-sm:text-[31px] max-sm:leading-[39px]"
        >
          From idea to execution,
          <br />
          we keep the process clear.
        </h2>
        <p className="section-copy m-0 text-base font-normal leading-[24.8px] tracking-[-0.02em]">
          We bring structure to every stage — understanding the problem, shaping the direction, building the experience, and improving it over time.
        </p>
      </div>
      <div ref={processScrollRef} className="process-scroll-section mt-20">
        <div className="process-sticky-stage">
          <div className="motion-fade-up flex items-center gap-20 max-lg:flex-col max-lg:items-start">
            <div className="flex items-start gap-20">
              <div className="process-rail relative h-[536px] w-1 shrink-0 overflow-hidden rounded-full" aria-hidden="true">
                <span
                  className="process-progress block w-full rounded-full"
                  style={{ height: `${processRailHeights[activeProcessIndex]}px` }}
                />
              </div>
              <div className="flex w-[452px] max-w-[calc(100vw-144px)] flex-col gap-6">
                {titles.map((title, index) => (
                  <article className="process-row relative" key={`${title}-${index}`}>
                    <div className={`process-row-content grid w-full grid-cols-[41px_1fr] gap-x-6 ${index === activeProcessIndex ? "opacity-100" : "opacity-[0.32]"}`}>
                      <span className="process-title text-right text-[32px] font-normal leading-10 tracking-[-0.02em] max-sm:text-2xl">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="process-title m-0 text-[32px] font-normal leading-10 tracking-[-0.02em] max-sm:text-2xl">
                        {title}
                      </h3>
                      <p className="process-copy col-start-2 m-0 mt-2 text-base font-normal leading-[24.8px] tracking-[-0.02em]">
                        {processCopy[index]}
                      </p>
                    </div>
                    <span className="process-divider mt-6 block h-px w-full" aria-hidden="true" />
                  </article>
                ))}
              </div>
            </div>
            <div className="visual-panel h-[536px] w-[536px] max-w-full max-md:h-[360px]" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceCta() {
  return (
    <section
      className={`${containerClass} cta-panel mt-40 flex items-start justify-between gap-10 p-20 max-lg:flex-col max-md:mt-24 max-sm:p-6`}
      id="contact"
    >
      <div className="w-[536px] max-w-full">
        <h2 className="m-0 text-[40px] font-normal leading-[50px] tracking-[-0.02em] max-sm:text-[31px] max-sm:leading-[39px]">
          Let&apos;s make something
          <br />
          worth making.
        </h2>
        <p className="mt-4 max-w-[536px] text-base font-normal leading-[24.8px] tracking-[-0.02em]">
          If you&apos;re building something that matters and you want a design partner with the rigour, the range, and the conviction to do it justice - 
          <br />
          we should talk.
        </p>
      </div>
      <a
        className="cta-button inline-flex shrink-0 items-center justify-center border px-6 py-2 text-sm font-medium leading-[21.7px] tracking-[-0.02em]"
        href="mailto:hello@designtribe.com"
      >
        Get Started
      </a>
    </section>
  );
}

function ServicePageView({ content, theme, onToggleTheme }: { content: ServicePageContent; theme: ThemeMode; onToggleTheme: () => void }) {
  const trustedRef = useRevealOnView<HTMLElement>();
  const servicesRef = useRevealOnView<HTMLElement>();
  const industriesRef = useRevealOnView<HTMLElement>();
  const footerRef = useRevealOnView<HTMLElement>();

  return (
    <div className="homepage min-h-screen" data-theme={theme}>
      <Header theme={theme} onToggleTheme={onToggleTheme} />
      <main>
        <section className={`${containerClass} mt-40 max-md:mt-24`} aria-labelledby="service-hero-title">
          <div className="motion-fade-up flex w-[450px] max-w-full flex-col gap-4">
            <h1
              id="service-hero-title"
              className="hero-title m-0 text-5xl font-normal leading-[60px] tracking-[-0.02em] max-sm:text-[40px] max-sm:leading-[50px]"
            >
              {content.heroTitle}
            </h1>
            <p className="hero-copy m-0 text-base font-normal leading-[24.8px] tracking-[-0.02em]">{content.heroCopy}</p>
          </div>
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
          aria-label="Service work"
          data-motion-reveal="service-work"
          data-motion-state="idle"
        >
          <ServiceTabs activeLabel={content.activeLabel} />
          <div className="motion-fade-up mt-20 flex w-[536px] max-w-full flex-col gap-4 max-md:mt-16">
            <h2 className="section-title m-0 text-[40px] font-normal leading-[50px] tracking-[-0.02em] max-sm:text-[31px] max-sm:leading-[39px]">
              {content.sectionTitle}
            </h2>
            <p className="section-copy m-0 text-base font-normal leading-[24.8px] tracking-[-0.02em]">
              {content.sectionCopy}
            </p>
          </div>
          <div className="mt-20 flex flex-wrap items-center gap-20">
            {content.projects.map((project) => (
              <ServiceProjectCard key={`${project.service}-${project.client}`} {...project} />
            ))}
          </div>
        </section>

        <section className={`${containerClass} mt-20 flex flex-wrap items-start gap-20 max-md:mt-16`}>
          <article className="human-intro-card flex w-[536px] max-w-full items-start gap-4">
            <img className="theme-icon h-10 w-9 shrink-0" src={figmaAsset("icon-guided-humans.svg")} alt="" aria-hidden="true" />
            <div>
              <h2 className="theme-title m-0 text-[32px] font-normal leading-10 tracking-[-0.02em]">Guided by Humans</h2>
              <p className="theme-copy mt-4 text-base font-normal leading-[24.8px] tracking-[-0.02em]">
                We lead with research, strategy, creativity, and craft making sure every decision is shaped by people, not just tools.
              </p>
            </div>
          </article>
          <article className="human-intro-card flex w-[536px] max-w-full items-start gap-4">
            <img className="theme-icon h-10 w-9 shrink-0" src={figmaAsset("icon-powered-ai.svg")} alt="" aria-hidden="true" />
            <div>
              <h2 className="theme-title m-0 text-[32px] font-normal leading-10 tracking-[-0.02em]">Powered by AI</h2>
              <p className="theme-copy mt-4 text-base font-normal leading-[24.8px] tracking-[-0.02em]">
                AI supports our process across research, content, design systems, prototypes, and execution faster without losing clarity.
              </p>
            </div>
          </article>
        </section>

        <ServiceProcess titles={content.process} />

        <section
          ref={industriesRef}
          className={`${containerClass} mt-40 max-md:mt-24`}
          aria-labelledby="industries-title"
          data-motion-reveal="industries"
          data-motion-state="idle"
        >
          <div className="motion-fade-up flex w-[536px] max-w-full flex-col gap-4">
            <h2
              id="industries-title"
              className="section-title m-0 text-[40px] font-normal leading-[50px] tracking-[-0.02em] max-sm:text-[31px] max-sm:leading-[39px]"
            >
              Built across industries.
              <br />
              Designed around
              <br />
              business needs.
            </h2>
            <p className="section-copy m-0 text-base font-normal leading-[24.8px] tracking-[-0.02em]">
              We shape digital products, websites, presentations, and communication for businesses where clarity, trust, intelligence, and execution matter.
            </p>
          </div>
          <IndustryStrip theme={theme} />
        </section>

        <ServiceCta />
      </main>
      <Footer motionRef={footerRef} theme={theme} />
    </div>
  );
}

export function ServicePage({ slug }: { slug: string }) {
  usePageMotionReady();
  const { theme, toggleTheme } = useThemeState();
  const content = servicePages[slug as ServiceSlug] ?? servicePages.branding;

  return <ServicePageView content={content} theme={theme} onToggleTheme={toggleTheme} />;
}
