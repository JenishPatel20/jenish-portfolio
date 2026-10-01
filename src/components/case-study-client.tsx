"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import type { Project, RoleFilter } from "@/data/projects";
import { ProjectMockup } from "@/components/project-mockup";

// ── Role colour system — identical to project-card.tsx ─────────────────────────
const roleConfig: Record<RoleFilter, {
  label: string; color: string; bg: string; hoverBg: string; border: string; bar: string;
}> = {
  "ai-ml":      { label: "AI / ML",    color: "#7eb8f7", bg: "rgba(126,184,247,0.08)", hoverBg: "rgba(126,184,247,0.14)", border: "rgba(126,184,247,0.22)", bar: "#7eb8f7" },
  "full-stack": { label: "Full Stack", color: "#34d399", bg: "rgba(52,211,153,0.08)",  hoverBg: "rgba(52,211,153,0.14)",  border: "rgba(52,211,153,0.22)",  bar: "#34d399" },
  "systems":    { label: "Systems",    color: "#fb923c", bg: "rgba(251,146,60,0.08)",  hoverBg: "rgba(251,146,60,0.14)",  border: "rgba(251,146,60,0.22)",  bar: "#fb923c" },
  "mobile":     { label: "Mobile",     color: "#a78bfa", bg: "rgba(167,139,250,0.08)", hoverBg: "rgba(167,139,250,0.14)", border: "rgba(167,139,250,0.22)", bar: "#a78bfa" },
};

// ── Icons ──────────────────────────────────────────────────────────────────────
const GithubIcon = () => (
  <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

// ── Reading progress bar (spring-animated) ─────────────────────────────────────
function ReadingProgress({ color }: { color: string }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return (
    <div className="fixed top-16 left-0 right-0 z-40 h-[2px]" style={{ background: "var(--pg-border)" }}>
      <motion.div className="h-full origin-left" style={{ scaleX, background: color }} />
    </div>
  );
}

// ── Animated content section ───────────────────────────────────────────────────
function ContentSection({
  id, number, heading, accentColor, children,
}: {
  id: string; number: string; heading: string; accentColor: string; children: React.ReactNode;
}) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="h-5 w-[3px] rounded-full shrink-0" style={{ background: accentColor }} />
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs tabular-nums opacity-40" style={{ color: accentColor }}>
            {number}
          </span>
          <h2 className="text-xl font-bold tracking-tight text-pg-text-1">{heading}</h2>
        </div>
      </div>
      {children}
    </motion.section>
  );
}

// ── Small UI atoms ─────────────────────────────────────────────────────────────
function TechBadge({ label }: { label: string }) {
  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium"
      style={{ background: "var(--pg-surface)", border: "1px solid var(--pg-border)", color: "var(--pg-text-2)" }}
    >
      {label}
    </span>
  );
}

function SidebarLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-semibold uppercase tracking-widest mb-2.5" style={{ color: "var(--pg-text-3)" }}>
      {children}
    </p>
  );
}

// ── Main export ────────────────────────────────────────────────────────────────
interface Props {
  project: Project;
  prev: Project | null;
  next: Project | null;
}

