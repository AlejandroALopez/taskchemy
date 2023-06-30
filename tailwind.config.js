/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        background: "#F6F8E6",
        darkest: "#042616",
        dark: "#043A21",
        lightest: "#E2F6E9",
        light: "#50C878",
        regular: "#318E52",
        medium: "#9ACD32",
        alternate: "#F7CAC9",
      },
    },
  },
  plugins: [],
};
