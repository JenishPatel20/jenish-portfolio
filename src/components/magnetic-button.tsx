"use client";

import { useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

const STRENGTH = 0.38;

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
}

export function MagneticButton({ children, className }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 220, damping: 22, restDelta: 0.001 });
  const y = useSpring(rawY, { stiffness: 220, damping: 22, restDelta: 0.001 });

  const handleMove = useCallback(
    (e: React.MouseEvent) => {
      if (window.matchMedia("(hover: none)").matches) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      rawX.set((e.clientX - (rect.left + rect.width / 2)) * STRENGTH);
      rawY.set((e.clientY - (rect.top + rect.height / 2)) * STRENGTH);
    },
    [rawX, rawY],
  );

  const handleLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return (
    <motion.div
      ref={ref}
      style={{ x, y, display: "inline-flex" }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
}
