import {
  Banknote,
  Boxes,
  Brain,
  CircleSlash,
  ClipboardList,
  Flower2,
  Monitor,
  Package,
  Presentation,
  Recycle,
  ShoppingCart,
  Sprout,
  Sparkles,
  Truck,
  Utensils
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Service = {
  title: string;
  copy: string;
};

export type HumanAiItem = Service & {
  Icon: LucideIcon;
};

export type ProcessRow = Service & {
  number: string;
};

export type Industry = {
  Icon: LucideIcon;
  label: string;
};

export type WorkItem = {
  title: string;
  meta: string;
  span?: "full";
};

export const services: Service[] = [
  {
    title: "Experience Design",
    copy: "Products and experiences designed around how people think, decide, and interact."
  },
  {
    title: "Research & Strategy",
    copy: "Clarity before creation — turning business goals, user needs, and ideas into a focused direction."
  },
  {
    title: "Presentation Design",
    copy: "Business stories shaped into sharp, high-impact presentations for sales, leadership, and growth."
  },
  {
    title: "Communication Design",
    copy: "Visual systems and content experiences that help businesses explain, launch, and connect better."
  },
  {
    title: "Development",
    copy: "Websites, interfaces, and platforms built with design precision and technical depth."
  },
  {
    title: "Sales & Marketing",
    copy: "Digital assets and workflows that help businesses reach, convert, and support customers."
  }
];

export const humanAiItems: HumanAiItem[] = [
  {
    Icon: Sparkles,
    title: "Research & Understanding",
    copy: "Turning complex information into clearer insight."
  },
  {
    Icon: ClipboardList,
    title: "Content & Communication",
    copy: "Shaping sharper messages, narratives, and business stories."
  },
  {
    Icon: CircleSlash,
    title: "Design & Prototyping",
    copy: "Exploring faster, testing ideas, and building stronger systems."
  },
  {
    Icon: Presentation,
    title: "Presentations & Storytelling",
    copy: "Making complex business communication clearer and more impactful."
  },
  {
    Icon: Monitor,
    title: "Development & Automation",
    copy: "Supporting faster builds, smarter workflows, and connected systems."
  },
  {
    Icon: Boxes,
    title: "Improvement",
    copy: "Helping digital experiences evolve with feedback and usage."
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
    copy: "Products, websites, presentations, and communication brought to life with design and technology."
  },
  {
    number: "04",
    title: "Improve",
    copy: "Refinement, optimisation, and support to keep the experience moving forward."
  }
];

export const industries: Industry[] = [
  { Icon: Brain, label: "Artificial Intelligence" },
  { Icon: ShoppingCart, label: "Retail & Distribution" },
  { Icon: Banknote, label: "Banking" },
  { Icon: Package, label: "Shipping and Mailing" },
  { Icon: Truck, label: "Logistics" },
  { Icon: Monitor, label: "Education" },
  { Icon: Utensils, label: "Food" },
  { Icon: Boxes, label: "SAP Solutions" },
  { Icon: Recycle, label: "Sustainability" },
  { Icon: Sprout, label: "Agriculture" }
];

export const workItems: WorkItem[] = [
  {
    title: "AI Banking",
    meta: "Diebold Nixdorf - Banking",
    span: "full"
  },
  {
    title: "Modern e-commerce platform",
    meta: "WareIQ - Logistics"
  },
  {
    title: "A trustworthy security system",
    meta: "Prometric - Education"
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
    Icon: Flower2,
    title: "Guided by Humans",
    copy: "We lead with research, strategy, creativity, and craft — making sure every decision is shaped by people, not just tools."
  },
  {
    Icon: Sparkles,
    title: "Powered by AI",
    copy: "AI supports our process across research, content, design systems, prototypes, and execution faster without losing clarity."
  }
];
