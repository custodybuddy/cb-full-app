import { FormEvent, useMemo, useState } from 'react';
import { ReportResult } from './ReportResult';
import { useIncidentAnalysis } from './useIncidentAnalysis';

const JURISDICTIONS = [
    'Ontario',
    'British Columbia',
    'Alberta',
    'California',
    'Texas',
    'New York',
] as const;

type IncidentAnalyzerProps = {
    className?: string;
};

export function IncidentAnalyzer({ className = '' }: IncidentAnalyzerProps) {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [parties, setParties] = useState('');
    const [jurisdiction, setJurisdiction] = useState<string>(JURISDICTIONS[0]);
    const [narrative, setNarrative] = useState('');

    const { runAnalysis, result, loading, error, reset } = useIncidentAnalysis();

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        await runAnalysis({ date, time, location, parties, jurisdiction, narrative });
    };

    const handleReset = () => {
        reset();
        setDate('');
        setTime('');
        setLocation('');
        setParties('');
        setNarrative('');
        setJurisdiction(JURISDICTIONS[0]);
    };

    const jurisdictionOptions = useMemo(() => JURISDICTIONS, []);

    return (
        <div
            className={`space-y-5 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-black/25 ${className}`}
        >
            <form onSubmit={handleSubmit} className="space-y-4">
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
                        className="h-36 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                        placeholder="Describe what happened objectively..."
                        required
                        disabled={loading}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading || !date || !narrative}
                    className="w-full rounded-lg bg-amber-500 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                    {loading ? 'Analyzing incident…' : 'Generate Court-Ready Report'}
                </button>
            </form>

            {error && (
                <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                    {error}
                </div>
            )}

            {result ? (
                <ReportResult result={result} onReset={handleReset} />
            ) : (
                <section className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 text-sm text-slate-300">
                    <h3 className="text-base font-semibold text-white">What you will get</h3>
                    <ul className="mt-3 space-y-2">
                        <li className="flex gap-3">
                            <span className="mt-1 h-2 w-2 rounded-full bg-amber-400" />
                            <span>Objective summary with severity rating.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="mt-1 h-2 w-2 rounded-full bg-amber-400" />
                            <span>Action items and legal notes tailored to your jurisdiction.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="mt-1 h-2 w-2 rounded-full bg-amber-400" />
                            <span>Optional citations and references for follow-up.</span>
                        </li>
                    </ul>
                </section>
            )}
        </div>
    );
}
