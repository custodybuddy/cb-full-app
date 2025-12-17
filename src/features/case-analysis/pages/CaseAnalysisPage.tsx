import { FormEvent, useState } from 'react';
import { useCaseAnalysis } from '../useCaseAnalysis';

export function CaseAnalysisPage() {
    const [jurisdiction, setJurisdiction] = useState('Ontario');
    const [mainText, setMainText] = useState('');
    const [secondaryText, setSecondaryText] = useState('');
    const { analyze, result, loading, error, reset } = useCaseAnalysis();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await analyze({
            jurisdiction,
            mainText,
            secondaryText: secondaryText.trim() || undefined,
        });
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white pt-28 md:pt-32">
            <div className="mx-auto max-w-[1120px] px-4 pb-12 space-y-8">
                <header className="text-center">
                    <h1 className="text-3xl font-black tracking-tight text-white md:text-4xl">
                        Case <span className="text-amber-400">Analysis</span> Tool
                    </h1>
                    <p className="text-sm text-slate-300 md:text-base max-w-2xl mx-auto">
                        Paste text from your court order, agreement, or parenting plan. CustodyBuddy will highlight obligations, deadlines, and potential conflicts.
                    </p>
                    <div className="mt-6 flex justify-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
                        <a href="/incident-report" className="hover:text-white-400 transition">
                            Report Incident
                        </a>
                        <span>•</span>
                        <a href="/email-buddy" className="hover:text-white-400 transition">
                            Email Law Buddy
                        </a>
                        <span>•</span>
                        <a href="/support-calculator" className="hover:text-white-400 transition">
                            Support Calculator
                        </a>
                    </div>
                </header>

                <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl shadow-black/20">
                    <div className="flex flex-wrap gap-3">
                        <select
                            value={jurisdiction}
                            onChange={e => setJurisdiction(e.target.value)}
                            className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white focus:border-amber-400 focus:ring-2 focus:ring-amber-500"
                        >
                            <option>Ontario</option>
                            <option>British Columbia</option>
                            <option>Alberta</option>
                        </select>
                    </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-100">
                        Main document text
                    </label>
                    <textarea
                        value={mainText}
                        onChange={e => setMainText(e.target.value)}
                        placeholder="Paste the text of your court order, agreement, or parenting plan..."
                        className="h-56 w-full rounded-lg border border-slate-700 bg-slate-950 p-4 text-sm leading-relaxed text-slate-100 focus:border-amber-400 focus:ring-2 focus:ring-amber-500"
                        disabled={loading}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-100">
                        Related document text (optional)
                    </label>
                    <textarea
                        value={secondaryText}
                        onChange={e => setSecondaryText(e.target.value)}
                        placeholder="Paste a second document if you want conflicts or inconsistencies highlighted (e.g., older order, side agreement)."
                        className="h-40 w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-xs leading-relaxed text-slate-100 focus:border-amber-400 focus:ring-2 focus:ring-amber-400"
                        disabled={loading}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading || !mainText.trim()}
                    className="w-full rounded-lg bg-amber-500 px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-amber-400 disabled:opacity-60"
                >
                    {loading ? 'Analyzing documents…' : 'Analyze Case Documents'}
                </button>
                </form>

            {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                    {error}
                </div>
            )}

            {result && (
                <section className="space-y-6 rounded-xl border border-slate-200 bg-slate-50 p-6">
                    <div>
                        <h2 className="text-base font-semibold text-slate-900">Overview</h2>
                        <p className="mt-1 text-sm text-slate-900 leading-relaxed">
                            {result.overview}
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <h3 className="mb-2 text-sm font-semibold text-slate-900">Obligations</h3>
                            <ul className="space-y-1 text-sm text-slate-800">
                                {result.obligations.map((o, i) => (
                                    <li key={i}>• {o}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="mb-2 text-sm font-semibold text-slate-900">Deadlines & Timeframes</h3>
                            <ul className="space-y-1 text-sm text-slate-800">
                                {result.deadlines.map((d, i) => (
                                    <li key={i}>• {d}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {result.conflicts.length > 0 && (
                        <div>
                            <h3 className="mb-2 text-sm font-semibold text-red-700">Conflicts / Ambiguities</h3>
                            <ul className="space-y-1 text-sm text-red-700">
                                {result.conflicts.map((c, i) => (
                                    <li key={i}>• {c}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <h3 className="mb-2 text-sm font-semibold text-slate-900">Action Items</h3>
                            <ul className="space-y-1 text-sm text-slate-800">
                                {result.actionItems.map((a, i) => (
                                    <li key={i}>• {a}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="mb-2 text-sm font-semibold text-slate-900">Notes for Lawyer</h3>
                            <ul className="space-y-1 text-sm text-slate-800">
                                {result.notesForLawyer.map((n, i) => (
                                    <li key={i}>• {n}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={reset}
                        className="text-xs font-medium text-slate-500 hover:text-slate-700"
                    >
                        Analyze other documents
                    </button>
                </section>
            )}
            </div>
        </div>
    );
}

export default CaseAnalysisPage;
