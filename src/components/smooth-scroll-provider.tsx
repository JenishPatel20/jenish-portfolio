"use client";

import { useEffect, useState } from "react";
import { ReactLenis } from "lenis/react";
import { MotionConfig } from "motion/react";

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      {reduceMotion ? (
        children
      ) : (
        <ReactLenis
          root
          options={{
            lerp: 0.08,
            smoothWheel: true,
            syncTouch: false,
          }}
        >
          {children}
        </ReactLenis>
      )}
    </MotionConfig>
  );
}
