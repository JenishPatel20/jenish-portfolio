"use client";

import { motion } from "motion/react";

const floatingChips = [
  { label: "AI/ML",      delay: 0,    top: "3%",  left: "3%"  },
  { label: "RL",         delay: 0.1,  top: "3%",  left: "62%" },
  { label: "AWS",        delay: 0.2,  top: "40%", left: "84%" },
  { label: "WebGPU",     delay: 0.3,  top: "78%", left: "66%" },
  { label: "iOS",        delay: 0.4,  top: "82%", left: "3%"  },
  { label: "Algorithms", delay: 0.5,  top: "40%", left: "-8%" },
];

// TODO: replace card interior with <Spline scene="your-scene-url" /> when 3D is ready
export function HeroVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.45 }}
      className="relative h-[360px] w-full max-w-[400px] mx-auto"
    >
      {/* Ambient glow behind card */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(96,165,250,0.18) 0%, rgba(167,139,250,0.08) 52%, transparent 75%)",
          filter: "blur(28px)",
        }}
      />

      {/* Glass card */}
      <div
        className="absolute inset-8 rounded-2xl overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.035)",
          border: "1px solid rgba(255,255,255,0.10)",
        }}
      >
        {/* Window chrome */}
        <div
          className="flex items-center gap-1.5 px-4 py-3"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <span className="w-2 h-2 rounded-full" style={{ background: "rgba(255,95,95,0.5)"  }} />
          <span className="w-2 h-2 rounded-full" style={{ background: "rgba(255,185,50,0.5)" }} />
          <span className="w-2 h-2 rounded-full" style={{ background: "rgba(50,210,100,0.5)" }} />
          <span className="ml-auto text-[10px]" style={{ color: "rgba(255,255,255,0.2)" }}>
            jenish@dev ~ ml
          </span>
        </div>

        {/* Terminal lines */}
        <div className="p-5 font-mono text-[11px] leading-7">
          <TermLine prefix="$" text="train rl-agent --env CartPole" color="var(--color-pg-blue)" />
          <TermLine prefix="✓" text="agent converged · 94.2% reward"  color="var(--color-pg-cyan)" />
          <TermLine prefix="✓" text="inference · 47ms p99 latency"    color="var(--color-pg-cyan)" />
          <TermLine prefix="~" text="deploying to AWS Lambda…"         color="rgba(255,255,255,0.28)" />
          <Cursor />
        </div>

        {/* Animated scan line */}
        <motion.div
          className="absolute left-0 right-0 h-px pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(96,165,250,0.28) 50%, transparent 100%)",
          }}
          animate={{ top: ["15%", "90%", "15%"] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Floating skill chips */}
      {floatingChips.map(({ label, delay, top, left }) => (
        <motion.span
          key={label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, delay: 1.0 + delay }}
          className="absolute text-[11px] font-medium px-2.5 py-1 rounded-full pointer-events-none select-none"
          style={{
            top,
            left,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.14)",
            color: "rgba(255,255,255,0.7)",
          }}
        >
          {label}
        </motion.span>
      ))}
    </motion.div>
  );
}

function TermLine({ prefix, text, color }: { prefix: string; text: string; color: string }) {
  return (
    <div className="flex gap-2.5">
      <span style={{ color }}>{prefix}</span>
      <span style={{ color: "rgba(255,255,255,0.5)" }}>{text}</span>
    </div>
  );
}

function Cursor() {
  return (
    <div className="flex gap-2.5 items-center">
      <span style={{ color: "var(--color-pg-blue)" }}>$</span>
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
        className="inline-block w-1.5 h-3.5 rounded-sm"
        style={{ background: "var(--color-pg-blue)" }}
      />
    </div>
  );
}
