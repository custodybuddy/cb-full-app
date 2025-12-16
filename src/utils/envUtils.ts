const readEnv = (key: string): string | undefined => {
    // Prefer Vite-style import.meta.env during build/runtime
    const metaEnv = (typeof import.meta !== 'undefined' && (import.meta as any).env?.[key]) as string | undefined;
    if (metaEnv) return metaEnv;
    // Fallback to process.env for tests or alternative runtimes
    if (typeof process !== 'undefined' && process.env) {
        return process.env[key];
    }
    return undefined;
};

export const readOpenAIKey = (): string | null => {
    return (
        readEnv('VITE_OPENAI_API_KEY') ||
        readEnv('OPENAI_API_KEY') ||
        readEnv('API_KEY') ||
        null
    );
};

export const readOpenAIModel = (): string => {
    return (
        readEnv('VITE_OPENAI_MODEL') ||
        readEnv('OPENAI_MODEL') ||
        'gpt-4o-mini-2024-07-18'
    );
};

export const readAIProxyUrl = (): string | null => {
    return (
        readEnv('VITE_AI_PROXY_URL') ||
        readEnv('AI_PROXY_URL') ||
        null
    );
};

export const isOpenAIConfigured = (): boolean => Boolean(readAIProxyUrl() || readOpenAIKey());
