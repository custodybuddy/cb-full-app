import { FormEvent, useMemo, useState } from 'react';
import { useIncidentAnalysis } from './useIncidentAnalysis';
import { ReportResult } from './ReportResult';
import type { ReactNode } from 'react';

const JURISDICTIONS = [
    'Ontario',
    'British Columbia',
    'Alberta',
    'California',
    'Texas',
    'New York',
] as const;

const INTRO_LINES: ReactNode = (
    <>
        Capture the facts, context, and tone in one place. CustodyBuddy formats your narrative
        into objective documentation with clear action steps.
    </>
);

const IncidentReportPage = () => {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [parties, setParties] = useState('');
    const [jurisdiction, setJurisdiction] = useState('Ontario');
    const [narrative, setNarrative] = useState('');

    const { runAnalysis, result, loading, error, reset } = useIncidentAnalysis();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await runAnalysis({ date, time, location, parties, jurisdiction, narrative });
    };

    const jurisdictionOptions = useMemo(() => JURISDICTIONS, []);

    return (
        <div className="min-h-screen bg-slate-950 text-white pt-28 md:pt-32">
            <div className="mx-auto flex max-w-[1120px] flex-col gap-10 px-4 pb-12">
                <header className="space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-400">
                        Catch Them Red-Handed
                    </p>
                    <h1 className="text-3xl font-black tracking-tight text-white md:text-4xl">
                        Turn <span className="text-amber-400">chaos</span> into{' '}
                        <span className="text-amber-400">court-ready</span> incident reports.
                    </h1>
                    <p className="mx-auto text-center max-w-2xl text-sm text-slate-300 md:text-base">
                        {INTRO_LINES}
                    </p>
                </header>

                <div className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl shadow-black/20"
                    >
                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-200">
                                    Date
                                </label>
                                <input
                                    type="date"
                                    value={date}
                                    onChange={event => setDate(event.target.value)}
                                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                                    required
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-200">
                                    Time (optional)
                                </label>
                                <input
                                    type="time"
                                    value={time}
                                    onChange={event => setTime(event.target.value)}
                                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                                />
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-200">
                                    Location
                                </label>
                                <input
                                    type="text"
                                    value={location}
                                    onChange={event => setLocation(event.target.value)}
                                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                                    placeholder="City, exchange point, etc."
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-200">
                                    Parties involved
                                </label>
                                <input
                                    type="text"
                                    value={parties}
                                    onChange={event => setParties(event.target.value)}
                                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                                    placeholder="Ex-partner, witness, etc."
                                />
                            </div>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-200">
                                Jurisdiction
                            </label>
                            <select
                                value={jurisdiction}
                                onChange={event => setJurisdiction(event.target.value)}
                                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                            >
                                {jurisdictionOptions.map(option => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-200">
                                Incident narrative
                            </label>
                            <textarea
                                value={narrative}
                                onChange={event => setNarrative(event.target.value)}
                                className="h-40 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                                placeholder="Describe what happened objectively..."
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                            <button
                                type="submit"
                                disabled={loading || !narrative || !date}
                                className="w-full rounded-lg bg-amber-500 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                            >
                                {loading ? 'Analyzing incident…' : 'Generate Court-Ready Report'}
                            </button>
                            <p className="text-xs text-slate-400">
                                We never store incidents. Use objective, factual language.
                            </p>
                        </div>
                    </form>

                    <div className="space-y-4">
                        {error && (
                            <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                                {error}
                            </div>
                        )}

                        {result ? (
                            <ReportResult result={result} onReset={reset} />
                        ) : (
                            <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-sm text-slate-300 shadow-xl shadow-black/20">
                                <h2 className="text-lg font-semibold text-white">
                                    What you will get
                                </h2>
                                <ul className="mt-4 space-y-3">
                                    <li className="flex gap-3">
                                        <span className="mt-1 h-2 w-2 rounded-full bg-amber-400" />
                                        <span>Objective summary with severity rating.</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="mt-1 h-2 w-2 rounded-full bg-amber-400" />
                                        <span>Action items and legal notes customized to your jurisdiction.</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="mt-1 h-2 w-2 rounded-full bg-amber-400" />
                                        <span>Optional citations and references for follow-up.</span>
                                    </li>
                                </ul>
                            </section>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IncidentReportPage;
