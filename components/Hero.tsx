"use client";

import { useEffect, useState, useRef, useCallback, MouseEvent } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowDown,
  Download,
  Briefcase,
  GraduationCap,
  Globe2,
  Languages,
} from "lucide-react";
import { profile, companies, heroStats } from "@/lib/data";
import { useLocale } from "./I18nProvider";
import { t } from "@/lib/translations";
import type { TranslationKey } from "@/lib/translations";

function heroBrand(label: string): string {
  const l = label.toLowerCase();
  if (l.includes("linkedin")) return "#0A66C2";
  if (l.includes("whatsapp")) return "#25D366";
  if (l.includes("mail") || l.includes("email")) return "#c2410c";
  return "#9c3d2e";
}

// Iconos de marca reales (public/icons/*)
function heroIconSrc(label: string): string {
  const l = label.toLowerCase();
  if (l.includes("linkedin")) return "/icons/linkedin.webp";
  if (l.includes("whatsapp")) return "/icons/whatsapp.webp";
  if (l.includes("mail") || l.includes("email")) return "/icons/gmail.webp";
  return "/icons/contact.png";
}

// Deltas verificados del CV — crecimiento interanual de cada métrica del hero.
const STAT_DELTA: Record<string, string> = {
  assets: "+70.4% YoY",
  campaigns: "+25.8% YoY",
  gms: "+72% YoY",
  years: "@ Amazon",
};

function HeroSocial({ label, href }: { label: string; href: string }) {
  const [hover, setHover] = useState(false);
  const color = heroBrand(label);
  const iconSrc = heroIconSrc(label);
  const internal = href.startsWith("#");
  return (
    <a
      href={href}
      {...(internal ? {} : { target: "_blank", rel: "noopener noreferrer" })}
      title={label}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={hover ? { borderColor: color } : undefined}
      className="inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-ink-900/15 px-6 py-4 text-base font-medium text-ink-800 transition duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-green focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={iconSrc}
        alt=""
        aria-hidden="true"
        className="h-[22px] w-[22px] shrink-0 rounded-[5px] object-contain"
      />
      {label}
    </a>
  );
}

