/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: 'rgb(var(--c-bg) / <alpha-value>)',
        panel: 'rgb(var(--c-panel) / <alpha-value>)',
        panel2: 'rgb(var(--c-panel2) / <alpha-value>)',
        lime: 'rgb(var(--c-accent) / <alpha-value>)',
        accent2: 'rgb(var(--c-accent2) / <alpha-value>)',
        onaccent: 'rgb(var(--c-onaccent) / <alpha-value>)',
        cream: 'rgb(var(--c-text) / <alpha-value>)',
        muted: 'rgb(var(--c-muted) / <alpha-value>)',
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
        pulseDot: { '0%,100%': { boxShadow: '0 0 0 0 rgb(var(--c-accent) / .55)' }, '50%': { boxShadow: '0 0 0 7px rgb(var(--c-accent) / 0)' } },
        floaty: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
      },
    },
  },
  plugins: [],
};
