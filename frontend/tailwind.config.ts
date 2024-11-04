/* eslint-disable prettier/prettier */
import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      typography: {
        DEFAULT: {
          css: {},
        },
      },
      colors: {
        text: {
          DEFAULT: colors.slate[900],
          "50": colors.slate[50],
          "100": colors.slate[100],
          "200": colors.slate[200],
          "300": colors.slate[300],
          "400": colors.slate[400],
          "500": colors.slate[500],
          "600": colors.slate[600],
          "700": colors.slate[700],
          "800": colors.slate[800],
          "900": colors.slate[900],
          "950": colors.slate[950],
        },
        body: {
          DEFAULT: colors.white,
          "50": colors.slate[950],
          "100": colors.slate[900],
          "200": colors.slate[800],
          "300": colors.slate[700],
          "400": colors.slate[600],
          "500": colors.slate[500],
          "600": colors.slate[400],
          "700": colors.slate[300],
          "800": colors.slate[200],
          "900": colors.slate[100],
          "950": colors.slate[50],
        },
        foreground: "hsl(var(--foreground))",
        background: "hsl(var(--background))",
        primary: {
          "50": colors.violet[50],
          "100": colors.violet[100],
          "200": colors.violet[200],
          "300": colors.violet[300],
          "400": colors.violet[400],
          "500": colors.violet[500],
          "600": colors.violet[600],
          "700": colors.violet[700],
          "800": colors.violet[800],
          "900": colors.violet[900],
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
        xxs: "calc(var(--radius) - 8px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss"),
    require("@tailwindcss/typography"),
    require("tailwindcss-rtl"),
    require("tailwindcss-animate"),
    require("tailwind-scrollbar")({
      nocompatible: true,
    }),
    require("precss"),
    require("autoprefixer"),
  ],
};
export default config;
