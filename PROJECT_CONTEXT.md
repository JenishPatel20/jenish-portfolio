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
- shadcn/ui base (dark theme only, never light)
- No backend, no database, fully static

**Repo path:** `jenish-portfolio/`
**Live URL:** `https://jenishpatel.vercel.app` (deployed on Vercel, auto-deploys on push to `main`)
**Build command:** `npm run build` (must pass clean)
**Dev command:** `npm run dev`

---

## File Structure

```
src/
├── app/
│   ├── globals.css          # All CSS tokens and utility classes
│   ├── layout.tsx
│   ├── page.tsx             # Homepage — wires all sections together
│   ├── projects/
│   │   ├── page.tsx         # /projects — all projects listing
│   │   └── [slug]/
│   │       └── page.tsx     # /projects/[slug] — case study pages (server component)
│   └── resume/
│       └── page.tsx
├── components/
│   ├── about-section.tsx            # Facts grid: role, education, location, availability
│   ├── ask-portfolio.tsx            # Keyword-matching recruiter assistant (no AI APIs)
│   ├── contact-section.tsx
│   ├── experience-section.tsx       # Work experience timeline
│   ├── featured-projects.tsx        # Project grid with filter pills
│   ├── hero.tsx                     # Hero section — two-column, right col has 3D orbital sphere (desktop only)
│   ├── hero-visual.tsx              # Lazy-loads OrbitalSphereScene via next/dynamic (ssr:false)
│   ├── live-demo-lab.tsx            # 4 interactive demo cards (expand on play)
│   ├── live-demo/                   # Individual demo components
│   │   ├── benchmark-table-demo.tsx
│   │   ├── chess-replay-demo.tsx
│   │   ├── snn-spike-demo.tsx
│   │   └── auction-master-mini-demo.tsx
│   ├── magnetic-button.tsx          # Spring-physics magnetic hover wrapper (STRENGTH=0.38, motion/react)
│   ├── mask-text.tsx                # Word-by-word reveal animation (clip-path mask, whileInView or mount)
│   ├── orbital-sphere-scene.tsx     # Three.js / react-three-fiber 3D orbital sphere (Canvas, useFrame)
│   ├── project-card.tsx             # Reusable project card
│   ├── project-mockup.tsx           # SVG role-specific mockups for project cards (ai-ml, full-stack, systems, mobile)
│   ├── recruiter-mode.tsx           # RecruiterModeBanner + RecruiterModeSection
│   ├── reveal.tsx                   # Scroll-triggered fade+slide wrapper (whileInView, once, margin -80px)
│   ├── site-footer.tsx
│   ├── site-header.tsx
│   ├── skills-bento.tsx
│   ├── smooth-scroll-provider.tsx   # Lenis smooth scroll + MotionConfig(reducedMotion:"user") wraps layout
│   ├── tech-parade.tsx              # Infinite-scroll branded skill chips row (visual separator between sections)
│   └── ui/                          # shadcn primitives
└── data/
    ├── experience.ts            # Work experience data
    ├── live-demo/               # Data used by live demo components
    ├── projects.ts              # All 7 portfolio projects with full case study fields
    └── skills.ts                # Skills data for bento section
```

---

## Homepage Section Order (top to bottom)

1. `SiteHeader` — nav with Recruiter Mode toggle + Resume CTA
2. `RecruiterModeBanner` — animated dismissible banner (only when recruiter mode on)
3. `Hero` — two-column: left = name/subtitle/CTAs/socials, right = 3D orbital sphere (desktop only, `HeroVisual`)
4. `RecruiterModeSection` — animated summary section (only when recruiter mode on)
5. `AboutSection` — facts grid: current role, education, location, availability
6. `ExperienceSection` — Greenlit co-op timeline
7. `TechParade` — infinite-scroll branded skill chips row (visual separator)
8. `FeaturedProjects` — project grid, filter pills: All / AI & ML / Full Stack / Systems / Mobile
9. `LiveDemoLab` — 4 expandable interactive demo cards (id: `demos`)
10. `SkillsBento` — skills bento grid
11. `AskPortfolio` — keyword-matching recruiter assistant (id: `ask`)
12. `ContactSection` — contact info (id: `contact`)
13. `SiteFooter`

**Removed:** `RoleMatcher` section — was deleted, `src/components/role-matcher.tsx` no longer exists.

---

## Design System

### CSS Custom Properties (defined in `globals.css`)

All accent colors are unified to a single ice blue. There is no cyan/blue/violet split.

```css
/* Colors */
--color-pg-bg:      #000000;        /* page background */
--color-pg-text-1:  #ffffff;        /* primary text */
--color-pg-text-2:  #666666;        /* secondary text */
--color-pg-text-3:  #383838;        /* muted / icon text */
--color-pg-accent:  #7eb8f7;        /* single accent — ice blue */
--color-pg-accent-glow: rgba(126, 184, 247, 0.25);

/* These aliases all resolve to ice blue — do not use different colors per role */
--color-pg-cyan:    #7eb8f7;
--color-pg-blue:    #7eb8f7;
--color-pg-violet:  #7eb8f7;

/* Surfaces */
--pg-surface:       rgba(255,255,255,0.04);
--pg-surface-hover: rgba(255,255,255,0.07);
--pg-border:        rgba(255,255,255,0.09);
--pg-border-hover:  rgba(126,184,247,0.35);
```

