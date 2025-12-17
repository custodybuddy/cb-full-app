import { useState, useCallback } from 'react';
import { analyzeEmail, EmailBuddyResponse } from '@/services/llmService';

export function useEmailAnalysis() {
    const [result, setResult] = useState<EmailBuddyResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const analyze = useCallback(async (emailText: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await analyzeEmail(emailText);
            setResult(response);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Analysis failed');
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
