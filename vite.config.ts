// vite.config.ts
import { defineConfig } from 'vitest/config'; // <-- use vitest/config
import react from '@vitejs/plugin-react';
import path from 'path';
import tsconfig from './tsconfig.json';

const SRC_PATH = path.resolve(__dirname, 'src');

const parseTsConfigPaths = (paths: Record<string, string[]>): Record<string, string> => {
  const aliases: Record<string, string> = {};

  Object.entries(paths).forEach(([alias, pathsArr]) => {
    const cleanAlias = alias.replace(/\/\*$/, '');
    const aliasPath = pathsArr[0].replace(/\/\*$/, '');
    aliases[cleanAlias] = path.join(SRC_PATH, aliasPath);
  });

  return aliases;
};

export default defineConfig({
  base: '/',
  plugins: [react()],
  resolve: {
    alias: parseTsConfigPaths(tsconfig.compilerOptions.paths),
  },
  test: {  // <-- now TypeScript will accept this
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    include: ['src/**/*.test.{ts,tsx}'],
  },
});