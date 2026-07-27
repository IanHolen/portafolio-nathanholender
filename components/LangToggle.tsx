"use client";

import { useLocale } from "./I18nProvider";

export default function LangToggle() {
  const { locale, setLocale } = useLocale();

  return (
    <button
      onClick={() => setLocale(locale === "es" ? "en" : "es")}
      className="border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-ink-600 transition hover:border-accent-green/40 hover:text-accent-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-green focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
      aria-label={locale === "es" ? "Switch to English" : "Cambiar a Español"}
    >
      {locale === "es" ? "EN" : "ES"}
    </button>
  );
}
