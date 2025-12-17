import type { CustodyAIResponse } from '@/services/llmService';

type ReportResultProps = {
    result: CustodyAIResponse;
    onReset: () => void;
};

export function ReportResult({ result, onReset }: ReportResultProps) {
    return (
        <section className="space-y-6 rounded-xl border border-slate-200 bg-slate-50 p-6">
            <header className="space-y-1">
                <h2 className="text-xl font-bold text-slate-900">Incident Analysis</h2>
                {result.severity && (
                    <p className="text-sm font-medium text-amber-800">
                        Severity: {result.severity}
                    </p>
                )}
            </header>

            <p className="text-sm leading-relaxed text-slate-900">{result.summary}</p>

            <div className="grid gap-6 md:grid-cols-2">
                <div>
                    <h3 className="mb-2 text-sm font-semibold text-slate-900">Action Items</h3>
                    <ul className="space-y-1 text-sm text-slate-800">
                        {result.actionItems.map((item, i) => (
                            <li key={i}>• {item}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3 className="mb-2 text-sm font-semibold text-slate-900">Legal Notes</h3>
                    <ul className="space-y-1 text-sm text-slate-800">
                        {result.legalNotes.map((note, i) => (
                            <li key={i}>• {note}</li>
                        ))}
                    </ul>
                </div>
            </div>

            {result.citations && result.citations.length > 0 && (
                <div className="mt-2 rounded-lg bg-slate-100 p-4">
                    <h3 className="mb-2 text-sm font-semibold text-slate-900">
                        Sources & References
                    </h3>
                    <ul className="space-y-2 text-xs text-slate-700">
                        {result.citations.map((c, i) => (
                            <li key={i} className="border-l-2 border-amber-400 pl-2">
                                <div className="font-medium">{c.claim}</div>
                                <a
                                    href={c.source.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-amber-700 underline"
                                >
                                    {c.source.title}
                                </a>
                                <div className="mt-0.5 text-[11px]">{c.source.snippet}</div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <button
                type="button"
                onClick={onReset}
                className="text-xs font-medium text-slate-500 hover:text-slate-700"
            >
                Start a new incident
            </button>
        </section>
    );
}