function MagneticWrap({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const onMove = useCallback((e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 80) {
      const f = (1 - dist / 80) * 6;
      setOffset({ x: (dx / dist) * f, y: (dy / dist) * f });
    }
  }, []);
  const onLeave = useCallback(() => setOffset({ x: 0, y: 0 }), []);
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="inline-block"
    >
      <div
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px)`,
          transition: "transform 0.2s ease-out",
        }}
      >
        {children}
      </div>
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      delay: 0.1 + i * 0.1,
      ease: [0.2, 0.8, 0.2, 1] as [number, number, number, number],
    },
  }),
};

const letterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.35 + i * 0.03, ease: [0.2, 0.8, 0.2, 1] },
  }),
};

function SplitText({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          custom={i}
          initial="hidden"
          animate="visible"
          variants={letterVariants}
          className="inline-block"
          style={{ whiteSpace: char === " " ? "pre" : undefined }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

/** Cuenta hacia arriba al entrar en viewport. Soporta decimales (13.8MM). */
function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const decimals = Number.isInteger(value) ? 0 : 1;
  const [display, setDisplay] = useState(value);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDisplay(0);
  }, []);

  useEffect(() => {
    if (!mounted || !isInView) return;
    const duration = 1600;
    const start = performance.now();
    function step(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      setDisplay((1 - Math.pow(1 - progress, 3)) * value);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }, [mounted, isInView, value]);

  return (
    <span ref={ref}>
      {display.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

export default function Hero() {
  const { locale } = useLocale();

  const stats = heroStats.map((s) => ({
    key: s.key,
    value: s.value,
    suffix: s.suffix,
    label: t(`hero.stat.${s.key}` as TranslationKey, locale),
  }));

  type School = { src: string; name: string; note: string };
  const info: {
    Icon: typeof Briefcase;
    label: string;
    value: string;
    sub?: string;
    schools: School[];
  }[] = [
    {
      Icon: Briefcase,
      label: t("hero.info.role", locale),
      value: t("hero.info.roleValue", locale),
      sub: t("hero.info.roleSub", locale),
      schools: [],
    },
    {
      Icon: GraduationCap,
      label: t("hero.info.education", locale),
      value: t("hero.info.educationValue", locale),
      schools: [
        { src: "/education/itesm.webp", name: "Tec de Monterrey", note: "" },
        { src: "/education/ipag.png", name: "IPAG Business School", note: "París" },
      ],
    },
    {
      Icon: Globe2,
      label: t("hero.info.scope", locale),
      value: t("hero.info.scopeValue", locale),
      schools: [],
    },
    {
      Icon: Languages,
      label: t("hero.info.languages", locale),
      value: t("hero.info.languagesValue", locale),
      schools: [],
    },
  ];

  return (
    <section id="top" className="relative flex min-h-screen items-center px-6 pt-32">
      <div className="mx-auto w-full max-w-6xl">
        {/* Masthead editorial */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0}
          className="mb-8 flex items-center justify-between border-b border-ink-900/10 pb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-ink-500"
        >
          <span>Portafolio</span>
          <span className="text-accent-green">{profile.location}</span>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0.6}
          className="mb-10 flex flex-wrap items-center gap-4"
        >
          <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-accent-green">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-green" />
            {t("hero.available", locale)}
          </span>
        </motion.div>

        <div className="grid gap-12 md:grid-cols-[1.15fr_0.85fr] md:items-stretch lg:gap-16">
          {/* Identidad + pitch + métricas */}
          <div>
            <h1 className="font-display text-[clamp(2.8rem,6.6vw,6rem)] font-medium leading-[0.9] tracking-tight">
              <SplitText text={profile.firstName} className="block text-ink-900" />
              <SplitText text={profile.lastName} className="block text-accent-green" />
            </h1>

            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={2}
              className="mt-6 font-mono text-xs uppercase tracking-[0.18em] text-ink-600 sm:text-sm"
            >
              {t("hero.role", locale)}
            </motion.p>

            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={2.6}
              className="mt-6 max-w-lg text-lg leading-relaxed text-ink-700"
            >
              {t("hero.tagline", locale)}
            </motion.p>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={3.1}
              className="mt-8 grid max-w-lg grid-cols-2 gap-x-8 gap-y-6 border-t border-ink-900/10 pt-7"
            >
              {stats.map((s) => (
                <div key={s.key}>
                  <p className="font-display text-3xl font-medium text-ink-900">
                    <AnimatedCounter value={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-500">
                    {s.label}
                  </p>
                  {STAT_DELTA[s.key] && (
                    <p className="mt-1 font-mono text-[10px] font-medium tracking-wide text-accent-green">
                      {STAT_DELTA[s.key]}
                    </p>
                  )}
                </div>
              ))}
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={3.5}
              className="mt-8 grid max-w-lg grid-cols-2 gap-3.5"
            >
              {info.map((it) => (
                <div
                  key={it.label}
                  className="flex h-full flex-col rounded-2xl border border-ink-900/10 bg-card p-5"
                >
                  <div className="mb-2.5 flex items-center gap-2 text-accent-green">
                    <it.Icon className="h-4 w-4" strokeWidth={1.75} />
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-500">
                      {it.label}
                    </span>
                  </div>
                  <p className="text-sm font-medium leading-snug text-ink-900">
                    {it.value}
                  </p>
                  {it.sub && (
                    <p className="mt-1 text-[11px] leading-snug text-ink-500">
                      {it.sub}
                    </p>
                  )}
                  {it.schools.length > 0 && (
                    <div className="mt-auto space-y-2 pt-3">
                      {it.schools.map((s) => (
                        <div key={s.src} className="flex items-center gap-2">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={s.src}
                            alt={s.name}
                            className="h-5 w-5 shrink-0 object-contain"
                          />
                          <span className="text-[11px] leading-snug">
                            <span className="font-semibold text-ink-800">{s.name}</span>
                            {s.note && <span className="text-ink-500"> · {s.note}</span>}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Retrato */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative mx-auto w-full max-w-[360px] md:h-full md:max-w-none"
          >
            {/* Marco editorial: doble filete + esquinas */}
            <div className="pointer-events-none absolute -inset-2 rounded-[28px] border border-accent-green/25" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-ink-900/15 bg-card shadow-[0_34px_70px_-42px_rgba(29,24,21,0.45)] md:aspect-auto md:h-full md:min-h-[520px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/nathan-portrait.png"
                alt={`${profile.firstName} ${profile.lastName}`}
                className="absolute inset-0 h-full w-full object-cover object-top"
              />
              {/* Caption estilo revista */}
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/75 to-transparent px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/90">
                <span>{profile.firstName} {profile.lastName}</span>
                <span>PVI · AMZN</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA + accesos directos */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={3.9}
          className="mt-14 md:mt-16"
        >
          {/* Misma rejilla que el bloque de arriba: la columna derecha queda
              exactamente bajo el retrato, así los accesos alinean con la foto. */}
          <div className="grid gap-8 md:grid-cols-[1.15fr_0.85fr] md:items-center lg:gap-16">
            <div className="flex flex-wrap items-center gap-3">
              <MagneticWrap>
                <a
                  href="#achievements"
                  className="group inline-flex items-center gap-2 rounded-full bg-ink-900 px-6 py-3.5 text-sm font-medium text-paper transition hover:bg-ink-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-green focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
                >
                  {t("hero.cta", locale)}
                  <ArrowDown className="h-4 w-4 transition group-hover:translate-y-0.5" />
                </a>
              </MagneticWrap>
              <MagneticWrap>
                <a
                  href={profile.cvUrl}
                  download
                  className="group inline-flex items-center gap-2 rounded-full border border-ink-900/15 px-6 py-3.5 text-sm text-ink-800 transition hover:border-ink-900/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-green focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
                >
                  <Download className="h-4 w-4 transition group-hover:translate-y-0.5" />
                  {t("hero.downloadCv", locale)}
                </a>
              </MagneticWrap>
            </div>
            {/* Solo LinkedIn y Contacto: WhatsApp y Email viven abajo, en Contacto.
                Ocupan el ancho de la columna para calzar con los bordes del retrato. */}
            <div className="grid grid-cols-2 gap-3">
              {profile.socials
                .filter((s) => {
                  const l = s.label.toLowerCase();
                  return !l.includes("whatsapp") && !l.includes("email");
                })
                .map((s) => (
                  <HeroSocial key={s.label} label={s.label} href={s.href} />
                ))}
            </div>
          </div>
        </motion.div>

        {/* Strip de empresas */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={4}
          className="mt-14 border-t border-ink-900/10 pt-8 md:mt-16"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-400">
            {t("hero.workedAt", locale)}
          </span>
          {/* Reparte las empresas a lo ancho completo, con separadores hairline */}
          <div className="mt-6 grid grid-cols-2 gap-y-8 md:grid-cols-4">
            {companies.map((c, i) => (
              <div
                key={c.name}
                className={`group flex items-center justify-center gap-3 px-2 ${
                  i > 0 ? "md:border-l md:border-ink-900/10" : ""
                } ${i === 1 ? "border-l border-ink-900/10 md:border-l" : ""} ${
                  i === 3 ? "border-l border-ink-900/10" : ""
                }`}
              >
                {/* Los logos que ya traen su propio fondo de marca (Prime Video,
                    Coppel) se pintan completos; el resto va en un chip claro
                    para que no se pierdan sobre el hueso. */}
                {c.tile ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={c.logos[0]}
                    alt={c.name}
                    className="h-14 w-14 shrink-0 rounded-2xl object-cover shadow-[0_6px_18px_-10px_rgba(29,24,21,0.45)] transition duration-300 group-hover:-translate-y-0.5"
                  />
                ) : (
                  <span className="inline-flex h-14 min-w-[64px] items-center justify-center gap-2 rounded-2xl border border-ink-900/8 bg-card px-3.5 shadow-[0_6px_18px_-10px_rgba(29,24,21,0.35)] transition duration-300 group-hover:-translate-y-0.5">
                    {c.logos.map((logo) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={logo}
                        src={logo}
                        alt={c.name}
                        className="h-8 w-auto max-w-[92px] object-contain"
                      />
                    ))}
                  </span>
                )}
                <span className="font-display text-xl text-ink-700 transition-colors duration-300 group-hover:text-ink-900">
                  {c.name}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
