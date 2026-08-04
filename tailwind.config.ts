import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#050505",
        panel: "#0b0d0b",
        line: "rgba(148, 163, 184, 0.14)",
        electric: "#26db12",
        signal: "#E50914",
        linkblue: "#00A3FF"
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif"
        ]
      },
      boxShadow: {
        glow: "0 0 34px rgba(38, 219, 18, 0.18)",
        blueglow: "0 0 26px rgba(0, 163, 255, 0.12)",
        redglow: "0 0 24px rgba(229, 9, 20, 0.13)",
        card: "0 18px 60px rgba(0, 0, 0, 0.38)"
      }
    }
  },
  plugins: []
};

export default config;
