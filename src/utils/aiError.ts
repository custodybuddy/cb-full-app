export type AIErrorCode =
    | 'missing_api_key'
    | 'auth'
    | 'quota'
    | 'rate_limit'
    | 'parse'
    | 'service_unavailable'
    | 'network'
    | 'validation'
    | 'unknown';

export class AIServiceError extends Error {
    code: AIErrorCode;
    status?: number;

    constructor(code: AIErrorCode, message: string, status?: number) {
        super(message);
        this.code = code;
        this.status = status;
    }
}

export const isAIServiceError = (error: unknown): error is AIServiceError => error instanceof AIServiceError;

