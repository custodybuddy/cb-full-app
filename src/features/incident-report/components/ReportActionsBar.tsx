import React from 'react';
import RotateCwIcon from '@/components/icons/RotateCwIcon';
import ZoomInIcon from '@/components/icons/ZoomInIcon';
import ZoomOutIcon from '@/components/icons/ZoomOutIcon';
import RefreshCwIcon from '@/components/icons/RefreshCwIcon';

const buttonBase =
    'flex items-center gap-2 bg-slate-700 text-white font-semibold py-2 px-3 rounded-lg transition-all text-sm';
const textButton =
    'p-1.5 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed';

const ReportActionsBar: React.FC = () => (
    <div className="flex flex-col gap-4 md:flex-row md:justify-between items-start md:items-center p-6 bg-slate-800 border border-slate-700 rounded-t-lg">
        <div className="flex-grow">
            <h3 className="text-xl font-bold text-amber-400 flex-shrink-0">AI Incident Report</h3>
        </div>
        <div className="flex flex-wrap items-center justify-start gap-2">
            <button className={buttonBase} disabled>
                <RotateCwIcon className="w-4 h-4" />
                <span>New Report</span>
            </button>
            <div className="flex items-center gap-1 p-1 bg-slate-700 rounded-lg">
                <button
                    disabled
                    className={textButton}
                    aria-label="Decrease text size"
                >
                    <ZoomOutIcon className="w-5 h-5" />
                </button>
                <button
                    disabled
                    className={textButton}
                    aria-label="Reset text size"
                >
                    <RefreshCwIcon className="w-5 h-5" />
                </button>
                <button
                    disabled
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
