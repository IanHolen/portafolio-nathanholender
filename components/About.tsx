"use client";

import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import HighlightText from "./HighlightText";
import { useLocale } from "./I18nProvider";
import { t, tArray } from "@/lib/translations";

const HIGHLIGHT_TERMS = [
  "Ingeniero Industrial y de Sistemas",
  "Industrial & Systems Engineer",
  "Amazon",
  "Prime Video International",
  "TVOD",
  "Channels",
  "excelencia operativa",
  "operational excellence",
];

function highlightIntro(text: string) {
  const parts: (string | JSX.Element)[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    let earliest = -1;
    let matchedTerm = "";
    for (const term of HIGHLIGHT_TERMS) {
      const idx = remaining.indexOf(term);
      if (idx !== -1 && (earliest === -1 || idx < earliest)) {
        earliest = idx;
        matchedTerm = term;
      }
    }
    if (earliest === -1) {
      parts.push(remaining);
      break;
    }
    if (earliest > 0) parts.push(remaining.slice(0, earliest));
    parts.push(<HighlightText key={key++}>{matchedTerm}</HighlightText>);
    remaining = remaining.slice(earliest + matchedTerm.length);
  }
  return parts;
}

export default function About() {
  const { locale } = useLocale();
  const bullets = tArray<string>("about.bullets", locale);

  return (
    <section id="about" className="relative px-6 py-28 md:py-36">
      <div className="pointer-events-none absolute -right-40 top-1/3 h-[400px] w-[400px] rounded-full bg-accent-green/10 blur-[150px]" />
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="01"
          kicker={t("about.kicker", locale)}
          title={t("about.title", locale)}
        />

        <div className="grid gap-14 md:grid-cols-12">
          <div className="space-y-7 md:col-span-7">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8 }}
              className="text-xl font-light leading-relaxed text-ink-800 md:text-2xl"
            >
              {highlightIntro(t("about.intro", locale))}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="max-w-xl leading-relaxed text-ink-600"
            >
              {t("about.intro2", locale)}
            </motion.p>
          </div>

          <div className="md:col-span-5">
            <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-accent-green">
              // key_signals
            </div>
            <ul className="space-y-0 border-t border-white/10">
              {bullets.map((b, i) => (
                <motion.li
                  key={b}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: 0.15 + i * 0.1 }}
                  className="flex items-start gap-4 border-b border-white/10 py-4 text-sm text-ink-600"
                >
                  <span className="font-mono text-[11px] text-accent-green/80">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="leading-relaxed">{b}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
