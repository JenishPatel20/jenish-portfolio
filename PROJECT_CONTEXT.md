# Project Context — Jenish Patel Portfolio

Upload this file at the start of any AI chat to get full context on the project without re-explaining anything.

---

## Who I Am

- **Name:** Jenish Patel
- **Role:** CS student at Rutgers University (MS CS, graduating Fall 2026)
- **Email:** jenishvpatel4995@gmail.com
- **GitHub:** JenishPatel20
- **LinkedIn:** jenish--patel
- **Goal:** Building a professional portfolio to target Software Engineering and AI/ML roles
- **Current co-op:** Greenlit — AI/ML Engineer Intern, Jan 2026 – May 2026, Remote (entertainment investment platform)

---

## Project

**Portfolio website** built with:
- Next.js 16.2.5 (App Router, Turbopack)
- TypeScript (strict mode)
- Tailwind CSS v4
- Motion for React (`motion/react` — framer-motion v11 fork, **always import from `motion/react` not `framer-motion`**)
- React Three Fiber (`@react-three/fiber` v9, `@react-three/drei`, `three`) for 3D scene
- shadcn/ui base (dark theme only, never light)
- No backend, no database, fully static

**Repo path:** `jenish-portfolio/`
**Build command:** `npm run build` (must pass clean)
**Dev command:** `npm run dev`

---

## File Structure

```
src/
├── app/
│   ├── globals.css          # All CSS tokens and utility classes
│   ├── layout.tsx           # data-scroll-behavior="smooth" on <html>
│   ├── page.tsx             # Homepage — wires all sections together
│   ├── projects/
│   │   ├── page.tsx         # /projects — all projects listing
│   │   └── [slug]/
│   │       └── page.tsx     # Thin server shell — resolves project, renders CaseStudyClient
│   └── resume/
│       └── page.tsx
├── components/
│   ├── about-section.tsx        # "Who I Am" — bio + 4 fact cards (co-op, degree, graduation, location)
│   ├── ask-portfolio.tsx        # Keyword-matching recruiter assistant (no AI APIs)
│   ├── case-study-client.tsx    # Full animated case study UI (client component)
│   ├── contact-section.tsx      # Contact form wired to Formspree (xqennzyg endpoint)
│   ├── experience-section.tsx   # Work experience timeline (section label: "Career")
│   ├── featured-projects.tsx    # Project grid with filter pills
│   ├── hero.tsx                 # Two-column hero: text left, OrbitalSphereScene right
│   ├── hero-visual.tsx          # Lazy-loads OrbitalSphereScene via next/dynamic (ssr: false)
│   ├── live-demo-lab.tsx        # 4 interactive demo cards (expand on play)
│   ├── live-demo/               # Individual demo components
│   │   ├── benchmark-table-demo.tsx
│   │   ├── chess-replay-demo.tsx
│   │   ├── snn-spike-demo.tsx
│   │   └── auction-master-mini-demo.tsx
│   ├── orbital-sphere-scene.tsx # React Three Fiber 3D scene (pulsating core, 3 orbital rings, star field)
│   ├── project-card.tsx         # Reusable project card with role-color system
│   ├── recruiter-mode.tsx       # RecruiterModeBanner + RecruiterModeSection
│   ├── site-footer.tsx
│   ├── site-header.tsx          # Nav + mobile drawer (hamburger, spring slide-in, AnimatePresence)
│   ├── skills-bento.tsx
│   └── ui/                      # shadcn primitives
└── data/
    ├── experience.ts            # Work experience data
    ├── live-demo/               # Data used by live demo components
    ├── projects.ts              # All 7 portfolio projects with full case study fields
    └── skills.ts                # Skills data for bento section
```

---

## Homepage Section Order (top to bottom)

1. `SiteHeader` — nav with Recruiter Mode toggle + Resume CTA + mobile hamburger drawer
2. `RecruiterModeBanner` — animated dismissible banner (only when recruiter mode on)
3. `Hero` — name, subtitle, description, CTAs, social links | OrbitalSphereScene (right column, hidden on mobile)
4. `AboutSection` — "Who I Am" bio + 4 fact cards
5. `RecruiterModeSection` — animated summary section (only when recruiter mode on)
6. `FeaturedProjects` — project grid, filter pills: All / AI & ML / Full Stack / Systems / Mobile
7. `LiveDemoLab` — 4 expandable interactive demo cards (id: `demos`)
8. `ExperienceSection` — Greenlit co-op timeline
9. `SkillsBento` — skills bento grid
10. `AskPortfolio` — keyword-matching recruiter assistant (id: `ask`)
11. `ContactSection` — contact info + message form (id: `contact`)
12. `SiteFooter`

