"use client";

import { motion } from "framer-motion";
import { ExternalLink, Award, GraduationCap, HeartHandshake } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { certifications } from "@/lib/data";
import SectionHeader from "./SectionHeader";
import { useLocale } from "./I18nProvider";
import { t, tArray } from "@/lib/translations";

interface CertText {
  title: string;
  issuer: string;
}

const ICONS: Record<string, { Icon: LucideIcon; bg: string }> = {
  scrum: { Icon: Award, bg: "#9c3d2e" },
  linkedin: { Icon: GraduationCap, bg: "#0A66C2" },
  community: { Icon: HeartHandshake, bg: "#a67c3a" },
};

export default function Certifications() {
  const { locale } = useLocale();
  const texts = tArray<CertText>("certs.items", locale);

  if (!certifications.length) return null;

  return (
    <section id="certifications" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="06"
          kicker={t("certs.kicker", locale)}
          title={t("certs.title", locale)}
        />

        {/* Filas a todo el ancho, como el resto del sitio: sin cajas ni huecos. */}
        <div className="grid gap-4">
          {certifications.map((cert, i) => {
            const text = texts[i];
            if (!text) return null;
            const { Icon, bg } = ICONS[cert.icon] ?? ICONS.scrum;
            const Tag = cert.credentialUrl ? motion.a : motion.div;
            return (
              <Tag
                key={text.title}
                {...(cert.credentialUrl
                  ? {
                      href: cert.credentialUrl,
                      target: "_blank",
                      rel: "noopener noreferrer",
                    }
                  : {})}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.2, 0.8, 0.2, 1] }}
                className={`group flex flex-wrap items-center gap-x-6 gap-y-3 rounded-3xl border border-ink-900/10 bg-card px-6 py-6 transition-all duration-500 hover:-translate-y-1 hover:border-accent-green/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-green focus-visible:ring-offset-2 focus-visible:ring-offset-paper ${
                  cert.credentialUrl ? "" : "cursor-default"
                }`}
              >
                <span className="font-mono text-xs text-accent-green">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-white"
                  style={{ backgroundColor: bg }}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.9} />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-lg font-medium leading-snug text-ink-900 transition group-hover:text-accent-green">
                    {text.title}
                  </h3>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-500">
                    {text.issuer}
                  </p>
                </div>
                {cert.credentialUrl && (
                  <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-accent-green transition group-hover:gap-2.5">
                    {t("certs.viewCredential", locale)}
                    <ExternalLink className="h-3 w-3" />
                  </span>
                )}
              </Tag>
            );
          })}
        </div>
      </div>
    </section>
  );
}
