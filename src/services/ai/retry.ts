import { AIServiceError } from '@/utils/aiError';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const shouldRetryAIError = (error: AIServiceError): boolean => {
    return ['rate_limit', 'service_unavailable', 'network'].includes(error.code);
};

export interface BackoffOptions {
    maxAttempts?: number;
    initialDelayMs?: number;
    factor?: number;
}

export const withExponentialBackoff = async <T>(
    fn: () => Promise<T>,
    options: BackoffOptions = {}
): Promise<T> => {
    const {
        maxAttempts = 3,
        initialDelayMs = 300,
        factor = 2,
    } = options;

    let attempt = 0;
    let delay = initialDelayMs;

    while (true) {
        try {
            return await fn();
        } catch (err) {
            const aiError = err instanceof AIServiceError ? err : null;
            attempt += 1;
            if (!aiError || attempt >= maxAttempts || !shouldRetryAIError(aiError)) {
                throw err;
            }
            await sleep(delay);
            delay *= factor;
        }
    }
};
