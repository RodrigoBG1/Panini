/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'bg-base': '#0a0a1a',
        'bg-surface': '#0d0d24',
        'bg-card': '#1a1a38',
        'nav-bg': '#111130',
        'red-primary': '#C8102E',
        'red-light': '#ff4d6d',
        'blue-deep': '#00205B',
      },
    },
  },
  plugins: [],
}

