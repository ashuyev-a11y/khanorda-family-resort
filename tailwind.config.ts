import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}", "./config/**/*.ts"],
  theme: {
    extend: {
      colors: {
        forest: "#22352A",
        pine: "#304738",
        wood: "#8B6849",
        sand: "#D8C3A5",
        milk: "#F6F2EB",
        graphite: "#1E1E1C",
        water: "#2F4B63",
        copper: "#C67B52",
        "copper-dark": "#a9633f",
      },
      fontFamily: {
        display: ["var(--font-prata)", "serif"],
        sans: ["var(--font-manrope)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
      maxWidth: {
        content: "1180px",
      },
    },
  },
  plugins: [],
};

export default config;
