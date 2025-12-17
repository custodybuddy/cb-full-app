import React from 'react';
import { CalculatorInputs } from '@/types';

interface CalculatorFormProps {
    inputs: CalculatorInputs;
    errors: Record<string, string>;
    onInputChange: (field: keyof CalculatorInputs, value: unknown) => void;
    onChildAgeChange: (index: number, value: string) => void;
    onCalculate: () => unknown;
}

const PARENTING_OPTIONS = [
    { label: 'Primary Residence', value: 'primary' },
    { label: 'Shared (40-60%)', value: 'shared' },
    { label: 'Split', value: 'split' },
];

const CalculatorForm: React.FC<CalculatorFormProps> = ({ inputs, errors, onInputChange, onChildAgeChange, onCalculate }) => {
    return (
        <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
                    <label className="text-sm font-semibold text-white mb-1 block" htmlFor="payorIncome">
                        Payor Gross Income
                    </label>
                    <div className="flex items-center rounded-lg bg-slate-800/70 px-3">
                        <span className="text-slate-400 mr-2">$</span>
                        <input
                            id="payorIncome"
                            type="number"
                            className="w-full bg-transparent py-2 text-white placeholder:text-slate-500 focus:outline-none"
                            value={inputs.payorIncome}
                            onChange={e => onInputChange('payorIncome', e.target.value)}
                        />
                    </div>
                </div>

                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
                    <label className="text-sm font-semibold text-white mb-1 block" htmlFor="recipientIncome">
                        Recipient Gross Income
                    </label>
                    <div className="flex items-center rounded-lg bg-slate-800/70 px-3">
                        <span className="text-slate-400 mr-2">$</span>
                        <input
                            id="recipientIncome"
                            type="number"
                            className="w-full bg-transparent py-2 text-white placeholder:text-slate-500 focus:outline-none"
                            value={inputs.recipientIncome}
                            onChange={e => onInputChange('recipientIncome', e.target.value)}
                        />
                    </div>
                </div>

                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
                    <label className="text-sm font-semibold text-white mb-1 block" htmlFor="recipientAge">
                        Recipient Age
                    </label>
                        <input
                            id="recipientAge"
                            type="number"
                            className="w-full bg-slate-800/70 rounded-lg px-3 py-2 text-white placeholder:text-slate-500 focus:outline-none"
                            value={inputs.recipientAge}
                            onChange={e => onInputChange('recipientAge', e.target.value)}
                        />
                </div>

                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
                    <label className="text-sm font-semibold text-white mb-1 block" htmlFor="numChildren">
                        Number of Children
                    </label>
                        <input
                            id="numChildren"
                            type="number"
                            className="w-full bg-slate-800/70 rounded-lg px-3 py-2 text-white placeholder:text-slate-500 focus:outline-none"
                            value={inputs.numChildren}
                            onChange={e => onInputChange('numChildren', e.target.value)}
                        />
                </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-3">
                <p className="text-sm font-semibold text-white">Child Ages</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {inputs.childAges.map((age, idx) => (
                        <input
                            key={idx}
                            type="number"
                            className="w-full bg-slate-800/70 rounded-lg px-3 py-2 text-white placeholder:text-slate-500 focus:outline-none"
                            value={age}
                            onChange={e => onChildAgeChange(idx, e.target.value)}
                        />
                    ))}
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-800">
                        <label className="text-xs text-white mb-1 block">Parenting Arrangement</label>
                        <select
                            className="w-full bg-slate-900/70 rounded-lg px-3 py-2 text-white"
                            value={inputs.parentingType}
                            onChange={e => onInputChange('parentingType', e.target.value)}
                        >
                            {PARENTING_OPTIONS.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-800">
                        <label className="text-xs text-white mb-1 block">Parenting Time %</label>
                        <div className="grid grid-cols-2 gap-3">
                            <input
                                type="number"
                                className="w-full bg-slate-900/70 rounded-lg px-3 py-2 text-white"
                                value={inputs.payorParentingTime}
                                onChange={e => onInputChange('payorParentingTime', e.target.value)}
                            />
                            <input
                                type="number"
                                className="w-full bg-slate-900/70 rounded-lg px-3 py-2 text-white"
                                value={inputs.recipientParentingTime}
                                onChange={e => onInputChange('recipientParentingTime', e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-3">
                <p className="text-sm font-semibold text-white">Section 7 Special Expenses (Monthly)</p>
                <div className="grid md:grid-cols-3 gap-4">
                    <input
                        type="number"
                        className="w-full bg-slate-800/70 rounded-lg px-3 py-2 text-white"
                        placeholder="Childcare"
                        value={inputs.specialExpenseChildcare}
                        onChange={e => onInputChange('specialExpenseChildcare', e.target.value)}
                    />
                    <input
                        type="number"
                        className="w-full bg-slate-800/70 rounded-lg px-3 py-2 text-white"
                        placeholder="Medical"
                        value={inputs.specialExpenseHealth}
                        onChange={e => onInputChange('specialExpenseHealth', e.target.value)}
                    />
                    <input
                        type="number"
                        className="w-full bg-slate-800/70 rounded-lg px-3 py-2 text-white"
                        placeholder="School"
                        value={inputs.specialExpenseEducation}
                        onChange={e => onInputChange('specialExpenseEducation', e.target.value)}
                    />
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={() => onCalculate()}
                    className="inline-flex items-center justify-center bg-yellow-400 text-slate-950 font-bold py-2 px-6 rounded-full shadow-lg transition-all duration-200 ease-out"
                >
                    Run Calculation
                </button>
            </div>
        </form>
    );
};

export default CalculatorForm;
