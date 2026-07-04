/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: "#060608",
        panel: "#0f0f14",
        border: "rgba(255,255,255,0.08)",
        accent: "#FF4D00",
        mint: "#00E5A0",
        muted: "#8B8B95",
      },
      fontFamily: {
        display: ["Syne", "system-ui", "sans-serif"],
        sans: ["DM Sans", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        "marquee-reverse": "marquee-reverse 28s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};
