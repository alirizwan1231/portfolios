/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0A0C0A',
        panel: '#12150F',
        panel2: '#171C13',
        lime: '#B8F135',
        cream: '#F2F5EC',
        muted: '#9AA48F',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['Manrope', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
        pulseDot: 'pulseDot 2s ease-in-out infinite',
        floaty: 'floaty 7s ease-in-out infinite',
      },
      keyframes: {
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        pulseDot: { '0%,100%': { boxShadow: '0 0 0 0 rgba(184,241,53,0.55)' }, '50%': { boxShadow: '0 0 0 7px rgba(184,241,53,0)' } },
        floaty: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
      },
    },
  },
  plugins: [],
};
