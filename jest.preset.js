const nxPreset = require('@nx/jest/preset').default;

module.exports = {
  ...nxPreset,
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [
    'node_modules/(?!(@ngrx|rxjs|@angular)/)',
  ],
  extensionsToTreatAsEsm: ['.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'html'],
};
