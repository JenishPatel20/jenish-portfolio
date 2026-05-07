"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/hero";
import { RecruiterModeBanner } from "@/components/recruiter-mode";
import { FeaturedProjects } from "@/components/featured-projects";
import { SkillsBento } from "@/components/skills-bento";
import { ContactSection } from "@/components/contact-section";

export default function Home() {
  const [recruiterMode, setRecruiterMode] = useState(false);

  return (
    <>
      <SiteHeader onRecruiterMode={() => setRecruiterMode(true)} />

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
        <Hero onRecruiterMode={() => setRecruiterMode(true)} />
        <FeaturedProjects recruiterMode={recruiterMode} />
        <SkillsBento />
        <ContactSection />
      </main>

      <SiteFooter />
    </>
  );
}
