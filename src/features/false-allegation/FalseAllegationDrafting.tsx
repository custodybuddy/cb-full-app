import React from 'react';
import SpinnerIcon from '@/components/icons/SpinnerIcon';

interface FalseAllegationDraftingProps {
    isOpen?: boolean;
    onClose?: () => void;
}

const FalseAllegationDrafting: React.FC<FalseAllegationDraftingProps> = () => {
    const sampleAllegations = [
        'They claim I refused the scheduled exchange on July 14.',
        'They allege I am not communicating about school updates.',
    ];

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-amber-400">False Allegation Response Drafting</h2>
                <button className="text-gray-400 text-sm" disabled>Close</button>
            </div>

            <section className="space-y-4 bg-slate-900 border border-amber-400/40 rounded-lg p-6">
                <h3 className="text-xl font-bold text-amber-400">1. Allegation Intake</h3>
                <p className="text-gray-300">Enter each false allegation separately. In the UI-only build, this section is locked.</p>
                <textarea
                    className="w-full p-3 bg-slate-800 border border-slate-700 rounded-md text-gray-200"
                    rows={4}
                    defaultValue={sampleAllegations.join('\n')}
                    readOnly
                />
                <div className="flex gap-2">
                    <button className="bg-blue-600 text-white font-bold py-2 px-4 rounded" disabled>
                        Parse Allegations
                    </button>
                    <button className="bg-green-600 text-white font-bold py-2 px-4 rounded" disabled>
                        Add Single Allegation
                    </button>
                </div>
                <ol className="list-decimal list-inside text-gray-300 space-y-2">
                    {sampleAllegations.map((text, index) => (
                        <li key={index} className="flex justify-between items-center bg-slate-800 p-2 rounded">
                            <span>{text}</span>
                            <button className="bg-red-600 text-white text-xs font-bold py-1 px-2 rounded" disabled>
                                Remove
                            </button>
                        </li>
                    ))}
                </ol>
            </section>

            <section className="space-y-4 bg-slate-900 border border-amber-400/40 rounded-lg p-6">
                <h3 className="text-xl font-bold text-amber-400">2. Allegation Classification</h3>
                <p className="text-gray-300">Assign a category to each allegation to guide the rebuttal.</p>
                <div className="space-y-4">
                    {sampleAllegations.map((text, index) => (
                        <div key={index} className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                            <p className="text-white font-semibold mb-2">{text}</p>
                            <select
                                className="w-full p-2 bg-slate-900 border border-slate-700 rounded-md text-white"
                                disabled
                            >
                                <option>Parenting time / access</option>
                                <option>Communication behavior</option>
                                <option>Abuse / safety claim</option>
                                <option>Financial misconduct</option>
                            </select>
                        </div>
                    ))}
                </div>
            </section>

            <section className="space-y-4 bg-slate-900 border border-amber-400/40 rounded-lg p-6">
                <h3 className="text-xl font-bold text-amber-400">3. Evidence & Context</h3>
                <p className="text-gray-300">Provide objective facts or evidence for each allegation.</p>
                <textarea
                    className="w-full p-3 bg-slate-800 border border-slate-700 rounded-md text-gray-200"
                    rows={5}
                    defaultValue="Evidence: July 14 exchange confirmation text message and timestamped photo at the exchange location."
                    readOnly
                />
            </section>

            <section className="space-y-4 bg-slate-900 border border-amber-400/40 rounded-lg p-6">
                <h3 className="text-xl font-bold text-amber-400">4. Drafted Response</h3>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                    <SpinnerIcon className="w-4 h-4 text-amber-400" />
                    Draft generation is paused in the UI-only build.
                </div>
                <div className="space-y-3">
                    <div className="p-4 bg-slate-800 rounded-md border border-slate-700">
                        <p className="text-gray-200 font-semibold">Allegation: Refused scheduled exchange</p>
                        <p className="text-gray-300 mt-2">The exchange occurred on July 14 at 6:45 PM, 45 minutes later than the scheduled time. A timestamped photo and message confirm my arrival and completion of the exchange.</p>
                    </div>
                    <div className="p-4 bg-slate-800 rounded-md border border-slate-700">
                        <p className="text-gray-200 font-semibold">Allegation: Lack of communication</p>
                        <p className="text-gray-300 mt-2">School updates were sent on July 10 and July 12 via email. Copies of those messages are attached for reference.</p>
                    </div>
                </div>
            </section>

            <section className="space-y-4 bg-slate-900 border border-amber-400/40 rounded-lg p-6">
                <h3 className="text-xl font-bold text-amber-400">5. Suggested Next Steps</h3>
                <ul className="list-disc pl-6 text-gray-300 space-y-2">
                    <li>Organize all supporting evidence with timestamps.</li>
                    <li>Request written confirmation of future exchanges.</li>
                    <li>Consider mediation before escalating to court.</li>
                </ul>
            </section>

            <div className="flex justify-between items-center">
                <button className="bg-slate-700 text-white font-semibold py-2 px-4 rounded" disabled>
                    Back
                </button>
                <button className="bg-amber-400 text-black font-bold py-2 px-4 rounded" disabled>
                    Next
                </button>
            </div>
        </div>
    );
};

export default FalseAllegationDrafting;
