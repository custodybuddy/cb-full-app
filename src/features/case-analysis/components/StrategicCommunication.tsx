import React from 'react';
import LightbulbIcon from '@/components/icons/LightbulbIcon';
import PencilIcon from '@/components/icons/PencilIcon';

interface StrategicCommunicationProps {
    recommendation: string;
    draftEmail: string;
}

const StrategicCommunication: React.FC<StrategicCommunicationProps> = ({
    recommendation,
    draftEmail,
}) => (
    <div className="p-4 bg-slate-800 border border-amber-400/50 rounded-lg not-prose">
        <h4 className="text-lg font-bold text-amber-400 mb-3 flex items-center gap-2">
            <LightbulbIcon className="w-5 h-5 text-amber-400" />
            Strategic Communication Prompt
        </h4>
        <p className="text-sm text-gray-300 mb-4 whitespace-pre-wrap">
            {recommendation}
        </p>
        <div className="p-3 bg-slate-900 rounded-md border border-slate-700 relative">
            <div className="absolute top-2 right-2 flex items-center gap-1 z-10 no-pdf">
                <button
                    className="flex items-center gap-1.5 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-1 px-2 rounded-md transition-all text-xs"
                    disabled
                >
                    <PencilIcon className="w-3 h-3" />
                    <span>Edit</span>
                </button>
            </div>
            <div className="text-gray-300 leading-relaxed break-words text-sm pt-8 whitespace-pre-wrap">
                {draftEmail}
            </div>
        </div>
    </div>
);

export default StrategicCommunication;
