"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { profile } from "@/lib/data";
import { useLocale } from "./I18nProvider";
import { t } from "@/lib/translations";
import LangToggle from "./LangToggle";

const SECTION_IDS = [
  "about",
  "experience",
  "achievements",
  "skills",
  "education",
  "contact",
];

export default function Navbar() {
  const { locale } = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState("");

  const links = [
    { href: "#about", label: t("nav.about", locale), id: "about" },
    { href: "#experience", label: t("nav.experience", locale), id: "experience" },
    { href: "#achievements", label: t("nav.achievements", locale), id: "achievements" },
    { href: "#skills", label: t("nav.skills", locale), id: "skills" },
    { href: "#education", label: t("nav.education", locale), id: "education" },
    { href: "#contact", label: t("nav.contact", locale), id: "contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
        className="fixed inset-x-0 top-0 z-50 px-6 pt-5"
      >
        <div
          className={`mx-auto flex max-w-6xl items-center justify-between rounded-full border px-5 py-3 transition-all duration-500 ${
            scrolled
              ? "border-ink-900/10 bg-paper/75 shadow-[0_1px_20px_rgba(24,24,15,0.05)] backdrop-blur-md"
              : "border-transparent bg-transparent"
          }`}
        >
          <a
            href="#top"
            className="rounded-full font-display text-lg font-medium tracking-tight text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-green focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
          >
            {profile.firstName.toLowerCase()}
            <span className="text-accent-green">.</span>
            {profile.lastName.toLowerCase()}
          </a>
          <nav
            role="navigation"
            aria-label={locale === "es" ? "Navegación principal" : "Main navigation"}
            className="hidden items-center gap-7 text-sm lg:flex"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`relative rounded-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-green focus-visible:ring-offset-2 focus-visible:ring-offset-paper ${
                  activeId === link.id
                    ? "text-ink-900"
                    : "text-ink-600 hover:text-ink-900"
                }`}
              >
                {link.label}
                {activeId === link.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-accent-green"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </nav>
          <div className="hidden items-center gap-3 lg:flex">
            <LangToggle />
            <a
              href="#contact"
              className="inline-flex rounded-full bg-ink-900 px-4 py-2 text-sm font-medium text-paper transition hover:bg-ink-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-green focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
            >
              {t("nav.cta", locale)}
            </a>
          </div>
          <div className="flex items-center gap-3 lg:hidden">
            <LangToggle />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="inline-flex items-center justify-center rounded-full text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-green focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
              aria-label={
                menuOpen ? t("nav.menuClose", locale) : t("nav.menuOpen", locale)
              }
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-7 bg-paper/95 backdrop-blur-lg"
          >
            {links.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.06 }}
                className="rounded-lg font-display text-3xl font-light text-ink-700 transition hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-green"
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 + links.length * 0.06 }}
              className="mt-4 rounded-full border border-accent-green/50 bg-accent-green/10 px-8 py-3 text-lg font-medium text-accent-green transition hover:bg-accent-green/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-green"
            >
              {t("nav.cta", locale)}
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
