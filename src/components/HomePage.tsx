import type { ReactNode } from "react";
import { Moon, Sun } from "lucide-react";
import {
  humanAiItems,
  humanIntroItems,
  industries,
  processRows,
  services,
  workItems
} from "../data/homeData";
import type {
  HumanAiItem,
  Industry,
  ProcessRow as ProcessRowType,
  Service,
  WorkItem
} from "../data/homeData";

type SectionHeaderProps = {
  id: string;
  title: ReactNode;
  body: ReactNode;
};

const containerClass = "mx-auto w-[min(1440px,calc(100vw-48px))] max-sm:w-[calc(100vw-32px)]";

function Header() {
  return (
    <header className="h-20 bg-page">
      <div className={`${containerClass} flex h-20 items-start pt-4`}>
        <a className="block h-14 w-[265px] shrink-0" href="#" aria-label="Design Tribe home">
          <img
            className="h-14 w-[265px] object-contain"
            src="/assets/logo-header.png"
            alt="Design Tribe"
          />
        </a>
        <nav
          className="ml-[319px] hidden gap-12 pt-[18px] text-base leading-none text-black lg:flex"
          aria-label="Primary navigation"
        >
          <a href="#work">Work</a>
          <a href="#services-title">Services</a>
          <a href="#about">About Us</a>
        </nav>
        <div className="ml-auto flex items-center gap-[18px]">
          <div className="hidden items-center gap-[18px] sm:flex" aria-label="Display controls">
            <Sun aria-hidden="true" size={22} strokeWidth={2} />
            <span className="inline-flex h-[26px] w-[50px] items-center rounded-full border border-line pl-1">
              <span className="h-[18px] w-[18px] rounded-full bg-ink" />
            </span>
            <Moon aria-hidden="true" size={22} strokeWidth={2.2} />
          </div>
          <a
            className="inline-flex h-12 w-[132px] items-center justify-center bg-ink text-base font-bold leading-none text-page"
            href="#contact"
          >
            Get Started
          </a>
        </div>
      </div>
    </header>
  );
}

function SectionHeader({ id, title, body }: SectionHeaderProps) {
  return (
    <div>
      <h2
        id={id}
        className="m-0 text-[40px] font-bold leading-[1.2] tracking-normal text-ink max-sm:text-[31px]"
      >
        {title}
      </h2>
      <p className="mt-4 max-w-[720px] text-2xl leading-[1.2] text-muted max-sm:text-[18px]">
        {body}
      </p>
    </div>
  );
}

function ServiceCard({ title, copy }: Service) {
  return (
    <article className="h-[630px] border-b border-line p-10 md:odd:border-r md:odd:border-line max-md:h-auto max-md:min-h-[480px] max-sm:p-6">
      <h3 className="m-0 text-[32px] font-normal leading-[1.16] text-black max-sm:text-2xl">
        {title}
      </h3>
      <p className="mt-3 w-[390px] max-w-full text-base leading-[1.25] text-muted">{copy}</p>
      <div className="mt-[43px] h-[425px] w-full bg-paper max-md:h-[300px]" aria-hidden="true" />
    </article>
  );
}

function HumanIntroCard({ Icon, title, copy }: HumanAiItem) {
  return (
    <article className="px-10 pr-[72px] max-sm:px-0">
      <h2 className="m-0 flex items-center gap-2.5 text-[32px] font-normal leading-[1.2] text-ink max-sm:text-2xl">
        <Icon aria-hidden="true" size={24} strokeWidth={1.8} />
        {title}
      </h2>
      <p className="ml-[34px] mt-3 text-base leading-[1.25] text-muted max-sm:ml-0">{copy}</p>
    </article>
  );
}

function HumanAiCard({ Icon, title, copy }: HumanAiItem) {
  return (
    <article className="min-h-[147px] border-b border-page px-10 pb-7 pt-[42px] md:odd:border-r md:odd:border-page nth-last-two:border-b-0 max-sm:px-6">
      <h3 className="m-0 flex items-center gap-[18px] text-[32px] font-normal leading-[1.2] max-sm:text-[23px]">
        <Icon aria-hidden="true" className="shrink-0" size={24} strokeWidth={1.8} />
        {title}
      </h3>
      <p className="ml-[42px] mt-[9px] text-base leading-[1.25] max-sm:ml-0">{copy}</p>
    </article>
  );
}

