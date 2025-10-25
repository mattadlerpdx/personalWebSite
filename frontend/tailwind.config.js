/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
    safelist: [
    'text-white',
    'dark:text-white',
    'hover:underline',
    'bg-blue-600',
    'bg-green-600',
    'text-3xl',
    'gap-2',
    'flex',
    'items-center',
    'justify-center',
    'rounded-lg',
    'animate-bounce',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        miami: {
          pink: '#ff6ec7',
          purple: '#da70d6',
          blue: '#7b68ee',
          cyan: '#5ee6eb',
          teal: '#20c997',
        },
      },
      keyframes: {
        floatOrganic: {
          '0%': { transform: 'translate(-50%, -50%) translateY(0px)' },
          '20%': { transform: 'translate(-50%, -50%) translateY(-4px)' },
          '40%': { transform: 'translate(-50%, -50%) translateY(3px)' },
          '60%': { transform: 'translate(-50%, -50%) translateY(-6px)' },
          '80%': { transform: 'translate(-50%, -50%) translateY(2px)' },
          '100%': { transform: 'translate(-50%, -50%) translateY(0px)' },
        },
        wiggleRotate: {
          '0%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(1.5deg)' },
          '50%': { transform: 'rotate(-1.5deg)' },
          '75%': { transform: 'rotate(1deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      animation: {
        floatOrganic: 'floatOrganic 5s ease-in-out infinite',
        wiggleRotate: 'wiggleRotate 6s ease-in-out infinite',
        shimmer: 'shimmer 15s ease-in-out infinite',
      },
      backgroundImage: {
        'gradient-miami': 'linear-gradient(90deg, #ff6ec7, #da70d6, #7b68ee, #5ee6eb, #20c997, #5ee6eb, #7b68ee, #da70d6, #ff6ec7)',
      },
      backgroundSize: {
        '200': '200%',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography') // Optional: for better layout/text default behavior
  ],
};

