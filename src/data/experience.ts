export interface ExperienceRole {
  title: string;
  type: "full-time" | "part-time" | "co-op" | "internship";
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
        type: "co-op",
        location: "Remote",
        startDate: "Jan 2026",
        endDate: "May 2026",
        bullets: [
          "Built a configurable multi-source web scraper (Bollywood Hungama, BookMyShow) using BeautifulSoup + Gemini API for schema-driven structured extraction — raw HTML stored in content-addressed directories with S3 cloud sync.",
          "Developed a 20+ endpoint FastAPI market analysis service: movie search, sentiment timelines, genre health scoring, people intelligence (filmographies, cast chemistry), comparable film lookup, and cast ceiling estimation — all backed by PostgreSQL.",
          "Implemented a Gemini-powered script analyzer that extracts themes, tropes, and tone from a logline, scores originality against a film catalog, predicts audience reception from comparable sentiment data, and generates a 3-sentence investment brief.",
          "Designed a Genre Market Report engine computing a weighted 0–100 health score from release volume trend, financial viability (budget/revenue/ROI), quality trend, and Wikimedia audience interest — with optional two-genre intersection analysis.",
          "Built a background enrichment pipeline aggregating TMDB metadata, multi-source ratings (IMDb, Rotten Tomatoes, Metacritic, Letterboxd), and YouTube comment sentiment with async job polling so the frontend receives a fast preview while data collects.",
          "Created a force-directed network graph endpoint (color-by topic, sentiment, or source) and a Vanilla JS analytics dashboard with 8+ Chart.js visualizations — ratings, sentiment timeline, genre trend, film volume/quality/financials, originality ring, and saturation bubble.",
        ],
        tags: ["Python", "FastAPI", "PostgreSQL", "Gemini API", "TMDB API", "BeautifulSoup", "pandas", "JavaScript", "Chart.js", "S3"],
      },
    ],
  },
];
