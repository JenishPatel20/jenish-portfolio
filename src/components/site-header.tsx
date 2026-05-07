"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Code2, FileText, Zap } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { label: "Projects", href: "/#projects" },
  { label: "Skills",   href: "/#skills" },
  { label: "Contact",  href: "/#contact" },
];

interface SiteHeaderProps {
  onRecruiterMode?: () => void;
}

export function SiteHeader({ onRecruiterMode }: SiteHeaderProps = {}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleRecruiterMode = () => {
    if (onRecruiterMode) {
      onRecruiterMode();
      document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/#projects";
    }
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
      style={scrolled ? { backgroundColor: "rgba(9,9,15,0.85)" } : undefined}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-white font-semibold text-[15px] tracking-tight hover:opacity-80 transition-opacity duration-200"
        >
          <Code2 className="w-[18px] h-[18px] text-pg-blue" />
          Jenish Patel
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-1" aria-label="Main navigation">

          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 rounded-lg text-sm text-pg-text-2 hover:text-pg-text-1 hover:bg-white/5 transition-all duration-200"
            >
              {link.label}
            </a>
          ))}

          {/* Recruiter Mode — special accent treatment */}
          <button
            onClick={handleRecruiterMode}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer"
            style={{ color: "var(--color-pg-cyan)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(34,211,238,0.07)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <Zap className="w-3.5 h-3.5" />
            Recruiter Mode
          </button>

          {/* Resume CTA */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium bg-white text-black hover:bg-white/90 transition-colors duration-200"
          >
            <FileText className="w-3.5 h-3.5" />
            Resume
          </a>
        </nav>
      </div>
    </motion.header>
  );
}
