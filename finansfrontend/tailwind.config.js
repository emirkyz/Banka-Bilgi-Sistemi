/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    "./index.html",
    "./main.css",
    "./yazitipi.css",
    "./temalar/light_mode_tema.css",
    "./temalar/dark_mode_tema.css",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
