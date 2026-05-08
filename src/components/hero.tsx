"use client";

import { motion } from "motion/react";
import { ChevronDown, Brain, Cpu, Code, Smartphone, Database, Sparkles, Mail, Zap } from "lucide-react";

const techChips = [
  { Icon: Brain,      label: "AI / ML",      delay: 0    },
  { Icon: Cpu,        label: "WebGPU",        delay: 0.15 },
  { Icon: Code,       label: "Full Stack",    delay: 0.3  },
  { Icon: Smartphone, label: "Mobile",        delay: 0.45 },
  { Icon: Database,   label: "Systems",       delay: 0.6  },
  { Icon: Sparkles,   label: "Algorithms",    delay: 0.75 },
];

const GithubIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

interface HeroProps {
  onRecruiterMode: () => void;
}

export function Hero({ onRecruiterMode }: HeroProps) {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: "#000000" }}
    >
      {/* Subtle grid */}
      <div className="absolute inset-0 hero-grid pointer-events-none" />

      {/* Ambient orbs */}
      <div
        className="absolute top-[-80px] right-[-80px] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(126,184,247,0.09) 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-[-60px] left-[-60px] w-[360px] h-[360px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(126,184,247,0.05) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 section-container w-full py-24 pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── Left: content ── */}
          <div>
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="accent-badge mb-8 w-fit"
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
                  style={{ backgroundColor: "var(--color-pg-accent)" }}
                />
                <span
                  className="relative inline-flex rounded-full h-2 w-2"
                  style={{ backgroundColor: "var(--color-pg-accent)" }}
                />
              </span>
              Open to SWE &amp; AI/ML roles
            </motion.div>

            {/* Name — two-line, accent on second */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-bold tracking-tight leading-[1.0] mb-5"
              style={{ fontSize: "clamp(48px, 7vw, 72px)" }}
            >
              <span className="block text-white">Jenish</span>
              <span className="block" style={{ color: "var(--color-pg-accent)" }}>Patel.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2 }}
              className="text-lg font-medium mb-4"
              style={{ color: "var(--color-pg-text-2)" }}
            >
              Computer Science Engineer
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.3 }}
              className="text-base leading-relaxed mb-8 max-w-md"
              style={{ color: "var(--color-pg-text-2)" }}
            >
              Building intelligent systems at the intersection of AI, high-performance computing,
              and full-stack engineering. MS CS @ Rutgers, graduating Fall 2026.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 mb-10"
            >
              <a href="#projects" className="btn-primary">
                View Projects
              </a>
              <button onClick={onRecruiterMode} className="btn-secondary">
                <Zap className="w-4 h-4" />
                Recruiter Mode
              </button>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-5"
            >
              {[
                { href: "https://github.com/JenishPatel20",              label: "GitHub",   Icon: GithubIcon },
                { href: "https://www.linkedin.com/in/jenish--patel",     label: "LinkedIn", Icon: LinkedInIcon },
                { href: "mailto:jenishvpatel4995@gmail.com",             label: "Email",    Icon: () => <Mail className="w-5 h-5" /> },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="transition-colors duration-200"
                  style={{ color: "var(--color-pg-text-3)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-pg-accent)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-pg-text-3)")}
                >
                  <Icon />
                </a>
              ))}
            </motion.div>
          </div>

          {/* ── Right: floating chips ── */}
          <div className="relative hidden lg:flex items-center justify-center h-[480px]">
            {techChips.map((chip, i) => {
              const angle  = (i / techChips.length) * Math.PI * 2 - Math.PI / 2;
              const radius = 175;
              const x      = Math.cos(angle) * radius;
              const y      = Math.sin(angle) * radius;

              return (
                <motion.div
                  key={chip.label}
                  className="absolute top-1/2 left-1/2"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    x: [x - 20, x, x + 14, x],
                    y: [y, y - 14, y, y + 10, y],
                  }}
                  transition={{
                    opacity: { delay: chip.delay, duration: 0.4 },
                    scale:   { delay: chip.delay, duration: 0.4 },
                    x: { delay: chip.delay + 0.4, duration: 5 + i * 0.4, repeat: Infinity, ease: "easeInOut" },
                    y: { delay: chip.delay + 0.4, duration: 4 + i * 0.3, repeat: Infinity, ease: "easeInOut" },
                  }}
                >
                  <div
                    className="relative cursor-default select-none"
                    style={{ transform: "translate(-50%, -50%)" }}
                  >
                    {/* Glow blur behind chip */}
                    <div
                      className="absolute inset-0 rounded-2xl blur-xl opacity-30"
                      style={{ backgroundColor: "var(--color-pg-accent)" }}
                    />
                    {/* Chip */}
                    <div
                      className="relative flex flex-col items-center gap-2 px-5 py-3.5 rounded-2xl"
                      style={{
                        background:   "rgba(255,255,255,0.04)",
                        border:       "1px solid rgba(126,184,247,0.15)",
                        backdropFilter: "blur(12px)",
                      }}
                    >
                      <chip.Icon
                        className="w-6 h-6"
                        style={{ color: "var(--color-pg-accent)" }}
                      />
                      <span className="text-xs font-medium text-white whitespace-nowrap">
                        {chip.label}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Center glow orb */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full"
              animate={{ scale: [1, 1.25, 1], opacity: [0.2, 0.35, 0.2] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{ background: "var(--color-pg-accent)", filter: "blur(32px)" }}
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#projects"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { delay: 1.4, duration: 0.5 },
          y:       { delay: 1.8, duration: 2, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 transition-colors duration-200"
        style={{ color: "var(--color-pg-text-3)" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-pg-accent)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-pg-text-3)")}
      >
        <span className="text-xs tracking-widest uppercase font-medium">Explore</span>
        <ChevronDown className="w-5 h-5" />
      </motion.a>
    </section>
  );
}
