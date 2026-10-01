"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Code2, Briefcase, GraduationCap, FolderOpen, Download, Mail, X, Zap, ChevronDown, ArrowUpRight } from "lucide-react";
import { MaskText } from "@/components/mask-text";
import { experiences } from "@/data/experience";
import { projects } from "@/data/projects";

// ─── Banner ───────────────────────────────────────────────────────────────────
interface RecruiterModeBannerProps {
  onDismiss: () => void;
}

export function RecruiterModeBanner({ onDismiss }: RecruiterModeBannerProps) {
  return (
    <div
      className="sticky top-16 z-40 flex items-center justify-center gap-3 text-sm py-2.5 px-4"
      style={{
        background: "color-mix(in srgb, var(--pg-accent) 11%, var(--pg-bg))",
        borderBottom: "1px solid color-mix(in srgb, var(--pg-accent) 24%, transparent)",
      }}
    >
      <Zap className="w-4 h-4 shrink-0" style={{ color: "var(--pg-accent)" }} />
      <span style={{ color: "var(--pg-accent)" }}>
        <strong>Recruiter Mode</strong> — verified experience, strongest projects, and measurable results.
      </span>
      <button
        onClick={onDismiss}
        aria-label="Exit Recruiter Mode"
        className="ml-2 p-0.5 rounded-full transition-colors cursor-pointer"
        style={{ color: "var(--pg-accent)" }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "color-mix(in srgb, var(--pg-accent) 16%, transparent)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

// ─── Stats ────────────────────────────────────────────────────────────────────
const stats = [
  { value: "20+",       label: "FastAPI endpoints · Greenlit", Icon: Briefcase     },
  { value: "48–52",     label: "TPS · Llama 3.2 1B",          Icon: Zap           },
  { value: "0.993",     label: "BankChurners holdout AUC",   Icon: FolderOpen    },
  { value: "Dec '26",   label: "M.S. CS graduation",           Icon: GraduationCap },
];

const ACC = "var(--pg-accent)";

// ─── Experience accordion card ────────────────────────────────────────────────
function CompanyBadge({ name }: { name: string }) {
  const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div
      className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 select-none"
      style={{
        background: "color-mix(in srgb, var(--pg-accent) 9%, transparent)",
        border: "1px solid color-mix(in srgb, var(--pg-accent) 22%, transparent)",
        color: ACC,
        letterSpacing: "0.04em",
      }}
    >
      {initials}
    </div>
  );
}

const TYPE_LABEL: Record<string, string> = {
  "full-time": "Full-time", "part-time": "Part-time",
  "co-op": "Co-op", "internship": "Internship", "fellowship": "Fellowship",
};
const TYPE_COLOR: Record<string, string> = {
  "co-op": "rgba(126,184,247,0.8)", "full-time": "rgba(251,191,36,0.8)",
  "part-time": "rgba(167,139,250,0.8)", "fellowship": "rgba(52,211,153,0.8)",
  "internship": "rgba(126,184,247,0.8)",
};

interface ExpCardProps { exp: (typeof experiences)[0]; isOpen: boolean; onToggle: () => void; }

function ExpAccordionCard({ exp, isOpen, onToggle }: ExpCardProps) {
  const role = exp.roles[0];
  const isCurrent = role.endDate === "Present";
  const hiddenBullets = role.bullets.length - 2;

  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-200"
      style={{
        background: "var(--pg-surface)",
        border: `1px solid ${isCurrent ? "rgba(126,184,247,0.22)" : "var(--pg-border)"}`,
      }}
    >
      {/* Shimmer for current role */}
      {isCurrent && (
        <motion.div
          className="h-[2px] w-full"
          style={{ background: "linear-gradient(90deg, transparent 0%, rgba(126,184,247,0.65) 50%, transparent 100%)", backgroundSize: "200% 100%" }}
          animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
        />
      )}

      {/* Header row (always visible) */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 p-5 text-left cursor-pointer"
        aria-expanded={isOpen}
      >
        <CompanyBadge name={exp.company} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-0.5">
            <span className="text-sm font-bold" style={{ color: "var(--pg-text-1)" }}>
              {exp.company}
            </span>
            {isCurrent && (
              <span
                className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                style={{ color: "rgb(52,211,153)", background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.25)" }}
              >
                Current
              </span>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="text-xs font-medium" style={{ color: "var(--pg-text-2)" }}>
              {role.title}
            </span>
            <span
              className="text-[10px] px-1.5 py-0.5 rounded-full font-medium"
              style={{ color: TYPE_COLOR[role.type], background: "var(--pg-surface)", border: "1px solid var(--pg-border)" }}
            >
              {TYPE_LABEL[role.type]}
            </span>
            <span className="text-[11px]" style={{ color: "var(--pg-text-3)" }}>
              {role.startDate} – {role.endDate} · {role.location}
            </span>
          </div>
        </div>
        <ChevronDown
          className="w-4 h-4 shrink-0 transition-transform duration-300"
          style={{ color: "var(--pg-text-3)", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      {/* Always-visible preview: 2 bullets */}
      <div className="px-5 pb-3 space-y-2">
        {role.bullets.slice(0, 2).map((bullet, i) => (
          <div key={i} className="flex gap-2.5">
            <span className="mt-[7px] h-[5px] w-[5px] shrink-0 rounded-full" style={{ background: ACC, opacity: 0.7 }} />
            <span className="text-sm leading-relaxed" style={{ color: "var(--pg-text-2)" }}>{bullet}</span>
          </div>
        ))}
        {!isOpen && hiddenBullets > 0 && (
          <button
            onClick={onToggle}
            className="mt-1 text-xs font-medium cursor-pointer transition-colors duration-150"
            style={{ color: "var(--pg-text-3)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = ACC)}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--pg-text-3)")}
          >
            +{hiddenBullets} more bullet{hiddenBullets > 1 ? "s" : ""} · tap to expand
          </button>
        )}
      </div>

      {/* Expanded content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="exp-body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div className="px-5 pb-5 space-y-3">
              {/* Remaining bullets */}
              {role.bullets.slice(2).map((bullet, i) => (
                <div key={i} className="flex gap-2.5">
                  <span className="mt-[7px] h-[5px] w-[5px] shrink-0 rounded-full" style={{ background: ACC, opacity: 0.5 }} />
                  <span className="text-sm leading-relaxed" style={{ color: "var(--pg-text-2)" }}>{bullet}</span>
                </div>
              ))}

              {/* Tech tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {role.tags.map((tag) => (
                  <span key={tag} className="skill-chip text-xs px-2.5 py-0.5">{tag}</span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Project accordion card ───────────────────────────────────────────────────
const ROLE_COLOR: Record<string, { color: string; bg: string; border: string }> = {
  "ai-ml":      { color: "#7eb8f7", bg: "rgba(126,184,247,0.08)", border: "rgba(126,184,247,0.22)" },
  "full-stack": { color: "#34d399", bg: "rgba(52,211,153,0.08)",  border: "rgba(52,211,153,0.22)"  },
  "systems":    { color: "#fb923c", bg: "rgba(251,146,60,0.08)",  border: "rgba(251,146,60,0.22)"  },
  "mobile":     { color: "#a78bfa", bg: "rgba(167,139,250,0.08)", border: "rgba(167,139,250,0.22)" },
};
const ROLE_LABEL: Record<string, string> = {
  "ai-ml": "AI / ML", "full-stack": "Full Stack", "systems": "Systems", "mobile": "Mobile",
};

interface ProjCardProps { project: (typeof projects)[0]; isOpen: boolean; onToggle: () => void; }

function ProjAccordionCard({ project, isOpen, onToggle }: ProjCardProps) {
  const rc = ROLE_COLOR[project.roles[0]];

  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-200"
      style={{ background: "var(--pg-surface)", border: "1px solid var(--pg-border)" }}
    >
      {/* Accent strip */}
      <div style={{ height: 2, background: `linear-gradient(90deg, ${rc.color}cc 0%, ${rc.color}22 60%, transparent 100%)` }} />

      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full flex items-start gap-3 p-5 text-left cursor-pointer"
        aria-expanded={isOpen}
      >
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="text-sm font-bold" style={{ color: "var(--pg-text-1)" }}>
              {project.title}
            </span>
            <span
              className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
              style={{ color: rc.color, background: rc.bg, border: `1px solid ${rc.border}` }}
            >
              {ROLE_LABEL[project.roles[0]]}
            </span>
            <span className="text-[11px] ml-auto tabular-nums" style={{ color: "var(--pg-text-3)" }}>
              {project.year}
            </span>
          </div>
          <p className="text-sm leading-relaxed line-clamp-2" style={{ color: "var(--pg-text-2)" }}>
            {project.description}
          </p>
        </div>
        <ChevronDown
          className="w-4 h-4 shrink-0 mt-0.5 transition-transform duration-300"
          style={{ color: "var(--pg-text-3)", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      {/* Highlight metric (always visible) */}
      {project.highlight && (
        <div className="px-5 pb-3">
          <div
            className="px-3 py-2 rounded-lg"
            style={{ background: rc.bg, border: `1px solid ${rc.border}` }}
          >
            <p className="text-xs font-mono leading-relaxed" style={{ color: "var(--pg-text-2)" }}>
              <span style={{ color: rc.color }}>↳ </span>
              {project.highlight}
            </p>
          </div>
        </div>
      )}

      {/* Expanded content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="proj-body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div className="px-5 pb-5 space-y-3 border-t" style={{ borderColor: "var(--pg-border)", paddingTop: "12px" }}>
              {/* Tech tags */}
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span key={tag} className="skill-chip text-xs px-2.5 py-0.5">{tag}</span>
                ))}
              </div>

              {/* Links */}
              <div className="flex flex-wrap gap-3 pt-1">
                {project.github && (
                  <a
                    href={project.github} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-medium transition-colors duration-150"
                    style={{ color: "var(--pg-text-3)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--pg-text-1)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--pg-text-3)")}
                  >
                    GitHub <ArrowUpRight className="w-3 h-3" />
                  </a>
                )}
                <a
                  href={`/projects/${project.id}`}
                  className="flex items-center gap-1.5 text-xs font-semibold transition-colors duration-150"
                  style={{ color: rc.color }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  Case Study <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export function RecruiterModeSection() {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  const toggle = (id: string) =>
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });

  const featuredPriority = ["edge-ai-benchmark", "industrial-anomaly-detection", "auction-master"];
  const featuredProjects = projects
    .filter((p) => p.featured)
    .sort((a, b) => featuredPriority.indexOf(a.id) - featuredPriority.indexOf(b.id));

  return (
    <section
      id="recruiter-mode"
      className="section-alt border-t border-pg-border py-20"
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
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-pg-text-1">
            <MaskText text="Technical snapshot" />
          </h2>
          <p className="mt-3 text-base max-w-xl mx-auto" style={{ color: "var(--pg-text-2)" }}>
            A recruiter-focused view of verified experience, measurable project results, and technical depth.
          </p>
        </motion.div>

        {/* Stats */}
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
                style={{ background: "color-mix(in srgb, var(--pg-accent) 6%, transparent)", filter: "blur(12px)" }}
              />
              <div
                className="relative flex flex-col items-center text-center p-6 rounded-2xl transition-all duration-300"
                style={{ background: "var(--pg-surface)", border: "1px solid var(--pg-border)" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--pg-border-hover)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--pg-border)")}
              >
                <stat.Icon className="w-6 h-6 mb-3" style={{ color: ACC }} />
                <div className="text-2xl font-bold text-pg-text-1 mb-1">{stat.value}</div>
                <div className="text-xs" style={{ color: "var(--pg-text-2)" }}>{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Experience accordion */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--pg-text-3)" }}>
            Experience
          </p>
          <div className="space-y-3">
            {experiences.map((exp) => (
              <ExpAccordionCard
                key={exp.company}
                exp={exp}
                isOpen={openIds.has(`exp-${exp.company}`)}
                onToggle={() => toggle(`exp-${exp.company}`)}
              />
            ))}
          </div>
        </motion.div>

        {/* Projects accordion */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--pg-text-3)" }}>
            Featured Projects
          </p>
          <div className="space-y-3">
            {featuredProjects.map((project) => (
              <ProjAccordionCard
                key={project.id}
                project={project}
                isOpen={openIds.has(`proj-${project.id}`)}
                onToggle={() => toggle(`proj-${project.id}`)}
              />
            ))}
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row justify-center gap-3"
        >
          <a href="/Resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-primary flex items-center gap-2">
            <Download className="w-4 h-4" />
            View Resume
          </a>
          <a href="mailto:jenishvpatel4995@gmail.com" className="btn-secondary flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Contact Me
          </a>
        </motion.div>

      </div>
    </section>
  );
}
