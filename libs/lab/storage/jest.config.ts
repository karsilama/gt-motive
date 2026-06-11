/* eslint-disable */
export default {
  displayName: 'lab-storage',
  preset: 'jest-preset-angular',
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
  setupFilesAfterEnv: ['../../../jest.setup.ts'],
  transform: {
    '^.+\\.(ts|mjs|js|html)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$',
      },
    ],
  },
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
  moduleNameMapper: {
    '^@lab/storage$': '<rootDir>/src/index.ts',
    '^@lab/storage/(.*)$': '<rootDir>/src/$1',
  },
  transformIgnorePatterns: ['node_modules/(?!(@ngrx|@angular|rxjs)/)'],
  coverageDirectory: '../../coverage/libs/lab/storage',
};
