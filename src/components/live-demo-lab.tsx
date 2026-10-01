"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, Square, Beaker, Code } from "lucide-react";
import { BenchmarkTableDemo } from "@/components/live-demo/benchmark-table-demo";
import { ChessReplayDemo }    from "@/components/live-demo/chess-replay-demo";
import { SnnSpikeDemo }       from "@/components/live-demo/snn-spike-demo";
import { AuctionMasterMiniDemo } from "@/components/live-demo/auction-master-mini-demo";

const demos = [
  {
    id: "benchmark",
    title: "Edge AI Benchmark",
    description:
      "Real measured latency and throughput data from running Llama 3.2, Qwen 2.5, and SmolLM2 in the browser via WebGPU across three hardware profiles.",
    tech: ["WebGPU", "@mlc-ai/web-llm", "Python", "CSV"],
    Component: BenchmarkTableDemo,
  },
  {
    id: "chess",
    title: "Chess Engine Move Replay",
    description:
      "Step through pre-scripted move sequences on a static CSS/SVG board demonstrating en passant, castling, and checkmate from the Java chess engine.",
    tech: ["Java", "CSS/SVG", "OOP"],
    Component: ChessReplayDemo,
  },
  {
    id: "snn",
    title: "SNN Spike Visualizer",
    description:
      "CSS keyframe animation of neurons firing in sequence — visualizing how spiking neural networks propagate activation during fault detection inference.",
    tech: ["PyTorch", "TensorFlow", "CSS Animation"],
    Component: SnnSpikeDemo,
  },
  {
    id: "auction",
    title: "Auction Master UI Preview",
    description:
      "Interactive UI recreation of the auction platform showing a countdown timer, sample bid feed, and reserve-price indicator. This is a portfolio preview, not the deployed application.",
    tech: ["Node.js", "MySQL", "Firebase", "Vanilla JS"],
    Component: AuctionMasterMiniDemo,
  },
];

export function LiveDemoLab() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section
      id="demos"
      className="section-alt border-t border-pg-border py-24"
    >
      <div className="section-container">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-3">
            <Beaker className="w-4 h-4" style={{ color: "var(--pg-accent)" }} />
            <p className="section-label">Project Evidence</p>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-pg-text-1">
            Interactive Project Previews
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed" style={{ color: "var(--pg-text-2)" }}>
            Explore lightweight recreations and visualizations based on project outputs. These previews demonstrate concepts and measured results; they are not presented as full deployed applications.
          </p>
        </motion.div>

        {/* Demo cards */}
        <div className="grid gap-5 md:grid-cols-2">
          {demos.map((demo, i) => {
            const isOpen = activeId === demo.id;
            return (
              <motion.div
                key={demo.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="rounded-2xl overflow-hidden transition-all duration-300"
                style={{
                  background: "var(--pg-surface)",
                  border: `1px solid ${isOpen ? "rgba(126,184,247,0.3)" : "var(--pg-border)"}`,
                  boxShadow: isOpen ? "0 0 30px rgba(126,184,247,0.07)" : "none",
                }}
              >
                {/* Card header */}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    {/* Icon */}
                    <div
                      className="flex items-center justify-center w-11 h-11 rounded-xl shrink-0"
                      style={{
                        background: "color-mix(in srgb, var(--pg-accent) 10%, transparent)",
                        border: "1px solid color-mix(in srgb, var(--pg-accent) 18%, transparent)",
                      }}
                    >
                      <Code className="w-5 h-5" style={{ color: "var(--pg-accent)" }} />
                    </div>

                    {/* Play / Stop button */}
                    <button
                      onClick={() => setActiveId(isOpen ? null : demo.id)}
                      className="flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 shrink-0 cursor-pointer"
                      style={{
                        background: isOpen ? "color-mix(in srgb, var(--pg-accent) 16%, transparent)" : "color-mix(in srgb, var(--pg-accent) 10%, transparent)",
                        border: "1px solid color-mix(in srgb, var(--pg-accent) 24%, transparent)",
                        color: "var(--pg-accent)",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "color-mix(in srgb, var(--pg-accent) 20%, transparent)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = isOpen ? "color-mix(in srgb, var(--pg-accent) 16%, transparent)" : "color-mix(in srgb, var(--pg-accent) 10%, transparent)")}
                      aria-label={isOpen ? "Stop demo" : "Play demo"}
                    >
                      {isOpen
                        ? <Square  className="w-4 h-4" fill="currentColor" />
                        : <Play    className="w-4 h-4" fill="currentColor" />
                      }
                    </button>
                  </div>

                  <h3 className="text-base font-semibold text-pg-text-1 mb-2">{demo.title}</h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--pg-text-2)" }}>
                    {demo.description}
                  </p>

                  {/* Tech chips */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <Code className="w-3.5 h-3.5 shrink-0" style={{ color: "var(--pg-accent)" }} />
                    {demo.tech.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2 py-0.5 rounded-md"
                        style={{
                          background: "var(--pg-surface)",
                          border: "1px solid var(--pg-border)",
                          color: "var(--pg-text-2)",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Demo panel — expands on play */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div
                        className="px-6 pb-6 pt-0"
                        style={{ borderTop: "1px solid var(--pg-border)" }}
                      >
                        <div className="pt-5">
                          <demo.Component />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
