module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/server/'],
  moduleNameMapper: {
    // Моки
    '^services/api(\.ts)?$': '<rootDir>/src/__mocks__/mockApi.ts',
    // Алиасы путей
    '^assets/(.*)$': '<rootDir>/src/assets/$1',
    '^components/(.*)$': '<rootDir>/src/components/$1',
    '^pages/(.*)$': '<rootDir>/src/pages/$1',
    '^services/(.*)$': '<rootDir>/src/services/$1',
    '^store/(.*)$': '<rootDir>/src/store/$1',
    '^config/(.*)$': '<rootDir>/src/config/$1',
    '^styles/(.*)$': '<rootDir>/src/styles/$1',
    '^types/(.*)$': '<rootDir>/src/types/$1',
    '^data/(.*)$': '<rootDir>/src/data/$1',
    '^utils/(.*)$': '<rootDir>/src/utils/$1',
    '^i18n/(.*)$': '<rootDir>/src/i18n/$1',
    // Для CSS-модулей
    '\\.module\\.(css|scss)$': 'identity-obj-proxy',
    // Для обычных CSS
    '\\.(css|scss)$': '<rootDir>/__mocks__/styleMock.js',
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
