# Design System

> **Source of truth for the from-scratch redesign.** The old build's visual design is **discarded** —
> we kept only its **copy** (→ `CONTENT.md`). Everything under "Legacy tokens" at the bottom is the
> *old* code, reference-only, being replaced. Do not treat it as a target.

---

## Design language (NEW — use this)

### Fonts (current — set 2026-06-16)
| Role | Typeface | Google Fonts family | Notes |
|---|---|---|---|
| **Display / headings** | **Anton** | `Anton` | Bold condensed sans, caps-oriented; the hero + statement headlines. One weight (400); no true italic (synthesised). |
| **Body / UI** | **Hanken Grotesk** | `Hanken Grotesk` | Grotesk sans for body + interface; global `body` default. |
| **Mono / labels** | **Geist Mono** | `Geist Mono` | Monospace for nav / brand mark / badge / button / labels. (Geist Mono **is** on Google Fonts.) |

Tailwind: `font-display` (Anton) · `font-sans` (Hanken Grotesk) · `font-mono` (Geist Mono). One Google Fonts
`@import` in `src/index.css`. ⚠️ **Tailwind config font changes need a dev-server restart** to regenerate.

> Earlier font directions (superseded): **Cardo / Schibsted Grotesk / Space Mono** (brand system), and before that the
> prototype's **Bungee / Familjen Grotesk / Reddit Mono**. None are loaded now.

### Color
Implemented as CSS custom properties in `src/index.css` (`:root` = light, `[data-theme="dark"]` = dark)
and exposed via `tailwind.config.ts`. Use the **semantic tokens** in UI; reach for raw ramp stops only
when a specific shade is needed.

**Ramps** (mode-independent)
- Emerald (brand): `50 #E9F5F0 · 100 #C7E8DC · 200 #94D4C0 · 300 #5CBDA0 · 400 #27A082 · 500 #008A65 · 600 #00785A · 700 #00614A · 800 #064B3A · 900 #0B382C` — **500 = primary**
- Stone (warm neutral): `paper #FAF8F3 · 100 #E8E3D8 · 200 #D7D1C2 · 300 #BBB4A2 · 400 #948C7B · 500 #6F6757 · 600 #524B3E · 700 #3A352C · 800 #262220 · 900 #161310`
- Clay (accent): `400 #D9774E · 500 #C25A3A · 600 #A6492E`

**Semantic tokens** (CSS var · Tailwind class)

| Token | Light | Dark |
|---|---|---|
| `--color-bg` · `bg` | #FAF8F3 | #161310 |
| `--color-surface` · `surface` | #FFFFFF | #1E1B18 |
| `--color-surface-raised` · `surface-raised` | #FFFFFF | #262220 |
| `--color-surface-sunken` · `surface-sunken` | #F3F0E8 | #1E1B18 |
| `--color-text` · `ink` | #161310 | #F4F1E9 |
| `--color-text-secondary` · `ink-soft` | #524B3E | #C3BCAD |
| `--color-text-muted` · `ink-muted` | #948C7B | #8A8377 |
| `--color-border` · `line` | #E5DFD2 | #322D27 |
| `--color-border-strong` · `line-strong` | #BBB4A2 | #46403A |
| `--color-primary` · `primary` | #008A65 | #008A65 |
| `--color-primary-hover` · `primary-hover` | #00785A | #16A07A |
| `--color-on-primary` · `primary-on` | #FFFFFF | #FFFFFF |
| `--color-primary-ink` · `primary-ink` | #00614A | #3FBE9E |
| `--color-accent` · `accent` | #C25A3A | #D9774E |
| `--color-on-accent` · `accent-on` | #FFFFFF | #221008 |
| `--color-panel` · `panel` | #161310 | #ECE7DC |
| `--color-on-panel` · `panel-on` | #F4F1E9 | #161310 |
| `--color-focus` · `focus` | #008A65 | #3FBE9E |
| `--color-success` · `success` | #00785A | #3FBE9E |
| `--color-warning` · `warning` | #C98A1E | #E3AB45 |
| `--color-error` · `danger` | #C0392B | #E5604F |
| `--color-info` · `info` | #356C86 | #6FB0CC |

