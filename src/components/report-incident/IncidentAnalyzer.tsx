import { useState } from 'react';
import { useIncidentAnalysis } from '@/features/incident-report/useIncidentAnalysis';
import { buildIncidentPrompt } from '@/utils/incident';

export function IncidentAnalyzer() {
    const [narrative, setNarrative] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [jurisdiction, setJurisdiction] = useState('Ontario');

    const { runAnalysis, result, loading, error } = useIncidentAnalysis();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await runAnalysis({
            date,
            location,
            narrative,
            jurisdiction,
        });
    };

    return (
        <div className="max-w-2xl mx-auto p-6 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Incident Date
                    </label>
                    <input
                        type="date"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                        required
                    />
                </div>

                <textarea
                    value={narrative}
                    onChange={e => setNarrative(e.target.value)}
                    placeholder="Describe what happened objectively..."
                    className="w-full p-4 border border-slate-300 rounded-lg h-40 focus:ring-2 focus:ring-amber-500"
                    required
                    disabled={loading}
                />

                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        value={location}
                        onChange={e => setLocation(e.target.value)}
                        placeholder="Location"
                        className="p-3 border border-slate-300 rounded-lg"
                    />
                    <select
                        value={jurisdiction}
                        onChange={e => setJurisdiction(e.target.value)}
                        className="p-3 border border-slate-300 rounded-lg"
                    >
                        <option>Ontario</option>
                        <option>British Columbia</option>
                        <option>Alberta</option>
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={loading || !narrative}
                    className="w-full bg-amber-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-amber-700 disabled:opacity-50"
                >
                    {loading ? 'Analyzing...' : 'Generate Court-Ready Report'}
                </button>
            </form>

            {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                    {error}
                </div>
            )}

            {result && (
                <div className="space-y-4 p-6 bg-slate-50 rounded-xl border">
                    <h3 className="text-xl font-bold text-slate-900">Analysis Complete</h3>

                    {result.severity && (
                        <div className="p-3 bg-amber-100 rounded-lg">
                            <strong>Severity:</strong> {result.severity}
                        </div>
                    )}

                    <div className="prose max-w-none">
                        <p className="text-lg leading-relaxed">{result.summary}</p>
                    </div>

                    {result?.citations && result.citations.length > 0 && (
                        <div className="mt-4 p-4 bg-slate-100 rounded-lg">
                            <h4 className="font-semibold mb-3 text-slate-900">
                                Sources
                            </h4>
                            <div className="space-y-2">
                                {result.citations.map((citation, i) => (
                                    <div
                                        key={i}
                                        className="text-sm border-l-4 border-amber-400 pl-3"
                                    >
                                        <div className="font-medium text-slate-900">
                                            {citation.claim}
                                        </div>
                                        <a
                                            href={citation.source.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-amber-700 hover:underline font-medium"
                                        >
                                            {citation.source.title}
                                        </a>
                                        <p className="text-slate-600 mt-1 text-xs">
                                            {citation.source.snippet}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-semibold text-slate-900 mb-2">Action Items</h4>
                            <ul className="space-y-1 text-sm">
                                {result.actionItems.map((item, i) => (
                                    <li key={i} className="flex items-start">
                                        <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold text-slate-900 mb-2">Legal Notes</h4>
                            <ul className="space-y-1 text-sm">
                                {result.legalNotes.map((note, i) => (
                                    <li key={i} className="text-amber-800">• {note}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
}
