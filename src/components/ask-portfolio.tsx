"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MaskText } from "@/components/mask-text";
import { Search, ArrowUpRight, Sparkles, ChevronRight, Bot, RotateCcw } from "lucide-react";
import Link from "next/link";
import { projects, type Project, type RoleFilter } from "@/data/projects";
import { skillGroups } from "@/data/skills";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Match {
  project: Project;
  score: number;
  reason: string;
}

type ResultKind = "projects" | "skills" | "none";

interface Result {
  kind: ResultKind;
  headline: string;
  matches?: Match[];
}

// ─── Chips ────────────────────────────────────────────────────────────────────

const CHIPS: { label: string; query: string }[] = [
  { label: "AI experience",       query: "which projects show AI experience"            },
  { label: "Full-stack projects", query: "show me full-stack projects"                  },
  { label: "Systems projects",    query: "best systems project"                          },
  { label: "Mobile project",      query: "which project shows mobile development"       },
  { label: "Python projects",     query: "what projects use Python"                     },
  { label: "Recruiter picks",     query: "best projects to impress a recruiter"         },
  { label: "Machine learning",    query: "which projects use machine learning"          },
  { label: "Benchmarking work",   query: "what projects show benchmarking and performance" },
];

// ─── Keyword maps ─────────────────────────────────────────────────────────────

const ROLE_TRIGGERS: [RoleFilter, string[]][] = [
  ["ai-ml", [
    "ai", "artificial intelligence", "ml", "machine learning", "neural network",
    "deep learning", "pytorch", "tensorflow", "snn", "cnn", "llm", "nlp",
    "edge ai", "benchmark", "benchmarking", "localization", "robot", "robotics",
    "churn", "prediction", "classification", "anomaly", "fault detection", "spiking",
    "xgboost", "shap", "reinforcement learning", "belief state", "computer vision",
    "performance", "inference", "model training",
  ]],
  ["full-stack", [
    "full stack", "fullstack", "full-stack", "web app", "web application",
    "backend", "frontend", "node.js", "node", "express", "mysql", "firebase",
    "rest api", "api server", "auction", "bidding", "web development",
  ]],
  ["systems", [
    "systems", "algorithm", "algorithms", "chess", "chess engine", "game logic",
    "oop", "game engine", "console app", "data structures", "systems programming",
  ]],
  ["mobile", [
    "mobile", "android", "android app", "ios", "photo album", "photo manager",
    "native app", "mobile development", "mobile app",
  ]],
];

const TECH_TRIGGERS: [string, string[]][] = [
  ["Python",      ["python"]],
  ["Java",        ["java"]],
  ["JavaScript",  ["javascript", "vanilla js"]],
  ["TypeScript",  ["typescript"]],
  ["PyTorch",     ["pytorch", "torch"]],
  ["TensorFlow",  ["tensorflow", "keras"]],
  ["WebGPU",      ["webgpu", "browser gpu"]],
  ["React",       ["react"]],
  ["Node.js",     ["node.js", "nodejs"]],
  ["MySQL",       ["mysql", "sql"]],
  ["Android SDK", ["android sdk"]],
  ["XGBoost",     ["xgboost", "gradient boosting"]],
  ["SHAP",        ["shap", "explainable ai", "explainability"]],
  ["BFS",         ["bfs", "breadth first"]],
  ["SNN",         ["snn", "spiking neural network"]],
  ["CNN",         ["cnn", "convolutional neural"]],
];

const SKILLS_TRIGGERS = [
  "skill", "skills", "strongest", "tech stack", "stack", "best at",
  "technologies", "what can you do", "technical ability",
];

const RECRUITER_TRIGGERS = [
  "recruiter", "impress", "best project", "top project", "hire",
  "showcase", "featured", "recommend", "for a recruiter",
];

