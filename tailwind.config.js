/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream:         '#FDFBF7',
        surface:       '#FFFFFF',
        forest:        '#2C4A3E',
        'forest-dark': '#1E3329',
        gold:          '#C4963A',
        'gold-hover':  '#A67C2A',
        ink:           '#1A1A1A',
        muted:         '#6B7280',
        border:        '#E5E1D8',
        tagbg:         '#F3F0EA',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans:  ['"Inter"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
