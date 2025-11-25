/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Fuente para títulos grandes (Dancing Script)
        script: ['"Dancing Script"', 'cursive'], 
        // Fuente para el cuerpo (Inter)
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'],
      },
      colors: {
        // Paleta de colores iOS-like (versión Negro/Dorado)
        'dark-bg': '#0A0A0A',         // Fondo negro muy oscuro, casi absoluto
        'dark-surface': '#1C1C1E',    // Fondo de componentes base (un gris muy oscuro)
        'dark-card': '#282828',       // Fondo de tarjetas/elementos anidados (un gris oscuro intermedio)
        
        'gold-accent': '#FCD700',     // Dorado principal para acentos (Gold)
        'gold-secondary': '#DAA520',  // Dorado secundario (Goldenrod)
        
        'text-light': '#F2F2F7',      // Texto principal claro
        'text-secondary': '#AEAEB2',  // Texto secundario
        'text-placeholder': '#636366',// Texto placeholder
      },
      boxShadow: {
        // Sombras suaves para el efecto "flotante"
        'ios-card': '0 4px 10px rgba(0,0,0,0.6)', 
        'ios-float': '0 8px 20px rgba(0,0,0,0.8)', 
      }
    },
  },
  plugins: [],
}