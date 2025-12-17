import { AIServiceError } from '@/utils/aiError';

export interface RetryOptions {
    initialDelayMs?: number;
    maxAttempts?: number;
    maxDelayMs?: number;
}

const isRetryable = (error: unknown): boolean => {
    if (!(error instanceof AIServiceError)) return false;
    return ['network', 'timeout', 'parse', 'server', 'rate_limit'].includes(error.code);
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const withExponentialBackoff = async <T>(
    fn: () => Promise<T>,
    { initialDelayMs = 500, maxAttempts = 3, maxDelayMs = 4000 }: RetryOptions = {}
): Promise<T> => {
    let attempt = 0;
    let delayMs = initialDelayMs;

    while (attempt < maxAttempts) {
        try {
            return await fn();
        } catch (error) {
            attempt += 1;
            if (!isRetryable(error) || attempt >= maxAttempts) {
                throw error;
            }
            await delay(delayMs);
            delayMs = Math.min(delayMs * 2, maxDelayMs);
        }
    }

    throw new AIServiceError('unknown', 'Retry attempts exhausted.');
};
