/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      fontSize: {
        'xs': ['0.8125rem', { lineHeight: '1.5rem' }],
        'sm': ['0.9375rem', { lineHeight: '1.625rem' }],
        'base': ['1.125rem', { lineHeight: '1.875rem' }],
        'lg': ['1.25rem', { lineHeight: '2rem' }],
        'xl': ['1.5rem', { lineHeight: '2.25rem' }],
        '2xl': ['1.75rem', { lineHeight: '2.5rem' }],
        '3xl': ['2.25rem', { lineHeight: '2.75rem' }],
        '4xl': ['2.75rem', { lineHeight: '3rem' }],
        '5xl': ['3.5rem', { lineHeight: '1' }],
        '6xl': ['4.25rem', { lineHeight: '1' }],
        '7xl': ['5.25rem', { lineHeight: '1' }],
      },
    },
  },
  plugins: [],
};
