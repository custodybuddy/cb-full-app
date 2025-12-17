import React from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import { NavLink } from '../routes';
import BookOpenIcon from './icons/BookOpenIcon';

interface HeaderProps {
    currentPath: string;
    navLinks: NavLink[];
}

const Header: React.FC<HeaderProps> = ({ currentPath, navLinks }) => {
    const navClass = 'fixed top-0 left-0 w-full z-50 bg-slate-900/80 backdrop-blur-sm shadow-md';

    const renderLink = (link: NavLink) => {
        const isActive = !link.isExternal && link.href === currentPath;

        const commonClasses = 'transition-colors duration-200 ease-out flex items-center';
        const classes = `${commonClasses} gap-1.5 text-sm font-semibold ${isActive ? 'text-amber-400' : 'hover:text-amber-400'}`;

        if (link.isExternal) {
            return (
                <a 
                    key={link.text} 
                    href={link.href} 
                    className={classes}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {link.text === 'Template Library' && <BookOpenIcon className="w-4 h-4" />}
                    {link.text}
                </a>
            );
        }

        return (
            <RouterLink
                key={link.text}
                to={link.href}
                className={classes}
                aria-current={isActive ? 'page' : undefined}
            >
                {link.text === 'Template Library' && <BookOpenIcon className="w-4 h-4" />}
                {link.text}
            </RouterLink>
        );
    };

    return (
        <nav id="main-nav" className={navClass}>
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center py-3">
                    <RouterLink to="/" className="text-xl md:text-2xl font-black transition-transform transform hover:scale-105 mb-3">
                        <span className="text-amber-400">CUSTODY</span>
                        <span>BUDDY</span>
                        <span className="text-amber-400">.COM</span>
                    </RouterLink>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        {navLinks.map(link => renderLink(link))}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default React.memo(Header);
