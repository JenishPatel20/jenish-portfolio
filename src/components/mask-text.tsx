"use client";

import { motion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

interface MaskTextProps {
  text: string;
  className?: string;
  /** Seconds before the first word starts */
  delay?: number;
  /** Seconds between each word */
  stagger?: number;
  /** true = whileInView (section headings), false = animate on mount (hero) */
  inView?: boolean;
}

export function MaskText({
  text,
  className,
  delay = 0,
  stagger = 0.08,
  inView = true,
}: MaskTextProps) {
  const words = text.split(" ");

  return (
    <span
      className={className}
      style={{ display: "flex", flexWrap: "wrap", gap: "0 0.27em" }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span
          key={i}
          style={{ overflow: "hidden", display: "inline-block", lineHeight: "inherit" }}
        >
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "110%" }}
            {...(inView
              ? {
                  whileInView: { y: 0 },
                  viewport: { once: true, margin: "-60px" },
                }
              : { animate: { y: 0 } })}
            transition={{
              duration: 0.72,
              delay: delay + i * stagger,
              ease: EASE,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
