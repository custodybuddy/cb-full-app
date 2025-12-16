import React, { createContext, useState, useCallback, ReactNode, useMemo } from 'react';
import { draftFalseAllegationResponse } from '../services/ai/falseAllegationService';
import { getFriendlyErrorMessage } from '../utils/errorUtils';
import { FalseAllegationResponse } from '../types/ai';
import { v4 as uuidv4 } from 'uuid'; // For unique IDs

export interface AllegationItem {
    id: string; // Unique ID for each allegation
    text: string;
    category: string;
    otherCategoryText?: string; // For 'Other' category manual entry
    evidence: string; // Evidence specific to this allegation
}

// State and Context Shape
export interface FalseAllegationState {
    allegations: AllegationItem[];
    // Removed global 'evidence' field
    response: FalseAllegationResponse | null;
    isLoading: boolean;
    error: string | null;
}

export interface FalseAllegationActions {
    setAllegations: (allegations: AllegationItem[]) => void;
    addAllegation: (text: string) => void;
    removeAllegation: (id: string) => void;
    updateAllegationCategory: (id: string, category: string, otherText?: string) => void;
    updateAllegationEvidence: (id: string, evidence: string) => void; // New action
    // Removed global 'setEvidence' action
    setError: (error: string | null) => void;
    handleDraftResponse: () => Promise<void>;
    reset: () => void;
}

// Initial State
const initialState: FalseAllegationState = {
    allegations: [],
    // Removed global 'evidence' field
    response: null,
    isLoading: false,
    error: null,
};

// Create Contexts
export const FalseAllegationStateContext = createContext<FalseAllegationState | undefined>(undefined);
export const FalseAllegationActionsContext = createContext<FalseAllegationActions | undefined>(undefined);

// Provider Component
export const FalseAllegationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, setState] = useState<FalseAllegationState>(initialState);

    const setAllegations = useCallback((allegations: AllegationItem[]) => {
        setState(s => ({ ...s, allegations }));
    }, []);

    const addAllegation = useCallback((text: string) => {
        const newAllegation: AllegationItem = {
            id: uuidv4(),
            text,
            category: '', // Default to empty category
            evidence: '', // Initialize evidence for this allegation
        };
        setState(s => ({ ...s, allegations: [...s.allegations, newAllegation] }));
    }, []);

    const removeAllegation = useCallback((id: string) => {
        setState(s => ({
            ...s,
            allegations: s.allegations.filter(allegation => allegation.id !== id),
        }));
    }, []);

    const updateAllegationCategory = useCallback((id: string, category: string, otherText?: string) => {
        setState(s => ({
            ...s,
            allegations: s.allegations.map(allegation =>
                allegation.id === id
                    ? { ...allegation, category, otherCategoryText: otherText }
                    : allegation
            ),
        }));
    }, []);

    const updateAllegationEvidence = useCallback((id: string, evidence: string) => {
        setState(s => ({
            ...s,
            allegations: s.allegations.map(allegation =>
                allegation.id === id
                    ? { ...allegation, evidence }
                    : allegation
            ),
        }));
    }, []);

    // Removed setEvidence global action
    const setError = useCallback((error: string | null) => {
        setState(s => ({ ...s, error }));
    }, []);

    const handleDraftResponse = useCallback(async () => {
        if (state.allegations.length === 0) {
            setError('Please provide at least one allegation to get started.');
            return;
        }

        // Ensure all allegations have a category and evidence
        const incompleteAllegations = state.allegations.filter(a => !a.category || !a.evidence.trim());
        if (incompleteAllegations.length > 0) {
            setError('Please ensure all allegations have a category and associated evidence before proceeding.');
            return;
        }

        setState(s => ({ ...s, isLoading: true, error: null, response: null }));
        try {
            // Pass allegations array directly to the service
            const result = await draftFalseAllegationResponse(state.allegations); // Removed global evidence
            setState(s => ({ ...s, response: result, isLoading: false }));
        } catch (err: unknown) {
            setState(s => ({ ...s, error: getFriendlyErrorMessage(err, 'false allegation response drafting'), isLoading: false }));
        }
    }, [state.allegations]); // Dependencies for state values

    const reset = useCallback(() => setState(initialState), []);

    const actions = useMemo(() => ({
        setAllegations,
        addAllegation,
        removeAllegation,
        updateAllegationCategory,
        updateAllegationEvidence, // New action
        // Removed setEvidence
        setError,
        handleDraftResponse,
        reset,
    }), [setAllegations, addAllegation, removeAllegation, updateAllegationCategory, updateAllegationEvidence, setError, handleDraftResponse, reset]);

    return (
        <FalseAllegationStateContext.Provider value={state}>
            <FalseAllegationActionsContext.Provider value={actions}>
                {children}
            </FalseAllegationActionsContext.Provider>
        </FalseAllegationStateContext.Provider>
    );
};
