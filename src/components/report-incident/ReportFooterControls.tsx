import React from 'react';
import SpeakerIcon from '../icons/SpeakerIcon';
import PauseIcon from '../icons/PauseIcon';
import StopCircleIcon from '../icons/StopCircleIcon';
import SpinnerIcon from '../icons/SpinnerIcon';
import FilePdfIcon from '../icons/FilePdfIcon';
import DownloadIcon from '../icons/DownloadIcon';
import Feedback from '../Feedback';

interface ReportFooterControlsProps {
    isSpeaking: boolean;
    isPaused: boolean;
    onPlayPause: () => void;
    onStop: () => void;
    onExportTxt: () => void;
    onExportPdf: () => void;
    isExportingPdf: boolean;
}

const ReportFooterControls: React.FC<ReportFooterControlsProps> = ({
    isSpeaking,
    isPaused,
    onPlayPause,
    onStop,
    onExportTxt,
    onExportPdf,
    isExportingPdf,
}) => (
    <div className="pt-6 border-t border-slate-700/50 mt-8">
        <div className="no-pdf flex flex-wrap gap-4 justify-between items-center mt-4">
            <div className="flex items-center gap-2">
                <button
                    onClick={onPlayPause}
                    className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold py-2 px-3 rounded-lg transition-all text-sm"
                    aria-label={!isSpeaking ? "Read report aloud" : isPaused ? "Resume reading" : "Pause reading"}
                >
                    {!isSpeaking || isPaused ? <SpeakerIcon className="w-4 h-4" /> : <PauseIcon className="w-4 h-4" />}
                    <span>{!isSpeaking ? 'Read' : isPaused ? 'Resume' : 'Pause'}</span>
                </button>
                {isSpeaking && (
                    <button
                        onClick={onStop}
                        className="p-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-all"
                        aria-label="Stop reading report"
                    >
                        <StopCircleIcon className="w-5 h-5" />
                    </button>
                )}
            </div>
            <div className="flex items-center gap-2">
                <button
                    onClick={onExportTxt}
                    className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold py-2 px-3 rounded-lg transition-all text-sm"
                    aria-label="Export as text file"
                >
                    <DownloadIcon className="w-4 h-4" />
                    <span>TXT</span>
                </button>
                <button
                    onClick={onExportPdf}
                    disabled={isExportingPdf}
                    className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold py-2 px-3 rounded-lg transition-all text-sm disabled:opacity-70 disabled:cursor-wait"
                    aria-label={isExportingPdf ? "Creating PDF, please wait" : "Export as a PDF file"}
                >
                    {isExportingPdf ? <SpinnerIcon className="w-4 h-4" /> : <FilePdfIcon className="w-4 h-4" />}
                    <span>PDF</span>
                </button>
            </div>
        </div>
        <Feedback />
    </div>
);

export default ReportFooterControls;
