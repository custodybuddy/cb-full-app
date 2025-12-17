import React from 'react';
import RotateCwIcon from '@/components/icons/RotateCwIcon';
import AnalysisPanel from './AnalysisPanel';
import DraftDisplay from './DraftDisplay';
import type { EmailBuddyResponse } from '@/types/ai';

interface GeneratedResponsesProps {
    response: EmailBuddyResponse;
    disclaimer: string;
    onReset?: () => void;
    resetDisabled?: boolean;
}

const GeneratedResponses: React.FC<GeneratedResponsesProps> = ({
    response,
    disclaimer,
    onReset,
    resetDisabled = false,
}) => (
    <div className="animate-fade-in-up">
        <div className="sr-only" role="status" aria-live="polite">Email analysis and drafts are ready.</div>
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-200">Generated Responses</h3>
            <button
                className="flex items-center gap-2 text-sm text-amber-400 font-semibold transition-colors"
                disabled={resetDisabled || !onReset}
                type="button"
                onClick={onReset}
            >
                <RotateCwIcon className="w-4 h-4" />
                Start Over
            </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
            <AnalysisPanel
                originalTone={response.originalTone}
                keyDemands={response.keyDemands}
                riskFlags={response.riskFlags}
            />

            <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-slate-900 border border-amber-400/50 rounded-lg p-4 flex flex-col shadow-lg">
                    <DraftDisplay title="BIFF Reply" draft={response.biffReply} />
                </div>

                <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 flex flex-col shadow-lg">
                    <DraftDisplay title="Grey Rock Reply" draft={response.greyRockReply} />
                </div>
            </div>
        </div>
        {response.notesForCourt.length > 0 && (
            <div className="mt-4 rounded-lg border border-slate-700 bg-slate-900/60 p-4">
                <h4 className="text-sm font-semibold text-slate-100 mb-2">
                    Notes for Court
                </h4>
                <ul className="list-disc list-inside space-y-1 text-slate-200 text-sm">
                    {response.notesForCourt.map((note, index) => (
                        <li key={index}>{note}</li>
                    ))}
                </ul>
            </div>
        )}
        <p className="text-xs text-gray-500 italic mt-4">{disclaimer}</p>
    </div>
);

export default GeneratedResponses;
