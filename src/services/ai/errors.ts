import { APIError } from 'openai/error';
import { AIServiceError } from '@/utils/aiError';

export const normalizeAIError = (error: unknown): AIServiceError => {
    if (error instanceof AIServiceError) {
        return error;
    }

    if (error instanceof APIError) {
        const status = error.status ?? undefined;
        const message = error.message || 'OpenAI request failed.';
        if (status === 401 || status === 403) {
            return new AIServiceError('auth', 'Authentication error with OpenAI. Please check the API key.', status);
        }
        if (status === 404) {
            return new AIServiceError('validation', 'Requested model not found. Please verify OPENAI_MODEL/VITE_OPENAI_MODEL.', status);
        }
        if (status === 429) {
            return new AIServiceError('rate_limit', 'Rate limit reached. Please wait and try again.', status);
        }
        if (status && status >= 500) {
            return new AIServiceError('service_unavailable', 'OpenAI service is unavailable. Please try again later.', status);
        }
        if (status === 400) {
            return new AIServiceError('validation', message, status);
        }
        return new AIServiceError('unknown', message, status);
    }

    if (error instanceof SyntaxError) {
        return new AIServiceError('parse', 'AI returned invalid JSON.', undefined);
    }

    if (error instanceof Error) {
        const msg = error.message.toLowerCase();
        if (msg.includes('api key')) {
            return new AIServiceError('auth', error.message);
        }
        if (msg.includes('quota')) {
            return new AIServiceError('quota', 'Quota exceeded. Please try again later.');
        }
        if (msg.includes('fetch') || msg.includes('network')) {
            return new AIServiceError('network', 'Network error. Please check your connection and try again.');
        }
        return new AIServiceError('unknown', error.message);
    }

    return new AIServiceError('unknown', 'An unexpected error occurred.');
};
