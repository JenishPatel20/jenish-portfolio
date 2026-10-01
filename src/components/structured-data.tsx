export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Jenish Patel",
    url: "https://jenishpatel.vercel.app",
    sameAs: [
      "https://github.com/JenishPatel20",
      "https://www.linkedin.com/in/jenish--patel",
    ],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Rutgers University",
    },
    knowsAbout: [
      "Applied AI",
      "Machine Learning",
      "Backend Engineering",
      "FastAPI",
      "PyTorch",
      "PostgreSQL",
      "WebGPU",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
