export function SiteFooter() {
  return (
    <footer
      className="py-8"
      style={{
        backgroundColor: "var(--pg-section-alt)",
        borderTop: "1px solid var(--pg-border)",
      }}
    >
      <div
        className="section-container flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
        style={{ color: "var(--pg-text-3)" }}
      >
        <span>© 2025 Jenish Patel</span>
        <span>Built with Next.js · Tailwind CSS · Motion · Vercel</span>
      </div>
    </footer>
  );
}
