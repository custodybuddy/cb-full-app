import { AIServiceError } from '@/utils/aiError';

export type ResponseContent = { text?: string | null } | null | undefined;
export type ResponseItem = { content?: ResponseContent[] | null } | null | undefined;
export type ResponseLike = { output_text?: string | null; output?: ResponseItem[] | null };

export const buildPromptInput = (userPrompt: string | string[]): string => {
    const segments = Array.isArray(userPrompt) ? userPrompt : [userPrompt];
    const filtered = segments
        .map(part => (part ?? '').toString().trim())
        .filter(Boolean);
    return filtered.join('\n\n').trim();
};

export const extractResponseText = (response: ResponseLike): string | null => {
    if (response.output_text && typeof response.output_text === 'string') {
        return response.output_text;
    }

    const outputs = Array.isArray(response.output) ? response.output : [];
    for (const item of outputs) {
        const contents = Array.isArray(item?.content) ? item.content : [];
        for (const content of contents) {
            if (typeof (content as any)?.text === 'string') {
                return (content as any).text as string;
            }
            const textArray = Array.isArray((content as any)?.text) ? (content as any).text : null;
            if (textArray) {
                const merged = textArray
                    .map((t: any) => (typeof t?.text === 'string' ? t.text : ''))
                    .filter(Boolean)
                    .join(' ')
                    .trim();
                if (merged) return merged;
            }
        }
    }
    return null;
};

export const parseJsonResponse = <T>(raw: string): T => {
    const cleaned = raw
        .replace(/```json/gi, '')
        .replace(/```/g, '')
        .trim();

    const tryParse = (text: string) => JSON.parse(text) as T;

    try {
        return tryParse(cleaned);
    } catch {
        const start = cleaned.indexOf('{');
        const end = cleaned.lastIndexOf('}');
        if (start !== -1 && end !== -1 && end > start) {
            const slice = cleaned.slice(start, end + 1);
            try {
                return tryParse(slice);
            } catch {
                throw new AIServiceError('parse', 'AI returned invalid JSON.');
            }
        }
        throw new AIServiceError('parse', 'AI returned invalid JSON.');
    }
};