**Removed:** `RoleMatcher` section — deleted, `src/components/role-matcher.tsx` no longer exists.

---

## Design System

### CSS Custom Properties (defined in `globals.css`)

All accent colors are unified to a single ice blue. There is no cyan/blue/violet split **on the main site**. Project cards and case study pages use a per-role color system (see below) for card-level theming only.

```css
/* Colors */
--color-pg-bg:      #000000;        /* page background */
--color-pg-text-1:  #ffffff;        /* primary text */
--color-pg-text-2:  #666666;        /* secondary text */
--color-pg-text-3:  #383838;        /* muted / icon text */
--color-pg-accent:  #7eb8f7;        /* single accent — ice blue */
--color-pg-accent-glow: rgba(126, 184, 247, 0.25);

/* These aliases all resolve to ice blue */
--color-pg-cyan:    #7eb8f7;
--color-pg-blue:    #7eb8f7;
--color-pg-violet:  #7eb8f7;

/* Surfaces */
--pg-surface:       rgba(255,255,255,0.04);
--pg-surface-hover: rgba(255,255,255,0.07);
--pg-border:        rgba(255,255,255,0.09);
--pg-border-hover:  rgba(126,184,247,0.35);
```

### Per-Role Color System (project-card.tsx + case-study-client.tsx)

Used only in project cards and case study pages so colors visually link a card to its case study.

| Role | Color | Usage |
|---|---|---|
| `ai-ml` | `#7eb8f7` (ice blue) | category chip, accent strip, sidebar border, progress bar |
| `full-stack` | `#34d399` (emerald) | same |
| `systems` | `#fb923c` (orange) | same |
| `mobile` | `#a78bfa` (violet) | same |

### Section Backgrounds

All sections use `#000000`. `LiveDemoLab` and `ContactSection` use `#040404` with a top border for subtle separation.

### Utility Classes (defined in `globals.css`)

| Class | Purpose |
|---|---|
| `glass-card` | Surface card with border and background |
| `skill-chip` | Small tech tag pill |
| `accent-badge` | Small pill badge with ice blue tint |
| `section-label` | Small uppercase label above headings |
| `section-container` | Max-width centered wrapper (`max-w-6xl mx-auto px-6`) |
| `hero-grid` | CSS background grid pattern for hero sections |
| `gradient-text` | White-to-ice-blue gradient text |
| `btn-primary` | Primary CTA: white bg, black text, rounded-full |
| `btn-secondary` | Secondary: transparent bg, ice blue border/text |
| `filter-pill` | Inactive filter button |
| `filter-pill-active` | Active filter button (ice blue tint) |

### Component Conventions

- `"use client"` only where state or effects are needed — prefer server components
- Hover styles use inline `onMouseEnter`/`onMouseLeave` (not Tailwind `hover:`) because design tokens are CSS variables
- `notFound()` from `next/navigation` for invalid slugs
- Animation pattern: `whileInView`, `viewport={{ once: true, amount: 0.2 }}`, `initial={{ opacity: 0, y: 20 }}`
- Always import motion from `motion/react`, never `framer-motion`
- Expand/collapse: `AnimatePresence` with `height: 0 → auto` + `overflow-hidden`
- THREE.Clock deprecation warning from R3F v9 suppressed via `useSuppressThreeClockWarning` hook in `orbital-sphere-scene.tsx`

---

## Data: Projects (`src/data/projects.ts`)

### TypeScript Interface

```typescript
export type RoleFilter = "ai-ml" | "full-stack" | "systems" | "mobile";

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  roles: RoleFilter[];
  featured?: boolean;
  github?: string;
  demo?: string;
  status: "live" | "wip" | "research";
  year: number;
  highlight?: string;
  // Case study fields
  overview?: string;
  approach?: string;
  results?: string;
}
```

### All 7 Projects

