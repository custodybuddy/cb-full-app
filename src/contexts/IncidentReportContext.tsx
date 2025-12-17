import React, { createContext, useState, useCallback, ReactNode, useMemo } from 'react';
import { IncidentReport, IncidentData, IncidentCategory } from '../types/ai';

export type { IncidentReport, IncidentData, IncidentCategory };

// --- State and Actions Types ---
export interface IncidentReportState {
    incidentData: IncidentData;
    isLoading: boolean;
    error: string | null;
    reportResponse: IncidentReport | null;
}

export interface IncidentReportActions {
    setIncidentData: React.Dispatch<React.SetStateAction<IncidentData>>;
    setError: React.Dispatch<React.SetStateAction<string | null>>;
    handleGenerateReport: () => Promise<void>;
    reset: () => void;
}

// --- Initial State ---
export const initialIncidentData: IncidentData = {
    narrative: '',
    jurisdiction: '',
    incidentDate: '',
    otherPartiesInvolved: [],
    childrenPresent: [],
    location: '',
};

// --- Context Definitions ---
export const IncidentReportStateContext = createContext<IncidentReportState | undefined>(undefined);
export const IncidentReportActionsContext = createContext<IncidentReportActions | undefined>(undefined);

// --- Provider Component ---
export const IncidentReportProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [incidentData, setIncidentData] = useState<IncidentData>(initialIncidentData);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [reportResponse, setReportResponse] = useState<IncidentReport | null>(null);

    const handleGenerateReport = useCallback(async () => {
        setError(null);
        setReportResponse(null);
    }, []);

    const reset = useCallback(() => {
        setIncidentData(initialIncidentData);
        setIsLoading(false);
        setError(null);
        setReportResponse(null);
    }, []);
    
    const state = useMemo(() => ({
        incidentData,
        isLoading,
        error,
        reportResponse,
    }), [incidentData, isLoading, error, reportResponse]);

    const actions = useMemo(() => ({
        setIncidentData,
        setError,
        handleGenerateReport,
        reset,
    }), [setIncidentData, setError, handleGenerateReport, reset]);

    return (
        <IncidentReportStateContext.Provider value={state}>
            <IncidentReportActionsContext.Provider value={actions}>
                {children}
            </IncidentReportActionsContext.Provider>
        </IncidentReportStateContext.Provider>
    );
};
