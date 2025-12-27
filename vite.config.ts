import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
        proxy: {
          '/api': {
            target: 'http://localhost:3001',
            changeOrigin: true,
          }
        }
      },
      plugins: [react()],
      define: {
        // Remove API keys from client-side bundle for security
        // API keys are now handled securely on the server side
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
