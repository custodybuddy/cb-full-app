import React from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import { NavLink } from '../routes';

interface FooterProps {
    currentPath: string;
    navLinks: NavLink[];
    'aria-hidden'?: boolean;
}

const Footer: React.FC<FooterProps> = ({ currentPath, navLinks, 'aria-hidden': ariaHidden }) => {
    return (
        <footer
            className="bg-slate-950 border-t border-slate-900/80 py-10 text-slate-300"
            aria-hidden={ariaHidden}
        >
            <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4">
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                    {navLinks.map(link => {
                        const isActive = !link.isExternal && link.href === currentPath;
                        const baseClasses = 'transition-colors duration-200 ease-out';

                        if (link.isExternal) {
                            return (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className={`${baseClasses} hover:text-amber-400`}
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
                                className={`${baseClasses} ${isActive ? 'text-amber-400' : 'hover:text-amber-400'}`}
                                aria-current={isActive ? 'page' : undefined}
                            >
                                {link.text}
                            </RouterLink>
                        );
                    })}
                    <span className="ml-auto text-xs text-slate-500">
                        &copy; {new Date().getFullYear()} CustodyBuddy.com
                    </span>
                </div>
                <p className="text-xs text-slate-500">
                    Disclaimer: CustodyBuddy is for informational purposes only and is not a substitute for a qualified legal professional. Using this site does not create a lawyer-client relationship.
                </p>
            </div>
        </footer>
    );
};

export default React.memo(Footer);
