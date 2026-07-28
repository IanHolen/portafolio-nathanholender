"use client";

import { motion } from "framer-motion";
import { skills } from "@/lib/data";
import SectionHeader from "./SectionHeader";
import { skillMeta } from "./techIcons";
import { useLocale } from "./I18nProvider";
import { t, tArray } from "@/lib/translations";

/* Tarjetas: las 4 disciplinas van en una rejilla 2×2 (sin huecos) y las
   herramientas cierran a todo el ancho, porque son etiquetas cortas. */
export default function Skills() {
  const { locale } = useLocale();
  const groupLabels = tArray<string>("skills.groups", locale);
  const interests = tArray<string>("skills.interests", locale);

  const disciplines = skills.groups.slice(0, -1);
  const tools = skills.groups[skills.groups.length - 1];
  const toolsLabel = groupLabels[skills.groups.length - 1] ?? tools?.label;

  return (
    <section id="skills" className="relative overflow-hidden px-6 py-32">
      <div className="relative mx-auto max-w-6xl">
        <SectionHeader
          index="05"
          kicker={t("skills.kicker", locale)}
          title={t("skills.title", locale)}
        />

        <div className="grid gap-5 md:grid-cols-2">
          {disciplines.map((group, gi) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.55,
                delay: gi * 0.07,
                ease: [0.2, 0.8, 0.2, 1],
              }}
              className="group overflow-hidden rounded-[28px] border border-ink-900/10 bg-card transition-all duration-500 hover:-translate-y-1 hover:border-accent-green/35 hover:shadow-[0_24px_50px_-32px_rgba(29,24,21,0.35)]"
            >
              {/* Cabecera con color propio: el acento es una banda, no un borde teñido */}
              <div className="flex items-center gap-3 border-b border-ink-900/8 bg-accent-green/[0.07] px-7 py-5 md:px-8">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent-green font-mono text-[11px] text-white">
                  {String(gi + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-xl font-medium text-ink-900">
                  {groupLabels[gi] ?? group.label}
                </h3>
              </div>

              <div className="px-7 py-7 md:px-8">
                <ul className="space-y-3">
                  {group.items.map((item, ii) => {
                    const { Icon, color } = skillMeta(item);
                    return (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0, x: -6 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35, delay: gi * 0.07 + ii * 0.04 }}
                        className="flex items-start gap-3 text-[15px] leading-snug text-ink-700"
                      >
                        <span className="mt-[1px] inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-black/[0.045]">
                          <Icon
                            aria-hidden
                            className="h-3.5 w-3.5"
                            style={{ color }}
                            strokeWidth={2}
                          />
                        </span>
                        {item}
                      </motion.li>
                    );
                  })}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Herramientas: fila completa con chips */}
        {tools && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
            className="mt-5 overflow-hidden rounded-[28px] border border-ink-900/10 bg-card"
          >
            <div className="flex items-center gap-3 border-b border-ink-900/8 bg-accent-amber/[0.09] px-7 py-5 md:px-8">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent-amber font-mono text-[11px] text-white">
                {String(skills.groups.length).padStart(2, "0")}
              </span>
              <h3 className="font-display text-xl font-medium text-ink-900">
                {toolsLabel}
              </h3>
            </div>

            <div className="flex flex-wrap gap-2.5 px-7 py-7 md:px-8">
              {tools.items.map((item, ii) => {
                const { Icon, color } = skillMeta(item);
                return (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: ii * 0.04 }}
                    className="inline-flex items-center gap-2 rounded-full border border-ink-900/12 bg-black/[0.035] px-4 py-2 text-sm text-ink-700 transition duration-300 hover:-translate-y-0.5 hover:border-accent-green/40 hover:text-ink-900"
                  >
                    <Icon
                      aria-hidden
                      className="h-4 w-4 shrink-0"
                      style={{ color }}
                      strokeWidth={1.9}
                    />
                    {item}
                  </motion.span>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Áreas de interés */}
        <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-ink-500">
            {locale === "es" ? "Áreas de interés" : "Focus areas"}
          </p>
          <span className="h-px w-8 bg-ink-900/15" />
          {interests.map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="rounded-full border border-ink-900/10 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wide text-ink-500"
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
