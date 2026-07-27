"use client";

import { profile } from "@/lib/data";
import { useLocale } from "./I18nProvider";
import { t } from "@/lib/translations";

export default function Footer() {
  const { locale } = useLocale();

  return (
    <footer className="border-t border-white/10 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 font-mono text-xs uppercase tracking-wide text-ink-500 md:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name} — {t("footer.designed", locale)}
        </p>
        <div className="flex items-center gap-4">
          <kbd className="border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-ink-500">
            ⌘K / Ctrl+K
          </kbd>
          <p className="tracking-[0.22em]">
            {t("footer.madeIn", locale)} {profile.location.split(",")[0]}
          </p>
        </div>
      </div>
    </footer>
  );
}
