import React from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import { NavLink } from '../routes';

interface FooterProps {
    currentPath: string;
    navLinks: NavLink[];
    "aria-hidden"?: boolean;
}

const LEGAL_TERMS: { term: string; definition: string }[] = [
    {
        term: 'Affidavit',
        definition: 'A written statement of facts sworn to be true and signed before a commissioner of oaths or notary.',
    },
    {
        term: 'Custody Order',
        definition: 'A court decision that sets out how parenting time and decision-making responsibility are shared.',
    },
    {
        term: 'Motion',
        definition: 'A formal request asking the court to make a decision or issue an order on a specific issue.',
    },
    {
        term: 'Service',
        definition: 'Official delivery of legal documents to the other party so they are notified about the case.',
    },
    {
        term: 'Mediation',
        definition: 'A voluntary process where a neutral mediator helps both parties reach a parenting agreement.',
    },
    {
        term: 'Parenting Plan',
        definition: 'A written plan that outlines how parents will handle schedules, holidays, and decision-making.',
    },
    {
        term: 'Petition',
        definition: 'The document filed to start a court case, also called an application in some provinces.',
    },
    {
        term: 'Contempt',
        definition: 'A finding that someone did not follow a court order, which can lead to penalties.',
    },
];

const Footer: React.FC<FooterProps> = ({ currentPath, navLinks, "aria-hidden": ariaHidden }) => {
    const [termQuery, setTermQuery] = React.useState('');

    const handleAidSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    const filteredTerms = React.useMemo(() => {
        const normalized = termQuery.trim().toLowerCase();
        if (!normalized) {
            return LEGAL_TERMS;
        }

        return LEGAL_TERMS.filter(item =>
            item.term.toLowerCase().includes(normalized) || item.definition.toLowerCase().includes(normalized)
        );
    }, [termQuery]);

    return (
        <footer className="bg-slate-900 py-8 text-center text-gray-400 border-t border-slate-800" aria-hidden={ariaHidden}>
            <div className="container mx-auto px-4">
                <div className="mb-8 max-w-5xl mx-auto text-left">
                    <div className="grid gap-6 lg:grid-cols-2">
                        <div className="rounded-2xl border border-amber-400/30 bg-slate-950/70 p-5 shadow-lg shadow-amber-400/10">
                            <h2 className="text-lg font-semibold text-white mb-2">Find legal aid in your province</h2>
                            <p className="text-sm text-slate-300 mb-4">
                                Search local legal aid resources by province so you can connect with the right support faster.
                            </p>
                            <form className="flex flex-col gap-3 sm:flex-row sm:items-center" onSubmit={handleAidSearch}>
                                <input
                                    type="text"
                                    placeholder="Enter your province"
                                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                                />
                                <button
                                    type="submit"
                                    className="w-full sm:w-auto rounded-lg bg-amber-500 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                                >
                                    Search
                                </button>
                            </form>
                        </div>

                        <div className="rounded-2xl border border-slate-700 bg-slate-950/70 p-5 shadow-lg shadow-slate-900/40">
                            <h2 className="text-lg font-semibold text-white mb-2">Look up legal terms</h2>
                            <p className="text-sm text-slate-300 mb-4">
                                Get quick explanations for common family law terms so you can read documents with confidence.
                            </p>
                            <div className="flex flex-col gap-3">
                                <label className="sr-only" htmlFor="legal-terms-search">
                                    Search legal terms
                                </label>
                                <input
                                    id="legal-terms-search"
                                    type="search"
                                    value={termQuery}
                                    onChange={event => setTermQuery(event.target.value)}
                                    placeholder="Search legal terminology (e.g., service, parenting plan)"
                                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                                />
                                <div className="space-y-3 max-h-64 overflow-auto pr-1">
                                    {filteredTerms.length === 0 ? (
                                        <p className="text-sm text-slate-400">No terms found. Try another keyword.</p>
                                    ) : (
                                        filteredTerms.map(item => (
                                            <div key={item.term} className="rounded-lg border border-slate-800 bg-slate-900/70 p-3">
                                                <div className="flex items-start justify-between gap-2">
                                                    <p className="text-sm font-semibold text-white">{item.term}</p>
                                                </div>
                                                <p className="text-sm text-slate-300 mt-1 leading-relaxed">{item.definition}</p>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <nav className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-y-2 gap-x-6 mb-6">
                    {navLinks.map(link => {
                        if (link.isExternal) {
                            return (
                                <a 
                                    key={link.href}
                                    href={link.href} 
                                    className="hover:text-amber-400 transition-colors duration-200 ease-out"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {link.text}
                                </a>
                            );
                        }
                        return (
                            <RouterLink
                                key={link.href}
                                to={link.href}
                                className={`${link.href === currentPath ? 'text-amber-400' : 'hover:text-amber-400'} transition-colors duration-200 ease-out`}
                                aria-current={link.href === currentPath ? 'page' : undefined}
                            >
                                {link.text}
                            </RouterLink>
                        );
                    })}
                </nav>

                <p className="text-sm">&copy; {new Date().getFullYear()} CustodyBuddy.com. All Rights Reserved.</p>
                <p className="text-xs mt-4 max-w-4xl mx-auto">
                    **Disclaimer: CustodyBuddy is for informational purposes only and is not a substitute for a qualified legal professional. The use of this tool does not create a lawyer-client relationship.**
                </p>
            </div>
        </footer>
    );
};

export default React.memo(Footer);
