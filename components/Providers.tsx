"use client";

import { MotionConfig } from "framer-motion";
import { I18nProvider } from "./I18nProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider>
      <MotionConfig reducedMotion="user">
        {children}
      </MotionConfig>
    </I18nProvider>
  );
}
