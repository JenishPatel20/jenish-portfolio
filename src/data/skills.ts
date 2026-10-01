export interface SkillGroup {
  category: string;
  skills: string[];
  span: "single" | "double";
}

export const skillGroups: SkillGroup[] = [
  {
    category: "Core Stack",
    skills: ["Python", "FastAPI", "PostgreSQL", "PyTorch", "TypeScript", "Node.js"],
    span: "double",
  },
  {
    category: "AI & ML",
    skills: ["PyTorch", "scikit-learn", "XGBoost", "SHAP", "TensorFlow/Keras", "WebGPU", "WebLLM"],
    span: "single",
  },
  {
    category: "Languages",
    skills: ["Python", "JavaScript", "TypeScript", "Java", "C++", "SQL", "HTML/CSS"],
    span: "single",
  },
  {
    category: "Data",
    skills: ["pandas", "NumPy", "matplotlib", "Jupyter"],
    span: "single",
  },
  {
    category: "Frontend",
    skills: ["React", "Next.js", "Tailwind CSS", "JavaScript"],
    span: "single",
  },
  {
    category: "Backend & Infra",
    skills: ["FastAPI", "Node.js", "Express.js", "REST APIs", "PostgreSQL", "MySQL", "Firebase", "S3", "Docker"],
    span: "double",
  },
];
