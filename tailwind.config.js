/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core brand — Amber Gold
        "primary":                  "#C47A2C",
        "primary-hover":            "#D4943A",
        "primary-active":           "#A3621E",
        "primary-container":        "#F5C97A", // Tint / light background
        "on-primary":               "#FFFFFF",
        "on-primary-container":     "#7A4A15", // Dark
        // Accent — Sage Green
        "secondary":                "#A3B18A",
        "secondary-hover":          "#B8C99E",
        "secondary-active":         "#7E9163",
        "secondary-container":      "#DDE6D0", // Tint / light background
        "on-secondary":             "#FFFFFF",
        "on-secondary-container":   "#5C6E45", // Dark
        // Backgrounds — Cream Beige
        "background":               "#EADBC8",
        "on-background":            "#6B4F3A", // Deep brown text
        "surface":                  "#EADBC8",
        "surface-bright":           "#FFFFFF", // White for modals/popovers
        "on-surface":               "#6B4F3A",
        "surface-container":        "#EADBC8",
        "surface-container-low":    "#EADBC8",
        "surface-container-high":   "#EADBC8",
        "surface-container-highest":"#EADBC8",
        "surface-container-lowest": "#FFFFFF",
        "surface-variant":          "#EADBC8",
        "on-surface-variant":       "#6B4F3A",
        // Borders & outlines
        "outline":                  "#6B4F3A",
        "outline-variant":          "#A3B18A",
        // Error
        "error":                    "#BA1A1A",
        "error-container":          "#FFDAD6",
        "on-error":                 "#FFFFFF",
        "on-error-container":       "#410002",
        // Inverse
        "inverse-surface":          "#6B4F3A",
        "inverse-on-surface":       "#EADBC8",
        "inverse-primary":          "#D4943A",
        "surface-tint":             "#C47A2C"
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        sm:      "0.375rem",
        md:      "0.75rem",
        lg:      "1rem",
        xl:      "1.25rem",
        "2xl":   "1.5rem",
        "3xl":   "2rem",
        full:    "9999px"
      },
      spacing: {
        xl:              "48px",
        "container-max": "1280px",
        sm:              "8px",
        xs:              "4px",
        gutter:          "24px",
        md:              "16px",
        lg:              "24px",
        xxl:             "80px",
        unit:            "4px"
      },
      fontFamily: {
        // Arabic premium fonts
        sans:          ["'Reem Kufi Fun'", "system-ui", "sans-serif"],
        "display-lg":  ["'Reem Kufi Fun'", "sans-serif"],
        "headline-md": ["'Reem Kufi Fun'", "sans-serif"],
        "title-sm":    ["'Reem Kufi Fun'", "sans-serif"],
        "body-rg":     ["'Reem Kufi Fun'", "sans-serif"],
        "label-xs":    ["'Reem Kufi Fun'", "sans-serif"]
      },
      fontSize: {
        "display-lg":  ["3.25rem",  { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "700" }],
        "headline-md": ["2.125rem", { lineHeight: "1.35", fontWeight: "700" }],
        "title-sm":    ["1.125rem", { lineHeight: "1.6",  fontWeight: "600" }],
        "body-rg":     ["0.9375rem", { lineHeight: "1.75", fontWeight: "400" }],
        "label-xs":    ["0.75rem",  { lineHeight: "1.2",  letterSpacing: "0.04em", fontWeight: "500" }]
      },
      boxShadow: {
        "card":    "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.06)",
        "card-md": "0 4px 12px rgba(0,0,0,0.08), 0 12px 32px rgba(0,0,0,0.08)",
        "card-lg": "0 8px 24px rgba(0,0,0,0.1), 0 24px 64px rgba(0,0,0,0.1)"
      },
      backgroundImage: {
        'mashrabiya': "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0l20 20-20 20L0 20z' fill='%23C47A2C' fill-opacity='0.04' fill-rule='evenodd'/%3E%3C/svg%3E\")",
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ],
}
