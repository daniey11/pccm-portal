/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Structural tokens driven by CSS variables (see index.css)
        ink: "var(--ink)",
        surface: "var(--surface)",
        surface2: "var(--surface-2)",
        line: "var(--line)",
        text: "var(--text)",
        muted: "var(--muted)",
        primary: "var(--primary)",
        // Domain hues. Color encodes which clinical domain you are in.
        pulmonary: "var(--pulmonary)",
        critical: "var(--critical)",
        bronch: "var(--bronch)",
        transplant: "var(--transplant)",
        foundations: "var(--foundations)",
        // Semantic content flags
        safety: "var(--safety)",
        highyield: "var(--highyield)",
        landmark: "var(--landmark)",
        success: "var(--success)",
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', "system-ui", "sans-serif"],
        serif: ['"IBM Plex Serif"', "Georgia", "serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "monospace"],
      },
      maxWidth: {
        reading: "68ch",
      },
    },
  },
  // Domain/semantic colors are composed dynamically (e.g. text-${domain},
  // bg-${domain}/10), so their utility classes must be safelisted or Tailwind
  // will purge them from the production build.
  safelist: [
    ...["pulmonary", "critical", "bronch", "transplant", "foundations", "primary", "safety", "highyield", "landmark", "success"].flatMap(
      (c) => [
        `text-${c}`,
        `bg-${c}`,
        `border-${c}`,
        `bg-${c}/10`,
        `bg-${c}/20`,
        `border-${c}/30`,
        `border-${c}/40`,
        `ring-${c}`,
        `fill-${c}`,
        `shadow-${c}/20`,
      ]
    ),
  ],
};
