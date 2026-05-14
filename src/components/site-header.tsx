"use client";

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { FileText, Zap, Menu, X } from "lucide-react";
import Link from "next/link";
import { MagneticButton } from "@/components/magnetic-button";
import { ThemeModeToggle } from "@/components/theme-mode-toggle";

const navLinks = [
  { label: "Experience", href: "/#experience", sectionId: "experience" },
  { label: "Projects",   href: "/#projects",   sectionId: "projects"   },
  { label: "Live Demo",  href: "/#demos",      sectionId: "demos"      },
  { label: "Skills",     href: "/#skills",     sectionId: "skills"     },
  { label: "Ask",        href: "/#ask",        sectionId: "ask"        },
  { label: "Contact",    href: "/#contact",    sectionId: "contact"    },
];

interface SiteHeaderProps {
  onRecruiterMode?: () => void;
  recruiterMode?: boolean;
}

export function SiteHeader({ onRecruiterMode, recruiterMode }: SiteHeaderProps = {}) {
  const [scrolled, setScrolled]       = useState(false);
  const [cursorOn, setCursorOn]       = useState(true);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

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

  // Active section detection via IntersectionObserver
  useEffect(() => {
    const ids = navLinks.map((l) => l.sectionId);
    const visible = new Map<string, boolean>();

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => visible.set(e.target.id, e.isIntersecting));
        const active = ids.find((id) => visible.get(id));
        setActiveSection(active ?? "");
      },
      { rootMargin: "-64px 0px -45% 0px", threshold: 0 }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });

    return () => obs.disconnect();
  }, []);

  const handleRecruiterMode = () => {
    if (onRecruiterMode) {
      onRecruiterMode();
      setMobileOpen(false);
      if (!recruiterMode) {
        setTimeout(() => {
          document.getElementById("recruiter-mode")?.scrollIntoView({ behavior: "smooth" });
        }, 50);
      }
    }
  };

  return (
    <>
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-[var(--pg-header-border)]" : "bg-transparent"
      }`}
      style={
        scrolled
          ? { backgroundColor: "var(--pg-header-bg)", backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)" }
          : undefined
      }
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
            style={{ color: "var(--pg-accent)" }}
          >
            ›&nbsp;
          </span>
          <span className="font-mono text-[15px] font-medium tracking-tight text-pg-text-1">
            jenish_patel
          </span>
          <span
            className="font-mono text-[15px] font-medium ml-[2px] transition-opacity duration-75"
            style={{
              color: "var(--pg-accent)",
              opacity: cursorOn ? 1 : 0,
            }}
          >
            █
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-1" aria-label="Main navigation">
          {navLinks.map((link) => {
            const isActive = link.sectionId === activeSection;
            return (
              <a
                key={link.href}
                href={link.href}
                className="relative px-3 py-1.5 rounded-lg text-sm transition-colors duration-200 group"
                style={{
                  color: isActive ? "var(--pg-text-1)" : "var(--pg-text-2)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--pg-text-1)")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = isActive ? "var(--pg-text-1)" : "var(--pg-text-2)")
                }
              >
                {link.label}
                {/* Hover underline */}
                <span
                  className="absolute bottom-0 left-3 right-3 h-[1px] transition-transform duration-200 origin-left rounded-full"
                  style={{
                    backgroundColor: "var(--pg-accent)",
                    transform: isActive ? "scaleX(1)" : "scaleX(0)",
                  }}
                />
                {/* Group-hover underline (via CSS not Motion to avoid conflicts) */}
                <span
                  className="absolute bottom-0 left-3 right-3 h-[1px] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left rounded-full"
                  style={{ backgroundColor: "var(--pg-accent)", opacity: isActive ? 0 : 1 }}
                />
              </a>
            );
          })}

          {/* Recruiter Mode toggle */}
          <MagneticButton className="ml-1">
            <button
              onClick={handleRecruiterMode}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer"
              style={{
                color: recruiterMode ? "var(--pg-accent)" : "var(--pg-text-2)",
                background: recruiterMode ? "color-mix(in srgb, var(--pg-accent) 10%, transparent)" : "transparent",
                border: recruiterMode ? "1px solid color-mix(in srgb, var(--pg-accent) 24%, transparent)" : "1px solid transparent",
              }}
              onMouseEnter={(e) => {
                if (!recruiterMode) e.currentTarget.style.color = "var(--pg-text-1)";
              }}
              onMouseLeave={(e) => {
                if (!recruiterMode) e.currentTarget.style.color = "var(--pg-text-2)";
              }}
            >
              <Zap className="w-3.5 h-3.5" />
              Recruiter Mode
            </button>
          </MagneticButton>

          {/* Resume CTA */}
          <MagneticButton className="ml-2">
            <a
              href="/Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary px-4 py-1.5"
            >
              <FileText className="w-3.5 h-3.5" />
              Resume
            </a>
          </MagneticButton>

          <ThemeModeToggle className="ml-2" />

        </nav>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden flex items-center justify-center w-9 h-9 rounded-lg transition-colors duration-200 cursor-pointer"
          onClick={() => setMobileOpen(true)}
          aria-label="Open navigation"
          style={{ color: "var(--pg-text-2)", border: "1px solid var(--pg-border)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--pg-text-1)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--pg-text-2)")}
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>
    </motion.header>

    {/* ── Mobile slide-in drawer ── */}
    <AnimatePresence>
      {mobileOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 sm:hidden"
            style={{ background: "var(--pg-overlay)", backdropFilter: "blur(4px)" }}
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer panel */}
          <motion.div
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-72 flex flex-col sm:hidden"
            style={{
              background: "var(--pg-elevated)",
              borderLeft: "1px solid var(--pg-border)",
              backdropFilter: "blur(20px)",
            }}
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between px-6 h-16 shrink-0" style={{ borderBottom: "1px solid var(--pg-border)" }}>
              <span className="font-mono text-sm font-medium" style={{ color: "var(--pg-accent)" }}>
                Navigation
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close navigation"
                className="flex items-center justify-center w-8 h-8 rounded-lg cursor-pointer transition-colors duration-200"
                style={{ color: "var(--pg-text-2)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--pg-text-1)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--pg-text-2)")}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 flex flex-col px-4 py-6 gap-1 overflow-y-auto">
              {navLinks.map((link, i) => {
                const isActive = link.sectionId === activeSection;
                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200"
                    style={{
                      color: isActive ? "var(--pg-accent)" : "var(--pg-text-2)",
                      background: isActive ? "color-mix(in srgb, var(--pg-accent) 9%, transparent)" : "transparent",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--pg-text-1)";
                      e.currentTarget.style.background = "var(--pg-surface)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = isActive ? "var(--pg-accent)" : "var(--pg-text-2)";
                      e.currentTarget.style.background = isActive ? "color-mix(in srgb, var(--pg-accent) 9%, transparent)" : "transparent";
                    }}
                  >
                    {link.label}
                  </motion.a>
                );
              })}

              {/* Recruiter Mode */}
              <motion.button
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05 + 0.1 }}
                onClick={handleRecruiterMode}
                className="mt-2 flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer text-left"
                style={{
                  color: recruiterMode ? "var(--pg-accent)" : "var(--pg-text-2)",
                  background: recruiterMode ? "color-mix(in srgb, var(--pg-accent) 10%, transparent)" : "transparent",
                  border: recruiterMode ? "1px solid color-mix(in srgb, var(--pg-accent) 24%, transparent)" : "1px solid transparent",
                }}
              >
                <Zap className="w-3.5 h-3.5" />
                Recruiter Mode
              </motion.button>
            </nav>

            {/* Resume CTA pinned to bottom */}
            <div className="px-6 py-6 shrink-0 space-y-3" style={{ borderTop: "1px solid var(--pg-border)" }}>
              <a
                href="/Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full py-3"
                onClick={() => setMobileOpen(false)}
              >
                <FileText className="w-3.5 h-3.5" />
                Download Resume
              </a>
              <ThemeModeToggle fullWidth />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
    </>
  );
}
