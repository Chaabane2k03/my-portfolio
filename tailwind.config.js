/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#177C8B",
          secondary: "#084A62",
          accent: "#DC3C35",
          warning: "#FFCA5A",
          neutral: "#333031",
        },
      },
    },
  },
  plugins: [],
};
