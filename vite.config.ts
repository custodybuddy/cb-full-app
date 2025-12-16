import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    const openaiKey = env.OPENAI_API_KEY || env.VITE_OPENAI_API_KEY || env.API_KEY || env.GEMINI_API_KEY;
    if (!openaiKey) {
      const message = 'Missing OpenAI API key (OPENAI_API_KEY or VITE_OPENAI_API_KEY).';
      if (mode === 'production') {
        throw new Error(message);
      } else {
        console.warn(message);
      }
    }
    const basePath = env.VITE_BASE_PATH || '/';
    return {
      base: basePath,
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.OPENAI_API_KEY': JSON.stringify(openaiKey),
        'process.env.API_KEY': JSON.stringify(openaiKey),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
        }
      }
    };
});
