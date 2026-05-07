"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Brain, Code2, Cpu, Layers, FileText,
  X, Zap, Download, Mail, ArrowUpRight,
} from "lucide-react";
import { projects } from "@/data/projects";
import type { Project } from "@/data/projects";

// ─── Banner ───────────────────────────────────────────────────────────────────
interface RecruiterModeBannerProps {
  onDismiss: () => void;
}

export function RecruiterModeBanner({ onDismiss }: RecruiterModeBannerProps) {
  return (
    <div className="sticky top-16 z-40 flex items-center justify-center gap-3 bg-blue-600 text-white text-sm py-2.5 px-4">
      <Zap className="w-4 h-4 shrink-0" />
      <span>
        <strong>Recruiter Mode</strong> — showing top projects. Scroll down for the highlights.
      </span>
      <button
        onClick={onDismiss}
        aria-label="Exit Recruiter Mode"
        className="ml-2 p-0.5 rounded-full hover:bg-white/20 transition-colors cursor-pointer"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────
type IconComponent = React.ComponentType<{ className?: string }>;

interface Cta {
  label: string;
  href: string;
  primary: boolean;
  download?: boolean;
  Icon?: IconComponent;
}

interface WalkthroughStep {
  id: string;
  number: string;
  label: string;
  Icon: IconComponent;
  accent: string;
  headline: string;
  description: string;
  bullets: string[];
  projectIds: string[];
  ctas: Cta[];
}

// ─── Step definitions ─────────────────────────────────────────────────────────
const steps: WalkthroughStep[] = [
  {
    id: "ai-ml",
    number: "01",
    label: "AI / ML Strength",
    Icon: Brain,
    accent: "#60a5fa",
    headline: "Applied AI from browser inference to on-device ML",
    description:
      "I work across the full AI stack — fine-tuning transformers, running LLMs in-browser, and deploying on-device models to mobile. The focus is always practical: deployable, measurable, and efficient.",
    bullets: [
      "In-browser LLM benchmarking via WebGPU — zero server, zero API cost",
      "Fine-tuned CodeBERT for semantic code search — 87% top-5 recall on CodeSearchNet",
      "On-device pose estimation at 95% rep-count accuracy via TensorFlow Lite",
    ],
    projectIds: ["webgpu-llm-bench", "neural-semantic-search", "fittrack-mobile"],
    ctas: [
      { label: "View case study", href: "/projects/webgpu-llm-bench", primary: true },
      { label: "All projects",    href: "#projects",                  primary: false },
    ],
  },
  {
    id: "fullstack",
    number: "02",
    label: "Software Engineering",
    Icon: Code2,
    accent: "#22d3ee",
    headline: "Full-stack systems built for real production load",
    description:
      "I ship complete software end to end — schema design, API architecture, frontend, and deployment. My full-stack projects are built around concurrency, observability, and long-term maintainability.",
    bullets: [
      "WebSocket event bus handling 10,000 events/sec at <200ms end-to-end latency",
      "Multi-tenant analytics platform with live streaming and PostgreSQL OLAP layer",
      "FastAPI + FAISS REST API for embedding-based semantic code retrieval",
    ],
    projectIds: ["realtime-analytics", "neural-semantic-search"],
    ctas: [
      { label: "View case study", href: "/projects/realtime-analytics", primary: true },
      { label: "All projects",    href: "#projects",                    primary: false },
    ],
  },
  {
    id: "systems",
    number: "03",
    label: "Systems + Performance",
    Icon: Cpu,
    accent: "#a78bfa",
    headline: "Low-level engineering where performance is the requirement",
    description:
      "I'm comfortable at the systems layer — atomic operations, memory allocators, and hardware-aware optimization. I write for performance, measure it carefully, and document what I find.",
    bullets: [
      "Lock-free work-stealing scheduler: 4× throughput vs std::async on a 16-core workload",
      "Custom memory allocator with SIMD-optimized queues and structured cancellation tokens",
      "Browser LLM profiling measuring TTFT, token throughput, and VRAM pressure",
    ],
    projectIds: ["concurrent-scheduler", "webgpu-llm-bench"],
    ctas: [
      { label: "View case study", href: "/projects/concurrent-scheduler", primary: true },
      { label: "All projects",    href: "#projects",                      primary: false },
    ],
  },
  {
    id: "product",
    number: "04",
    label: "Product + UX",
    Icon: Layers,
    accent: "#34d399",
    headline: "Software people enjoy using — not just software that works",
    description:
      "I think about the user interaction as much as the implementation. My product work bridges real-time data, clean UI, and on-device hardware into tools people come back to.",
    bullets: [
      "Cross-platform health app with on-device AI rep counting and adaptive training plans",
      "Live analytics dashboard with multi-tenant workspaces and streaming chart updates",
      "Fully offline-capable mobile ML — all inference runs locally on device",
    ],
    projectIds: ["fittrack-mobile", "realtime-analytics"],
    ctas: [
      { label: "View case study", href: "/projects/fittrack-mobile", primary: true },
      { label: "All projects",    href: "#projects",                 primary: false },
    ],
  },
  {
    id: "resume",
    number: "05",
    label: "Resume + Contact",
    Icon: FileText,
    accent: "#f59e0b",
    headline: "Ready to connect",
    description:
      "I'm actively looking for internship and new grad opportunities in AI engineering, software engineering, and systems programming. Graduating Fall 2026 — available for Summer 2025 internships.",
    bullets: [
      "MS CS @ Rutgers University — graduating Fall 2026",
      "BS CS @ Rutgers University — class of 2024",
      "Open to internships, co-ops, and new grad SWE / ML / AI engineering roles",
    ],
    projectIds: [],
    ctas: [
      { label: "Download Resume", href: "/resume.pdf", primary: true,  download: true, Icon: Download },
      { label: "Contact Me",      href: "#contact",   primary: false, Icon: Mail },
    ],
  },
];

// ─── Inline SVGs (lucide removed brand icons) ─────────────────────────────────
const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className ?? "w-4 h-4"} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg className={className ?? "w-4 h-4"} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

// ─── Mini project card ────────────────────────────────────────────────────────
const statusDot: Record<Project["status"], string> = {
  live: "#34d399", wip: "#fbbf24", research: "#60a5fa",
};

function MiniProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={`/projects/${project.id}`}
      className="glass-card group flex flex-col gap-2 p-4 no-underline"
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-sm font-semibold leading-snug" style={{ color: "var(--color-pg-text-1)" }}>
          {project.title}
        </span>
        <span
          className="shrink-0 h-1.5 w-1.5 rounded-full mt-[5px]"
          style={{ background: statusDot[project.status] }}
        />
      </div>
      <p
        className="text-xs leading-relaxed line-clamp-2"
        style={{ color: "var(--color-pg-text-2)" }}
      >
        {project.description}
      </p>
      {project.highlight && (
        <p className="text-[11px] font-mono" style={{ color: "var(--color-pg-cyan)" }}>
          ↳ {project.highlight}
        </p>
      )}
      <div className="flex flex-wrap gap-1 mt-0.5">
        {project.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="skill-chip text-[10px] px-2 py-0.5">
            {tag}
          </span>
        ))}
      </div>
      <span
        className="text-xs mt-0.5 flex items-center gap-1 transition-colors duration-200"
        style={{ color: "var(--color-pg-blue)" }}
      >
        Case study <ArrowUpRight className="w-3 h-3" />
      </span>
    </a>
  );
}

