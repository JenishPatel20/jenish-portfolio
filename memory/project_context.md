---
name: Portfolio project context
description: Structure, tech stack, and key decisions for Jenish's portfolio site
type: project
---

Portfolio is at the repo root: `/Users/jenishpatel/Desktop/project - vscode/Portfolio/jenish-portfolio/`

**Why:** Built from scratch for recruiter-facing CS/MS portfolio.

**How to apply:** Always run `npm run dev` / `npm run build` from the repo root (not a nested subfolder — the old nested `jenish-portfolio/jenish-portfolio/` was removed).

Structure:
- `src/app/` — Next.js App Router pages
- `src/components/` — section components (nav, hero, projects, skills, about, contact)
- `src/components/ui/` — shadcn/ui components
- `src/data/projects.ts` — project data (edit here to add real projects)
- `src/lib/utils.ts` — shadcn utils
- `public/` — static assets (resume.pdf goes here when ready)

Stack: Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · shadcn/ui · Motion for React (motion/react) · lucide-react

Note: lucide-react v1.x dropped brand icons (Github, Linkedin). Use inline SVGs for those — already done in hero.tsx, contact.tsx, projects.tsx.

Recruiter Mode: managed as `useState` in `src/app/page.tsx`, passed down to `<Projects recruiterMode={...} />`. Shows only `featured: true` projects.

Resume: needs to be placed at `public/resume.pdf` — nav Resume button already links to `/resume.pdf`.
