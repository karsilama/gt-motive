const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, './libs/**/src/lib/**/*.{html,ts}'),
    join(__dirname, './apps/**/*.{html,ts}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    screens: {
      sm: '320px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {},
  },
  plugins: [],
};