export function CaseStudyClient({ project, prev, next }: Props) {
  const cfg = roleConfig[project.roles[0]];
  const mockupRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: mockupScroll } = useScroll({
    target: mockupRef,
    offset: ["start end", "end start"],
  });
  const mockupY = useTransform(mockupScroll, [0, 1], [-30, 30]);

  // Build ordered content sections (only those with data)
  const contentSections = [
    { id: "cs-overview",  heading: "Overview",               content: project.overview ?? project.description },
    { id: "cs-approach",  heading: "Architecture & Approach", content: project.approach },
    { id: "cs-results",   heading: "Results & Outcome",      content: project.results ?? project.highlight },
  ].filter((s): s is { id: string; heading: string; content: string } => !!s.content);


  return (
    <main className="min-h-screen bg-pg-section-alt">

      {/* Scroll-driven reading progress bar */}
      <ReadingProgress color={cfg.bar} />

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <div className="relative border-b hero-grid" style={{ borderColor: "var(--pg-border)" }}>

        {/* Role-coloured 3px accent strip — mirrors the project card */}
        <div style={{ height: "3px", background: `linear-gradient(90deg, ${cfg.bar}dd 0%, ${cfg.bar}44 55%, transparent 100%)` }} />

        {/* Role-tinted radial glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: `radial-gradient(ellipse 55% 45% at 50% 0%, ${cfg.bg} 0%, transparent 70%)` }}
        />

        <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-16">

          {/* Back link */}
          <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-sm mb-8 transition-colors duration-200 group"
              style={{ color: "var(--pg-text-3)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = cfg.color)}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--pg-text-3)")}
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
              All Projects
            </Link>
          </motion.div>

          {/* Category chip + year */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.07 }}
            className="flex flex-wrap items-center gap-2 mb-5"
          >
            <span
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide"
              style={{ color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.border}` }}
            >
              {cfg.label}
            </span>
            <span
              className="text-xs px-3 py-1 rounded-full tabular-nums"
              style={{ background: "var(--pg-surface)", border: "1px solid var(--pg-border)", color: "var(--pg-text-3)" }}
            >
              {project.year}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.14 }}
            className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight mb-5 max-w-3xl"
            style={{ color: "var(--pg-text-1)" }}
          >
            {project.title}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.21 }}
            className="text-base sm:text-lg leading-relaxed mb-8 max-w-3xl"
            style={{ color: "var(--pg-text-2)" }}
          >
            {project.description}
          </motion.p>

          {/* Key metric — left-bar style, role-tinted */}
          {project.highlight && (
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.28 }}
              className="flex items-stretch rounded-xl overflow-hidden mb-8 max-w-2xl"
              style={{ border: `1px solid ${cfg.border}`, background: cfg.bg }}
            >
              <div className="w-[3px] shrink-0" style={{ background: cfg.bar }} />
              <div className="px-4 py-3.5">
                <p className="text-[10px] font-semibold uppercase tracking-widest mb-1.5" style={{ color: cfg.color }}>
                  Evidence
                </p>
                <p className="text-sm font-mono leading-relaxed" style={{ color: "var(--pg-text-2)" }}>
                  {project.highlight}
                </p>
              </div>
            </motion.div>
          )}

          {/* Evidence stack */}
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.31 }}
            className="mb-8 flex flex-wrap gap-2"
          >
            {project.tags.slice(0, 5).map((tag) => (
              <span
                key={tag}
                className="rounded-full px-3 py-1 text-xs font-medium"
                style={{ background: "var(--pg-surface)", border: "1px solid var(--pg-border)", color: "var(--pg-text-2)" }}
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.34 }}
            className="flex flex-wrap items-center gap-3"
          >
            {project.github && (
              <a
                href={project.github} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200"
                style={{ background: cfg.bg, border: `1px solid ${cfg.border}`, color: cfg.color }}
                onMouseEnter={(e) => (e.currentTarget.style.background = cfg.hoverBg)}
                onMouseLeave={(e) => (e.currentTarget.style.background = cfg.bg)}
              >
                <GithubIcon />
                View Code
              </a>
            )}
            {project.demo && project.demo !== "#" && (
              <a
                href={project.demo} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200"
                style={{ background: "var(--pg-surface)", border: "1px solid var(--pg-border)", color: "var(--pg-text-2)" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "var(--pg-text-1)"; e.currentTarget.style.background = "var(--pg-surface-hover)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "var(--pg-text-2)"; e.currentTarget.style.background = "var(--pg-surface)"; }}
              >
                <ExternalLink className="w-4 h-4 shrink-0" />
                Live Demo
              </a>
            )}
          </motion.div>

          {/* Parallax mockup banner */}
          <motion.div
            ref={mockupRef}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.42 }}
            className="mt-10 rounded-2xl overflow-hidden"
            style={{
              height: 220,
              border: `1px solid ${cfg.border}`,
              position: "relative",
            }}
          >
            <motion.div style={{ y: mockupY, height: "calc(100% + 60px)", marginTop: -30, width: "100%" }}>
              <ProjectMockup role={project.roles[0]} accentColor={cfg.color} />
            </motion.div>
            {/* Subtle vignette overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, var(--pg-overlay) 100%)",
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* ── Body ────────────────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 py-16 lg:py-20">
        <div className="lg:grid lg:grid-cols-[1fr_240px] lg:gap-16 xl:gap-20">

          {/* Article */}
          <article className="space-y-16 min-w-0">

            {contentSections.map((section, i) => (
              <ContentSection
                key={section.id}
                id={section.id}
                number={`0${i + 1}`}
                heading={section.heading}
                accentColor={cfg.bar}
              >
                <p className="text-base leading-[1.85] whitespace-pre-line" style={{ color: "var(--pg-text-2)" }}>
                  {section.content}
                </p>
              </ContentSection>
            ))}

            {/* Tech Stack — visible on mobile only */}
            <motion.div
              className="lg:hidden"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="h-5 w-[3px] rounded-full shrink-0" style={{ background: cfg.bar }} />
                <h2 className="text-xl font-bold tracking-tight text-pg-text-1">Tech Stack</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => <TechBadge key={tag} label={tag} />)}
              </div>
            </motion.div>

            {/* Prev / Next navigation */}
            {(prev || next) && (
              <motion.nav
                aria-label="Project navigation"
                className="pt-10 border-t"
                style={{ borderColor: "var(--pg-border)" }}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              >
                <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "var(--pg-text-3)" }}>
                  More Projects
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    {prev && (
                      <Link
                        href={`/projects/${prev.id}`}
                        className="group flex flex-col gap-1 p-4 rounded-xl transition-all duration-200"
                        style={{ background: "var(--pg-surface)", border: "1px solid var(--pg-border)" }}
                        onMouseEnter={(e) => (e.currentTarget.style.borderColor = cfg.border)}
                        onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--pg-border)")}
                      >
                        <span className="text-xs" style={{ color: "var(--pg-text-3)" }}>← Previous</span>
                        <span className="text-sm font-medium leading-snug group-hover:text-pg-text-1 transition-colors duration-200" style={{ color: "var(--pg-text-2)" }}>
                          {prev.title}
                        </span>
                      </Link>
                    )}
                  </div>
                  <div className="flex justify-end">
                    {next && (
                      <Link
                        href={`/projects/${next.id}`}
                        className="group flex flex-col gap-1 p-4 rounded-xl text-right transition-all duration-200 w-full"
                        style={{ background: "var(--pg-surface)", border: "1px solid var(--pg-border)" }}
                        onMouseEnter={(e) => (e.currentTarget.style.borderColor = cfg.border)}
                        onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--pg-border)")}
                      >
                        <span className="text-xs" style={{ color: "var(--pg-text-3)" }}>Next →</span>
                        <span className="text-sm font-medium leading-snug group-hover:text-pg-text-1 transition-colors duration-200" style={{ color: "var(--pg-text-2)" }}>
                          {next.title}
                        </span>
                      </Link>
                    )}
                  </div>
                </div>
              </motion.nav>
            )}
          </article>

          {/* ── Sidebar ── */}
          <aside className="hidden lg:block" aria-label="Project details">
            <div className="sticky top-24 flex flex-col gap-4">

              {/* Details card — role-tinted border + top strip */}
              <div
                className="rounded-2xl overflow-hidden"
                style={{ background: "var(--pg-surface)", border: `1px solid ${cfg.border}` }}
              >
                <div style={{ height: "2px", background: `linear-gradient(90deg, ${cfg.bar}cc, transparent)` }} />

                <div className="p-5 space-y-5">
                  {/* Tech Stack */}
                  <div>
                    <SidebarLabel>Tech Stack</SidebarLabel>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => <TechBadge key={tag} label={tag} />)}
                    </div>
                  </div>

                  <div className="h-px" style={{ background: "var(--pg-border)" }} />

                  {/* Category */}
                  <div>
                    <SidebarLabel>Category</SidebarLabel>
                    <span
                      className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold"
                      style={{ color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.border}` }}
                    >
                      {cfg.label}
                    </span>
                  </div>

                  {/* Year */}
                  <div>
                    <SidebarLabel>Year</SidebarLabel>
                    <p className="text-sm font-medium tabular-nums" style={{ color: "var(--pg-text-2)" }}>
                      {project.year}
                    </p>
                  </div>

                  <div className="h-px" style={{ background: "var(--pg-border)" }} />

                  {/* Links */}
                  <div className="space-y-2">
                    <SidebarLabel>Links</SidebarLabel>
                    {project.github ? (
                      <a
                        href={project.github} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200"
                        style={{ background: cfg.bg, border: `1px solid ${cfg.border}`, color: cfg.color }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = cfg.hoverBg)}
                        onMouseLeave={(e) => (e.currentTarget.style.background = cfg.bg)}
                      >
                        <GithubIcon />
                        GitHub Repository
                      </a>
                    ) : (
                      <p className="text-xs italic" style={{ color: "var(--pg-text-3)" }}>Repository private</p>
                    )}
                    {project.demo && project.demo !== "#" && (
                      <a
                        href={project.demo} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200"
                        style={{ background: "var(--pg-surface)", border: "1px solid var(--pg-border)", color: "var(--pg-text-2)" }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = "var(--pg-text-1)"; e.currentTarget.style.background = "var(--pg-surface-hover)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = "var(--pg-text-2)"; e.currentTarget.style.background = "var(--pg-surface)"; }}
                      >
                        <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>

            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
