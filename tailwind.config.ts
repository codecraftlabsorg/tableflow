import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
// Color Tokens
      colors: {
        brand: {
          dark: "#1A1A2E",       // Primary bg, nav, headers
          DEFAULT: "#1A1A2E",
        },
        accent: {
          DEFAULT: "#E94560",    // CTAs, active states, alerts
          soft: "#FF6B6B",       // Hover states, secondary highlights
        },
        gold: {
          DEFAULT: "#F5A623",    // Warnings, 5–10min urgency, mods
          light: "#FFD580",
        },
        teal: {
          DEFAULT: "#0F9B8E",    // Success, kitchen confirm, <5min
          light: "#3ECFBF",
        },
        purple: {
          DEFAULT: "#6C63FF",    // Analytics charts, tertiary actions
        },
        surface: {
          DEFAULT: "#F7F8FC",    // Page backgrounds (light mode)
          section: "#EEF0F8",    // Card surfaces, sidebar
          dark: "#12122A",       // Dark mode card surface
          darker: "#0D0D1F",     // Dark mode page bg
        },
        text: {
          dark: "#1A1A2E",       // Primary text
          mid: "#555770",        // Secondary text, captions
          light: "#F7F8FC",      // Light text on dark bg
          muted: "#8888A8",      // Muted/disabled text
        },
        border: {
          gray: "#DCDFE8",       // Dividers, card borders
          dark: "#2A2A4A",       // Dark mode borders
        },
        // Kitchen urgency system
        urgency: {
          normal: "#0F9B8E",     // < 5 min  — teal
          warning: "#F5A623",    // 5–10 min — gold
          critical: "#E94560",   // > 10 min — red (pulsing)
        },
        // Order status colors
        status: {
          pending: "#F5A623",
          preparing: "#6C63FF",
          ready: "#0F9B8E",
          served: "#555770",
        },
      },

// Typography
      fontFamily: {
        heading: ["var(--font-syne)", "Arial Black", "sans-serif"],
        body: ["var(--font-instrument)", "Arial", "sans-serif"],
        mono: ["var(--font-dm-mono)", "Courier New", "monospace"],
      },
      fontSize: {
        display: ["36px", { lineHeight: "1.1", letterSpacing: "-0.01em", fontWeight: "700" }],
        h1: ["28px", { lineHeight: "1.3", fontWeight: "700" }],
        h2: ["22px", { lineHeight: "1.4", fontWeight: "700" }],
        h3: ["18px", { lineHeight: "1.5", fontWeight: "600" }],
        body: ["15px", { lineHeight: "1.6" }],
        label: ["12px", { lineHeight: "1", letterSpacing: "0.08em", fontWeight: "700" }],
        caption: ["11px", { lineHeight: "1.4" }],
        // Kitchen-specific — large for 2m readability
        "kds-table": ["48px", { lineHeight: "1", fontWeight: "800" }],
        "kds-item": ["24px", { lineHeight: "1.3", fontWeight: "700" }],
        "kds-mod": ["18px", { lineHeight: "1.4" }],
      },

      // ─── Spacing (8px base unit) ─────────────────────────────────
      spacing: {
        "page-x": "48px",      // Desktop page horizontal padding
        "page-x-sm": "16px",   // Mobile page horizontal padding
        "card-gap": "24px",    // Between cards
        "card-inner": "16px",  // Within cards
      },

      // ─── Border Radius ───────────────────────────────────────────
      borderRadius: {
        card: "12px",
        btn: "8px",
        badge: "999px",
        modal: "16px",
        input: "6px",
      },

      // ─── Box Shadow ──────────────────────────────────────────────
      boxShadow: {
        card: "0 1px 4px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04)",
        "card-hover": "0 4px 12px rgba(0,0,0,0.12), 0 8px 32px rgba(0,0,0,0.06)",
        modal: "0 24px 64px rgba(0,0,0,0.24)",
        "kds-card": "0 2px 8px rgba(0,0,0,0.3), 0 8px 24px rgba(0,0,0,0.2)",
        "urgency-critical": "0 0 0 2px #E94560, 0 0 16px rgba(233,69,96,0.4)",
        "urgency-warning": "0 0 0 2px #F5A623, 0 0 12px rgba(245,166,35,0.3)",
        "urgency-normal": "0 0 0 2px #0F9B8E, 0 0 8px rgba(15,155,142,0.2)",
      },

      // ─── Animations ──────────────────────────────────────────────
      keyframes: {
        "slide-in-top": {
          "0%": { opacity: "0", transform: "translateY(-16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "pulse-ring": {
          "0%, 100%": { boxShadow: "0 0 0 2px #E94560, 0 0 8px rgba(233,69,96,0.4)" },
          "50%": { boxShadow: "0 0 0 4px #E94560, 0 0 20px rgba(233,69,96,0.7)" },
        },
        "badge-pop": {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.4)" },
          "100%": { transform: "scale(1)" },
        },
        "timer-tick": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "card-enter": {
          "0%": { opacity: "0", transform: "translateY(-20px) scale(0.96)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "slide-in-top": "slide-in-top 0.25s ease-out",
        "slide-up": "slide-up 0.3s ease-out",
        "fade-in": "fade-in 0.2s ease-out",
        "pulse-ring": "pulse-ring 1.5s ease-in-out infinite",
        "badge-pop": "badge-pop 0.3s ease-out",
        "timer-tick": "timer-tick 1s ease-in-out infinite",
        "card-enter": "card-enter 0.3s ease-out",
        shimmer: "shimmer 1.8s linear infinite",
      },

      // ─── Breakpoints ─────────────────────────────────────────────
      screens: {
        xs: "375px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [],
};

export default config;
