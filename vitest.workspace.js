import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
  './apps/app-chrome-extension/vite.config.ts',
  './dist/apps/app-chrome-extension/vite.config.js',
]);
