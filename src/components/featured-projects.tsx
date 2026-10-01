"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProjectCard } from "@/components/project-card";
import { projects, type RoleFilter } from "@/data/projects";
import { MaskText } from "@/components/mask-text";

const filters: { label: string; value: RoleFilter | "all" }[] = [
  { label: "All", value: "all" },
  { label: "AI & ML", value: "ai-ml" },
  { label: "Full Stack", value: "full-stack" },
  { label: "Systems", value: "systems" },
  { label: "Mobile", value: "mobile" },
];

interface FeaturedProjectsProps {
  recruiterMode: boolean;
}

export function FeaturedProjects({ recruiterMode }: FeaturedProjectsProps) {
  const [activeFilter, setActiveFilter] = useState<RoleFilter | "all">("all");

  const displayed = useMemo(() => {
    const priority = [
      "edge-ai-benchmark",
      "industrial-anomaly-detection",
      "auction-master",
      "customer-churn",
      "ai-localization",
      "android-photo-manager",
      "chess-engine",
    ];

    return projects
      .filter((project) => {
        if (recruiterMode && !project.featured) return false;
        if (activeFilter === "all") return true;
        return project.roles.includes(activeFilter);
      })
      .sort((a, b) => priority.indexOf(a.id) - priority.indexOf(b.id));
  }, [activeFilter, recruiterMode]);

  return (
    <section id="projects" className="section-alt py-24">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
          className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="section-label mb-2">Work</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: "var(--pg-text-1)" }}>
              <MaskText text="Selected engineering work" />
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed" style={{ color: "var(--pg-text-2)" }}>
              Evidence-first case studies across applied AI/ML, backend systems, and software engineering.
            </p>
          </div>

          <Link
            href="/projects"
            className="flex items-center gap-1.5 self-start text-sm transition-colors duration-200 sm:self-auto"
            style={{ color: "var(--pg-text-3)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--pg-text-1)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--pg-text-3)")}
          >
            View all
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {!recruiterMode && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mt-8 flex flex-wrap gap-2"
          >
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={activeFilter === filter.value ? "filter-pill-active" : "filter-pill"}
              >
                {filter.label}
              </button>
            ))}
          </motion.div>
        )}

        <motion.div layout className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {displayed.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                className={index === 0 && activeFilter === "all" ? "project-spotlight-shell md:col-span-2 lg:col-span-2" : ""}
                initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: false, amount: 0.08 }}
                exit={{ opacity: 0, scale: 0.96, filter: "blur(6px)" }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
              >
                <ProjectCard project={project} spotlight={index === 0 && activeFilter === "all"} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {displayed.length === 0 && (
          <p className="py-16 text-center text-sm" style={{ color: "var(--pg-text-3)" }}>
            No projects match this filter.
          </p>
        )}
      </div>
    </section>
  );
}
