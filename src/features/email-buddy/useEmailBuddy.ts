import { useState, useCallback } from 'react';
import { analyzeEmailBuddy, EmailBuddyResponse } from '@/services/llmService';

type EmailBuddyInput = {
    rawEmail: string;
    jurisdiction: string;
};

export function useEmailBuddy() {
    const [result, setResult] = useState<EmailBuddyResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const analyze = useCallback(async (input: EmailBuddyInput) => {
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const data = await analyzeEmailBuddy(input);
            setResult(data);
            return data;
        } catch (err) {
            const msg = err instanceof Error ? err.message : 'Email analysis failed.';
            setError(msg);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    const reset = useCallback(() => {
        setResult(null);
        setError(null);
    }, []);

    return { analyze, result, loading, error, reset };
}
