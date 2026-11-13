/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rosewood: {
          50: '#FDF7F4',
          100: '#F7ECE7',
          200: '#EBD4C9',
          300: '#DAB6A4',
          400: '#B87F63',
          500: '#8E533A',
          600: '#6E402D',
          700: '#523021',
          800: '#3D2217',
          900: '#2B1810',
          950: '#180D08',
        },
        brass: {
          50: '#FCF9EE',
          100: '#F7F0D5',
          200: '#EEDDA7',
          300: '#E4C773',
          400: '#D9B44A',
          500: '#D4AF37',
          600: '#C69214',
          700: '#A4740D',
          800: '#825A0E',
          900: '#68470E',
        },
        cream: {
          50: '#FCFAF7',
          100: '#FAF7F2',
          200: '#F4ECE4',
          300: '#ECE0D3',
          400: '#DECDBD',
          500: '#C9B5A2',
        },
        charcoal: {
          DEFAULT: '#1F1A17',
          light: '#362F2B',
          muted: '#5F554F',
          subtle: '#8C8078',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        'serif-hi': ['"Noto Serif Devanagari"', 'serif'],
        'sans-hi': ['"Noto Sans Devanagari"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'heritage-pattern': "radial-gradient(#c6921422 1px, transparent 1px), radial-gradient(#c6921415 1px, #faf7f2 1px)",
      },
      boxShadow: {
        'royal': '0 10px 30px -5px rgba(43, 24, 16, 0.12), 0 4px 6px -2px rgba(198, 146, 20, 0.08)',
        'royal-lg': '0 20px 40px -10px rgba(43, 24, 16, 0.18), 0 8px 12px -4px rgba(198, 146, 20, 0.15)',
        'gold-glow': '0 0 25px rgba(198, 146, 20, 0.28)',
      }
    },
  },
  plugins: [],
}
