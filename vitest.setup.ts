import { loadEnv } from 'vite';

const env = loadEnv(process.env.NODE_ENV || 'test', process.cwd(), '');
Object.assign(process.env, env);
