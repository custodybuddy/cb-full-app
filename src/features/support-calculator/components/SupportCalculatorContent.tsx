import React, { useMemo } from 'react';
import { Calculator } from 'lucide-react';
import { useSupportCalculator } from '../useSupportCalculator';
import { useSupportExplanation } from '../useSupportExplanation';
import CalculatorForm from './CalculatorForm';
import ResultsDisplay from './ResultsDisplay';

const LAYOUT_CLASSNAMES = {
    page: 'bg-slate-950 text-slate-100 p-4 md:p-8 rounded-3xl max-w-6xl mx-auto space-y-6 shadow-2xl shadow-amber-500/5 border border-slate-800/60',
    modal: 'bg-slate-950 text-slate-100 p-4 md:p-6 rounded-3xl max-w-5xl mx-auto space-y-6 shadow-2xl shadow-amber-500/5 border border-slate-800/60',
} as const;

const HEADER_COPY = {
    badge: 'SupportCalc CA',
    title: (
        <>
            Spousal & <span className="text-amber-300">Child Support</span> Estimator
        </>
    ),
    description:
        'Uses simplified SSAG-inspired spousal ranges and child support set-off estimates. For guidance only; confirm figures with a family law professional.',
};

interface SupportCalculatorContentProps {
    layout?: 'page' | 'modal';
}

const SupportCalculatorContent: React.FC<SupportCalculatorContentProps> = ({ layout = 'modal' }) => {
    const titleId = useMemo(() => 'support-calc-title', []);
    const descId = useMemo(() => 'support-calc-description', []);

    const { inputs, results, errors, handleInputChange, handleChildAgeChange, handleCalculate, getExplanationContext } = useSupportCalculator();
    const { explain, result: explanation, loading: explaining, error: explanationError, reset: resetExplanation } = useSupportExplanation();

    const handleExplainClick = async () => {
        const context = getExplanationContext(results ?? handleCalculate());
        if (!context) return;
        await explain({
            jurisdiction: inputs.jurisdiction || 'Ontario',
            calculatedAmount: context.amount,
            inputsSummary: context.inputsSummary,
        });
    };

    const containerClasses = LAYOUT_CLASSNAMES[layout];

    return (
        <section className={containerClasses} aria-labelledby={titleId} aria-describedby={descId}>
            <header className="bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-slate-900/80 backdrop-blur-sm rounded-2xl shadow-xl p-5 md:p-7 border border-yellow-400/25 flex flex-col items-center text-center gap-3">
                <div className="bg-yellow-400 p-3 rounded-xl shadow-lg shadow-yellow-400/20 ring-4 ring-yellow-400/15">
                    <Calculator className="w-8 h-8 md:w-9 md:h-9 text-slate-950" />
                </div>
                <div className="space-y-2">
                    <p className="text-[11px] uppercase tracking-[0.28em] text-yellow-200 font-semibold">
                        {HEADER_COPY.badge}
                    </p>
                    <h2 id={titleId} className="text-2xl md:text-3xl font-bold text-white tracking-tight font-serif">
                        {HEADER_COPY.title}
                    </h2>
                    <p
                        id={descId}
                        className="text-slate-200/90 text-sm md:text-base font-medium leading-relaxed max-w-3xl mx-auto"
                    >
                        {HEADER_COPY.description}
                    </p>
                </div>
            </header>

            <div className="flex flex-col gap-6" aria-live="polite">
                <CalculatorForm
                    inputs={inputs}
                    errors={errors}
                    onInputChange={handleInputChange}
                    onChildAgeChange={handleChildAgeChange}
                    onCalculate={handleCalculate}
                />
                <ResultsDisplay results={results} inputs={inputs} />
                <div className="bg-slate-900/70 backdrop-blur-sm rounded-2xl shadow-xl border border-yellow-400/25 p-6 md:p-8 space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <p className="text-xs uppercase tracking-[0.2em] text-amber-200 font-semibold">Need context?</p>
                            <h3 className="text-xl font-semibold text-white">Explain this support result</h3>
                            <p className="text-sm text-slate-300">
                                Generates a plain-language rationale for the current estimate plus documentation tips.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <button
                                type="button"
                                onClick={handleExplainClick}
                                disabled={explaining}
                                className="inline-flex items-center justify-center rounded-full bg-amber-500 px-5 py-2 font-semibold text-slate-950 hover:bg-amber-400 transition disabled:opacity-50"
                            >
                                {explaining ? 'Explaining…' : 'Generate Explanation'}
                            </button>
                            {explanation && (
                                <button
                                    type="button"
                                    onClick={resetExplanation}
                                    className="text-xs font-semibold uppercase tracking-wide text-slate-300 hover:text-white"
                                >
                                    Clear
                                </button>
                            )}
                        </div>
                    </div>

                    {explanationError && (
                        <div className="rounded-xl border border-red-300/50 bg-red-900/30 px-4 py-3 text-sm text-red-200">
                            {explanationError}
                        </div>
                    )}

                    {explanation && (
                        <div className="space-y-4">
                            <div>
                                <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-200">Summary</h4>
                                <p className="mt-2 text-slate-100 leading-relaxed">{explanation.plainLanguageSummary}</p>
                            </div>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="bg-slate-950/50 rounded-xl border border-slate-800 p-4">
                                    <h5 className="text-sm font-semibold text-white mb-2">Key Factors</h5>
                                    <ul className="space-y-1 text-sm text-slate-200 list-disc list-inside">
                                        {explanation.keyFactors.map((factor, idx) => (
                                            <li key={idx}>{factor}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="bg-slate-950/50 rounded-xl border border-slate-800 p-4">
                                    <h5 className="text-sm font-semibold text-white mb-2">Edge Cases</h5>
                                    <ul className="space-y-1 text-sm text-slate-200 list-disc list-inside">
                                        {explanation.edgeCases.map((caseNote, idx) => (
                                            <li key={idx}>{caseNote}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="bg-slate-950/50 rounded-xl border border-slate-800 p-4">
                                <h5 className="text-sm font-semibold text-white mb-2">Documentation Tips</h5>
                                <ul className="space-y-1 text-sm text-slate-200 list-disc list-inside">
                                    {explanation.documentationTips.map((tip, idx) => (
                                        <li key={idx}>{tip}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default SupportCalculatorContent;
