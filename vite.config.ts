import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, (process as any).cwd(), '');

  return {
    plugins: [react()],
    // Define global constants replacement
    define: {
      // Ensure process.env exists so destructuring or property access doesn't crash
      'process.env': {},
      // Explicitly replace the API key
      'process.env.API_KEY': JSON.stringify(env.VITE_API_KEY || env.API_KEY),
      'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV),
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