module.exports = {
  displayName: 'forum',
  preset: 'jest-preset-angular',
  testEnvironment: 'jsdom',
  // globals: {
  //   'ts-jest': {
  //     tsconfig: '<rootDir>/tsconfig.spec.json',
  //     stringifyContentPathRegex: '.(html|svg)$',
  //     useESM: true,
  //     astTransformers: {
  //       before: ['jest-preset-angular/build/InlineFilesTransformer', 'jest-preset-angular/build/StripStylesTransformer']
  //     }
  //   }
  // },
  // collectCoverage: false,
  // testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
  // transform: {
  //   '^.+\\.(ts|js|html)$': 'ts-jest'
  // },
  // transformIgnorePatterns: ['node_modules/(?!..mjs$)', 'dist/(?!..mjs$)'],
  // moduleNameMapper: {
  //   '^lodash-es$': 'lodash',
  // },
  // moduleFileExtensions: ['ts', 'js', 'html'],
  // coverageReporters: ['html', 'text'],
  coveragePathIgnorePatterns: [
    'node_modules',
    'setup-jest.ts',
    '.module.ts',
    '.index.ts',
    'enums/',
    'interfaces/',
    '<rootDir>/src/main.ts',
    '.service.ts',
    '.config.ts',
    '.html',
    '.js',
    '<rootDir>/dist/',
  ]
};
