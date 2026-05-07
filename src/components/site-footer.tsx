export function SiteFooter() {
  return (
    <footer
      className="py-8"
      style={{
        backgroundColor: "#09090f",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div
        className="section-container flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
        style={{ color: "var(--color-pg-text-3)" }}
      >
        <span>© 2025 Jenish Patel</span>
        <span>Built with Next.js · Tailwind CSS · Motion · Vercel</span>
      </div>
    </footer>
  );
}
