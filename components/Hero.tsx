"use client";

import { useEffect, useState, useRef, useCallback, MouseEvent } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import { profile, companies, heroStats } from "@/lib/data";
import { useLocale } from "./I18nProvider";
import { t } from "@/lib/translations";
import type { TranslationKey } from "@/lib/translations";

function heroBrand(label: string): string {
  const l = label.toLowerCase();
  if (l.includes("linkedin")) return "#0A66C2";
  if (l.includes("mail")) return "#00A8E1";
  return "#00A8E1";
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
          ? { backgroundColor: color, borderColor: color, color: "#0b0f1a" }
          : undefined
      }
      className="inline-flex items-center justify-center border border-white/15 px-5 py-3 font-mono text-xs uppercase tracking-wider text-ink-700 transition duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-green focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
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
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className="inline-block">
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
  hidden: { opacity: 0, y: 24 },
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

// Deltas verificados del CV — refuerzan el lenguaje "ops".
const STAT_DELTA: Record<string, { text: string; up?: boolean }> = {
  assets: { text: "+70.4% YoY", up: true },
  campaigns: { text: "+25.8% YoY", up: true },
  gms: { text: "+72% YoY", up: true },
  years: { text: "@ Amazon" },
};

export default function Hero() {
  const { locale } = useLocale();

  const stats = heroStats.map((s) => ({
    key: s.key,
    value: s.value,
    suffix: s.suffix,
    label: t(`hero.stat.${s.key}` as TranslationKey, locale),
  }));

  const meta = [
    {
      label: t("hero.info.role", locale),
      value: t("hero.info.roleValue", locale),
      sub: t("hero.info.roleSub", locale),
    },
    {
      label: t("hero.info.education", locale),
      value: t("hero.info.educationValue", locale),
      sub: t("hero.info.educationSub", locale),
    },
    {
      label: t("hero.info.scope", locale),
      value: t("hero.info.scopeValue", locale),
    },
    {
      label: t("hero.info.languages", locale),
      value: t("hero.info.languagesValue", locale),
    },
  ];

  return (
    <section id="top" className="relative overflow-hidden px-6 pb-16 pt-28 md:pt-32">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14">
          {/* ── Identidad ── */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={0}
              className="mb-7 inline-flex items-center gap-2.5 border border-accent-green/30 bg-accent-green/5 px-3 py-1.5"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-green opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-green" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-accent-green">
                {t("hero.available", locale)}
              </span>
            </motion.div>

            <h1 className="font-display font-extrabold uppercase leading-[0.86] tracking-poster">
              <SplitText
                text={profile.firstName}
                className="block whitespace-nowrap text-[clamp(2.5rem,7.6vw,5.6rem)] text-ink-900"
              />
              <span
                className="block whitespace-nowrap text-[clamp(2.5rem,7.6vw,5.6rem)] text-transparent"
                style={{ WebkitTextStroke: "1.5px #00A8E1" }}
              >
                <SplitText text={profile.lastName} />
              </span>
            </h1>

            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={2.4}
              className="mt-6 max-w-md font-mono text-xs uppercase tracking-[0.16em] text-accent-green"
            >
              {t("hero.role", locale)}
            </motion.p>

            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={2.8}
              className="mt-5 max-w-lg text-base leading-relaxed text-ink-700 md:text-lg"
            >
              {t("hero.tagline", locale)}
            </motion.p>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={3.3}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <MagneticWrap>
                <a
                  href="#achievements"
                  className="group inline-flex items-center gap-2 bg-accent-green px-6 py-3.5 font-mono text-xs font-semibold uppercase tracking-wider text-paper transition hover:bg-accent-lime focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-green focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
                >
                  {t("hero.cta", locale)}
                  <ArrowDown className="h-4 w-4 transition group-hover:translate-y-0.5" />
                </a>
              </MagneticWrap>
              <MagneticWrap>
                <a
                  href={profile.cvUrl}
                  download
                  className="group inline-flex items-center gap-2 border border-white/15 px-6 py-3.5 font-mono text-xs uppercase tracking-wider text-ink-800 transition hover:border-accent-green/50 hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-green focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
                >
                  <Download className="h-4 w-4 transition group-hover:translate-y-0.5" />
                  {t("hero.downloadCv", locale)}
                </a>
              </MagneticWrap>
              <div className="flex items-center gap-3">
                {profile.socials.map((s) => (
                  <HeroSocial key={s.label} label={s.label} href={s.href} />
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── Retrato cinematográfico ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
            className="order-1 mx-auto w-full max-w-[380px] lg:order-2 lg:max-w-none"
          >
            <div className="corner-ticks relative aspect-[4/5] w-full overflow-hidden border border-white/10 bg-panel">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/nathan-portrait.png"
                alt={`${profile.firstName} ${profile.lastName}`}
                className="absolute inset-0 h-full w-full object-cover object-top contrast-[1.05] grayscale"
              />
              {/* duotone cyan wash + cinematic scrims */}
              <div className="pointer-events-none absolute inset-0 bg-accent-green/25 mix-blend-color" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-paper via-paper/10 to-transparent" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent-green/10 via-transparent to-transparent" />
              {/* scanline sweep */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-24 animate-scan bg-gradient-to-b from-accent-green/15 to-transparent" />
              {/* REC tag */}
              <div className="absolute left-4 top-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-300">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-down" />
                REC
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500">
                <span>{profile.location}</span>
                <span className="text-accent-green">PVI · AMZN</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Franja de KPIs (firma "ops") ── */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={3.8}
          className="mt-14 grid grid-cols-2 border border-white/10 md:grid-cols-4"
        >
          {stats.map((s, i) => {
            const delta = STAT_DELTA[s.key];
            return (
              <div
                key={s.key}
                className={`relative p-5 md:p-6 ${
                  i % 2 === 0 ? "border-r border-white/10" : ""
                } ${i < 2 ? "border-b border-white/10 md:border-b-0" : ""} ${
                  i === 2 ? "md:border-r md:border-white/10" : ""
                }`}
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500">
                  {String(i + 1).padStart(2, "0")} / {s.label}
                </p>
                <p className="mt-3 font-display text-4xl font-extrabold tracking-tight text-ink-900 md:text-5xl">
                  <AnimatedCounter value={s.value} suffix={s.suffix} />
                </p>
                {delta && (
                  <p
                    className={`mt-2 font-mono text-[11px] ${
                      delta.up ? "text-accent-up" : "text-ink-500"
                    }`}
                  >
                    {delta.up ? "▲ " : ""}
                    {delta.text}
                  </p>
                )}
              </div>
            );
          })}
        </motion.div>

        {/* ── Spec-sheet + empresas ── */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={4}
          className="mt-10 grid gap-10 md:grid-cols-[1.4fr_1fr]"
        >
          <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {meta.map((m) => (
              <div key={m.label} className="border-l border-accent-green/40 pl-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-500">
                  {m.label}
                </p>
                <p className="mt-1.5 text-sm font-medium leading-snug text-ink-900">
                  {m.value}
                </p>
                {m.sub && (
                  <p className="mt-0.5 text-[11px] leading-snug text-ink-500">{m.sub}</p>
                )}
              </div>
            ))}
          </div>

          <div>
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-500">
              {t("hero.workedAt", locale)}
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
              {companies.map((c) => (
                <div key={c.name} className="group flex items-center gap-2.5">
                  <span className="inline-flex h-7 items-center gap-1 rounded bg-white/95 px-1.5">
                    {c.logos.map((logo) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={logo}
                        src={logo}
                        alt={c.name}
                        className="h-4 w-auto object-contain"
                      />
                    ))}
                  </span>
                  <span className="font-mono text-xs uppercase tracking-wide text-ink-500 transition-colors duration-300 group-hover:text-ink-800">
                    {c.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
