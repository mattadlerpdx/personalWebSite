/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        floatOrganic: {
          '0%':   { transform: 'translate(-50%, -50%) translateY(0)' },
          '25%':  { transform: 'translate(-50%, -50%) translateY(-6px)' },
          '50%':  { transform: 'translate(-50%, -50%) translateY(3px)' },
          '75%':  { transform: 'translate(-50%, -50%) translateY(-5px)' },
          '100%': { transform: 'translate(-50%, -50%) translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': {
            boxShadow: '0 0 0px 0 rgba(0, 200, 255, 0.0)',
          },
          '50%': {
            boxShadow: '0 0 12px 6px rgba(0, 200, 255, 0.25)',
          },
        },
      },
      animation: {
        'float-organic': 'floatOrganic 4s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
