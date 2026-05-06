"use client";

import { motion } from "motion/react";

const skillGroups = [
  {
    category: "Languages",
    skills: ["Python", "TypeScript", "JavaScript", "C++", "Go", "Rust", "Java", "Swift"],
  },
  {
    category: "AI / ML",
    skills: ["PyTorch", "TensorFlow", "HuggingFace", "ONNX", "WebGPU", "LangChain", "scikit-learn", "FAISS"],
  },
  {
    category: "Frontend",
    skills: ["React", "Next.js", "Tailwind CSS", "React Native", "Expo", "Framer Motion"],
  },
  {
    category: "Backend",
    skills: ["Node.js", "FastAPI", "Flask", "PostgreSQL", "Redis", "Docker", "gRPC"],
  },
  {
    category: "Systems",
    skills: ["CUDA", "WASM", "Linux", "SIMD", "Multithreading", "Memory Allocators"],
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-2">
            Stack
          </p>
          <h2 className="text-4xl font-bold text-slate-900">Skills</h2>
        </motion.div>

        <div className="space-y-8">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: gi * 0.08 }}
            >
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
                {group.category}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-sm text-slate-700 bg-white border border-slate-200 rounded-lg font-medium hover:border-blue-300 hover:text-blue-700 transition-colors duration-200 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
