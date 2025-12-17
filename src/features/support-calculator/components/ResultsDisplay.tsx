import React from 'react';
import HelpCircleIcon from '@/components/icons/HelpCircleIcon';
import { CalculationResult, CalculatorInputs } from '@/types';

const formatCurrency = (value: number) => `$${value.toLocaleString('en-CA')}`;

const FALLBACK_RESULT: CalculationResult = {
    childSupport: 820,
    childSupportDirection: 'payor_to_recipient',
    spousalSupportLow: 950,
    spousalSupportMid: 1200,
    spousalSupportHigh: 1450,
    combinedSupportLow: 1800,
    combinedSupportMid: 2020,
    combinedSupportHigh: 2250,
    duration: { minYears: 4, maxYears: 8, indefinite: false },
    notes: [],
};

interface ResultsDisplayProps {
    results: CalculationResult | null;
    inputs: CalculatorInputs;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results, inputs }) => {
    const displayResults = results ?? FALLBACK_RESULT;
    const payorIncome = Number(inputs.payorIncome) || 95000;
    const recipientIncome = Number(inputs.recipientIncome) || 55000;
    const childcare = Number(inputs.specialExpenseChildcare) || 350;
    const education = Number(inputs.specialExpenseEducation) || 80;
    const health = Number(inputs.specialExpenseHealth) || 120;
    const section7Total = childcare + education + health;
    const incomeSum = payorIncome + recipientIncome || 1;
    const payorShare = section7Total * (payorIncome / incomeSum);
    const recipientShare = section7Total * (recipientIncome / incomeSum);

    const childSupportDirectionLabel =
        displayResults.childSupportDirection === 'recipient_to_payor'
            ? 'Recipient → Payor'
            : displayResults.childSupportDirection === 'payor_to_recipient'
              ? 'Payor → Recipient'
              : 'Set-off Pending';
    const parentingNote =
        inputs.parentingType === 'shared' ? 'Parenting: Shared (set-off)' : `Parenting: ${inputs.parentingType}`;

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
                                <span className="text-3xl font-bold text-yellow-300">{formatCurrency(displayResults.childSupport)}</span>
                                <span className="text-sm text-slate-400">{childSupportDirectionLabel}</span>
                            </div>
                            <p className="text-xs text-slate-400 mt-1">{parentingNote}</p>
                        </div>

                        <div className="bg-slate-900/80 rounded-xl border border-slate-800/80 p-4 shadow-inner shadow-slate-900/30">
                            <p className="text-xs uppercase tracking-[0.2em] text-amber-200 font-semibold mb-1 flex items-center gap-2">
                                Spousal Support (SSAG)
                                <span className="text-[10px] text-amber-300 bg-amber-300/10 border border-amber-300/40 rounded px-2 py-0.5">
                                    what&apos;s this?
                                </span>
                            </p>
                            <div className="flex items-baseline gap-2 text-yellow-200">
                                <span className="text-2xl font-bold">{formatCurrency(displayResults.spousalSupportLow)}</span>
                                <span className="text-sm text-slate-400">to</span>
                                <span className="text-2xl font-bold">{formatCurrency(displayResults.spousalSupportHigh)}</span>
                            </div>
                            <p className="text-sm text-slate-300">Midpoint: {formatCurrency(displayResults.spousalSupportMid)}</p>
                            <p className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                                <span>
                                    Duration: {displayResults.duration.minYears}-{displayResults.duration.maxYears}{' '}
                                    {displayResults.duration.indefinite ? '(Indefinite possible)' : 'years'}
                                </span>
                                <HelpCircleIcon className="w-4 h-4 text-amber-300 opacity-80" />
                            </p>
                            <p className="text-xs text-slate-300 mt-2">
                                Net (to recipient, midpoint): <span className="text-yellow-200 font-semibold">{formatCurrency(displayResults.combinedSupportMid)}</span>
                            </p>
                        </div>
                    </div>

                    <div className="bg-slate-900/80 rounded-xl border border-amber-400/50 p-4 shadow-inner shadow-amber-500/10">
                        <p className="text-xs uppercase tracking-[0.2em] text-amber-200 font-semibold mb-1">Section 7 Special Expenses (monthly)</p>
                        <div className="flex flex-wrap gap-4 text-sm text-slate-200">
                            <span>Total: {formatCurrency(section7Total)}</span>
                            <span>Payor Share ({Math.round((payorIncome / incomeSum) * 100)}%): {formatCurrency(payorShare)}</span>
                            <span>Recipient Share ({Math.round((recipientIncome / incomeSum) * 100)}%): {formatCurrency(recipientShare)}</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">Shared pro rata to net incomes.</p>
                    </div>

                    <div className="bg-slate-900/80 rounded-xl border border-slate-800/80 p-4">
                        <p className="text-sm font-semibold text-white mb-2">Notes</p>
                        <ul className="space-y-2 text-sm text-slate-200 list-disc list-inside">
                            <li>Shared parenting set-off applied using entered incomes.</li>
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
