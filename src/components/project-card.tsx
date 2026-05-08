"use client";

import Link from "next/link";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";

const GithubIcon = () => (
  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const statusDot: Record<Project["status"], string> = {
  live:     "bg-emerald-400",
  wip:      "bg-amber-400",
  research: "bg-blue-400",
};

const statusLabel: Record<Project["status"], string> = {
  live:     "Live",
  wip:      "In Progress",
  research: "Research",
};

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article
      className="group relative flex flex-col rounded-2xl p-5 transition-all duration-300"
      style={{
        background: "var(--pg-surface)",
        border: "1px solid var(--pg-border)",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.background = "var(--pg-surface-hover)";
        el.style.borderColor = "rgba(126,184,247,0.35)";
        el.style.boxShadow = "0 0 28px rgba(126,184,247,0.08)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.background = "var(--pg-surface)";
        el.style.borderColor = "var(--pg-border)";
        el.style.boxShadow = "none";
      }}
    >
      {/* Featured indicator */}
      {project.featured && (
        <span
          className="absolute top-4 right-4 flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full"
          style={{
            color: "#f59e0b",
            background: "rgba(245,158,11,0.1)",
            border: "1px solid rgba(245,158,11,0.2)",
          }}
        >
          ★ Featured
        </span>
      )}

      {/* Status + year row */}
      <div className="flex items-center gap-2 mb-4">
        <span className={`h-1.5 w-1.5 rounded-full ${statusDot[project.status]}`} />
        <span className="text-xs" style={{ color: "var(--color-pg-text-3)" }}>
          {statusLabel[project.status]}
        </span>
        <span className="text-xs ml-auto" style={{ color: "var(--color-pg-text-3)" }}>
          {project.year}
        </span>
      </div>

      {/* Title */}
      <h3
        className="text-[15px] font-semibold leading-snug mb-2"
        style={{ color: "var(--color-pg-text-1)" }}
      >
        {project.title}
      </h3>

      {/* Description */}
      <p
        className="text-sm leading-relaxed flex-1"
        style={{ color: "var(--color-pg-text-2)" }}
      >
        {project.description}
      </p>

      {/* Highlight stat */}
      {project.highlight && (
        <div
          className="mt-4 px-3 py-2 rounded-lg"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <p className="text-xs font-mono" style={{ color: "var(--color-pg-text-2)" }}>
            ↳ {project.highlight}
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
            className="px-2 py-0.5 rounded-md text-xs"
            style={{ color: "var(--color-pg-text-3)" }}
          >
            +{project.tags.length - 4}
          </span>
        )}
      </div>

      {/* Action row */}
      <div
        className="flex items-center gap-4 mt-5 pt-4"
        style={{ borderTop: "1px solid var(--pg-border)" }}
      >
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
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
        <Link
          href={`/projects/${project.id}`}
          className="ml-auto flex items-center gap-1 text-xs font-medium transition-colors duration-200"
          style={{ color: "var(--color-pg-accent)" }}
        >
          Case Study
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
}
