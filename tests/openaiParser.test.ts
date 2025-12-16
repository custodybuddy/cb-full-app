import { describe, it, expect, vi } from 'vitest';
import { parseJsonResponse, extractResponseText } from '../src/services/ai/parser';
import { withExponentialBackoff } from '../src/services/ai/retry';
import { AIServiceError } from '../src/utils/aiError';

describe('parseJsonResponse', () => {
    it('strips code fences and parses JSON', () => {
        const raw = '```json\n{ "hello": "world" }\n```';
        expect(parseJsonResponse<{ hello: string }>(raw)).toEqual({ hello: 'world' });
    });

    it('recovers JSON slice from wrapped text', () => {
        const raw = 'Some preface { "value": 42 } trailing notes';
        expect(parseJsonResponse<{ value: number }>(raw)).toEqual({ value: 42 });
    });
});

describe('withExponentialBackoff', () => {
    it('retries on retryable AIServiceError codes', async () => {
        const fn = vi.fn()
            .mockRejectedValueOnce(new AIServiceError('network', 'temp'))
            .mockResolvedValue('ok');

        const result = await withExponentialBackoff(fn, { initialDelayMs: 1, maxAttempts: 2 });
        expect(result).toBe('ok');
        expect(fn).toHaveBeenCalledTimes(2);
    });

    it('does not retry on non-retryable errors', async () => {
        const fn = vi.fn().mockRejectedValue(new AIServiceError('validation', 'no'));
        await expect(withExponentialBackoff(fn, { initialDelayMs: 1, maxAttempts: 2 })).rejects.toBeInstanceOf(AIServiceError);
        expect(fn).toHaveBeenCalledTimes(1);
    });
});

describe('extractResponseText', () => {
    it('prefers output_text when present', () => {
        expect(extractResponseText({ output_text: 'hello' })).toBe('hello');
    });

    it('falls back to nested content array', () => {
        expect(extractResponseText({ output: [{ content: [{ text: 'nested' }] }] })).toBe('nested');
    });
});
