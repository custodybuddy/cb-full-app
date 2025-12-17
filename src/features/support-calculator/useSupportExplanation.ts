import { useState, useCallback } from 'react';
import { explainSupportResult, SupportExplanationResponse } from '@/services/llmService';

type SupportExplanationInput = {
    jurisdiction: string;
    calculatedAmount: number;
    inputsSummary: string;
};

export function useSupportExplanation() {
    const [result, setResult] = useState<SupportExplanationResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const explain = useCallback(async (input: SupportExplanationInput) => {
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const data = await explainSupportResult(input);
            setResult(data);
            return data;
        } catch (err) {
            const msg = err instanceof Error ? err.message : 'Could not generate explanation.';
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

    return { explain, result, loading, error, reset };
}
