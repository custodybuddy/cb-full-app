import React from 'react';

const DEFAULT_FORM_VALUES = {
    payorIncome: 95000,
    recipientIncome: 55000,
    recipientAge: 42,
    numChildren: 2,
    childAges: [6, 9],
    parentingTime: { payor: 50, recipient: 50 },
    section7: {
        childcare: 350,
        medical: 120,
        school: 80,
    },
} as const;

const PARENTING_ARRANGEMENT = 'Shared Parenting (40-60%)';

const CalculatorForm: React.FC = () => {
    return (
        <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
                    <label className="text-sm font-semibold text-slate-200 mb-1 block" htmlFor="payorIncome">
                        Payor Gross Income
                    </label>
                    <div className="flex items-center rounded-lg bg-slate-800/70 px-3">
                        <span className="text-slate-400 mr-2">$</span>
                        <input
                            id="payorIncome"
                            type="number"
                            className="w-full bg-transparent py-2 text-white placeholder:text-slate-500 focus:outline-none"
                            defaultValue={DEFAULT_FORM_VALUES.payorIncome}
                            readOnly
                        />
                    </div>
                </div>

                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
                    <label className="text-sm font-semibold text-slate-200 mb-1 block" htmlFor="recipientIncome">
                        Recipient Gross Income
                    </label>
                    <div className="flex items-center rounded-lg bg-slate-800/70 px-3">
                        <span className="text-slate-400 mr-2">$</span>
                        <input
                            id="recipientIncome"
                            type="number"
                            className="w-full bg-transparent py-2 text-white placeholder:text-slate-500 focus:outline-none"
                            defaultValue={DEFAULT_FORM_VALUES.recipientIncome}
                            readOnly
                        />
                    </div>
                </div>

                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
                    <label className="text-sm font-semibold text-slate-200 mb-1 block" htmlFor="recipientAge">
                        Recipient Age
                    </label>
                        <input
                            id="recipientAge"
                            type="number"
                            className="w-full bg-slate-800/70 rounded-lg px-3 py-2 text-white placeholder:text-slate-500 focus:outline-none"
                            defaultValue={DEFAULT_FORM_VALUES.recipientAge}
                            readOnly
                        />
                </div>

                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
                    <label className="text-sm font-semibold text-slate-200 mb-1 block" htmlFor="numChildren">
                        Number of Children
                    </label>
                        <input
                            id="numChildren"
                            type="number"
                            className="w-full bg-slate-800/70 rounded-lg px-3 py-2 text-white placeholder:text-slate-500 focus:outline-none"
                            defaultValue={DEFAULT_FORM_VALUES.numChildren}
                            readOnly
                        />
                </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-3">
                <p className="text-sm font-semibold text-slate-200">Child Ages</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <input
                        type="number"
                        className="w-full bg-slate-800/70 rounded-lg px-3 py-2 text-white placeholder:text-slate-500 focus:outline-none"
                        defaultValue={DEFAULT_FORM_VALUES.childAges[0]}
                        readOnly
                    />
                    <input
                        type="number"
                        className="w-full bg-slate-800/70 rounded-lg px-3 py-2 text-white placeholder:text-slate-500 focus:outline-none"
                        defaultValue={DEFAULT_FORM_VALUES.childAges[1]}
                        readOnly
                    />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-800">
                        <label className="text-xs text-slate-400 mb-1 block">Parenting Arrangement</label>
                        <select className="w-full bg-slate-900/70 rounded-lg px-3 py-2 text-white" disabled>
                            <option>{PARENTING_ARRANGEMENT}</option>
                        </select>
                    </div>
                    <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-800">
                        <label className="text-xs text-slate-400 mb-1 block">Parenting Time %</label>
                        <div className="grid grid-cols-2 gap-3">
                            <input
                                type="number"
                                className="w-full bg-slate-900/70 rounded-lg px-3 py-2 text-white"
                                defaultValue={DEFAULT_FORM_VALUES.parentingTime.payor}
                                readOnly
                            />
                            <input
                                type="number"
                                className="w-full bg-slate-900/70 rounded-lg px-3 py-2 text-white"
                                defaultValue={DEFAULT_FORM_VALUES.parentingTime.recipient}
                                readOnly
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-3">
                <p className="text-sm font-semibold text-slate-200">Section 7 Special Expenses (Monthly)</p>
                <div className="grid md:grid-cols-3 gap-4">
                    <input
                        type="number"
                        className="w-full bg-slate-800/70 rounded-lg px-3 py-2 text-white"
                        placeholder="Childcare"
                        defaultValue={DEFAULT_FORM_VALUES.section7.childcare}
                        readOnly
                    />
                    <input
                        type="number"
                        className="w-full bg-slate-800/70 rounded-lg px-3 py-2 text-white"
                        placeholder="Medical"
                        defaultValue={DEFAULT_FORM_VALUES.section7.medical}
                        readOnly
                    />
                    <input
                        type="number"
                        className="w-full bg-slate-800/70 rounded-lg px-3 py-2 text-white"
                        placeholder="School"
                        defaultValue={DEFAULT_FORM_VALUES.section7.school}
                        readOnly
                    />
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    type="button"
                    disabled
                    className="inline-flex items-center justify-center bg-yellow-400 text-slate-950 font-bold py-2 px-6 rounded-full shadow-lg transition-all duration-200 ease-out disabled:opacity-50"
                >
                    Run Calculation
                </button>
            </div>
        </form>
    );
};

export default CalculatorForm;
