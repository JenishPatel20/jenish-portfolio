"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { ExternalLink, ArrowUpRight, Star } from "lucide-react";

const GithubIcon = () => (
  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);
import { Badge } from "@/components/ui/badge";
import { projects, type RoleFilter } from "@/data/projects";

const filters: { label: string; value: RoleFilter | "all" }[] = [
  { label: "All Projects", value: "all" },
  { label: "AI & ML", value: "ai-ml" },
  { label: "Full Stack", value: "full-stack" },
  { label: "Systems", value: "systems" },
  { label: "Mobile", value: "mobile" },
];

interface ProjectsProps {
  recruiterMode: boolean;
}

export function Projects({ recruiterMode }: ProjectsProps) {
  const [activeFilter, setActiveFilter] = useState<RoleFilter | "all">("all");

  const displayed = projects.filter((p) => {
    if (recruiterMode) return p.featured;
    if (activeFilter === "all") return true;
    return p.roles.includes(activeFilter);
  });

  return (
    <section id="projects" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-2">
            Work
          </p>
          <h2 className="text-4xl font-bold text-slate-900">Projects</h2>
          <p className="text-slate-500 mt-3 max-w-xl">
            A selection of things I&apos;ve built — from browser-native AI to systems tooling.
          </p>
        </motion.div>

        {/* Role Matcher filters */}
        {!recruiterMode && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex flex-wrap gap-2 mb-10"
          >
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                  activeFilter === f.value
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {f.label}
              </button>
            ))}
          </motion.div>
        )}

        {/* Cards grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {displayed.map((project, i) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className="group relative flex flex-col bg-white border border-slate-200 rounded-2xl p-6 card-glow transition-all duration-300 hover:-translate-y-1"
              >
                {/* Featured badge */}
                {project.featured && (
                  <span className="absolute top-4 right-4 flex items-center gap-1 text-xs font-medium text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                    <Star className="w-3 h-3" />
                    Featured
                  </span>
                )}

                {/* Status dot */}
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      project.status === "live"
                        ? "bg-emerald-400"
                        : project.status === "wip"
                        ? "bg-amber-400"
                        : "bg-blue-400"
                    }`}
                  />
                  <span className="text-xs text-slate-400 capitalize">
                    {project.status === "wip" ? "In Progress" : project.status}
                  </span>
                  <span className="text-xs text-slate-300 ml-auto">{project.year}</span>
                </div>

                <h3 className="text-lg font-semibold text-slate-900 mb-2 leading-snug">
                  {project.title}
                </h3>

                <p className="text-sm text-slate-500 leading-relaxed flex-1">
                  {project.description}
                </p>

                {/* Highlight stat */}
                {project.highlight && (
                  <div className="mt-4 px-3 py-2 bg-slate-50 border border-slate-100 rounded-lg">
                    <p className="text-xs font-mono text-slate-600">
                      ↳ {project.highlight}
                    </p>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {project.tags.slice(0, 4).map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-xs font-normal bg-slate-100 text-slate-600 border-0"
                    >
                      {tag}
                    </Badge>
                  ))}
                  {project.tags.length > 4 && (
                    <Badge
                      variant="secondary"
                      className="text-xs font-normal bg-slate-100 text-slate-400 border-0"
                    >
                      +{project.tags.length - 4}
                    </Badge>
                  )}
                </div>

                {/* Links */}
                <div className="flex items-center gap-3 mt-5 pt-4 border-t border-slate-100">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 transition-colors duration-200"
                    >
                      <GithubIcon />
                      Code
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 transition-colors duration-200"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Live Demo
                    </a>
                  )}
                  <a
                    href={`/projects/${project.id}`}
                    className="ml-auto flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200"
                  >
                    Case Study
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {displayed.length === 0 && (
          <p className="text-center text-slate-400 py-16">No projects match this filter.</p>
        )}
      </div>
    </section>
  );
}
