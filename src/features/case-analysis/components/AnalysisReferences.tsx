import React from 'react';
interface AnalysisReferencesProps {
    legalInsights: string;
    sources: string[];
}

const AnalysisReferences: React.FC<AnalysisReferencesProps> = ({ legalInsights, sources }) => {
    if (!legalInsights && (!sources || sources.length === 0)) {
        return null;
    }

    return (
        <div className="space-y-4 text-sm text-gray-300">
            {legalInsights && (
                <div>
                    <p className="font-semibold text-amber-300 mb-2">Notes</p>
                    <p className="whitespace-pre-wrap">{legalInsights}</p>
                </div>
            )}
            {sources.length > 0 && (
                <div>
                    <p className="font-semibold text-amber-300 mb-2">Sources</p>
                    <ul className="list-disc pl-6 space-y-2">
                        {sources.map((source, i) => (
                            <li key={`source-${i}`} className="break-words">
                                {source}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default AnalysisReferences;
