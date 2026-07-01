/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Microsoft YaHei",
          "sans-serif"
        ]
      },
      colors: {
        ink: {
          950: "#080B14",
          900: "#101624",
          800: "#162033"
        },
        signal: {
          blue: "#6EA8FE",
          violet: "#B28DFF",
          red: "#FF6B6B",
          teal: "#6EE7D8"
        },
        text: {
          main: "#F5F7FA",
          muted: "#AAB4C0"
        }
      },
      boxShadow: {
        glow: "0 0 40px rgba(110, 168, 254, 0.24)",
        alert: "0 0 44px rgba(255, 107, 107, 0.22)"
      },
      backgroundImage: {
        "radial-grid":
          "radial-gradient(circle at 30% 20%, rgba(110,168,254,.22), transparent 32%), radial-gradient(circle at 76% 12%, rgba(178,141,255,.16), transparent 30%), linear-gradient(180deg, #080B14 0%, #101624 100%)"
      }
    }
  },
  plugins: []
};