// Per-project curated reason strings indexed by query context
const PROJECT_CONTEXT: Record<string, Record<string, string>> = {
  "edge-ai-benchmark": {
    "ai-ml":       "Runs LLMs (Llama 3.2, Qwen 2.5) in-browser via WebGPU — measures TTFT, TPS, and MMLU accuracy at $0/run",
    "benchmark":   "The only benchmark project — 73–172ms TTFT on Llama 3.2 1B across 3 hardware profiles",
    "performance": "Measures TTFT, tokens/sec, thermal throttling, and MMLU accuracy vs. cloud APIs",
    "python":      "Python scripts benchmark Gemini and Claude APIs for cloud vs. edge comparison",
    "default":     "Browser-native LLM benchmarking — Llama 3.2 at 48–52 TPS, $0 vs. measurable cloud API cost",
  },
  "industrial-anomaly-detection": {
    "ai-ml":          "3 SNN architectures × 2 real datasets (CWRU bearing + MIT-BIH ECG) — includes CNN→SNN weight transfer",
    "machine learning": "CNN→SNN weight transfer + surrogate gradient SNNs on industrial fault detection data",
    "pytorch":        "PyTorch-based SNNs with surrogate gradient training and rate coding",
    "python":         "6 Jupyter notebooks: full research pipeline from raw .mat vibration files to trained SNNs",
    "default":        "Brain-inspired SNN research: fault detection on real bearing vibration and ECG datasets",
  },
  "customer-churn": {
    "ai-ml":          "XGBoost + SHAP pipeline — AUC ≥ 0.85 on Telco & BankChurners with explainability per prediction",
    "machine learning": "Compares Logistic Regression, Random Forest, and XGBoost with RandomizedSearchCV tuning",
    "python":         "Pure Python: scikit-learn, XGBoost, SHAP, pandas across 3 industry datasets (~18K rows total)",
    "xgboost":        "XGBoost with RandomizedSearchCV across 3 datasets — AUC ≥ 0.85 on two of them",
    "shap":           "SHAP beeswarm + bar plots explain every prediction at the feature level",
    "default":        "Explainable churn prediction — AUC ≥ 0.85 with SHAP-powered feature attribution",
  },
  "ai-localization": {
    "ai-ml":                 "CNN regressor trained to predict localization cost — outperforms greedy baseline across belief sizes 1–20",
    "machine learning":      "π₁ (CNN-guided) consistently beats greedy π₀, especially at larger initial uncertainty",
    "reinforcement learning": "3-policy comparison: greedy, CNN-guided, dual-CNN — π₂ shows composable learned cost heuristics",
    "python":                "Python + PyTorch: BFS state space, CNN training on lazily-generated maze episodes",
    "bfs":                   "Phase 1 formulates localization cost via BFS over the belief-set state space",
    "default":               "Robot localization under uncertainty: BFS → greedy → CNN policy — π₁ beats greedy across all belief sizes",
  },
  "auction-master": {
    "full-stack":    "End-to-end: Node.js/Express REST API + MySQL + Firebase + 20+ Vanilla JS pages + Nodemailer",
    "api server":    "20+ REST endpoints: auctions, bids, preferences, auth, image upload, email triggers",
    "node":          "Node.js/Express backend with MySQL, Firebase password reset, Multer uploads, Nodemailer alerts",
    "javascript":    "Vanilla JS multi-page frontend — 20+ HTML/CSS/JS files with dark/light theme toggle",
    "default":       "3-role auction platform: admin, CR, and buyer dashboards — live bidding + preference-matched emails",
  },
  "android-photo-manager": {
    "mobile":        "Native Android: 11 Activities, AND/OR tag search with autocomplete, zero third-party libs beyond AndroidX",
    "android":       "Java + Android SDK 29 — RecyclerView, Material Design, Serializable extras, on-device persistence",
    "java":          "Pure Java, 11 Activities, FileController serialization — no third-party dependencies",
    "default":       "Native Android photo manager: albums, tag-based AND/OR search with autocomplete, on-device persistence",
  },
  "chess-engine": {
    "systems":    "Abstract piece hierarchy (6 subclasses), check/checkmate detection, en passant with state machine, castling",
    "algorithm":  "Legal move validation, check detection, checkmate resolution — clean OOP with encapsulated per-piece logic",
    "java":       "Java OOP — abstract base class with 6 concrete piece subclasses, static 8×8 board, algebraic input parsing",
    "default":    "Full chess rule set in Java: all 6 pieces, check/checkmate, en passant, castling, pawn promotion",
  },
};

// ─── Scoring engine ───────────────────────────────────────────────────────────

function pickReason(projectId: string, q: string, roleFallback: string): string {
  const ctx = PROJECT_CONTEXT[projectId];
  if (!ctx) return roleFallback;
  for (const key of Object.keys(ctx)) {
    if (key !== "default" && q.includes(key)) return ctx[key];
  }
  return ctx["default"] ?? roleFallback;
}

