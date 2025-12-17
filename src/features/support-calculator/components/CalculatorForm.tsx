import React, { useMemo } from 'react';
import { CalculatorInputs } from '@/types';

interface CalculatorFormProps {
    inputs: CalculatorInputs;
    errors: Record<string, string>;
    onInputChange: (field: keyof CalculatorInputs, value: any) => void;
    onChildAgeChange: (index: number, value: string) => void;
    onCalculate: () => void;
}

const InfoTooltip: React.FC<{ text: string }> = ({ text }) => (
    <span
        className="ml-2 inline-flex items-center justify-center text-xs text-slate-300 bg-slate-800 border border-slate-600 rounded-full w-4 h-4"
        role="tooltip"
        aria-label={text}
        title={text}
    >
        i
    </span>
);

const InputLabel: React.FC<{ label: string; hint?: string; htmlFor?: string; tooltip?: string }> = ({
    label,
    hint,
    htmlFor,
    tooltip
}) => (
    <div className="flex items-center justify-between mb-1">
        <label className="text-sm font-semibold text-slate-200 flex items-center" htmlFor={htmlFor}>
            {label}
            {tooltip && <InfoTooltip text={tooltip} />}
        </label>
        {hint && <span className="text-xs text-slate-400">{hint}</span>}
    </div>
);

const ErrorText: React.FC<{ message?: string; id?: string }> = ({ message, id }) =>
    message ? (
        <p className="text-xs text-rose-300 mt-1" id={id}>
            {message}
        </p>
    ) : null;

