import { resolveAIProxyUrl, resolveModel } from './env';
import { AIServiceError } from '@/utils/aiError';

export interface ProxyAIResponse {
    output_text?: string | null;
    output?: Array<{ content?: Array<{ text?: string | null }> }>;
}

type ProxyPayload = {
    model: string;
    input: string | string[];
    instructions: string;
};

export const callAIProxy = async (payload: ProxyPayload): Promise<ProxyAIResponse> => {
    const endpoint = resolveAIProxyUrl();
    if (!endpoint) {
        throw new AIServiceError('missing_api_key', 'AI proxy URL is not configured.');
    }

    const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, model: payload.model || resolveModel() }),
    });

    if (!response.ok) {
        throw new AIServiceError('network', `AI proxy returned ${response.status}`);
    }

    return response.json() as Promise<ProxyAIResponse>;
};