function scoreProject(
  project: Project,
  q: string,
  isRecruiter: boolean,
): { points: number; reason: string } {
  let points = 0;
  const roleLabels: Record<RoleFilter, string> = {
    "ai-ml":      "AI/ML project",
    "full-stack": "Full-stack web project",
    "systems":    "Systems & algorithms project",
    "mobile":     "Native mobile project",
  };

  let matchedRole: RoleFilter | null = null;

  for (const [role, kws] of ROLE_TRIGGERS) {
    if (!project.roles.includes(role)) continue;
    const hits = kws.filter(kw => q.includes(kw));
    if (hits.length) {
      points += 10 + hits.length * 2;
      if (!matchedRole) matchedRole = role;
    }
  }

  for (const [tag, kws] of TECH_TRIGGERS) {
    const hasTag = project.tags.some(t => t.toLowerCase() === tag.toLowerCase());
    if (!hasTag) continue;
    const hits = kws.filter(kw => q.includes(kw));
    if (hits.length) points += 8;
  }

  // Title word match
  const titleTokens = project.title.toLowerCase().split(/\s+/).filter(t => t.length > 3);
  if (titleTokens.some(t => q.includes(t))) points += 12;

  // Fulltext boost
  const blob = [project.description, project.highlight ?? ""].join(" ").toLowerCase();
  const qWords = q.split(/\s+/).filter(w => w.length > 3);
  points += qWords.filter(w => blob.includes(w)).length * 2;

  if (project.featured) points += 2;
  if (isRecruiter && project.featured) points += 8;

  const fallbackReason = matchedRole ? roleLabels[matchedRole] : "Relevant to your query";
  const reason = pickReason(project.id, q, fallbackReason);

  return { points, reason };
}

// ─── Main search ──────────────────────────────────────────────────────────────

function search(raw: string): Result {
  const q = raw.toLowerCase().trim();
  if (!q) return { kind: "none", headline: "" };

  const hasRoleTrigger = ROLE_TRIGGERS.some(([, kws]) => kws.some(kw => q.includes(kw)));
  const hasTechTrigger = TECH_TRIGGERS.some(([, kws]) => kws.some(kw => q.includes(kw)));

  if (SKILLS_TRIGGERS.some(kw => q.includes(kw)) && !hasRoleTrigger && !hasTechTrigger) {
    return { kind: "skills", headline: "Here's Jenish's full technical skill set:" };
  }

  const isRecruiter = RECRUITER_TRIGGERS.some(kw => q.includes(kw));

  const matches: Match[] = [];
  for (const project of projects) {
    const { points, reason } = scoreProject(project, q, isRecruiter);
    if (points > 0) matches.push({ project, score: points, reason });
  }

  // Recruiter fallback — no keyword match but it's a "best/featured" query
  if (matches.length === 0 && isRecruiter) {
    const featured = projects
      .filter(p => p.featured)
      .map(p => ({
        project: p,
        score: 10,
        reason: PROJECT_CONTEXT[p.id]?.["default"] ?? "Top featured project",
      }));
    return {
      kind: "projects",
      headline: `Jenish's ${featured.length} featured projects:`,
      matches: featured,
    };
  }

  if (matches.length === 0) return { kind: "none", headline: "" };

  matches.sort((a, b) => b.score - a.score);
  const top = matches.slice(0, 4);

  const primaryRole = ROLE_TRIGGERS.find(([, kws]) => kws.some(kw => q.includes(kw)))?.[0];
  const roleLabel: Record<RoleFilter, string> = {
    "ai-ml":      "AI/ML",
    "full-stack": "full-stack",
    "systems":    "systems",
    "mobile":     "mobile",
  };
  const headline = primaryRole
    ? `${top.length} ${roleLabel[primaryRole]} project${top.length > 1 ? "s" : ""} matching your query:`
    : `${top.length} project${top.length > 1 ? "s" : ""} matching your query:`;

  return { kind: "projects", headline, matches: top };
}

// ─── Status dot ───────────────────────────────────────────────────────────────

const statusDot: Record<string, string> = {
  live:     "bg-emerald-400",
  wip:      "bg-amber-400",
  research: "bg-blue-400",
};

// ─── Component ────────────────────────────────────────────────────────────────

