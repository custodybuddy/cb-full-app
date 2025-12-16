import { callAIProxy } from './client';
import { resolveModel } from './env';
import { buildPromptInput, extractResponseText, parseJsonResponse, ResponseLike } from './parser';
import { normalizeAIError } from './errors';
import { AIServiceError } from '@/utils/aiError';
import { withExponentialBackoff } from './retry';

type GenerateOptions = {
    systemInstruction: string;
    userPrompt: string | string[];
    strictJsonOnly?: boolean;
};

const JSON_ONLY_INSTRUCTION = 'Return ONLY valid JSON matching the requested shape.';
const JSON_ONLY_STRICT = 'Return ONLY valid JSON. Do not include markdown, code fences, prose, or explanations.';

export const generateAndParseJson = async <T>({
    systemInstruction,
    userPrompt,
    strictJsonOnly,
}: GenerateOptions): Promise<T> => {
    try {
        const prompt = buildPromptInput(userPrompt);
        if (!prompt) {
            throw new AIServiceError('validation', 'Prompt is empty after cleaning.');
        }
        const instructions = `${systemInstruction}\n\n${strictJsonOnly ? JSON_ONLY_STRICT : JSON_ONLY_INSTRUCTION}`;

        const response = await withExponentialBackoff(() =>
            callAIProxy({
                model: resolveModel(),
                input: prompt,
                instructions,
            })
        );

        const outputText = extractResponseText(response as ResponseLike);
        const jsonStr = typeof outputText === 'string' ? outputText.trim() : '';
        if (!jsonStr) {
            throw new Error('AI returned an empty response.');
        }

        return parseJsonResponse<T>(jsonStr);

    } catch (error: any) {
        throw normalizeAIError(error);
    }
};
