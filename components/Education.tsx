"use client";

import { motion } from "framer-motion";
import { education } from "@/lib/data";
import SectionHeader from "./SectionHeader";
import { useLocale } from "./I18nProvider";
import { t, tArray } from "@/lib/translations";

interface EdItem {
  title: string;
  institution: string;
  period: string;
}
interface LangItem {
  name: string;
  level: string;
}

export default function Education() {
  const { locale } = useLocale();
  const educationItems = tArray<EdItem>("education.items", locale);
  const languageItems = tArray<LangItem>("languages.items", locale);

  return (
    <section id="education" className="relative px-6 py-32">
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[380px] w-[380px] rounded-full bg-accent-green/10 blur-[140px]" />
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="05"
          kicker={t("education.kicker", locale)}
          title={t("education.title", locale)}
        />

        <div className="grid gap-14 md:grid-cols-12">
          <div className="space-y-4 md:col-span-8">
            {educationItems.map((ed, i) => (
              <motion.div
                key={ed.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex items-start gap-5 rounded-2xl border border-ink-900/10 bg-card p-6 transition hover:border-ink-900/15 md:p-7"
              >
                {education[i]?.logo && (
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-ink-900/10 bg-paper p-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={education[i].logo}
                      alt={education[i].alt}
                      className="h-full w-full object-contain"
                    />
                  </div>
                )}
                <div className="min-w-0">
                  <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink-500">
                    {ed.period}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-light leading-tight text-ink-900">
                    {ed.title}
                  </h3>
                  <p className="mt-1 text-ink-600">{ed.institution}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="md:col-span-4">
            <div className="mb-6 font-mono text-[11px] uppercase tracking-[0.3em] text-accent-green">
              {t("languages.kicker", locale)}
            </div>
            <div className="space-y-4">
              {languageItems.map((lang, i) => (
                <motion.div
                  key={lang.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="flex items-baseline justify-between gap-4 border-b border-ink-900/10 pb-4"
                >
                  <span className="font-display text-2xl text-ink-900">
                    {lang.name}
                  </span>
                  <span className="text-right text-sm text-ink-500">
                    {lang.level}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
