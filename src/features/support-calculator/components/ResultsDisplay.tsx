import React from 'react';
import HelpCircleIcon from '@/components/icons/HelpCircleIcon';

const formatCurrency = (value: number) => `$${value.toLocaleString('en-CA')}`;

const SAMPLE_RESULTS = {
    childSupport: 820,
    spousalSupportLow: 950,
    spousalSupportHigh: 1450,
    spousalSupportMid: 1200,
    combinedSupportMid: 2020,
    payorIncome: 95000,
    recipientIncome: 55000,
    section7Total: 550,
    section7Payor: 330,
    section7Recipient: 220,
};

const ResultsDisplay: React.FC = () => {
    const {
        childSupport,
        spousalSupportLow,
        spousalSupportHigh,
        spousalSupportMid,
        combinedSupportMid,
        payorIncome,
        recipientIncome,
        section7Total,
        section7Payor,
        section7Recipient,
    } = SAMPLE_RESULTS;

    return (
        <div className="space-y-6">
            <div className="bg-slate-900/70 backdrop-blur-sm rounded-2xl shadow-xl border border-yellow-400/25 p-6 md:p-8 h-full">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                    <div>
                        <p className="text-sm uppercase tracking-[0.2em] text-amber-200 font-semibold">Results</p>
                        <h2 className="text-2xl md:text-3xl font-bold text-white font-serif">Support Summary</h2>
                    </div>
                    <div className="text-xs text-slate-400 text-left sm:text-right space-y-1">
                        <div>
                            Payor Income: <span className="text-white">{formatCurrency(payorIncome)}</span>
                        </div>
                        <div>
                            Recipient Income: <span className="text-white">{formatCurrency(recipientIncome)}</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-3 justify-start sm:justify-end mb-4">
                    <span className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-lg border border-amber-300/50 bg-amber-300/10 text-amber-200">
                        External SSAG Calculator
                    </span>
                </div>

                <div className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="bg-slate-900/80 rounded-xl border border-slate-800/80 p-4 shadow-inner shadow-slate-900/30">
                            <p className="text-xs uppercase tracking-[0.2em] text-amber-200 font-semibold mb-1">
                                Child Support (monthly)
                            </p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-bold text-yellow-300">{formatCurrency(childSupport)}</span>
                                <span className="text-sm text-slate-400">Payor → Recipient</span>
                            </div>
                            <p className="text-xs text-slate-400 mt-1">Parenting: Shared (set-off)</p>
                        </div>

                        <div className="bg-slate-900/80 rounded-xl border border-slate-800/80 p-4 shadow-inner shadow-slate-900/30">
                            <p className="text-xs uppercase tracking-[0.2em] text-amber-200 font-semibold mb-1 flex items-center gap-2">
                                Spousal Support (SSAG)
                                <span className="text-[10px] text-amber-300 bg-amber-300/10 border border-amber-300/40 rounded px-2 py-0.5">
                                    what&apos;s this?
                                </span>
                            </p>
                            <div className="flex items-baseline gap-2 text-yellow-200">
                                <span className="text-2xl font-bold">{formatCurrency(spousalSupportLow)}</span>
                                <span className="text-sm text-slate-400">to</span>
                                <span className="text-2xl font-bold">{formatCurrency(spousalSupportHigh)}</span>
                            </div>
                            <p className="text-sm text-slate-300">Midpoint: {formatCurrency(spousalSupportMid)}</p>
                            <p className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                                <span>Duration: 4-8 years</span>
                                <HelpCircleIcon className="w-4 h-4 text-amber-300 opacity-80" />
                            </p>
                            <p className="text-xs text-slate-300 mt-2">
                                Net (to recipient, midpoint): <span className="text-yellow-200 font-semibold">{formatCurrency(combinedSupportMid)}</span>
                            </p>
                        </div>
                    </div>

                    <div className="bg-slate-900/80 rounded-xl border border-amber-400/50 p-4 shadow-inner shadow-amber-500/10">
                        <p className="text-xs uppercase tracking-[0.2em] text-amber-200 font-semibold mb-1">Section 7 Special Expenses (monthly)</p>
                        <div className="flex flex-wrap gap-4 text-sm text-slate-200">
                            <span>Total: {formatCurrency(section7Total)}</span>
                            <span>Payor Share (60%): {formatCurrency(section7Payor)}</span>
                            <span>Recipient Share (40%): {formatCurrency(section7Recipient)}</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">Shared pro rata to net incomes.</p>
                    </div>

                    <div className="bg-slate-900/80 rounded-xl border border-slate-800/80 p-4">
                        <p className="text-sm font-semibold text-white mb-2">Notes</p>
                        <ul className="space-y-2 text-sm text-slate-200 list-disc list-inside">
                            <li>Shared parenting set-off applied using sample incomes.</li>
                            <li>SSAG values shown as estimated monthly ranges.</li>
                            <li>Consult a family lawyer before filing or negotiating.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultsDisplay;
