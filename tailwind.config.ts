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
        // ── "Cine + Ops" dark base ──
        // Deep blue-black canvas + raised control-panel surfaces.
        paper: "#0B0F1A", // page canvas
        card: "#111828", // raised panel / tile
        panel: "#0E1422", // recessed surface
        // Text scale inverts the original: higher number = brighter on dark.
        ink: {
          950: "#ffffff",
          900: "#eef3fb", // primary headings / strongest text
          800: "#d5deec",
          700: "#aeb9cc", // body copy
          600: "#8592a8", // secondary
          500: "#69768c", // muted labels
          400: "#525d70", // faint
          300: "#3a4457", // hairlines-as-color
        },
        // Prime Video cyan is the signal color; warm amber is the secondary.
        accent: {
          green: "#00A8E1", // primary accent (cyan)
          emerald: "#00A8E1",
          lime: "#54D6F6",
          mint: "#37C4EC",
          cyan: "#00A8E1",
          orange: "#F5B44C",
          amber: "#F5B44C",
          up: "#39D98A", // positive delta
          down: "#FF6B7D", // negative delta
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui"],
        display: ["var(--font-archivo)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "Menlo"],
      },
      letterSpacing: {
        poster: "-0.03em",
      },
      animation: {
        "gradient-x": "gradient-x 8s ease infinite",
        marquee: "marquee 40s linear infinite",
        "slow-spin": "spin 20s linear infinite",
        "fade-up": "fade-up 0.8s ease-out forwards",
        shimmer: "shimmer 2.5s linear infinite",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
        scan: "scan 6s linear infinite",
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
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "0.85" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(to right, rgba(120,170,220,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(120,170,220,0.05) 1px, transparent 1px)",
        "radial-fade":
          "radial-gradient(ellipse at top, rgba(0,168,225,0.12), transparent 60%)",
      },
    },
  },
  plugins: [],
};

export default config;
