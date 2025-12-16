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
                                className={`${`/${link.href}` === currentPath ? 'text-amber-400' : 'hover:text-amber-400'} transition-colors duration-200 ease-out`}
                                aria-current={`/${link.href}` === currentPath ? 'page' : undefined}
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