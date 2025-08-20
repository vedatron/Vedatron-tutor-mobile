/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}", "*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      // colors: {
      //   border: "hsl(var(--border))",
      //   input: "hsl(var(--input))",
      //   ring: "hsl(var(--ring))",
      //   background: "hsl(var(--background))",
      //   foreground: "hsl(var(--foreground))",
      //   primary: {
      //     DEFAULT: "hsl(var(--primary))",
      //     foreground: "hsl(var(--primary-foreground))",
      //   },
      //   secondary: {
      //     DEFAULT: "hsl(var(--secondary))",
      //     foreground: "hsl(var(--secondary-foreground))",
      //   },
      //   destructive: {
      //     DEFAULT: "hsl(var(--destructive))",
      //     foreground: "hsl(var(--destructive-foreground))",
      //   },
      //   muted: {
      //     DEFAULT: "hsl(var(--muted))",
      //     foreground: "hsl(var(--muted-foreground))",
      //   },
      //   accent: {
      //     DEFAULT: "hsl(var(--accent))",
      //     foreground: "hsl(var(--accent-foreground))",
      //   },
      //   popover: {
      //     DEFAULT: "hsl(var(--popover))",
      //     foreground: "hsl(var(--popover-foreground))",
      //   },
      //   card: {
      //     DEFAULT: "hsl(var(--card))",
      //     foreground: "hsl(var(--card-foreground))",
      //   },
      // },
      // borderRadius: {
      //   lg: "var(--radius)",
      //   md: "calc(var(--radius) - 2px)",
      //   sm: "calc(var(--radius) - 4px)",
      // },
      fontFamily: {

        poppins: ['Poppins_400Regular', 'sans-serif'],
        'poppins-semibold': ['Poppins_600SemiBold', 'sans-serif'],
        'poppins-bold': ['Poppins_700Bold', 'sans-serif'],
      },
      boxShadow: {
        'xs': '0 0 1px rgba(0,0,0,0.05)',
        'sm': '0 1px 2px rgba(0,0,0,0.1)',
        'md': '0 2px 4px rgba(0,0,0,0.25)',
        'lg': '0 4px 6px rgba(0,0,0,0.3)',
        'xl': '0 8px 10px rgba(0,0,0,0.4)',
      }
    },
  },
  presets: [require("nativewind/preset")],
  // plugins: [require("tailwindcss-animate")],
  plugins: [
    ({ addBase }) =>
      addBase({
        ".light": {
          "--background": "#f3f5f7",
          "--foreground": "#171717",
          "--background-color": "#f3f5f7",
          "--nav-text-color": "rgba(41, 39, 45, 0.733)",
          "--card-background-color": "#ffffff",
          "--hover-backgroud-color": "#cdcdcd4d",
          "--card-border-color": "#e4e4e4",
          "--text-color": "#050109",
          "--sidebar-background-color": "#ffffff",
          "--field-background-color": "#e4e4e4",
          "--primary-color": "#4282f0",
        },
        ".dark": {
          "--foreground": "#ededed",
          "--background-color": "#101010",
          "--nav-text-color": "rgba(255, 255, 255, 0.6)",
          "--card-background-color": "#27272a4d",
          "--hover-backgroud-color": "#3636384d",
          "--card-border-color": "#1e1e20",
          "--text-color": "#ffffff",
          "--sidebar-background-color": "#181819",
          "--field-background-color": "#27272a4d",
          "--combobox-background-color": "#27272a",
          "--primary-color": "#4282f0",

        }
      }),
  ]

}
