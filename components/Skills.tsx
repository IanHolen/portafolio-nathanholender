"use client";

import { motion } from "framer-motion";
import { skills } from "@/lib/data";
import SectionHeader from "./SectionHeader";
import { skillMeta } from "./techIcons";
import { useLocale } from "./I18nProvider";
import { t, tArray } from "@/lib/translations";

export default function Skills() {
  const { locale } = useLocale();
  const groupLabels = tArray<string>("skills.groups", locale);
  const interests = tArray<string>("skills.interests", locale);

  return (
    <section id="skills" className="relative overflow-hidden px-6 py-32">
      <div className="pointer-events-none absolute -right-40 top-1/3 h-[420px] w-[420px] rounded-full bg-accent-green/10 blur-[150px]" />
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="04"
          kicker={t("skills.kicker", locale)}
          title={t("skills.title", locale)}
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {skills.groups.map((group, gi) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: gi * 0.07, ease: [0.2, 0.8, 0.2, 1] }}
              className="border-glow group relative overflow-hidden rounded-2xl border border-ink-900/10 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-ink-900/15 hover:bg-black/[0.03]"
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent-green/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative z-10">
                <div className="mb-4 flex items-center gap-2">
                  <span className="font-mono text-xs text-accent-green/70">
                    0{gi + 1}
                  </span>
                  <h3 className="text-sm font-semibold tracking-wide text-ink-900">
                    {groupLabels[gi] ?? group.label}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item, ii) => {
                    const { Icon, color } = skillMeta(item);
                    return (
                      <motion.span
                        key={item}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: gi * 0.07 + ii * 0.03 }}
                        className="inline-flex items-center gap-1.5 rounded-full border border-ink-900/10 bg-card px-3 py-1.5 text-xs text-ink-700 transition-colors duration-200 hover:border-ink-900/25 hover:text-ink-900"
                      >
                        <Icon
                          aria-hidden
                          className="h-3.5 w-3.5 shrink-0"
                          style={{ color }}
                          strokeWidth={1.9}
                        />
                        {item}
                      </motion.span>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          {interests.map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-full border border-ink-900/10 bg-black/[0.03] px-4 py-2 text-sm text-ink-600"
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
