import React from 'react';
import AlertTriangleIcon from '@/components/icons/AlertTriangleIcon';
import type { CaseAnalysisReport } from '@/types/ai';

interface FlagsPanelProps {
    discrepancies: CaseAnalysisReport['discrepancies'];
}

const FlagsPanel: React.FC<FlagsPanelProps> = ({ discrepancies = [] }) => {
    if (!discrepancies.length) return null;
    return (
        <section className="p-4 bg-red-900/20 border border-red-500/50 rounded-lg not-prose">
            <h4 className="text-xl font-bold text-red-400 mb-3 flex items-center gap-2">
                <AlertTriangleIcon className="w-5 h-5" />
                Potential Discrepancies & Flags
            </h4>
            <div className="space-y-4">
                {discrepancies.map((item, i) => (
                    <div key={i} className="text-sm">
                        <p className="text-red-300 whitespace-pre-wrap">{item.description}</p>
                        <p className="text-xs text-red-400/80 mt-1">Sources: {item.sources.join(', ')}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FlagsPanel;
