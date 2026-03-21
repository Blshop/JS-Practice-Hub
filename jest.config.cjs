module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '^.+\\.module\\.(css|scss)$': 'identity-obj-proxy',
    '^.+\\.(css|scss)$': '<rootDir>/__mocks__/styleMock.js',

    '^components/(.*)$': '<rootDir>/src/components/$1',
    '^hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^pages/(.*)$': '<rootDir>/src/pages/$1',
    '^store/(.*)$': '<rootDir>/src/store/$1',
    '^types/(.*)$': '<rootDir>/src/types/$1',
    '^config/(.*)$': '<rootDir>/src/config/$1',
    '^styles/(.*)$': '<rootDir>/src/styles/$1',
    '^services/(.*)$': '<rootDir>/src/services/$1',
  },
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.test.json',
      },
    ],
  },
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/main.tsx',
    '!src/vite-env.d.ts',
  ],
};