function ProcessRow({ number, title, copy }: ProcessRowType) {
  return (
    <article className="min-h-[157px] border-b border-line pb-[43px] last:border-b-0 last:pb-0 [&+article]:pt-12 max-sm:min-h-0 max-sm:pb-8 max-sm:[&+article]:pt-8">
      <div className="flex items-baseline gap-6">
        <span className="text-[32px] font-normal leading-[1.2] text-ink max-sm:text-2xl">
          {number}
        </span>
        <h3 className="m-0 text-[32px] font-normal leading-[1.2] text-ink max-sm:text-2xl">
          {title}
        </h3>
      </div>
      <p className="ml-[65px] mt-2.5 w-[345px] max-w-[calc(100%-65px)] text-base leading-[1.25] text-muted">
        {copy}
      </p>
    </article>
  );
}

function IndustryChip({ Icon, label }: Industry) {
  return (
    <article className="industry-chip flex h-[120px] items-center justify-center gap-2.5 border-b border-r border-line p-4 text-center max-sm:h-[92px]">
      <Icon aria-hidden="true" className="shrink-0" size={18} strokeWidth={1.8} />
      <h3 className="m-0 text-xl font-normal leading-[1.2] max-sm:text-base">{label}</h3>
    </article>
  );
}

function WorkCard({ title, meta, span }: WorkItem) {
  return (
    <article
      className={`h-[720px] border-b border-line p-10 max-md:h-auto max-md:min-h-[520px] max-sm:p-6 ${
        span === "full"
          ? "col-span-full"
          : "not-full-work-card"
      }`}
    >
      <h3 className="m-0 text-[32px] font-normal leading-[1.2] text-ink max-sm:text-2xl">
        {title}
      </h3>
      <p className="mt-2.5 text-base leading-[1.25] text-muted">{meta}</p>
      <div className="mt-[50px] h-[530px] w-full bg-paper max-md:h-[360px]" aria-hidden="true" />
    </article>
  );
}

function CTASection() {
  return (
    <section
      className={`${containerClass} mt-40 flex min-h-[390px] items-center justify-between bg-ink px-20 py-16 text-page max-md:mt-24 max-md:flex-col max-md:items-start max-md:gap-10 max-sm:px-6`}
      id="contact"
      aria-labelledby="cta-title"
    >
      <div>
        <h2
          id="cta-title"
          className="m-0 text-[40px] font-bold leading-[1.2] tracking-normal max-sm:text-[30px]"
        >
          Let’s build the digital
          <br />
          side of your business.
        </h2>
        <p className="mt-4 max-w-[625px] text-2xl leading-[1.2] max-sm:text-lg">
          Whether it’s a product, website, presentation, campaign,
          <br />
          or AI-supported workflow — we help turn ideas into clear,
          <br />
          useful, and well-crafted digital experiences.
        </p>
      </div>
      <a
        className="inline-flex h-12 w-[130px] items-center justify-center border border-page text-base font-bold leading-none text-page"
        href="mailto:hello@designtribe.com"
      >
        Get Started
      </a>
    </section>
  );
}

function Footer() {
  return (
    <footer className="pb-20 pt-[130px]" id="about">
      <div className={`${containerClass} grid grid-cols-[230px_1fr_140px_140px] gap-14 max-lg:grid-cols-2 max-sm:grid-cols-1`}>
        <img className="h-auto w-[132px]" src="/assets/logo-footer.png" alt="Design Tribe" />
        <div>
          <h2 className="m-0 text-[32px] font-bold leading-[1.2] text-ink max-sm:text-2xl">
            UXUI Studio Pvt Ltd.
          </h2>
          <address className="mt-[17px] not-italic text-xl leading-[1.45] text-muted max-sm:text-base">
            <p>H P -03-01, Lower Ground Floor</p>
            <p>Birla Navya, Amoda 2, Sector 63 A</p>
            <p>Gurgaon, Haryana, India 122102</p>
          </address>
        </div>
        <nav className="flex flex-col gap-[21px] text-xl leading-none text-ink max-sm:text-base" aria-label="Footer navigation">
          <a href="#about">About Us</a>
          <a href="#work">Work</a>
          <a href="#services-title">Services</a>
          <a href="#contact">Contact Us</a>
        </nav>
        <nav className="flex flex-col gap-[21px] text-xl leading-none text-ink max-sm:text-base" aria-label="Social navigation">
          <a href="https://www.instagram.com/" rel="noreferrer" target="_blank">Instagram</a>
          <a href="https://www.linkedin.com/" rel="noreferrer" target="_blank">LinkedIn</a>
          <a href="https://www.facebook.com/" rel="noreferrer" target="_blank">Facebook</a>
        </nav>
      </div>
    </footer>
  );
}

