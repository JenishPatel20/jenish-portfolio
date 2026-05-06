"use client";

import { motion } from "motion/react";
import { GraduationCap, MapPin, Briefcase } from "lucide-react";

const stats = [
  { label: "Projects shipped", value: "15+" },
  { label: "Languages", value: "8+" },
  { label: "Open source contributions", value: "30+" },
  { label: "Research papers read", value: "100+" },
];

export function About() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-2">
            Background
          </p>
          <h2 className="text-4xl font-bold text-slate-900">About Me</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            <p className="text-slate-600 leading-relaxed text-lg">
              I&apos;m a CS/MS student fascinated by the boundary between research and
              production engineering. My work spans browser-native AI, distributed systems,
              and mobile — anywhere that performance and correctness collide.
            </p>
            <p className="text-slate-600 leading-relaxed">
              I care about the hard problems: latency, memory, correctness under concurrency.
              I find the most interesting work at layers most engineers skip — between the
              model weights and the UI, or between the OS and the application.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Outside of engineering I read systems papers, contribute to open source, and
              occasionally lose hours benchmarking things that didn&apos;t need benchmarking.
            </p>

            {/* Details */}
            <div className="pt-4 space-y-3">
              <div className="flex items-start gap-3 text-sm text-slate-500">
                <GraduationCap className="w-4 h-4 mt-0.5 text-blue-500 shrink-0" />
                <span>
                  <span className="font-medium text-slate-700">MS Computer Science</span>
                  {" — Rutgers University · Spring 2025 – Fall 2026"}
                </span>
              </div>
              <div className="flex items-start gap-3 text-sm text-slate-500">
                <GraduationCap className="w-4 h-4 mt-0.5 text-slate-400 shrink-0" />
                <span>
                  <span className="font-medium text-slate-700">BS Computer Science</span>
                  {" — Rutgers University · Fall 2020 – Spring 2024"}
                </span>
              </div>
              <div className="flex items-start gap-3 text-sm text-slate-500">
                <MapPin className="w-4 h-4 mt-0.5 text-blue-500 shrink-0" />
                <span>Based in New Jersey — open to remote &amp; relocation</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-slate-500">
                <Briefcase className="w-4 h-4 mt-0.5 text-blue-500 shrink-0" />
                <span>Open to Summer 2025 internships &amp; Fall 2026 new grad roles</span>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-2 gap-5"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-slate-50 border border-slate-100 rounded-2xl p-6"
              >
                <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
