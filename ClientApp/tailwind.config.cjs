/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./**/*.html", "./src/**/*.{js,jsx,ts,tsx,md,mdx}"],
  theme: {
    extend: {},
  },
  plugins: [
    require("radix-colors-for-tailwind")({
      colors: ["blue", "slate", "red", "green"],
    }),
  ],
};
