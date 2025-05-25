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
      },
      animation: {
        floatOrganic: 'floatOrganic 5s ease-in-out infinite',
        wiggleRotate: 'wiggleRotate 6s ease-in-out infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography') // Optional: for better layout/text default behavior
  ],
};

