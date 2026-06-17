# Design Tribe — Sections & Copy

> Full content inventory of the old `designtribe-website-v2` build, captured section-by-section for the from-scratch redesign.
> **Only the copy is being reused — the old design is discarded** (new design language → `DESIGN-SYSTEM.md`).
> Every string below is transcribed verbatim from the source. Source files noted per section.

---

## Sitemap & routing

Routing is path-based (`src/App.tsx`) — no router library.

| Route | Page | Source |
|---|---|---|
| `/` | Homepage | `src/components/HomePage.tsx` + `src/data/homeData.ts` |
| `/services/:slug` | Service page (8 variants) | `src/components/ServicePage.tsx` |

**Service slugs:** `branding`, `rebranding`, `ux-ui-design`, `website-design-development`, `ai-product-software-design`, `design-systems-frameworks`, `content-marketing-design`, `presentation-design`
*(Unknown slug falls back to `branding`.)*

**Page meta** (`index.html`)
- Title: **Design Tribe**
- Description: **Design Tribe designs the digital side of modern business.**

---

## Global elements

### Header *(both page types)*
- **Logo:** Design Tribe wordmark → `/`
- **Primary nav:** `Services` (→ `/services/branding`) · `Work` (→ `/#work`) · `About Us` (→ `/#about`)
- **Theme toggle:** light / dark (sun · toggle · moon)
- **CTA button:** **Get Started** (→ `/#contact`)

### Footer *(both page types)* — `id="about"`
- **Logo** + studio block:
  - Studio name: **UXUI Studio Pvt Ltd.**
  - Address:
    ```
    H P -03-01, Lower Ground Floor
    Birla Navya, Amoda 2, Sector 63 A
    Gurgaon, Haryana, India 122102
    ```
- **Footer nav:** About Us (`/#about`) · Work (`/#work`) · Services (`/services/branding`) · Instagram ↗ · LinkedIn ↗ · Facebook ↗
- **Contact email** (used by all CTA buttons): `hello@designtribe.com`

---

# HOMEPAGE (`/`)

Sections in document order.

## 1. Hero
- **Eyebrow:** GUIDED BY HUMANS. POWERED BY AI.
- **Headline** (two lines):
  > Design that thinks.
  > Work that endures.
- **Copy:**
  > We are a full-service design studio that brings together strategic rigour, human craft, and deep technical fluency to create brands, products, and experiences that move people and drive lasting business value.
- **Media:** hero video (`hero-video-placeholder.mp4`, autoplay/loop/muted)

## 2. Trusted strip
- **Kicker:** Trusted by teams across industries
- **Behaviour:** auto-rotating logo grid, 4 sets × 6 logos, pauses on hover/focus.

| Set | Logos |
|---|---|
| 1 | SymphonyAI · Pitney Bowes · Prometric · Diebold Nixdorf · Integrify · WareIQ |
| 2 | Absolute · GIZ · Lybrate · KMG · Safebay · Enphase |
| 3 | Vitran · Greenstory · Asian Corporation · Gutenberg · Future Food Cast · GateFM |
| 4 | NFT Kreator · CoFrsh · Curd · Crosstower · Kreatoverse · Fulton |

## 3. Services
- **Title:**
  > Design that moves people.
  > And business.
- **Body:**
  > Intentional design is the foundation. Purposeful experience is the method. Results - for your users and your bottom line - are always the objective. From brand identity to AI-native interfaces, we shape every touchpoint with precision and care.
- **8 service cards** (`title` → `copy`):

| # | Title | Copy | Links to |
|---|---|---|---|
| 1 | Branding | We build brands that do more than exist - they captivate, endure, and lead. | `/services/branding` |
| 2 | Rebranding | Every great brand needs to evolve. Let's make sure yours evolves on purpose. | `/services/rebranding` |
| 3 | UX + UI Design | Research-led. Rigorously tested. Designed to be felt, not just seen. | — |
| 4 | Website Design + Development | Craft an accessible web presence that connects deeply and turns browsers into believers. | — |
| 5 | AI Product + Software Design | Designing for AI is a new discipline. Most teams are improvising. We're not. | — |
| 6 | Design Systems + Frameworks | Scale without chaos. Build once, build right, and never start from scratch again. | — |
| 7 | Content + Marketing Design | Fuel your growth with creative that earns attention and demands action. | — |
| 8 | Presentation Design | Your ideas deserve a stage worthy of them. We build that stage. | — *(has image)* |