// ─── Resume contact cards (step 5 only) ──────────────────────────────────────
function ResumeContacts() {
  const contacts = [
    { Icon: Mail,       label: "jenishvpatel4995@gmail.com",         href: "mailto:jenishvpatel4995@gmail.com",         external: false },
    { Icon: GithubIcon, label: "github.com/JenishPatel20",           href: "https://github.com/JenishPatel20",          external: true  },
    { Icon: LinkedInIcon, label: "linkedin.com/in/jenish--patel",    href: "https://www.linkedin.com/in/jenish--patel", external: true  },
  ] as const;

  return (
    <div className="flex flex-col gap-2 mb-6">
      {contacts.map(({ Icon, label, href, external }) => (
        <a
          key={label}
          href={href}
          target={external ? "_blank" : undefined}
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200"
          style={{
            background: "var(--pg-surface)",
            border: "1px solid var(--pg-border)",
            color: "var(--color-pg-text-2)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--pg-surface-hover)";
            e.currentTarget.style.borderColor = "var(--pg-border-hover)";
            e.currentTarget.style.color = "var(--color-pg-text-1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "var(--pg-surface)";
            e.currentTarget.style.borderColor = "var(--pg-border)";
            e.currentTarget.style.color = "var(--color-pg-text-2)";
          }}
        >
          <span style={{ color: "var(--color-pg-blue)" }}>
            <Icon />
          </span>
          {label}
          {external && <ArrowUpRight className="w-3.5 h-3.5 ml-auto opacity-40" />}
        </a>
      ))}
    </div>
  );
}