**Usage notes**
- `panel` intentionally inverts vs the page (dark panel on light, light panel on dark) — for feature sections (AI / CTA).
- White on `primary` ≈ 4.34:1 — fine for buttons and large/bold text; for **small** green text on the page use `primary-ink`, which passes AA.
- Pair text on any fill with its `*-on` / ramp 800–900 counterpart — never raw black/white by default.

### Art direction / experience
The feel, set by the positioning (strategist) and the shift toward younger decision-makers:
- **Animation-driven / motion-intense** — motion is a primary design material, not decoration. Transitions, scroll choreography, reactive elements.
- **Maximalist** — richer, denser, more expressive than the old minimal-corporate look. Bold type, layered composition, confident use of the green.
- **Creative / distinctive** — memorable and opinionated; should feel like a studio that *makes* things, aimed at emerging decision-makers while staying credible to current corporate clients.
- **Performant & accessible** — heavy motion must stay smooth and **must honor `prefers-reduced-motion`** (degrade gracefully to a calm, static experience).

> **🚫 NO eyebrows / kickers / counters above section titles — firm, standing rule.** Never put a small label,
> tag, badge, or step/index counter *above* (or as a lead-in to) a section heading — **lead with the headline.**
> The user has repeatedly removed these: "✦ WHAT WE DO", the services "NN / 08" counter, "● Services",
> "● HUMAN × AI", and the Process **"STEP 0N / 04"** counter. Geist-Mono labels remain fine *inside* UI
> (nav, buttons, in-card metadata, progress affordances that aren't a title lead-in) — just **never as a section eyebrow.**

**Motion stack: GSAP** (`gsap` + `@gsap/react`) — full plugin set registered in `src/lib/gsap.ts`.
ScrollTrigger / ScrollSmoother for scroll choreography, SplitText for type reveals, Flip / DrawSVG /
MorphSVG for transforms, Inertia / Physics for reactive feel. Always honor `prefers-reduced-motion`.
🔲 Still: calibrate "how maximalist" against reference sites / a moodboard.

### Type scale & spacing
🔲 Full scale not yet defined for the new design. Do **not** inherit the legacy scale below — it was
pixel-exact to the discarded design.

Current home hero: display headline **Anton** `clamp(30px, 5.2vw, 76px)` (caps, "ENDURES." synth-italic), leading
`1.04`, bottom-left; badge + nav + brand + button **Geist Mono** (`11–15px`, uppercase/tracked for labels); cream
`#f2eee3` + brand green over the dark GrainGradient. Statement headline (reel): **Anton** `clamp(2.5rem, 11vw, 13rem)`
**uppercase**, cream with **forest green `#008a65`** on "MOVES PEOPLE". Accent green across the dark sections is the
brand emerald **`#008a65`** (was a mint/cyan `#90ffe1`, changed 2026-06-16). Full scale still TBD.

### Motion
🔲 Broader system still TBD. The legacy motion (reveal-on-scroll, rotating logo/industry strips,
scroll-driven process stepper) is a reference for *behavior ideas* only — decide fresh what to keep.

Home hero (implemented, prototype direction): animated **GrainGradient** background + centered **LiquidMetal**
chrome mark; GSAP entrance (nav → mark settles from scale-up → Bungee headline rises out of a clip → badge),
plus a drifting particle field + cursor glow. Copy is **visible by default**; a `gsap.set` failsafe forces the
resting state at 2.8s so a stalled ticker can't trap it. Reduced-motion → shaders static, static mark, no
entrance. Earlier directions (editorial reel; GemSmoke / Warp) are superseded. Rationale → `DECISIONS.md`.

**Showreel stage** (`ReelStage`, implemented — a `~440vh` sticky scroll track **below a standalone hero**; no
reveal/dissolve/fade):
1. **Hold** (`p<0.18`): the autoplaying reel sits **full-bleed**.
2. **Filmstrip** (`p≈0.18–1`): video + headline ride one **rail that slides left** — the reel exits stage-left while
   the oversized **Anton uppercase** headline "DESIGN THAT MOVES PEOPLE. AND BUSINESS" scrolls in from the right, each
   char tumbling in (manual per-char scatter, `back.out`). Rest state = **"business" at the left margin**
   (`business.left − 5vw`), the **auto-cycling partner logos** (`LogoCycler`) parked directly beneath it. "MOVES
   PEOPLE" is forest green `#008a65`.

**Services bento → AI section** (`ServicesBento` + `AiSection`): a bento gallery (8 curated Unsplash renders in
`public/assets/gallery/`) that pins and **GSAP Flip-zooms into its centre cell** (the iridescent knot), then an
**"AI can do remarkable things."** section — Anton caps title (forest-green "REMARKABLE"), offset Hanken intro, and
4 numbered points in a hairline-divided 2×2 grid. Flip MUST run in a plain effect, not `useGSAP` (see `DECISIONS.md`).

**Services** (`ServicesScroll`, after `AiSection`): a full-bleed forced-dark (`#07080b`) **pinned horizontal parallax
carousel** (style ref: parallax-carousel.framer.ai) — intro panel ("From brand identity to **AI-native** interfaces.") →
**8 contained image cards** (placeholder Unsplash photo in `public/assets/services/s1–s8.jpg`; the image is oversized
(`scale(1.26)`) and **panned within its frame** by a fraction of the card's distance from viewport-centre = parallax depth;
Anton title, Hanken copy, a green "— View service" line → `/services/:slug`) → a green CTA panel. Cards are **contained**
(`clamp(440px,76vh,880px)`, vertically centred — they float with space above/below, not full-height) so their content clears
the `FloatingNav` naturally. No progress bar / top chrome. Mechanic = pin + one scrubbed `x` tween (**no ScrollSmoother** —
see `DECISIONS.md`); the parallax runs in the **tween's** `onUpdate` (frame-accurate under `scrub:1`); `refreshPriority:-1`
so it refreshes after the bento pin (else it pins ~1 viewport early — see `DECISIONS.md`). Reduced motion → a static 2-col
grid. `id="services"` (anchor target). *(Card images are placeholders — swap for real per-service imagery later.)*

**Process** (`ProcessSection`, after `ServicesScroll`): a forced-dark (`#07080b`) **"sticky canvas" scroll-driven stepper**
(Direction A). The whole composition lives in ONE pinned viewport via **CSS `position:sticky`** (no GSAP pin): a
section-header band (`AiSection` Anton-title + Hanken-intro pattern; **no eyebrow — leads with the title**), then a 2-col
stage — LEFT a vertical **progress rail** (track `white/10`, continuous green `#008a65` fill) + the **4 steps as a compact
list** (active bright, others dim to 0.32, number `#16a07a`); RIGHT a large **line-art canvas** that **redraws per step**
(crossfades via `.dt-canvas-enter`) + a Geist-Mono `// tag`. The section is `min-height: (1 + 4·STEP_VH)·100vh`
(`STEP_VH=0.62`); a plain passive scroll listener maps the section's scroll progress (0→1) to the rail fill (continuous, set
on a ref — no re-render) and the active index (`floor(p·4)`, state). **No pin / no ScrollTrigger** → no refreshPriority, no
entry-jump, and because the steps don't scroll away every step (incl. the last) gets an equal quarter of dwell — this
replaced an earlier GSAP-pinned attempt where the last step couldn't dwell. The canvas art is line-work standing in for the
real per-step visuals (TBD). `id="process"`. Reduced motion **or < lg** → a static header band + a fully-visible list of all
4 steps (no sticky).

