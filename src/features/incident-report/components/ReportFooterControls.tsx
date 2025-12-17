import React from 'react';
import SpeakerIcon from '@/components/icons/SpeakerIcon';
import StopCircleIcon from '@/components/icons/StopCircleIcon';
import FilePdfIcon from '@/components/icons/FilePdfIcon';
import DownloadIcon from '@/components/icons/DownloadIcon';
import Feedback from '@/features/marketing/components/Feedback';

const ReportFooterControls: React.FC = () => (
    <div className="pt-6 border-t border-slate-700/50 mt-8">
        <div className="no-pdf flex flex-wrap gap-4 justify-between items-center mt-4">
            <div className="flex items-center gap-2">
                <button
                    disabled
                    className="flex items-center gap-2 bg-slate-800 text-white font-semibold py-2 px-3 rounded-lg transition-all text-sm"
                    aria-label="Read report aloud"
                >
                    <SpeakerIcon className="w-4 h-4" />
                    <span>Read</span>
                </button>
                <button
                    disabled
                    className="p-2 bg-slate-800 text-white rounded-lg transition-all"
                    aria-label="Stop reading report"
                >
                    <StopCircleIcon className="w-5 h-5" />
                </button>
            </div>
            <div className="flex items-center gap-2">
                <button
                    disabled
                    className="flex items-center gap-2 bg-slate-800 text-white font-semibold py-2 px-3 rounded-lg transition-all text-sm"
                    aria-label="Export as text file"
                >
                    <DownloadIcon className="w-4 h-4" />
                    <span>TXT</span>
                </button>
                <button
                    disabled
                    className="flex items-center gap-2 bg-slate-800 text-white font-semibold py-2 px-3 rounded-lg transition-all text-sm"
                    aria-label="Export as a PDF file"
                >
                    <FilePdfIcon className="w-4 h-4" />
                    <span>PDF</span>
                </button>
            </div>
        </div>
        <Feedback />
    </div>
);

export default ReportFooterControls;
