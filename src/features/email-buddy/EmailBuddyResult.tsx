import type { EmailBuddyResponse } from '@/services/llmService';

type Props = { result: EmailBuddyResponse; onReset: () => void };

export function EmailBuddyResult({ result, onReset }: Props) {
    return (
        <section className="space-y-6 rounded-xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl shadow-black/20 text-slate-100">
            <h2 className="text-xl font-bold text-white">Email Analysis</h2>

            <div>
                <p className="text-sm text-slate-200">
                    <span className="font-semibold">Detected tone: </span>
                    {result.originalTone}
                </p>

                {result.keyDemands.length > 0 && (
                    <div className="mt-3">
                        <h3 className="text-xs font-semibold uppercase text-slate-400">
                            Key Demands
                        </h3>
                        <ul className="mt-1 space-y-1 text-sm text-slate-200">
                            {result.keyDemands.map((d, i) => <li key={i}>• {d}</li>)}
                        </ul>
                    </div>
                )}

                {result.riskFlags.length > 0 && (
                    <div className="mt-3">
                        <h3 className="text-xs font-semibold uppercase text-red-300">
                            Risk Flags
                        </h3>
                        <ul className="mt-1 space-y-1 text-sm text-red-200">
                            {result.riskFlags.map((f, i) => <li key={i}>• {f}</li>)}
                        </ul>
                    </div>
                )}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div>
                    <h3 className="mb-2 text-sm font-semibold text-white">BIFF Draft</h3>
                    <div className="rounded-lg border border-slate-800 bg-slate-950/70 p-3 text-sm whitespace-pre-wrap text-slate-100">
                        {result.biffReply}
                    </div>
                </div>
                <div>
                    <h3 className="mb-2 text-sm font-semibold text-white">Grey Rock Draft</h3>
                    <div className="rounded-lg border border-slate-800 bg-slate-950/70 p-3 text-sm whitespace-pre-wrap text-slate-100">
                        {result.greyRockReply}
                    </div>
                </div>
            </div>

            {result.notesForCourt.length > 0 && (
                <div>
                    <h3 className="mb-2 text-sm font-semibold text-white">Notes for Court</h3>
                    <ul className="space-y-1 text-xs text-slate-300">
                        {result.notesForCourt.map((n, i) => <li key={i}>• {n}</li>)}
                    </ul>
                </div>
            )}

            <button onClick={onReset} className="text-xs font-medium text-slate-400 hover:text-slate-200">
                Analyze another email
            </button>
        </section>
    );
}