The reel is an **autoplaying** loop (`reel-1080.mp4` 6.3 MB · `reel-720.mp4` 3.0 MB for ≤768px · `reel-poster.jpg`),
**not** scroll-scrubbed. Autoplay requires `video.muted` set via a **callback ref** (React's `muted` prop is
unreliable); an IntersectionObserver on the video plays/pauses it by real visibility. `LogoCycler` crossfades 5 random
slots from a pool of client wordmarks (figma-home named + `logos/trusted/*`), forced white via
`filter: brightness(0) invert(1)`. Tunables are consts at the top of `ReelStage.tsx`. Reduced-motion → static closing
frame (poster + headline + logos).

> Note: `html { scroll-behavior: auto }` (was `smooth`) — CSS smooth-scroll fights ScrollTrigger pin/scrub.

**Nav:** the hero has a fixed **top** nav (logo + links + theme toggle + CTA). Once the showreel takes over
(`scrollY > 0.8 × vh`, tracked in `Home` as `inReel`) the top nav fades out (`Hero` `hideNav` prop) and a
**`FloatingNav`** pill fades up at **bottom-centre** — awwwards `menu-float` style: dark blurred pill
(`rgba(20,20,22,0.72)`, radius 14px), logo + Work/Services/About (Geist Mono) + "Get in touch" CTA. Both navs use the
**full Design Tribe wordmark logo** (`/assets/design-tribe-logo.svg`, brand-green lockup) — it replaced the old
`design-tribe-icon.svg` + "DESIGN TRIBE" mono text (now unused).

