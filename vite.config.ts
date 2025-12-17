import path from 'path';
import { loadEnv } from 'vite';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const resolvedMode = mode || 'test';
    const env = loadEnv(resolvedMode, '.', '');
    Object.assign(process.env, env);
    const openaiKey = env.OPENAI_API_KEY || env.VITE_OPENAI_API_KEY || env.API_KEY;
    const deepseekKey = env.VITE_DEEPSEEK_API_KEY || '';
    const geminiKey = env.VITE_GEMINI_API_KEY || '';
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
        proxy: {
          '/api/deepseek': {
            target: 'https://api.deepseek.com',
            changeOrigin: true,
            secure: true,
            rewrite: path => path.replace(/^\/api\/deepseek/, ''),
          },
        },
      },
      plugins: [react()],
      define: {
        'process.env.OPENAI_API_KEY': JSON.stringify(openaiKey),
        'process.env.API_KEY': JSON.stringify(openaiKey),
        'process.env.VITE_DEEPSEEK_API_KEY': JSON.stringify(deepseekKey),
        'process.env.VITE_GEMINI_API_KEY': JSON.stringify(geminiKey),
        'process.env.VITE_OPENAI_API_KEY': JSON.stringify(env.VITE_OPENAI_API_KEY || ''),
        'import.meta.env.VITE_DEEPSEEK_API_KEY': JSON.stringify(deepseekKey),
        'import.meta.env.VITE_GEMINI_API_KEY': JSON.stringify(geminiKey),
        'import.meta.env.VITE_OPENAI_API_KEY': JSON.stringify(env.VITE_OPENAI_API_KEY || ''),
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
        }
      },
      test: {
        env: {
          VITE_DEEPSEEK_API_KEY: env.VITE_DEEPSEEK_API_KEY,
          VITE_GEMINI_API_KEY: env.VITE_GEMINI_API_KEY,
          VITE_OPENAI_API_KEY: env.VITE_OPENAI_API_KEY,
        },
        setupFiles: ['./vitest.setup.ts'],
      },
    };
});
