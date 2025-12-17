import React from 'react';
import HelpCircleIcon from '@/components/icons/HelpCircleIcon';

interface JargonItem {
    term: string;
    context: string;
}

interface JargonHelperProps {
    jargon: JargonItem[];
}

const JargonHelper: React.FC<JargonHelperProps> = ({ jargon }) => {
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
                {jargon.map(({ term, context }) => (
                    <div key={term} className="p-3 bg-slate-800 rounded-md border border-slate-700">
                        <p className="font-semibold text-gray-200">{term}</p>
                        <p className="text-xs text-gray-400 mt-1">{context}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default JargonHelper;
