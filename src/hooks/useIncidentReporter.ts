import { useState, useCallback } from 'react';
import { analyzeIncident, CustodyAIResponse } from '@/services/llmService';

export function useIncidentReporter() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<CustodyAIResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    const analyzeIncident = useCallback(
        async (input: {
            narrative: string;
            date: string;
            location: string;
            jurisdiction: string;
        }): Promise<CustodyAIResponse | null> => {
            setLoading(true);
            setError(null);

            try {
                const enrichedNarrative = [
                    `Date: ${input.date}`,
                    `Location: ${input.location}`,
                    `Incident: ${input.narrative}`,
                ].join('\n');
                const response = await analyzeIncident(
                    enrichedNarrative,
                    input.jurisdiction
                );

                setResult(response);
                return response;
            } catch (err) {
                const message = err instanceof Error ? err.message : 'Analysis failed';
                setError(message);
                return null;
            } finally {
                setLoading(false);
            }
        },
        []
    );

    return {
        analyzeIncident,
        loading,
        result,
        error,
        reset: () => setResult(null),
    };
}
