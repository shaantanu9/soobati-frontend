/** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ['./<src>/**/*.{js,jsx,ts,tsx}'],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };

// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    theme: {
      extend: {
        colors: {
          'whiteplan': '#FFFFFF',
          'blackplan': '#000000',
          'grayplan': '#808080',
          'darkGrayplan': '#404040',
        },
      },
    },
  },
  plugins: [],
};