export function AskPortfolio() {
  const [query, setQuery]         = useState("");
  const [result, setResult]       = useState<Result | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(q: string) {
    const trimmed = q.trim();
    if (!trimmed) return;
    setQuery(trimmed);
    setResult(search(trimmed));
    setSubmitted(true);
  }

  function handleChip(chipQuery: string) {
    setQuery(chipQuery);
    handleSubmit(chipQuery);
  }

  function handleReset() {
    setQuery("");
    setResult(null);
    setSubmitted(false);
    setTimeout(() => inputRef.current?.focus(), 50);
  }

  return (
    <section
      id="ask"
      className="py-24"
      style={{ backgroundColor: "#040404", borderTop: "1px solid rgba(255,255,255,0.04)" }}
    >
      <div className="section-container">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-3">
            <Bot className="w-4 h-4" style={{ color: "var(--color-pg-accent)" }} />
            <p className="section-label">Portfolio Search</p>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            <MaskText text="Ask My Portfolio" />
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed" style={{ color: "var(--color-pg-text-2)" }}>
            Search by role, technology, or project type. Answers come only from local portfolio data.
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="rounded-3xl overflow-hidden"
          style={{ border: "1px solid var(--pg-border)", background: "var(--pg-surface)" }}
        >

          {/* Input + chips */}
          <div
            className="p-6 sm:p-8"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
          >
            <form
              onSubmit={(e) => { e.preventDefault(); handleSubmit(query); }}
              className="flex items-center gap-3"
            >
              <div className="relative flex-1">
                <Search
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                  style={{ color: "var(--color-pg-text-3)" }}
                />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder='Try "Which project shows AI experience?" or pick a topic below'
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white placeholder-zinc-600 outline-none transition-all duration-200 bg-white/[0.04] border border-white/[0.09] focus:border-[rgba(126,184,247,0.45)] focus:ring-2 focus:ring-[rgba(126,184,247,0.08)]"
                />
              </div>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 shrink-0 cursor-pointer"
                style={{
                  background: "rgba(126,184,247,0.12)",
                  border: "1px solid rgba(126,184,247,0.25)",
                  color: "var(--color-pg-accent)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(126,184,247,0.2)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(126,184,247,0.12)")}
              >
                Ask
                <ChevronRight className="w-4 h-4" />
              </button>
            </form>

            {/* Chips */}
            <div className="flex flex-wrap gap-2 mt-4">
              {CHIPS.map((chip) => (
                <button
                  key={chip.label}
                  onClick={() => handleChip(chip.query)}
                  className="text-xs px-3 py-1.5 rounded-full transition-all duration-150 cursor-pointer"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "var(--color-pg-text-2)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(126,184,247,0.3)";
                    e.currentTarget.style.color = "var(--color-pg-accent)";
                    e.currentTarget.style.background = "rgba(126,184,247,0.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.color = "var(--color-pg-text-2)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                  }}
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>

          {/* Results */}
          <AnimatePresence mode="wait">
            {submitted && result && (
              <motion.div
                key={query}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="p-6 sm:p-8"
              >

                {/* ── No match ── */}
                {result.kind === "none" && (
                  <div className="text-center py-10">
                    <p className="text-sm mb-2 text-white">No matches found.</p>
                    <p className="text-xs mb-6 max-w-sm mx-auto" style={{ color: "var(--color-pg-text-3)" }}>
                      Try rephrasing your question, or use one of the chips above — this searches local portfolio data only.
                    </p>
                    <button
                      onClick={handleReset}
                      className="inline-flex items-center gap-1.5 text-xs px-4 py-2 rounded-lg cursor-pointer transition-all"
                      style={{
                        color: "var(--color-pg-accent)",
                        border: "1px solid rgba(126,184,247,0.2)",
                        background: "rgba(126,184,247,0.06)",
                      }}
                    >
                      <RotateCcw className="w-3 h-3" />
                      Try another question
                    </button>
                  </div>
                )}

                {/* ── Project results ── */}
                {result.kind === "projects" && result.matches && (
                  <div>
                    <p className="text-xs font-medium mb-5" style={{ color: "var(--color-pg-text-2)" }}>
                      {result.headline}
                    </p>

                    <div className="grid sm:grid-cols-2 gap-3">
                      {result.matches.map((match, i) => (
                        <motion.div
                          key={match.project.id}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.07 }}
                          className="flex flex-col gap-3 rounded-xl p-4"
                          style={{
                            background: "rgba(255,255,255,0.03)",
                            border: "1px solid rgba(255,255,255,0.07)",
                          }}
                        >
                          {/* Title */}
                          <div className="flex items-start gap-2">
                            <span className={`mt-[5px] h-1.5 w-1.5 rounded-full shrink-0 ${statusDot[match.project.status]}`} />
                            <span className="text-[13px] font-semibold text-white leading-snug">
                              {match.project.title}
                            </span>
                          </div>

                          {/* Reason */}
                          <p className="text-xs leading-relaxed" style={{ color: "var(--color-pg-text-2)" }}>
                            {match.reason}
                          </p>

                          {/* Highlight stat */}
                          {match.project.highlight && (
                            <p
                              className="text-[11px] font-mono px-2.5 py-1.5 rounded-lg"
                              style={{
                                color: "var(--color-pg-text-3)",
                                background: "rgba(255,255,255,0.02)",
                                border: "1px solid rgba(255,255,255,0.05)",
                              }}
                            >
                              ↳ {match.project.highlight}
                            </p>
                          )}

                          {/* Tags */}
                          <div className="flex flex-wrap gap-1">
                            {match.project.tags.slice(0, 4).map(tag => (
                              <span
                                key={tag}
                                className="text-[10px] px-1.5 py-0.5 rounded"
                                style={{
                                  background: "rgba(126,184,247,0.06)",
                                  border: "1px solid rgba(126,184,247,0.12)",
                                  color: "var(--color-pg-text-2)",
                                }}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* CTA */}
                          <Link
                            href={`/projects/${match.project.id}`}
                            className="mt-auto self-start flex items-center gap-1 text-[11px] font-medium transition-opacity hover:opacity-80"
                            style={{ color: "var(--color-pg-accent)" }}
                          >
                            View case study
                            <ArrowUpRight className="w-3 h-3" />
                          </Link>
                        </motion.div>
                      ))}
                    </div>

                    <button
                      onClick={handleReset}
                      className="mt-5 inline-flex items-center gap-1.5 text-xs cursor-pointer transition-colors"
                      style={{ color: "var(--color-pg-text-3)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-pg-text-2)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-pg-text-3)")}
                    >
                      <RotateCcw className="w-3 h-3" />
                      Ask another question
                    </button>
                  </div>
                )}

                {/* ── Skills result ── */}
                {result.kind === "skills" && (
                  <div>
                    <p className="text-xs font-medium mb-5" style={{ color: "var(--color-pg-text-2)" }}>
                      {result.headline}
                    </p>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {skillGroups.map((group, i) => (
                        <motion.div
                          key={group.category}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.25, delay: i * 0.05 }}
                          className="rounded-xl p-4"
                          style={{
                            background: "rgba(255,255,255,0.03)",
                            border: "1px solid rgba(255,255,255,0.07)",
                          }}
                        >
                          <p className="text-[11px] font-semibold uppercase tracking-wide mb-2.5" style={{ color: "var(--color-pg-accent)" }}>
                            {group.category}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {group.skills.map(skill => (
                              <span
                                key={skill}
                                className="text-[10px] px-1.5 py-0.5 rounded"
                                style={{
                                  background: "rgba(255,255,255,0.04)",
                                  border: "1px solid rgba(255,255,255,0.08)",
                                  color: "var(--color-pg-text-2)",
                                }}
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <button
                      onClick={handleReset}
                      className="mt-5 inline-flex items-center gap-1.5 text-xs cursor-pointer transition-colors"
                      style={{ color: "var(--color-pg-text-3)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-pg-text-2)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-pg-text-3)")}
                    >
                      <RotateCcw className="w-3 h-3" />
                      Ask another question
                    </button>
                  </div>
                )}

              </motion.div>
            )}
          </AnimatePresence>

          {/* Disclaimer */}
          <div
            className="px-6 sm:px-8 py-3 flex items-center gap-2"
            style={{ borderTop: "1px solid rgba(255,255,255,0.04)", background: "rgba(0,0,0,0.25)" }}
          >
            <Sparkles className="w-3 h-3 shrink-0" style={{ color: "var(--color-pg-text-3)" }} />
            <p className="text-[11px]" style={{ color: "var(--color-pg-text-3)" }}>
              This assistant searches only local portfolio content — no external AI API, no backend, no API keys.
            </p>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
