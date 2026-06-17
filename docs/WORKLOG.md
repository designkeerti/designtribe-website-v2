# Work log

Reverse-chronological. Add an entry whenever you finish a chunk or end a session.
Template at the bottom — copy it to the top and fill in.

## 2026-06-16 — Process rebuilt → "sticky canvas" (Direction A); dropped GSAP for CSS sticky; gap + last-step-dwell fixed
**Did:** User rejected the pinned-stage build ("don't like it … re think") and flagged a **spacing gap** between the title
and the stepper. Diagnosed the gap (title band sat outside a separately-pinned stage that centred its content in a full
viewport → ~half a screen of dead space). Showed **two fresh directions as interactive mockups** (A sticky-canvas, B
horizontal reel); user chose **A**. Rebuilt `ProcessSection` accordingly:
- **One pinned viewport via CSS `position:sticky` (no GSAP).** Section is `min-height:(1 + 4·STEP_VH)·100vh`
  (`STEP_VH=0.62` → ~348vh); an inner `sticky top:0` stage holds the whole composition: header band (title + body) + a 2-col
  stage — LEFT a vertical **progress rail** (continuous green fill) + the **4 steps as a compact list** (active bright,
  others dim 0.32); RIGHT a **line-art canvas** that **redraws per step** (`.dt-canvas-enter` crossfade) + a Geist-Mono
  `// tag`.
- **Active + rail driven by a plain passive scroll listener** mapping the section's scroll progress (0→1) → rail fill
  (continuous, set on a ref, no re-render) + active index (`floor(p·4)`, equality-guarded state). **No ScrollTrigger / no
  pin** → no refreshPriority, no entry-jump, no dead space.
- **Replaced the placeholder spinner-ish motifs with restrained line-art SVGs** (crosshair / node-path / grid / refine-loop)
  — still stand-ins for the real per-step visuals, but read as design not loaders. Swapped the `index.css` keyframes
  (`dt-proc-*` → a single `dt-canvas-in`/`.dt-canvas-enter`).
- **Key lesson logged in DECISIONS:** a sticky canvas with steps that *scroll past* can't let the **last step dwell** (it
  only centres as the page bottoms out — ~17px vs ~370px). Pinning the list and *scrubbing the active index* gives every
  step an equal quarter of dwell.
**State:** `tsc -b` → 0, `npm run build` clean, console clean. Verified live via eval (the plain scroll listener — unlike the
GSAP ticker — fires on programmatic scroll even in the backgrounded preview tab): section 2784px (348vh), **not pinned**
(`sticky top:0`, stays at viewport top while scrolling); at rest step 01 bright / rail 0% / canvas = crosshair; **@0.375**
rail 37.48%, step 02 "Shape" bright, canvas redrawn to the node-path (`// shape`); **@0.95** rail 94.99%, **step 04 "Improve"
bright** (others 0.32), canvas = refine-loop (`// improve`) — last step now dwells. Margins still match `AiSection`.
**Next:** **design the real per-step canvas visuals** (replace the 4 line-art stand-ins) — abstract/generative vs
literal/illustrative, user's call. Tune `STEP_VH` (dwell per step) + canvas size to taste. Then: **Industries → Work → CTA →
Footer**.

