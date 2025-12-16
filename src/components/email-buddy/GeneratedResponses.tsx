import React from 'react';
import RotateCwIcon from '../icons/RotateCwIcon';
import AnalysisPanel from './AnalysisPanel';
import DraftDisplay from './DraftDisplay';
import AlternativeDraftsPanel from './AlternativeDraftsPanel';
import type { EmailBuddyResponse } from '@/types/ai';

interface GeneratedResponsesProps {
    response: EmailBuddyResponse;
    isAnalysisPanelOpen: boolean;
    setIsAnalysisPanelOpen: (value: boolean) => void;
    onStartOver: () => void;
    disclaimer: string;
}

const GeneratedResponses: React.FC<GeneratedResponsesProps> = ({
    response,
    isAnalysisPanelOpen,
    setIsAnalysisPanelOpen,
    onStartOver,
    disclaimer,
}) => (
    <div className="animate-fade-in-up">
        <div className="sr-only" role="status" aria-live="polite">Email analysis and drafts are ready.</div>
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-200">Generated Responses</h3>
            <button
                onClick={onStartOver}
                className="flex items-center gap-2 text-sm text-amber-400 hover:text-amber-300 font-semibold transition-colors"
            >
                <RotateCwIcon className="w-4 h-4" />
                Start Over
            </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
            <AnalysisPanel 
                analysis={response.analysis}
                isOpen={isAnalysisPanelOpen}
                setIsOpen={setIsAnalysisPanelOpen}
            />

            <div className="flex-grow grid grid-cols-1 xl:grid-cols-2 gap-4">
                <div className="bg-slate-900 border border-amber-400/50 rounded-lg p-4 flex flex-col shadow-lg">
                   <DraftDisplay
                       title="Primary Recommendation: BIFF"
                       draft={response.drafts.biff}
                   />
                </div>

                <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 flex flex-col">
                    <AlternativeDraftsPanel drafts={{
                        "Grey Rock": response.drafts.greyRock,
                        "Friendly Assertive": response.drafts.friendlyAssertive
                    }}/>
                </div>
            </div>
        </div>
        <p className="text-xs text-gray-500 italic mt-4">{disclaimer}</p>
    </div>
);

export default GeneratedResponses;
