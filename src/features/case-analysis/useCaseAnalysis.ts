import { useState, useCallback } from 'react';
import { analyzeCaseDocuments, CaseAnalysisResponse } from '@/services/llmService';

export type CaseAnalysisInput = {
    jurisdiction: string;
    mainText: string;
    secondaryText?: string;
};

export function useCaseAnalysis() {
    const [result, setResult] = useState<CaseAnalysisResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const analyze = useCallback(async (input: CaseAnalysisInput) => {
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const data = await analyzeCaseDocuments(input);
            setResult(data);
            return data;
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Case analysis failed.';
            setError(message);
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
