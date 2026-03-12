import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        khg: { dark: "#080808", orange: "#FF6B35", copper: "#C87941" },
        navy: "#0a0e1a",
      },
      fontFamily: {
        display: ["Cormorant Garamond", "serif"],
        mono: ["DM Mono", "monospace"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
