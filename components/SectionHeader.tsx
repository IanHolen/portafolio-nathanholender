"use client";

import { motion } from "framer-motion";

type Props = {
  index: string;
  title: string;
  kicker?: string;
};

/* "Run-sheet" header: a monospace section code + hairline rule, then a
   poster-scale Archivo title. Deliberately technical / operational. */
export default function SectionHeader({ index, title, kicker }: Props) {
  return (
    <div className="mb-14 md:mb-16">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.32em] text-accent-green"
      >
        <span className="text-accent-green/90">S{index}</span>
        <span className="h-px flex-1 bg-gradient-to-r from-accent-green/40 via-ink-900/12 to-transparent" />
        {kicker && <span className="shrink-0 text-ink-500">{kicker}</span>}
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: 0.05 }}
        className="mt-5 font-display text-[clamp(2.4rem,6vw,4.5rem)] font-extrabold uppercase leading-[0.95] tracking-poster text-ink-900"
      >
        {title}
      </motion.h2>
    </div>
  );
}
