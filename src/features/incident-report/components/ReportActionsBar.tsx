import React from 'react';
import { MIN_SCALE, MAX_SCALE } from '@/hooks/useTextSizer';
import type { UseTextSizerReturn } from '@/hooks/useTextSizer';
import RotateCwIcon from '@/components/icons/RotateCwIcon';
import ZoomInIcon from '@/components/icons/ZoomInIcon';
import ZoomOutIcon from '@/components/icons/ZoomOutIcon';
import RefreshCwIcon from '@/components/icons/RefreshCwIcon';

interface ReportActionsBarProps {
    onReset: () => void;
    textSizer: UseTextSizerReturn;
}

const buttonBase =
    'flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-3 rounded-lg transition-all text-sm';
const textButton =
    'p-1.5 text-white rounded-md hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed';

const ReportActionsBar: React.FC<ReportActionsBarProps> = ({ onReset, textSizer }) => (
    <div className="flex flex-col gap-4 md:flex-row md:justify-between items-start md:items-center p-6 bg-slate-800 border border-slate-700 rounded-t-lg">
        <div className="flex-grow">
            <h3 className="text-xl font-bold text-amber-400 flex-shrink-0">AI Incident Report</h3>
        </div>
        <div className="flex flex-wrap items-center justify-start gap-2">
            <button onClick={onReset} className={buttonBase}>
                <RotateCwIcon className="w-4 h-4" />
                <span>New Report</span>
            </button>
            <div className="flex items-center gap-1 p-1 bg-slate-700 rounded-lg">
                <button
                    onClick={textSizer.decrease}
                    disabled={textSizer.scale <= MIN_SCALE}
                    className={textButton}
                    aria-label="Decrease text size"
                >
                    <ZoomOutIcon className="w-5 h-5" />
                </button>
                <button
                    onClick={textSizer.reset}
                    className={textButton}
                    aria-label="Reset text size"
                >
                    <RefreshCwIcon className="w-5 h-5" />
                </button>
                <button
                    onClick={textSizer.increase}
                    disabled={textSizer.scale >= MAX_SCALE}
                    className={textButton}
                    aria-label="Increase text size"
                >
                    <ZoomInIcon className="w-5 h-5" />
                </button>
            </div>
        </div>
    </div>
);

export default ReportActionsBar;