---

## Legacy tokens — REFERENCE ONLY (design discarded)

> Historical record of the original Figma-exact tokens — **no longer in the code** (replaced by the
> implemented palette above). Kept only to help read / strip leftover old component styles. **Not targets.**

### Legacy color tokens (CSS vars on `.homepage[data-theme]`)
| Token | Light | Dark |
|---|---|---|
| `--page-bg` / header / surface / card / cell | `#ffffff` | `#0f0f0f` |
| `--surface-visual` | `rgba(249,249,243,.5)` | `rgba(249,249,243,.5)` |
| `--surface-panel` / `--surface-cta` | `#707070` | `#ededed` |
| `--text-primary` | `#0f0f0f` | `#ffffff` |
| `--text-secondary` / `--text-muted` | `#707070` | `#ffffff` |
| `--text-panel` / `--text-cta` | `#ffffff` | `#0f0f0f` |
| `--accent` (old green) | `#00694e` | `#00694e` |
| `--eyebrow-bg` / `--eyebrow-text` | `#e9e9d2` / `#707070` | `#fcfcf9` / `#0f0f0f` |
| `--border-primary` / `--border-secondary` | `#b8b8b8` / `#d6dce5` | `#ffffff` / `#ffffff` |
| `--button-bg` / `--button-text` | `#0f0f0f` / `#fff` | `#fff` / `#0f0f0f` |
| `--process-track` / `--process-progress` | `#ededed` / `#0f0f0f` | `#5b5b5b` / `#fff` |
| `--focus-ring` | `#0f0f0f` | `#ffffff` |

### Legacy typography
- Family: **Inter** (being replaced by Cardo / Schibsted Grotesk / Space Mono). Global tracking −0.02em.
- Old scale (size / line-height, desktop → mobile): Hero 48/60→40/50 · Section/panel/CTA h2 40/50→31/39 ·
  Card/process/work h3 32/40→24 · Subhead h3 24/30 · Body 16/24.8 · Small 14/21.7 · Tabs 16/20.

### Legacy spacing & layout
- Container 1152px max, 24px gutter (16px mobile). Section rhythm `mt-40` (160px) desktop / `mt-24` mobile;
  intra-section `mt-20` (80px); card gaps `gap-20`. Panels `p-20`→`p-10`→`p-6`. Card/visual block 536×536.
- Grids (trusted logos, industries): 6 → 3 (≤1023) → 2 (≤639) cols, 80px cell height.

### Legacy motion
- Easing `cubic-bezier(.22,1,.36,1)`. Durations fast 450 / medium 620 / slow 650; soft 500; calm 540;
  stagger 70ms. Keyframes `dt-fade-down`, `dt-hero-line`, `dt-soft-scale`, `dt-trusted-logo-in/-out`.
  Rotating strips: hold 2000ms, cell 430ms, gap 500ms. All disabled under `prefers-reduced-motion`.

### Legacy component classes (in `index.css`)
`.site-header .site-nav .header-cta` · `.hero-eyebrow .hero-title .hero-copy` · `.section-title .section-kicker .section-copy` ·
`.service-card .card-title .card-copy .visual-panel` · `.ai-panel .panel-title .panel-copy .theme-title .theme-copy .theme-icon` ·
`.process-rail .process-progress .process-row(-content) .process-title .process-copy .process-divider` ·
`.trusted-logo-strip/-cell/-image .industry-grid .industry-chip` · `.cta-panel .cta-button .site-footer .footer-*` · `.service-tabs-scroll`
