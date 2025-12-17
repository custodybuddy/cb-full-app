import React, { useState } from 'react';
import HelpCircleIcon from '@/components/icons/HelpCircleIcon';

interface JargonItem {
    term: string;
    context: string;
}

interface JargonHelperProps {
    jargon: JargonItem[];
}

const JargonHelper: React.FC<JargonHelperProps> = ({ jargon }) => {
    const [expandedTerm, setExpandedTerm] = useState<string | null>(null);

    const handleToggleTerm = (term: string) => {
        setExpandedTerm(prev => (prev === term ? null : term));
    };
    
    if (jargon.length === 0) {
        return null;
    }

    return (
        <div className="space-y-3">
            <h4 className="font-bold text-gray-300 mb-2 flex items-center gap-2">
                <HelpCircleIcon className="w-5 h-5 text-amber-400" />
                Legal Jargon Detected
            </h4>
            <div className="space-y-2">
                {jargon.map(({ term }) => (
                    <div key={term}>
                        <button
                            onClick={() => handleToggleTerm(term)}
                            className="w-full text-left font-semibold text-gray-300 p-2 rounded-md bg-slate-700/50 hover:bg-slate-700 transition-colors flex justify-between items-center"
                            aria-expanded={expandedTerm === term}
                            aria-controls={`jargon-panel-${term.replace(/\s+/g, '-')}`}
                        >
                            <span>{term}</span>
                            <span className={`transform transition-transform duration-200 ${expandedTerm === term ? 'rotate-180' : 'rotate-0'}`}>▼</span>
                        </button>
                        {expandedTerm === term && (
                            <div id={`jargon-panel-${term.replace(/\s+/g, '-')}`} className="p-3 bg-slate-950 rounded-b-md border-x border-b border-slate-600 animate-fade-in-up-fast">
                                <div className="space-y-3 text-xs">
                                    <div>
                                        <h5 className="font-bold text-gray-300 mb-1">Explanation</h5>
                                        <p className="text-gray-400">
                                            Placeholder summary for "{term}". Replace with your new logic when ready.
                                        </p>
                                    </div>
                                    <div>
                                        <h5 className="font-bold text-gray-300 mb-1">Suggested Question</h5>
                                        <div className="p-2 bg-slate-800 rounded-md italic text-gray-400">
                                            "Add a follow-up question here."
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default JargonHelper;
