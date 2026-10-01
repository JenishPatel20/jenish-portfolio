"use client";

import { useRef } from "react";
import Link from "next/link";
import { ExternalLink, ArrowUpRight, Star } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import type { Project, RoleFilter } from "@/data/projects";
import { ProjectMockup } from "@/components/project-mockup";

const GithubIcon = () => (
  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

// ─── Role colour system ───────────────────────────────────────────────────────
const roleConfig: Record<RoleFilter, {
  label:       string;
  color:       string;
  bg:          string;
  border:      string;
  hoverBg:     string;
  hoverBorder: string;
  hoverShadow: string;
  bar:         string;
}> = {
  "ai-ml": {
    label:       "AI / ML",
    color:       "#7eb8f7",
    bg:          "rgba(126,184,247,0.07)",
    border:      "rgba(126,184,247,0.18)",
    hoverBg:     "rgba(126,184,247,0.13)",
    hoverBorder: "rgba(126,184,247,0.45)",
    hoverShadow: "rgba(126,184,247,0.08)",
    bar:         "#7eb8f7",
  },
  "full-stack": {
    label:       "Full Stack",
    color:       "#34d399",
    bg:          "rgba(52,211,153,0.07)",
    border:      "rgba(52,211,153,0.18)",
    hoverBg:     "rgba(52,211,153,0.13)",
    hoverBorder: "rgba(52,211,153,0.4)",
    hoverShadow: "rgba(52,211,153,0.07)",
    bar:         "#34d399",
  },
  "systems": {
    label:       "Systems",
    color:       "#fb923c",
    bg:          "rgba(251,146,60,0.07)",
    border:      "rgba(251,146,60,0.18)",
    hoverBg:     "rgba(251,146,60,0.13)",
    hoverBorder: "rgba(251,146,60,0.4)",
    hoverShadow: "rgba(251,146,60,0.07)",
    bar:         "#fb923c",
  },
  "mobile": {
    label:       "Mobile",
    color:       "#a78bfa",
    bg:          "rgba(167,139,250,0.07)",
    border:      "rgba(167,139,250,0.18)",
    hoverBg:     "rgba(167,139,250,0.13)",
    hoverBorder: "rgba(167,139,250,0.4)",
    hoverShadow: "rgba(167,139,250,0.07)",
    bar:         "#a78bfa",
  },
};

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const primaryRole = project.roles[0];
  const cfg = roleConfig[primaryRole];

  const cardRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const mockupY = useTransform(scrollYProgress, [0, 1], [-22, 22]);

  return (
    <motion.article
      ref={cardRef}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl"
      style={{
        background: "var(--pg-surface)",
        border: "1px solid var(--pg-border)",
        willChange: "transform",
        transition: "background 0.25s ease, border-color 0.25s ease, box-shadow 0.3s ease",
      }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.background = cfg.hoverBg;
        el.style.borderColor = cfg.hoverBorder;
        el.style.boxShadow = `0 20px 48px ${cfg.hoverShadow}, 0 0 0 1px ${cfg.hoverBorder}`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.background = "var(--pg-surface)";
        el.style.borderColor = "var(--pg-border)";
        el.style.boxShadow = "none";
      }}
    >
      {/* Inner glow on hover — role colour at top */}
      <div
        className="absolute inset-x-0 top-0 h-32 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% -20%, ${cfg.hoverShadow.replace("0.08", "0.18")} 0%, transparent 70%)`,
        }}
      />

      {/* Parallax mockup panel */}
      <div
        className="project-media"
        style={{ height: 180, overflow: "hidden", position: "relative", flexShrink: 0 }}
      >
        <motion.div
          style={{ y: mockupY, height: "calc(100% + 44px)", marginTop: -22, width: "100%" }}
        >
          <ProjectMockup role={primaryRole} accentColor={cfg.color} />
        </motion.div>
        {/* Fade-out gradient at bottom to blend into card body */}
        <div
          className="absolute inset-x-0 bottom-0 h-12 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, var(--pg-surface))" }}
        />
      </div>

      {/* Role-coloured accent strip */}
      <div
        style={{
          height: "2px",
          background: `linear-gradient(90deg, ${cfg.bar}cc 0%, ${cfg.bar}22 60%, transparent 100%)`,
          flexShrink: 0,
        }}
      />

      <div className="flex flex-col flex-1 p-5">

        {/* Category chip + Featured pill + year */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="text-[11px] font-semibold px-2.5 py-1 rounded-full tracking-wide"
              style={{ color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.border}` }}
            >
              {cfg.label}
            </span>
            {project.featured && (
              <span
                className="flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full"
                style={{
                  color: "var(--pg-text-3)",
                  background: "color-mix(in srgb, var(--pg-text-1) 5%, transparent)",
                  border: "1px solid var(--pg-border)",
                }}
              >
                <Star className="w-2.5 h-2.5" />
                Featured
              </span>
            )}
          </div>
          <span className="text-xs tabular-nums shrink-0" style={{ color: "var(--pg-text-3)" }}>
            {project.year}
          </span>
        </div>

        {/* Title */}
        <h3
          className="text-base font-bold leading-snug mb-2.5"
          style={{ color: "var(--pg-text-1)" }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p
          className="text-sm leading-relaxed flex-1 line-clamp-3"
          style={{ color: "var(--pg-text-2)" }}
        >
          {project.description}
        </p>

        {/* Highlight stat */}
        {project.highlight && (
          <div
            className="mt-4 px-3 py-2.5 rounded-lg"
            style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}
          >
            <p className="text-xs font-mono leading-relaxed" style={{ color: "var(--pg-text-2)" }}>
              <span style={{ color: cfg.color }}>↳ </span>
              {project.highlight}
            </p>
          </div>
        )}

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {project.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="skill-chip text-xs px-2 py-0.5">
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="px-2 py-0.5 text-xs" style={{ color: "var(--pg-text-3)" }}>
              +{project.tags.length - 4}
            </span>
          )}
        </div>

        {/* Action row */}
        <div
          className="flex items-center gap-3 mt-5 pt-4"
          style={{ borderTop: "1px solid var(--pg-border)" }}
        >
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View source code"
              className="group/link flex items-center gap-1.5 text-xs font-medium transition-colors duration-200"
              style={{ color: "var(--pg-text-3)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--pg-text-1)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--pg-text-3)")}
            >
              <GithubIcon />
              Code
            </a>
          )}
          {project.demo && project.demo !== "#" && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-medium transition-colors duration-200"
              style={{ color: "var(--pg-text-3)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--pg-text-1)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--pg-text-3)")}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Demo
            </a>
          )}

          {/* Primary CTA */}
          <Link
            href={`/projects/${project.id}`}
            className="project-cta ml-auto flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-200"
            style={{
              background: cfg.bg,
              border: `1px solid ${cfg.border}`,
              color: cfg.color,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = cfg.hoverBg;
              e.currentTarget.style.borderColor = cfg.hoverBorder;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = cfg.bg;
              e.currentTarget.style.borderColor = cfg.border;
            }}
          >
            Case Study
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

      </div>
    </motion.article>
  );
}
