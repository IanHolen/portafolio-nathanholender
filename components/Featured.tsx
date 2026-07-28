"use client";

import { motion } from "framer-motion";
import { campaigns } from "@/lib/data";
import { useLocale } from "./I18nProvider";
import { t, tArray } from "@/lib/translations";

interface CampaignText {
  title: string;
  figure: string;
  unit: string;
  blurb: string;
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-chalk-500 transition-colors duration-300 group-hover:border-accent-orange/40 group-hover:text-chalk-700">
      {children}
    </span>
  );
}

export default function Featured() {
  const { locale } = useLocale();
  const texts = tArray<CampaignText>("featured.items", locale);
  const hero = campaigns[0];
  const heroText = texts[0];
  const rest = campaigns.slice(1);

  return (
    <section
      id="featured"
      className="relative overflow-hidden bg-espresso px-6 py-28 md:py-36"
    >
      {/* Ambiente cálido de la superficie oscura */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.5] [background-image:radial-gradient(circle_at_12%_8%,rgba(201,85,63,0.22),transparent_46%),radial-gradient(circle_at_90%_88%,rgba(217,164,65,0.16),transparent_48%)]" />

      <div className="relative mx-auto max-w-6xl">
        {/* Cabecera */}
        <div className="mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4"
          >
            <span className="rounded-full border border-accent-orange/30 bg-accent-orange/10 px-3 py-1 font-mono text-[11px] tracking-[0.22em] text-accent-orange">
              N.º 03
            </span>
            <span className="h-px flex-1 bg-white/12" />
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-chalk-500">
              {t("featured.kicker", locale)}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-7 max-w-3xl font-display text-[clamp(2.4rem,5.5vw,4.5rem)] font-medium leading-[1.02] tracking-tight text-chalk"
          >
            {t("featured.title", locale)}
          </motion.h2>
        </div>

        {/* ── Pieza principal ── */}
        {hero && heroText && (
          <motion.article
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
            className="group relative overflow-hidden rounded-[32px] border border-white/12 bg-white/[0.035] p-8 transition-all duration-500 hover:border-accent-orange/40 hover:bg-white/[0.055] md:p-12"
          >
            {/* Halo dorado que despierta en hover */}
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent-orange/20 opacity-40 blur-[110px] transition-opacity duration-700 group-hover:opacity-90" />

            <div className="relative grid gap-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-center md:gap-16">
              {/* Cifra */}
              <div className="rounded-3xl border border-accent-orange/20 bg-gradient-to-br from-accent-orange/[0.14] to-transparent p-7 md:p-9">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-chalk-500">
                  {hero.org} · {hero.year}
                </p>
                <p className="mt-6 font-display text-[clamp(3.4rem,8vw,6rem)] font-medium leading-[0.88] text-accent-orange">
                  {heroText.figure}
                </p>
                <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-chalk-600">
                  {heroText.unit}
                </p>
              </div>

              {/* Relato */}
              <div>
                <h3 className="font-display text-2xl font-medium leading-tight text-chalk md:text-4xl">
                  {heroText.title}
                </h3>
                <p className="mt-5 max-w-xl leading-relaxed text-chalk-600">
                  {heroText.blurb}
                </p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {hero.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              </div>
            </div>
          </motion.article>
        )}

        {/* ── Resto ── */}
        <div className="mt-6 grid gap-6 md:mt-8 md:grid-cols-3">
          {rest.map((c, idx) => {
            const text = texts[idx + 1];
            if (!text) return null;
            return (
              <motion.article
                key={c.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.08,
                  ease: [0.2, 0.8, 0.2, 1],
                }}
                className="group relative flex flex-col overflow-hidden rounded-[28px] border border-white/12 bg-white/[0.035] p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-accent-orange/40 hover:bg-white/[0.06] hover:shadow-[0_30px_60px_-40px_rgba(0,0,0,0.9)]"
              >
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent-orange/25 opacity-0 blur-[70px] transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative flex flex-1 flex-col">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-chalk-500">
                    {c.org} · {c.year}
                  </p>

                  <p className="mt-6 font-display text-[2.75rem] font-medium leading-[0.95] text-accent-orange">
                    {text.figure}
                  </p>
                  <p className="mt-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-chalk-500">
                    {text.unit}
                  </p>

                  <div className="my-6 h-px w-full bg-white/10 transition-colors duration-500 group-hover:bg-accent-orange/30" />

                  <h3 className="font-display text-xl font-medium leading-snug text-chalk">
                    {text.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-chalk-600">
                    {text.blurb}
                  </p>

                  <div className="mt-auto flex flex-wrap gap-2 pt-6">
                    {c.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
