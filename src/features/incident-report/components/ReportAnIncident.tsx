import React from 'react';
import ReportResult from './ReportResult';
import { JURISDICTIONS, CANADIAN_JURISDICTIONS, US_JURISDICTIONS } from '@/data/jurisdictions';

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
    return (
        <div className="space-y-6">
            <p className="text-gray-400 text-sm">
                Document what happened in your own words. Our AI will analyze your narrative and transform it into a professional, objective, and court-ready report.
            </p>

            <form noValidate className="space-y-4">
                <div>
                    <label htmlFor="narrative" className="block text-sm font-medium text-gray-300 mb-1">Incident Narrative<span aria-hidden="true" className="text-red-400 ml-1">*</span></label>
                    <textarea
                        id="narrative"
                        name="narrative"
                        defaultValue="On July 14, pickup was 45 minutes late without notice. The child waited with a grandparent and missed a scheduled activity."
                        rows={6}
                        className="w-full p-3 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none transition-shadow duration-200"
                        readOnly
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
                            disabled
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
                            defaultValue="2023-07-14"
                            className="w-full p-2 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none"
                            disabled
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
                        defaultValue="Community Center Parking Lot"
                        className="w-full p-2 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none"
                        readOnly
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
                        className="flex items-center gap-2 text-sm text-amber-400 font-semibold transition-colors"
                        disabled
                        type="button"
                    >
                        Start Over
                    </button>
                    <button
                        type="button"
                        disabled
                        className="inline-flex items-center justify-center bg-amber-400 text-black font-bold py-2 px-6 rounded-full shadow-lg transition-all duration-200 ease-out disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Generate Incident Report
                    </button>
                </div>
            </form>

            <div className="pt-6 border-t border-slate-700">
                <ReportResult />
            </div>
        </div>
    );
};

export default ReportAnIncident;
