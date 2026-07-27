"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";

export default function HighlightText({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <span
      ref={ref}
      className={`transition-all duration-700 ${
        isInView ? "text-gradient" : "text-ink-700"
      }`}
    >
      {children}
    </span>
  );
}
