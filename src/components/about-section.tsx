"use client";

import { motion } from "motion/react";
import { Briefcase, GraduationCap, MapPin, Calendar } from "lucide-react";
import { MaskText } from "@/components/mask-text";

const facts = [
  {
    Icon: Briefcase,
    label: "Recent Experience",
    value: "AI/ML Engineer Intern @ Greenlit",
  },
  {
    Icon: GraduationCap,
    label: "Degree",
    value: "MS CS · Rutgers University",
  },
  {
    Icon: Calendar,
    label: "Availability",
    value: "New Grad · Dec 2026 / Jan 2027",
  },
  {
    Icon: MapPin,
    label: "Location",
    value: "New Brunswick, NJ",
  },
];

export function AboutSection() {
  return (
    <section
      id="about"
      className="section-alt border-t border-pg-border py-20"
    >
      <div className="section-container">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
          className="mb-10"
        >
          <p className="section-label mb-2">About</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: "var(--pg-text-1)" }}>
            <MaskText text="Who I Am" />
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="glass-card p-8 sm:p-10"
        >
          <div className="grid md:grid-cols-5 gap-10">

            {/* Bio — 3 columns */}
            <div className="md:col-span-3 flex flex-col justify-center gap-4">
              <p className="text-base leading-relaxed" style={{ color: "var(--pg-text-2)" }}>
                I&apos;m a CS graduate student at Rutgers focused on the full spectrum of
                intelligent systems — from training spiking neural networks on real industrial
                sensor data, to running LLMs natively in the browser via WebGPU with zero
                API cost. I care about bridging the gap between research and production.
              </p>
              <p className="text-base leading-relaxed" style={{ color: "var(--pg-text-2)" }}>
                At Greenlit, I worked on AI-powered market intelligence tools spanning data collection,
                LLM analysis, backend APIs, and analytics. Outside of work, I&apos;m usually
                benchmarking something, building something, or both.
              </p>
              <p className="text-sm" style={{ color: "var(--pg-text-3)" }}>
                Current interests include applied AI systems, model evaluation, backend engineering,
                and efficient local inference.
              </p>
            </div>

            {/* Fact cards — 2 columns */}
            <div className="md:col-span-2 flex flex-col gap-3">
              {facts.map((fact, i) => (
                <motion.div
                  key={fact.label}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.15 + i * 0.07 }}
                  className="flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200"
                  style={{
                    background: "var(--pg-surface)",
                    border: "1px solid var(--pg-border)",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--pg-border-hover)")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--pg-border)")}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: "color-mix(in srgb, var(--pg-accent) 10%, transparent)", color: "var(--pg-accent)" }}
                  >
                    <fact.Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider mb-0.5" style={{ color: "var(--pg-text-3)" }}>
                      {fact.label}
                    </div>
                    <div className="text-sm font-medium text-pg-text-1">{fact.value}</div>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
