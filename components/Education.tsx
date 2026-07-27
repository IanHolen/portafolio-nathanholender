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
    <section id="education" className="relative px-6 py-28 md:py-36">
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
                className="flex items-start gap-5 border border-white/10 bg-card p-6 transition hover:border-accent-green/30 md:p-7"
              >
                {education[i]?.logo && (
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md bg-white p-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={education[i].logo}
                      alt={education[i].alt}
                      className="h-full w-full object-contain"
                    />
                  </div>
                )}
                <div className="min-w-0">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-500">
                    {ed.period}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-bold uppercase leading-tight tracking-poster text-ink-900 md:text-2xl">
                    {ed.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-ink-600">{ed.institution}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="md:col-span-4">
            <div className="mb-6 font-mono text-[10px] uppercase tracking-[0.28em] text-accent-green">
              {t("languages.kicker", locale)}
            </div>
            <div className="space-y-0 border-t border-white/10">
              {languageItems.map((lang, i) => (
                <motion.div
                  key={lang.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="flex items-baseline justify-between gap-4 border-b border-white/10 py-4"
                >
                  <span className="font-display text-lg font-bold uppercase tracking-poster text-ink-900">
                    {lang.name}
                  </span>
                  <span className="text-right font-mono text-[11px] uppercase tracking-wide text-ink-500">
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
