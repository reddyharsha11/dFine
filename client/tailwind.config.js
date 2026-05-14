/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2F7B6E',
          light: '#BDDBD1',
          pale: '#E7F3F0',
          dark: '#236358',
        },
        accent: {
          DEFAULT: '#E8643A',
          hover: '#CF5530',
          light: '#FAE8E0',
        },
        surface: {
          soft: '#FBF9F1',
          section: '#E7E9E3',
          dark: '#1A2E2A',
          dark2: '#243B35',
        },
        ink: {
          primary: '#1C2B27',
          secondary: '#4A6B62',
          muted: '#8BA89F',
        },
        gold: {
          DEFAULT: '#D4A847',
          light: '#FAF0D7',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        heading: ['Sora', 'system-ui', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        label: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: '20px',
        '2xl': '32px',
      },
      boxShadow: {
        'teal-sm': '0 2px 12px rgba(47,123,110,0.10)',
        'teal-md': '0 8px 32px rgba(47,123,110,0.12)',
        'teal-lg': '0 20px 60px rgba(47,123,110,0.15)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.8)', opacity: '0.8' },
          '80%, 100%': { transform: 'scale(2)', opacity: '0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2s cubic-bezier(0.455,0.03,0.515,0.955) infinite',
        marquee: 'marquee 40s linear infinite',
      },
      screens: {
        xs: '480px',
      },
    },
  },
  plugins: [],
}
