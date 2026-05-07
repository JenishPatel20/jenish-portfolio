import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { projects, type RoleFilter } from "@/data/projects";

// ─── Static generation ────────────────────────────────────────────────────────

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  if (!project) return {};
  return {
    title: `${project.title} — Jenish Patel`,
    description: project.description,
  };
}

// ─── Constants ────────────────────────────────────────────────────────────────

const STATUS_CONFIG = {
  live:     { dot: "bg-emerald-400", label: "Live",        color: "rgba(52,211,153,0.12)", border: "rgba(52,211,153,0.25)", text: "#34d399" },
  wip:      { dot: "bg-amber-400",   label: "In Progress", color: "rgba(251,191,36,0.10)", border: "rgba(251,191,36,0.22)", text: "#fbbf24" },
  research: { dot: "bg-blue-400",    label: "Research",    color: "rgba(96,165,250,0.10)",  border: "rgba(96,165,250,0.22)",  text: "#60a5fa" },
} as const;

const ROLE_LABELS: Record<RoleFilter, string> = {
  "ai-ml":      "AI / ML",
  "full-stack":  "Full Stack",
  "systems":     "Systems",
  "mobile":      "Mobile",
};

// ─── Inline SVG icons ─────────────────────────────────────────────────────────

function GithubIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function TechBadge({ label }: { label: string }) {
  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium transition-colors duration-200"
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.09)",
        color: "rgba(255,255,255,0.65)",
      }}
    >
      {label}
    </span>
  );
}

function SidebarLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[10px] font-semibold uppercase tracking-widest mb-2"
      style={{ color: "var(--color-pg-blue)" }}
    >
      {children}
    </p>
  );
}

