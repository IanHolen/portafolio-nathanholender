"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { experience } from "@/lib/data";
import SectionHeader from "./SectionHeader";
import { useLocale } from "./I18nProvider";
import { t, tArray } from "@/lib/translations";

interface ExpItem {
  role: string;
  company: string;
  period: string;
  description: string;
  metrics: string[];
  highlights: string[];
}

const PREVIEW = 2; // bullets visibles con la tarjeta colapsada

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-sm leading-relaxed text-ink-700">
      <span className="mt-2 h-1 w-1 shrink-0 rotate-45 bg-accent-green" />
      <span>{children}</span>
    </li>
  );
}

function TimelineRow({
  exp,
  logos,
  stack,
  index,
  defaultOpen,
  last,
}: {
  exp: ExpItem;
  logos: string[];
  stack: string[];
  index: number;
  defaultOpen: boolean;
  last: boolean;
}) {
  const { locale } = useLocale();
  const [open, setOpen] = useState(defaultOpen);

  const preview = exp.highlights.slice(0, PREVIEW);
  const rest = exp.highlights.slice(PREVIEW);
  const hasMore = rest.length > 0 || stack.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      className="grid gap-x-8 md:grid-cols-[150px_1fr]"
    >
      {/* Rail: period (desktop) */}
      <div className="hidden pt-1 text-right md:block">
        <p className="font-mono text-[11px] uppercase leading-relaxed tracking-[0.16em] text-ink-500">
          {exp.period}
        </p>
      </div>

      {/* Line + node + content */}
      <div className={`relative border-l border-white/10 pl-7 md:pl-9 ${last ? "pb-0" : "pb-10"}`}>
        <span
          className={`absolute -left-[5px] top-1.5 h-2.5 w-2.5 rotate-45 border transition-colors ${
            open ? "border-accent-green bg-accent-green" : "border-ink-400 bg-paper"
          }`}
        />

        <p className="mb-1 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-500 md:hidden">
          {exp.period}
        </p>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          {logos.length > 0 && (
            <div className="flex items-center gap-1.5">
              {logos.map((logo) => (
                <span
                  key={logo}
                  className="inline-flex h-6 items-center rounded-[3px] bg-white/95 px-1.5"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={logo}
                    alt={exp.company}
                    className="h-3.5 w-auto object-contain"
                  />
                </span>
              ))}
            </div>
          )}
          <p className="font-mono text-xs uppercase tracking-wider text-accent-green">
            {exp.company}
          </p>
        </div>

        <h3 className="mt-2 font-display text-2xl font-bold uppercase leading-tight tracking-poster text-ink-900 md:text-3xl">
          {exp.role}
        </h3>

        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-700 md:text-base">
          {exp.description}
        </p>

        {exp.metrics?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {exp.metrics.map((m) => (
              <span
                key={m}
                className="border border-accent-green/25 bg-accent-green/10 px-2.5 py-1 font-mono text-[11px] font-medium text-accent-green"
              >
                {m}
              </span>
            ))}
          </div>
        )}

        {preview.length > 0 && (
          <ul className="mt-5 space-y-2.5">
            {preview.map((h, j) => (
              <Bullet key={j}>{h}</Bullet>
            ))}
          </ul>
        )}

        <AnimatePresence initial={false}>
          {open && hasMore && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
              className="overflow-hidden"
            >
              {rest.length > 0 && (
                <ul className="mt-2.5 space-y-2.5">
                  {rest.map((h, j) => (
                    <Bullet key={j}>{h}</Bullet>
                  ))}
                </ul>
              )}
              {stack.length > 0 && (
                <div className="mt-6">
                  <h4 className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-ink-500">
                    {t("experience.stackLabel", locale)}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {stack.map((item) => (
                      <span
                        key={item}
                        className="border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-ink-600"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {hasMore && (
          <button
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            className="mt-5 inline-flex items-center gap-2 border border-accent-green/40 px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-accent-green transition hover:bg-accent-green/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-green focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
          >
            {open ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
            {open ? t("experience.collapse", locale) : t("experience.expand", locale)}
          </button>
        )}
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const { locale } = useLocale();
  const items = tArray<ExpItem>("experience.items", locale);

  return (
    <section id="experience" className="relative px-6 py-28 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="02"
          kicker={t("experience.kicker", locale)}
          title={t("experience.title", locale)}
        />

        <div>
          {items.map((exp, i) => (
            <TimelineRow
              key={`${exp.role}-${exp.period}`}
              exp={exp}
              logos={experience[i]?.logos ?? []}
              stack={experience[i]?.stack ?? []}
              index={i}
              defaultOpen={i === 0}
              last={i === items.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
