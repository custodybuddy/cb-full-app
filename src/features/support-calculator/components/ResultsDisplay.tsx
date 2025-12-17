import React from 'react';
import { CalculatorInputs, CalculationResult } from '@/types';
import HelpCircleIcon from '@/components/icons/HelpCircleIcon';

interface ResultsDisplayProps {
    inputs: CalculatorInputs;
    results: CalculationResult | null;
}

const formatCurrency = (value: number) => `$${value.toLocaleString('en-CA')}`;

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ inputs, results }) => {
    const childDirection =
        results?.childSupportDirection === 'payor_to_recipient'
            ? 'Payor → Recipient'
            : results?.childSupportDirection === 'recipient_to_payor'
              ? 'Recipient → Payor'
              : 'No transfer';

    return (
        <div className="space-y-6">
            <div className="bg-slate-900/70 backdrop-blur-sm rounded-2xl shadow-xl border border-yellow-400/25 p-6 md:p-8 h-full">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                    <div>
                        <p className="text-sm uppercase tracking-[0.2em] text-amber-200 font-semibold">Results</p>
                        <h2 className="text-2xl md:text-3xl font-bold text-white font-serif">Support Summary</h2>
                    </div>
                    <div className="text-xs text-slate-400 text-left sm:text-right space-y-1">
                        <div>Payor Income: <span className="text-white">${inputs.payorIncome || '—'}</span></div>
                        <div>
                            <span
                                className="inline-flex items-center gap-1"
                                title="Recipient income may be imputed under SSAG-inspired rules if the entered value is missing or unreasonably low."
                            >
                                Recipient Income:
                            </span>{' '}
                            <span className="text-white">${inputs.recipientIncome || '—'}</span>
                        </div>
                    </div>
                </div>

                {results && (
                    <div className="flex flex-wrap gap-3 justify-start sm:justify-end mb-4">
                        <a
                            href="https://www.justice.gc.ca/eng/fl-df/spousal-epoux.html"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-lg border border-amber-300/50 bg-amber-300/10 text-amber-200 hover:bg-amber-300/20 transition"
                            title="Open an external resource for Spousal Support Advisory Guidelines (SSAG) calculations."
                        >
                            External SSAG Calculator
                        </a>
                    </div>
                )}

                {!results && (
                    <div className="rounded-xl border border-dashed border-slate-700 p-6 text-slate-400">
                        Enter financials, children, and dates, then select "Run Calculation" to view estimates.
                    </div>
                )}

                {results && (
                    <div className="space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="bg-slate-900/80 rounded-xl border border-slate-800/80 p-4 shadow-inner shadow-slate-900/30">
                                <p className="text-xs uppercase tracking-[0.2em] text-amber-200 font-semibold mb-1">
                                    Child Support (monthly)
                                </p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-bold text-yellow-300">{formatCurrency(results.childSupport)}</span>
                                    <span className="text-sm text-slate-400">{childDirection}</span>
                                </div>
                                <p className="text-xs text-slate-400 mt-1">
                                    Parenting: {inputs.parentingType === 'shared' ? 'Shared (set-off)' : 'Primary residence'}
                                </p>
                            </div>

                            <div className="bg-slate-900/80 rounded-xl border border-slate-800/80 p-4 shadow-inner shadow-slate-900/30">
                                <p className="text-xs uppercase tracking-[0.2em] text-amber-200 font-semibold mb-1 flex items-center gap-2">
                                    Spousal Support (SSAG)
                                    <span
                                        className="text-[10px] text-amber-300 bg-amber-300/10 border border-amber-300/40 rounded px-2 py-0.5 cursor-help"
                                        title="SSAG = Spousal Support Advisory Guidelines. See Department of Justice Canada: https://www.justice.gc.ca/eng/fl-df/spousal-epoux.html"
                                    >
                                        what&apos;s this?
                                    </span>
                                </p>
                                <div className="flex items-baseline gap-2 text-yellow-200">
                                    <span className="text-2xl font-bold">{formatCurrency(results.spousalSupportLow)}</span>
                                    <span className="text-sm text-slate-400">to</span>
                                    <span className="text-2xl font-bold">{formatCurrency(results.spousalSupportHigh)}</span>
                                </div>
                                <p className="text-sm text-slate-300">Midpoint: {formatCurrency(results.spousalSupportMid)}</p>
                                <p className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                                    <span
                                        title={
                                            results.duration.indefinite
                                                ? 'Indefinite applies when Rule of 20 (relationship length ≥ 20 years) OR Rule of 65 (relationship ≥ 5 years AND age + years ≥ 65) is met.'
                                                : undefined
                                        }
                                    >
                                        Duration: {results.duration.indefinite ? 'Indefinite possible' : `${results.duration.minYears}-${results.duration.maxYears} years`}
                                    </span>
                                    <HelpCircleIcon
                                        className="w-4 h-4 text-amber-300 opacity-80"
                                        title="Duration references SSAG guidance. Indefinite is flagged when the Rule of 20 (20+ years together) or Rule of 65 (age + years together ≥ 65) applies; otherwise a typical range is shown."
                                    />
                                </p>
                                <p className="text-xs text-slate-300 mt-2">
                                    Net (to recipient, midpoint): <span className="text-yellow-200 font-semibold">{formatCurrency(results.combinedSupportMid)}</span>
                                </p>
                            </div>
                        </div>

                        {results.specialExpensesTotal !== undefined && results.specialExpensesTotal > 0 && (
                            <div className="bg-slate-900/80 rounded-xl border border-amber-400/50 p-4 shadow-inner shadow-amber-500/10">
                                <p className="text-xs uppercase tracking-[0.2em] text-amber-200 font-semibold mb-1 flex items-center gap-2">
                                    Section 7 Special Expenses (monthly)
                                    <span className="text-[10px] text-amber-300 bg-amber-300/10 border border-amber-300/30 rounded px-2 py-0.5">
                                        Net transfer impact
                                    </span>
                                </p>
                                <div className="flex flex-wrap gap-4 text-sm text-slate-200">
                                    <span>Total: {formatCurrency(results.specialExpensesTotal)}</span>
                                    <span>
                                        Payor Share ({results.specialExpensesPayorShare && results.specialExpensesTotal
                                            ? Math.round((results.specialExpensesPayorShare / results.specialExpensesTotal) * 100)
                                            : 0}%): {formatCurrency(results.specialExpensesPayorShare || 0)}
                                    </span>
                                    <span>
                                        Recipient Share ({results.specialExpensesRecipientShare && results.specialExpensesTotal
                                            ? Math.round((results.specialExpensesRecipientShare / results.specialExpensesTotal) * 100)
                                            : 0}%): {formatCurrency(results.specialExpensesRecipientShare || 0)}
                                    </span>
                                </div>
                                <p className="text-xs text-amber-200 mt-2 flex items-center gap-2 bg-amber-400/10 border border-amber-300/40 rounded-lg px-3 py-2">
                                    <svg className="w-4 h-4 text-amber-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M12 6v12m0 0 4-4m-4 4-4-4" />
                                    </svg>
                                    Monthly transfer is adjusted by the pro-rata shares above.
                                </p>
                                <p className="text-xs text-slate-400 mt-1">Shared pro rata to net incomes.</p>
                            </div>
                        )}

                        <div className="bg-slate-900/80 rounded-xl border border-slate-800/80 p-4">
                            <p className="text-sm font-semibold text-white mb-2">Notes</p>
                            <ul className="space-y-2 text-sm text-slate-200 list-disc list-inside">
                                {results.notes.map((note, idx) => (
                                    <li key={idx}>{note}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResultsDisplay;
