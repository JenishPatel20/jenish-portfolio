"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { experiences } from "@/data/experience";
import { MaskText } from "@/components/mask-text";

const TYPE_LABEL: Record<string, string> = {
  "full-time":  "Full-time",
  "part-time":  "Part-time",
  "co-op":      "Co-op · Part-time",
  "internship": "Internship",
  "fellowship": "Fellowship",
};

const TYPE_STYLE: Record<string, { text: string; bg: string; border: string }> = {
  "co-op":      { text: "rgb(126,184,247)",  bg: "rgba(126,184,247,0.1)",  border: "rgba(126,184,247,0.25)" },
  "part-time":  { text: "rgb(167,139,250)",  bg: "rgba(167,139,250,0.1)",  border: "rgba(167,139,250,0.25)" },
  "fellowship": { text: "rgb(52,211,153)",   bg: "rgba(52,211,153,0.1)",   border: "rgba(52,211,153,0.25)"  },
  "full-time":  { text: "rgb(251,191,36)",   bg: "rgba(251,191,36,0.1)",   border: "rgba(251,191,36,0.25)"  },
  "internship": { text: "rgb(126,184,247)",  bg: "rgba(126,184,247,0.1)",  border: "rgba(126,184,247,0.25)" },
};

function CompanyBadge({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div
      className="w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 select-none"
      style={{
        background: "rgba(126,184,247,0.07)",
        border: "1px solid rgba(126,184,247,0.18)",
        color: "var(--color-pg-accent)",
        letterSpacing: "0.04em",
      }}
    >
      {initials}
    </div>
  );
}

