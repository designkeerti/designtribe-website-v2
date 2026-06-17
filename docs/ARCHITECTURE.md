# Architecture

How the current build is put together. Update when structure or conventions change.

## Stack
- **React 19** (StrictMode), **TypeScript 5** (strict, project-references build)
- **Vite 6** (`@vitejs/plugin-react`); Rollup aliased to `@rollup/wasm-node`
- **Tailwind CSS 3** + PostCSS + Autoprefixer
- **GSAP 3.15** + **@gsap/react** (`useGSAP`) — animation engine; all plugins registered centrally in `src/lib/gsap.ts` (import pre-registered plugins from there, not from `gsap/*`)
- `lucide-react` is in deps, but current components use SVG assets, not lucide
- Font: **Inter** via Google Fonts `@import` in `src/index.css`
- No router, no state library, no tests, no linter configured

## Commands
- `npm run dev` — Vite dev server → http://localhost:5173
- `npm run build` — `tsc -b && vite build`
- `npm run preview` — preview the production build
- Typecheck only — `npx tsc -b`
- No lint/test scripts. `npm audit` reports 3 highs in transitive deps.

## Routing
`src/App.tsx` switches on `window.location.pathname`:
- `/services/<slug>` → `<ServicePage slug>` (unknown slug falls back to `branding`)
- everything else → `<HomePage>`

It's a static multi-"page" SPA with **no history routing**. In-page anchors are `/#work`,
`/#about`, `/#contact`. Navigating between `/` and `/services/*` is a full reload.

## Source map
| Path | Responsibility |
|---|---|
| `src/main.tsx` | React root; imports `index.css` |
| `src/App.tsx` | Path-based page switch |
| `src/components/HomePage.tsx` | Homepage **and** shared chrome — exports `Header`, `Footer`, `ClientLogoStrip`, `IndustryStrip`, `containerClass`, `ThemeMode` for reuse |
| `src/components/ServicePage.tsx` | Service template + the `servicePages` content record (all 8 services' copy) |
| `src/data/homeData.ts` | Homepage content/data: `services`, `humanAiItems`, `processRows`, `workItems`, `humanIntroItems`, `industries` (unused) |
| `src/hooks/useMotion.ts` | `usePageMotionReady` (adds `.motion-ready`/`.motion-reduced` to `<html>`) + `useRevealOnView` (IntersectionObserver → sets `data-motion-state="revealed"`) |
| `src/lib/gsap.ts` | Registers all GSAP plugins once; re-exports `gsap`, `useGSAP`, and every plugin. Import animation tools from here, not from `gsap/*`. |
| `src/index.css` | Base styles, theme tokens, all semantic component classes, motion keyframes, responsive grid rules |
| `tailwind.config.ts` | Maps a few semantic colors to CSS vars + Inter font |
| `index.html` | `<title>`, meta description, `#root` |

## Theming
- `.homepage[data-theme="light"|"dark"]` defines CSS custom properties (tokens → `DESIGN-SYSTEM.md`).
- Components apply **semantic classes** (`.section-title`, `.card-copy`, `.cta-panel`, …) that read those vars in `index.css`. Components don't hardcode theme colors.
- Theme state lives in each page (`useState`), persisted to `localStorage["designtribe-theme"]`, toggled by the header switch.
- ⚠️ HomePage and ServicePage each carry their **own copy** of the theme-state logic — keep in sync (candidate for extraction).

## Motion system
- On mount, `usePageMotionReady` adds `.motion-ready` (or `.motion-reduced`) to `<html>`.
- Reveal-on-scroll: elements with `data-motion-reveal` + `data-motion-state="idle"` use a `useRevealOnView` ref; when in view → `"revealed"`; CSS transitions handle fade/translate.
- Utility classes: `motion-fade-up`/`-down`, `motion-soft-scale`, `motion-stagger-item`, `motion-distance-sm`/`-md`, `motion-duration-soft`/`-calm`; per-item delay via inline `--motion-delay`.
- Rotating strips (clients, industries) are JS timers in `HomePage.tsx` (hold 2000ms, cell anim 430ms, gap 500ms); pause on hover/focus.
- Scroll-driven process stepper: a tall `.process-scroll-section` (min-height 400vh on desktop) with a sticky stage; scroll progress selects the active step.
- **All motion is disabled under `prefers-reduced-motion` — preserve this.**

## Layout
- Container: `containerClass = "mx-auto w-[min(1152px,calc(100vw-48px))] max-sm:w-[calc(100vw-32px)]"` — 1152px max, 24px gutters (16px mobile).
- CSS media-query breakpoints: ≤639 (2-col grids), ≤767 (mobile spacing), ≤1023 (3-col grids / stacking), ≥1024 (sticky process). Tailwind defaults: sm 640 / md 768 / lg 1024.
- Heavy use of Figma-exact arbitrary values (`w-[536px]`, `leading-[24.8px]`, …).

## Assets (`public/assets/`)
- `figma-home/` — **the live set**: client logos (`client-*` light + `-dark`), theme icons, industry icons/labels, hero video placeholder, presentation image.
- `logos/trusted/` — a **separate, currently-unreferenced** client-logo set (different naming, e.g. `wareiq.svg`, `safebay.svg`). Possibly intended for the redesign. **Don't delete without checking.**
- Several `figma-home` icons (`icon-content`/`-development`/`-research`/…), `logo-symbol`/`-wordmark`, and `theme-moon`/`-sun`/`-toggle` appear unused by current code.

## Known gotchas
- Two sources of truth for industries: `homeData.industries` (unused) vs `industrySets` (live, in `HomePage.tsx`).
- Duplicated theme-state logic across the two pages.
- `client-integrify.svg` asset vs "Integritty" project text — name mismatch (see `CONTENT.md` notes).
