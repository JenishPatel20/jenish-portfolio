export type BenchmarkSortMetric = "ttft" | "tps" | "cost";

export interface BenchmarkRow {
  model: string;
  deployment: "Edge" | "Cloud";
  ttft: string;
  tps: string;
  cost: string;
  summary: string;
  sortValues: {
    ttft?: number;
    tps?: number;
    cost: number;
  };
}

export const benchmarkHardwareProfiles = [
  "Windows NVIDIA GPU",
  "Mac M1",
  "Mac M2 Pro",
] as const;

export const benchmarkMethodology = [
  "20 standardized prompts across 8 categories",
  "Browser models run locally with WebGPU and cost $0 per benchmark pass",
  "Cloud comparisons use Gemini 2.5 Flash and Claude Haiku 4.5 for latency and cost baselines",
] as const;

export const benchmarkRows: BenchmarkRow[] = [
  {
    model: "Llama 3.2 1B",
    deployment: "Edge",
    ttft: "73-172 ms",
    tps: "48-52",
    cost: "$0 / run",
    summary: "Best measured edge profile across local test hardware.",
    sortValues: {
      ttft: 73,
      tps: 52,
      cost: 0,
    },
  },
  {
    model: "Qwen 2.5 1.5B",
    deployment: "Edge",
    ttft: "Not published",
    tps: "32-39",
    cost: "$0 / run",
    summary: "Strong local throughput with a slightly heavier model footprint.",
    sortValues: {
      tps: 39,
      cost: 0,
    },
  },
  {
    model: "SmolLM2 1.7B",
    deployment: "Edge",
    ttft: "Not published",
    tps: "32-39",
    cost: "$0 / run",
    summary: "Competitive browser-side throughput in the same range as Qwen.",
    sortValues: {
      tps: 39,
      cost: 0,
    },
  },
  {
    model: "Gemini 2.5 Flash",
    deployment: "Cloud",
    ttft: "~300 ms",
    tps: "API-managed",
    cost: "Paid / query",
    summary: "Useful cloud baseline with measurable latency and spend.",
    sortValues: {
      ttft: 300,
      cost: 1,
    },
  },
  {
    model: "Claude Haiku 4.5",
    deployment: "Cloud",
    ttft: "Not published",
    tps: "API-managed",
    cost: "Paid / query",
    summary: "Reference point for cloud quality and cost comparisons.",
    sortValues: {
      cost: 1,
    },
  },
];
