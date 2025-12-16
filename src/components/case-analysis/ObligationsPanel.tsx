import React from 'react';
import { sanitizeMarkdownHtml, linkifyLegislation } from '../../utils/stringUtils';
import { hyperlinkText } from '../../utils/linkUtils';
import ActionItemsList from './ActionItemsList';
import type { CaseAnalysisReport } from '@/types/ai';

interface ActionItemState {
    item: string;
    deadline?: string;
    source: string;
    completed: boolean;
    isDeleting: boolean;
}

interface ObligationsPanelProps {
    keyClauses: CaseAnalysisReport['keyClauses'];
    actionItems: ActionItemState[];
    jurisdiction: string;
    onToggleComplete: (index: number) => void;
    onDelete: (index: number) => void;
}

const ObligationsPanel: React.FC<ObligationsPanelProps> = ({
    keyClauses = [],
    actionItems,
    jurisdiction,
    onToggleComplete,
    onDelete,
}) => {
    if (!keyClauses.length && !actionItems.length) return null;

    return (
        <div className="space-y-8">
            {keyClauses.length > 0 && (
                <div>
                    <h4 className="text-xl font-bold text-gray-200 mb-3">Key Clauses & Obligations</h4>
                    <div className="space-y-4">
                        {keyClauses.map((item, i) => (
                            <div key={i} className="p-3 bg-slate-800 rounded-md border border-slate-700 not-prose">
                                <blockquote className="text-gray-300 font-semibold italic border-l-4 border-amber-400 pl-4">"{item.clause}"</blockquote>
                                <p
                                    className="text-gray-400 mt-2 text-sm"
                                    dangerouslySetInnerHTML={{
                                        __html: sanitizeMarkdownHtml(
                                            hyperlinkText(linkifyLegislation(item.explanation, jurisdiction))
                                        ),
                                    }}
                                />
                                <p className="text-xs text-amber-400/80 mt-2">Source: {item.source}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {actionItems.length > 0 && (
                <ActionItemsList
                    items={actionItems}
                    jurisdiction={jurisdiction}
                    onToggleComplete={onToggleComplete}
                    onDelete={onDelete}
                />
            )}
        </div>
    );
};

export default ObligationsPanel;
