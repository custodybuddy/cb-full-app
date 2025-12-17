import { AIServiceError } from '@/utils/aiError';

const stripCodeFences = (raw: string): string => {
    const trimmed = raw.trim();
    const fenceMatch = trimmed.match(/^```(?:json)?\n([\s\S]*?)\n```$/i);
    if (fenceMatch) {
        return fenceMatch[1].trim();
    }
    return trimmed;
};

export const parseJsonResponse = <T>(raw: string): T => {
    const cleaned = stripCodeFences(raw);
    try {
        return JSON.parse(cleaned) as T;
    } catch {
        const start = cleaned.indexOf('{');
        const end = cleaned.lastIndexOf('}');
        if (start >= 0 && end > start) {
            try {
                return JSON.parse(cleaned.slice(start, end + 1)) as T;
            } catch {
                // fall through
            }
        }
        throw new AIServiceError('parse', 'Unable to parse JSON response.');
    }
};

export const extractResponseText = (response: any): string | null => {
    if (response && typeof response.output_text === 'string') {
        return response.output_text;
    }
    const output = response?.output;
    if (Array.isArray(output)) {
        for (const item of output) {
            const content = item?.content;
            if (Array.isArray(content)) {
                for (const entry of content) {
                    if (typeof entry?.text === 'string') {
                        return entry.text;
                    }
                }
            }
        }
    }
    return null;
};
