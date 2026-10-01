"use client";

import { motion } from "motion/react";
import { Brain, Code2, Database, Layers, Monitor, Cpu, Wrench } from "lucide-react";
import { skillGroups } from "@/data/skills";
import { MaskText } from "@/components/mask-text";

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "Core Stack":      Layers,
  "AI & ML":         Brain,
  "Languages":       Code2,
  "Data":            Cpu,
  "Frontend":        Monitor,
  "Backend & Infra": Database,
};

export function SkillsBento() {
  return (
    <section
      id="skills"
      className="section-primary py-24"
    >
      <div className="section-container">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
          className="mb-12"
        >
          <p className="section-label mb-3">Stack</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-pg-text-1">
            <MaskText text="Technical Skills" />
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed" style={{ color: "var(--pg-text-2)" }}>
            A toolkit spanning applied AI/ML, backend engineering, data workflows, and software development.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {skillGroups.map((group, i) => {
            const Icon = categoryIcons[group.category] ?? Wrench;
            return (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className={`group relative rounded-2xl p-6 transition-all duration-300 ${
                  group.span === "double" ? "md:col-span-2" : ""
                }`}
                style={{
                  background: "var(--pg-surface)",
                  border: "1px solid var(--pg-border)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(126,184,247,0.25)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--pg-border)")}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: "color-mix(in srgb, var(--pg-accent) 4%, transparent)", filter: "blur(20px)" }}
                />

                {/* Category header */}
                <div className="relative flex items-center gap-3 mb-5">
                  <div
                    className="flex items-center justify-center w-9 h-9 rounded-xl shrink-0"
                    style={{
                      background: "color-mix(in srgb, var(--pg-accent) 10%, transparent)",
                      border: "1px solid color-mix(in srgb, var(--pg-accent) 18%, transparent)",
                    }}
                  >
                    <span style={{ color: "var(--pg-accent)" }}><Icon className="w-4 h-4" /></span>
                  </div>
                  <h3 className="text-sm font-semibold text-pg-text-1">{group.category}</h3>
                </div>

                {/* Skill chips */}
                <div className="relative flex flex-wrap gap-2">
                  {group.skills.map((skill, si) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.25, delay: 0.2 + si * 0.04 }}
                      className="skill-chip text-xs"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Currently exploring note */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 text-sm text-center"
          style={{ color: "var(--pg-text-2)" }}
        >
          Current focus:{" "}
          <span style={{ color: "var(--pg-accent)" }}>applied AI/ML</span>
          {", "}
          <span style={{ color: "var(--pg-accent)" }}>backend systems</span>
          {", and "}
          <span style={{ color: "var(--pg-accent)" }}>model evaluation</span>.
        </motion.p>

      </div>
    </section>
  );
}
