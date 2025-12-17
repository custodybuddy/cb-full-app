import React from 'react';
import GavelIcon from '@/components/icons/GavelIcon';

interface ReportReferencesProps {
    legalInsights: string;
    sources: string[];
}

const ReportReferences: React.FC<ReportReferencesProps> = ({ legalInsights, sources }) => {
    if (!legalInsights && (!sources || sources.length === 0)) {
        return null;
    }

    return (
        <div className="pt-8 space-y-3">
            <h3 className="text-2xl font-bold text-gray-100 mb-2 flex items-center gap-2">
                <GavelIcon className="text-amber-400 w-5 h-5" />
                Legal References & Sources
            </h3>
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
        </div>
    );
};

export default ReportReferences;
