module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
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
  plugins: [],
};
