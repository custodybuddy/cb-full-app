import React from 'react';

type LegalTerm = {
    term: string;
    definition: string;
};

const LEGAL_TERMS: LegalTerm[] = [
    { term: 'Affidavit', definition: 'A written statement of facts sworn to be true and signed before a commissioner of oaths or notary.' },
    { term: 'Custody Order', definition: 'A court decision that sets out how parenting time and decision-making responsibility are shared.' },
    { term: 'Motion', definition: 'A formal request asking the court to make a decision or issue an order on a specific issue.' },
    { term: 'Service', definition: 'Official delivery of legal documents to the other party so they are notified about the case.' },
    { term: 'Mediation', definition: 'A voluntary process where a neutral mediator helps both parties reach a parenting agreement.' },
    { term: 'Parenting Plan', definition: 'A written plan that outlines how parents will handle schedules, holidays, and decision-making.' },
    { term: 'Petition', definition: 'The document filed to start a court case, also called an application in some provinces.' },
    { term: 'Contempt', definition: 'A finding that someone did not follow a court order, which can lead to penalties.' },
];

const LegalTermsLookup: React.FC = () => {
    const [query, setQuery] = React.useState('');

    const filteredTerms = React.useMemo(() => {
        const normalized = query.trim().toLowerCase();
        if (!normalized) return LEGAL_TERMS;
        return LEGAL_TERMS.filter(item =>
            item.term.toLowerCase().includes(normalized) || item.definition.toLowerCase().includes(normalized)
        );
    }, [query]);

    return (
        <section className="mt-16 rounded-2xl border border-slate-800 bg-slate-950/70 p-6 shadow-xl shadow-black/20">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-400">
                        Legal terms
                    </p>
                    <h2 className="text-2xl font-bold text-white">Decode the jargon</h2>
                    <p className="text-sm text-slate-400">
                        Quick definitions for common family-law terms so you can read documents with confidence.
                    </p>
                </div>
                <div className="w-full md:max-w-sm">
                    <label className="sr-only" htmlFor="legal-terms-search">
                        Search legal terms
                    </label>
                    <input
                        id="legal-terms-search"
                        type="search"
                        value={query}
                        onChange={event => setQuery(event.target.value)}
                        placeholder="Search terms (e.g., service, parenting plan)"
                        className="w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                    />
                </div>
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-2">
                {filteredTerms.length === 0 ? (
                    <p className="text-sm text-slate-400">No terms found. Try another keyword.</p>
                ) : (
                    filteredTerms.map(item => (
                        <div
                            key={item.term}
                            className="rounded-xl border border-slate-850/60 bg-slate-900/60 px-4 py-3 shadow-sm shadow-black/20"
                        >
                            <p className="text-sm font-semibold text-white">{item.term}</p>
                            <p className="mt-1 text-sm leading-relaxed text-slate-300">{item.definition}</p>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
};

export default React.memo(LegalTermsLookup);
