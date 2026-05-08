# Project Context — Jenish Patel Portfolio

Upload this file at the start of any AI chat to get full context on the project without re-explaining anything.

---

## Who I Am

- **Name:** Jenish Patel
- **Role:** CS student at Rutgers University
- **Email:** jenishvpatel4995@gmail.com
- **GitHub:** JenishPatel20
- **Goal:** Building a professional portfolio to target Software Engineering and AI/ML roles
- **Current co-op:** Greenlit — AI/ML Engineer Intern, Jan 2026 – May 2026, Remote (entertainment investment platform)

---

## Project

**Portfolio website** built with:
- Next.js 16.2.5 (App Router, Turbopack)
- TypeScript
- Tailwind CSS v4
- Motion for React (`motion/react` — framer-motion v11 fork, always import from `motion/react` not `framer-motion`)
- shadcn/ui base (dark theme only, never light)
- No backend, no database, fully static

**Repo path:** `jenish-portfolio/`
**Build command:** `npm run build` (passes clean)
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
│   ├── contact-section.tsx
│   ├── experience-section.tsx   # Work experience timeline
│   ├── featured-projects.tsx    # Project grid with filter pills
│   ├── hero.tsx
│   ├── hero-visual.tsx
│   ├── project-card.tsx         # Reusable project card
│   ├── recruiter-mode.tsx       # RecruiterModeBanner + RecruiterModeSection
│   ├── role-matcher.tsx         # Role-based project sorter (recruiter tool)
│   ├── site-footer.tsx
│   ├── site-header.tsx
│   ├── skills-bento.tsx
│   └── ui/                      # shadcn primitives
└── data/
    ├── experience.ts            # Work experience data
    ├── projects.ts              # All 7 portfolio projects with full case study fields
    └── skills.ts                # Skills data for bento section
```

---

## Homepage Section Order (top to bottom)

1. `SiteHeader` — nav with Recruiter Mode toggle
2. `RecruiterModeBanner` — animated dismissible banner (only when recruiter mode on)
3. `Hero` — animated hero section
4. `RecruiterModeSection` — animated summary section (only when recruiter mode on)
5. `FeaturedProjects` — project grid, filter pills: All / AI & ML / Full Stack / Systems / Mobile
6. `RoleMatcher` — role buttons sort all projects by match; Spring layout animation
7. `ExperienceSection` — Greenlit co-op timeline
8. `SkillsBento` — skills bento grid
9. `ContactSection`
10. `SiteFooter`

---

## Design System

### CSS Custom Properties (defined in `globals.css`)

```css
/* Colors */
--color-pg-bg:      #09090f;       /* page background */
--color-pg-text-1:  #eeeef2;       /* primary text */
--color-pg-text-2:  #8888a0;       /* secondary text */
--color-pg-text-3:  #44444e;       /* muted text */
--color-pg-cyan:    #22d3ee;
--color-pg-blue:    #60a5fa;
--color-pg-violet:  #a78bfa;

/* Surfaces */
--pg-surface:       rgba(255,255,255,0.04);
--pg-surface-hover: rgba(255,255,255,0.07);
--pg-border:        rgba(255,255,255,0.08);
--pg-border-hover:  rgba(255,255,255,0.16);
```

### Utility Classes (defined in `globals.css`)

| Class | Purpose |
|---|---|
| `glass-card` | Surface card with border and background |
| `skill-chip` | Small tech tag pill |
| `section-label` | Small uppercase label above headings |
| `section-container` | Max-width centered wrapper with horizontal padding |
| `hero-grid` | CSS background grid pattern for hero sections |
| `gradient-text` | Gradient text effect |
| `btn-primary` | Primary action button |
| `btn-secondary` | Secondary action button |
| `filter-pill` | Inactive filter button |
| `filter-pill-active` | Active filter button |

### Section Backgrounds
- Most sections: `#09090f`
- Alternating sections (e.g. RoleMatcher): `#0b0b13`

### Component Conventions
- `"use client"` only where state or effects are needed — prefer server components
- Hover styles use inline `onMouseEnter`/`onMouseLeave` (not Tailwind hover:) because design tokens are CSS variables
- `notFound()` from `next/navigation` for invalid slugs
- Animation pattern: `whileInView`, `viewport={{ once: true, amount: 0.2 }}`, `initial={{ opacity: 0, y: 20 }}`
- Always import motion from `motion/react`, never `framer-motion`

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

## RoleMatcher Component (`src/components/role-matcher.tsx`)

Standalone section (id: `role-matcher`) placed after FeaturedProjects.

5 role buttons with accent colors:
| Role | Maps to RoleFilter | Accent |
|---|---|---|
| AI Engineer | ai-ml | cyan |
| Software Engineer | full-stack + systems | blue |
| Full Stack | full-stack | violet |
| Mobile / iOS | mobile | green (#34d399) |
| Systems / Performance | systems | orange (#fb923c) |

Behavior: selecting a role sorts matching projects to the top, dims non-matching to 30% opacity, adds colored ring glow to matching cards. Spring layout animation via `LayoutGroup`. Clear button dismisses selection.

---

## Case Study Pages (`src/app/projects/[slug]/page.tsx`)

Server component. `generateStaticParams` generates all 7 slugs at build time.

Layout: dark hero (hero-grid background + radial glow) → two-column body (`lg:grid lg:grid-cols-[1fr_256px]`)
- Article: Overview (cyan accent) → Architecture & Approach (blue accent) → Results & Outcome (violet accent) → tech stack (mobile only) → Prev/Next navigation
- Sidebar (desktop, sticky): tech stack badges, category, status, year, GitHub/demo links
- Sections only render if the field exists in projects.ts — never invented

---

## What Has NOT Been Built Yet

### LiveDemoLab (`src/components/live-demo-lab.tsx`)
Agreed approach — 3 interactive demo cards:

1. **Real Benchmark Table** — Edge AI project real numbers (TTFT/TPS from actual CSV data across 3 hardware profiles). Not mock data.

2. **Chess Engine Move Replay** — Static CSS/SVG chess board. Pre-scripted move sequences demonstrating en passant, castling, checkmate. Pure frontend, no API.

3. **SNN Spike Visualization** — CSS keyframe animation of neurons firing in sequence. Purely visual.

**Rejected ideas (do not rebuild):**
- Role Matcher card inside LiveDemoLab — already exists as standalone section
- Architecture Explorer card — inferior to existing case study pages at `/projects/[slug]`
- Mock/fake benchmark numbers labeled "sample preview data"

### Auction Master Mini-Demo (discussed, not started)
Read-only static snapshot: fake live auction with countdown timer (`setInterval`), 3 mock bids animating in, reserve price status toggle. Pure frontend.

---

## Rules / Preferences

1. **Never invent project details.** All data must come from `src/data/projects.ts` or verified source files. If a field is missing, omit the section gracefully.
2. **Prefer real data over mock data** in interactive demos. Fake numbers labeled "sample preview" hurt credibility.
3. **Don't duplicate existing components.** Check what's already on the page before building a new widget.
4. **Don't block on security issues** in source repos — user is aware, will fix later.
5. **No paid APIs, no Supabase, no external LLM APIs** for demo components.
6. Always run `npx tsc --noEmit` and `npm run build` after major changes.
7. `"use client"` only where genuinely needed — prefer server components.
8. No comments in code unless the why is non-obvious.
9. No trailing summaries after completing work — keep responses tight.
