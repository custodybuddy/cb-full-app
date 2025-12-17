import React from 'react';
import SpeakerIcon from '@/components/icons/SpeakerIcon';
import FilePdfIcon from '@/components/icons/FilePdfIcon';
import ZoomInIcon from '@/components/icons/ZoomInIcon';
import ZoomOutIcon from '@/components/icons/ZoomOutIcon';
import RefreshCwIcon from '@/components/icons/RefreshCwIcon';

const AnalysisActionsBar: React.FC = () => (
    <div className="flex flex-col gap-4 md:flex-row md:justify-between items-start md:items-center p-4 bg-slate-800 border border-slate-700 rounded-t-lg">
        <h3 className="text-xl font-bold text-amber-400 flex-shrink-0">AI Analysis Report</h3>
        <div className="flex flex-wrap items-center justify-start gap-2">
            <div className="flex items-center gap-2">
                <button
                    className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-3 rounded-lg transition-all text-sm"
                    aria-label="Read analysis aloud"
                    disabled
                >
                    <SpeakerIcon className="w-4 h-4" />
                    <span>Read</span>
                </button>
                <button
                    className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-3 rounded-lg transition-all text-sm disabled:opacity-70 disabled:cursor-wait"
                    aria-label="Export analysis as a PDF file"
                    disabled
                >
                    <FilePdfIcon className="w-4 h-4" />
                    <span>PDF</span>
                </button>
            </div>
        </div>
        <div className="flex items-center gap-1 p-1 bg-slate-700 rounded-lg">
            <button
                className="p-1.5 text-white rounded-md hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Decrease text size"
                disabled
            >
                <ZoomOutIcon className="w-5 h-5" />
            </button>
            <button
                className="p-1.5 text-white rounded-md hover:bg-slate-600"
                aria-label="Reset text size"
                disabled
            >
                <RefreshCwIcon className="w-5 h-5" />
            </button>
            <button
                className="p-1.5 text-white rounded-md hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Increase text size"
                disabled
            >
                <ZoomInIcon className="w-5 h-5" />
            </button>
        </div>
    </div>
);

export default AnalysisActionsBar;