// ─── Content panel ────────────────────────────────────────────────────────────
function StepPanel({ step }: { step: WalkthroughStep }) {
  const stepProjects = step.projectIds
    .map((id) => projects.find((p) => p.id === id))
    .filter((p): p is Project => p !== undefined);

  return (
    <div
      className="rounded-2xl p-6 lg:p-8"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Step counter */}
      <p className="text-[11px] font-mono mb-5" style={{ color: "var(--color-pg-text-3)" }}>
        Step {step.number} / 05
      </p>

      {/* Headline */}
      <h3
        className="text-2xl sm:text-[28px] font-bold leading-tight mb-3"
        style={{ color: "var(--color-pg-text-1)" }}
      >
        {step.headline}
      </h3>

      {/* Description */}
      <p
        className="text-sm leading-relaxed mb-5 max-w-prose"
        style={{ color: "var(--color-pg-text-2)" }}
      >
        {step.description}
      </p>

      {/* Evidence bullets */}
      <ul className="flex flex-col gap-2.5 mb-6">
        {step.bullets.map((bullet) => (
          <li
            key={bullet}
            className="flex items-start gap-2.5 text-sm"
            style={{ color: "var(--color-pg-text-2)" }}
          >
            <span
              className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ background: step.accent }}
            />
            {bullet}
          </li>
        ))}
      </ul>

      {/* Mini project cards */}
      {stepProjects.length > 0 && (
        <div
          className={`grid gap-3 mb-6 ${
            stepProjects.length === 1
              ? "grid-cols-1 max-w-xs"
              : stepProjects.length === 2
              ? "grid-cols-1 sm:grid-cols-2"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {stepProjects.map((p) => (
            <MiniProjectCard key={p.id} project={p} />
          ))}
        </div>
      )}

      {/* Resume step: contact links */}
      {step.id === "resume" && <ResumeContacts />}

      {/* CTAs */}
      <div className="flex flex-wrap gap-3">
        {step.ctas.map((cta) => (
          <a
            key={cta.label}
            href={cta.href}
            download={cta.download}
            className={cta.primary ? "btn-primary" : "btn-secondary"}
          >
            {cta.Icon && <cta.Icon className="w-4 h-4" />}
            {cta.label}
          </a>
        ))}
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export function RecruiterModeSection() {
  const [active, setActive] = useState(0);
  const currentStep = steps[active];

  return (
    <section id="recruiter-mode" className="py-24" style={{ backgroundColor: "#09090f" }}>
      <div className="section-container">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
          className="mb-10"
        >
          <p className="section-label mb-2">Recruiter Mode</p>
          <h2
            className="text-3xl sm:text-4xl font-bold tracking-tight"
            style={{ color: "var(--color-pg-text-1)" }}
          >
            A fast walkthrough of my strongest work.
          </h2>
        </motion.div>

        {/* Mobile: horizontal scroll tabs */}
        <div
          className="flex lg:hidden gap-2 overflow-x-auto pb-3 mb-5 -mx-6 px-6"
          role="tablist"
          aria-label="Walkthrough steps"
        >
          {steps.map((step, i) => {
            const isActive = active === i;
            return (
              <button
                key={step.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(i)}
                className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                style={{
                  background: isActive ? "rgba(96,165,250,0.12)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${isActive ? "rgba(96,165,250,0.3)" : "rgba(255,255,255,0.08)"}`,
                  color: isActive ? step.accent : "rgba(255,255,255,0.45)",
                  whiteSpace: "nowrap",
                }}
              >
                <step.Icon className="w-3.5 h-3.5" />
                {step.label}
              </button>
            );
          })}
        </div>

        {/* Main layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-4 lg:gap-5"
        >
          {/* Desktop: left nav */}
          <nav
            role="tablist"
            aria-label="Walkthrough steps"
            className="hidden lg:flex flex-col gap-1"
          >
            {steps.map((step, i) => {
              const isActive = active === i;
              return (
                <button
                  key={step.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(i)}
                  className="relative flex items-center gap-3 w-full px-4 py-3 rounded-xl text-left transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 hover:bg-white/5"
                  style={
                    isActive
                      ? {
                          background: "rgba(255,255,255,0.06)",
                          border: "1px solid rgba(255,255,255,0.11)",
                        }
                      : {
                          border: "1px solid transparent",
                        }
                  }
                >
                  {/* Animated active bar */}
                  {isActive && (
                    <motion.span
                      layoutId="step-indicator"
                      className="absolute left-0 inset-y-2 w-0.5 rounded-full"
                      style={{ background: step.accent }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}

                  <span style={{ color: isActive ? step.accent : "var(--color-pg-text-3)" }}>
                    <step.Icon className="w-4 h-4" />
                  </span>

                  <span className="flex-1 min-w-0">
                    <span
                      className="block text-[10px] font-mono mb-0.5"
                      style={{ color: "var(--color-pg-text-3)" }}
                    >
                      {step.number}
                    </span>
                    <span
                      className="block text-[13px] font-medium leading-tight truncate"
                      style={{
                        color: isActive ? "var(--color-pg-text-1)" : "var(--color-pg-text-2)",
                      }}
                    >
                      {step.label}
                    </span>
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Content panel — shared between mobile and desktop */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              role="tabpanel"
              aria-label={currentStep.label}
            >
              <StepPanel step={currentStep} />
            </motion.div>
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
