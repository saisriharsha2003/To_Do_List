import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(() => {
  return {
    build: {
      outDir: 'build',
    },
    plugins: [react()],
    css: {
      postcss: path.resolve(__dirname, 'postcss.config.js'),
    },
  };
});
