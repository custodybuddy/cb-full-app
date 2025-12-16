import { isAIServiceError } from './aiError';

/**
 * Returns a user-friendly error message based on an error from an API call or browser action.
 * This function inspects the error type and message for keywords to provide more specific
 * and actionable feedback to the user, while also logging detailed info for developers.
 * @param error - The error object caught from a try/catch block.
 * @param context - A string describing the action that failed (e.g., "document analysis").
 * @returns A user-friendly error string.
 */
export const getFriendlyErrorMessage = (error: unknown, context: string): string => {
    const defaultMessage = `An unexpected error occurred during ${context}. Please try again later. If the problem persists, please contact support.`;

    if (isAIServiceError(error)) {
        switch (error.code) {
            case 'missing_api_key':
                return 'The AI service is not configured. Please set the OpenAI API key and reload.';
            case 'auth':
                return 'Authentication error with the AI service. Please verify the API key.';
            case 'quota':
                return 'Quota exceeded for the AI service. Please try again later.';
            case 'rate_limit':
                return 'Too many requests to the AI service. Please wait a moment and try again.';
            case 'parse':
                return 'AI returned an invalid response. Please retry.';
            case 'service_unavailable':
                return 'The AI service is temporarily unavailable. Please try again later.';
            case 'network':
                return 'Network error. Please check your connection and try again.';
            case 'validation':
                return error.message || defaultMessage;
            case 'unknown':
            default:
                return error.message || defaultMessage;
        }
    }

    if (error instanceof Error) {
        const message = error.message.toLowerCase();
        if (message.includes('fetch') || error.name === 'TypeError') {
            return 'Network Error: Please check your internet connection and try again.';
        }
        return `An error occurred: ${error.message}. Please try again.`;
    }

    if (typeof error === 'string') {
        return `An error occurred: ${error}. Please try again.`;
    }

    return defaultMessage;
};
