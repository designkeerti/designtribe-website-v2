# Backlog

Loose priority order. Tick items and move them to **Done** with a date. Link detail to other docs.

## Now — decide before building
- [ ] Fill `PROJECT.md` vision / goals / audience / scope 🔲
- [ ] Finalize the rebuild stack — **React confirmed** (GSAP installed); decide **Vite vs Next** → log in `DECISIONS.md`
- [ ] Define the full **type scale** (display / body / mono sizes, weights, line-heights) → `DESIGN-SYSTEM.md` *(hero treatments now set; rest TBD)*
- [ ] Source logo files + any remaining brand assets

## Homepage rebuild (from scratch)
- [ ] Hero is now the `hero-living-mark` prototype (GrainGradient bg + LiquidMetal mark) — tune shader intensity / mark contrast to taste; confirm the direction sticks
- [ ] **Reel stage** (done — autoplay reel → filmstrip headline + partner logos) — tune to taste: Cardo hero size/spacing, reveal segment timings, rail scrub feel + track height (`TRACK_VH`/`scrub`), logo pool/sizing, `LogoCycler` interval; swap in the real showreel; **real-device iOS pass** on autoplay + reveal
- [ ] Remove now-unused prototype fonts (`font-bungee` / `font-grotesk` / `font-redditmono`) from Tailwind once confirmed
- [ ] Confirm the partner-logo set (currently figma-home named + `logos/trusted/*`) is the right list
- [ ] Port the prototype's remaining sections into `Home.tsx` (marquee → ~~services~~ ✓ → ~~human+AI~~ ✓ → ~~process~~ ✓ → industries → work → CTA → footer) — **services + AI + process done**; still need **industries / work / standalone CTA / footer**
- [ ] **Services section** follow-ups: confirm placement/order (currently after `AiSection` — could sit before it); make the intro panel narrower on mobile (min 420px > 375px viewport → slightly clipped); **swap the placeholder Unsplash card images (`public/assets/services/s1–s8.jpg`) for real per-service imagery**; iOS pass on the pin
- [ ] **Process section** follow-ups: **design the real per-step canvas visuals** (replace the 4 line-art stand-ins in `StepArt` — open: abstract/generative vs literal/illustrative); tune `STEP_VH` (dwell per step) + canvas size to taste. *(Now "sticky canvas" Direction A — CSS `position:sticky` + a scroll listener; **no GSAP pin**, so the old `refreshPriority` note no longer applies to this section. A pin added below would still need `-3` only if it's a GSAP pin.)*
- [ ] Remove now-unused `public/assets/design-tribe-icon.svg` (both navs switched to `design-tribe-logo.svg`) once confirmed dead; consider a white/mono logo variant for the bright hero if the green reads low-contrast
- [ ] Decide fate of the now-unused hero reel assets (`hero-video-placeholder.mp4` / `hero-video-poster.jpg`) if the reel direction is abandoned
- [ ] Trim GSAP dev-only plugins (GSDevTools / MotionPathHelper) + code-split to cut the bundle (~630 KB / 229 KB gzip)
- [ ] Extract the theme-state hook (now in `Home.tsx`, `HomePage.tsx`, `ServicePage.tsx`)

## Content fixes (from CONTENT.md audit)
- [ ] Client name: **"Integrify"** (logo) vs **"Integritty"** (service projects) — pick one, fix asset + text
- [ ] Rebranding process step 4 duplicates step 3 ("Future-proof positioning")
- [ ] Replace placeholder service section copy (5/8 reuse one generic line; most repeat the hero as the section title)
- [ ] UX hero missing a trailing period
- [ ] Unify "Guided by Humans" copy (em-dash differs between home and service pages)

## Code cleanups (from ARCHITECTURE.md)
- [ ] Single source of truth for industries (`homeData.industries` vs `industrySets` in HomePage.tsx)
- [ ] Extract the shared theme-state hook (duplicated in HomePage & ServicePage)
- [ ] Decide fate of unused assets (`public/assets/logos/trusted/`, unused `figma-home` icons)
- [ ] Address `npm audit` highs when convenient

## Later / ideas
- [ ] Real routing if the site grows (History API / a router)
- [ ] Case-study / work-detail pages, about page, contact form (pending scope)

## Done
- [x] 2026-06-16 — **Process section** (`ProcessSection`): **"sticky canvas" stepper (Direction A)** — title + body header band, then one **`position:sticky` viewport** (no GSAP): LEFT a continuous green **progress rail** + the **4 steps as a compact list** (active bright / others dim); RIGHT a **line-art canvas that redraws per step**. A plain scroll listener maps section progress → rail fill (ref) + active (`floor(p·4)`); every step incl. the last gets equal dwell. Reduced-motion / `< lg` → static full list. (No eyebrow; margins match `AiSection`; canvas visuals are stand-ins, real ones TBD.) *(Superseded two earlier GSAP-pinned attempts — see DECISIONS.)*
- [x] 2026-06-16 — **Services section** (`ServicesScroll`): pinned **horizontal-scroll gallery** (intro → 8 service cards → CTA) using the user's CodePen mechanic **minus ScrollSmoother** (pin + scrubbed x-tween); live counter + progress bar driven from the tween's `onUpdate` (frame-accurate under `scrub:1`); reduced-motion static grid; `ignoreMobileResize` set app-wide.
- [x] 2026-06-16 — **Brand fonts restored globally**: Cardo (display, incl. hero) / Schibsted (body) / Space Mono (nav/labels); dropped Bungee + Reddit Mono usage.
- [x] 2026-06-16 — **Reel reworked → autoplay 3D reel + filmstrip**: hero dissolves → autoplaying reel revealed (black-cover fade) → rail slides left, reel exits + Cardo headline scatters in, resting with "business" at the left margin.
- [x] 2026-06-16 — **Partner logos** (`LogoCycler`): 5 auto-cycling client wordmarks parked beneath "business".
- [x] 2026-06-16 — **Reel reveal section** behind the hero (`ReelStage`): hero dissolves (logo+text→shaders→video) → all-keyframe video scrubs with a velocity integrator (continuous forward drift + clean scroll-up reverse). Reel trimmed to a ~3s loop. *(playback model since replaced by autoplay above.)*
- [x] 2026-06-16 — **Horizontal kinetic headline** (`HorizontalText`): pinned right→left scroll of "Design that moves people. And business" with SplitText char-scatter (`containerAnimation`); mint accent.
- [x] 2026-06-16 — `html` scroll-behavior smooth → auto (was fighting ScrollTrigger).
- [x] 2026-06-15 — Wired brand fonts (Cardo / Schibsted Grotesk / Space Mono) in CSS + Tailwind
- [x] 2026-06-15 — Built the new home **hero** from scratch (Warp + GemSmoke shaders, brand fonts, light/dark, reduced-motion) + mounted via new `Home` shell
- [x] 2026-06-15 — Clone, install, run locally
- [x] 2026-06-15 — Full content inventory (`CONTENT.md`)
- [x] 2026-06-15 — Cross-session docs / CLAUDE system
- [x] 2026-06-15 — Captured core design language (Cardo / Schibsted Grotesk / Space Mono; primary `#008A65`); old design marked discarded
- [x] 2026-06-15 — Installed + centrally registered GSAP (motion engine) in `src/lib/gsap.ts`
- [x] 2026-06-15 — Palette implemented for light + dark (CSS vars in `index.css` + Tailwind tokens)
