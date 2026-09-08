/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        apple: {
          black: '#000000',
          white: '#ffffff',
          gray: '#f5f5f7',
          graydark: '#1d1d1f',
          text: '#1d1d1f',
          subtext: '#6e6e73',
          blue: '#0071e3',
          bluedark: '#0058a8',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
      borderRadius: {
        apple: '18px',
      },
      boxShadow: {
        apple: '0 4px 20px rgba(0,0,0,0.08)',
        'apple-lg': '0 10px 40px rgba(0,0,0,0.12)',
      },
      transitionTimingFunction: {
        apple: 'cubic-bezier(0.28, 0.11, 0.32, 1)',
      },
    },
  },
  plugins: [],
}
