"use client";

import { motion } from "motion/react";

const floatingChips = [
  { label: "AI/ML", delay: 0, top: "2%", left: "6%" },
  { label: "Benchmarks", delay: 0.1, top: "6%", left: "64%" },
  { label: "Full Stack", delay: 0.2, top: "44%", left: "82%" },
  { label: "Systems", delay: 0.3, top: "80%", left: "62%" },
  { label: "Mobile", delay: 0.4, top: "82%", left: "8%" },
  { label: "Research", delay: 0.5, top: "38%", left: "-4%" },
];

export function HeroVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.45 }}
      className="relative mx-auto h-[390px] w-full max-w-[460px] [perspective:1600px]"
    >
      <div
        className="absolute inset-0 rounded-[2rem] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 40% 38%, rgba(96,165,250,0.22), transparent 34%), radial-gradient(circle at 68% 70%, rgba(167,139,250,0.18), transparent 36%)",
          filter: "blur(30px)",
        }}
      />

      <motion.div
        className="absolute bottom-8 left-10 right-10 top-[4.5rem] overflow-hidden rounded-[2rem]"
        style={{
          background:
            "linear-gradient(180deg, rgba(18,20,31,0.94), rgba(9,9,15,0.90))",
          border: "1px solid rgba(255,255,255,0.10)",
          transform: "rotateX(65deg) rotateZ(-33deg)",
          transformStyle: "preserve-3d",
          boxShadow:
            "0 34px 90px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 20% 24%, rgba(34,211,238,0.16), transparent 20%), radial-gradient(circle at 70% 66%, rgba(167,139,250,0.16), transparent 18%)",
          }}
        />
        <div
          className="absolute left-[12%] top-[18%] h-[1px] w-[26%]"
          style={{ background: "rgba(34,211,238,0.34)", boxShadow: "0 0 12px rgba(34,211,238,0.45)" }}
        />
        <div
          className="absolute left-[34%] top-[18%] h-[30%] w-[1px]"
          style={{ background: "rgba(34,211,238,0.30)", boxShadow: "0 0 12px rgba(34,211,238,0.35)" }}
        />
        <div
          className="absolute left-[56%] top-[48%] h-[1px] w-[22%]"
          style={{ background: "rgba(167,139,250,0.30)", boxShadow: "0 0 12px rgba(167,139,250,0.35)" }}
        />
        <div
          className="absolute left-[56%] top-[26%] h-[24%] w-[1px]"
          style={{ background: "rgba(167,139,250,0.26)" }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: [0, -7, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
        className="absolute left-10 top-12 w-[210px] overflow-hidden rounded-[1.4rem]"
        style={{
          background: "rgba(255,255,255,0.055)",
          border: "1px solid rgba(255,255,255,0.12)",
          backdropFilter: "blur(18px)",
          transform: "rotateX(16deg) rotateY(-14deg) rotateZ(-10deg) translateZ(54px)",
          boxShadow: "0 20px 45px rgba(0,0,0,0.22)",
        }}
      >
        <div className="flex items-center gap-2 border-b px-4 py-3" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <span className="h-2 w-2 rounded-full" style={{ background: "rgba(34,211,238,0.65)" }} />
          <p className="text-[11px] font-medium uppercase tracking-[0.18em]" style={{ color: "rgba(255,255,255,0.44)" }}>
            Edge Benchmarks
          </p>
        </div>
        <div className="space-y-3 p-4">
          <MetricBar label="TTFT" value="73-172ms" width="78%" color="var(--color-pg-cyan)" />
          <MetricBar label="TPS" value="48-52" width="92%" color="var(--color-pg-blue)" />
          <MetricBar label="Cost" value="$0" width="98%" color="var(--color-pg-violet)" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ duration: 7.2, repeat: Infinity, ease: "easeInOut", delay: 1.05 }}
        className="absolute right-0 top-24 w-[220px] rounded-[1.35rem] p-4"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.12)",
          backdropFilter: "blur(18px)",
          transform: "rotateX(14deg) rotateY(14deg) rotateZ(11deg) translateZ(70px)",
          boxShadow: "0 20px 45px rgba(0,0,0,0.22)",
        }}
      >
        <p className="text-[11px] font-medium uppercase tracking-[0.18em]" style={{ color: "rgba(255,255,255,0.44)" }}>
          Live Stack
        </p>
        <div className="mt-4 space-y-3 text-[12px]">
          <StackLine label="Auction events" value="3 role views" />
          <StackLine label="SNN flow" value="Sparse spikes" />
          <StackLine label="Chess rules" value="Special moves" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: [0, -6, 0] }}
        transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
        className="absolute bottom-2 left-24 h-[160px] w-[220px] overflow-hidden rounded-[1.5rem] p-4"
        style={{
          background: "rgba(255,255,255,0.045)",
          border: "1px solid rgba(255,255,255,0.11)",
          backdropFilter: "blur(18px)",
          transform: "rotateX(18deg) rotateY(-10deg) rotateZ(7deg) translateZ(58px)",
          boxShadow: "0 24px 48px rgba(0,0,0,0.22)",
        }}
      >
        <p className="text-[11px] font-medium uppercase tracking-[0.18em]" style={{ color: "rgba(255,255,255,0.44)" }}>
          Signal Graph
        </p>
        <div className="relative mt-5 h-[90px] rounded-2xl border" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <div
            className="absolute left-[18%] top-[32%] h-2.5 w-2.5 rounded-full"
            style={{ background: "rgba(34,211,238,0.78)", boxShadow: "0 0 16px rgba(34,211,238,0.55)" }}
          />
          <div
            className="absolute left-[46%] top-[18%] h-2.5 w-2.5 rounded-full"
            style={{ background: "rgba(96,165,250,0.78)", boxShadow: "0 0 16px rgba(96,165,250,0.5)" }}
          />
          <div
            className="absolute left-[74%] top-[54%] h-2.5 w-2.5 rounded-full"
            style={{ background: "rgba(167,139,250,0.78)", boxShadow: "0 0 16px rgba(167,139,250,0.5)" }}
          />
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M18 32 C30 26, 36 20, 46 18" fill="none" stroke="rgba(34,211,238,0.42)" strokeWidth="1" />
            <path d="M46 18 C58 26, 64 40, 74 54" fill="none" stroke="rgba(167,139,250,0.42)" strokeWidth="1" />
          </svg>
        </div>
      </motion.div>

      {floatingChips.map(({ label, delay, top, left }) => (
        <motion.span
          key={label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, delay: 1 + delay }}
          className="absolute select-none rounded-full px-2.5 py-1 text-[11px] font-medium pointer-events-none"
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

function MetricBar({ label, value, width, color }: { label: string; value: string; width: string; color: string }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-[11px]">
        <span style={{ color: "rgba(255,255,255,0.44)" }}>{label}</span>
        <span style={{ color: "rgba(255,255,255,0.72)" }}>{value}</span>
      </div>
      <div className="h-2 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
        <motion.div
          className="h-full rounded-full"
          style={{
            width,
            background: `linear-gradient(90deg, ${color}, rgba(255,255,255,0.82))`,
          }}
          animate={{ opacity: [0.82, 1, 0.82] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}

function StackLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl border px-3 py-2" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
      <span style={{ color: "rgba(255,255,255,0.52)" }}>{label}</span>
      <span style={{ color: "rgba(255,255,255,0.82)" }}>{value}</span>
    </div>
  );
}
