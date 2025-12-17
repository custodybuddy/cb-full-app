export type AIServiceErrorCode =
    | 'network'
    | 'timeout'
    | 'parse'
    | 'validation'
    | 'server'
    | 'rate_limit'
    | 'unknown'
    | string;

export class AIServiceError extends Error {
    code: AIServiceErrorCode;

    constructor(code: AIServiceErrorCode, message?: string) {
        super(message ?? 'AI service error.');
        this.name = 'AIServiceError';
        this.code = code;
    }
}