## 4. Human + AI intro *(two cards)*
| Icon | Title | Copy |
|---|---|---|
| Guided by Humans | **Guided by Humans** | We lead with research, strategy, creativity, and craft — making sure every decision is shaped by people, not just tools. |
| Powered by AI | **Powered by AI** | AI supports our process across research, content, design systems, prototypes, and execution faster without losing clarity. |

## 5. AI panel
- **Title:** AI can do remarkable things.
- **Copy:**
  > We have spent more time thinking about AI and design than most studios — because we design AI products ourselves, and because we have watched AI tools reshape the craft we love. Our conclusion is this: AI is a powerful instrument in skilled hands. In the wrong hands, it is a very efficient way to produce mediocre work at scale.
- **4 cards:**

| # | Title | Copy |
|---|---|---|
| 1 | We design AI products. | We have deep experience designing AI-native applications — agentic interfaces, LLM-powered tools, intelligent dashboards. We understand what AI can and cannot do at a product level, not just a conceptual one. |
| 2 | We use AI intelligently. | We use AI tools in our practice where they genuinely accelerate quality work. We never use them as a substitute for human thinking, human empathy, or the irreducible craft of design. |
| 3 | We put the human back in the loop. | In a world where AI is everywhere, the studios that will matter are those that restore what automation strips out: warmth, character, intention, and the quiet confidence of something made by people who cared. |
| 4 | We create economic value by doing so. | Human-centred design isn't a soft ideal — it drives hard outcomes. Higher conversion, stronger retention, deeper loyalty, faster trust. The ROI of great design is real, and we are fluent in making that case. |

## 6. Process
- **Title:**
  > From idea to execution,
  > we keep the process clear.
- **Body:**
  > We bring structure to every stage — understanding the problem, shaping the direction, building the experience, and improving it over time.
- **Behaviour:** scroll-driven stepper (desktop); steps highlight as you scroll.

| # | Step | Copy |
|---|---|---|
| 01 | Understand | Clarity on the business, audience, goals, and opportunity. |
| 02 | Shape | Strategy, content, journeys, and design direction built into a clear plan. |
| 03 | Build | Products, websites, presentations, and communication brought to life with design. |
| 04 | Improve | Refinement, optimisation, and support to keep the experience moving forward. |

## 7. Industries
- **Title:**
  > Built across industries.
  > Designed around
  > business needs.
- **Body:**
  > We shape digital products, websites, presentations, and communication for businesses where clarity, trust, intelligence, and execution matter.
- **Behaviour:** auto-rotating chip grid, 2 sets × 6, pauses on hover/focus.

| Set | Industries |
|---|---|
| 1 | Agriculture & Farming · Artificial Intelligence · Banking & Finance · Clean Energy · E-com & Logistics · Ed-Tech |
| 2 | Food & Beverage · Retail & Distribution · SAP Solutions · Shipping and Mailing · Sustainability · Web3 & AI Tech |

## 8. Work — `id="work"`
- **Title:**
  > Work shaped around
  > real business needs.
- **Body:**
  > We work across products, websites, presentations, campaigns, and internal systems — helping teams turn complex ideas into clear, usable, and effective digital experiences.
- **6 work cards** (`title` — `meta`):

| Title | Meta | Layout |
|---|---|---|
| AI Banking | Diebold Nixdorf - Banking | full-width |
| A trustworthy security system | Prometric - Education | half |
| Modern e-commerce platform | WareIQ - Logistics | half |
| AI that knows your business | SymphonyAI - Retail & CPG | full-width |
| Blockchain investment | Safebay - Blockchain | half |
| One stop health needs | Lybrate - Healthcare | half |

## 9. CTA — `id="contact"`
- **Title:**
  > Let's make something
  > worth making.
- **Copy:**
  > If you're building something that matters and you want a design partner with the rigour, the range, and the conviction to do it justice - we should talk.
- **Button:** Get Started (→ `mailto:hello@designtribe.com`)

