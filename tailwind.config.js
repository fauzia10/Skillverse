/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        crimson: "#BA203B",
        crimsonDark: "#831124",
        crimsonLight: "#FCEBEF",
        crimsonMuted: "#D44964",
        brandDark: "#101218",
        brandDarkMuted: "#262934",
        // Backward compatibility mappings
        blush: "#BA203B",
        blushDark: "#831124",
        seafoam: "#BA203B",
        seafoamDark: "#2D9F75",
        teal: "#101218",
        tealDark: "#101218",
        cream: "#F8F6F8",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Poppins", "Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
