"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, BarChart3 } from "lucide-react";
import { motion } from "motion/react";
import {
  benchmarkHardwareProfiles,
  benchmarkMethodology,
  benchmarkRows,
  type BenchmarkRow,
  type BenchmarkSortMetric,
} from "@/data/live-demo/benchmark-results";

const sortOptions: { id: BenchmarkSortMetric; label: string }[] = [
  { id: "ttft", label: "Fastest TTFT" },
  { id: "tps", label: "Highest TPS" },
  { id: "cost", label: "Lowest Cost" },
];

function sortRows(rows: BenchmarkRow[], metric: BenchmarkSortMetric) {
  const sorted = [...rows];

  sorted.sort((left, right) => {
    const leftValue = left.sortValues[metric];
    const rightValue = right.sortValues[metric];

    if (leftValue === undefined && rightValue === undefined) return 0;
    if (leftValue === undefined) return 1;
    if (rightValue === undefined) return -1;

    if (metric === "ttft" || metric === "cost") {
      return leftValue - rightValue;
    }

    return rightValue - leftValue;
  });

  return sorted;
}

export function BenchmarkTableDemo() {
  const [metric, setMetric] = useState<BenchmarkSortMetric>("ttft");
  const sortedRows = sortRows(benchmarkRows, metric);

  return (
    <div className="glass-card h-full p-6 sm:p-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="section-label mb-2">Edge AI Demo</p>
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" style={{ color: "var(--color-pg-cyan)" }} />
            <h3 className="text-xl font-semibold" style={{ color: "var(--color-pg-text-1)" }}>
              Real Benchmark Table
            </h3>
          </div>
          <p className="mt-3 max-w-2xl text-sm leading-6" style={{ color: "var(--color-pg-text-2)" }}>
            Verified figures from the Edge AI benchmark project, using only numbers already documented in the portfolio data.
          </p>
        </div>

        <Link
          href="/projects/edge-ai-benchmark"
          className="inline-flex items-center gap-1 text-sm transition-colors duration-200"
          style={{ color: "var(--color-pg-text-3)" }}
        >
          Full case study
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {benchmarkHardwareProfiles.map((profile) => (
          <span
            key={profile}
            className="rounded-full border px-3 py-1 text-xs font-medium"
            style={{
              color: "var(--color-pg-text-2)",
              borderColor: "rgba(255,255,255,0.10)",
              background: "rgba(255,255,255,0.035)",
            }}
          >
            {profile}
          </span>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {sortOptions.map((option) => {
          const active = option.id === metric;
          return (
            <button
              key={option.id}
              onClick={() => setMetric(option.id)}
              className="rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200"
              style={
                active
                  ? {
                      color: "var(--color-pg-text-1)",
                      background: "rgba(34,211,238,0.12)",
                      border: "1px solid rgba(34,211,238,0.28)",
                    }
                  : {
                      color: "var(--color-pg-text-2)",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }
              }
            >
              {option.label}
            </button>
          );
        })}
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead style={{ background: "rgba(255,255,255,0.035)" }}>
              <tr>
                <th className="px-4 py-3 font-medium" style={{ color: "var(--color-pg-text-2)" }}>Model</th>
                <th className="px-4 py-3 font-medium" style={{ color: "var(--color-pg-text-2)" }}>Deployment</th>
                <th className="px-4 py-3 font-medium" style={{ color: "var(--color-pg-text-2)" }}>TTFT</th>
                <th className="px-4 py-3 font-medium" style={{ color: "var(--color-pg-text-2)" }}>Tokens / sec</th>
                <th className="px-4 py-3 font-medium" style={{ color: "var(--color-pg-text-2)" }}>Cost</th>
              </tr>
            </thead>
            <tbody>
              {sortedRows.map((row, index) => (
                <motion.tr
                  key={row.model}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.28, delay: index * 0.03 }}
                  style={{
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    background: index === 0 ? "rgba(96,165,250,0.06)" : "transparent",
                  }}
                >
                  <td className="px-4 py-4">
                    <div className="font-medium" style={{ color: "var(--color-pg-text-1)" }}>
                      {row.model}
                    </div>
                    <div className="mt-1 text-xs leading-5" style={{ color: "var(--color-pg-text-3)" }}>
                      {row.summary}
                    </div>
                  </td>
                  <td className="px-4 py-4" style={{ color: "var(--color-pg-text-2)" }}>{row.deployment}</td>
                  <td className="px-4 py-4" style={{ color: "var(--color-pg-text-1)" }}>{row.ttft}</td>
                  <td className="px-4 py-4" style={{ color: "var(--color-pg-text-1)" }}>{row.tps}</td>
                  <td className="px-4 py-4" style={{ color: "var(--color-pg-text-1)" }}>{row.cost}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-5 grid gap-2 text-xs sm:grid-cols-3">
        {benchmarkMethodology.map((item) => (
          <div
            key={item}
            className="rounded-2xl border p-3 leading-5"
            style={{
              borderColor: "rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.025)",
              color: "var(--color-pg-text-2)",
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
