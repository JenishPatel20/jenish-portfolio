"use client";

import { motion } from "motion/react";
import { Zap, Mail } from "lucide-react";
import { HeroVisual } from "./hero-visual";

interface HeroProps {
  onRecruiterMode: () => void;
}

export function Hero({ onRecruiterMode }: HeroProps) {
  const handleRecruiterMode = () => {
    onRecruiterMode();
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: "#09090f" }}
    >
      {/* Dot-grid overlay */}
      <div className="absolute inset-0 hero-grid" />

      {/* Ambient glow orbs */}
      <div
        className="absolute top-1/3 left-1/4 w-[580px] h-[580px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(96,165,250,0.08) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/3 w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(167,139,250,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 section-container w-full py-24 pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

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
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pg-blue opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-pg-blue" />
              </span>
              Open to internships and software/AI engineering roles
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl sm:text-6xl font-bold tracking-tight leading-tight mb-4"
              style={{ color: "#eeeef2" }}
            >
              Jenish Patel
            </motion.h1>

            {/* Headline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-xl sm:text-2xl font-semibold mb-5 leading-snug gradient-text"
            >
              CS graduate student building AI,<br className="hidden sm:block" /> full-stack, and systems projects.
            </motion.p>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-base leading-relaxed mb-8 max-w-lg"
              style={{ color: "var(--color-pg-text-2)" }}
            >
              I build practical software with a focus on AI workflows, reinforcement learning,
              web systems, mobile experiences, and clear engineering documentation.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 mb-10"
            >
              <a href="#projects" className="btn-primary">
                View Projects
              </a>
              <button onClick={handleRecruiterMode} className="btn-secondary">
                <Zap className="w-4 h-4" />
                Recruiter Mode — 60s
              </button>
            </motion.div>

            {/* Trust line */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-xs mb-6"
              style={{ color: "var(--color-pg-text-3)" }}
            >
              MS CS @ Rutgers · Graduating Fall 2026 · BS CS 2024
            </motion.p>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="flex items-center gap-5"
            >
              <a
                href="https://github.com/JenishPatel20"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="transition-colors duration-200"
                style={{ color: "var(--color-pg-text-3)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-pg-text-1)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-pg-text-3)")}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/jenish--patel"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="transition-colors duration-200"
                style={{ color: "var(--color-pg-text-3)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-pg-text-1)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-pg-text-3)")}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="mailto:jenishvpatel4995@gmail.com"
                aria-label="Email"
                className="transition-colors duration-200"
                style={{ color: "var(--color-pg-text-3)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-pg-text-1)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-pg-text-3)")}
              >
                <Mail className="w-5 h-5" />
              </a>
            </motion.div>
          </div>

          {/* ── Right: visual placeholder (hidden on mobile) ── */}
          <div className="hidden lg:flex justify-center">
            <HeroVisual />
          </div>

        </div>
      </div>
    </section>
  );
}
