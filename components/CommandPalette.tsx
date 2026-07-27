"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Home,
  User,
  Briefcase,
  TrendingUp,
  Wrench,
  GraduationCap,
  Mail,
  Copy,
  ExternalLink,
  Download,
} from "lucide-react";
import { profile, achievements } from "@/lib/data";
import { useLocale } from "./I18nProvider";
import { t, tArray } from "@/lib/translations";

interface Item {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: () => void;
  hint?: string;
}

export default function CommandPalette() {
  const { locale } = useLocale();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const achievementTexts = tArray<{ title: string }>("achievements.items", locale);

  function navigate(hash: string) {
    close();
    const el = document.querySelector(hash);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  function close() {
    setOpen(false);
    setQuery("");
    setActive(0);
  }

  const items: Item[] = [
    { id: "home", label: t("cmd.home", locale), icon: <Home className="h-4 w-4" />, action: () => navigate("#top") },
    { id: "about", label: t("cmd.about", locale), icon: <User className="h-4 w-4" />, action: () => navigate("#about") },
    { id: "experience", label: t("cmd.experience", locale), icon: <Briefcase className="h-4 w-4" />, action: () => navigate("#experience") },
    { id: "achievements", label: t("cmd.achievements", locale), icon: <TrendingUp className="h-4 w-4" />, action: () => navigate("#achievements") },
    { id: "skills", label: t("cmd.skills", locale), icon: <Wrench className="h-4 w-4" />, action: () => navigate("#skills") },
    { id: "education", label: t("cmd.education", locale), icon: <GraduationCap className="h-4 w-4" />, action: () => navigate("#education") },
    { id: "contact", label: t("cmd.contact", locale), icon: <Mail className="h-4 w-4" />, action: () => navigate("#contact") },
    ...achievements.map((a, i) => ({
      id: `achievement-${a.id}`,
      label: achievementTexts[i]?.title ?? a.id,
      icon: <TrendingUp className="h-4 w-4" />,
      action: () => navigate("#achievements"),
      hint: t("cmd.hintAchievement", locale),
    })),
    {
      id: "copy-email",
      label: t("cmd.copyEmail", locale),
      icon: <Copy className="h-4 w-4" />,
      action: () => {
        navigator.clipboard.writeText(profile.email);
        close();
      },
      hint: t("cmd.hintAction", locale),
    },
    {
      id: "linkedin",
      label: t("cmd.viewLinkedin", locale),
      icon: <ExternalLink className="h-4 w-4" />,
      action: () => {
        window.open(profile.socials[0].href, "_blank");
        close();
      },
      hint: t("cmd.hintAction", locale),
    },
    {
      id: "cv",
      label: t("cmd.downloadCv", locale),
      icon: <Download className="h-4 w-4" />,
      action: () => {
        window.open(profile.cvUrl, "_blank");
        close();
      },
      hint: t("cmd.hintAction", locale),
    },
  ];

  const filtered = query
    ? items.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()))
    : items;

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (!open) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((prev) => Math.min(prev + 1, filtered.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((prev) => Math.max(prev - 1, 0));
      }
      if (e.key === "Enter" && filtered[active]) {
        e.preventDefault();
        filtered[active].action();
      }
    },
    [open, filtered, active]
  );

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  useEffect(() => {
    if (open) {
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm"
            onClick={close}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            role="dialog"
            aria-modal="true"
            aria-label={t("cmd.label", locale)}
            className="fixed left-1/2 top-[20vh] z-[81] w-full max-w-lg -translate-x-1/2 overflow-hidden rounded-2xl border border-ink-900/10 bg-paper/95 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex items-center gap-3 border-b border-ink-900/10 px-4 py-3">
              <Search className="h-4 w-4 text-ink-400" />
              <input
                ref={inputRef}
                type="text"
                aria-label={t("cmd.search", locale)}
                placeholder={t("cmd.placeholder", locale)}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none"
              />
              <kbd className="rounded border border-ink-900/10 bg-black/[0.04] px-1.5 py-0.5 text-[10px] text-ink-400">
                ESC
              </kbd>
            </div>
            <div className="max-h-[50vh] overflow-y-auto p-2">
              {filtered.length === 0 && (
                <p className="px-3 py-6 text-center text-sm text-ink-400">
                  {t("cmd.noResults", locale)}
                </p>
              )}
              {filtered.map((item, i) => (
                <button
                  key={item.id}
                  onClick={item.action}
                  onMouseEnter={() => setActive(i)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-green ${
                    i === active
                      ? "bg-accent-green/10 text-ink-900"
                      : "text-ink-600 hover:text-ink-900"
                  }`}
                >
                  <span className={i === active ? "text-accent-green" : "text-ink-400"}>
                    {item.icon}
                  </span>
                  <span className="flex-1">{item.label}</span>
                  {item.hint && (
                    <span className="text-[10px] text-ink-400">{item.hint}</span>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
