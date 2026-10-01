"use client";

import { motion } from "motion/react";
import dynamic from "next/dynamic";

// Lazy-load the WebGL scene — SSR-safe, PlaceholderScene is the fallback
const OrbitalSphereScene = dynamic(
  () => import("./orbital-sphere-scene").then((m) => ({ default: m.OrbitalSphereScene })),
  { ssr: false, loading: () => <PlaceholderScene /> }
);

// ─── Data ─────────────────────────────────────────────────────────────────────

const TECH_CHIPS: { label: string; top: string; left: string; delay: number }[] = [
  { label: "Applied AI", top: "3%",  left: "4%",  delay: 0.9 },
  { label: "WebGPU",     top: "4%",  left: "67%", delay: 1.0 },
  { label: "FastAPI",    top: "40%", left: "86%", delay: 1.1 },
  { label: "PostgreSQL", top: "80%", left: "62%", delay: 1.2 },
  { label: "PyTorch",    top: "82%", left: "5%",  delay: 1.3 },
  { label: "TypeScript", top: "41%", left: "-2%", delay: 1.4 },
];

const STAT_CARDS: {
  value: string;
  label: string;
  top: string;
  left?: string;
  right?: string;
  floatY: number[];
  delay: number;
}[] = [
  { value: "20+",      label: "API endpoints", top: "2%",  right: "12%", floatY: [0, -7, 0], delay: 1.0 },
  { value: "48–52",    label: "LLM TPS",       top: "38%", left: "0%",   floatY: [0,  5, 0], delay: 1.1 },
  { value: "AUC ≥ .85",label: "ML results",    top: "38%", right: "0%",  floatY: [0, -6, 0], delay: 1.2 },
  { value: "Dec '26",  label: "M.S. CS",       top: "76%", right: "10%", floatY: [0,  6, 0], delay: 1.3 },
];

// SVG hex nodes — viewBox 0 0 200 200, center (100,100), ring r=46
const HEX_NODES: { cx: number; cy: number }[] = [
  { cx: 100,   cy: 54  },
  { cx: 139.8, cy: 77  },
  { cx: 139.8, cy: 123 },
  { cx: 100,   cy: 146 },
  { cx: 60.2,  cy: 123 },
  { cx: 60.2,  cy: 77  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function OrbitalDiagram() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden="true" style={{ overflow: "visible" }}>
      <circle cx={100} cy={100} r={70} fill="none" stroke="rgba(126,184,247,0.07)" strokeWidth={1} strokeDasharray="4 6" />
      <circle cx={100} cy={100} r={46} fill="none" stroke="rgba(126,184,247,0.12)" strokeWidth={1} />
      <circle cx={100} cy={100} r={22} fill="none" stroke="rgba(126,184,247,0.10)" strokeWidth={1} strokeDasharray="3 5" />
      {HEX_NODES.map((n, i) => (
        <line key={i} x1={100} y1={100} x2={n.cx} y2={n.cy} stroke="rgba(126,184,247,0.13)" strokeWidth={1} />
      ))}
      {HEX_NODES.filter((_, i) => i % 2 === 0).map((a, i) => {
        const b = HEX_NODES[(i * 2 + 2) % 6];
        return <line key={`x${i}`} x1={a.cx} y1={a.cy} x2={b.cx} y2={b.cy} stroke="rgba(126,184,247,0.06)" strokeWidth={1} />;
      })}
      {HEX_NODES.map((n, i) => (
        <g key={i}>
          <circle cx={n.cx} cy={n.cy} r={5}   fill="rgba(126,184,247,0.12)" />
          <circle cx={n.cx} cy={n.cy} r={2.5} fill="rgba(126,184,247,0.65)" />
        </g>
      ))}
      <circle cx={100} cy={100} r={7}   fill="rgba(126,184,247,0.08)" />
      <circle cx={100} cy={100} r={3.5} fill="rgba(126,184,247,0.9)"  />
    </svg>
  );
}

function StatCard({ value, label, floatY, delay }: {
  value: string; label: string; floatY: number[]; delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1, y: floatY }}
      transition={{
        opacity: { delay, duration: 0.4 },
        scale:   { delay, duration: 0.4 },
        y: { delay: delay + 0.4, duration: 5.5 + delay, repeat: Infinity, ease: "easeInOut" },
      }}
      className="flex flex-col items-center justify-center rounded-2xl px-3 py-2.5 min-w-[68px]"
      style={{
        background: "var(--pg-surface)",
        border: "1px solid var(--pg-border)",
        backdropFilter: "blur(16px)",
        boxShadow: "0 8px 24px var(--pg-shadow)",
      }}
    >
      <span className="text-lg font-bold leading-none tracking-tight" style={{ color: "var(--pg-accent)" }}>
        {value}
      </span>
      <span className="mt-1 text-[9px] font-medium uppercase tracking-widest whitespace-nowrap" style={{ color: "var(--pg-text-3)" }}>
        {label}
      </span>
    </motion.div>
  );
}

// ─── CSS Placeholder scene ────────────────────────────────────────────────────

