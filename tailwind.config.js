/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        script: ['"Dancing Script"', 'cursive'], // Asegúrate de que esta fuente esté importada en index.html
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'],
      },
      colors: {
        // Paleta de colores iOS-like
        'dark-bg': '#1C1C1E',     // Fondo oscuro principal
        'dark-surface': '#2C2C2E', // Fondo de componentes base
        'dark-card': '#3A3A3C',    // Fondo de tarjetas/elementos anidados
        'accent-pink': '#EB5281',  // Rosa vibrante para acentos
        'accent-purple': '#BD5BEA',// Púrpura suave
        'text-light': '#F2F2F7',   // Texto principal claro
        'text-secondary': '#AEAEB2',// Texto secundario
        'text-placeholder': '#636366',// Texto placeholder
      },
      boxShadow: {
        // Sombras suaves para el efecto "flotante"
        'neumorphic-sm': '4px 4px 8px rgba(0,0,0,0.1), -4px -4px 8px rgba(255,255,255,0.05)',
        'neumorphic-md': '6px 6px 12px rgba(0,0,0,0.15), -6px -6px 12px rgba(255,255,255,0.07)',
        'neumorphic-lg': '8px 8px 16px rgba(0,0,0,0.2), -8px -8px 16px rgba(255,255,255,0.1)',
        'ios-card': '0 4px 10px rgba(0,0,0,0.2)', // Sombra más limpia para tarjetas
        'ios-float': '0 8px 20px rgba(0,0,0,0.3)', // Sombra para elementos flotantes/modals
      }
    },
  },
  plugins: [],
}