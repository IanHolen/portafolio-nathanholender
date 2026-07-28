import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Identidad propia: hueso cálido + terracota/oro, con bandas espresso ──
        paper: "#f4efe4", // lienzo: hueso cálido
        card: "#fdfaf4", // superficie elevada (tarjetas)
        // Secciones de contraste: café casi negro para dar ritmo al recorrido
        espresso: {
          DEFAULT: "#191411",
          soft: "#241d18",
          line: "#3a312a",
        },
        // Escala normal: 900 = lo más oscuro (texto principal sobre hueso).
        ink: {
          950: "#0d0b09",
          900: "#1d1815", // títulos / texto principal
          800: "#2f2822",
          700: "#4b423a", // cuerpo
          600: "#6b6055", // secundario
          500: "#877a6c", // etiquetas mono
          400: "#a1958a", // tenue pero legible
          300: "#c9bfb2", // hairlines / bordes
        },
        // Texto sobre las bandas oscuras (Trabajo destacado y Contacto).
        chalk: {
          DEFAULT: "#faf6ee",
          700: "#e2d9cc",
          600: "#c3b7a6",
          500: "#a2937f",
          400: "#8a7b68",
        },
        // Terracota como acento principal + oro cálido como secundario.
        accent: {
          green: "#9c3d2e", // terracota legible sobre hueso
          emerald: "#9c3d2e",
          lime: "#c25a43",
          mint: "#7c2d21",
          orange: "#c08a2b", // oro para las bandas oscuras
          amber: "#8a6318", // oro profundo para superficies claras
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui"],
        display: ["var(--font-playfair)", "ui-serif", "Georgia"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "Menlo"],
      },
      animation: {
        "gradient-x": "gradient-x 8s ease infinite",
        marquee: "marquee 40s linear infinite",
        "slow-spin": "spin 20s linear infinite",
        "fade-up": "fade-up 0.8s ease-out forwards",
        shimmer: "shimmer 2.5s linear infinite",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
      },
      keyframes: {
        "gradient-x": {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { "background-position": "-1000px 0" },
          "100%": { "background-position": "1000px 0" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.85" },
        },
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(to right, rgba(29,24,21,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(29,24,21,0.035) 1px, transparent 1px)",
        "radial-fade":
          "radial-gradient(ellipse at top, rgba(156,61,46,0.07), transparent 62%)",
      },
    },
  },
  plugins: [],
};

export default config;
