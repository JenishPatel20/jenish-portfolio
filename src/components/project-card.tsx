"use client";

import Link from "next/link";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import type { Project, RoleFilter } from "@/data/projects";

const GithubIcon = () => (
  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

// ─── Role colour system ────────────────────────────────────────────────────────
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

  return (
    <article
      className="group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        background: "var(--pg-surface)",
        border: "1px solid var(--pg-border)",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.background = "var(--pg-surface-hover)";
        el.style.borderColor = cfg.hoverBorder;
        el.style.boxShadow = `0 0 32px ${cfg.hoverShadow}`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.background = "var(--pg-surface)";
        el.style.borderColor = "var(--pg-border)";
        el.style.boxShadow = "none";
      }}
    >
      {/* Role-coloured accent strip */}
      <div
        style={{
          height: "2px",
          background: `linear-gradient(90deg, ${cfg.bar}cc 0%, ${cfg.bar}22 60%, transparent 100%)`,
        }}
      />

      <div className="flex flex-col flex-1 p-5">

        {/* Category chip + year */}
        <div className="flex items-center justify-between mb-4">
          <span
            className="text-[11px] font-semibold px-2.5 py-1 rounded-full tracking-wide"
            style={{ color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.border}` }}
          >
            {cfg.label}
          </span>
          <span className="text-xs tabular-nums" style={{ color: "var(--color-pg-text-3)" }}>
            {project.year}
          </span>
        </div>

        {/* Title */}
        <h3
          className="text-base font-bold leading-snug mb-2.5"
          style={{ color: "var(--color-pg-text-1)" }}
        >
          {project.title}
        </h3>

        {/* Description — 3-line clamp keeps cards scannable */}
        <p
          className="text-sm leading-relaxed flex-1 line-clamp-3"
          style={{ color: "var(--color-pg-text-2)" }}
        >
          {project.description}
        </p>

        {/* Highlight stat */}
        {project.highlight && (
          <div
            className="mt-4 px-3 py-2.5 rounded-lg"
            style={{
              background: cfg.bg,
              border: `1px solid ${cfg.border}`,
            }}
          >
            <p className="text-xs font-mono leading-relaxed" style={{ color: "var(--color-pg-text-2)" }}>
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
            <span
              className="px-2 py-0.5 text-xs"
              style={{ color: "var(--color-pg-text-3)" }}
            >
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
              className="flex items-center gap-1.5 text-xs transition-colors duration-200"
              style={{ color: "var(--color-pg-text-3)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-pg-text-1)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-pg-text-3)")}
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
              className="flex items-center gap-1.5 text-xs transition-colors duration-200"
              style={{ color: "var(--color-pg-text-3)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-pg-text-1)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-pg-text-3)")}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Demo
            </a>
          )}

          {/* Primary CTA — styled as a mini button */}
          <Link
            href={`/projects/${project.id}`}
            className="ml-auto flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-200"
            style={{
              background: cfg.bg,
              border: `1px solid ${cfg.border}`,
              color: cfg.color,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = cfg.hoverBg)}
            onMouseLeave={(e) => (e.currentTarget.style.background = cfg.bg)}
          >
            Case Study
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </article>
  );
}
