import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, (process as any).cwd(), '');

  return {
    plugins: [react()],
    // Define global constants replacement
    define: {
      // Fix for "process is not defined" in browser
      'process.env': {
        // Map VITE_API_KEY (from Render) or API_KEY to process.env.API_KEY
        API_KEY: env.VITE_API_KEY || env.API_KEY,
        NODE_ENV: env.NODE_ENV
      }
    },
    build: {
      outDir: 'dist',
      emptyOutDir: true,
    },
    server: {
      host: true
    }
  };
});