"use client";

import { useRef, useState, useCallback, MouseEvent, PointerEvent } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { achievements } from "@/lib/data";
import SectionHeader from "./SectionHeader";
import { useLocale } from "./I18nProvider";
import { t, tArray } from "@/lib/translations";

interface AchievementText {
  title: string;
  blurb: string;
  metric: string;
}

function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState(
    "perspective(800px) rotateX(0deg) rotateY(0deg)"
  );
  const [transition, setTransition] = useState("transform 0.4s ease-out");
  const [shine, setShine] = useState({ x: 50, y: 50 });

  const onMove = useCallback((e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTransform(
      `perspective(800px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg)`
    );
    setTransition("transform 0.1s ease-out");
    setShine({ x: (x + 0.5) * 100, y: (y + 0.5) * 100 });
  }, []);

  const onLeave = useCallback(() => {
    setTransform("perspective(800px) rotateX(0deg) rotateY(0deg)");
    setTransition("transform 0.4s ease-out");
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`${className} cursor-default`}
      style={{ transform, transition }}
    >
      <div
        className="pointer-events-none absolute inset-0 z-20 rounded-3xl opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
        style={{
          background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(255,255,255,0.06) 0%, transparent 60%)`,
        }}
      />
      {children}
    </div>
  );
}

export default function Achievements() {
  const { locale } = useLocale();
  const texts = tArray<AchievementText>("achievements.items", locale);

  const scrollRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, startX: 0, startLeft: 0, moved: false });

  /* Avanza exactamente una tarjeta midiendo el ancho real del primer hijo,
     así funciona igual en móvil (85vw), sm (440px) y desktop (500px). */
  const step = useCallback(() => {
    const el = scrollRef.current;
    const first = el?.querySelector<HTMLElement>("[data-card]");
    if (!el || !first) return 0;
    const style = window.getComputedStyle(first);
    return first.offsetWidth + parseFloat(style.marginRight || "0");
  }, []);

  const scrollByDir = useCallback(
    (dir: number) => {
      const el = scrollRef.current;
      if (!el) return;
      const max = el.scrollWidth - el.clientWidth;
      const cur = el.scrollLeft;
      const amount = step();
      if (dir > 0) {
        if (cur >= max - 8) el.scrollTo({ left: 0, behavior: "smooth" });
        else el.scrollBy({ left: amount, behavior: "smooth" });
      } else {
        if (cur <= 8) el.scrollTo({ left: max, behavior: "smooth" });
        else el.scrollBy({ left: -amount, behavior: "smooth" });
      }
    },
    [step]
  );

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = scrollRef.current;
    if (!el) return;
    drag.current = {
      down: true,
      startX: e.clientX,
      startLeft: el.scrollLeft,
      moved: false,
    };
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!drag.current.down) return;
    const el = scrollRef.current;
    if (!el) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    el.scrollLeft = drag.current.startLeft - dx;
  };
  const endDrag = () => {
    drag.current.down = false;
  };

  return (
    <section id="achievements" className="relative overflow-hidden px-6 py-32">
      <div className="pointer-events-none absolute -right-40 top-1/3 h-[400px] w-[400px] rounded-full bg-accent-green/10 blur-[140px]" />
      <div className="mx-auto mb-8 max-w-6xl">
        <SectionHeader
          index="03"
          kicker={t("achievements.kicker", locale)}
          title={t("achievements.title", locale)}
        />

        <div className="mt-4 hidden items-center justify-end gap-2 md:flex">
          <button
            onClick={() => scrollByDir(-1)}
            aria-label={t("achievements.scrollLeft", locale)}
            className="rounded-full border border-ink-900/10 p-2.5 text-ink-500 transition hover:border-ink-900/25 hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-green focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => scrollByDir(1)}
            aria-label={t("achievements.scrollRight", locale)}
            className="rounded-full border border-ink-900/10 p-2.5 text-ink-500 transition hover:border-ink-900/25 hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-green focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative mx-auto max-w-6xl"
      >
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-16 bg-gradient-to-l from-paper to-transparent md:block" />

        <div
          ref={scrollRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerLeave={endDrag}
          className="no-scrollbar snap-x snap-mandatory overflow-x-auto md:cursor-grab md:active:cursor-grabbing"
        >
          <div className="flex w-max items-stretch py-2 pr-6">
            {achievements.map((a, i) => (
              <div
                key={a.id}
                data-card
                className="mr-5 w-[85vw] shrink-0 snap-start select-none sm:mr-6 sm:w-[440px] md:w-[500px]"
              >
                <AchievementCard a={a} text={texts[i]} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-400 md:hidden">
          <span>{t("achievements.swipeHint", locale)}</span>
          <motion.span
            aria-hidden
            animate={{ x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
            className="inline-flex"
          >
            <ChevronRight className="h-4 w-4" />
          </motion.span>
        </div>
      </motion.div>
    </section>
  );
}

function AchievementCard({
  a,
  text,
}: {
  a: (typeof achievements)[number];
  text?: AchievementText;
}) {
  if (!text) return null;
  return (
    <TiltCard className="group/card relative block h-full overflow-hidden rounded-3xl border border-ink-900/10 bg-card p-8 transition-all duration-500 hover:border-ink-900/15 md:p-10">
      <div
        className={`pointer-events-none absolute inset-0 -z-0 bg-gradient-to-br ${a.accent} opacity-0 transition-opacity duration-700 group-hover/card:opacity-100`}
      />
      <div className="pointer-events-none absolute -right-32 -top-32 h-64 w-64 rounded-full bg-black/[0.04] opacity-0 blur-3xl transition-opacity duration-500 group-hover/card:opacity-100" />

      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-10 flex items-start justify-between">
          <span className="font-mono text-xs uppercase tracking-[0.22em] text-ink-400">
            {a.company} · {a.year}
          </span>
        </div>

        <div className="mb-4 inline-block self-start rounded-full border border-accent-green/30 bg-accent-green/10 px-4 py-1.5 font-mono text-sm font-medium text-accent-green">
          {text.metric}
        </div>
        <h3 className="font-display text-3xl font-light leading-tight tracking-tight text-ink-900 md:text-4xl">
          {text.title}
        </h3>
        <p className="mt-4 max-w-md text-ink-600">{text.blurb}</p>

        <div className="mt-auto flex flex-wrap gap-2 pt-10">
          {a.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-ink-900/10 bg-black/[0.03] px-3 py-1 text-xs text-ink-600"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </TiltCard>
  );
}