## 2026-06-16 — Process restructured: header band + pinned stage (active step + per-step animated block)
**Did:** Per user direction (the right side is slated to be a per-step animated block) + their two layout picks
(title/body = a header band; left = one step at a time), rebuilt `ProcessSection`'s layout:
- **Title + body → a section-header band** at the top — the `AiSection` 2-col Anton-title + Hanken-intro pattern (normal
  flow, gentle reveal). It reads in, then scrolls away as the stage pins. *(This is the answer to "how do we show the
  title/body in our language" — reuse the existing section-header pattern; nothing new invented.)*
- **Pinned STAGE** — the **stage** is pinned (not the whole section, so the band scrolls past first). Left = the **active
  step shown one at a time** (big Anton number + name + Hanken copy, crossfading via `.dt-step-enter` on index change)
  beside the **progress rail** (fill + glowing head). Right = a **per-step animated block**.
- **Animated block = PLACEHOLDER** — 4 simple abstract motifs (radar rings / morphing form / rising bars / refine loop)
  that crossfade with the active step + a Geist-Mono `// tag`. Stand-ins for the real per-step animations (TBD). Keyframes
  added to `index.css` (`dt-proc-ring/morph/rise/spin`, `dt-step-in`).
- Pin still `refreshPriority:-2` (lowest pin on the page); the header-band reveal is a separate, non-pinned trigger.
**State:** `tsc -b` → 0, `npm run build` clean, console clean. Verified via **eval geometry** (rAF throttled in the hidden
preview tab → live motion still unviewed): section **not** pinned; the **stage** is in the pin-spacer (`3104 = 800 + 2304`
travel) and engages at `11983`, just after the header band (`y 11787`, h 170) scrolls by; left shows step **01 Understand**
(green `#16a07a`), block shows **motif 0 only** (`// understand`); rail fills linearly (`0/184/368` over the 368px rail) +
head tracks `0/50/100%`; `.dt-step-enter` = `dt-step-in 0.55s`. **Margins now match `AiSection`** (`left 77 / width 1126` at
1280; `280 / 1240` at 1800).
**Next:** design the **real per-step animations** for the block (replace the 4 placeholder motifs) — open question for the
user (abstract/generative vs literal/illustrative). Watch the live scroll-through in a foreground browser; tune dwell
(`PIN_VH_PER_STEP=0.72`). Any pin added below this still needs `refreshPriority:-3`.

## 2026-06-16 — Process review: removed the step counter (eyebrow), fixed margins; no-eyebrows rule recorded
**Did:** Per user review of the Process build:
- **Removed the `STEP 0N / 04` counter** from `ProcessSection` — it read as a section eyebrow. The section now **leads
  with the Anton title** (Header simplified; `active` prop dropped).
- **Logged a firm, standing rule in `DESIGN-SYSTEM.md`: NO eyebrows / kickers / counters above section titles** — lead
  with the headline. (History of stripped ones: "✦ WHAT WE DO", services "NN / 08", "● Services", "● HUMAN × AI",
  Process "STEP 0N / 04".) Geist-Mono labels stay fine *inside* UI (nav/buttons/in-card meta) — just never as an eyebrow.
- **Fixed the margins.** The pinned variant nested its `px-[clamp(20px,6vw,120px)]` *inside* the `max-w-[1240px]`
  container → double-inset content (invisible at 1280, but ~120px more inset per side + ~240px narrower than the sections
  above on wide screens). Moved the padding to the `<section>` with `max-w` inside — matching `AiSection`. Verified at
  **1800px**: Process content now `left 280 / width 1240`, **identical to AiSection** (was ~400 / 1000).
**State:** `tsc -b` → 0, dev console clean; counter-gone + margins-match verified via eval.
**Next:** the right column is slated to become a **per-step animated block** (its animation changes with the active step).
Proposed layout to the user (awaiting go-ahead before rebuilding): show the **title + body as a section-header band** (the
`AiSection` 2-col pattern), then a pinned stage = **left: the active step, changing as you scroll, + the rail · right: the
animated block.** Do **not** re-add the counter.

## 2026-06-16 — Process section: scroll-driven pinned stepper (`ProcessSection`)
**Did:**
- **New `ProcessSection`** (`src/components/ProcessSection.tsx`), rendered in `Home` **after `ServicesScroll`** (before
  `FloatingNav`). A forced-dark (`#07080b`) section that **pins full-bleed and runs a scroll-driven stepper.** Left =
  a header column: Geist-Mono **`STEP 0N / 04` counter** → Anton uppercase title "FROM IDEA TO EXECUTION, WE KEEP THE
  PROCESS CLEAR." (green "process clear.") → Hanken body. Right = the stepper: a vertical **progress rail** + the **4
  steps** (01–04 Understand / Shape / Build / Improve). As you scroll, the active step is full-opacity with a green
  `#16a07a` number, the **others dim to 0.26** (numbers `#454b46`), the rail **fills top→down** with a glowing green
  head, and the counter advances. A giant ghosted active numeral (white ≈0.05) bleeds off the right edge, crossfading
  per step.
- **Mechanic** = a pinned, scrubbed ScrollTrigger driving a `{p:0→1}` proxy (`end:"+=" + innerHeight*0.72*4`). The
  **smooth rail (fill `scaleY` + head `top`) is set from the TWEEN's `onUpdate`** (frame-accurate under `scrub:1`, per
  DECISIONS); the **discrete active index** (`floor(p*4)`, equality-guarded React state) changes 4× so it's cheap.
  `document.fonts.ready → ScrollTrigger.refresh()` (Anton shifts layout).
- **`refreshPriority:-2`** — the **lowest pin on the page** (below `ServicesScroll`'s `-1` and the bento's plain-effect
  default `0`), so it refreshes LAST and computes its `start` after the pin-spacers above it exist (the documented
  "descending page order" rule — else it pins ~1 viewport early and jumps on entry, exactly the old ServicesScroll bug).
- **Reduced motion OR < lg (1024px)** → a **static, fully-visible list** of all 4 steps (no pin), reusing the legacy
  desktop-only gate; counter shows "04 steps".
