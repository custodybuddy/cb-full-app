import { readOpenAIKey, readOpenAIModel } from '@/utils/envUtils';
import { AIServiceError } from '@/utils/aiError';

let cachedModel: string | null = null;

export const resolveApiKey = (): string => {
    const key = readOpenAIKey();
    if (!key) {
        throw new AIServiceError('missing_api_key', 'OpenAI API key is not configured.');
    }
    return key;
};

export const resolveModel = (): string => {
    if (!cachedModel) {
        cachedModel = readOpenAIModel();
    }
    return cachedModel;
};
