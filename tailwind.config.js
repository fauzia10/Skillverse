/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#EBF2F6",
        bentoBg: "#EBF2F6",
        bentoSurface: "#FFFFFF",
        bentoLime: "#D5F29B",
        bentoLimeDark: "#2E4D0C",
        bentoLimeLight: "#EDF9D4",
        bentoAqua: "#A5E3DC",
        bentoAquaDark: "#0C453E",
        bentoAquaLight: "#DDF5F2",
        bentoCoral: "#F8B6B6",
        bentoCoralDark: "#5C1B1B",
        bentoCoralLight: "#FDE5E5",
        bentoDark: "#111827",
        bentoMuted: "#64748B",
        bentoBorder: "#E2EBF0",
        crimson: "#BA203B",
        crimsonDark: "#831124",
        crimsonLight: "#FCEBEF",
        crimsonMuted: "#D44964",
        brandDark: "#111827",
        brandDarkMuted: "#262934",
        // Backward compatibility mappings
        blush: "#BA203B",
        blushDark: "#831124",
        seafoam: "#BA203B",
        seafoamDark: "#2D9F75",
        teal: "#101218",
        tealDark: "#101218",
        cream: "#EBF2F6",
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        display: ["Poppins", "Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
