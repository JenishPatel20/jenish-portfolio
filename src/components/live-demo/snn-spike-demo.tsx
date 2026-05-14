"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Pause, Play } from "lucide-react";
import { motion } from "motion/react";
import { snnDatasets, snnEdges, snnNodes } from "@/data/live-demo/snn-demo";

function getNodeById(id: string) {
  return snnNodes.find((node) => node.id === id);
}

export function SnnSpikeDemo() {
  const [datasetId, setDatasetId] = useState(snnDatasets[0].id);
  const [frameIndex, setFrameIndex] = useState(0);
  const [playing, setPlaying] = useState(true);

  const activeDataset = snnDatasets.find((dataset) => dataset.id === datasetId) ?? snnDatasets[0];
  const activeStep = activeDataset.steps[frameIndex];

  useEffect(() => {
    if (!playing) {
      return;
    }

    const timer = window.setInterval(() => {
      setFrameIndex((current) => (current + 1) % activeDataset.steps.length);
    }, 1350);

    return () => window.clearInterval(timer);
  }, [activeDataset.steps.length, playing]);

  return (
    <div className="glass-card h-full p-6 sm:p-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="section-label mb-2">Research Demo</p>
          <h3 className="text-xl font-semibold" style={{ color: "var(--pg-text-1)" }}>
            SNN Spike Visualization
          </h3>
          <p className="mt-3 max-w-xl text-sm leading-6" style={{ color: "var(--pg-text-2)" }}>
            A visual explainer for how signal windows move from learned features into sparse spiking activity.
          </p>
        </div>

        <Link
          href="/projects/industrial-anomaly-detection"
          className="inline-flex items-center gap-1 text-sm transition-colors duration-200"
          style={{ color: "var(--pg-text-3)" }}
        >
          Full case study
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        {snnDatasets.map((dataset) => {
          const active = dataset.id === datasetId;
          return (
            <button
              key={dataset.id}
              onClick={() => {
                setDatasetId(dataset.id);
                setFrameIndex(0);
              }}
              className="rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200"
              style={
                active
                  ? {
                      color: "var(--pg-text-1)",
                      background: "rgba(167,139,250,0.12)",
                      border: "1px solid rgba(167,139,250,0.28)",
                    }
                  : {
                      color: "var(--pg-text-2)",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }
              }
            >
              {dataset.title}
            </button>
          );
        })}

        <button
          onClick={() => setPlaying((current) => !current)}
          className="ml-auto inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200"
          style={{
            color: "var(--pg-text-1)",
            background: "rgba(96,165,250,0.12)",
            border: "1px solid rgba(96,165,250,0.28)",
          }}
        >
          {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
          {playing ? "Pause replay" : "Resume replay"}
        </button>
      </div>

      <div
        className="relative mt-6 overflow-hidden rounded-[1.75rem] border"
        style={{
          borderColor: "rgba(255,255,255,0.08)",
          background:
            "radial-gradient(circle at top, rgba(167,139,250,0.10), transparent 36%), rgba(255,255,255,0.02)",
        }}
      >
        <div className="absolute inset-x-0 top-0 flex justify-between px-5 pt-4 text-[11px] uppercase tracking-[0.18em]" style={{ color: "rgba(255,255,255,0.24)" }}>
          <span>Signal</span>
          <span>Features</span>
          <span>Spikes</span>
          <span>Output</span>
        </div>

        <div className="relative h-[300px]">
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {snnEdges.map((edge) => {
              const [fromId, toId] = edge.split(":");
              const from = getNodeById(fromId);
              const to = getNodeById(toId);
              const active = activeStep.activeEdges.includes(edge);

              if (!from || !to) {
                return null;
              }

              return (
                <motion.line
                  key={edge}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke={active ? "rgba(167,139,250,0.82)" : "rgba(255,255,255,0.10)"}
                  strokeWidth={active ? 1.1 : 0.45}
                  animate={active ? { opacity: [0.35, 1, 0.35] } : { opacity: 0.35 }}
                  transition={{ duration: 1.15, repeat: active ? Infinity : 0, ease: "easeInOut" }}
                />
              );
            })}
          </svg>

          {snnNodes.map((node) => {
            const active = activeStep.activeNodes.includes(node.id);
            return (
              <motion.div
                key={node.id}
                className="absolute flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border text-xs font-semibold"
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  borderColor: active ? "rgba(167,139,250,0.45)" : "rgba(255,255,255,0.10)",
                  background: active
                    ? "radial-gradient(circle, rgba(167,139,250,0.42), rgba(96,165,250,0.10))"
                    : "rgba(255,255,255,0.04)",
                  color: active ? "#f5f3ff" : "rgba(255,255,255,0.58)",
                  boxShadow: active ? "0 0 28px rgba(167,139,250,0.24)" : "none",
                }}
                animate={
                  active
                    ? {
                        scale: [1, 1.08, 1],
                        opacity: [0.85, 1, 0.85],
                      }
                    : {
                        scale: 1,
                        opacity: 0.8,
                      }
                }
                transition={{ duration: 1.05, repeat: active ? Infinity : 0, ease: "easeInOut" }}
              >
                {node.label}
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-[minmax(0,1fr)_220px]">
        <div
          className="rounded-2xl border p-4"
          style={{
            borderColor: "rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.025)",
          }}
        >
          <p className="text-xs uppercase tracking-[0.18em]" style={{ color: "var(--pg-text-3)" }}>
            {activeStep.label}
          </p>
          <p className="mt-2 text-sm leading-6" style={{ color: "var(--pg-text-2)" }}>
            {activeStep.note}
          </p>
        </div>

        <div
          className="rounded-2xl border p-4"
          style={{
            borderColor: "rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.025)",
          }}
        >
          <p className="text-xs uppercase tracking-[0.18em]" style={{ color: "var(--pg-text-3)" }}>
            Data Source
          </p>
          <p className="mt-2 text-sm leading-6" style={{ color: "var(--pg-text-2)" }}>
            {activeDataset.source}
          </p>
        </div>
      </div>
    </div>
  );
}