function ActiveDot() {
  return (
    <span className="relative flex items-center justify-center w-3 h-3">
      <motion.span
        className="absolute w-5 h-5 rounded-full"
        style={{ background: "rgba(126,184,247,0.18)", border: "1px solid rgba(126,184,247,0.35)" }}
        animate={{ scale: [1, 1.6, 1], opacity: [0.8, 0, 0.8] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <span
        className="relative z-10 w-2.5 h-2.5 rounded-full"
        style={{ background: "var(--color-pg-accent)", boxShadow: "0 0 8px rgba(126,184,247,0.6)" }}
      />
    </span>
  );
}

function InactiveDot() {
  return (
    <span
      className="w-2 h-2 rounded-full"
      style={{ background: "rgba(126,184,247,0.3)", border: "1px solid rgba(126,184,247,0.15)" }}
    />
  );
}

export function ExperienceSection() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.85", "end 0.25"],
  });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

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
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-16"
        >
          <p className="section-label mb-2">Career</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: "var(--color-pg-text-1)" }}>
            <MaskText text="Experience" />
          </h2>
        </motion.div>

        {/* Timeline container */}
        <div ref={timelineRef} className="relative">

          {/* Animated vertical line */}
          <div
            className="absolute left-[5px] top-3 bottom-3 w-px hidden sm:block overflow-hidden"
            style={{ background: "rgba(255,255,255,0.05)" }}
          >
            <motion.div
              className="w-full origin-top"
              style={{
                scaleY: lineScaleY,
                height: "100%",
                background: "linear-gradient(to bottom, rgba(126,184,247,0.7) 0%, rgba(126,184,247,0.15) 100%)",
              }}
            />
          </div>

          {/* Cards */}
          <div className="space-y-8">
            {experiences.map((exp, ei) => {
              const isCurrent = exp.roles.some((r) => r.endDate === "Present");
              const cs = TYPE_STYLE[exp.roles[0].type];

              return (
                <motion.div
                  key={exp.company}
                  initial={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  viewport={{ once: false, amount: 0.08 }}
                  transition={{
                    duration: 0.55,
                    delay: ei * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="sm:pl-11 relative"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-7 hidden sm:flex items-center justify-center">
                    {isCurrent ? <ActiveDot /> : <InactiveDot />}
                  </div>

                  {/* Card */}
                  <motion.div
                    whileHover={{
                      y: -4,
                      boxShadow: "0 24px 64px rgba(0,0,0,0.55), 0 0 0 1px rgba(126,184,247,0.14)",
                    }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="glass-card overflow-hidden"
                    style={
                      isCurrent
                        ? { borderColor: "rgba(126,184,247,0.18)" }
                        : undefined
                    }
                  >
                    {/* Shimmer top bar for current role */}
                    {isCurrent && (
                      <motion.div
                        className="h-[2px] w-full"
                        style={{
                          background:
                            "linear-gradient(90deg, transparent 0%, rgba(126,184,247,0.65) 50%, transparent 100%)",
                          backgroundSize: "200% 100%",
                        }}
                        animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
                        transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
                      />
                    )}

                    <div className="p-6 sm:p-8">

                      {/* Company header */}
                      <div className="flex items-start justify-between gap-3 mb-7">
                        <div className="flex items-center gap-3.5">
                          <CompanyBadge name={exp.company} />
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3
                                className="text-base font-bold tracking-tight"
                                style={{ color: "var(--color-pg-text-1)" }}
                              >
                                {exp.company}
                              </h3>
                              {isCurrent && (
                                <span
                                  className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                                  style={{
                                    color: "rgb(52,211,153)",
                                    background: "rgba(52,211,153,0.1)",
                                    border: "1px solid rgba(52,211,153,0.25)",
                                  }}
                                >
                                  Current
                                </span>
                              )}
                            </div>
                            <p
                              className="text-xs mt-0.5"
                              style={{ color: "var(--color-pg-text-3)" }}
                            >
                              {exp.companyTagline}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Roles */}
                      <div className="space-y-8">
                        {exp.roles.map((role, ri) => {
                          const ts = TYPE_STYLE[role.type];
                          return (
                            <div key={ri}>

                              {/* Role meta */}
                              <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 mb-5">
                                <span
                                  className="text-sm font-semibold"
                                  style={{ color: "var(--color-pg-text-1)" }}
                                >
                                  {role.title}
                                </span>

                                <span
                                  className="h-3 w-px hidden sm:block"
                                  style={{ background: "rgba(255,255,255,0.12)" }}
                                />

                                <span
                                  className="text-[11px] font-medium px-2 py-0.5 rounded-full"
                                  style={{
                                    color: ts.text,
                                    background: ts.bg,
                                    border: `1px solid ${ts.border}`,
                                  }}
                                >
                                  {TYPE_LABEL[role.type]}
                                </span>

                                <span
                                  className="text-[11px]"
                                  style={{ color: "var(--color-pg-text-3)" }}
                                >
                                  {role.startDate} – {role.endDate}
                                </span>

                                <span
                                  className="text-[11px]"
                                  style={{ color: "var(--color-pg-text-3)" }}
                                >
                                  · {role.location}
                                </span>
                              </div>

                              {/* Bullets */}
                              <ul className="space-y-3 mb-5">
                                {role.bullets.map((bullet, bi) => (
                                  <motion.li
                                    key={bi}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, amount: 0.4 }}
                                    transition={{
                                      duration: 0.38,
                                      delay: bi * 0.055,
                                      ease: "easeOut",
                                    }}
                                    className="flex gap-3"
                                  >
                                    <span
                                      className="mt-[8px] h-[5px] w-[5px] shrink-0 rounded-full"
                                      style={{ background: cs.text, opacity: 0.7 }}
                                    />
                                    <span
                                      className="text-sm leading-relaxed"
                                      style={{ color: "var(--color-pg-text-2)" }}
                                    >
                                      {bullet}
                                    </span>
                                  </motion.li>
                                ))}
                              </ul>

                              {/* Tech tags */}
                              <div className="flex flex-wrap gap-1.5">
                                {role.tags.map((tag, ti) => (
                                  <motion.span
                                    key={tag}
                                    initial={{ opacity: 0, scale: 0.88 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.3, delay: ti * 0.03 }}
                                    whileHover={{ scale: 1.06, y: -1 }}
                                    className="skill-chip text-xs px-2.5 py-0.5 cursor-default"
                                  >
                                    {tag}
                                  </motion.span>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