| id | Title | Roles | Status | Featured | GitHub |
|---|---|---|---|---|---|
| `auction-master` | Auction Master | full-stack | wip | yes | private |
| `edge-ai-benchmark` | Edge AI LLM Benchmark | ai-ml | research | yes | public |
| `industrial-anomaly-detection` | Industrial Fault Detection via SNNs | ai-ml | research | yes | private |
| `customer-churn` | Customer Churn Prediction | ai-ml | research | no | public |
| `ai-localization` | Belief-State Robot Localization | ai-ml | research | no | private |
| `android-photo-manager` | Android Photo Album Manager | mobile | live | no | — |
| `chess-engine` | Java Chess Engine | systems | live | no | — |

### Key Project Details

**Auction Master** — Node.js/Express REST API, MySQL, Firebase (password reset), Multer (image uploads), Nodemailer. 3-role system: Admin, Customer Representative, Buyer. Preference-matched email notifications on new auction listings. 20+ HTML/CSS/JS pages. Vanilla JS frontend.

**Edge AI LLM Benchmark** — Browser-native LLM benchmarking via WebGPU + @mlc-ai/web-llm. Models: Llama 3.2 1B, Qwen 2.5 1.5B, SmolLM2 1.7B, Llama 3.1 8B. Real measured metrics: Llama 3.2 1B = 73–172ms TTFT, 48–52 TPS, $0/run. Cloud comparison: Gemini 2.5 Flash, Claude Haiku 4.5. 3 hardware profiles (Windows NVIDIA, Mac M1, Mac M2 Pro). Results exported to timestamped CSVs.

**Industrial Fault Detection via SNNs** — PyTorch + TensorFlow. 3 architectures × 2 datasets (CWRU bearing vibration + MIT-BIH ECG). CNN→SNN weight transfer, surrogate gradient training. 6 Jupyter notebooks.

**Customer Churn Prediction** — 3 datasets (Telco ~7K, SaaS ~963, BankChurners ~10K). Logistic Regression vs Random Forest vs XGBoost. SHAP beeswarm + bar plots. AUC ≥ 0.85 on Telco & BankChurners.

**Belief-State Robot Localization** — BFS over frozenset belief-set state space. CNN regressor (6-channel 2D tensor) predicts localization cost. 3 policies: greedy (π₀), CNN-guided (π₁), dual-CNN (π₂). π₁ outperforms π₀ across belief sizes.

**Android Photo Album Manager** — Java, Android SDK 29, 11 Activities. Location + Person tag system, AND/OR tag search with AutoCompleteTextView. Java serialization persistence. Zero third-party dependencies beyond AndroidX.

**Java Chess Engine** — Console chess, two-player. All 6 piece types, check/checkmate detection, en passant, castling, pawn promotion. OOP hierarchy: abstract `pieces` base class, 6 concrete subclasses.

---

## Data: Experience (`src/data/experience.ts`)

### TypeScript Interface

```typescript
export interface ExperienceRole {
  title: string;
  type: "full-time" | "part-time" | "co-op" | "internship";
  location: string;
  startDate: string;
  endDate: string;
  bullets: string[];
  tags: string[];
}

export interface Experience {
  company: string;
  companyTagline: string;
  roles: ExperienceRole[];
}
```

### Current Entry

**Greenlit** — AI-powered entertainment investment platform
- Role: AI/ML Engineer Intern, Co-op, Remote, Jan 2026 – May 2026
- Built: multi-source web scraper (BeautifulSoup + Gemini API), 20+ endpoint FastAPI market analysis service (PostgreSQL), Gemini-powered script analyzer, Genre Market Report engine (0–100 health score), background enrichment pipeline (TMDB + IMDb/RT/Metacritic/Letterboxd + YouTube comment sentiment), force-directed network graph + Vanilla JS analytics dashboard (Chart.js, 8+ visualizations)
- Tags: Python, FastAPI, PostgreSQL, Gemini API, TMDB API, BeautifulSoup, pandas, JavaScript, Chart.js, S3

---

## OrbitalSphereScene (`src/components/orbital-sphere-scene.tsx`)

React Three Fiber 3D scene used as the hero visual (right column on desktop).

- **Core:** Pulsating metallic sphere (`MeshStandardMaterial`, emissiveIntensity animated via `useFrame`) + 2 atmosphere shells + equatorial ring
- **Orbital rings:** 3 rings at different inclinations (`[π/2,0,0]`, `[0.3,0,1.05]`, `[1.2,0.55,0.2]`) with 2–3 traveling dot particles each
- **Star field:** 180 ambient `Points` particles scattered in a shell (r = 2.9–5.1)
- **Camera rig:** Mouse parallax via pointer.x / pointer.y smoothed with lerp
- **Auto-rotation:** Entire scene group rotates on Y at 0.07 rad/s
- **Warning suppression:** `useSuppressThreeClockWarning` patches `console.warn` to silence R3F's internal `THREE.Clock` deprecation
- Loaded in `hero-visual.tsx` via `next/dynamic({ ssr: false })` with `<PlaceholderScene />` fallback

