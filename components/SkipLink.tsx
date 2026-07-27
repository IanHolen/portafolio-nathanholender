"use client";

import { useLocale } from "./I18nProvider";
import { t } from "@/lib/translations";

export default function SkipLink() {
  const { locale } = useLocale();

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent-green focus:px-6 focus:py-3 focus:text-sm focus:font-medium focus:text-ink-900 focus:outline-none"
    >
      {t("skipToContent", locale)}
    </a>
  );
}
