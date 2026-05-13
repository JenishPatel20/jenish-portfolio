"use client";

import { ReactLenis } from "lenis/react";
import { MotionConfig } from "motion/react";

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MotionConfig reducedMotion="user">
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
    </MotionConfig>
  );
}
