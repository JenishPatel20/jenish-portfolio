export interface ExperienceRole {
  title: string;
  type: "full-time" | "part-time" | "co-op" | "internship" | "fellowship";
  location: string;
  startDate: string;
  endDate: string;
  bullets: string[];
  tags: string[];
}

export interface Experience {
  company: string;
  companyTagline: string;
  roles: ExperienceRole[];
}

export const experiences: Experience[] = [
  {
    company: "Greenlit",
    companyTagline: "AI-powered entertainment investment platform",
    roles: [
      {
        title: "AI/ML Engineer Intern",
        type: "internship",
        location: "Remote",
        startDate: "Jan 2026",
        endDate: "Jul 2026",
        bullets: [
          "Built a configurable multi-source web scraping pipeline for Bollywood Hungama and BookMyShow using Python, BeautifulSoup, and Gemini API — enabling schema-driven structured extraction with content-addressed storage and S3 cloud sync.",
          "Developed a 20+ endpoint FastAPI market analysis service backed by PostgreSQL — covering movie search, sentiment timelines, genre health scoring, people intelligence, comparable film lookup, and cast ceiling estimation.",
          "Implemented a Gemini-powered script analysis workflow that extracts themes, tropes, and tone from a logline, scores originality against a film catalog, predicts audience reception from sentiment data, and generates concise investment briefs.",
          "Designed a Genre Market Report engine computing weighted 0–100 health scores, and built a background enrichment pipeline aggregating TMDB metadata, multi-source ratings, and YouTube sentiment — presented via a Vanilla JS analytics dashboard with 8+ Chart.js visualizations.",
        ],
        tags: ["Python", "FastAPI", "PostgreSQL", "Gemini API", "TMDB API", "BeautifulSoup", "pandas", "JavaScript", "Chart.js", "S3"],
      },
    ],
  },
  {
    company: "Rutgers University",
    companyTagline: "State University of New Jersey",
    roles: [
      {
        title: "Building Operations Manager",
        type: "part-time",
        location: "New Brunswick, NJ",
        startDate: "Sep 2021",
        endDate: "May 2024",
        bullets: [
          "Coordinated daily building operations — assigning tasks, prioritizing urgent requests, and helping staff complete facility and event-support responsibilities efficiently.",
          "Supported campus event operations including room setups, building access, and customer service for students, staff, and university guests.",
          "Guided student staff during shifts, improving communication, task handoffs, and consistency across daily operations.",
          "Used Microsoft Teams and internal workflows to organize updates and coordinate responsibilities across staff and departments.",
        ],
        tags: ["Operations Management", "Staff Coordination", "Event Operations", "Microsoft Teams"],
      },
    ],
  },
  {
    company: "Blueprint",
    companyTagline: "Student-run product management fellowship at Rutgers",
    roles: [
      {
        title: "Product Management Fellow",
        type: "fellowship",
        location: "New Brunswick, NJ",
        startDate: "Jan 2023",
        endDate: "Apr 2023",
        bullets: [
          "Collaborated with a student product team to define user needs, clarify feature requirements, and support roadmap planning for a product-focused project.",
          "Created user stories, prioritized features, and translated research findings into actionable product requirements for engineering and design discussions.",
          "Conducted market and competitor research to identify product opportunities, risks, and feature differentiation strategies.",
          "Supported stakeholder communication through product documentation, planning discussions, and final presentation materials.",
        ],
        tags: ["Product Management", "User Research", "Roadmap Planning", "Market Research", "Stakeholder Communication"],
      },
    ],
  },
];
