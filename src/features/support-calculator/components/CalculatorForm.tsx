import React from 'react';

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
                            defaultValue="95000"
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
                            defaultValue="55000"
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
                        defaultValue="42"
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
                        defaultValue="2"
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
                        defaultValue="6"
                        readOnly
                    />
                    <input
                        type="number"
                        className="w-full bg-slate-800/70 rounded-lg px-3 py-2 text-white placeholder:text-slate-500 focus:outline-none"
                        defaultValue="9"
                        readOnly
                    />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-800">
                        <label className="text-xs text-slate-400 mb-1 block">Parenting Arrangement</label>
                        <select className="w-full bg-slate-900/70 rounded-lg px-3 py-2 text-white" disabled>
                            <option>Shared Parenting (40-60%)</option>
                        </select>
                    </div>
                    <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-800">
                        <label className="text-xs text-slate-400 mb-1 block">Parenting Time %</label>
                        <div className="grid grid-cols-2 gap-3">
                            <input
                                type="number"
                                className="w-full bg-slate-900/70 rounded-lg px-3 py-2 text-white"
                                defaultValue="50"
                                readOnly
                            />
                            <input
                                type="number"
                                className="w-full bg-slate-900/70 rounded-lg px-3 py-2 text-white"
                                defaultValue="50"
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
                        defaultValue="350"
                        readOnly
                    />
                    <input
                        type="number"
                        className="w-full bg-slate-800/70 rounded-lg px-3 py-2 text-white"
                        placeholder="Medical"
                        defaultValue="120"
                        readOnly
                    />
                    <input
                        type="number"
                        className="w-full bg-slate-800/70 rounded-lg px-3 py-2 text-white"
                        placeholder="School"
                        defaultValue="80"
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
