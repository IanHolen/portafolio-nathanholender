"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { experience, experienceGroups } from "@/lib/data";
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

const PREVIEW = 2; // bullets visibles con el rol colapsado

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-sm leading-relaxed text-ink-700">
      <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-accent-green" />
      <span>{children}</span>
    </li>
  );
}

/** "Ago 2023 — Feb 2024" + "Dic 2024 — Presente" ⇒ "Ago 2023 — Presente" */
function spanOf(periods: string[]): string {
  if (periods.length === 0) return "";
  const dash = /\s[—–-]\s/;
  const first = periods[0].split(dash);
  const last = periods[periods.length - 1].split(dash);
  const from = last[0]?.trim() ?? "";
  const to = first[1]?.trim() ?? first[0]?.trim() ?? "";
  return periods.length === 1 ? periods[0] : `${from} — ${to}`;
}

/** "Amazon · Prime Video International" bajo el bloque Amazon ⇒ "Prime Video International" */
function subBrandOf(company: string, groupName: string): string {
  const c = (company ?? "").trim();
  const g = groupName.trim();
  if (!c || c === g) return "";
  const parts = c.split(/\s·\s/).map((x) => x.trim());
  const rest = parts.filter((x) => x !== g);
  if (rest.length === 0) return "";
  // Empresas cuyo nombre legal es más largo (Coppel S.A. de C.V.) no se repiten.
  if (rest.length === parts.length && (g.startsWith(c) || c.startsWith(g))) return "";
  return rest.join(" · ");
}

/* ─── Un rol dentro de la trayectoria de un empleador ───
   Cuelga de la línea vertical del grupo, con un nodo que se enciende. */
function Role({
  exp,
  stack,
  index,
  subBrand,
}: {
  exp: ExpItem;
  stack: string[];
  index: number;
  subBrand: string;
}) {
  const { locale } = useLocale();
  const [open, setOpen] = useState(false);

  const preview = exp.highlights.slice(0, PREVIEW);
  const rest = exp.highlights.slice(PREVIEW);
  const hasMore = rest.length > 0 || stack.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.2, 0.8, 0.2, 1] }}
      className="group relative pb-12 pl-8 last:pb-0 md:pl-14"
    >
      {/* Nodo sobre la línea del empleador */}
      <span className="absolute left-0 top-2.5 flex h-3 w-3 -translate-x-1/2 items-center justify-center">
        <span className="absolute h-3 w-3 rounded-full bg-accent-green/20 transition-transform duration-500 group-hover:scale-150" />
        <span className="h-1.5 w-1.5 rounded-full bg-accent-green" />
      </span>

      {/* Cabecera del rol: título y periodo en la misma línea */}
      <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-6">
        <h4 className="font-display text-2xl font-medium leading-tight text-ink-900 md:text-[1.75rem]">
          {exp.role}
        </h4>
        <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-500">
          {exp.period}
        </span>
      </div>

      {/* Solo la submarca: el empleador ya está en la cabecera del bloque */}
      {subBrand && (
        <p className="mt-1.5 text-sm font-medium text-accent-green">{subBrand}</p>
      )}

      <p className="mt-4 max-w-2xl text-ink-700">{exp.description}</p>

      {exp.metrics?.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {exp.metrics.map((m) => (
            <span
              key={m}
              className="rounded-full border border-accent-green/25 bg-accent-green/[0.07] px-3.5 py-1.5 font-mono text-[11px] font-medium text-accent-green"
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
                <h5 className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-ink-400">
                  {t("experience.stackLabel", locale)}
                </h5>
                <div className="flex flex-wrap gap-2">
                  {stack.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-ink-900/12 bg-black/[0.035] px-3.5 py-1.5 text-xs text-ink-600"
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
          className={`mt-7 inline-flex items-center gap-2.5 rounded-full px-6 py-3 text-sm font-semibold transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-green focus-visible:ring-offset-2 focus-visible:ring-offset-paper ${
            open
              ? "border border-ink-900/15 text-ink-700 hover:border-ink-900/35 hover:text-ink-900"
              : "bg-accent-green text-white shadow-[0_12px_26px_-14px_rgba(156,61,46,0.9)] hover:-translate-y-0.5 hover:bg-accent-lime"
          }`}
        >
          {open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {open ? t("experience.collapse", locale) : t("experience.expand", locale)}
        </button>
      )}
    </motion.div>
  );
}

export default function Experience() {
  const { locale } = useLocale();
  const items = tArray<ExpItem>("experience.items", locale);

  // Agrupa por empleador conservando el orden cronológico de los datos.
  const blocks = experienceGroups
    .map((g) => {
      const idx = experience
        .map((e, i) => (e.group === g.id ? i : -1))
        .filter((i) => i >= 0);
      return { group: g, idx };
    })
    .filter((b) => b.idx.length > 0);

  return (
    <section id="experience" className="relative px-6 py-32">
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          index="02"
          kicker={t("experience.kicker", locale)}
          title={t("experience.title", locale)}
        />

        <div className="space-y-16 md:space-y-20">
          {blocks.map(({ group, idx }, bi) => {
            const roles = idx.map((i) => items[i]).filter(Boolean);
            if (roles.length === 0) return null;
            const range = spanOf(roles.map((r) => r.period));

            return (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: bi * 0.05 }}
              >
                {/* Cabecera del empleador: el logo vive aquí, grande y una sola vez */}
                <div className="flex flex-wrap items-center gap-x-5 gap-y-4 border-b border-ink-900/12 pb-6">
                  {group.tile ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={group.logo}
                      alt={group.name}
                      className="h-16 w-16 shrink-0 rounded-2xl object-cover shadow-[0_10px_24px_-14px_rgba(29,24,21,0.5)]"
                    />
                  ) : (
                    <span className="inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-ink-900/8 bg-card shadow-[0_10px_24px_-14px_rgba(29,24,21,0.4)]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={group.logo}
                        alt={group.name}
                        className="h-8 w-auto max-w-[44px] object-contain"
                      />
                    </span>
                  )}

                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-[1.75rem] font-medium leading-tight text-ink-900 md:text-3xl">
                      {group.name}
                    </h3>
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-500">
                      {range}
                      <span className="mx-2 text-ink-300">·</span>
                      {roles.length}{" "}
                      {roles.length === 1
                        ? locale === "es"
                          ? "rol"
                          : "role"
                        : locale === "es"
                          ? "roles"
                          : "roles"}
                    </p>
                  </div>

                  <span className="font-display text-4xl font-medium text-ink-300 md:text-5xl">
                    {String(bi + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Trayectoria: línea vertical con un nodo por rol */}
                <div className="relative mt-10 border-l border-ink-900/18 pl-0">
                  {idx.map((i, ri) => {
                    const item = items[i];
                    if (!item) return null;
                    return (
                      <Role
                        key={`${item.role}-${item.period}`}
                        exp={item}
                        stack={experience[i]?.stack ?? []}
                        index={ri}
                        subBrand={subBrandOf(item.company, group.name)}
                      />
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
