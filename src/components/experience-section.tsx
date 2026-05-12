"use client";

import { motion } from "motion/react";
import { experiences } from "@/data/experience";

const typeLabel: Record<string, string> = {
  "full-time":  "Full-time",
  "part-time":  "Part-time",
  "co-op":      "Co-op",
  "internship": "Internship",
};

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="py-24"
      style={{ backgroundColor: "#000000" }}
    >
      <div className="section-container">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
          className="mb-12"
        >
          <p className="section-label mb-2">Career</p>
          <h2
            className="text-3xl sm:text-4xl font-bold tracking-tight"
            style={{ color: "var(--color-pg-text-1)" }}
          >
            Experience
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="space-y-6">
          {experiences.map((exp, ei) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: ei * 0.08 }}
              className="glass-card p-6 sm:p-8"
            >
              {/* Company header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 mb-6">
                <div>
                  <h3
                    className="text-lg font-bold tracking-tight"
                    style={{ color: "var(--color-pg-text-1)" }}
                  >
                    {exp.company}
                  </h3>
                  <p
                    className="text-sm mt-0.5"
                    style={{ color: "var(--color-pg-text-3)" }}
                  >
                    {exp.companyTagline}
                  </p>
                </div>
              </div>

              {/* Roles */}
              <div className="space-y-8">
                {exp.roles.map((role, ri) => (
                  <div key={ri}>
                    {/* Role meta row */}
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <span
                        className="text-sm font-semibold"
                        style={{ color: "var(--color-pg-text-1)" }}
                      >
                        {role.title}
                      </span>

                      <span
                        className="h-3 w-px"
                        style={{ background: "var(--pg-border)" }}
                      />

                      <span
                        className="text-xs font-medium px-2 py-0.5 rounded-full"
                        style={{
                          color: "var(--color-pg-accent)",
                          background: "rgba(126,184,247,0.08)",
                          border: "1px solid rgba(126,184,247,0.18)",
                        }}
                      >
                        {typeLabel[role.type]}
                      </span>

                      <span
                        className="text-xs"
                        style={{ color: "var(--color-pg-text-3)" }}
                      >
                        {role.startDate} – {role.endDate}
                      </span>

                      <span
                        className="text-xs"
                        style={{ color: "var(--color-pg-text-3)" }}
                      >
                        · {role.location}
                      </span>
                    </div>

                    {/* Bullet points */}
                    <ul className="space-y-3 mb-5">
                      {role.bullets.map((bullet, bi) => (
                        <li key={bi} className="flex gap-3">
                          <span
                            className="mt-[7px] h-1 w-1 shrink-0 rounded-full"
                            style={{ background: "var(--color-pg-accent)" }}
                          />
                          <span
                            className="text-sm leading-relaxed"
                            style={{ color: "var(--color-pg-text-2)" }}
                          >
                            {bullet}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {role.tags.map((tag) => (
                        <span key={tag} className="skill-chip text-xs px-2 py-0.5">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
