/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryBG: {
          1: "#E9E8FB",
          2: "#F7F5FF",
          3: "#F5F5F5"
        },
        primaryText: {
          1: "#4752AE",
          2: "#6974CA"
        }
      }
    },
    plugins: []
  }
};
