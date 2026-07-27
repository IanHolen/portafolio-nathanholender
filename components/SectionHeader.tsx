"use client";

import { motion } from "framer-motion";

type Props = {
  index: string;
  title: string;
  kicker?: string;
};

export default function SectionHeader({ index, title, kicker }: Props) {
  return (
    <div className="mb-16 flex items-end justify-between border-b border-ink-900/10 pb-6">
      <div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-accent-green"
        >
          {index} {kicker && `— ${kicker}`}
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="font-display text-4xl font-light tracking-tight md:text-6xl"
        >
          {title}
        </motion.h2>
      </div>
    </div>
  );
}
