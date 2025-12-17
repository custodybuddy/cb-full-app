import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useEmailBuddyState, useEmailBuddyActions } from './useEmailBuddy';
import AlertTriangleIcon from '@/components/icons/AlertTriangleIcon';
import XIcon from '@/components/icons/XIcon';
import { exampleData } from '@/constants/exampleData';
import { useModal } from '@/hooks/useModal';
import EmailInputForm from './components/EmailInputForm';
import EmailLoadingState from './components/EmailLoadingState';
import GeneratedResponses from './components/GeneratedResponses';

const EmailLawBuddy: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
    const MAX_EMAIL_CHARS = 6000;
    const { 
        receivedEmail,
        response, 
        isLoading, 
        error,
    } = useEmailBuddyState();
    
    const {
        setReceivedEmail, 
        handleGenerateResponses, 
        reset,
        setError,
        showExample
    } = useEmailBuddyActions();

    const { closeModal } = useModal();
    const [isAnalysisPanelOpen, setIsAnalysisPanelOpen] = useState(false);
    const disclaimerText = 'Disclaimer: This document was created using artificial intelligence and is intended to provide helpful information. It is not a source of legal advice. We recommend that you verify the information for accuracy.';

    const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (!isOpen) {
            // Delay reset to allow for modal close animation
            resetTimerRef.current = setTimeout(() => {
                reset();
                setIsAnalysisPanelOpen(false);
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

    const handleVisitLibrary = useCallback(() => {
        closeModal();
    }, [closeModal]);

    const handleShowExample = useCallback(() => {
        showExample(exampleData);
        setIsAnalysisPanelOpen(false);
    }, [showExample]);
    
    const handleStartOver = useCallback(() => {
        reset();
        setIsAnalysisPanelOpen(false);
    }, [reset]);

    const handleEmailChange = (value: string) => {
        if (value.length > MAX_EMAIL_CHARS) {
            setReceivedEmail(value.slice(0, MAX_EMAIL_CHARS));
            setError(`Email truncated to ${MAX_EMAIL_CHARS.toLocaleString()} characters to keep analysis fast.`);
        } else {
            setReceivedEmail(value);
            if (error) setError(null);
        }
    };

    return (
        <div className="min-h-[40vh]">
            {isLoading && <EmailLoadingState />}
            
            {!isLoading && error && (
                 <div className="bg-red-900/20 border border-red-500/50 text-red-400 text-sm rounded-lg p-3 flex items-center gap-3 animate-fade-in-up-fast" role="alert">
                    <AlertTriangleIcon className="w-5 h-5 flex-shrink-0" />
                    <p className="flex-grow">{error}</p>
                    <button onClick={() => setError(null)} className="text-red-400 hover:text-white" aria-label="Dismiss error message"><XIcon className="w-5 h-5" /></button>
                </div>
            )}

            {!isLoading && !error && (
                response ? (
                    <GeneratedResponses
                        response={response}
                        isAnalysisPanelOpen={isAnalysisPanelOpen}
                        setIsAnalysisPanelOpen={setIsAnalysisPanelOpen}
                        onStartOver={handleStartOver}
                        disclaimer={disclaimerText}
                    />
                ) : (
                    <EmailInputForm
                        value={receivedEmail}
                        maxChars={MAX_EMAIL_CHARS}
                        onChange={handleEmailChange}
                        onGenerate={handleGenerateResponses}
                        onShowExample={handleShowExample}
                        onVisitLibrary={handleVisitLibrary}
                        errorMessage={error}
                    />
                )
            )}
        </div>
    );
};

export default EmailLawBuddy;
