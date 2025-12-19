import React from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import { NavLink } from '../routes';

interface FooterProps {
    currentPath: string;
    navLinks: NavLink[];
    "aria-hidden"?: boolean;
}

const Footer: React.FC<FooterProps> = ({ currentPath, navLinks, "aria-hidden": ariaHidden }) => {
    return (
        <footer className="bg-slate-900 py-8 text-center text-gray-400 border-t border-slate-800" aria-hidden={ariaHidden}>
            <div className="container mx-auto px-4">
                <div className="mb-8 max-w-3xl mx-auto text-left">
                    <div className="rounded-2xl border border-amber-400/30 bg-slate-950/70 p-5 shadow-lg shadow-amber-400/10">
                        <h2 className="text-lg font-semibold text-white mb-2">Find legal aid in your province</h2>
                        <p className="text-sm text-slate-300 mb-4">
                            Search local legal aid resources by province so you can connect with the right support faster.
                        </p>
                        <form className="flex flex-col gap-3 sm:flex-row sm:items-center">
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
