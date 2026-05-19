/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core brand — Premium Green
        "primary":                  "#1B4332",
        "primary-hover":            "#2D6A4F",
        "primary-active":           "#081C15",
        "primary-container":        "#D8F3DC", // Tint / light background
        "on-primary":               "#FFFFFF",
        "on-primary-container":     "#081C15", // Dark
        // Accent — Sage Green
        "secondary":                "#A3B18A",
        "secondary-hover":          "#B8C99E",
        "secondary-active":         "#7E9163",
        "secondary-container":      "#DDE6D0", // Tint / light background
        "on-secondary":             "#FFFFFF",
        "on-secondary-container":   "#5C6E45", // Dark
        // Backgrounds — Clean White
        "background":               "#FFFFFF",
        "on-background":            "#1B4332", // Dark green text
        "surface":                  "#FFFFFF",
        "surface-bright":           "#FFFFFF", // White for modals/popovers
        "on-surface":               "#1B4332",
        "surface-container":        "#F8F9FA",
        "surface-container-low":    "#FFFFFF",
        "surface-container-high":   "#E9ECEF",
        "surface-container-highest":"#DEE2E6",
        "surface-container-lowest": "#FFFFFF",
        "surface-variant":          "#F8F9FA",
        "on-surface-variant":       "#495057",
        // Borders & outlines
        "outline":                  "#1B4332",
        "outline-variant":          "#A3B18A",
        // Error
        "error":                    "#BA1A1A",
        "error-container":          "#FFDAD6",
        "on-error":                 "#FFFFFF",
        "on-error-container":       "#410002",
        // Inverse
        "inverse-surface":          "#1B4332",
        "inverse-on-surface":       "#FFFFFF",
        "inverse-primary":          "#95D5B2",
        "surface-tint":             "#1B4332",
        // Premium Gold Palette
        "accent": {
          "light": "#F5C97A",
          "medium": "#D4943A",
          "DEFAULT": "#C47A2C",
          "dark": "#A3621E",
          "deep": "#7A4A15",
        }
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
        // Modern clean fonts
        sans:          ["'Marhey'", "'Cairo'", "system-ui", "sans-serif"],
        display:       ["'Marhey'", "'Cairo'", "sans-serif"],
        heading:       ["'Marhey'", "'Cairo'", "sans-serif"],
        body:          ["'Poppins'", "sans-serif"],
        "display-lg":  ["'Marhey'", "'Cairo'", "sans-serif"],
        "headline-md": ["'Marhey'", "'Cairo'", "sans-serif"],
        "title-sm":    ["'Marhey'", "'Cairo'", "sans-serif"],
        "body-rg":     ["'Poppins'", "sans-serif"],
        "label-xs":    ["'Poppins'", "sans-serif"],
        marhey:        ["'Marhey'", "sans-serif"]
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
