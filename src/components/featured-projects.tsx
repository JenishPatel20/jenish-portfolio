"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProjectCard } from "@/components/project-card";
import { projects, type RoleFilter } from "@/data/projects";

const filters: { label: string; value: RoleFilter | "all" }[] = [
  { label: "All",        value: "all" },
  { label: "AI & ML",   value: "ai-ml" },
  { label: "Full Stack", value: "full-stack" },
  { label: "Systems",   value: "systems" },
  { label: "Mobile",    value: "mobile" },
];

interface FeaturedProjectsProps {
  recruiterMode: boolean;
}

export function FeaturedProjects({ recruiterMode }: FeaturedProjectsProps) {
  const [activeFilter, setActiveFilter] = useState<RoleFilter | "all">("all");

  const displayed = projects.filter((p) => {
    if (recruiterMode) return p.featured;
    if (activeFilter === "all") return true;
    return p.roles.includes(activeFilter);
  });

  return (
    <section id="projects" className="py-24" style={{ backgroundColor: "#09090f" }}>
      <div className="section-container">

        {/* Heading row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10"
        >
          <div>
            <p className="section-label mb-2">Work</p>
            <h2
              className="text-3xl sm:text-4xl font-bold tracking-tight"
              style={{ color: "var(--color-pg-text-1)" }}
            >
              Projects
            </h2>
          </div>
          <Link
            href="/projects"
            className="flex items-center gap-1.5 text-sm transition-colors duration-200 self-start sm:self-auto"
            style={{ color: "var(--color-pg-text-3)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-pg-text-1)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-pg-text-3)")}
          >
            View all
            <ArrowRight className="w-4 h-4" />
          </Link>
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
                className={activeFilter === f.value ? "filter-pill-active" : "filter-pill"}
              >
                {f.label}
              </button>
            ))}
          </motion.div>
        )}

        {/* Cards grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {displayed.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.28, delay: i * 0.05 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {displayed.length === 0 && (
          <p
            className="text-center py-16 text-sm"
            style={{ color: "var(--color-pg-text-3)" }}
          >
            No projects match this filter.
          </p>
        )}
      </div>
    </section>
  );
}
