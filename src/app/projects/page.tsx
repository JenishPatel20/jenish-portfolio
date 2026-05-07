import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProjectCard } from "@/components/project-card";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { projects } from "@/data/projects";

export const metadata = {
  title: "Projects — Jenish Patel",
  description: "All projects by Jenish Patel — AI/ML, full-stack, systems, and mobile.",
};

export default function ProjectsPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen pt-24 pb-20" style={{ backgroundColor: "#09090f" }}>
        <div className="section-container">

          <a
            href="/"
            className="inline-flex items-center gap-1.5 text-sm mb-10 transition-colors duration-200 text-pg-text-3 hover:text-pg-text-1"
          >
            <ArrowLeft className="w-4 h-4" />
            Back home
          </a>

          <div className="mb-10">
            <p className="section-label mb-2">Work</p>
            <h1 className="text-4xl font-bold tracking-tight text-pg-text-1">
              All Projects
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
