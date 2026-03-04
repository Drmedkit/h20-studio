/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#111111',
        primary: '#E8E4DD',
        accent: '#E63B2E',
        dark: '#111111',
        surface: '#1A1A1A',
        offwhite: '#F5F3EE'
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        drama: ['"DM Serif Display"', 'serif'],
        data: ['"Space Mono"', 'monospace'],
      }
    },
  },
  plugins: [],
}
