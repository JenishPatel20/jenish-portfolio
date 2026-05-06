"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Zap } from "lucide-react";
import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { About } from "@/components/about";
import { Contact } from "@/components/contact";

export default function Home() {
  const [recruiterMode, setRecruiterMode] = useState(false);

  return (
    <>
      <Nav />

      {/* Recruiter Mode Banner */}
      <AnimatePresence>
        {recruiterMode && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="sticky top-16 z-40 overflow-hidden"
          >
            <div className="flex items-center justify-center gap-3 bg-blue-600 text-white text-sm py-2.5 px-4">
              <Zap className="w-4 h-4 shrink-0" />
              <span>
                <strong>Recruiter Mode</strong> — showing top 3 projects. Scroll down for the highlights.
              </span>
              <button
                onClick={() => setRecruiterMode(false)}
                aria-label="Exit Recruiter Mode"
                className="ml-2 p-0.5 rounded-full hover:bg-white/20 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <Hero onRecruiterMode={() => setRecruiterMode(true)} />
        <Projects recruiterMode={recruiterMode} />
        <Skills />
        <About />
      </main>

      <Contact />
    </>
  );
}