function SectionBlock({
  heading,
  accentColor,
  children,
}: {
  heading: string;
  accentColor?: string;
  children: React.ReactNode;
}) {
  return (
    <section aria-labelledby={`section-${heading.toLowerCase().replace(/\s+/g, "-")}`}>
      <div className="flex items-center gap-3 mb-5">
        <div
          className="h-5 w-0.5 rounded-full shrink-0"
          style={{ background: accentColor ?? "var(--color-pg-blue)" }}
          aria-hidden="true"
        />
        <h2
          id={`section-${heading.toLowerCase().replace(/\s+/g, "-")}`}
          className="text-lg font-semibold tracking-tight"
          style={{ color: "var(--color-pg-text-1)" }}
        >
          {heading}
        </h2>
      </div>
      {children}
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  if (!project) notFound();

  const status = STATUS_CONFIG[project.status];
  const roleLabels = project.roles.map((r) => ROLE_LABELS[r]);

  // Derive neighbouring slugs for prev/next
  const idx = projects.indexOf(project);
  const prev = idx > 0 ? projects[idx - 1] : null;
  const next = idx < projects.length - 1 ? projects[idx + 1] : null;

  return (
    <>
      <SiteHeader />

      <main className="min-h-screen" style={{ backgroundColor: "#09090f" }}>

        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <div
          className="relative border-b hero-grid"
          style={{ borderColor: "rgba(255,255,255,0.07)" }}
        >
          {/* radial glow */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(96,165,250,0.07) 0%, transparent 70%)",
            }}
            aria-hidden="true"
          />

          <div className="relative max-w-6xl mx-auto px-6 pt-28 pb-16">

            {/* Back link */}
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-sm mb-10 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 rounded"
              style={{ color: "var(--color-pg-text-3)" }}
              onMouseEnter={undefined}
            >
              <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
              All Projects
            </Link>

            {/* Meta badges */}
            <div className="flex flex-wrap items-center gap-2 mb-5" role="list" aria-label="Project metadata">
              {/* Status */}
              <span
                role="listitem"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
                style={{
                  background: status.color,
                  border: `1px solid ${status.border}`,
                  color: status.text,
                }}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} aria-hidden="true" />
                {status.label}
              </span>

              {/* Roles */}
              {roleLabels.map((label) => (
                <span
                  key={label}
                  role="listitem"
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
                  style={{
                    background: "rgba(167,139,250,0.08)",
                    border: "1px solid rgba(167,139,250,0.20)",
                    color: "var(--color-pg-violet)",
                  }}
                >
                  {label}
                </span>
              ))}

              {/* Year */}
              <span
                role="listitem"
                className="text-xs px-3 py-1 rounded-full"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "var(--color-pg-text-3)",
                }}
              >
                {project.year}
              </span>
            </div>

            {/* Title */}
            <h1
              className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight mb-5 max-w-3xl"
              style={{ color: "var(--color-pg-text-1)" }}
            >
              {project.title}
            </h1>

            {/* Lead description */}
            <p
              className="text-base sm:text-lg leading-relaxed mb-8 max-w-2xl"
              style={{ color: "var(--color-pg-text-2)" }}
            >
              {project.description}
            </p>

            {/* Highlight metric */}
            {project.highlight && (
              <div
                className="inline-flex items-start gap-3 px-4 py-3 rounded-xl mb-8"
                style={{
                  background: "rgba(34,211,238,0.05)",
                  border: "1px solid rgba(34,211,238,0.14)",
                }}
              >
                <span
                  className="text-sm mt-px shrink-0"
                  style={{ color: "var(--color-pg-cyan)" }}
                  aria-hidden="true"
                >
                  ↳
                </span>
                <p
                  className="text-sm font-mono leading-relaxed"
                  style={{ color: "var(--color-pg-text-2)" }}
                >
                  {project.highlight}
                </p>
              </div>
            )}

            {/* Action links */}
            <div className="flex flex-wrap items-center gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60"
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.13)",
                    color: "var(--color-pg-text-1)",
                  }}
                  aria-label={`View ${project.title} source code on GitHub`}
                >
                  <GithubIcon />
                  View Code
                </a>
              )}
              {project.demo && project.demo !== "#" && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "var(--color-pg-text-2)",
                  }}
                  aria-label={`Open live demo for ${project.title}`}
                >
                  <ExternalLink className="w-4 h-4 shrink-0" aria-hidden="true" />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </div>

        {/* ── Body: article + sidebar ───────────────────────────────────────── */}
        <div className="max-w-6xl mx-auto px-6 py-16 lg:py-20">
          <div className="lg:grid lg:grid-cols-[1fr_256px] lg:gap-16 xl:gap-20">

            {/* ── Main article ─────────────────────────────────────────────── */}
            <article className="space-y-14 min-w-0">

              {/* Overview */}
              {(project.overview ?? project.description) && (
                <SectionBlock heading="Overview" accentColor="var(--color-pg-cyan)">
                  <p
                    className="text-base leading-relaxed"
                    style={{ color: "var(--color-pg-text-2)" }}
                  >
                    {project.overview ?? project.description}
                  </p>
                </SectionBlock>
              )}

              {/* Architecture & Approach */}
              {project.approach && (
                <SectionBlock heading="Architecture & Approach" accentColor="var(--color-pg-blue)">
                  <p
                    className="text-base leading-relaxed"
                    style={{ color: "var(--color-pg-text-2)" }}
                  >
                    {project.approach}
                  </p>
                </SectionBlock>
              )}

              {/* Results & Outcome */}
              {(project.results ?? project.highlight) && (
                <SectionBlock heading="Results & Outcome" accentColor="var(--color-pg-violet)">
                  {project.results ? (
                    <p
                      className="text-base leading-relaxed"
                      style={{ color: "var(--color-pg-text-2)" }}
                    >
                      {project.results}
                    </p>
                  ) : (
                    <p
                      className="text-sm font-mono"
                      style={{ color: "var(--color-pg-text-2)" }}
                    >
                      {project.highlight}
                    </p>
                  )}
                </SectionBlock>
              )}

              {/* Tech Stack (mobile — shown below article, above nav) */}
              <div className="lg:hidden">
                <SectionBlock heading="Tech Stack" accentColor="var(--color-pg-blue)">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <TechBadge key={tag} label={tag} />
                    ))}
                  </div>
                </SectionBlock>
              </div>

              {/* Prev / Next navigation */}
              {(prev || next) && (
                <nav
                  aria-label="Project navigation"
                  className="pt-10 border-t"
                  style={{ borderColor: "rgba(255,255,255,0.07)" }}
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      {prev && (
                        <Link
                          href={`/projects/${prev.id}`}
                          className="group flex flex-col gap-1 p-4 rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60"
                          style={{
                            background: "rgba(255,255,255,0.03)",
                            border: "1px solid rgba(255,255,255,0.07)",
                          }}
                        >
                          <span
                            className="text-xs"
                            style={{ color: "var(--color-pg-text-3)" }}
                          >
                            ← Previous
                          </span>
                          <span
                            className="text-sm font-medium leading-snug transition-colors duration-200 group-hover:text-white"
                            style={{ color: "var(--color-pg-text-2)" }}
                          >
                            {prev.title}
                          </span>
                        </Link>
                      )}
                    </div>
                    <div className="flex justify-end">
                      {next && (
                        <Link
                          href={`/projects/${next.id}`}
                          className="group flex flex-col gap-1 p-4 rounded-xl text-right transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60"
                          style={{
                            background: "rgba(255,255,255,0.03)",
                            border: "1px solid rgba(255,255,255,0.07)",
                          }}
                        >
                          <span
                            className="text-xs"
                            style={{ color: "var(--color-pg-text-3)" }}
                          >
                            Next →
                          </span>
                          <span
                            className="text-sm font-medium leading-snug transition-colors duration-200 group-hover:text-white"
                            style={{ color: "var(--color-pg-text-2)" }}
                          >
                            {next.title}
                          </span>
                        </Link>
                      )}
                    </div>
                  </div>
                </nav>
              )}
            </article>

            {/* ── Sidebar (desktop only) ────────────────────────────────────── */}
            <aside className="hidden lg:block" aria-label="Project details">
              <div
                className="sticky top-24 rounded-2xl p-6 space-y-6"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >

                {/* Tech Stack */}
                <div>
                  <SidebarLabel>Tech Stack</SidebarLabel>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <TechBadge key={tag} label={tag} />
                    ))}
                  </div>
                </div>

                <div
                  className="h-px"
                  style={{ background: "rgba(255,255,255,0.07)" }}
                  aria-hidden="true"
                />

                {/* Category */}
                <div>
                  <SidebarLabel>Category</SidebarLabel>
                  <div className="flex flex-wrap gap-1.5">
                    {roleLabels.map((label) => (
                      <span
                        key={label}
                        className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium"
                        style={{
                          background: "rgba(167,139,250,0.08)",
                          border: "1px solid rgba(167,139,250,0.18)",
                          color: "var(--color-pg-violet)",
                        }}
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Status */}
                <div>
                  <SidebarLabel>Status</SidebarLabel>
                  <span
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium"
                    style={{
                      background: status.color,
                      border: `1px solid ${status.border}`,
                      color: status.text,
                    }}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} aria-hidden="true" />
                    {status.label}
                  </span>
                </div>

                {/* Year */}
                <div>
                  <SidebarLabel>Year</SidebarLabel>
                  <p
                    className="text-sm font-medium"
                    style={{ color: "var(--color-pg-text-2)" }}
                  >
                    {project.year}
                  </p>
                </div>

                <div
                  className="h-px"
                  style={{ background: "rgba(255,255,255,0.07)" }}
                  aria-hidden="true"
                />

                {/* Links */}
                <div className="space-y-2">
                  <SidebarLabel>Links</SidebarLabel>
                  {project.github ? (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: "var(--color-pg-text-2)",
                      }}
                      aria-label={`View ${project.title} source code on GitHub`}
                    >
                      <GithubIcon />
                      GitHub Repository
                    </a>
                  ) : (
                    <p
                      className="text-xs italic"
                      style={{ color: "var(--color-pg-text-3)" }}
                    >
                      Repository private
                    </p>
                  )}
                  {project.demo && project.demo !== "#" && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: "var(--color-pg-text-2)",
                      }}
                      aria-label={`Open live demo for ${project.title}`}
                    >
                      <ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      Live Demo
                    </a>
                  )}
                </div>

              </div>
            </aside>

          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
