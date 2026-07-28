"use client";

import { motion } from "framer-motion";
import { campaigns } from "@/lib/data";
import SectionHeader from "./SectionHeader";
import { useLocale } from "./I18nProvider";
import { t, tArray } from "@/lib/translations";

interface CampaignText {
  title: string;
  figure: string;
  unit: string;
  blurb: string;
}

/* La pieza principal es la única superficie oscura: una tarjeta que flota
   sobre el hueso en vez de una banda que parte la página en dos. */
function TagPill({
  children,
  dark,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <span
      className={`rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors duration-300 ${
        dark
          ? "border-white/15 bg-white/[0.05] text-chalk-500 group-hover:border-accent-orange/40 group-hover:text-chalk-700"
          : "border-ink-900/12 bg-black/[0.03] text-ink-500 group-hover:border-accent-amber/45 group-hover:text-ink-700"
      }`}
    >
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
    <section id="featured" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="03"
          kicker={t("featured.kicker", locale)}
          title={t("featured.title", locale)}
        />

        {/* ── Pieza principal: la única superficie oscura de la sección ── */}
        {hero && heroText && (
          <motion.article
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
            className="group relative overflow-hidden rounded-[32px] bg-espresso p-8 shadow-[0_40px_80px_-50px_rgba(29,24,21,0.7)] transition-shadow duration-500 hover:shadow-[0_46px_90px_-46px_rgba(29,24,21,0.85)] md:p-12"
          >
            <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(ellipse_at_18%_0%,rgba(192,138,43,0.18),transparent_60%)]" />

            <div className="relative grid gap-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-center md:gap-16">
              <div className="rounded-3xl border border-accent-orange/25 bg-gradient-to-br from-accent-orange/[0.16] to-transparent p-7 md:p-9">
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

              <div>
                <h3 className="font-display text-2xl font-medium leading-tight text-chalk md:text-4xl">
                  {heroText.title}
                </h3>
                <p className="mt-5 max-w-xl leading-relaxed text-chalk-600">
                  {heroText.blurb}
                </p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {hero.tags.map((tag) => (
                    <TagPill key={tag} dark>
                      {tag}
                    </TagPill>
                  ))}
                </div>
              </div>
            </div>
          </motion.article>
        )}

        {/* ── El resto, en claro, para no romper el recorrido ── */}
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
                className="group flex flex-col overflow-hidden rounded-[28px] border border-ink-900/10 bg-card transition-all duration-500 hover:-translate-y-1.5 hover:border-accent-amber/40 hover:shadow-[0_24px_50px_-32px_rgba(29,24,21,0.4)]"
              >
                {/* Cabecera con la cifra, sobre un tinte oro deliberado */}
                <div className="border-b border-ink-900/8 bg-accent-amber/[0.08] px-7 py-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500">
                    {c.org} · {c.year}
                  </p>
                  <p className="mt-4 font-display text-[2.75rem] font-medium leading-[0.95] text-accent-amber">
                    {text.figure}
                  </p>
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-500">
                    {text.unit}
                  </p>
                </div>

                <div className="flex flex-1 flex-col px-7 py-7">
                  <h3 className="font-display text-xl font-medium leading-snug text-ink-900">
                    {text.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-700">
                    {text.blurb}
                  </p>

                  <div className="mt-auto flex flex-wrap gap-2 pt-6">
                    {c.tags.map((tag) => (
                      <TagPill key={tag}>{tag}</TagPill>
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
