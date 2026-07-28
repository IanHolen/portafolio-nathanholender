"use client";

import { profile } from "@/lib/data";
import { useLocale } from "./I18nProvider";
import { t } from "@/lib/translations";

export default function Footer() {
  const { locale } = useLocale();

  return (
    <footer className="border-t border-ink-900/10 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-ink-400 md:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name}. {t("footer.designed", locale)}
        </p>
        <div className="flex items-center gap-4">
          <kbd className="rounded border border-ink-900/10 bg-black/[0.04] px-2 py-0.5 font-mono text-[10px] text-ink-400">
            ⌘K / Ctrl+K
          </kbd>
          <p className="font-mono text-xs uppercase tracking-[0.25em]">
            {t("footer.madeIn", locale)} {profile.location.split(",")[0]}
          </p>
        </div>
      </div>
    </footer>
  );
}
