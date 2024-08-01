/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "#000000",
        "gray-900": "#1a1a1a",
        "gray-800": "#333333",
        "gray-700": "#4d4d4d",
        "orange-600": "#f67c39",
        "orange-700": "#e65a2f",
        "orange-400": "#f6a82b",
      },
    },
  },
  plugins: [],
};
