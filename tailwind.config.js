/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#0A0D14",
        bentoBg: "#0A0D14",
        bentoSurface: "#131824",
        bentoSurfaceElevated: "#182030",
        bentoLime: "#A3E635",
        bentoLimeDark: "#1A2E05",
        bentoLimeLight: "#233D0A",
        bentoAqua: "#00C0F3",
        bentoAquaDark: "#034057",
        bentoAquaLight: "#062837",
        bentoCoral: "#FB7185",
        bentoCoralDark: "#4C0519",
        bentoCoralLight: "#350814",
        bentoDark: "#F1F5F9",
        bentoMuted: "#94A3B8",
        bentoBorder: "#1F293D",
        bentoBorderLight: "#2A3754",
        crimson: "#F43F5E",
        crimsonDark: "#881337",
        crimsonLight: "#2E0914",
        crimsonMuted: "#FB7185",
        brandDark: "#0A0D14",
        brandDarkMuted: "#131824",
        // Backward compatibility mappings
        blush: "#F43F5E",
        blushDark: "#881337",
        seafoam: "#00C0F3",
        seafoamDark: "#10B981",
        teal: "#00C0F3",
        tealDark: "#00C0F3",
        cream: "#0A0D14",
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
