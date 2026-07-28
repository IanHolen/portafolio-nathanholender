import type { Metadata, Viewport } from "next";
// Fuentes variables self-hosted (sin fetch externo — funciona offline y en Vercel)
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import "@fontsource-variable/playfair-display";
import "./globals.css";
import CommandPalette from "@/components/CommandPalette";
import ReadingProgress from "@/components/ReadingProgress";
import Providers from "@/components/Providers";
import SkipLink from "@/components/SkipLink";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://nathanholender.vercel.app";

const SITE_TITLE = "Nathan Holender — Production & Operations Manager";
const SITE_DESCRIPTION =
  "Nathan Holender — Production & Operations Manager en Prime Video International (Amazon). Ingeniero Industrial y de Sistemas: operaciones de producción, campañas y program management en LatAm, Europa y Canadá. Portafolio personal / Personal portfolio.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: [
    "Production Manager",
    "Operations Manager",
    "Program Management",
    "Prime Video",
    "Amazon",
    "Industrial Engineer",
    "Vendor Manager",
    "Nathan Holender",
    "Portfolio",
    "Portafolio",
  ],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
    siteName: "Nathan Holender",
    locale: "es_MX",
    alternateLocale: ["en_US"],
    type: "website",
    images: [
      { url: "/opengraph-image", width: 1200, height: 630, alt: SITE_TITLE },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/opengraph-image"],
  },
};

export const viewport: Viewport = {
  themeColor: "#f4efe4",
  colorScheme: "light",
};

// Script inline: fija el idioma desde localStorage antes del primer paint.
const localeScript = `(function(){try{var l=localStorage.getItem('locale');if(l==='en')document.documentElement.lang='en';}catch(e){}})()`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: localeScript }} />
      </head>
      <body className="font-sans selection:bg-accent-green/30">
        <Providers>
          <SkipLink />
          <ReadingProgress />
          <CommandPalette />
          {children}
        </Providers>
      </body>
    </html>
  );
}
