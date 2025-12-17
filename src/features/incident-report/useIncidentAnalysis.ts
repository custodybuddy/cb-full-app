import { useState, useCallback } from 'react';
import { analyzeIncident, CustodyAIResponse } from '@/services/llmService';

type IncidentFormInput = {
    date: string;
    time?: string;
    location?: string;
    parties?: string;
    narrative: string;
    jurisdiction: string;
};

export function useIncidentAnalysis() {
    const [result, setResult] = useState<CustodyAIResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const runAnalysis = useCallback(async (input: IncidentFormInput) => {
        setLoading(true);
        setError(null);
        setResult(null);

        const mergedNarrative = `
Date: ${input.date}${input.time ? ` ${input.time}` : ''}
Location: ${input.location || 'N/A'}
Parties: ${input.parties || 'N/A'}

Incident narrative:
${input.narrative}
        `.trim();

        try {
            const aiResult = await analyzeIncident(
                mergedNarrative,
                input.jurisdiction
            );
            setResult(aiResult);
            return aiResult;
        } catch (err) {
            const message =
                err instanceof Error
                    ? err.message
                    : 'Incident analysis failed. Please try again.';
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

    return { runAnalysis, result, loading, error, reset };
}
