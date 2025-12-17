import { FormEvent, useState } from 'react';
import { useEmailBuddy } from './useEmailBuddy';

export function EmailBuddyPage() {
    const [rawEmail, setRawEmail] = useState('');
    const [jurisdiction, setJurisdiction] = useState('Ontario');
    const { analyze, result, loading, error, reset } = useEmailBuddy();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await analyze({ rawEmail, jurisdiction });
    };

    return (
        <div className="mx-auto max-w-4xl px-4 py-8 space-y-8">
            <header className="space-y-2">
                <h1 className="text-2xl font-bold text-slate-900">Email Law Buddy</h1>
                <p className="text-sm text-slate-600">
                    Paste a high-conflict email and get BIFF and Grey Rock response drafts, plus notes on how it may look in court.
                </p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex gap-3">
                    <select
                        value={jurisdiction}
                        onChange={e => setJurisdiction(e.target.value)}
                        className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
                    >
                        <option>Ontario</option>
                        <option>British Columbia</option>
                        <option>Alberta</option>
                    </select>
                </div>

                <textarea
                    value={rawEmail}
                    onChange={e => setRawEmail(e.target.value)}
                    placeholder="Paste the other parent's email here..."
                    className="h-56 w-full rounded-lg border border-slate-300 p-4 text-sm leading-relaxed focus:border-amber-500 focus:ring-2 focus:ring-amber-500"
                    disabled={loading}
                />

                <button
                    type="submit"
                    disabled={loading || !rawEmail.trim()}
                    className="w-full rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-700 disabled:opacity-60"
                >
                    {loading ? 'Analyzing email…' : 'Generate BIFF & Grey Rock Replies'}
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
                        <h2 className="text-base font-semibold text-slate-900">Tone & Demands</h2>
                        <p className="mt-1 text-sm text-slate-800">
                            <span className="font-medium">Detected tone:</span> {result.originalTone}
                        </p>

                        {result.keyDemands.length > 0 && (
                            <div className="mt-3">
                                <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    Key Demands
                                </h3>
                                <ul className="mt-1 space-y-1 text-sm text-slate-800">
                                    {result.keyDemands.map((d, i) => (
                                        <li key={i}>• {d}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {result.riskFlags.length > 0 && (
                            <div className="mt-3">
                                <h3 className="text-xs font-semibold uppercase tracking-wide text-red-500">
                                    Risk Flags
                                </h3>
                                <ul className="mt-1 space-y-1 text-sm text-red-700">
                                    {result.riskFlags.map((f, i) => (
                                        <li key={i}>• {f}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <h3 className="mb-2 text-sm font-semibold text-slate-900">BIFF Draft</h3>
                            <div className="rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-900 whitespace-pre-wrap">
                                {result.biffReply}
                            </div>
                        </div>
                        <div>
                            <h3 className="mb-2 text-sm font-semibold text-slate-900">Grey Rock Draft</h3>
                            <div className="rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-900 whitespace-pre-wrap">
                                {result.greyRockReply}
                            </div>
                        </div>
                    </div>

                    {result.notesForCourt.length > 0 && (
                        <div>
                            <h3 className="mb-2 text-sm font-semibold text-slate-900">Notes for Court</h3>
                            <ul className="space-y-1 text-xs text-slate-700">
                                {result.notesForCourt.map((n, i) => (
                                    <li key={i}>• {n}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <button
                        type="button"
                        onClick={reset}
                        className="text-xs font-medium text-slate-500 hover:text-slate-700"
                    >
                        Analyze another email
                    </button>
                </section>
            )}
        </div>
    );
}

export default EmailBuddyPage;
