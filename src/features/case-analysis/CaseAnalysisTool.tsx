import React, { useState } from 'react';
import FileManagement from './components/FileManagement';
import AnalysisResult from './components/AnalysisResult';
import Button from '@/components/ui/Button';
import FormRow from '@/components/ui/FormRow';
import { useCaseAnalysis } from './useCaseAnalysis';
import type { CaseAnalysisResponse } from '@/services/llmService';

const MAX_PASTED_CHARS = 8000;
const JURISDICTIONS = ['Ontario', 'British Columbia', 'Alberta', 'California', 'Texas', 'New York'];

const CaseAnalysisResults: React.FC<{ result: CaseAnalysisResponse }> = ({ result }) => {
    const renderList = (items: string[], emptyLabel: string) =>
        items.length > 0 ? (
            <ul className="space-y-1 text-sm text-slate-200">
                {items.map((item, index) => (
                    <li key={index}>• {item}</li>
                ))}
            </ul>
        ) : (
            <p className="text-sm text-slate-400">{emptyLabel}</p>
        );

    return (
        <section className="space-y-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl shadow-black/20">
            <div>
                <h3 className="text-lg font-semibold text-white">Overview</h3>
                <p className="mt-2 text-sm text-slate-200 leading-relaxed">{result.overview}</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div>
                    <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300 mb-1">Obligations</h4>
                    {renderList(result.obligations, 'No explicit obligations detected.')}
                </div>
                {result.rights && (
                    <div>
                        <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300 mb-1">Rights</h4>
                        {renderList(result.rights, 'No explicit rights detected.')}
                    </div>
                )}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div>
                    <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300 mb-1">Deadlines / Timeframes</h4>
                    {renderList(result.deadlines, 'No deadlines mentioned.')}
                </div>
                <div>
                    <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300 mb-1">Conflicts & Ambiguities</h4>
                    {renderList(result.conflicts, 'No conflicts detected.')}
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div>
                    <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300 mb-1">Action Items</h4>
                    {renderList(result.actionItems, 'No action items identified.')}
                </div>
                <div>
                    <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300 mb-1">Notes for Lawyer</h4>
                    {renderList(result.notesForLawyer, 'No lawyer notes noted.')}
                </div>
            </div>
        </section>
    );
};

const CaseAnalysisTool: React.FC<{ isOpen?: boolean }> = () => {
    const [mainText, setMainText] = useState('');
    const [secondaryText, setSecondaryText] = useState('');
    const [jurisdiction, setJurisdiction] = useState('Ontario');
    const [localError, setLocalError] = useState<string | null>(null);

    const { analyze, result, loading, error, reset } = useCaseAnalysis();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!mainText.trim()) {
            setLocalError('Paste or upload the primary document text before analyzing.');
            return;
        }
        setLocalError(null);
        await analyze({ jurisdiction, mainText, secondaryText });
    };

    const handleReset = () => {
        setLocalError(null);
        setMainText('');
        setSecondaryText('');
        reset();
    };

    return (
        <div className="space-y-6">
            <p className="text-gray-400 text-sm">
                Upload court orders, separation agreements, or difficult emails. Our AI will analyze them, identify key obligations, flag potential conflicts, and suggest next steps. All uploaded files are processed securely and are not stored.
            </p>

            <FileManagement />

            <form className="space-y-6" onSubmit={handleSubmit}>
                <FormRow
                    label="Paste primary document text"
                    htmlFor="primary-text"
                    description={`Up to ${MAX_PASTED_CHARS.toLocaleString()} characters.`}
                >
                    <textarea
                        id="primary-text"
                        value={mainText}
                        onChange={event => setMainText(event.target.value)}
                        className="w-full h-40 p-3 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none transition-shadow duration-200"
                        maxLength={MAX_PASTED_CHARS}
                        placeholder="Paste the main court order or agreement text here..."
                        disabled={loading}
                        required
                    />
                </FormRow>

                <FormRow
                    label="Secondary / related document (optional)"
                    htmlFor="secondary-text"
                >
                    <textarea
                        id="secondary-text"
                        value={secondaryText}
                        onChange={event => setSecondaryText(event.target.value)}
                        className="w-full h-32 p-3 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none transition-shadow duration-200"
                        maxLength={MAX_PASTED_CHARS}
                        placeholder="Paste clauses from a parenting plan, email thread, or related document..."
                        disabled={loading}
                    />
                </FormRow>

                <FormRow
                    label="Jurisdiction (Province/State)"
                    htmlFor="jurisdiction-case"
                    required
                >
                    <select
                        id="jurisdiction-case"
                        name="jurisdiction"
                        value={jurisdiction}
                        onChange={event => setJurisdiction(event.target.value)}
                        className="w-full p-2 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none"
                        disabled={loading}
                        required
                    >
                        {JURISDICTIONS.map(option => (
                            <option key={option}>{option}</option>
                        ))}
                    </select>
                </FormRow>

                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-4 border-t border-slate-700">
                    <Button
                        type="button"
                        variant="ghost"
                        className="flex items-center gap-2 text-sm"
                        onClick={handleReset}
                        disabled={loading}
                    >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74"/><path d="M3 4v5h5"/></svg>
                        Start Over
                    </Button>
                    <Button
                        type="submit"
                        fullWidth
                        className="w-full sm:w-auto"
                        disabled={loading || !mainText.trim()}
                    >
                        {loading ? 'Analyzing...' : 'Analyze Documents'}
                    </Button>
                </div>
            </form>

            {(localError || error) && (
                <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                    {localError || error}
                </div>
            )}

            <div className="pt-6 border-t border-slate-700">
                {result ? <CaseAnalysisResults result={result} /> : <AnalysisResult />}
            </div>
        </div>
    );
};

export default CaseAnalysisTool;
