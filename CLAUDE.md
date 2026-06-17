# Design Tribe Website v2 — Claude hub

Marketing site for **Design Tribe**, a design studio — *"Guided by humans. Powered by AI."*
We are **rebuilding from scratch**. The old code is a **copy source only — its design is discarded**
(salvaged copy → `docs/CONTENT.md`). The new design language (**Cardo** · **Schibsted Grotesk** ·
**Space Mono**; primary **`#008A65`**) lives in `docs/DESIGN-SYSTEM.md`.
**Positioning:** a *strategist* — AI speed + human precision & strategic empathy. **Art direction:**
animation-driven, maximalist, creative — for an audience shifting from corporates to the younger
generation. Vision → `docs/PROJECT.md`.

> This file is auto-loaded every session. It is the index to everything else.
> Keep it short — details live in `docs/`. When something here gets long, move it to a doc and link it.

## ▶ Start every session here
1. Read `docs/WORKLOG.md` (top entry) — what happened last and what's next.
2. Skim `docs/BACKLOG.md` — current priorities.
3. Open the doc(s) relevant to the task (map below). Then work.

## ⏹ Before ending a session (or finishing a meaningful chunk)
- Append a dated entry to `docs/WORKLOG.md` — what changed, why, what's next.
- Update `docs/BACKLOG.md` — tick/close/add items.
- Log any non-obvious choice in `docs/DECISIONS.md`.
- If you changed structure / tokens / copy, update the matching doc (ARCHITECTURE / DESIGN-SYSTEM / CONTENT).
These docs are the **only memory that survives between chats** — keep them current.

## Docs map (`docs/`)
| File | Holds | Read when | Update when |
|---|---|---|---|
| `PROJECT.md` | Vision, goals, audience, scope | making a redesign/scope call | goals or scope change |
| `ARCHITECTURE.md` | Stack, structure, conventions, run/build | touching code or structure | structure/conventions change |
| `DESIGN-SYSTEM.md` | Tokens: color, type, spacing, motion | touching styles/visuals | tokens change |
| `CONTENT.md` | Full section + copy inventory | touching copy/sections | copy/sections change |
| `DECISIONS.md` | Why we did things (log) | unsure why X is the way it is | making a notable choice |
| `WORKLOG.md` | Session journal | **every session start** | **every session end** |
| `BACKLOG.md` | Tasks / roadmap | every session start | as tasks move |

## Snapshot
- **Stack:** React 19 + TypeScript (strict) + Vite 6 + Tailwind 3. No router (path check in `src/App.tsx`). No tests or linter configured.
- **Run:** `npm run dev` → http://localhost:5173 · **Build:** `npm run build` (`tsc -b && vite build`) · **Typecheck:** `npx tsc -b`
- **Pages:** `/` (homepage) and `/services/:slug` (8 services). Light/dark via `data-theme` + CSS vars, persisted to `localStorage["designtribe-theme"]`.
- **Copy/data lives in:** homepage → `src/data/homeData.ts`; services → the `servicePages` record in `src/components/ServicePage.tsx`.

## Conventions (quick — full version in ARCHITECTURE.md)
- TS `type` aliases (not interfaces); function components; named exports.
- Styling = Tailwind utilities for layout + **semantic classes in `src/index.css` bound to CSS variables** for anything themed. Never hardcode theme colors in components — use the tokens.
- Always preserve `prefers-reduced-motion` handling (the motion system already respects it).
- Current values are Figma-exact (lots of arbitrary px). The redesign may replace these — confirm intent before mass-editing.
- Match surrounding code style; keep comments sparse like the existing code.

## Guardrails
- Don't commit or push unless asked. Active branch: `codex/designtribe-static-home`.
- Don't delete the unused alternate asset set (`public/assets/logos/trusted/`) without checking — it may be for the redesign.
- The dev server may already be running in the background on :5173.
