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
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { profile, companies, heroStats } from "@/lib/data";
import { useLocale } from "./I18nProvider";
import { t } from "@/lib/translations";
import type { TranslationKey } from "@/lib/translations";

function heroBrand(label: string): string {
  const l = label.toLowerCase();
  if (l.includes("linkedin")) return "#0A66C2";
  if (l.includes("mail")) return "#dc2626";
  return "#17356b";
}

function HeroSocial({ label, href }: { label: string; href: string }) {
  const [hover, setHover] = useState(false);
  const color = heroBrand(label);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={
        hover
          ? { backgroundColor: color, borderColor: color, color: "#fff" }
          : undefined
      }
      className="inline-flex items-center justify-center rounded-full border border-ink-900/15 px-6 py-3.5 text-sm font-medium text-ink-800 transition duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-green focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
    >
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

  const info = [
    {
      Icon: Briefcase,
      label: t("hero.info.role", locale),
      value: t("hero.info.roleValue", locale),
      sub: t("hero.info.roleSub", locale),
    },
    {
      Icon: GraduationCap,
      label: t("hero.info.education", locale),
      value: t("hero.info.educationValue", locale),
      sub: t("hero.info.educationSub", locale),
    },
    {
      Icon: Globe2,
      label: t("hero.info.scope", locale),
      value: t("hero.info.scopeValue", locale),
    },
    {
      Icon: Languages,
      label: t("hero.info.languages", locale),
      value: t("hero.info.languagesValue", locale),
    },
  ];

  return (
    <section id="top" className="relative flex min-h-screen items-center px-6 pt-32">
      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0}
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
            <h1 className="font-display text-[clamp(2.6rem,6.2vw,5.6rem)] font-medium leading-[0.92] tracking-tight">
              <SplitText text={profile.firstName} className="block text-ink-900" />
              <SplitText text={profile.lastName} className="block text-ink-400" />
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
                  className="rounded-2xl border border-ink-900/10 bg-card p-5"
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
            <div className="pointer-events-none absolute -right-6 -top-6 h-40 w-40 rounded-full bg-accent-green/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-6 -left-6 h-40 w-40 rounded-full bg-accent-green/10 blur-3xl" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-ink-900/10 bg-card shadow-[0_40px_90px_-40px_rgba(24,24,15,0.35)] md:aspect-auto md:h-full md:min-h-[520px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/nathan-portrait.png"
                alt={`${profile.firstName} ${profile.lastName}`}
                className="absolute inset-0 h-full w-full object-cover object-top"
              />
            </div>
          </motion.div>
        </div>

        {/* Tarjetas de contacto + CTA */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={3.9}
          className="mt-16 md:mt-20"
        >
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                Icon: Mail,
                label: t("contact.infoEmail", locale),
                value: profile.email,
                href: `mailto:${profile.email}`,
              },
              {
                Icon: Phone,
                label: t("contact.infoPhone", locale),
                value: profile.phone,
                href: `tel:${profile.phone.replace(/\s+/g, "")}`,
              },
              {
                Icon: MapPin,
                label: t("contact.infoLocation", locale),
                value: profile.location,
              },
            ].map((c) => {
              const inner = (
                <>
                  <div className="mb-3 flex items-center gap-2.5 text-accent-green">
                    <c.Icon className="h-4 w-4" strokeWidth={1.75} />
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-500">
                      {c.label}
                    </span>
                  </div>
                  <p className="break-words text-base font-medium leading-snug text-ink-900 md:text-lg">
                    {c.value}
                  </p>
                </>
              );
              return c.href ? (
                <a
                  key={c.label}
                  href={c.href}
                  className="rounded-2xl border border-ink-900/10 bg-card p-6 transition hover:border-accent-green/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-green focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
                >
                  {inner}
                </a>
              ) : (
                <div
                  key={c.label}
                  className="rounded-2xl border border-ink-900/10 bg-card p-6"
                >
                  {inner}
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
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
            <div className="flex flex-wrap items-center gap-3">
              {profile.socials.map((s) => (
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
          className="mt-14 flex flex-col gap-6 border-t border-ink-900/10 pt-8 md:mt-16 md:flex-row md:items-center md:gap-12"
        >
          <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-400">
            {t("hero.workedAt", locale)}
          </span>
          <div className="flex flex-wrap items-center gap-x-10 gap-y-5">
            {companies.map((c) => (
              <div key={c.name} className="group flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  {c.logos.map((logo) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={logo}
                      src={logo}
                      alt={c.name}
                      className="h-9 w-auto object-contain opacity-70 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                    />
                  ))}
                </div>
                <span className="font-display text-xl text-ink-500 transition-colors duration-300 group-hover:text-ink-900">
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
