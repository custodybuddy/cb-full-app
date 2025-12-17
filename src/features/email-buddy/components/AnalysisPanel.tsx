import React from 'react';
import SparklesIcon from '@/components/icons/SparklesIcon';

interface AnalysisPanelProps {
    originalTone: string;
    keyDemands: string[];
    riskFlags: string[];
}

const AnalysisPanel: React.FC<AnalysisPanelProps> = ({ originalTone, keyDemands, riskFlags }) => {
    return (
        <aside className="flex-shrink-0 bg-slate-900 border border-slate-700 rounded-lg w-full lg:w-80 p-4 space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-amber-400 flex items-center gap-2">
                    <SparklesIcon />
                    AI Analysis
                </h3>
            </div>
            <div className="text-sm space-y-4">
                <div>
                    <strong className="font-semibold text-gray-300 block mb-1">Identified Tone</strong>
                    <span className="text-gray-300 bg-slate-800 px-2 py-1 rounded-md inline-block">
                        {originalTone}
                    </span>
                </div>
                {keyDemands.length > 0 && (
                    <div>
                        <strong className="font-semibold text-gray-300 block mb-1">Key Demands</strong>
                        <ul className="list-disc pl-5 space-y-1 text-gray-400">
                            {keyDemands.map((demand, index) => (
                                <li key={index}>{demand}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {riskFlags.length > 0 && (
                    <div>
                        <strong className="font-semibold text-gray-300 block mb-1">Risk Flags</strong>
                        <ul className="list-disc pl-5 space-y-1 text-gray-400">
                            {riskFlags.map((flag, index) => (
                                <li key={index}>{flag}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </aside>
    );
};

export default AnalysisPanel;
