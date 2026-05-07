"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/hero";
import { RecruiterModeBanner, RecruiterModeSection } from "@/components/recruiter-mode";
import { FeaturedProjects } from "@/components/featured-projects";
import { SkillsBento } from "@/components/skills-bento";
import { ExperienceSection } from "@/components/experience-section";
import { ContactSection } from "@/components/contact-section";

export default function Home() {
  const [recruiterMode, setRecruiterMode] = useState(false);

  const toggleRecruiterMode = () => setRecruiterMode((prev) => !prev);

  // Scroll to section when recruiter mode turns on
  useEffect(() => {
    if (recruiterMode) {
      const timer = setTimeout(() => {
        document.getElementById("recruiter-mode")?.scrollIntoView({ behavior: "smooth" });
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [recruiterMode]);

  return (
    <>
      <SiteHeader onRecruiterMode={toggleRecruiterMode} />

      <AnimatePresence>
        {recruiterMode && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <RecruiterModeBanner onDismiss={() => setRecruiterMode(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <Hero onRecruiterMode={toggleRecruiterMode} />

        <AnimatePresence>
          {recruiterMode && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="overflow-hidden"
            >
              <RecruiterModeSection />
            </motion.div>
          )}
        </AnimatePresence>

        <FeaturedProjects recruiterMode={recruiterMode} />
        <ExperienceSection />
        <SkillsBento />
        <ContactSection />
      </main>

      <SiteFooter />
    </>
  );
}
