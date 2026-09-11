/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ucin: {
          primary: "#1a472a",    // Verde oscuro UCIN
          secondary: "#2d5a3d",  // Verde secundario
          accent: "#4a8f66",     // Verde claro
          light: "#e8f5e9",      // Verde muy claro
        },
        status: {
          open: "#3b82f6",       // Azul
          review: "#f59e0b",     // Amarillo/Naranja
          escalated: "#f97316",  // Naranja
          resolved: "#10b981",   // Verde
          closed: "#6b7280",     // Gris
        },
        sla: {
          critical: "#ef4444",   // Rojo (<30 min)
          warning: "#f59e0b",    // Amarillo (normal)
          ok: "#10b981",         // Verde (cumplido)
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
