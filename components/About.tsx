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
    <section id="about" className="relative px-6 py-32">
      <div className="pointer-events-none absolute -right-40 top-1/3 h-[400px] w-[400px] rounded-full bg-accent-emerald/15 blur-[140px]" />
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="01"
          kicker={t("about.kicker", locale)}
          title={t("about.title", locale)}
        />

        <div className="grid gap-16 md:grid-cols-12">
          <div className="space-y-8 md:col-span-7">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8 }}
              className="text-justify font-display text-2xl font-light leading-snug text-ink-700 md:text-3xl"
            >
              {highlightIntro(t("about.intro", locale))}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="max-w-xl text-justify text-lg leading-relaxed text-ink-600"
            >
              {t("about.intro2", locale)}
            </motion.p>
          </div>

          <ul className="space-y-5 md:col-span-5">
            {bullets.map((b, i) => (
              <motion.li
                key={b}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.1 }}
                className="flex items-start gap-3 text-ink-600"
              >
                <span className="mt-[11px] h-0.5 w-6 shrink-0 rounded-full bg-gradient-to-r from-accent-green to-accent-green/30" />
                <span>{b}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
