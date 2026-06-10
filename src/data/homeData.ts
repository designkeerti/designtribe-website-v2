export type Service = {
  title: string;
  copy: string;
};

export type HumanAiItem = Service & {
  iconSrc?: string;
};

export type ProcessRow = Service & {
  number: string;
};

export type Industry = {
  iconSrc: string;
  label: string;
};

export type WorkItem = {
  title: string;
  meta: string;
  span?: "full";
};

const figmaAsset = (name: string) => `/assets/figma-home/${name}`;

export const services: Service[] = [
  {
    title: "Branding",
    copy: "We build brands that do more than exist -\nthey captivate, endure, and lead."
  },
  {
    title: "Rebranding",
    copy: "Every great brand needs to evolve.\nLet's make sure yours evolves on purpose."
  },
  {
    title: "UX + UI Design",
    copy: "Research-led. Rigorously tested.\nDesigned to be felt, not just seen."
  },
  {
    title: "Website Design + Development",
    copy: "Craft an accessible web presence that\nconnects deeply and turns browsers into believers."
  },
  {
    title: "AI Product + Software Design",
    copy: "Designing for AI is a new discipline.\nMost teams are improvising. We're not."
  },
  {
    title: "Design Systems + Frameworks",
    copy: "Scale without chaos. Build once, build right,\nand never start from scratch again."
  },
  {
    title: "Content + Marketing Design",
    copy: "Fuel your growth with creative that earns attention\nand demands action."
  },
  {
    title: "Presentation Design",
    copy: "Your ideas deserve a stage worthy of them.\nWe build that stage."
  }
];

export const humanAiItems: HumanAiItem[] = [
  {
    title: "We design AI products.",
    copy: "We have deep experience designing AI-native applications — agentic interfaces, LLM-powered tools, intelligent dashboards. We understand what AI can and cannot do at a product level, not just a conceptual one."
  },
  {
    title: "We use AI intelligently.",
    copy: "We use AI tools in our practice where they genuinely accelerate quality work. We never use them as a substitute for human thinking, human empathy, or the irreducible craft of design."
  },
  {
    title: "We put the human back in the loop.",
    copy: "In a world where AI is everywhere, the studios that will matter are those that restore what automation strips out: warmth, character, intention, and the quiet confidence of something made by people who cared."
  },
  {
    title: "We create economic value by doing so.",
    copy: "Human-centred design isn't a soft ideal — it drives hard outcomes. Higher conversion, stronger retention, deeper loyalty, faster trust. The ROI of great design is real, and we are fluent in making that case."
  }
];

export const processRows: ProcessRow[] = [
  {
    number: "01",
    title: "Understand",
    copy: "Clarity on the business, audience, goals, and opportunity."
  },
  {
    number: "02",
    title: "Shape",
    copy: "Strategy, content, journeys, and design direction built into a clear plan."
  },
  {
    number: "03",
    title: "Build",
    copy: "Products, websites, presentations, and communication brought to life with design."
  },
  {
    number: "04",
    title: "Improve",
    copy: "Refinement, optimisation, and support to keep the experience moving forward."
  }
];

export const industries: Industry[] = [
  { iconSrc: figmaAsset("icon-ai.svg"), label: "Artificial Intelligence" },
  { iconSrc: figmaAsset("icon-retail.svg"), label: "Retail & Distribution" },
  { iconSrc: figmaAsset("icon-banking.svg"), label: "Banking & Finance" },
  { iconSrc: figmaAsset("icon-shipping.svg"), label: "Shipping and Mailing" },
  { iconSrc: figmaAsset("icon-food.svg"), label: "Food & Beverage" },
  { iconSrc: figmaAsset("icon-sustainability.svg"), label: "Sustainability" }
];

export const workItems: WorkItem[] = [
  {
    title: "AI Banking",
    meta: "Diebold Nixdorf - Banking",
    span: "full"
  },
  {
    title: "A trustworthy security system",
    meta: "Prometric - Education"
  },
  {
    title: "Modern e-commerce platform",
    meta: "WareIQ - Logistics"
  },
  {
    title: "AI that knows your business",
    meta: "SymphonyAI - Retail & CPG",
    span: "full"
  },
  {
    title: "Blockchain investment",
    meta: "Safebay - Blockchain"
  },
  {
    title: "One stop health needs",
    meta: "Lybrate - Healthcare"
  }
];

export const humanIntroItems: HumanAiItem[] = [
  {
    iconSrc: figmaAsset("icon-guided-humans.svg"),
    title: "Guided by Humans",
    copy: "We lead with research, strategy, creativity, and craft — making sure every decision is shaped by people, not just tools."
  },
  {
    iconSrc: figmaAsset("icon-powered-ai.svg"),
    title: "Powered by AI",
    copy: "AI supports our process across research, content, design systems, prototypes, and execution faster without losing clarity."
  }
];
