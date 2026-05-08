"use client";

import { motion } from "motion/react";
import { Code2, Briefcase, GraduationCap, FolderOpen, Download, Mail, X, Zap } from "lucide-react";

// ─── Banner ───────────────────────────────────────────────────────────────────
interface RecruiterModeBannerProps {
  onDismiss: () => void;
}

export function RecruiterModeBanner({ onDismiss }: RecruiterModeBannerProps) {
  return (
    <div
      className="sticky top-16 z-40 flex items-center justify-center gap-3 text-sm py-2.5 px-4"
      style={{ background: "rgba(126,184,247,0.1)", borderBottom: "1px solid rgba(126,184,247,0.2)" }}
    >
      <Zap className="w-4 h-4 shrink-0" style={{ color: "var(--color-pg-accent)" }} />
      <span style={{ color: "var(--color-pg-accent)" }}>
        <strong>Recruiter Mode</strong> — quick view of skills, experience &amp; highlights below.
      </span>
      <button
        onClick={onDismiss}
        aria-label="Exit Recruiter Mode"
        className="ml-2 p-0.5 rounded-full transition-colors cursor-pointer"
        style={{ color: "var(--color-pg-accent)" }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(126,184,247,0.15)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

// ─── Stats ────────────────────────────────────────────────────────────────────
const stats = [
  { value: "7",        label: "Projects Built",   Icon: FolderOpen   },
  { value: "Co-op",    label: "Greenlit · AI/ML",  Icon: Briefcase    },
  { value: "MS + BS",  label: "CS @ Rutgers",       Icon: GraduationCap },
  { value: "Fall '26", label: "Available",           Icon: Code2        },
];

// ─── Highlights ───────────────────────────────────────────────────────────────
const highlights = [
  {
    title: "Technical Expertise",
    items: [
      "PyTorch & TensorFlow — SNNs, CNNs, surrogate gradient training",
      "WebGPU browser-native LLM inference — zero server, zero API cost",
      "FastAPI + PostgreSQL — 20+ endpoint market analysis service",
      "Full-stack: Node.js / Express, MySQL, Firebase, Vanilla JS",
      "Android SDK — Java, 11 Activities, tag-based search, serialization",
    ],
  },
  {
    title: "Key Achievements",
    items: [
      "Built multi-source web scraper + Genre Market Report engine at Greenlit",
      "Edge AI benchmark: Llama 3.2 1B at 73–172ms TTFT, 48–52 TPS, $0/run",
      "SNN fault detection: 3 architectures × 2 datasets (CWRU + MIT-BIH ECG)",
      "Customer churn AUC ≥ 0.85 on Telco & BankChurners with XGBoost + SHAP",
      "Chess engine: all 6 pieces, check/checkmate, en passant, castling",
    ],
  },
];

// ─── Section ──────────────────────────────────────────────────────────────────
export function RecruiterModeSection() {
  return (
    <section
      id="recruiter-mode"
      className="py-20"
      style={{ backgroundColor: "#040404", borderTop: "1px solid rgba(255,255,255,0.05)" }}
    >
      <div className="section-container">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
          className="mb-12 text-center"
        >
          <p className="section-label mb-3">Recruiter Quick View</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Why hire me?
          </h2>
          <p className="mt-3 text-base max-w-xl mx-auto" style={{ color: "var(--color-pg-text-2)" }}>
            A concise overview of what I bring — built from real projects, real co-op work, and real results.
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="group relative"
            >
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "rgba(126,184,247,0.04)", filter: "blur(12px)" }}
              />
              <div
                className="relative flex flex-col items-center text-center p-6 rounded-2xl transition-all duration-300"
                style={{ background: "var(--pg-surface)", border: "1px solid var(--pg-border)" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(126,184,247,0.3)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--pg-border)")}
              >
                <stat.Icon className="w-6 h-6 mb-3" style={{ color: "var(--color-pg-accent)" }} />
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-xs" style={{ color: "var(--color-pg-text-2)" }}>{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Highlight cards */}
        <div className="grid md:grid-cols-2 gap-5 mb-10">
          {highlights.map((section, si) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, x: si === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.15 }}
              className="p-6 rounded-2xl"
              style={{ background: "var(--pg-surface)", border: "1px solid var(--pg-border)" }}
            >
              <h3
                className="text-base font-semibold mb-5"
                style={{ color: "var(--color-pg-accent)" }}
              >
                {section.title}
              </h3>
              <ul className="flex flex-col gap-3">
                {section.items.map((item, ii) => (
                  <motion.li
                    key={ii}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: 0.2 + ii * 0.07 }}
                    className="flex items-start gap-3 text-sm"
                    style={{ color: "var(--color-pg-text-2)" }}
                  >
                    <span
                      className="mt-[7px] h-1.5 w-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: "var(--color-pg-accent)" }}
                    />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <a href="mailto:jenishvpatel4995@gmail.com" className="btn-primary flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Get in Touch
          </a>
          <a href="/Resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-secondary flex items-center gap-2">
            <Download className="w-4 h-4" />
            Download Resume
          </a>
        </motion.div>

      </div>
    </section>
  );
}