**State:** `tsc -b` → 0, `npm run build` clean (676 KB / 243 KB gzip; +4 KB), dev console clean. Verified at 1280×800
via **eval geometry** — the preview tab is **backgrounded (`document.visibilityState:"hidden"`) so rAF is throttled to 0**
and GSAP's ticker can't drive the live pin/scrub on programmatic scroll, and the `FloatingNav` backdrop-filter blanks
screenshots (both documented; eval is the source of truth). Confirmed: pinned variant mounts (bg `#07080b`); pin-spacer at
the **natural offset 11629** (after ServicesScroll's spacer) with height **3104 = 800 + the exact computed travel 2304**;
at rest step 01 active (op 1, `#16a07a`), 02–04 dim (op 0.26, `#454b46`); Anton title `#f2eee3` 58.9px, Geist-Mono counter
"Step 01 / 04"; rail green `#008a65` (`scaleY 0`, head at top); rows fit + centred, no overflow. **Simulated the exact
`onUpdate` writes** (the part rAF would drive): rail fill grows from the top linearly (scaleY 0/0.5/1 → 0/223/445px over the
445px rail) and the head tracks 0/50/100%. **Static path** verified by reloading at mobile width: not pinned, natural
height (988px), all 4 rows op 1.
**Next:** when a foreground/painting preview is available, scroll the pin live to confirm step advance + rail fill + **no
entry-jump** (structurally sound via the refreshPriority rule, but not yet seen in motion). Tune dwell
(`PIN_VH_PER_STEP = 0.72`) and ghost-numeral opacity (0.05) to taste. **Any pinned section added below this one needs
`refreshPriority:-3`.** Remaining sections: **Industries → Work → CTA → Footer**.

## 2026-06-16 — Services cards → parallax carousel (contained + inner-image parallax); removed progress bar
**Did:** Per user feedback ("cards look not so good", ref **parallax-carousel.framer.ai**) reworked the `ServicesScroll`
cards: (1) **contained** cards (`clamp(440px,76vh,880px)`, vertically centred in the pinned stage — they float with space
above/below instead of full-height ribbons; this also clears the `FloatingNav` naturally, so the old bottom-padding hack is
gone); (2) **inner-image parallax** — each card's image is oversized (`scale(1.26)`) and panned within its frame by a
fraction of the card's distance from viewport-centre, computed in the **tween's** `onUpdate` → depth as cards cross the
viewport; (3) cleaner treatment — lighter scrim, bigger Anton title, a green "— View service" line, subtle border. (4)
**Removed the bottom green progress bar** (user request) and its ref/update logic.
**State:** `tsc -b` → 0, `npm run build` clean, console clean. Verified via eval: cards contained (~683px @ 800vh), the
image pans within its frame across the sweep (parallax confirmed, e.g. card 3 image x −15→+30 while the strip moved
−1000px), services pin start = 6912 with `refreshPriority:-1` (stable across refresh), full travel reached, progress bar
gone from the DOM. *(A parallel chat ran the "next chat" prompt and added a `ProcessSection` — it's **non-pinned / no
ScrollTrigger**, confirmed via `getAll()` it doesn't affect the services pin. Some erratic preview screenshots were the
live preview being scrolled/resized, not a regression.)*
**Next:** swap placeholder card images (`s1–s8.jpg`) for real per-service imagery; intro panel min-width (420px) clips
slightly on <420px phones.

## 2026-06-16 — Navbar logo SVG; services chrome stripped; image-led service cards
**Did:** Per user request:
- **Navbar logo.** Copied the supplied wordmark to `public/assets/design-tribe-logo.svg` (full "Design Tribe" lockup, brand
  green `#008A65`, 175×34) and used it in **both** navs — the Hero top nav and the `FloatingNav` pill — replacing the old
  `design-tribe-icon.svg` + "DESIGN TRIBE" mono text. (`design-tribe-icon.svg` is now unused by code but left in
  `public/assets/`.)
- **Stripped the services chrome.** Removed the top-left **"✦ WHAT WE DO"** eyebrow and the top-right **"NN / 08" counter**
  from `ServicesScroll` (and the now-dead counter logic: `counterRef`, the `cards` query, `updateCounter`, `onRefresh`). The
  pinned section now has no top chrome — just the cards + the thin bottom progress bar (kept; it's not a label).
- **Image-led service cards.** Cards are no longer type-only: each now has a **placeholder Unsplash image** background +
  a bottom-up legibility scrim, with the title/copy/"View service →" over it (image scales on hover). Curated a cohesive
  **dark/abstract set of 8** (downloaded a 14-image pool from the Unsplash CDN, viewed a contact sheet, kept the dark ones —
  fluid art, gradients, 3D cubes, cosmic, charcoal) → `public/assets/services/s1–s8.jpg` (~1.6 MB). Dropped `num`/`category`
  from the `Service` data, added `image`. Same cards power the reduced-motion grid.
**State:** `tsc -b` → 0, `npm run build` clean, dev console clean. Verified via eval: hero logo loads (175×34), "WHAT WE DO"
+ "/ 08" gone, all 8 card images load, FloatingNav logo loads, pin still reaches **full travel** (x=−3917=−amount).
Screenshots confirm the green wordmark in both navs and the image cards reading well under the scrim.
**Next:** these card images are **placeholders** — swap for real per-service imagery later. The hero logo is green on the
green GrainGradient — legible (matches the prior green wordmark) but consider a white/мono variant or a subtle backdrop if it
ever reads low-contrast over the neon. Remove the now-unused `design-tribe-icon.svg` if confirmed dead.

## 2026-06-16 — Services: removed the "● Services" eyebrow + the per-card "NN / Category" line
**Did:** Per user request, stripped two labels from `ServicesScroll`: the **"● Services" eyebrow** (intro panel + the
reduced-motion header) and the **mono `NN / Category` line** on every card (e.g. "01 / Identity"). Cards now read: big
ghosted Anton index watermark → Anton title → copy → "View service →". The `category` field is left in the `SERVICES`
data (unused now, easy to restore). State: `tsc -b` → 0, `npm run build` clean, console clean; verified "● Services" gone
and card 01 now reads "BRANDING …" with no category line.

## 2026-06-16 — Fix: services pinned ~1 viewport too early (entry jump from the AI section)
**Did:** User reported a **glitch entering `ServicesScroll` from the AI section** — it should come in on vertical scroll
*then* go horizontal. Root cause (diagnosed by exposing `ScrollTrigger` and reading `getAll()`): the services pin's
`start` was **6119** while its pin-spacer sat at **6920** — off by exactly **801px = one viewport = the bento's pin
distance**. Because `ServicesBento`'s Flip pin runs in a **plain `useEffect`** (per DECISIONS) it is created *after*
`ServicesScroll`'s `useGSAP` (a `useLayoutEffect`, runs earlier), so on every refresh the services trigger computed its
start **before the bento's pin-spacer was accounted for** → pinned 801px early → the section yanked up to the top as you
crossed the boundary. **Fix:** added **`refreshPriority: -1`** to the services ScrollTrigger so it refreshes *after* the
bento pin (verified live: setting it corrected start 6119 → 6920, end 10036 → 10837). Did **not** touch the bento (its
plain-effect Flip is intentional).
**State:** `tsc -b` → 0, `npm run build` clean, dev console clean. Verified the entry sweep: `secTop` now decreases 1:1
(312→0 across 6600→6912) with the **strip held at x=0** the whole descent, and only at `secTop=0` (scrollY 6912 = real
spacer top) does the pin engage and horizontal begin (x 0→−30→−75…). End of pin still reaches full travel (x=−3917,
counter 08). No more jump.
**Next:** unchanged from below (placement/order; mobile intro-panel width; optional per-service imagery; wire FloatingNav
"Services" → `#services`; iOS pin pass).

## 2026-06-16 — Services section: pinned horizontal-scroll gallery (`ServicesScroll`)
**Did:**
- **New `ServicesScroll`** (`src/components/ServicesScroll.tsx`), rendered in `Home` **after `AiSection`**. A full-bleed
  forced-dark section that **pins and scrolls a horizontal strip**: an **intro panel** ("From brand identity to
  **AI-native** interfaces." + the §3 services body) → **8 service cards** (01–08; ghost Anton index, mono
  `NN / Category`, Anton title, Hanken copy, "View service →" — each links to `/services/:slug`) → a **CTA panel**
  ("Let's make something worth making." → `mailto:hello@designtribe.com`). Persistent chrome: top-left "✦ WHAT WE DO",
  a **live `NN / 08` counter** (top-right), and a **bottom progress bar**.
- **Mechanic = the user's CodePen horizontal gallery, but WITHOUT ScrollSmoother.** The supplied snippet wraps the whole
  page in `ScrollSmoother`; this site is deliberately native-scroll + ScrollTrigger (`scroll-behavior:auto`; ScrollSmoother
  was rejected — see DECISIONS). The horizontal scroll only needs the **pin + a single scrubbed `x` tween**
  (`x: () => -(scrollWidth - innerWidth)`, `end: () => "+="+amount`, `pin`, `scrub:1`, `invalidateOnRefresh`), so I ported
  just that and left the other pins untouched. Added `ScrollTrigger.config({ ignoreMobileResize:true })` once in
  `src/lib/gsap.ts` (app-wide — stops mobile address-bar resize from thrashing every pin).
- **Key fix — counter/bar lagged the strip:** driving the chrome from the **ScrollTrigger's** `onUpdate` read positions on
  raw *scroll*, before the `scrub:1` strip had caught up → counter trailed ~2 cards and the bar led the strip. Moved both
  into the **tween's** `onUpdate` (fires every catch-up frame) and based the bar on the strip's actual `x` → all three move
  together, frame-accurate.
- **Fix — CTA button/links collided with the `FloatingNav`:** bottom-anchored content sat ~26px from the bottom, under the
  nav's ~90px zone. Lifted it (`pb-[clamp(72px,12vh,116px)]`) in the **pinned variant only**; the reduced-motion stacked
  grid keeps tight padding. Refactored card/CTA padding to be per-variant (removed from the base class).
**State:** `tsc -b` → 0, `npm run build` clean (672 KB / 242 KB gzip; +14 KB), dev console clean. Verified at 1280×800 via
eval (programmatic-scroll + `scrub:1` needs settle-polling to read true values): pin engages + holds (`secTop=0`), strip
scrubs **linearly 0 → −3917** (full travel — last card + CTA fully revealed), counter frame-accurate (e.g. `07` at
`x=−3414`), bar tracks the strip, no nav collision (`collides:false`, 22px gap), reduced-motion path = static 2-col grid
(code-verified; the harness can't toggle the media query). Mobile 375px pins + recomputes travel (amount 3014).
*(Screenshots render narrow whenever the `FloatingNav`'s `backdrop-filter` is on screen — the documented headless capture
glitch; eval geometry is the source of truth.)*
**Next:** decide final **placement/order** (currently last; could move before `AiSection`). Make the intro panel narrower on
mobile (min 420px > 375px viewport → slightly clipped). Optional: real per-service imagery instead of type-only cards; wire
the `FloatingNav` "Services" link to `#services`. iOS pass on the pin (shares the reel/bento pin-settling caveat).

## 2026-06-16 — Accent cyan → brand forest green; removed the "Human × AI" eyebrow
**Did:** Replaced the mint/cyan accent (`#90ffe1`) and the teal/jade label greens (`#5cbda0`, `#00c98e`) used in the
newer dark sections with the brand **forest green `#008a65`** (emerald-500) — reel headline accent ("MOVES PEOPLE"),
`AiSection` "REMARKABLE" + the 01–04 numbers, and the `FloatingNav` "DESIGN TRIBE" wordmark. Removed the
"● HUMAN × AI" eyebrow from `AiSection`. (Hero's own `#00a86b` + GrainGradient neons left as-is — they're the locked
hero look, not the cyan.) **State:** `tsc -b` → 0, `npm run build` clean; verified "REMARKABLE" renders `rgb(0,138,101)`.
**Next:** if `#008a65` reads a touch dark for the small numbers on black, nudge brighter (e.g. `#16a07a`).

## 2026-06-16 — Bento images → Unsplash renders; new "AI can do remarkable things" section
**Did:**
- **Bento now uses 8 curated Unsplash 3D renders** (pulled via WebFetch from the `3d-renders` topic, downloaded to `public/assets/gallery/g1–g8.jpg`, ~1.3 MB) — a cohesive dark/monochrome + iridescent set; **centre cell `g3` = the iridescent infinity knot** (the one the zoom fills). Replaced the CodePen placeholders, dropped the lorem `.section`, added a black bg to `.gallery-wrap`.
- **New `AiSection`** (`src/components/AiSection.tsx`) — the user's mockup content ("AI can do remarkable things." + 4 points), redesigned: a Geist-Mono "● HUMAN × AI" eyebrow, an **Anton** caps statement title ("REMARKABLE" in mint), an offset Hanken intro, and the 4 points as **numbered (01–04, mint) cells in a hairline-divided 2×2 grid**, on the dark stage, with a GSAP scroll-reveal (reduced-motion safe). Rendered in `Home` after the bento.
**State:** `tsc -b` → 0, `npm run build` clean. Verified at 1280×800: bento shows the 8 renders + still zooms into the centre (iridescent knot); AI section renders with the title, eyebrow, offset intro, and 4 divided points. *(Unsplash CDN images, downloaded locally; photographer attribution is a nice-to-have, not required by the Unsplash license — could add later.)*
**Next:** Decide if the bento centre should carry text (e.g. "AI + HUMAN") as it fills, or stay purely the image leading into the AI section. Tune the AI section type scale / spacing.

## 2026-06-16 — Hero headline → 2 lines; bento Flip-zoom section (reference working)
**Did:**
- **Hero headline is now two explicit lines** — "DESIGN THAT THINKS." / "WORK THAT ENDURES." — each in its own `overflow-hidden` mask; the intro reveal staggers them (`stagger: 0.09`).
- **New `ServicesBento`** (`src/components/ServicesBento.tsx`) after the showreel: a **bento grid that pins and Flip-zooms** into its centre cell on scroll (GSAP **Flip** `expoScale` + a scrubbed, pinned ScrollTrigger). CSS (`.gallery*`) + the grid `grid-area`s ported verbatim from the user's CodePen into `index.css`.
- **Key fix / lesson:** the Flip zoom was **stuck at its final state** when the Flip + ScrollTrigger were created inside `useGSAP` (the ScrollTrigger scrubbed — progress was correct — but `useGSAP`'s context management left the Flip tween's playhead pinned at the end). **Running the original vanilla `createTween` (gsap.context + `Flip.to` + `tl.add` + a pinned/scrubbed timeline) in a plain `useEffect` — exactly like the CodePen — fixed it.** Verified scrubbing: centre cell **416 → 523 → 683 → 922 → 1258 px** across the pin.
- Per request, this is currently the **faithful reference** (the CodePen's portrait images + a placeholder lorem `.section`) to prove the mechanic before customising.
**State:** `tsc -b` → 0, `npm run build` clean. Verified at 1280×800: compact bento renders all 8 images; scroll pins + zooms into the centre image; reaches final (~1280). *(Preview screenshots over the video/floating-nav render narrow — headless `backdrop-filter` capture glitch; eval confirms real geometry.)*
**Next (planned, paused for confirmation):** swap the reference images/lorem for **our content** — 7 service cells + the **centre cell = "AI + HUMAN"** (the one that fills on zoom), drop the lorem section, dark/brand styling, add reduced-motion fallback.

## 2026-06-16 — Floating bottom-centre nav in the showreel (awwwards menu-float style)
**Did:**
- **New `FloatingNav`** (`src/components/FloatingNav.tsx`) — a dark rounded pill (bg `rgba(20,20,22,0.72)`, radius 14px, `backdrop-blur`, 6px padding, hairline border) fixed **bottom-centre**, styled after the awwwards `menu-float` reference: **logo + "DESIGN TRIBE" wordmark · Work / Services / About (Geist Mono) · "Get in touch" CTA**. Nav links hidden < md.
- **Shows once you enter the showreel:** `Home` tracks `inReel` (scrollY > 0.8 × viewport) on scroll and **swaps the hero's top nav for the floating nav** — Hero got a `hideNav` prop (fades `[data-hero-nav]` out + `pointer-events:none`); `FloatingNav visible={inReel}` slides/fades up. The hero's fixed top nav otherwise persisted over the reel (it's `position:fixed`), so this is a clean handoff rather than two stacked navs.
**State:** `tsc -b` → 0, `npm run build` clean, dev console clean. Verified at 1280×800: at the top → hero nav shown, floating hidden (`pointer-events:none`); in the reel → hero nav `opacity:0`, floating pill centred (26px bottom gap), "DESIGN TRIBE · Work · Services · About · Get in touch", no horizontal overflow. *(Preview screenshots of the nav over the video render narrow — a headless-Chrome `backdrop-filter` capture glitch, not a layout bug; the end-frame render and eval confirm full-bleed + centred.)*
**Next:** Decide whether the floating nav should also carry the theme toggle (left in the hero nav for now). Wire the anchors (`#work`/`#services`/`#about`) when those sections exist.

## 2026-06-16 — Fonts → Anton/Hanken/Geist; showreel moved below hero (no fade); headline caps; bigger logos
**Did:** (latest direction; revises the font + structure choices below)
- **Fonts swapped again — now `Anton` (display) / `Hanken Grotesk` (body) / `Geist Mono` (mono).** One Google Fonts `@import` (all three load incl. **Geist Mono**, which *is* on Google Fonts) + body default → Hanken; Tailwind `display`/`sans`/`mono` remapped (dropped the `bungee`/`grotesk`/`redditmono` aliases). Components were already on `font-display`/`-sans`/`-mono`, so the swap is purely the import + Tailwind. ⚠️ **Tailwind config changes need a dev-server restart** to regenerate (HMR didn't pick it up).
- **Showreel is now its own section *below* the hero — no reveal/dissolve/fade.** `Hero` is **standalone again** (opaque, its own intro) in `Home`; `ReelStage` no longer renders the hero, and the black-cover reveal + shader-suspend + `transparentBg`/`onReady` wiring are gone.
- **`ReelStage` = hold → filmstrip:** the autoplaying reel holds full-bleed (`p<0.18`), then the rail slides left (reel exits, headline scatters in), resting with **"business" at the left margin** + logos beneath. Headline is now **caps** (`uppercase`, suits Anton's condensed display) — "DESIGN THAT MOVES PEOPLE. AND BUSINESS", "MOVES PEOPLE" mint.
- **Bigger partner logos** (`LogoCycler`): slots `h clamp(34→72px) × w clamp(120→240px)` (was ~36×122).
**State:** `tsc -b` → 0, `npm run build` clean, dev console clean. Verified at 1280×800: Anton hero + Geist-Mono nav/badge render; showreel **autoplays full-bleed below the hero** (no fade); rail slides so **"business" settles at the left margin (64px)** with 5 bigger wordmark logos beneath; mid-transition shows Anton caps scattering in (mint "MOVES"). *(railX reads lag `scrub:0.4` — settles correctly after ~0.5s.)*
**Next:** Tune Anton hero size + the synthesized italic on "ENDURES." (Anton has no true italic), hold/scrub feel, logo set. iOS pass. Then continue the remaining sections (reel is the end of built content for now).

## 2026-06-16 — Reel reworked: autoplay 3D reel → filmstrip headline + partner logos; brand fonts restored
**Did:** *(superseded above: fonts are now Anton/Hanken/Geist, the reel sits below a standalone hero with no fade reveal, headline is caps.)* Original entry:
- **Global fonts back to the brand system:** display **Bungee → Cardo**, labels/nav/brand/button **Reddit Mono → Space Mono**, body stays **Schibsted Grotesk**. Hero headline is now Cardo serif (bumped to `clamp(30px,5.2vw,76px)`, "ENDURES." italic); nav/brand/badge/button are Space Mono. (`font-bungee`/`font-redditmono` now unused but still defined in Tailwind.)
- **New reel video** (`0_3d_Ads`, a colourful 3D agency showreel) re-encoded for **autoplay** (normal GOP + faststart, no audio): `reel-1080.mp4` 6.3 MB · `reel-720.mp4` 3.0 MB · `reel-poster.jpg`. **Not scrubbed** — it just loops.
- **`ReelStage` rebuilt as one filmstrip rail:** reveal (hero dissolves → reel uncovered) then the rail slides left so the **video exits stage-left while the oversized Cardo headline** "Design that moves people. And business" **scrolls in from the right**, each char tumbling in (manual per-char scatter computed from viewport position + `back.out` ease — no SplitText `containerAnimation`). It comes to rest with **"business" exactly at the left margin** (rail travel measured = `business.left − 5vw`), with the **auto-cycling partner logos** parked just beneath it.
- **`LogoCycler`** (new): 5 slots crossfading random logos from a pool of real client wordmarks (figma-home named + `logos/trusted/*`), forced uniform white (`brightness(0) invert(1)`) on the dark stage. Reduced motion → static.
- **Reveal = a black cover that fades off** the always-playing reel (not a video-opacity fade) — keeps the intro's black backdrop AND lets the video autoplay reliably. **Autoplay fix:** set `video.muted` via a **callback ref** (React's `muted` prop doesn't set the property → browser was blocking autoplay); play/pause via an IntersectionObserver on the video element (pauses once it slides off-stage). Folded the old `HorizontalText` into `ReelStage` and deleted it.
- "Guided by humans · Powered by AI" stays **hero-only** (reel label removed).
**State:** `tsc -b` → 0, `npm run build` clean (658 KB / 238 KB gzip). Verified at 1280×800: Cardo hero + Space Mono chrome render; reel **autoplays** (user-confirmed); rail slides left and **"business" lands at the left margin (64px = 5vw)** with 5 wordmark logos cycling directly beneath (left 64, just below). Closing frame matches the reference image. *(railX/scrub reads need a settle delay — `scrub:0.5` smoothing; not a bug.)*
**Next:** Tune to taste — Cardo hero size/spacing, reveal timings, rail scrub feel (`TRACK_VH`/`scrub`), logo pool + sizing, the `+=` headline length. Real-device iOS pass on autoplay + the reveal. Then continue the remaining sections (the reel is the end of built content for now).

## 2026-06-16 — Reel reveal behind the hero + horizontal kinetic headline
**Did:** *(superseded in part by the entry above — reel is now autoplay not scrubbed, fonts are Cardo/Space Mono, headline ends at the left margin with partner logos.)*
- **New `ReelStage`** (`src/components/ReelStage.tsx`) — wraps the hero in a **300vh sticky scroll track**. As you scroll, the hero **dissolves in order** (centred mark + headline/badge, then nav, then the GrainGradient shaders) to uncover a **studio reel** sitting underneath, which fades in from black. Reveal opacities are driven by one scrubbed `ScrollTrigger` (`gsap.set` on the hero's `data-*` layers).
- **Reel = scrubbed video, not a frame folder.** Re-encoded the supplied clip to an **all‑keyframe (every frame an IDR) MP4** so `currentTime` seeks instantly in both directions — gives Apple-style frame-scrub at ~1/3 the asset weight of a JPEG sequence and a fraction of the memory. Trimmed to a **dense ~3s window (src 4.5–7.5s)** per request; loops. Assets in `public/assets/reel/` (`reel-1080.mp4` 2.4 MB · `reel-720.mp4` 1.3 MB via `<source media>` · `reel-poster.jpg`).
- **Velocity-integrator playback** (rAF, drives `currentTime`): a base **forward drift** so the reel keeps moving even when idle; scroll velocity (`ScrollTrigger.getVelocity`) adds/subtracts; **scroll-up reverses cleanly** because the drift is *suppressed whenever the rate goes negative* (no friction). Loops via modulo. Primes the decoder with a muted play→pause (iOS), pauses the rAF offscreen (IntersectionObserver), and **suspends the WebGL shaders once revealed** to free the GPU.
- **New `HorizontalText`** (`src/components/HorizontalText.tsx`) — the beat after the reel. Pinned section; an oversized **Bungee** headline *"Design that moves people. And business"* travels right→left (`xPercent:-100`, `+=5000`), each char tumbling in from a random offset via **SplitText + `containerAnimation`**. "moves people" tinted **mint `#90ffe1`**. Stays on the black stage so it flows out of the reel.
- **Hero hooks added** (minimal): `transparentBg` (float over the reel), `suspendShaders`, `onReady`; tagged `data-hero-mark` / `data-hero-fx`. **Fixed the intro↔scroll conflict**: the 4.6s settle failsafe now only restores the resting state when still at the top, and the **first scroll finalizes+kills the intro** so it can't fight the reveal.
- **`html { scroll-behavior }` → `auto`** (was `smooth`) — CSS smooth-scroll fights ScrollTrigger pin/scrub. Only affected scripted/anchor scrolls.
**State:** `tsc -b` → 0, `npm run build` clean (657 KB / 238 KB gzip; pre-existing >500 KB chunk warning). Verified in-browser at 1280×800: hero resting state correct; reveal ordering correct (logo+text→shaders→video, opacities match the mapping); reel **idle forward drift measured 0.345 vid-s/s**; scroll-up reverses; horizontal section pins, headline translates (`translateX` confirmed), all 33 chars scatter, mint accent confirmed `rgb(144,255,225)`. No new console errors/warnings. *(Reverse was hard to measure via scripted scroll because `scroll-behavior:smooth` was injecting velocity — fixed to `auto`; real wheel-scroll is unaffected. Reduced-motion → hero static + static reel poster + static centred headline.)*
**Next:** Tune to taste — reel 3s window / drift rate / `SCROLL_GAIN`, reveal segment timings, the `+=5000` horizontal length, and the reel label copy ("Studio reel · The work in motion" is a placeholder). Real-device iOS pass on the `currentTime` scrub. Swap in the real showreel when ready. Then continue the remaining sections.

## 2026-06-15 — Hero rebuilt from the `hero-living-mark` prototype (Paper shaders)
**Did:**
- Restarted the hero from the user's prototype (`../Website/hero-living-mark.html`), duplicating its layout + animations and swapping in two Paper shaders:
  - **Background → `GrainGradient`** (exact brief recipe: neon greens on black, `shape="corners"`, speed 1.36), tamed with a moody dark scrim (center pool + top/bottom fades) so copy + mark stay legible.
  - **Centered mark → `LiquidMetal`** rendering the uploaded Design Tribe icon (white silhouette, transparent `colorBack`, white tint) — a chrome "living mark".
- Ported the rest: top nav (brand + links + theme toggle + "Get in touch"), bottom-left **Bungee** headline "DESIGN THAT THINKS. WORK THAT *ENDURES.*" + Reddit-Mono badge, drifting particle field, cursor glow, entrance (nav → mark settle → headline rise → badge).
- Wired the prototype's fonts (**Bungee** / **Familjen Grotesk** / **Reddit Mono**) alongside the existing families; copied the icon into `public/assets/` (green + white-fill versions).
- Robustness: content visible by default + a `gsap.set` **failsafe** forcing the resting state (so the entrance can't trap copy hidden if the rAF ticker stalls under the heavy dual-WebGL load). Reduced-motion → shaders static + static mark + no entrance. Moved the theme toggle into the nav; `Home` defaults to dark.
- **Intro sequence (per request):** on a black stage the mark now **draws itself in** (stroke → fill via GSAP) at large scale, shrinks into place, then the GrainGradient + scrim fade in and the drawn mark **crossfades into the LiquidMetal** as the nav / headline / badge pop. Also **enlarged the static mark** (`clamp(240px, 26vw, 400px)`). The failsafe + reduced-motion paths cover the intro too.
**State:** Verified at 1280px + mobile (390px) — `tsc -b` → 0, `npm run build` clean, dev console clean. Two shader canvases (GrainGradient + LiquidMetal). *(Preview tool freezes rAF after in-tab reload / under heavy WebGL — a tooling quirk; the failsafe + a fresh load both show the resting state.)*
**Next:** Tune LiquidMetal contrast / GrainGradient intensity to taste; port the prototype's remaining sections (marquee, services, process, work, CTA) into `Home.tsx`.

## 2026-06-15 — Hero redesigned → editorial / cinematic (per reference)
**Did:**
- Reworked the hero after feedback that the centered, scrim-heavy version looked wrong. New direction from the user's reference (**eaglesnest.sergesyutkin.com**): **editorial + cinematic** — a full-bleed reel that breathes, an **oversized Cardo headline anchored bottom-left** ("Design that thinks. / Work that endures."), small stacked Space-Mono meta-labels ("Guided by humans. / Powered by AI."), an offset right-aligned body column, and a small **top-left** logo mark (GemSmoke retained, subtle). Cream text over a fixed-dark stone-900 grade → reads in either page theme.
- Restyled the `Home` theme toggle to a light/glassy top-right control (it now sits over the media).
- **Hardened the entrance:** dropped SplitText + the `ready`/rAF state-gating that could trap the copy hidden. Now content is **visible by default** and one on-mount GSAP `.from` timeline (logo → labels+body → headline lines rising out of a CSS `overflow-hidden` mask) animates hidden→visible, so the copy is never stuck if the timeline can't run. GemSmoke mounts via a plain effect (no rAF dependency).
- Saved the approved art direction to memory.
**State:** Verified at 1280px, mobile (390px) and both toggle states — `tsc -b` → 0, `npm run build` clean, dev console clean. Entrance plays on a fresh load (opacity 0→1 + headline rise confirmed); one GemSmoke canvas. *(Note: the Preview tool freezes rAF after an in-tab reload — a tooling quirk, not a site bug; a fresh load animates fine.)*
**Next:** Swap the placeholder reel + poster for the real showreel (the framing now leans on the footage). Optionally bleed the headline to the very edge for more drama. Build the next sections into `Home.tsx`.

## 2026-06-15 — New home hero (from scratch) + fonts wired
**Did:**
- **Wired the three brand fonts** (replaced Inter): `Cardo` (display) / `Schibsted Grotesk` (body + global `body` default) / `Space Mono` (mono) via one Google Fonts `@import` in `src/index.css` (+ `preconnect` in `index.html`); added `font-display` / `font-sans` / `font-mono` in `tailwind.config.ts`.
- **Added dependency** `@paper-design/shaders-react` **0.0.76** (Warp + GemSmoke) → logged in `DECISIONS.md`.
- **Built `src/components/Hero.tsx`** from scratch — full-viewport cinematic stage: L0 showreel `<video>` (autoplay/muted/loop + poster) shown **clean**, L1 a smooth full-bleed gradient grade toward the `bg` token for legibility (no panel/box), L2 logo mark top-centre with **GemSmoke** (`shape="diamond"`) CSS-masked to the logo silhouette and `mix-blend: screen` over a crisp `var(--color-primary)` mark, L3 the verbatim §1 hero copy in the brand fonts with a theme-aware text halo. GSAP entrance: logo → eyebrow → SplitText headline → body (`power4.out`). *(A Warp shimmer over the reel + a soft backdrop behind the copy were trialled, then removed per direction — the reel reads cleaner unobstructed.)*
- **Added `src/components/Home.tsx`** (new from-scratch homepage shell: owns persisted theme + a floating light/dark toggle) and pointed `App` `/` at it. Old `HomePage` stays only as ServicePage's shared-chrome source.
- Generated `public/assets/figma-home/hero-video-poster.jpg` (LCP + reduced-motion still) from the placeholder reel.
- **Perf/a11y:** the GemSmoke shader lazy-mounts after first paint; pauses offscreen (IntersectionObserver → `speed=0`) and on tab-hidden (handled by the lib); DPR capped via `maxPixelCount`/`minPixelRatio`; single instance, stable props. Video/canvas `aria-hidden` + `pointer-events: none`; logo has accessible name "Design Tribe". **prefers-reduced-motion** → no shader/entrance (poster still + static copy).
**State:** Verified — `tsc -b` → 0, `npm run build` clean, dev (:5173) console clean (no errors/warns). Renders + legible in **light and dark** and at mobile (375px: logo ~88px, headline at the clamp floor). Reel shows clean — one GemSmoke canvas, no overlay. `DESIGN-SYSTEM.md` (fonts/type/motion) + `DECISIONS.md` updated.
**Next:** Swap the placeholder reel + poster for the real showreel. Build the remaining homepage sections into `Home.tsx`. Trim GSAP dev plugins / code-split (bundle ~630 KB / 229 KB gzip).

## 2026-06-15 — Palette implemented (light + dark)
**Did:**
- Locked the approved v1 palette and implemented it as CSS variables in `src/index.css` — full token system (emerald / stone / clay ramps + semantic light & dark) on `:root` and `[data-theme="dark"]`.
- Re-pointed the legacy `.homepage` theme vars at the new tokens so the current app renders in the new palette (validation only — old layout still slated for replacement).
- Exposed tokens + ramps in `tailwind.config.ts` (`bg`, `surface`, `ink`, `primary`, `accent`, `panel`, states, + `emerald` / `stone` / `clay` ramps).
- Updated `DESIGN-SYSTEM.md` with the implemented palette; logged the decision.
**State:** Palette done for both modes. Verified: `tsc -b` → 0, Vite HMR clean, tokens present in served CSS, page 200. Type scale + fonts still pending.
**Next:** Type scale; then wire the three fonts; decide Vite vs Next.

## 2026-06-15 — GSAP installed + registered
**Did:**
- Installed **gsap 3.15.0** + **@gsap/react 2.1.2** (peer `react >=17` → clean on React 19). Verified all 23 requested plugin imports resolve.
- Added central registration module `src/lib/gsap.ts` — registers the full plugin set once and re-exports `gsap`, `useGSAP`, and every plugin. Typecheck passes (`tsc -b` → 0).
**State:** Motion engine = GSAP (logged in `DECISIONS.md`). Confirms a **React-based** rebuild; Vite vs Next still open. `npm audit` still shows 3 pre-existing transitive highs (unrelated to GSAP).
**Next:** Import animation tools from `src/lib/gsap.ts`; decide Vite vs Next; continue palette / type scale.

## 2026-06-15 — Vision & art direction captured
**Did:**
- Positioning: **strategist** — AI speed + human precision & strategic empathy. → `PROJECT.md`, `DECISIONS.md`.
- Audience: corporate today, **shifting toward the younger generation coming into power**; design for where it's heading without alienating current corporate clients. → `PROJECT.md`.
- Art direction: **animation-driven, maximalist, creative** (keep it performant + reduced-motion safe). → `DESIGN-SYSTEM.md`.

**State:** Vision, audience, and art direction documented. Still open: degree of maximalism, motion stack, full palette/type scale, rebuild stack, explicit goals/metrics.

**Next:** Calibrate "how maximalist" via refs/moodboard; pick a motion approach; complete the token set; decide the stack.

## 2026-06-15 — Design language captured
**Did:**
- Clarified scope: the old repo design is **discarded** — only its copy was salvaged (`CONTENT.md`). The old code is **not** a design reference.
- Recorded the new design language in `DESIGN-SYSTEM.md`: **Cardo** (display) / **Schibsted Grotesk** (body) / **Space Mono** (mono); primary **`#008A65`**. Demoted the old tokens to a clearly-marked "Legacy / reference-only" section.
- Propagated the correction across `PROJECT.md`, `DECISIONS.md`, `CLAUDE.md`, `BACKLOG.md`, `CONTENT.md`, and the memory pointer.

**State:** New design language is the source of truth. Full palette, type scale, motion, and dark-mode decision still 🔲. Stack still undecided. No code changed yet.

**Next:**
- Define the rest of the palette (neutrals, secondary, states) + type scale → `DESIGN-SYSTEM.md`.
- Decide the rebuild stack, then wire up the three fonts + primary color.

## 2026-06-15 — Setup & onboarding
**Did:**
- Cloned `designtribe-website-v2`; checked out `codex/designtribe-static-home` (the real site; `main` is an empty README).
- `npm install` (134 pkgs; 3 transitive highs) and ran the dev server → http://localhost:5173 (200 OK).
- Scanned the whole site and wrote the full section + copy inventory → `docs/CONTENT.md`.
- Stood up this cross-session docs system: `CLAUDE.md` hub + `docs/` (PROJECT, ARCHITECTURE, DESIGN-SYSTEM, CONTENT, DECISIONS, WORKLOG, BACKLOG) + parent pointer `CLAUDE.md`.

**State:** Site runs locally. Docs scaffolding in place. `PROJECT.md` vision fields still 🔲 (need your input).

**Next:**
- Fill `PROJECT.md` — vision, goals, audience, scope.
- Decide: keep React/Vite/Tailwind or switch for the rebuild (log in `DECISIONS.md`).
- Gather redesign direction (references / moodboard / brand assets) before changing code.
- Work through content + code fixes in `BACKLOG.md`.

---

## (template — copy above the line)
## YYYY-MM-DD — <title>
**Did:** …
**State:** …
**Next:** …