## 10. Footer
See [Global elements → Footer](#footer-both-page-types).

---

# SERVICE PAGES (`/services/:slug`)

All 8 service pages share one template (`ServicePage.tsx`). Section order:

1. **Hero** — `heroTitle` + `heroCopy` *(per service)*
2. **Trusted strip** — identical to homepage (kicker "Trusted by teams across industries" + rotating logos)
3. **Service work** — tab bar + `sectionTitle` + `sectionCopy` + project cards *(per service)*
4. **Human + AI intro** — Guided by Humans / Powered by AI *(see copy below)*
5. **Process** — 4 steps; titles per service, body copy shared
6. **Industries** — identical to homepage
7. **CTA** — identical to homepage
8. **Footer** — global

### Shared: Service tab bar
`Branding` · `Rebranding` · `UX + UI Design` · `Website Design + Development` · `AI Product + Software Design` · `Design Systems + Frameworks` · `Content + Marketing Design` · `Presentation Design`
*(Active tab matches the current service.)*

### Shared: Human + AI intro (service pages)
- **Guided by Humans** — We lead with research, strategy, creativity, and craft making sure every decision is shaped by people, not just tools.
- **Powered by AI** — AI supports our process across research, content, design systems, prototypes, and execution faster without losing clarity.

### Shared: Process body copy (all service pages)
Heading: *From idea to execution, we keep the process clear.*
Sub: *We bring structure to every stage — understanding the problem, shaping the direction, building the experience, and improving it over time.*
Each numbered step pairs a per-service **title** (below) with one of these shared lines, in order:
1. Clarity on the business, audience, goals, and opportunity.
2. Strategy, content, journeys, and design direction built into a clear plan.
3. Products, websites, presentations, and communication brought to life with design.
4. Refinement, optimisation, and support to keep the experience moving forward.

### Shared: Industries (service pages)
Same title/body/chips as homepage section 7.

### Shared: CTA (service pages)
Same as homepage section 9 ("Let's make something worth making." → `hello@designtribe.com`).

---

## Per-service content

### 1. Branding — `/services/branding`
- **Hero title:** Before a single pixel is placed, we think. Deeply, honestly, and with your future in mind.
- **Hero copy:** Great design doesn't just look good — it works hard. We partner with ambitious organizations to craft identities, experiences, and digital products that people actually love to use. Explore what we can do together.
- **Section title:** Before a single pixel is placed, we think. Deeply, honestly, and with your future in mind.
- **Section copy:** Whether you're launching something new or giving a beloved brand the foundations it always deserved, we approach every engagement with the same discipline: understand first, design second, always with the long view in mind.
- **Projects (8):** WareIQ · Integritty · Safebay · Enphase · Vitani.ai · Greenstory · Future Food Cast · KMG *(all labelled "Branding")*
- **Process steps:** Strategy · Adaptable artistry · Messaging + Voice · Brand handbooks

### 2. Rebranding — `/services/rebranding`
- **Hero title:** We don't change for sake. We change because something better is possible.
- **Hero copy:** We lead full rebrand engagements: from the honest diagnostic at the start, through the tension of letting go of what's familiar, to the clarity and momentum of launching something your team is genuinely proud to represent.
- **Section title:** Before a single pixel is placed, we think. Deeply, honestly, and with your future in mind.
- **Section copy:** Whether you're launching something new or giving a beloved brand the foundations it always deserved, we approach every engagement with the same discipline: understand first, design second, always with the long view in mind.
- **Projects (4):** GateFM · Fulton County · Asian Corporation · Crosstower *(all labelled "Rebranding")*
- **Process steps:** Assessment before action · Preserving what matters · Future-proof positioning · Future-proof positioning ⚠️ *(step 4 duplicates step 3 — likely a content bug)*

### 3. UX + UI Design — `/services/ux-ui-design`
- **Hero title:** Good UX isn't invisible. It's the reason people come back *(no trailing period in source)*
- **Hero copy:** We embed into your product reality, learn your users, and design with the full picture in mind. Every screen is designed to earn its place.
- **Section title:** Good UX isn't invisible. It's the reason people come back
- **Section copy:** We embed into your product reality, learn your users, and design with the full picture in mind. Every screen is designed to earn its place.
- **Projects (6):** SymphonyAI · Diebold Nixdorf · Pitney Bowes · Integritty · WareIQ · Safebay
- **Process steps:** Discovery + User research · Information architecture · High-fidelity design · Usability testing

### 4. Website Design + Development — `/services/website-design-development`
- **Hero title:** We don't hand off a finished site and disappear. We hand over control.
- **Hero copy:** The result is a site that doesn't just look like a great brand — it works like one. Fast, flexible, accessible, and built to evolve alongside your organization without requiring a rebuild every two years.
- **Section title:** We don't hand off a finished site and disappear. We hand over control.
- **Section copy:** We embed into your product reality, learn your users, and design with the full picture in mind. Every screen is designed to earn its place.
- **Projects (6):** SymphonyAI · Diebold Nixdorf · Pitney Bowes · Integritty · WareIQ · Safebay
- **Process steps:** Strategy + architecture · UX, UI, and accessibility · In-house development · Empowering your team

### 5. AI Product + Software Design — `/services/ai-product-software-design`
- **Hero title:** The interface is where AI's promise meets human reality. That gap is where we work.
- **Hero copy:** Whether you're building an AI-native SaaS product, embedding intelligence into an existing enterprise platform, or designing the interface layer for a custom LLM application, we bring the frameworks, patterns, and craft that the moment demands.
- **Section title:** The interface is where AI's promise meets human reality. That gap is where we work.
- **Section copy:** Whether you're building an AI-native SaaS product, embedding intelligence into an existing enterprise platform, or designing the interface layer for a custom LLM application, we bring the frameworks, patterns, and craft that the moment demands.
- **Projects (6):** SymphonyAI · Diebold Nixdorf · Pitney Bowes · Integritty · WareIQ · Safebay
- **Process steps:** Designing for uncertainty · Agentic interface design · Prompt UX + conversational design · AI-powered dashboards

### 6. Design Systems + Frameworks — `/services/design-systems-frameworks`
- **Hero title:** A design system is only valuable if people use it. We build the kind they actually want to.
- **Hero copy:** We build design systems that are genuinely used, genuinely loved, and genuinely maintained.
- **Section title:** A design system is only valuable if people use it. We build the kind they actually want to.
- **Section copy:** We embed into your product reality, learn your users, and design with the full picture in mind. Every screen is designed to earn its place.
- **Projects (6):** SymphonyAI · Diebold Nixdorf · Pitney Bowes · Integritty · WareIQ · Safebay
- **Process steps:** Audit + foundations · Component libraries · Accessible by default · Governance + adoption

### 7. Content + Marketing Design — `/services/content-marketing-design`
- **Hero title:** The best marketing creative doesn't interrupt. It earns its place in someone's day.
- **Hero copy:** Embedded in your growth ambitions, aligned to your brand, and producing the volume and variety of work that modern marketing demands — without ever letting the standard slip.
- **Section title:** The best marketing creative doesn't interrupt. It earns its place in someone's day.
- **Section copy:** We embed into your product reality, learn your users, and design with the full picture in mind. Every screen is designed to earn its place.
- **Projects (6):** SymphonyAI · Diebold Nixdorf · Pitney Bowes · Integritty · WareIQ · Safebay
- **Process steps:** Campaign creative · Content systems · Digital advertising · Brand-coherent

### 8. Presentation Design — `/services/presentation-design`
- **Hero title:** The best presentations don't just inform. They shift how the room thinks.
- **Hero copy:** Investor pitches, board reviews, product launches, keynotes, sales decks, and the strategic narratives that shape how an organization sees itself and its future. We don't make slides look better. We make arguments land harder.
- **Section title:** The best presentations don't just inform. They shift how the room thinks.
- **Section copy:** We embed into your product reality, learn your users, and design with the full picture in mind. Every screen is designed to earn its place.
- **Projects (6):** SymphonyAI · Diebold Nixdorf · Pitney Bowes · Integritty · WareIQ · Safebay
- **Process steps:** Narrative structure · Visual storytelling · Investor + pitch decks · Sales + proposal decks

---

## Content notes & inconsistencies (worth resolving in the redesign)

- **Client name spelling** — "**Integrify**" in the homepage logo strip vs "**Integritty**" in service-page projects. Pick one.
- **Rebranding process** — step 4 ("Future-proof positioning") duplicates step 3.
- **Service section copy** — 5 of 8 service pages reuse the same generic line ("We embed into your product reality…"), and most repeat their hero title verbatim as the section title. Likely placeholder copy.
- **UX hero** — missing a trailing period: "…the reason people come back".
- **Human + AI intro copy differs** between homepage ("craft — making sure…") and service pages ("craft making sure…", em-dash dropped).
- **Unused data in `homeData.ts`** — the exported `services` line-break copy, `humanAiItems`, `processRows`, `humanIntroItems`, and `workItems` are consumed by the homepage, but the separate `industries` array (6 items) is **not** used; the live homepage/service Industries strip uses `industrySets` (2×6) defined inside `HomePage.tsx`. Consolidate during redesign.
- **Project cards have no per-project copy** — only a service label + client name; visuals are empty placeholders.
- **CTAs** all point to `mailto:hello@designtribe.com`; header/footer "Get Started" point to `/#contact`.