const CalculatorForm: React.FC<CalculatorFormProps> = ({
    inputs,
    errors,
    onInputChange,
    onChildAgeChange,
    onCalculate
}) => {
    const updateJurisdiction = (value: string) => onInputChange('jurisdiction', value);

    const handleNumChildrenChange = (value: string) => {
        const count = Math.max(0, parseInt(value, 10) || 0);
        const currentAges = inputs.childAges || [];
        const adjustedAges =
            currentAges.length >= count
                ? currentAges.slice(0, count)
                : [...currentAges, ...Array(count - currentAges.length).fill('')];

        onInputChange('numChildren', value);
        onInputChange('childAges', adjustedAges);
    };

    const childInputs = useMemo(
        () => Array.from({ length: parseInt(inputs.numChildren, 10) || 0 }),
        [inputs.numChildren]
    );

    const renderIncomeFields = () => (
        <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
                <InputLabel
                    label="Payor Gross Income"
                    hint="Annual, before tax"
                    htmlFor="payorIncome"
                    tooltip="Used to estimate guideline child support and income gap for spousal support."
                />
                <div className="flex items-center rounded-lg bg-slate-800/70 px-3">
                    <span className="text-slate-400 mr-2">$</span>
                    <input
                        id="payorIncome"
                        type="number"
                        min="0"
                        inputMode="decimal"
                        onWheel={e => e.currentTarget.blur()}
                        className="w-full bg-transparent py-2 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/70"
                        placeholder="95,000"
                        value={inputs.payorIncome}
                        onChange={e => onInputChange('payorIncome', e.target.value)}
                        aria-describedby={errors.payorIncome ? 'payorIncome-error' : undefined}
                    />
                </div>
                <ErrorText id="payorIncome-error" message={errors.payorIncome} />
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
                <InputLabel
                    label="Recipient Gross Income"
                    hint="Annual, before tax"
                    htmlFor="recipientIncome"
                    tooltip="Needed to calculate set-off child support and SSAG income gaps."
                />
                <div className="flex items-center rounded-lg bg-slate-800/70 px-3">
                    <span className="text-slate-400 mr-2">$</span>
                    <input
                        id="recipientIncome"
                        type="number"
                        min="0"
                        inputMode="decimal"
                        onWheel={e => e.currentTarget.blur()}
                        className="w-full bg-transparent py-2 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/70"
                        placeholder="55,000"
                        value={inputs.recipientIncome}
                        onChange={e => onInputChange('recipientIncome', e.target.value)}
                        aria-describedby={errors.recipientIncome ? 'recipientIncome-error' : undefined}
                    />
                </div>
                <ErrorText id="recipientIncome-error" message={errors.recipientIncome} />
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
                <InputLabel label="Recipient Age" hint="For Rule of 65 check" htmlFor="recipientAge" />
                <input
                    id="recipientAge"
                    type="number"
                    min="16"
                    max="120"
                    onWheel={e => e.currentTarget.blur()}
                    className="w-full bg-slate-800/70 rounded-lg px-3 py-2 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/70"
                    placeholder="e.g., 42"
                    value={inputs.recipientAge}
                    onChange={e => onInputChange('recipientAge', e.target.value)}
                    aria-describedby={errors.recipientAge ? 'recipientAge-error' : undefined}
                />
                <ErrorText id="recipientAge-error" message={errors.recipientAge} />
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
                <InputLabel label="Number of Children" htmlFor="numChildren" />
                <input
                    id="numChildren"
                    type="number"
                    min="0"
                    onWheel={e => e.currentTarget.blur()}
                    className="w-full bg-slate-800/70 rounded-lg px-3 py-2 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/70"
                    placeholder="0"
                    value={inputs.numChildren}
                    onChange={e => handleNumChildrenChange(e.target.value)}
                    aria-describedby={errors.numChildren ? 'numChildren-error' : undefined}
                />
                <ErrorText id="numChildren-error" message={errors.numChildren} />
            </div>
        </div>
    );

    const renderChildSection = () => {
        if (!childInputs.length) return null;
        return (
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-3">
                <InputLabel label="Child Ages" hint="In years" />
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {childInputs.map((_, idx) => (
                        <div key={idx} className="flex flex-col">
                            <input
                                id={`childAge-${idx}`}
                                type="number"
                                min="0"
                                max="25"
                                onWheel={e => e.currentTarget.blur()}
                                className="w-full bg-slate-800/70 rounded-lg px-3 py-2 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/70"
                                placeholder={`Child ${idx + 1}`}
                                value={inputs.childAges[idx] || ''}
                                onChange={e => onChildAgeChange(idx, e.target.value)}
                                aria-describedby={errors[`childAge_${idx}`] ? `childAge-${idx}-error` : undefined}
                            />
                            <ErrorText id={`childAge-${idx}-error`} message={errors[`childAge_${idx}`]} />
                        </div>
                    ))}
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-800">
                        <InputLabel
                            label="Parenting Arrangement"
                            tooltip="Determines whether base, shared, or split child support applies."
                        />
                        <select
                            className="w-full bg-slate-900/70 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/70"
                            value={inputs.parentingType}
                            onChange={e => onInputChange('parentingType', e.target.value)}
                        >
                            <option value="primary">Primary Parenting Time (Recipient primary)</option>
                            <option value="shared">Shared Parenting (40-60%)</option>
                            <option value="split">Split Parenting (children split between parents)</option>
                        </select>
                    </div>

                    <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-800">
                        <InputLabel
                            label="Parenting Time %"
                            hint="Enter each parent’s share"
                            tooltip="Parenting time percentages affect the support direction and any set-off."
                        />
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs text-slate-400 mb-1" htmlFor="payorParentingTime">
                                    Payor (%)
                                </label>
                                <input
                                    id="payorParentingTime"
                                    type="number"
                                    min="0"
                                    max="100"
                                    className="w-full bg-slate-900/70 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/70"
                                    value={inputs.payorParentingTime}
                                    onChange={e => onInputChange('payorParentingTime', e.target.value)}
                                    onWheel={e => e.currentTarget.blur()}
                                />
                                <ErrorText id="payorParentingTime-error" message={errors.payorParentingTime} />
                            </div>
                            <div>
                                <label className="block text-xs text-slate-400 mb-1" htmlFor="recipientParentingTime">
                                    Recipient (%)
                                </label>
                                <input
                                    id="recipientParentingTime"
                                    type="number"
                                    min="0"
                                    max="100"
                                    className="w-full bg-slate-900/70 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/70"
                                    value={inputs.recipientParentingTime}
                                    onChange={e => onInputChange('recipientParentingTime', e.target.value)}
                                    onWheel={e => e.currentTarget.blur()}
                                />
                                <ErrorText id="recipientParentingTime-error" message={errors.recipientParentingTime} />
                            </div>
                        </div>
                        <ErrorText id="sharedPercentage-error" message={errors.sharedPercentage} />
                    </div>
                </div>
            </div>
        );
    };

    const renderSpecialExpenses = () => (
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-3">
            <InputLabel label="Section 7 Special Expenses" hint="Optional" />
            <div className="grid md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-xs text-slate-400 mb-1" htmlFor="specialExpenseChildcare">
                        Childcare
                    </label>
                    <input
                        id="specialExpenseChildcare"
                        type="number"
                        min="0"
                        step="100"
                        className="w-full bg-slate-800/70 rounded-lg px-3 py-2 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/70"
                        placeholder="0"
                        value={inputs.specialExpenseChildcare}
                        onChange={e => onInputChange('specialExpenseChildcare', e.target.value)}
                        onWheel={e => e.currentTarget.blur()}
                    />
                    <ErrorText message={errors.specialExpenseChildcare} />
                </div>
                <div>
                    <label className="block text-xs text-slate-400 mb-1" htmlFor="specialExpenseEducation">
                        Education
                    </label>
                    <input
                        id="specialExpenseEducation"
                        type="number"
                        min="0"
                        step="100"
                        className="w-full bg-slate-800/70 rounded-lg px-3 py-2 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/70"
                        placeholder="0"
                        value={inputs.specialExpenseEducation}
                        onChange={e => onInputChange('specialExpenseEducation', e.target.value)}
                        onWheel={e => e.currentTarget.blur()}
                    />
                    <ErrorText message={errors.specialExpenseEducation} />
                </div>
                <div>
                    <label className="block text-xs text-slate-400 mb-1" htmlFor="specialExpenseHealth">
                        Health
                    </label>
                    <input
                        id="specialExpenseHealth"
                        type="number"
                        min="0"
                        step="100"
                        className="w-full bg-slate-800/70 rounded-lg px-3 py-2 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/70"
                        placeholder="0"
                        value={inputs.specialExpenseHealth}
                        onChange={e => onInputChange('specialExpenseHealth', e.target.value)}
                        onWheel={e => e.currentTarget.blur()}
                    />
                    <ErrorText message={errors.specialExpenseHealth} />
                </div>
            </div>
            <p className="text-xs text-slate-400">
                Section 7 expenses are proportionately shared based on each parent&apos;s net income.
            </p>
        </div>
    );

    const renderDateSection = () => (
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-3">
                <InputLabel label="Key Dates" />
                <div className="grid md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-xs text-slate-400 mb-1" htmlFor="dateOfCohabitation">
                        Cohabitation (optional)
                    </label>
                    <input
                        id="dateOfCohabitation"
                        type="date"
                        className="w-full bg-slate-800/70 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/70"
                        value={inputs.dateOfCohabitation}
                        onChange={e => onInputChange('dateOfCohabitation', e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-xs text-slate-400 mb-1" htmlFor="dateOfMarriage">
                        Marriage (optional)
                    </label>
                    <input
                        id="dateOfMarriage"
                        type="date"
                        className="w-full bg-slate-800/70 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/70"
                        value={inputs.dateOfMarriage}
                        onChange={e => onInputChange('dateOfMarriage', e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-xs text-slate-400 mb-1" htmlFor="dateOfSeparation">
                        Separation (required)
                    </label>
                    <input
                        id="dateOfSeparation"
                        type="date"
                        className="w-full bg-slate-800/70 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/70"
                        value={inputs.dateOfSeparation}
                        onChange={e => onInputChange('dateOfSeparation', e.target.value)}
                    />
                    <ErrorText id="dateOfSeparation-error" message={errors.dateOfSeparation || errors.dates} />
                </div>
            </div>
            {renderSpecialExpenses()}
            {errors.dates && !errors.dateOfSeparation && (
                <ErrorText id="dates-error" message={errors.dates} />
            )}
        </div>
    );

    const renderJurisdictionSection = () => (
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-3">
            <InputLabel label="Jurisdiction (Province/State)" htmlFor="jurisdiction" />
            <input
                id="jurisdiction"
                type="text"
                className="w-full bg-slate-800/70 rounded-lg px-3 py-2 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/70"
                placeholder="e.g., Ontario"
                value={inputs.jurisdiction || ''}
                onChange={e => updateJurisdiction(e.target.value)}
            />
        </div>
    );

    return (
        <div className="bg-slate-900/60 backdrop-blur-sm rounded-2xl shadow-xl border border-yellow-400/20 p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-amber-200 font-semibold">Inputs</p>
                    <h2 className="text-2xl md:text-3xl font-bold text-white font-serif">Case Details</h2>
                </div>
                <span className="text-xs text-amber-200/70">Canadian family law oriented</span>
            </div>

            {renderIncomeFields()}
            {renderChildSection()}
            {renderDateSection()}
            {renderJurisdictionSection()}

            <div className="pt-2 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                <p className="text-sm text-slate-300">
                    Calculator uses simplified guidelines; consult counsel for formal advice.
                </p>
                <button
                    onClick={onCalculate}
                    className="inline-flex items-center justify-center px-6 py-3 bg-yellow-400 text-slate-950 font-semibold rounded-xl shadow-lg shadow-yellow-400/30 hover:shadow-yellow-400/50 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 focus:ring-offset-slate-900"
                >
                    Run Calculation
                </button>
            </div>
        </div>
    );
};

export default CalculatorForm;
