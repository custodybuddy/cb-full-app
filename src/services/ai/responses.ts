import { parseJsonResponse, extractResponseText } from './parser';
import { AIServiceError } from '@/utils/aiError';

export interface GenerateJsonOptions {
    systemInstruction: string;
    userPrompt: string | string[];
    strictJsonOnly?: boolean;
}

// Placeholder parser wrapper; real network calls removed in skeleton build.
export const generateAndParseJson = async <T>(
    _options: GenerateJsonOptions
): Promise<T> => {
    throw new AIServiceError('network', 'AI generation is disabled in this build.');
};

export const parseJsonFromText = <T>(raw: string): T => parseJsonResponse<T>(raw);
export const extractTextFromResponse = (payload: any): string | null => extractResponseText(payload);
