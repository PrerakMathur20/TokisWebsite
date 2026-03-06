import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createRequire } from 'module';

const _require = createRequire(import.meta.url);

function getTokisVersion(): string {
  // Local dev: read from sibling TokisLib
  try { return _require('../TokisLib/packages/tokis/package.json').version; } catch {}
  // CI / no TokisLib: read from installed @tokis/react in node_modules
  try { return _require('@tokis/react/package.json').version; } catch {}
  return '0.0.0';
}

export default defineConfig({
  base: process.env.VITE_BASE_URL ?? '/',
  define: {
    __APP_VERSION__: JSON.stringify(getTokisVersion()),
  },
  plugins: [react()],
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
});
