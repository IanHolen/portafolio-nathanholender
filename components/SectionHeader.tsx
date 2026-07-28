"use client";

import { motion } from "framer-motion";

type Props = {
  index: string;
  title: string;
  kicker?: string;
};

/* Cabecera estilo "revista": folio N.º + regla hairline + kicker en mono,
   y un título grande en Playfair. Voz editorial premium, distinta a la base. */
export default function SectionHeader({ index, title, kicker }: Props) {
  return (
    <div className="mb-14 md:mb-16">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-4"
      >
        <span className="font-mono text-xs tracking-[0.28em] text-accent-green">
          N.º {index}
        </span>
        <span className="h-px flex-1 bg-ink-900/12" />
        {kicker && (
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink-500">
            {kicker}
          </span>
        )}
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: 0.05 }}
        className="mt-6 font-display text-[clamp(2.4rem,5.5vw,4.5rem)] font-medium leading-[1.02] tracking-tight text-ink-900"
      >
        {title}
      </motion.h2>
    </div>
  );
}
