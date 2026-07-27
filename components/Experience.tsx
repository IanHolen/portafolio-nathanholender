"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Plus, Minus } from "lucide-react";
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
      <span className="mt-[11px] h-0.5 w-6 shrink-0 rounded-full bg-gradient-to-r from-accent-green to-accent-green/30" />
      <span>{children}</span>
    </li>
  );
}

function ExperienceCard({
  exp,
  logos,
  stack,
  index,
  defaultOpen,
}: {
  exp: ExpItem;
  logos: string[];
  stack: string[];
  index: number;
  defaultOpen: boolean;
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
      transition={{ duration: 0.6, delay: index * 0.06 }}
      className={`border-glow group rounded-2xl border bg-card px-5 py-7 transition-colors md:px-8 md:py-9 ${
        open ? "border-accent-green/25" : "border-ink-900/10 hover:border-ink-900/15"
      }`}
    >
      <div className="flex items-start gap-6">
        <div className="hidden w-40 shrink-0 pt-1 font-mono text-xs uppercase tracking-[0.2em] text-ink-500 md:block">
          {exp.period}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="font-display text-2xl font-light leading-tight text-ink-900 md:text-3xl">
            {exp.role}
          </h3>
          <div className="mt-2 flex flex-wrap items-center gap-2.5">
            {logos.length > 0 && (
              <div className="flex items-center gap-2">
                {logos.map((logo) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={logo}
                    src={logo}
                    alt={exp.company}
                    className="h-6 w-auto shrink-0 object-contain"
                  />
                ))}
              </div>
            )}
            <p className="text-sm text-accent-green">{exp.company}</p>
          </div>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-400 md:hidden">
            {exp.period}
          </p>

          <p className="mt-4 max-w-2xl text-ink-700">{exp.description}</p>

          {exp.metrics?.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {exp.metrics.map((m) => (
                <span
                  key={m}
                  className="rounded-full border border-accent-green/25 bg-accent-green/10 px-3 py-1 font-mono text-xs font-medium text-accent-green"
                >
                  {m}
                </span>
              ))}
            </div>
          )}

          {preview.length > 0 && (
            <ul className="mt-6 space-y-3">
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
                  <ul className="mt-3 space-y-3">
                    {rest.map((h, j) => (
                      <Bullet key={j}>{h}</Bullet>
                    ))}
                  </ul>
                )}
                {stack.length > 0 && (
                  <div className="mt-8">
                    <h4 className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-ink-400">
                      {t("experience.stackLabel", locale)}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {stack.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-ink-900/10 bg-black/[0.03] px-3 py-1 text-xs text-ink-600"
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
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent-green px-5 py-2.5 text-sm font-semibold text-paper shadow-[0_6px_18px_-6px_rgba(23,53,107,0.5)] transition hover:bg-accent-green/90 hover:shadow-[0_8px_22px_-6px_rgba(23,53,107,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-green focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
            >
              {open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              {open ? t("experience.collapse", locale) : t("experience.expand", locale)}
            </button>
          )}
        </div>

        <ChevronDown
          className={`mt-2 hidden h-5 w-5 shrink-0 text-ink-300 transition-transform duration-300 md:block ${
            open ? "rotate-180 text-accent-green/60" : ""
          }`}
        />
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const { locale } = useLocale();
  const items = tArray<ExpItem>("experience.items", locale);

  return (
    <section id="experience" className="relative px-6 py-32">
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[400px] w-[400px] rounded-full bg-accent-emerald/10 blur-[140px]" />
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="02"
          kicker={t("experience.kicker", locale)}
          title={t("experience.title", locale)}
        />

        <div className="space-y-4">
          {items.map((exp, i) => (
            <ExperienceCard
              key={`${exp.role}-${exp.period}`}
              exp={exp}
              logos={experience[i]?.logos ?? []}
              stack={experience[i]?.stack ?? []}
              index={i}
              defaultOpen={i === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
