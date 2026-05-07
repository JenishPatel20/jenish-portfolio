"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import { ProjectCard } from "@/components/project-card";
import { projects, type RoleFilter } from "@/data/projects";

interface RoleDef {
  id: string;
  label: string;
  filters: RoleFilter[];
  description: string;
  color: string;
  bg: string;
  border: string;
}

const ROLES: RoleDef[] = [
  {
    id: "ai-engineer",
    label: "AI Engineer",
    filters: ["ai-ml"],
    description:
      "For AI Engineer roles, these projects show ML, LLM workflows, PyTorch, and applied AI systems.",
    color: "var(--color-pg-cyan)",
    bg: "rgba(34,211,238,0.07)",
    border: "rgba(34,211,238,0.28)",
  },
  {
    id: "software-engineer",
    label: "Software Engineer",
    filters: ["full-stack", "systems"],
    description:
      "For Software Engineer roles, these projects demonstrate backend API design, system architecture, and data engineering.",
    color: "var(--color-pg-blue)",
    bg: "rgba(96,165,250,0.07)",
    border: "rgba(96,165,250,0.28)",
  },
  {
    id: "full-stack",
    label: "Full Stack",
    filters: ["full-stack"],
    description:
      "For Full Stack roles, these projects cover end-to-end product development: relational databases, REST APIs, and multi-page frontends.",
    color: "var(--color-pg-violet)",
    bg: "rgba(167,139,250,0.07)",
    border: "rgba(167,139,250,0.28)",
  },
  {
    id: "mobile",
    label: "Mobile / iOS",
    filters: ["mobile"],
    description:
      "For Mobile roles, these projects show native Android development with complex Activity navigation and on-device persistence.",
    color: "#34d399",
    bg: "rgba(52,211,153,0.07)",
    border: "rgba(52,211,153,0.28)",
  },
  {
    id: "systems",
    label: "Systems / Performance",
    filters: ["systems"],
    description:
      "For Systems and Performance roles, these projects highlight algorithms, OOP design, and efficient data structure usage.",
    color: "#fb923c",
    bg: "rgba(251,146,60,0.07)",
    border: "rgba(251,146,60,0.28)",
  },
];

export function RoleMatcher() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = ROLES.find((r) => r.id === activeId) ?? null;

  const sorted = useMemo(() => {
    if (!active) return projects;
    const match = projects.filter((p) =>
      p.roles.some((r) => active.filters.includes(r))
    );
    const rest = projects.filter(
      (p) => !p.roles.some((r) => active.filters.includes(r))
    );
    return [...match, ...rest];
  }, [active]);

  return (
    <section
      id="role-matcher"
      className="py-24"
      style={{ backgroundColor: "#0b0b13" }}
    >
      <div className="section-container">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
          className="mb-10"
        >
          <p className="section-label mb-2">Recruiter Tool</p>
          <h2
            className="text-3xl sm:text-4xl font-bold tracking-tight"
            style={{ color: "var(--color-pg-text-1)" }}
          >
            Role Matcher
          </h2>
          <p
            className="mt-3 text-sm max-w-lg"
            style={{ color: "var(--color-pg-text-2)" }}
          >
            Select the role you&apos;re hiring for — the most relevant projects
            surface to the top automatically.
          </p>
        </motion.div>

        {/* Role buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-3"
        >
          {ROLES.map((role) => {
            const isActive = activeId === role.id;
            return (
              <button
                key={role.id}
                onClick={() => setActiveId(isActive ? null : role.id)}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
                style={
                  isActive
                    ? {
                        color: role.color,
                        background: role.bg,
                        border: `1px solid ${role.border}`,
                      }
                    : {
                        color: "var(--color-pg-text-2)",
                        background: "var(--pg-surface)",
                        border: "1px solid var(--pg-border)",
                      }
                }
              >
                {role.label}
              </button>
            );
          })}

          <AnimatePresence>
            {active && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.15 }}
                onClick={() => setActiveId(null)}
                className="px-3 py-2 rounded-full text-sm transition-colors duration-200"
                style={{
                  color: "var(--color-pg-text-3)",
                  border: "1px solid transparent",
                }}
              >
                Clear ×
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Role description */}
        <div className="mb-10" style={{ minHeight: "1.5rem" }}>
          <AnimatePresence mode="wait">
            {active && (
              <motion.p
                key={active.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.18 }}
                className="text-sm font-medium"
                style={{ color: active.color }}
              >
                {active.description}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Project grid */}
        <LayoutGroup>
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sorted.map((project) => {
              const isMatch =
                !active ||
                project.roles.some((r) => active.filters.includes(r));

              return (
                <motion.div
                  key={project.id}
                  layout
                  animate={{
                    opacity: isMatch ? 1 : 0.3,
                    scale: isMatch ? 1 : 0.98,
                  }}
                  transition={{ duration: 0.3, layout: { duration: 0.4, type: "spring", bounce: 0.15 } }}
                  style={
                    isMatch && active
                      ? {
                          borderRadius: "1rem",
                          boxShadow: `0 0 0 1.5px ${active.border}, 0 4px 24px ${active.bg}`,
                        }
                      : { borderRadius: "1rem" }
                  }
                >
                  <ProjectCard project={project} />
                </motion.div>
              );
            })}
          </motion.div>
        </LayoutGroup>
      </div>
    </section>
  );
}