### Section Backgrounds

All sections use `#000000`. `LiveDemoLab` uses `#040404` with a top border for subtle separation.

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
- Use `<Reveal>` wrapper for scroll-triggered section content (fade+slide, `once`, `-80px` margin)
- Use `<MaskText>` for animated headings — `inView` prop controls whether it triggers on scroll or mount
- Use `<MagneticButton>` wrapper for CTA buttons with spring-physics magnetic hover
- Smooth scroll is provided globally by `SmoothScrollProvider` (Lenis, lerp 0.08) in `layout.tsx` — do not add per-component scroll libraries

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

**Edge AI LLM Benchmark** — Browser-native LLM benchmarking via WebGPU + @mlc-ai/web-llm. Models: Llama 3.2 1B, Qwen 2.5 1.5B, SmolLM2 1.7B, Llama 3.1 8B. Real measured metrics: Llama 3.2 1B = 73–172ms TTFT, 48–52 TPS, $0/run. Cloud comparison: Gemini 2.5 Flash, Claude Haiku 4.5. 3 hardware profiles (Windows NVIDIA, Mac M1, Mac M2 Pro). Results exported to timestamped CSVs. Python scripts: gemini_testing.py, anthropic_testing.py, mmlu_benchmark.py.

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

## AskPortfolio Component (`src/components/ask-portfolio.tsx`)

Keyword-matching recruiter assistant. **No AI APIs, no backend, no external services.**

- Input: free-text query or one of 8 suggestion chips
- Engine: pure JS keyword scoring against `projects.ts` and `skills.ts`
- Result types: `"projects"` (up to 4 cards), `"skills"` (grid), `"none"` (fallback message)
- Each project card: status dot, title, reason string, highlight stat, up to 4 tags, "View case study →" link
- 8 chips: AI experience, Full-stack projects, Systems projects, Mobile project, Python projects, Recruiter picks, Machine learning, Benchmarking work
- Section id: `ask`

---

## LiveDemoLab Component (`src/components/live-demo-lab.tsx`)

4 expandable demo cards in a 2-column grid. Click Play to expand the demo panel inline.

| id | Title | Component file |
|---|---|---|
| `benchmark` | Edge AI Benchmark | `benchmark-table-demo.tsx` — real TTFT/TPS data from actual CSVs across 3 hardware profiles |
| `chess` | Chess Engine Move Replay | `chess-replay-demo.tsx` — static CSS/SVG board, pre-scripted move sequences (en passant, castling, checkmate) |
| `snn` | SNN Spike Visualizer | `snn-spike-demo.tsx` — CSS keyframe neuron-firing animation |
| `auction` | Auction Master Live Feed | `auction-master-mini-demo.tsx` — countdown timer, animated bid feed, reserve price indicator |

Section id: `demos`

---

## HeroVisual + OrbitalSphereScene

**`src/components/hero-visual.tsx`** — lazy-loads `OrbitalSphereScene` via `next/dynamic({ ssr: false })`. Rendered in the hero's right column (desktop only, `hidden lg:flex`).

**`src/components/orbital-sphere-scene.tsx`** — Three.js scene via `@react-three/fiber` + `@react-three/drei`. Canvas-rendered interactive 3D orbital sphere with `useFrame` animation loop. No SSR (client-only).

---

## Case Study Pages (`src/app/projects/[slug]/page.tsx`)

Server component. `generateStaticParams` generates all 7 slugs at build time.

Layout: dark hero (hero-grid background + radial glow) → two-column body (`lg:grid lg:grid-cols-[1fr_256px]`)
- Article: Overview (ice blue accent) → Architecture & Approach → Results & Outcome → tech stack (mobile only) → Prev/Next navigation
- Sidebar (desktop, sticky): tech stack badges, category, status, year, GitHub/demo links
- Sections only render if the field exists in `projects.ts` — never invented

---

## Rules / Preferences

1. **Never invent project details.** All data must come from `src/data/projects.ts` or verified source files. If a field is missing, omit the section gracefully.
2. **Prefer real data over mock data** in interactive demos. Fake numbers labeled "sample preview" hurt credibility.
3. **Don't duplicate existing components.** Check what's already on the page before building a new widget.
4. **Don't block on security issues** in source repos — user is aware, will fix later.
5. **No paid APIs, no Supabase, no external LLM APIs** for demo components.
6. Always run `npx tsc --noEmit` and `npm run build` after major changes.
7. `"use client"` only where genuinely needed — prefer server components.
8. No code comments unless the why is non-obvious.
9. No trailing summaries after completing work — keep responses tight.
10. **Single accent color only** — `var(--color-pg-accent)` (#7EB8F7). Do not use separate cyan/blue/violet per role or section.