function PlaceholderScene() {
  return (
    <div
      className="relative w-full h-full rounded-[1.75rem] overflow-hidden"
      style={{
        background: "linear-gradient(160deg, rgba(20,22,32,0.95) 0%, rgba(8,8,12,0.92) 100%)",
        border: "1px solid var(--pg-border)",
        boxShadow: "0 28px 72px var(--pg-shadow), inset 0 1px 0 color-mix(in srgb, var(--pg-text-1) 5%, transparent)",
      }}
    >
      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "radial-gradient(color-mix(in srgb, var(--pg-text-1) 7%, transparent) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }} />
      {/* Ambient inner glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(circle at 20% 22%, rgba(126,184,247,0.10) 0%, transparent 40%), radial-gradient(circle at 80% 80%, rgba(126,184,247,0.07) 0%, transparent 38%)",
      }} />

      {/* Header bar */}
      <div className="relative flex items-center justify-between px-5 py-3.5" style={{ borderBottom: "1px solid var(--pg-border)" }}>
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "var(--pg-accent)", boxShadow: "0 0 8px rgba(126,184,247,0.7)" }} />
          <motion.span
            animate={{ opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            className="text-[10px] font-medium uppercase tracking-[0.2em]"
            style={{ color: "rgba(126,184,247,0.75)" }}
          >
            ACTIVE
          </motion.span>
        </div>
        <span className="font-mono text-[10px] tracking-widest" style={{ color: "var(--pg-text-3)" }}>
          jenish.dev / signal-map
        </span>
      </div>

      {/* Developer identity signal map */}
      <div className="relative flex items-center justify-center flex-1 py-4 px-6" style={{ height: "calc(100% - 88px)" }}>
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{ width: "150px", height: "150px", background: "rgba(126,184,247,0.07)", filter: "blur(30px)" }}
          animate={{ scale: [1, 1.24, 1], opacity: [0.45, 0.85, 0.45] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative w-[185px] h-[185px]">
          <OrbitalDiagram />
          <div
            className="absolute inset-0 m-auto flex h-20 w-20 flex-col items-center justify-center rounded-2xl"
            style={{
              background: "color-mix(in srgb, var(--pg-surface) 92%, transparent)",
              border: "1px solid color-mix(in srgb, var(--pg-accent) 34%, var(--pg-border))",
              boxShadow: "0 14px 36px var(--pg-shadow), inset 0 1px 0 color-mix(in srgb, var(--pg-text-1) 7%, transparent)",
              backdropFilter: "blur(16px)",
            }}
          >
            <span className="text-2xl font-bold tracking-[-0.08em]" style={{ color: "var(--pg-text-1)" }}>JP</span>
            <span className="mt-1 text-[8px] font-mono uppercase tracking-[0.18em]" style={{ color: "var(--pg-accent)" }}>
              build · measure
            </span>
          </div>
        </div>
      </div>

      {/* Footer tech strip */}
      <div className="relative flex items-center gap-2 px-5 py-3" style={{ borderTop: "1px solid var(--pg-border)" }}>
        {["Python", "FastAPI", "PyTorch", "PostgreSQL"].map((t) => (
          <span key={t} className="text-[9px] px-2 py-0.5 rounded font-medium" style={{
            background: "rgba(126,184,247,0.05)",
            border: "1px solid rgba(126,184,247,0.10)",
            color: "var(--pg-text-3)",
          }}>
            {t}
          </span>
        ))}
        <span className="ml-auto font-mono text-[9px]" style={{ color: "var(--pg-text-3)" }}>v2.0</span>
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function HeroVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.75, delay: 0.4 }}
      className="relative mx-auto h-[460px] w-full max-w-[500px]"
      aria-hidden="true"
    >
      {/* Ambient outer glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 35% 35%, rgba(126,184,247,0.14) 0%, transparent 45%), radial-gradient(circle at 70% 72%, rgba(126,184,247,0.08) 0%, transparent 40%)",
          filter: "blur(32px)",
        }}
      />

      <div className="absolute inset-x-8 top-12 bottom-8" style={{ borderRadius: "1.75rem", overflow: "hidden" }}>
        <OrbitalSphereScene />
      </div>

      {/* Floating stat cards + tech chips */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {STAT_CARDS.map((s) => (
          <div key={s.label} className="absolute" style={{ top: s.top, left: s.left, right: s.right, pointerEvents: "auto" }}>
            <StatCard value={s.value} label={s.label} floatY={s.floatY} delay={s.delay} />
          </div>
        ))}
        {TECH_CHIPS.map((chip) => (
          <motion.span
            key={chip.label}
            className="absolute select-none pointer-events-none rounded-full px-2.5 py-1 text-[10px] font-medium"
            style={{
              top: chip.top,
              left: chip.left,
              background: "var(--pg-surface)",
              border: "1px solid var(--pg-border)",
              color: "var(--pg-text-2)",
              backdropFilter: "blur(8px)",
            }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, delay: chip.delay }}
          >
            {chip.label}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
