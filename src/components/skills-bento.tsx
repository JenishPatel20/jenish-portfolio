"use client";

import { motion } from "motion/react";
import { skillGroups } from "@/data/skills";

export function SkillsBento() {
  return (
    <section
      id="skills"
      className="py-24"
      style={{ backgroundColor: "#0c0c14" }}
    >
      <div className="section-container">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
          className="mb-12"
        >
          <p className="section-label mb-2">Stack</p>
          <h2
            className="text-3xl sm:text-4xl font-bold tracking-tight"
            style={{ color: "var(--color-pg-text-1)" }}
          >
            Skills
          </h2>
        </motion.div>

        {/* Bento grid — doubles span 2 cols on md+ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className={`glass-card p-5 ${group.span === "double" ? "md:col-span-2" : ""}`}
            >
              <p
                className="text-[10px] font-semibold uppercase tracking-widest mb-3"
                style={{ color: "var(--color-pg-blue)" }}
              >
                {group.category}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span key={skill} className="skill-chip">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
