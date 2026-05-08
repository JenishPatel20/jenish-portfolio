"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { FileText, Zap } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { label: "Projects",   href: "/#projects" },
  { label: "Experience", href: "/#experience" },
  { label: "Skills",     href: "/#skills" },
  { label: "Contact",    href: "/#contact" },
];

interface SiteHeaderProps {
  onRecruiterMode?: () => void;
  recruiterMode?: boolean;
}

export function SiteHeader({ onRecruiterMode, recruiterMode }: SiteHeaderProps = {}) {
  const [scrolled, setScrolled]   = useState(false);
  const [cursorOn, setCursorOn]   = useState(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Blinking cursor
  useEffect(() => {
    const id = setInterval(() => setCursorOn((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  const handleRecruiterMode = () => {
    if (onRecruiterMode) {
      onRecruiterMode();
      if (!recruiterMode) {
        setTimeout(() => {
          document.getElementById("recruiter-mode")?.scrollIntoView({ behavior: "smooth" });
        }, 50);
      }
    }
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-white/5" : "bg-transparent"
      }`}
      style={scrolled ? { backgroundColor: "rgba(0,0,0,0.88)", backdropFilter: "blur(16px)" } : undefined}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Terminal cursor logo */}
        <Link
          href="/"
          className="flex items-center gap-0 group select-none"
          aria-label="Jenish Patel — home"
        >
          <span
            className="font-mono text-[15px] font-medium tracking-tight"
            style={{ color: "var(--color-pg-accent)" }}
          >
            ›&nbsp;
          </span>
          <span className="font-mono text-[15px] font-medium tracking-tight text-white">
            jenish_patel
          </span>
          <span
            className="font-mono text-[15px] font-medium ml-[2px] transition-opacity duration-75"
            style={{
              color: "var(--color-pg-accent)",
              opacity: cursorOn ? 1 : 0,
            }}
          >
            █
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-1" aria-label="Main navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative px-3 py-1.5 rounded-lg text-sm transition-all duration-200 group"
              style={{ color: "var(--color-pg-text-2)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-pg-text-2)")}
            >
              {link.label}
              <span
                className="absolute bottom-0 left-3 right-3 h-[1px] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left rounded-full"
                style={{ backgroundColor: "var(--color-pg-accent)" }}
              />
            </a>
          ))}

          {/* Recruiter Mode toggle */}
          <button
            onClick={handleRecruiterMode}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ml-1"
            style={{
              color: recruiterMode ? "var(--color-pg-accent)" : "var(--color-pg-text-2)",
              background: recruiterMode ? "rgba(126,184,247,0.08)" : "transparent",
              border: recruiterMode ? "1px solid rgba(126,184,247,0.2)" : "1px solid transparent",
            }}
            onMouseEnter={(e) => {
              if (!recruiterMode) e.currentTarget.style.color = "#ffffff";
            }}
            onMouseLeave={(e) => {
              if (!recruiterMode) e.currentTarget.style.color = "var(--color-pg-text-2)";
            }}
          >
            <Zap className="w-3.5 h-3.5" />
            Recruiter Mode
          </button>

          {/* Resume CTA */}
          <a
            href="/Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold bg-white text-black hover:bg-white/90 transition-colors duration-200"
          >
            <FileText className="w-3.5 h-3.5" />
            Resume
          </a>
        </nav>
      </div>
    </motion.header>
  );
}
