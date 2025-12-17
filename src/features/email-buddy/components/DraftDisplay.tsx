import React from 'react';
import Feedback from '@/features/marketing/components/Feedback';
import ClipboardIcon from '@/components/icons/ClipboardIcon';
import SpeakerIcon from '@/components/icons/SpeakerIcon';
import StopCircleIcon from '@/components/icons/StopCircleIcon';
import PencilIcon from '@/components/icons/PencilIcon';

interface DraftDisplayProps {
    title: string;
    draft: string;
}

const DraftDisplay: React.FC<DraftDisplayProps> = ({ title, draft }) => {
    return (
        <div className="flex flex-col h-full">
            <div className="flex justify-between items-start mb-2">
                <h4 className="text-md font-bold text-amber-400">{title}</h4>
                <div className="flex items-center gap-1">
                    <button className="flex items-center gap-1.5 bg-slate-700 text-white font-semibold py-1 px-2 rounded-md text-xs" disabled>
                        <PencilIcon className="w-3 h-3" />
                        <span>Edit</span>
                    </button>
                    <button className="flex items-center gap-1.5 bg-slate-700 text-white font-semibold py-1 px-2 rounded-md text-xs" disabled>
                        <ClipboardIcon />
                        <span>Copy</span>
                    </button>
                </div>
            </div>

            <div className="flex-grow mb-2">
                <div className="text-gray-300 leading-relaxed text-sm whitespace-pre-wrap">
                    {draft}
                </div>
            </div>

            <div className="flex flex-col gap-2 mt-auto">
                <div className="flex items-center gap-2">
                    <button
                        disabled
                        className="flex-grow flex items-center justify-center gap-2 bg-slate-700 text-white font-semibold py-2 px-3 rounded-lg text-sm"
                        aria-label="Read draft aloud"
                    >
                        <SpeakerIcon className="w-4 h-4" />
                        <span>Read Aloud</span>
                    </button>
                    <button disabled className="p-2 bg-slate-700 text-white rounded-lg" aria-label="Stop reading">
                        <StopCircleIcon className="w-5 h-5" />
                    </button>
                </div>
                <Feedback />
            </div>
        </div>
    );
};

export default DraftDisplay;
