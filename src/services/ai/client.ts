import OpenAI from 'openai';
import { resolveApiKey } from './env';

let aiClient: OpenAI | null = null;

export const getOpenAIClient = (): OpenAI => {
    if (!aiClient) {
        const apiKey = resolveApiKey();
        aiClient = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });
    }
    return aiClient;
};
