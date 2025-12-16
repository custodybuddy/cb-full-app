import { readAIProxyUrl, readOpenAIModel } from '@/utils/envUtils';
import { AIServiceError } from '@/utils/aiError';

let cachedModel: string | null = null;

export const resolveModel = (): string => {
    if (!cachedModel) {
        cachedModel = readOpenAIModel();
    }
    return cachedModel;
};

export const resolveAIProxyUrl = (): string | null => {
    const proxyUrl = readAIProxyUrl();
    if (!proxyUrl) {
        throw new AIServiceError('missing_api_key', 'AI proxy URL is not configured.');
    }
    return proxyUrl;
};
