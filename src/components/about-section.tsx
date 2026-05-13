"use client";

import { motion } from "motion/react";
import { Briefcase, GraduationCap, MapPin, Calendar } from "lucide-react";
import { MaskText } from "@/components/mask-text";

const facts = [
  {
    Icon: Briefcase,
    label: "Current Role",
    value: "AI/ML Co-op @ Greenlit",
  },
  {
    Icon: GraduationCap,
    label: "Degree",
    value: "MS CS · Rutgers University",
  },
  {
    Icon: Calendar,
    label: "Availability",
    value: "Full-time · Fall 2026",
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
      className="py-20"
      style={{ backgroundColor: "#09090f", borderTop: "1px solid rgba(255,255,255,0.04)" }}
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
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: "var(--color-pg-text-1)" }}>
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
              <p className="text-base leading-relaxed" style={{ color: "var(--color-pg-text-2)" }}>
                I&apos;m a CS graduate student at Rutgers focused on the full spectrum of
                intelligent systems — from training spiking neural networks on real industrial
                sensor data, to running LLMs natively in the browser via WebGPU with zero
                API cost. I care about bridging the gap between research and production.
              </p>
              <p className="text-base leading-relaxed" style={{ color: "var(--color-pg-text-2)" }}>
                On co-op at Greenlit, I&apos;ve shipped AI-powered genre market analysis tools
                from scraping to a FastAPI service used in production decisions. Outside of
                work, I&apos;m usually benchmarking something, building something, or both.
              </p>
              <p className="text-sm" style={{ color: "var(--color-pg-text-3)" }}>
                Currently exploring{" "}
                <span style={{ color: "var(--color-pg-accent)" }}>Rust</span>,{" "}
                <span style={{ color: "var(--color-pg-accent)" }}>WebAssembly</span>, and{" "}
                <span style={{ color: "var(--color-pg-accent)" }}>Reinforcement Learning</span>.
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
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(126,184,247,0.25)")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)")}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: "rgba(126,184,247,0.08)", color: "var(--color-pg-accent)" }}
                  >
                    <fact.Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider mb-0.5" style={{ color: "var(--color-pg-text-3)" }}>
                      {fact.label}
                    </div>
                    <div className="text-sm font-medium text-white">{fact.value}</div>
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
