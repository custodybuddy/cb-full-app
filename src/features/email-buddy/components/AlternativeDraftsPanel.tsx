import React from 'react';
import DraftDisplay from './DraftDisplay';

interface AlternativeDraftsPanelProps {
    drafts: Partial<Record<"Grey Rock" | "Friendly Assertive", string>>;
}

const AlternativeDraftsPanel: React.FC<AlternativeDraftsPanelProps> = ({ drafts }) => {
    return (
        <div className="flex flex-col h-full">
            <h4 className="text-md font-bold text-gray-200 mb-4">Alternative Styles</h4>
            <div className="space-y-4">
                <DraftDisplay
                    title="Grey Rock Style"
                    draft={drafts['Grey Rock'] || 'Draft not available.'}
                />
                <DraftDisplay
                    title="Friendly Assertive Style"
                    draft={drafts['Friendly Assertive'] || 'Draft not available.'}
                />
            </div>
        </div>
    );
};

export default AlternativeDraftsPanel;
