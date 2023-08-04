/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index/html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ff385c",
      },
    },
  },
  plugins: [],
};
