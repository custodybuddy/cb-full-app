import React, { useEffect, useRef } from 'react';
import { useCaseAnalysisState, useCaseAnalysisActions } from '@/features/case-analysis/useCaseAnalysis';
import FileManagement from './components/FileManagement';
import AnalysisResult from './components/AnalysisResult';
import AlertTriangleIcon from '@/components/icons/AlertTriangleIcon';
import XIcon from '@/components/icons/XIcon';
import Button from '@/components/ui/Button';
import Alert from '@/components/ui/Alert';
import FormRow from '@/components/ui/FormRow';

const CaseAnalysisTool: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
    const MAX_PASTED_CHARS = 8000;
    const {
        files,
        pastedText,
        jurisdiction,
        isLoading,
        error,
        analysisResponse,
    } = useCaseAnalysisState();

    const {
        setPastedText,
        setJurisdiction,
        handleAnalysis,
        reset,
        setError
    } = useCaseAnalysisActions();
    const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Reset state when the modal is closed, but cancel if it reopens quickly
    useEffect(() => {
        if (!isOpen) {
            resetTimerRef.current = setTimeout(() => {
                reset();
                resetTimerRef.current = null;
            }, 300);
        } else if (resetTimerRef.current) {
            clearTimeout(resetTimerRef.current);
            resetTimerRef.current = null;
        }

        return () => {
            if (resetTimerRef.current) {
                clearTimeout(resetTimerRef.current);
                resetTimerRef.current = null;
            }
        };
    }, [isOpen, reset]);

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        if (value.length > MAX_PASTED_CHARS) {
            setPastedText(value.slice(0, MAX_PASTED_CHARS));
            setError(`Pasted text truncated to ${MAX_PASTED_CHARS} characters to keep processing fast.`);
            return;
        }
        setPastedText(value);
    };
    
    const handleJurisdictionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setJurisdiction(e.target.value);
    };

    const isAnalyzeButtonDisabled = isLoading || (files.length === 0 && !pastedText.trim()) || !jurisdiction.trim();

    return (
        <div className="space-y-6">
            <p className="text-gray-400 text-sm">
                Upload court orders, separation agreements, or difficult emails. Our AI will analyze them, identify key obligations, flag potential conflicts, and suggest next steps. All uploaded files are processed securely and are not stored.
            </p>

            {!analysisResponse && (
                <>
                    <FileManagement />

                    <FormRow
                        label="Or paste text here:"
                        htmlFor="pasted-text"
                        description={`Up to ${MAX_PASTED_CHARS.toLocaleString()} characters.`}
                    >
                        <textarea
                            id="pasted-text"
                            value={pastedText}
                            onChange={handleTextChange}
                            placeholder="Paste email content or legal text here..."
                            className="w-full h-32 p-3 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none transition-shadow duration-200 disabled:opacity-50"
                            disabled={isLoading}
                            maxLength={MAX_PASTED_CHARS}
                            aria-describedby="pasted-text-help"
                        />
                    </FormRow>
                    
                    <FormRow
                        label="Jurisdiction (Province/State)"
                        htmlFor="jurisdiction-case"
                        required
                    >
                        <input
                            type="text"
                            id="jurisdiction-case"
                            name="jurisdiction"
                            value={jurisdiction}
                            onChange={handleJurisdictionChange}
                            placeholder="e.g., Ontario, Canada"
                            className="w-full p-2 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none"
                            disabled={isLoading}
                            required
                        />
                    </FormRow>
                    
                    {error && (
                        <Alert
                            variant="error"
                            className="animate-fade-in-up-fast"
                            icon={<AlertTriangleIcon className="w-5 h-5 flex-shrink-0" />}
                        >
                            <div className="flex items-center gap-3 w-full">
                                <p className="flex-grow">{error}</p>
                                <button onClick={() => setError(null)} className="text-red-200 hover:text-white" aria-label="Dismiss error message"><XIcon className="w-5 h-5" /></button>
                            </div>
                        </Alert>
                    )}

                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-4 border-t border-slate-700">
                        <Button
                            onClick={reset}
                            disabled={isLoading}
                            variant="ghost"
                            className="flex items-center gap-2 text-sm"
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74"/><path d="M3 4v5h5"/></svg>
                            Start Over
                        </Button>
                        <Button
                            onClick={handleAnalysis}
                            disabled={isAnalyzeButtonDisabled}
                            fullWidth
                            className="w-full sm:w-auto"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                    Analyzing...
                                </>
                            ) : 'Analyze Documents'}
                        </Button>
                    </div>
                </>
            )}

            {isLoading && !analysisResponse && (
                <div className="text-center p-4 text-gray-400" role="status" aria-live="polite">
                    <p className="font-semibold text-amber-400">AI is analyzing your documents...</p>
                    <p className="text-sm">This may take a moment, especially for large or multiple files.</p>
                </div>
            )}
            
            {analysisResponse && (
                <>
                    <div className="sr-only" role="status" aria-live="polite">Document analysis ready.</div>
                    <AnalysisResult />
                </>
            )}
        </div>
    );
};

export default CaseAnalysisTool;
