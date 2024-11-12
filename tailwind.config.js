/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/**/*.ejs", // Ruta a tus archivos EJS
    "./public/**/*.html", // Si tienes archivos HTML en la carpeta public
    "./public/**/*.js" // Si tienes archivos JS en la carpeta public
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}