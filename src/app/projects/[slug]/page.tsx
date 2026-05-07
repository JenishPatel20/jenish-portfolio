import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  if (!project) return {};
  return {
    title: `${project.title} — Jenish Patel`,
    description: project.description,
  };
}

const GithubIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const statusConfig = {
  live:     { dot: "bg-emerald-400", label: "Live" },
  wip:      { dot: "bg-amber-400",   label: "In Progress" },
  research: { dot: "bg-blue-400",    label: "Research" },
};

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  if (!project) notFound();

  const status = statusConfig[project.status];

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen pt-24 pb-20" style={{ backgroundColor: "#09090f" }}>
        <div className="max-w-3xl mx-auto px-6">

          <a
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm mb-10 text-pg-text-3 hover:text-pg-text-1 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            All projects
          </a>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-5">
              <span
                className="flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full text-pg-text-2 bg-white/5 border border-white/8"
              >
                <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
                {status.label}
              </span>
              <span className="text-sm text-pg-text-3">{project.year}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight mb-4 text-pg-text-1">
              {project.title}
            </h1>

            <p className="text-lg leading-relaxed text-pg-text-2">{project.description}</p>
          </div>

          {/* Highlight */}
          {project.highlight && (
            <div className="mb-8 px-4 py-3 rounded-xl bg-white/5 border border-white/8">
              <p className="text-sm font-mono text-pg-text-2">↳ {project.highlight}</p>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag) => (
              <span key={tag} className="skill-chip">{tag}</span>
            ))}
          </div>

          {/* Links */}
          <div className="flex items-center gap-3 mb-12 pb-12 border-b border-white/8">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-white/8 hover:bg-white/12 border border-white/12 hover:border-white/20 text-pg-text-1 transition-all duration-200"
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
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-white/5 hover:bg-white/8 border border-white/8 hover:border-white/15 text-pg-text-2 hover:text-pg-text-1 transition-all duration-200"
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
            )}
          </div>

          {/* Case study body */}
          <div className="space-y-10">
            {[
              { heading: "Overview",           body: project.overview ?? project.description },
              { heading: "Technical Approach", body: project.approach ?? null },
              { heading: "Results",            body: project.results ?? project.highlight ?? null },
            ].map(({ heading, body }) => (
              <div key={heading}>
                <h2 className="text-xl font-semibold mb-3 text-pg-text-1">{heading}</h2>
                {body ? (
                  <p className="leading-relaxed text-pg-text-2">{body}</p>
                ) : (
                  <p className="leading-relaxed italic text-pg-text-3">
                    Coming soon — check the GitHub repo for implementation details.
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
