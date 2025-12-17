import React, { createContext, useState, useCallback, ReactNode, useMemo } from 'react';
import { CaseAnalysisReport } from '../types/ai';

// Re-export type for convenience
export type { CaseAnalysisReport };

// --- State and Actions Types ---
export interface CaseAnalysisState {
    files: File[];
    pastedText: string;
    jurisdiction: string;
    isLoading: boolean;
    error: string | null;
    analysisResponse: CaseAnalysisReport | null;
}

export interface CaseAnalysisActions {
    setFiles: React.Dispatch<React.SetStateAction<File[]>>;
    setPastedText: React.Dispatch<React.SetStateAction<string>>;
    setJurisdiction: React.Dispatch<React.SetStateAction<string>>;
    setError: React.Dispatch<React.SetStateAction<string | null>>;
    handleAnalysis: () => Promise<void>;
    reset: () => void;
}

// --- Context Definitions ---
export const CaseAnalysisStateContext = createContext<CaseAnalysisState | undefined>(undefined);
export const CaseAnalysisActionsContext = createContext<CaseAnalysisActions | undefined>(undefined);

// --- Provider Component ---
export const CaseAnalysisProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [files, setFiles] = useState<File[]>([]);
    const [pastedText, setPastedText] = useState('');
    const [jurisdiction, setJurisdiction] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [analysisResponse, setAnalysisResponse] = useState<CaseAnalysisReport | null>(null);

    const handleAnalysis = useCallback(async () => {
        setError(null);
        setAnalysisResponse(null);
    }, []);

    const reset = useCallback(() => {
        setFiles([]);
        setPastedText('');
        setJurisdiction('');
        setError(null);
        setAnalysisResponse(null);
        setIsLoading(false);
    }, []);

    const actions = useMemo(() => ({
        setFiles,
        setPastedText,
        setJurisdiction,
        setError,
        handleAnalysis,
        reset,
    }), [handleAnalysis, reset]);

    const state = useMemo(() => ({
        files,
        pastedText,
        jurisdiction,
        isLoading,
        error,
        analysisResponse,
    }), [files, pastedText, jurisdiction, isLoading, error, analysisResponse]);

    return (
        <CaseAnalysisStateContext.Provider value={state}>
            <CaseAnalysisActionsContext.Provider value={actions}>
                {children}
            </CaseAnalysisActionsContext.Provider>
        </CaseAnalysisStateContext.Provider>
    );
};