export function HomePage() {
  return (
    <>
      <Header />
      <main>
        <section
          className={`${containerClass} mt-40 grid min-h-[500px] grid-cols-[400px_1fr] gap-10 max-lg:grid-cols-1 max-md:mt-24`}
          aria-labelledby="hero-title"
        >
          <div className="pt-[143px] max-lg:pt-0">
            <h1
              id="hero-title"
              className="m-0 w-[440px] max-w-full text-5xl font-bold leading-[1.2] tracking-normal text-ink max-sm:text-[38px]"
            >
              We design the
              <br />
              digital side of
              <br />
              modern business.
            </h1>
            <p className="mt-[18px] inline-block bg-accent px-4 pb-[7px] pt-2 text-base leading-[1.25] text-muted">
              GUIDED BY HUMANS. POWERED BY AI.
            </p>
          </div>
          <div className="h-[500px] bg-paper max-md:h-[320px]" aria-hidden="true" />
        </section>

        <section className={`${containerClass} mt-40 max-md:mt-24`} aria-labelledby="trusted-title">
          <h2 id="trusted-title" className="mb-[26px] mt-0 text-2xl font-normal leading-none text-black">
            Trusted by teams across industries
          </h2>
          <img
            className="h-[120px] w-full border border-line object-cover"
            src="/assets/clients-strip.png"
            alt="Client logo strip"
          />
        </section>

        <section
          className={`${containerClass} mt-40 max-md:mt-24`}
          aria-labelledby="services-title"
        >
          <SectionHeader
            id="services-title"
            title={
              <>
                We design digital experiences
                <br />
                that help businesses work,
                <br />
                communicate, and grow.
              </>
            }
            body={
              <>
                Turn ideas into clear digital products, websites,
                <br />
                presentations, and communication.
              </>
            }
          />
          <div className="mt-20 grid grid-cols-2 border border-b-0 border-line max-md:grid-cols-1">
            {services.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </section>

        <section
          className={`${containerClass} mt-[54px] grid grid-cols-2 max-md:grid-cols-1 max-md:gap-10`}
          aria-label="Human and AI principles"
        >
          {humanIntroItems.map((item) => (
            <HumanIntroCard key={item.title} {...item} />
          ))}
        </section>

        <section
          className={`${containerClass} mt-[142px] min-h-[887px] bg-ink text-page max-md:mt-24`}
          aria-labelledby="human-ai-title"
        >
          <div className="px-20 pb-20 pt-[86px] max-sm:px-6">
            <h2 id="human-ai-title" className="m-0 text-[40px] font-bold leading-[1.2] max-sm:text-[31px]">
              Human + AI
            </h2>
            <p className="mt-[18px] w-[625px] max-w-full text-2xl leading-[1.2] max-sm:text-lg">
              AI supports the way we research, write, design, prototype, and build. It helps us
              test more ideas, find patterns, improve workflows, and create smarter digital
              experiences — while strategy, creativity, and craft remain human-led.
            </p>
            <div className="mt-[78px] grid grid-cols-2 border border-page max-md:grid-cols-1">
              {humanAiItems.map((item) => (
                <HumanAiCard key={item.title} {...item} />
              ))}
            </div>
          </div>
        </section>

        <section
          className={`${containerClass} mt-40 max-md:mt-24`}
          aria-labelledby="process-title"
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
          <div className="mt-20 grid h-[790px] grid-cols-[465px_1fr] gap-[88px] border border-line p-20 max-lg:h-auto max-lg:grid-cols-1 max-sm:p-6">
            <div>
              {processRows.map((row) => (
                <ProcessRow key={row.number} {...row} />
              ))}
            </div>
            <div className="h-[628px] bg-paper max-md:h-[360px]" aria-hidden="true" />
          </div>
        </section>

        <section
          className={`${containerClass} mt-[159px] max-md:mt-24`}
          aria-labelledby="industries-title"
        >
          <SectionHeader
            id="industries-title"
            title={
              <>
                Built across industries.
                <br />
                Designed around business needs.
              </>
            }
            body={
              <>
                We shape digital products, websites, presentations,
                <br />
                and communication for businesses where clarity,
                <br />
                trust, intelligence, and execution matter.
              </>
            }
          />
          <div className="mt-20 grid grid-cols-5 border border-b-0 border-line max-lg:grid-cols-3 max-sm:grid-cols-2">
            {industries.map((industry) => (
              <IndustryChip key={industry.label} {...industry} />
            ))}
          </div>
        </section>

        <section
          className={`${containerClass} mt-40 max-md:mt-24`}
          id="work"
          aria-labelledby="work-title"
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
          <div className="mt-20 grid grid-cols-2 border border-b-0 border-line max-md:grid-cols-1">
            {workItems.map((item) => (
              <WorkCard key={item.title} {...item} />
            ))}
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </>
  );
}
