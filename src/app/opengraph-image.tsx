import { ImageResponse } from "next/og";

export const alt = "Jenish Patel — AI/ML, Backend & Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#08090d",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 28, color: "#7eb8f7" }}>
          <span>›</span>
          <span>jenish_patel</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ fontSize: 72, fontWeight: 800, letterSpacing: "-3px", lineHeight: 1 }}>
            AI/ML + Backend
          </div>
          <div style={{ fontSize: 38, color: "#b4bac5", maxWidth: 900, lineHeight: 1.25 }}>
            Building applied AI systems, backend APIs, data pipelines, and measurable ML projects.
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#7eb8f7" }}>
          <span>Rutgers M.S. Computer Science</span>
          <span>December 2026</span>
        </div>
      </div>
    ),
    size,
  );
}
