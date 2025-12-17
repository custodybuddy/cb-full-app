import React from 'react';
import LightbulbIcon from '@/components/icons/LightbulbIcon';
import StrategicCommunication from './StrategicCommunication';
import type { CaseAnalysisReport } from '@/types/ai';

interface SummaryPanelProps {
    summary: string;
    suggestedNextSteps?: string | null;
    strategicCommunication?: CaseAnalysisReport['strategicCommunication'];
    strategicDraftEmail: string;
    isStrategicEmailEditing: boolean;
    isCopied: boolean;
    onToggleEdit: () => void;
    onCopy: () => void;
    onDraftChange: (value: string) => void;
}

const SummaryPanel: React.FC<SummaryPanelProps> = ({
    summary,
    suggestedNextSteps,
    strategicCommunication,
    strategicDraftEmail,
    isStrategicEmailEditing,
    isCopied,
    onToggleEdit,
    onCopy,
    onDraftChange,
}) => {
    return (
        <div className="space-y-8">
            <div>
                <h4 className="text-xl font-bold text-gray-200">Summary</h4>
                <p className="text-gray-300 leading-relaxed break-words whitespace-pre-wrap">
                    {summary}
                </p>
            </div>
            {suggestedNextSteps && (
                <div>
                    <h4 className="text-xl font-bold text-gray-200 mb-3 flex items-center gap-2">
                        <LightbulbIcon className="w-5 h-5 text-amber-400" />
                        Suggested Next Steps
                    </h4>
                    <p className="text-gray-300 leading-relaxed break-words whitespace-pre-wrap">
                        {suggestedNextSteps}
                    </p>
                </div>
            )}
            {strategicCommunication && (
                <StrategicCommunication
                    recommendation={strategicCommunication.recommendation}
                    draftEmail={strategicDraftEmail}
                    isEditing={isStrategicEmailEditing}
                    isCopied={isCopied}
                    onToggleEdit={onToggleEdit}
                    onCopy={onCopy}
                    onDraftChange={onDraftChange}
                />
            )}
        </div>
    );
};

export default SummaryPanel;
