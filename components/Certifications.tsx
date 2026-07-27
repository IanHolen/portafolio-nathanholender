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
  scrum: { Icon: Award, bg: "#17356b" },
  linkedin: { Icon: GraduationCap, bg: "#0A66C2" },
  community: { Icon: HeartHandshake, bg: "#b4531b" },
};

export default function Certifications() {
  const { locale } = useLocale();
  const texts = tArray<CertText>("certs.items", locale);

  if (!certifications.length) return null;

  return (
    <section className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="06"
          kicker={t("certs.kicker", locale)}
          title={t("certs.title", locale)}
        />

        <div className="grid gap-4 md:grid-cols-3">
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`group flex items-start gap-5 rounded-2xl border border-ink-900/10 bg-card p-6 transition hover:border-ink-900/15 hover:bg-black/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-green focus-visible:ring-offset-2 focus-visible:ring-offset-paper ${
                  !cert.credentialUrl ? "cursor-default" : ""
                }`}
              >
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-paper"
                  style={{ backgroundColor: bg }}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.9} />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium text-ink-900 transition group-hover:text-accent-green">
                    {text.title}
                  </h3>
                  <p className="mt-1 text-sm text-ink-500">{text.issuer}</p>
                  {cert.credentialUrl && (
                    <span className="mt-3 inline-flex items-center gap-1 text-xs text-accent-green/70 transition group-hover:text-accent-green">
                      {t("certs.viewCredential", locale)}
                      <ExternalLink className="h-3 w-3" />
                    </span>
                  )}
                </div>
              </Tag>
            );
          })}
        </div>
      </div>
    </section>
  );
}
