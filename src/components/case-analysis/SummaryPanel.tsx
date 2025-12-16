import React from 'react';
import LightbulbIcon from '../icons/LightbulbIcon';
import { sanitizeMarkdownHtml, linkifyLegislation } from '../../utils/stringUtils';
import { formatMarkdown } from '../../utils/markdownParser';
import { hyperlinkText } from '../../utils/linkUtils';
import StrategicCommunication from './StrategicCommunication';
import type { CaseAnalysisReport } from '@/types/ai';

interface SummaryPanelProps {
    summary: string;
    suggestedNextSteps?: string | null;
    strategicCommunication?: CaseAnalysisReport['strategicCommunication'];
    jurisdiction: string;
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
    jurisdiction,
    strategicDraftEmail,
    isStrategicEmailEditing,
    isCopied,
    onToggleEdit,
    onCopy,
    onDraftChange,
}) => {
    const linkifiedNextSteps = suggestedNextSteps
        ? hyperlinkText(linkifyLegislation(suggestedNextSteps, jurisdiction))
        : '';

    return (
        <div className="space-y-8">
            <div>
                <h4 className="text-xl font-bold text-gray-200">Summary</h4>
                <div
                    className="text-gray-300 leading-relaxed break-words"
                    dangerouslySetInnerHTML={{
                        __html: sanitizeMarkdownHtml(
                            hyperlinkText(formatMarkdown(linkifyLegislation(summary, jurisdiction)))
                        ),
                    }}
                />
            </div>
            {suggestedNextSteps && (
                <div>
                    <h4 className="text-xl font-bold text-gray-200 mb-3 flex items-center gap-2">
                        <LightbulbIcon className="w-5 h-5 text-amber-400" />
                        Suggested Next Steps
                    </h4>
                    <div
                        className="text-gray-300 leading-relaxed break-words"
                        dangerouslySetInnerHTML={{
                            __html: sanitizeMarkdownHtml(formatMarkdown(linkifiedNextSteps)),
                        }}
                    />
                </div>
            )}
            {strategicCommunication && (
                <StrategicCommunication
                    recommendation={strategicCommunication.recommendation}
                    jurisdiction={jurisdiction}
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
