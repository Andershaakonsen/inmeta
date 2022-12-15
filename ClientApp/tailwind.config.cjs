/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.html", "./src/**/*.{js,jsx,ts,tsx,md,mdx}"],
  theme: {
    extend: {},
  },
  plugins: [
    require("radix-colors-for-tailwind")({
      colors: ["blue", "mauve"],
    }),
  ],
};
