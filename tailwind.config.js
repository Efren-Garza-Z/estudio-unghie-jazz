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
        'dark-bg': '#F5ECF7',         // Fondo negro muy oscuro, casi absoluto
        'dark-surface': '#EAD8F0',    // Fondo de componentes base (un gris muy oscuro)
        'dark-card': '#EAD8F0',       // Fondo de tarjetas/elementos anidados (un gris oscuro intermedio)
        
        'gold-accent': '#82DDE7',     // Dorado principal para acentos (Gold)
        'gold-secondary': '#66B6C4',  // Dorado secundario (Goldenrod)
        
        'text-light': '#1A1A1A',      // Texto principal claro
        'text-secondary': '#4F4F4F',  // Texto secundario
        'text-placeholder': '#737373',// Texto placeholder
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