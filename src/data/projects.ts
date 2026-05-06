export type RoleFilter = "ai-ml" | "full-stack" | "systems" | "mobile";

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  roles: RoleFilter[];
  featured?: boolean;
  github?: string;
  demo?: string;
  status: "live" | "wip" | "research";
  year: number;
  highlight?: string;
}

export const projects: Project[] = [
  {
    id: "webgpu-llm-bench",
    title: "Browser LLM Benchmark",
    description:
      "Real-time benchmarking of large language models running fully in-browser via WebGPU. Measures TTFT, tokens/sec, and memory pressure across models — zero server, zero API costs.",
    tags: ["WebGPU", "TypeScript", "LLM", "Performance", "WASM"],
    roles: ["ai-ml"],
    featured: true,
    status: "live",
    year: 2024,
    highlight: "10+ models benchmarked, sub-50ms TTFT on M2",
    github: "https://github.com/JenishPatel20",
    demo: "#",
  },
  {
    id: "neural-semantic-search",
    title: "Neural Semantic Code Search",
    description:
      "Embedding-based semantic search over large codebases. Uses a fine-tuned CodeBERT model to retrieve relevant functions by natural language query — faster and more accurate than keyword grep.",
    tags: ["Python", "PyTorch", "FAISS", "FastAPI", "CodeBERT"],
    roles: ["ai-ml", "full-stack"],
    featured: false,
    status: "research",
    year: 2024,
    highlight: "Top-5 recall of 87% on CodeSearchNet",
    github: "https://github.com/JenishPatel20",
  },
  {
    id: "realtime-analytics",
    title: "Real-time Analytics Dashboard",
    description:
      "Full-stack analytics platform with live streaming data, interactive charts, and multi-tenant workspace support. Built on a WebSocket event bus with a PostgreSQL-backed OLAP layer.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Redis", "WebSocket"],
    roles: ["full-stack"],
    featured: true,
    status: "live",
    year: 2024,
    highlight: "< 200ms end-to-end latency at 10K events/sec",
    github: "https://github.com/JenishPatel20",
    demo: "#",
  },
  {
    id: "concurrent-scheduler",
    title: "Lock-Free Task Scheduler",
    description:
      "Work-stealing, lock-free task scheduler in C++ using atomic operations and a custom memory allocator. Implements structured concurrency with cancellation tokens and priority queues.",
    tags: ["C++", "Concurrency", "Algorithms", "SIMD", "Memory"],
    roles: ["systems"],
    featured: true,
    status: "wip",
    year: 2025,
    highlight: "4× throughput vs std::async on 16-core workload",
    github: "https://github.com/JenishPatel20",
  },
  {
    id: "fittrack-mobile",
    title: "FitTrack — Health Companion",
    description:
      "Cross-platform mobile app for workout logging, progress analytics, and AI-generated training plans. Uses on-device ML for rep counting via the camera — no cloud needed.",
    tags: ["React Native", "Swift", "TensorFlow Lite", "Expo", "SQLite"],
    roles: ["mobile", "ai-ml"],
    featured: false,
    status: "wip",
    year: 2025,
    highlight: "95% rep-count accuracy via pose estimation",
    github: "https://github.com/JenishPatel20",
  },
];
