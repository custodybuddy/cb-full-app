import React from 'react';
import SpeakerIcon from '../icons/SpeakerIcon';
import PauseIcon from '../icons/PauseIcon';
import StopCircleIcon from '../icons/StopCircleIcon';
import SpinnerIcon from '../icons/SpinnerIcon';
import FilePdfIcon from '../icons/FilePdfIcon';
import ZoomInIcon from '../icons/ZoomInIcon';
import ZoomOutIcon from '../icons/ZoomOutIcon';
import RefreshCwIcon from '../icons/RefreshCwIcon';
import { MIN_SCALE, MAX_SCALE } from '../../hooks/useTextSizer';
import type { UseTextSizerReturn } from '../../hooks/useTextSizer';

interface AnalysisActionsBarProps {
    isSpeaking: boolean;
    isPaused: boolean;
    isExportingPdf: boolean;
    textSizer: UseTextSizerReturn;
    onPlayPause: () => void;
    onStop: () => void;
    onExportPdf: () => void;
}

const AnalysisActionsBar: React.FC<AnalysisActionsBarProps> = ({
    isSpeaking,
    isPaused,
    isExportingPdf,
    textSizer,
    onPlayPause,
    onStop,
    onExportPdf,
}) => (
    <div className="flex flex-col gap-4 md:flex-row md:justify-between items-start md:items-center p-4 bg-slate-800 border border-slate-700 rounded-t-lg">
        <h3 className="text-xl font-bold text-amber-400 flex-shrink-0">AI Analysis Report</h3>
        <div className="flex flex-wrap items-center justify-start gap-2">
            <div className="flex items-center gap-2">
                <button
                    onClick={onPlayPause}
                    className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-3 rounded-lg transition-all text-sm"
                    aria-label={!isSpeaking ? "Read analysis aloud" : isPaused ? "Resume reading" : "Pause reading"}
                >
                    {!isSpeaking || isPaused ? <SpeakerIcon className="w-4 h-4" /> : <PauseIcon className="w-4 h-4" />}
                    <span>{!isSpeaking ? 'Read' : isPaused ? 'Resume' : 'Pause'}</span>
                </button>
                {isSpeaking && (
                    <button
                        onClick={onStop}
                        className="p-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-all"
                        aria-label="Stop reading analysis"
                    >
                        <StopCircleIcon className="w-5 h-5" />
                    </button>
                )}
                <button
                    onClick={onExportPdf}
                    disabled={isExportingPdf}
                    className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-3 rounded-lg transition-all text-sm disabled:opacity-70 disabled:cursor-wait"
                    aria-label={isExportingPdf ? "Creating PDF, please wait" : "Export analysis as a PDF file"}
                >
                    {isExportingPdf ? <SpinnerIcon className="w-4 h-4" /> : <FilePdfIcon className="w-4 h-4" />}
                    <span>PDF</span>
                </button>
            </div>
        </div>
        <div className="flex items-center gap-1 p-1 bg-slate-700 rounded-lg">
            <button
                onClick={textSizer.decrease}
                disabled={textSizer.scale <= MIN_SCALE}
                className="p-1.5 text-white rounded-md hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Decrease text size"
            >
                <ZoomOutIcon className="w-5 h-5" />
            </button>
            <button
                onClick={textSizer.reset}
                className="p-1.5 text-white rounded-md hover:bg-slate-600"
                aria-label="Reset text size"
            >
                <RefreshCwIcon className="w-5 h-5" />
            </button>
            <button
                onClick={textSizer.increase}
                disabled={textSizer.scale >= MAX_SCALE}
                className="p-1.5 text-white rounded-md hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Increase text size"
            >
                <ZoomInIcon className="w-5 h-5" />
            </button>
        </div>
    </div>
);

export default AnalysisActionsBar;
