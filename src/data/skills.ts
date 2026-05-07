export interface SkillGroup {
  category: string;
  skills: string[];
  span: "single" | "double";
}

export const skillGroups: SkillGroup[] = [
  {
    category: "Core Stack",
    skills: ["Python", "TypeScript", "React", "Next.js", "PyTorch", "FastAPI"],
    span: "double",
  },
  {
    category: "AI & ML",
    skills: ["PyTorch", "HuggingFace", "WebGPU", "ONNX", "LangChain", "FAISS", "scikit-learn"],
    span: "single",
  },
  {
    category: "Languages",
    skills: ["Python", "TypeScript", "JavaScript", "C++", "Go", "Rust", "Swift"],
    span: "single",
  },
  {
    category: "Systems",
    skills: ["CUDA", "WASM", "Linux", "SIMD", "Concurrency", "Memory Allocators"],
    span: "single",
  },
  {
    category: "Frontend",
    skills: ["React", "Next.js", "Tailwind CSS", "React Native", "Expo"],
    span: "single",
  },
  {
    category: "Backend & Infra",
    skills: ["Node.js", "FastAPI", "Flask", "PostgreSQL", "Redis", "Docker", "gRPC"],
    span: "double",
  },
];
