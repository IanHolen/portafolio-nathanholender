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
    <section id="skills" className="relative overflow-hidden px-6 py-28 md:py-36">
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[420px] w-[420px] rounded-full bg-accent-green/10 blur-[150px]" />
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="04"
          kicker={t("skills.kicker", locale)}
          title={t("skills.title", locale)}
        />

        <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-3">
          {skills.groups.map((group, gi) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: gi * 0.06, ease: [0.2, 0.8, 0.2, 1] }}
              className="group relative bg-card p-6 transition-colors duration-300 hover:bg-panel"
            >
              <div className="mb-5 flex items-center gap-2 border-b border-white/10 pb-3">
                <span className="font-mono text-xs text-accent-green">
                  {String(gi + 1).padStart(2, "0")}
                </span>
                <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-ink-800">
                  {groupLabels[gi] ?? group.label}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item, ii) => {
                  const { Icon, color } = skillMeta(item);
                  return (
                    <motion.span
                      key={item}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: gi * 0.06 + ii * 0.03 }}
                      className="inline-flex items-center gap-1.5 border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-xs text-ink-700 transition-colors duration-200 hover:border-accent-green/40 hover:text-ink-900"
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
            </motion.div>
          ))}
        </div>

        <div className="mt-8">
          <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-ink-500">
            // focus_areas
          </div>
          <div className="flex flex-wrap gap-2">
            {interests.map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="border border-accent-green/25 bg-accent-green/[0.06] px-3.5 py-1.5 font-mono text-xs uppercase tracking-wide text-ink-600"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
