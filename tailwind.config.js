/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#ffffff',
        surface: '#f5f5f5',
        border: '#e0e0e0',
        accent: '#e60000', // vivid red
        muted: '#666666',
        reddark: '#8b0000'
      },
      fontFamily: {
        theater: ['"Bebas Neue"', 'sans-serif'],
        moho: ['"Oswald"', 'sans-serif'],
        druk: ['"Anton"', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glass-gradient': 'linear-gradient(135deg, rgba(230,0,0,0.05) 0%, rgba(230,0,0,0.01) 100%)',
      }
    },
  },
  plugins: [],
}