---

## AskPortfolio Component (`src/components/ask-portfolio.tsx`)

Keyword-matching recruiter assistant. **No AI APIs, no backend, no external services.**

- Input: free-text query or one of 8 suggestion chips
- Engine: pure JS keyword scoring against `projects.ts` and `skills.ts`
- Result types: `"projects"` (up to 4 cards), `"skills"` (grid), `"none"` (fallback message)
- 8 chips: AI experience, Full-stack projects, Systems projects, Mobile project, Python projects, Recruiter picks, Machine learning, Benchmarking work
- Section id: `ask`

---

## LiveDemoLab Component (`src/components/live-demo-lab.tsx`)

4 expandable demo cards in a 2-column grid. Click Play to expand the demo panel inline.

| id | Title | Component file |
|---|---|---|
| `benchmark` | Edge AI Benchmark | `benchmark-table-demo.tsx` — real TTFT/TPS data from actual CSVs across 3 hardware profiles |
| `chess` | Chess Engine Move Replay | `chess-replay-demo.tsx` — static CSS/SVG board, pre-scripted move sequences |
| `snn` | SNN Spike Visualizer | `snn-spike-demo.tsx` — CSS keyframe neuron-firing animation |
| `auction` | Auction Master Live Feed | `auction-master-mini-demo.tsx` — countdown timer, animated bid feed, reserve price indicator |

Section id: `demos`

---

## Case Study Pages

### Server shell (`src/app/projects/[slug]/page.tsx`)

Thin server component (~40 lines). Resolves `project`, `prev`, `next` from `projects.ts`, then renders:

```tsx
<SiteHeader />
<CaseStudyClient project={project} prev={prev} next={next} />
<SiteFooter />
```

`generateStaticParams` generates all 7 slugs at build time.

### Client component (`src/components/case-study-client.tsx`)

Full animated UI — `"use client"`.

- **Reading progress bar** — `useScroll` + `useSpring` (`scaleX`), fixed below header, colored to role accent
- **Hero** — 3px role-colored accent strip, radial glow tinted to role color, staggered `animate` entrances (back link → chip → title → description → key metric → action buttons). No status badge.
- **Content sections** — `ContentSection` uses `whileInView` fade+slide; each section has a section number (01, 02, 03) + left colored bar
- **Table of Contents** — sticky sidebar, `IntersectionObserver` (`rootMargin: "-18% 0% -65% 0%"`), active section dot + text highlight in role color
- **Sidebar details card** — 2px top gradient strip + role-tinted border; shows tech stack, category chip, year, GitHub/demo links; no status field
- **Prev/Next nav** — hover border tints to role color
- Sections (Overview, Architecture & Approach, Results & Outcome) only render if the field exists in `projects.ts`

---

## Contact Form (`src/components/contact-section.tsx`)

Wired to Formspree endpoint `https://formspree.io/f/xqennzyg`. Uses fetch + FormData. Fields: name, email, message (all have `name` attributes). States: `idle | loading | success | error`. Success shows green checkmark; error shows red alert.

---

## Rules / Preferences

1. **Never invent project details.** All data must come from `src/data/projects.ts` or verified source files. If a field is missing, omit the section gracefully.
2. **Prefer real data over mock data** in interactive demos. Fake numbers labeled "sample preview" hurt credibility.
3. **Don't duplicate existing components.** Check what's already on the page before building a new widget.
4. **Don't block on security issues** in source repos — user is aware, will fix later.
5. **No paid APIs, no Supabase, no external LLM APIs** for demo components.
6. Always run `npx tsc --noEmit` after major changes. Clear `.next/` first if TS shows stale cache errors.
7. `"use client"` only where genuinely needed — prefer server components.
8. No code comments unless the why is non-obvious.
9. No trailing summaries after completing work — keep responses tight.
10. **Main site uses single accent** `var(--color-pg-accent)` (#7EB8F7). The per-role color system (blue/emerald/orange/violet) is scoped to `project-card.tsx` and `case-study-client.tsx` only.
