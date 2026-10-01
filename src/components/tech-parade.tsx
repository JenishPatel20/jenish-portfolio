"use client";

// Tech parade — one scrolling row of branded skill chips used as a visual separator.
// Items are sourced from skills data; duplicated for seamless infinite loop.

const techItems: { name: string; icon: string; iconColor: string; iconBg: string }[] = [
  { name: "Python",       icon: "Py",  iconColor: "#ffd43b", iconBg: "#1e4d8c" },
  { name: "TypeScript",   icon: "TS",  iconColor: "#ffffff", iconBg: "#3178c6" },
  { name: "JavaScript",   icon: "JS",  iconColor: "#000000", iconBg: "#f7df1e" },
  { name: "React",        icon: "⚛",   iconColor: "#61dafb", iconBg: "#23272f" },
  { name: "Next.js",      icon: "N↗",  iconColor: "#ffffff", iconBg: "#111111" },
  { name: "PyTorch",      icon: "Pt",  iconColor: "#ffffff", iconBg: "#ee4c2c" },
  { name: "FastAPI",      icon: "FA",  iconColor: "#ffffff", iconBg: "#009688" },
  { name: "Node.js",      icon: "Nj",  iconColor: "#ffffff", iconBg: "#339933" },
  { name: "Docker",       icon: "Dk",  iconColor: "#ffffff", iconBg: "#2496ed" },
  { name: "PostgreSQL",   icon: "pg",  iconColor: "#ffffff", iconBg: "#336791" },
  { name: "MySQL",        icon: "My",  iconColor: "#ffffff", iconBg: "#4479a1" },
  { name: "Tailwind",     icon: "Tw",  iconColor: "#ffffff", iconBg: "#06b6d4" },
  { name: "XGBoost",      icon: "XG",  iconColor: "#ffffff", iconBg: "#1f2937" },
  { name: "WebGPU",       icon: "G↑",  iconColor: "#ffffff", iconBg: "#7c3aed" },
  { name: "WebLLM",       icon: "WL",  iconColor: "#ffffff", iconBg: "#4f46e5" },
  { name: "C++",          icon: "C+",  iconColor: "#ffffff", iconBg: "#00599c" },
  { name: "Java",         icon: "Jv",  iconColor: "#ffffff", iconBg: "#b07219" },
  { name: "SQL",          icon: "SQL", iconColor: "#ffffff", iconBg: "#336791" },
  { name: "pandas",       icon: "pd",  iconColor: "#ffffff", iconBg: "#150458" },
  { name: "NumPy",        icon: "np",  iconColor: "#ffffff", iconBg: "#4dabcf" },
  { name: "scikit-learn", icon: "sk",  iconColor: "#ffffff", iconBg: "#f7931e" },
  { name: "S3",           icon: "S3",  iconColor: "#ffffff", iconBg: "#569a31" },
];

const doubled = [...techItems, ...techItems];

export function TechParade() {
  return (
    <div
      style={{
        backgroundColor: "var(--pg-section)",
        borderTop: "1px solid var(--pg-border)",
        borderBottom: "1px solid var(--pg-border)",
        overflow: "hidden",
        padding: "16px 0",
        maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}
    >
      <style>{`
        @keyframes tech-parade {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        [data-tech-parade] {
          animation: tech-parade 45s linear infinite;
          will-change: transform;
        }
        [data-tech-parade]:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div
        data-tech-parade
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          width: "max-content",
        }}
      >
        {doubled.map((item, i) => (
          <div
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "5px 14px 5px 6px",
              borderRadius: "999px",
              background: "var(--pg-surface)",
              border: "1px solid var(--pg-border)",
              flexShrink: 0,
              cursor: "default",
              userSelect: "none",
              transition: "border-color 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--pg-border-hover)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--pg-border)")}
          >
            {/* Branded icon badge */}
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 22,
                height: 22,
                borderRadius: 6,
                background: item.iconBg,
                color: item.iconColor,
                fontSize: 9,
                fontWeight: 700,
                fontFamily: "monospace",
                letterSpacing: "-0.02em",
                flexShrink: 0,
              }}
            >
              {item.icon}
            </span>

            {/* Name */}
            <span
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: "var(--pg-text-2)",
                whiteSpace: "nowrap",
              }}
            >
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
