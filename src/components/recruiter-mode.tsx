import { X, Zap } from "lucide-react";

interface RecruiterModeBannerProps {
  onDismiss: () => void;
}

export function RecruiterModeBanner({ onDismiss }: RecruiterModeBannerProps) {
  return (
    <div className="sticky top-16 z-40 flex items-center justify-center gap-3 bg-blue-600 text-white text-sm py-2.5 px-4">
      <Zap className="w-4 h-4 shrink-0" />
      <span>
        <strong>Recruiter Mode</strong> — showing top 3 projects. Scroll down for the highlights.
      </span>
      <button
        onClick={onDismiss}
        aria-label="Exit Recruiter Mode"
        className="ml-2 p-0.5 rounded-full hover:bg-white/20 transition-colors cursor-pointer"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
