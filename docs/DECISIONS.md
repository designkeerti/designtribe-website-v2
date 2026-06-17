# Decision log

Append-only, newest at top. One entry per notable choice (what + why + alternatives), so the
reasoning survives between chats. Template at the bottom.

## 2026-06-16 — Process = pinned scroll-driven stepper (rebuilt fresh, not the legacy sticky version)
**Decision:** Build the Process section (`ProcessSection`) as a **GSAP-pinned, scrubbed stepper** rather than porting the
legacy `ServiceProcess` (a CSS-sticky stage + scroll-listener that derived the active step from `getBoundingClientRect`).
Pin the section, scrub a `{p:0→1}` proxy, drive a smooth vertical rail (fill + glowing head) from the **tween's
`onUpdate`**, and flip the **discrete active step** (`floor(p*4)`) as equality-guarded React state. Forced-dark `#07080b`;
Anton / Hanken / Geist Mono; forest-green `#008a65` rail + `#16a07a` active number, others dim to **opacity 0.26** (numbers
`#454b46`). Reduced motion **or < lg (1024px)** → a static, fully-visible list of all 4 steps (no pin), reusing the legacy
desktop-only gate.
**Why:** Matches the site idiom (every other scroll section is ScrollTrigger-driven) and the brief ("scroll-driven stepper
… the active step advances, others dim, a progress rail fills"). The tween-`onUpdate` rule keeps the rail frame-accurate
under `scrub:1`; the desktop-only gate avoids cramming a 4-step pinned stage into a phone viewport and sidesteps mobile pin
fragility.
**Key implementation notes:**
- **`refreshPriority:-2` (CRITICAL).** This is the lowest pin on the page (below `ServicesScroll` `-1`, bento plain-effect
  `0`). ScrollTrigger refreshes high→low priority; at `-2` it refreshes LAST, after the pin-spacers above it are laid out,
  so its `start` is computed correctly. Without it, it computes `start` before ServicesScroll's spacer expands → pins ~1
  viewport early → jumps on entry (the same bug class `ServicesScroll`'s `-1` fixed). **The rule: assign `refreshPriority`
  in descending page order — the next pin added below this one needs `-3`.**
- **Smooth rail from the tween `onUpdate`, discrete step in React.** `gsap.set(fill,{scaleY:p})` +
  `gsap.set(head,{top:p*100+'%'})` every catch-up frame (no React churn); `setActive(floor(p*4))` only when the index
  changes (4×). 60fps rail + clean CSS-transitioned active styling.
**Alternatives:** the legacy CSS-sticky + scroll-listener stepper (works, no pin-ordering concern, but off-idiom and less
smooth than a scrubbed pin); a non-pinned reveal list (rejected — weaker on the maximalist brief).
**Status:** Active. Live scroll motion not yet exercised (the preview tab was backgrounded → `visibilityState:hidden` → rAF
throttled → ticker idle); built on `ServicesScroll`'s proven pin+scrub+`onUpdate` pattern and verified piece-by-piece via
eval geometry (pin-spacer offset/height, at-rest styling, simulated `onUpdate` rail writes, static path).
**Update (same day, per user review):** removed the `STEP 0N / 04` counter (logged a firm **no-eyebrows rule** in
`DESIGN-SYSTEM.md`), fixed the container margins to match `AiSection` (padding was nested inside `max-w` → double-inset on
wide screens), and **restructured the layout** for the upcoming **per-step animated block**: title + body became a
**section-header band** (the `AiSection` pattern); the pin moved from the section to an inner **stage** element (still
`refreshPriority:-2`); the stage now shows the **active step one at a time** (left, beside the rail) + the **animated block**
(right — a placeholder of 4 abstract `dt-proc-*` motifs until the real per-step animations are designed). Layout picks were
the user's (header band over a persistent title; one changing step over a 4-item dimming list).
**Update 2 (same day — user rejected that build; "re think" + flagged a spacing gap):** the gap was structural — the title
band sat outside a *separately* pinned stage that centred its content in a full viewport, leaving ~half a screen of dead
space. Showed the user two fresh directions (mockups); they chose **Direction A "sticky canvas"**, now the active design:
- **Pin via CSS `position:sticky`, NOT GSAP.** The whole composition (header band + 2-col: rail + compact 4-step list |
  canvas) lives in one `sticky top:0` stage inside a `min-height:(1+4·0.62)·100vh` section; a plain passive scroll listener
  maps scroll progress → continuous rail fill (set on a ref) + active index (`floor(p·4)`, state). Dropped GSAP/ScrollTrigger
  for this section entirely → **no pin-spacer, no refreshPriority, no entry-jump**, and the natural single-viewport layout
  has **no dead space**. The placeholder motifs were replaced with restrained **line-art SVGs** (per step, crossfade via
  `.dt-canvas-enter`).
- **Why sticky + a compact (all-visible) list, not single-step-scrolls-past:** with a sticky canvas + steps that scroll
  past, the **last step can't dwell** — its content only reaches centre as the page bottoms out (~17px vs ~370px for the
  others; trailing padding at the page bottom isn't scrollable into view). Pinning the list and *scrubbing the active index*
  over the section's scroll gives every step — including the last — an equal quarter of dwell. (Verified live: active hits
  step 4 at 95% progress, rail at ~95%, canvas redrawn to the "improve" art.)
**Why no GSAP here at all:** this section needs neither a pin (sticky suffices) nor a scrubbed tween (active is a 4-state
index, rail is a one-line ref write), so plain CSS + a scroll listener is simpler, has zero interaction with the pins above
(bento/ServicesScroll), and is verifiable without the GSAP ticker.
**Status:** Active (Direction A). The legacy `ServiceProcess` remains behaviour-reference only. Real per-step canvas visuals
still TBD. Supersedes the GSAP-pinned attempts above.

## 2026-06-16 — Services = horizontal-scroll gallery WITHOUT ScrollSmoother
**Decision:** Build the services section (`ServicesScroll`) as a pinned horizontal-scroll strip using the user's CodePen
gallery mechanic, but **without `ScrollSmoother`**. The supplied snippet wrapped the whole page in
`ScrollSmoother`/`#smooth-wrapper`; we kept the site on native scroll + ScrollTrigger and ported only the
`horizontalSections.forEach` part — a **pin + one scrubbed `x` tween** (`x: () => -(scrollWidth-innerWidth)`,
`end: () => "+="+amount`, `pin`, `scrub:1`, `invalidateOnRefresh`). Set `ScrollTrigger.config({ ignoreMobileResize:true })`
once in `src/lib/gsap.ts`.
**Why:** ScrollSmoother is a **global** wrapper — adopting it would re-route every existing pin (Hero/ReelStage/Bento-Flip)
through its smoothed scroller and fight `scroll-behavior:auto`, which we set precisely because smooth-scroll breaks
ScrollTrigger pin/scrub (see the reel decisions; ScrollSmoother was already considered and rejected). The horizontal
mechanic doesn't need it — the pin + x-tween is self-contained, so this stays consistent and risk-free.
**Key implementation notes:**
- **`refreshPriority: -1` on the services pin (CRITICAL).** This pin sits below the **bento** pin, but `ServicesBento`'s
  Flip runs in a **plain `useEffect`** (intentional — see the Flip decision) so it is created *after* this component's
  `useGSAP` (`useLayoutEffect`). On refresh, ScrollTrigger processed services *before* the bento and computed its `start`
  without the bento's pin-spacer (801px = 1 viewport) above it → it pinned one viewport too early and **jumped** as you
  scrolled in from the AI section. A lower `refreshPriority` forces services to refresh after the bento. (Verified: it
  corrected `start` 6119 → 6920 to match the spacer.) Don't "fix" this by moving the bento to `useGSAP` — that reintroduces
  the Flip bug. Any future pinned section added *below* services will need an even lower priority.
- **Drive chrome (counter + progress bar) from the TWEEN's `onUpdate`, not the ScrollTrigger's.** With `scrub:1` the
  ScrollTrigger's `onUpdate` fires on raw scroll *before* the strip catches up, so DOM reads (`getBoundingClientRect`) lag
  the strip by ~2 cards. The tween's `onUpdate` fires every catch-up frame → frame-accurate. Base the bar on the strip's
  actual `x` (`-x/amount`) so bar + strip + counter move as one.
- **Lift bottom-anchored content above the `FloatingNav`** (`pb-[clamp(72px,12vh,116px)]`) in the **pinned variant only**;
  the reduced-motion stacked grid keeps tight padding. Padding is per-variant (kept off the base class to avoid Tailwind
  `p-` vs `pb-` override ambiguity).
- **Reduced motion** → a static, fully-visible 2-col grid (intro header + 8 cards + CTA), no pin/scrub.
- Anton loads async and sets the strip width → `document.fonts.ready.then(ScrollTrigger.refresh)`.
**Alternatives:** adopt ScrollSmoother globally (rejected — re-routes all pins, fights our scroll model); CSS scroll-snap
horizontal (rejected — no pin/scrub feel, weaker on the maximalist brief).
**Status:** Active. Placement (after `AiSection`) and type-only cards (vs real imagery) are open — see WORKLOG "Next".

## 2026-06-16 — GSAP Flip scroll-zoom: run it in a plain effect, NOT useGSAP
**Decision:** For the bento Flip-zoom (`ServicesBento`), run the vanilla pattern (`gsap.context` + `Flip.to` +
`tl.add(flip)` on a pinned, scrubbed timeline) inside a plain `useEffect` with its own resize handler — do **not**
wrap it in `useGSAP`.
**Why:** Wrapping the Flip + ScrollTrigger in `useGSAP` left the Flip tween **stuck at its final state**: the
ScrollTrigger scrubbed correctly (progress tracked scroll), but `useGSAP`'s context management detached/aborted the
Flip tween's playhead so it never scrubbed back to the start. A plain effect mirrors the CodePen exactly and works.
Verified the centre cell scrubs 416→1258px across the pin. (Also: build the Flip on settled, vw/vh-based grid
geometry; the grid sizes are font-independent so a single build at mount is fine. Other ScrollTrigger-only work
(Hero reveal, ReelStage, horizontal headline) is fine inside `useGSAP` — this gotcha is specific to **Flip**.)
**Status:** Active. Reference (CodePen images) is in place to prove the mechanic; our content (services + centre
"AI + HUMAN") to be layered on next.

## 2026-06-16 — Fonts → Anton/Hanken/Geist Mono; showreel below the hero (no fade)
**Decision:** (latest user direction)
- **Type system is now Anton (display) / Hanken Grotesk (body) / Geist Mono (mono)** — bold condensed caps display +
  clean grotesk body + mono labels. Replaces Cardo/Schibsted/Space Mono. Geist Mono is on Google Fonts.
- **The showreel is a standalone section *below* the hero — the dissolve/black-cover reveal is removed.** Hero is a
  normal section again; `ReelStage` just holds the autoplaying reel full-bleed, then runs the filmstrip (video slides
  left → headline scatters in → "business" at the left margin + logos). Headline is **uppercase** (suits Anton).
**Why:** user preference — simpler, the reel reads as its own "showreel" beat rather than a hero reveal; Anton caps
give a bolder, more graphic statement than the serif. **Note:** Tailwind `fontFamily` edits need a **dev-server
restart** to regenerate; Anton has no true italic (the hero's "ENDURES." italic is synthesised — revisit if unwanted).
**Status:** Active. Supersedes the fonts + reveal-choreography of the entries below (the filmstrip + logos + autoplay +
"business at margin" mechanics carry over unchanged).

## 2026-06-16 — Reel rework: autoplay 3D reel + filmstrip headline + partner logos; brand fonts restored
**Decision:** Per new user direction, the section behind the hero is reworked:
- **Brand fonts restored globally:** **Cardo** (display — incl. the hero headline), **Schibsted Grotesk** (body), **Space Mono** (nav / brand mark / badge / button). Supersedes the prototype's Bungee / Reddit Mono. The hero is now editorial-serif + mono-label rather than chunky Bungee.
- **Reel is autoplay, not scroll-scrubbed.** New clip (`0_3d_Ads`) re-encoded normally (no all-intra needed). It loops on its own; scroll no longer drives `currentTime`. The velocity integrator is gone.
- **One filmstrip rail:** after the hero dissolves to uncover the reel, the rail slides left — video exits stage-left as the oversized headline scrolls in from the right (per-char tumble), resting with **"business" at the left margin** and **auto-cycling partner logos beneath it** (the user wants the logos as part of that closing frame).
**Why / key choices:**
- **Reveal via a black cover that fades off the always-playing reel** (not a video-opacity fade). The video must stay `opacity:1` so the browser actually autoplays it; a fading cover both preserves the intro's black backdrop and reveals the running reel. **Autoplay only worked once `video.muted` was set via a callback ref** — React's `muted` JSX prop sets the attribute unreliably and leaves the `muted` *property* false, so the browser was blocking autoplay. Play/pause is an IntersectionObserver on the video element (pauses when it's slid off-stage).
- **Per-char scatter is computed manually** (each char's viewport x → entrance progress → `back.out`-eased offset) instead of GSAP `containerAnimation`, because the rail also runs a reveal phase + isn't a single linear tween. Simpler and avoids the pin/containerAnimation constraints.
- **Logos** are real client wordmarks (figma-home named + `logos/trusted/*`), forced uniform white via `filter: brightness(0) invert(1)`; the numbered `client-0X` set is avoided (solid plates → white blocks under the filter).
**Alternatives:** scroll-scrubbed all-keyframe video (the prior approach — dropped, user wants autoplay); SplitText `containerAnimation` for the scatter (dropped — doesn't compose with the reveal phase); fading video opacity for the reveal (dropped — breaks autoplay).
**Status:** Active. Supersedes the scrub/Bungee specifics of the entry below.

## 2026-06-16 — Reel reveal behind the hero + horizontal kinetic headline
**Decision:** *(Superseded by the entry above for the reel playback model + fonts; the dissolve-reveal choreography and the sticky-track approach still hold.)* The section behind the hero is a **pinned (sticky) scroll stage** (`ReelStage`) where the hero
**dissolves in order** (centred mark + headline/badge → nav → GrainGradient shaders) to reveal a **studio reel**
underneath, which then scrubs on scroll. After it, a **pinned horizontal headline** (`HorizontalText`) — "Design
that moves people. And business" — travels right→left with a per-character scatter. Both stay on the black stage.
**Why / key choices:**
- **Scrubbed `<video>` (all‑keyframe), NOT a frame/JPEG sequence.** The brief said "broken into frames", but a
  literal 24fps×Ns image sequence is ~20–30 MB of assets **and** ~1 GB of decoded bitmaps in memory (on top of the
  two WebGL shaders) — a perf non-starter. Instead re-encoded the clip to **all-intra H.264** (`-g 1 -keyint_min 1
  -x264-params scenecut=0`): every frame is a keyframe, so `video.currentTime = t` seeks instantly **both
  directions** → identical Apple-style frame-scrub feel at ~1/3 the bytes and browser-managed memory. (ScrollyVideo
  uses the same trick.) All-intra was even **smaller** than the source here (clip compresses well).
- **Trimmed to a dense ~3s window** (src 4.5–7.5s) per user request; loops. The clip is a monochrome UI/dashboard
  reel on **pure black** — dissolves seamlessly out of the hero's black stage; crisp white-on-black reads as premium
  "work". A faint emerald inset-glow + a mint label tie it to the brand.
- **Velocity integrator, not scroll-position lock.** The user wanted the reel to **keep drifting forward even when
  idle**, speed up on scroll-down, and **reverse on scroll-up without the drift fighting it**. So playback rate =
  `baseDrift + scrollVelocity`, where the drift is **only added when the rate is ≥ 0** (a scroll-up's negative rate
  is left clean). Scroll impulse decays (inertia); position wraps (endless forward). Decoupling from scroll position
  is why it's a sticky track + rAF, not a position-bound scrub.
- **Horizontal headline** uses the user-supplied GSAP pattern (SplitText `type:"chars,words"`, a `xPercent:-100`
  container tween with `pin + scrub`, and per-char `from` triggers using `containerAnimation`), adapted to our tokens
  (**Bungee**, cream `#f2eee3`, mint `#90ffe1` accent on "moves people").
- **`html { scroll-behavior }` smooth → auto.** CSS smooth-scroll fights ScrollTrigger pin/scrub (GSAP's own advice).
  Only affects scripted/anchor scrolls; wheel scrolling is unchanged. Do smooth anchor-jumps via ScrollToPlugin later.
- **Intro handoff hardened:** the hero's 4.6s settle failsafe now only restores the resting state at the top, and the
  first scroll finalizes+kills the intro timeline, so the load intro and the scroll reveal can't fight.
**Alternatives:** literal frame sequence (rejected — weight/memory); position-locked scrub (rejected — can't drift
when idle); ScrollSmoother for the smooth feel (not needed; the integrator + `scroll-behavior:auto` suffice).
**Status:** Active. Tuning knobs (3s window, drift/gain, segment timings, `+=5000`, label copy) + a real-device iOS
pass on the scrub are tracked in `BACKLOG.md`. Placeholder reel + headline copy pending the real assets.

## 2026-06-15 — Hero direction #3: prototype + Paper shaders (GrainGradient + LiquidMetal)
**Decision:** Rebuilt the hero from the user's `hero-living-mark` prototype — a **dark, electric** stage with an
animated **GrainGradient** neon-green background and a centered **LiquidMetal** chrome mark (the Design Tribe icon),
a chunky **Bungee** headline + badge, and the prototype's particle field / cursor glow / entrance. Added the
prototype's fonts (Bungee / Familjen Grotesk / Reddit Mono). Supersedes the editorial/cinematic hero (direction #2).
**Why:** Direct user direction (third art-direction pivot); they supplied exact shader props + the prototype to duplicate.
**Notes:**
- GrainGradient is very bright → added a **moody dark scrim** (flat darken + center pool + top/bottom fades) for
  legibility without losing the neon. `LiquidMetal` uses a **white silhouette** of the icon + transparent `colorBack`
  so the chrome mark floats over the gradient.
- **Robustness (again):** the heavy dual-WebGL load + the preview's flaky rAF stalled the GSAP entrance mid-way. Kept
  "visible by default" and added a `setTimeout`→`gsap.set` **failsafe** that forces the resting state at 2.8s
  (gsap.set is synchronous, independent of the ticker).
- The hero now uses prototype-specific colours (neon greens / cream / near-black) rather than the muted brand tokens —
  a deliberate consequence of the chosen shader palette. Whether Bungee/etc. become the brand fonts is still open.
- Bundle ~640 KB / 231 KB gzip (GSAP + Paper shaders) → trim/split tracked in `BACKLOG.md`.
**Status:** Active (pending user reaction — the direction has been volatile across 3 iterations).

## 2026-06-15 — Hero direction: editorial / cinematic (supersedes the centered layout)
**Decision:** After the centered, scrim-heavy hero was rejected, adopt the user's reference
**eaglesnest.sergesyutkin.com** as the art direction: a breathing full-bleed reel, an **oversized Cardo display
headline anchored bottom-left**, small stacked Space-Mono labels, an offset body column, a small top-left logo,
and **cream text over a fixed-dark grade** (the hero is a media band, legible in either page theme). GemSmoke is
kept as a subtle living detail in the corner mark; the reel stays clean. Supersedes the *composition* in the entry
below (tokens, fonts, shader and verbatim copy are unchanged).
**Why:** The studio wants premium/editorial restraint, not busy maximalism; an oversized bottom serif + calm
negative space reads confident and high-end, and maps cleanly onto our warm tokens (stone-paper / emerald / clay).
**Lesson (entrance robustness):** the first cut hid the copy behind a `ready`/rAF-gated GSAP timeline; when those
gates didn't fire (throttled/backgrounded tab) the copy stayed invisible. Reworked so **content is visible by
default** and GSAP `.from` only ever animates *from* hidden back to the natural visible state — a timeline that
never runs simply leaves the copy shown. Dropped SplitText (its DOM mutation fought React/StrictMode) for two
explicit lines revealed under a CSS `overflow-hidden` mask.
**Status:** Active.

## 2026-06-15 — Home hero: Paper shaders + brand fonts wired
**Decision:** Added **`@paper-design/shaders-react` 0.0.76** and built the new home hero as a full-viewport
cinematic stage: showreel `<video>` shown **clean** → a smooth full-bleed gradient grade (toward the `bg` token)
for legibility → logo mark with **GemSmoke** (`shape="diamond"`) CSS-**masked to the logo silhouette** and
`mix-blend: screen` over a crisp `var(--color-primary)` mark → verbatim §1 copy in the brand fonts (with a
theme-aware text halo). Also wired the three fonts (**Cardo** / **Schibsted Grotesk** / **Space Mono**) and routed
`/` to a new from-scratch `Home` shell (old `HomePage` kept only as ServicePage's shared-chrome source).
**Why:** The art direction is animation-driven / "considered maximalist" — GemSmoke gives a living, brand-coloured
centrepiece inside the mark. Masking it to the silhouette (instead of uploading the logo as the shader's image) keeps
a crisp, theme-aware, always-present mark and a clean fallback when WebGL / reduced-motion is off. The reel is left
unobstructed so the footage reads clearly.
**Alternatives / notes:**
- **Trialled then removed (per direction):** a **Warp** shimmer overlaid on the reel (hover-intensifying, driven from a
  GSAP proxy → state) and a soft backdrop panel behind the copy. Both were cut — the reel reads cleaner unobstructed, and
  copy legibility is carried by the gradient grade + a glyph-hugging text halo rather than a "box". (Warp still ships in
  the dependency if we want it on a future section.)
- Shader colours must be literals (WebGL can't read CSS vars) → used our **emerald ramp stops** + stone-900, i.e. tokens.
- `mix-blend: screen` puts the smoke *over* the mark (instead of an opaque mark on top that would hide it); the logo
  wrapper is `isolate`d so the blend mixes only with the mark, not the reel.
- Perf: lazy-mount after first paint; pause offscreen via IntersectionObserver (`speed=0` stops the rAF; tab-hidden is
  auto-paused by the lib); DPR capped via `maxPixelCount`/`minPixelRatio`; single GemSmoke instance, stable props.
- Reduced-motion disables the shader + entrance → video poster still + static copy.
- Cost: bundle ~630 KB / 229 KB gzip (GSAP full plugin set + shaders) → trim/split tracked in `BACKLOG.md`.
**Status:** Active.

## 2026-06-15 — Palette locked (light + dark)
**Decision:** Adopted the v1 palette — emerald brand ramp (primary `#008A65`), warm-stone neutrals
(paper `#FAF8F3` / ink `#161310`), clay accent (`#C25A3A`, dark `#D9774E`), + functional states.
Implemented as CSS custom properties in `src/index.css` (`:root` light, `[data-theme="dark"]` dark) and
exposed in `tailwind.config.ts`. Legacy `.homepage` vars now alias the new tokens so the existing app
renders in the new palette.
**Why:** "Considered maximalism" — editorial warmth (corporate-credible) + one confident accent for energy.
**Notes:** White-on-primary ≈ 4.34:1 → solid green for buttons/large text, `primary-ink` for small green text.
**Status:** Active. Type scale still TBD.

## 2026-06-15 — Motion stack: GSAP
**Decision:** Use **GSAP 3.15** + **@gsap/react** (`useGSAP`) as the animation engine, with the full
plugin set registered centrally in `src/lib/gsap.ts` (ScrollTrigger, ScrollSmoother, SplitText, Flip,
DrawSVG, MorphSVG, MotionPath, Observer, Inertia, Physics2D/Props, ScrambleText, Pixi, Easel, Draggable,
Custom Ease/Bounce/Wiggle, EasePack, + GSDevTools/MotionPathHelper for authoring).
**Why:** The art direction is animation-driven / maximalist; GSAP is the most capable and performant
toolkit for choreographed scroll + SVG + physics motion, and since 3.13 every plugin is free.
**Notes:** Implies a **React** stack (Vite or Next both work). GSDevTools + MotionPathHelper are dev
tools — strip from production imports later. Registration is client-side (safe for the current Vite CSR
SPA; guard to the browser if we move to SSR).
**Status:** Active.

## 2026-06-15 — Positioning + art direction
**Decision:** Position the studio as a **strategist** — *"the speed of AI + the precision and strategic
empathy of a human."* Art direction for the rebuild: **animation-driven, maximalist, creative**, aimed
at the **younger generation moving into decision-making power** (the audience is shifting from today's
corporate base toward them).
**Why:** Differentiate from commodity design and raw AI tooling on **strategy + human judgment**, and
get ahead of the generational shift in buyers with a bolder, more memorable experience.
**Tension to manage:** current revenue is corporate — stay credible to them while leaning future.
**Status:** Active. Degree of maximalism, motion stack, and full palette/type scale still TBD.

## 2026-06-15 — Discard the old design; adopt a new design language
**Decision:** The old repo's visual design is **not** a reference — it's discarded. We reused **only
the copy** from it (→ `CONTENT.md`). New design language: **Cardo** (display, serif), **Schibsted
Grotesk** (body), **Space Mono** (mono); **primary `#008A65`**.
**Why:** The existing Figma-exact design isn't the direction; the rebuild is genuinely from scratch.
**Alternatives:** Evolve the old design (rejected — explicitly unwanted).
**Status:** Active. Full palette, type scale, motion, and dark-mode decision still TBD → `DESIGN-SYSTEM.md`.

## 2026-06-15 — Cross-session docs system (`docs/` + `CLAUDE.md` hub)
**Decision:** Persist project context as markdown: a repo-root `CLAUDE.md` hub (auto-loaded) plus
`docs/` (PROJECT, ARCHITECTURE, DESIGN-SYSTEM, CONTENT, DECISIONS, WORKLOG, BACKLOG). A small
pointer `CLAUDE.md` also sits in the parent workspace folder.
**Why:** Work spans many chat sessions and only files persist between them. `CLAUDE.md` is the one
file Claude auto-loads, so it indexes the rest and defines a start/end-of-session protocol.
**Alternatives:** One mega-doc (rejected — bloats the always-loaded context); rely on chat history
(rejected — doesn't carry across sessions).
**Status:** Active.

## 2026-06-15 — Work from the `codex/designtribe-static-home` branch
**Decision:** Use this branch as the working baseline.
**Why:** It holds the actual Figma-derived site; `main` is just an empty README.
**Status:** Active.

---

## (template — copy above the line)
## YYYY-MM-DD — Title
**Decision:** …
**Why:** …
**Alternatives:** …
**Status:** Active / Superseded by …
