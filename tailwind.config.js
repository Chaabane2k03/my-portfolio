/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#FFFFFF",
          secondary: "#A3A3A3",
          accent: "#FFFFFF",
          warning: "#FFFFFF",
          neutral: "#000000",
        },
        dark: {
          900: "#000000",
          800: "#0A0A0A",
          700: "#141414",
          600: "#1E1E1E",
          500: "#262626",
        },
        amber: {
          DEFAULT: "#FFFFFF",
          50: "#FAFAFA",
          100: "#F5F5F5",
          200: "#E5E5E5",
          300: "#D4D4D4",
          400: "#A3A3A3",
          500: "#FFFFFF",
          600: "#E5E5E5",
          700: "#D4D4D4",
        },
        orange: {
          DEFAULT: "#FFFFFF",
          50: "#FAFAFA",
          100: "#F5F5F5",
          200: "#E5E5E5",
          300: "#D4D4D4",
          400: "#A3A3A3",
          500: "#FFFFFF",
          600: "#E5E5E5",
          700: "#D4D4D4",
        },
        crimson: {
          DEFAULT: "#FFFFFF",
          50: "#FAFAFA",
          100: "#F5F5F5",
          200: "#E5E5E5",
          300: "#D4D4D4",
          400: "#A3A3A3",
          500: "#FFFFFF",
          600: "#E5E5E5",
          700: "#D4D4D4",
        },
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
        arabic: ["Noto Sans Arabic", "Inter", "sans-serif"],
      },
      animation: {
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-in-left": "slideInLeft 0.6s ease-out forwards",
        "slide-in-right": "slideInRight 0.6s ease-out forwards",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "draw-line": "drawLine 1s ease-out forwards",
        typewriter: "typewriter 3s steps(30) forwards",
        blink: "blink 0.75s step-end infinite",
        "spin-slow": "spin 8s linear infinite",
        "counter-up": "counterUp 2s ease-out forwards",
        "particle-float": "particleFloat 8s ease-in-out infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(255, 255, 255, 0.25)" },
          "50%": { boxShadow: "0 0 40px rgba(255, 255, 255, 0.18)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        drawLine: {
          "0%": { height: "0" },
          "100%": { height: "100%" },
        },
        typewriter: {
          "0%": { width: "0" },
          "100%": { width: "100%" },
        },
        blink: {
          "0%, 100%": { borderColor: "transparent" },
          "50%": { borderColor: "#FFFFFF" },
        },
        counterUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        particleFloat: {
          "0%, 100%": { transform: "translateY(0) translateX(0)" },
          "25%": { transform: "translateY(-20px) translateX(10px)" },
          "50%": { transform: "translateY(-10px) translateX(-5px)" },
          "75%": { transform: "translateY(-25px) translateX(5px)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-gradient":
          "linear-gradient(135deg, #000000 0%, #111111 42%, #1A1A1A 72%, #000000 100%)",
      },
    },
  },
  plugins: [],
};
