import React, { useMemo } from 'react';
import { Calculator } from 'lucide-react';
import { useSupportCalculator } from '../useSupportCalculator';
import CalculatorForm from './CalculatorForm';
import ResultsDisplay from './ResultsDisplay';

const LAYOUT_CLASSNAMES = {
    page: 'bg-slate-950 text-slate-100 p-4 md:p-8 rounded-3xl max-w-6xl mx-auto space-y-6 shadow-2xl shadow-amber-500/5 border border-slate-800/60',
    modal: 'bg-slate-950 text-slate-100 p-4 md:p-6 rounded-3xl max-w-5xl mx-auto space-y-6 shadow-2xl shadow-amber-500/5 border border-slate-800/60',
} as const;

const HEADER_COPY = {
    badge: 'SupportCalc CA',
    title: 'Spousal & Child Support Estimator',
    description:
        'Uses simplified SSAG-inspired spousal ranges and child support set-off estimates. For guidance only; confirm figures with a family law professional.',
};

interface SupportCalculatorContentProps {
    layout?: 'page' | 'modal';
}

const SupportCalculatorContent: React.FC<SupportCalculatorContentProps> = ({ layout = 'modal' }) => {
    const titleId = useMemo(() => 'support-calc-title', []);
    const descId = useMemo(() => 'support-calc-description', []);

    const { inputs, results, errors, handleInputChange, handleChildAgeChange, handleCalculate } = useSupportCalculator();

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
            </div>
        </section>
    );
};

export default SupportCalculatorContent;
