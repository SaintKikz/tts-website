import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        surface: {
          DEFAULT: "rgb(var(--surface) / <alpha-value>)",
          2: "rgb(var(--surface-2) / <alpha-value>)",
        },
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        sand: "rgb(var(--sand) / <alpha-value>)",
        petrol: "rgb(var(--petrol) / <alpha-value>)",
        energy: "rgb(var(--energy) / <alpha-value>)",
        line: "rgb(15 23 42 / 0.10)",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        container: "80rem",
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      boxShadow: {
        glow: "0 1px 2px rgb(15 23 42 / 0.06), 0 24px 60px -24px rgb(15 23 42 / 0.18)",
        sand: "0 18px 50px -18px rgb(var(--sand) / 0.40)",
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(to right, rgb(15 23 42 / 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgb(15 23 42 / 0.04) 1px, transparent 1px)",
        "radial-fade":
          "radial-gradient(60% 60% at 50% 0%, rgb(var(--sand) / 0.12), transparent 70%)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.6s ease-out both",
        shimmer: "shimmer 1.8s infinite",
      },
    },
  },
  plugins: [],
};

export default config;
