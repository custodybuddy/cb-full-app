import React, { useState } from 'react';
import ReportResult from './ReportResult';
import { useIncidentAnalysis } from '../useIncidentAnalysis';

const JURISDICTIONS = [
    { id: 'ontario', region: 'Ontario', country: 'CA' },
    { id: 'british-columbia', region: 'British Columbia', country: 'CA' },
    { id: 'alberta', region: 'Alberta', country: 'CA' },
    { id: 'california', region: 'California', country: 'US' },
    { id: 'texas', region: 'Texas', country: 'US' },
    { id: 'new-york', region: 'New York', country: 'US' },
];

const CANADIAN_JURISDICTIONS = JURISDICTIONS.filter(j => j.country === 'CA').map(j => j.id);
const US_JURISDICTIONS = JURISDICTIONS.filter(j => j.country === 'US').map(j => j.id);

const predefinedParties = [
    'Ex-spouse/Co-parent',
    'Their current partner',
    'Grandparent',
    'Other family member',
    'Police/First Responder',
    'Witness',
];

const predefinedChildren = ['Child A', 'Child B', 'Child C'];

const ReportAnIncident: React.FC<{ isOpen?: boolean }> = () => {
    const [narrative, setNarrative] = useState(
        'On July 14, pickup was 45 minutes late without notice. The child waited with a grandparent and missed a scheduled activity.'
    );
    const [jurisdiction, setJurisdiction] = useState('ontario');
    const [incidentDate, setIncidentDate] = useState('2023-07-14');
    const [location, setLocation] = useState('Community Center Parking Lot');
    const { runAnalysis, result, loading, error, reset } = useIncidentAnalysis();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const region =
            JURISDICTIONS.find(j => j.id === jurisdiction)?.region || jurisdiction;
        const selectedParties = predefinedParties.filter(
            party => party === 'Ex-spouse/Co-parent' || party === 'Witness'
        );
        await runAnalysis({
            date: incidentDate,
            location,
            parties: selectedParties.join(', '),
            narrative,
            jurisdiction: region,
        });
    };

    const handleReset = () => {
        setNarrative('');
        setJurisdiction('');
        setIncidentDate('');
        setLocation('');
        reset();
    };

    return (
        <div className="space-y-6">
            <p className="text-gray-400 text-sm">
                Document what happened in your own words. Our AI will analyze your narrative and transform it into a professional, objective, and court-ready report.
            </p>

            <form noValidate className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="narrative" className="block text-sm font-medium text-gray-300 mb-1">Incident Narrative<span aria-hidden="true" className="text-red-400 ml-1">*</span></label>
                    <textarea
                        id="narrative"
                        name="narrative"
                        value={narrative}
                        onChange={event => setNarrative(event.target.value)}
                        rows={6}
                        className="w-full p-3 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none transition-shadow duration-200"
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="jurisdiction-incident" className="block text-sm font-medium text-gray-300 mb-1">Jurisdiction (Province/State)<span aria-hidden="true" className="text-red-400 ml-1">*</span></label>
                        <select
                            id="jurisdiction-incident"
                            name="jurisdiction"
                            className="w-full p-2 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none text-gray-100"
                            value={jurisdiction}
                            onChange={event => setJurisdiction(event.target.value)}
                            required
                        >
                            <option value="">Select a jurisdiction</option>
                            <optgroup label="Canada">
                                {JURISDICTIONS.filter(j => CANADIAN_JURISDICTIONS.includes(j.id)).map(j => (
                                    <option key={j.id} value={j.id}>
                                        {j.region}
                                    </option>
                                ))}
                            </optgroup>
                            <optgroup label="United States">
                                {JURISDICTIONS.filter(j => US_JURISDICTIONS.includes(j.id)).map(j => (
                                    <option key={j.id} value={j.id}>
                                        {j.region}
                                    </option>
                                ))}
                            </optgroup>
                        </select>
                        <p className="text-xs text-gray-500 mt-1">Jurisdiction selection is locked in the UI-only build.</p>
                    </div>
                    <div>
                        <label htmlFor="incidentDate" className="block text-sm font-medium text-gray-300 mb-1">Date of Incident<span aria-hidden="true" className="text-red-400 ml-1">*</span></label>
                        <input
                            type="date"
                            id="incidentDate"
                            name="incidentDate"
                            value={incidentDate}
                            onChange={event => setIncidentDate(event.target.value)}
                            className="w-full p-2 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-1">Location</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={location}
                        onChange={event => setLocation(event.target.value)}
                        className="w-full p-2 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p className="block text-sm font-medium text-gray-300 mb-2">Other Parties Involved<span aria-hidden="true" className="text-red-400 ml-1">*</span></p>
                        <div className="space-y-2">
                            {predefinedParties.map(party => (
                                <div key={party} className="flex items-center justify-between bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm">
                                    <label className="flex-grow text-gray-300">
                                        <input
                                            type="checkbox"
                                            checked={party === 'Ex-spouse/Co-parent' || party === 'Witness'}
                                            className="mr-2 h-4 w-4 rounded border-gray-400 bg-slate-700 text-amber-400"
                                            disabled
                                        />
                                        {party}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <p className="block text-sm font-medium text-gray-300 mb-2">Children Present</p>
                        <div className="space-y-2">
                            {predefinedChildren.map(child => (
                                <div key={child} className="flex items-center justify-between bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm">
                                    <label className="flex-grow text-gray-300">
                                        <input
                                            type="checkbox"
                                            checked={child === 'Child A'}
                                            className="mr-2 h-4 w-4 rounded border-gray-400 bg-slate-700 text-amber-400"
                                            disabled
                                        />
                                        {child}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-4 border-t border-slate-700">
                    <button
                        className="flex items-center gap-2 text-sm text-amber-400 font-semibold transition-colors disabled:opacity-50"
                        disabled={loading}
                        type="button"
                        onClick={handleReset}
                    >
                        Start Over
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex items-center justify-center bg-amber-400 text-black font-bold py-2 px-6 rounded-full shadow-lg transition-all duration-200 ease-out disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Analyzing...' : 'Generate Incident Report'}
                    </button>
                </div>
            </form>

            {error && (
                <div className="rounded-lg border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-200">
                    {error}
                </div>
            )}

            <div className="pt-6 border-t border-slate-700">
                {result ? (
                    <div className="rounded-2xl border border-slate-700/70 bg-slate-900/80 p-6 text-gray-100 space-y-6">
                        <div>
                            <p className="text-xs uppercase tracking-[0.2em] text-amber-300">
                                AI Summary
                            </p>
                            <p className="mt-3 text-base leading-relaxed text-gray-200">
                                {result.summary}
                            </p>
                        </div>

                        {result.severity && (
                            <div className="inline-flex items-center rounded-full border border-amber-400/40 bg-amber-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-amber-200">
                                Severity: {result.severity}
                            </div>
                        )}

                        <div className="grid gap-6 md:grid-cols-2">
                            <div>
                                <h4 className="text-sm font-semibold text-amber-200 mb-3">
                                    Action Items
                                </h4>
                                <ul className="space-y-2 text-sm text-gray-200">
                                    {result.actionItems.map((item, index) => (
                                        <li key={index} className="flex gap-2">
                                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-amber-400" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h4 className="text-sm font-semibold text-amber-200 mb-3">
                                    Legal Notes
                                </h4>
                                <ul className="space-y-2 text-sm text-gray-200">
                                    {result.legalNotes.map((note, index) => (
                                        <li key={index}>{note}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {result.citations?.length ? (
                            <div className="rounded-xl border border-slate-700/70 bg-slate-950/60 p-5">
                                <h4 className="text-sm font-semibold text-amber-200 mb-3">
                                    Sources
                                </h4>
                                <div className="space-y-3 text-sm text-gray-200">
                                    {result.citations.map((c, index) => (
                                        <div key={index} className="space-y-1">
                                            <div className="text-gray-100">{c.claim}</div>
                                            <a
                                                href={c.source.url}
                                                className="text-amber-300 hover:underline"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {c.source.title}
                                            </a>
                                            <p className="text-xs text-gray-400">
                                                {c.source.snippet}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : null}
                    </div>
                ) : (
                    <ReportResult />
                )}
            </div>
        </div>
    );
};

export default ReportAnIncident;
