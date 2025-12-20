import React from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import { NavLink } from '../routes';
import BookOpenIcon from './icons/BookOpenIcon';
import MenuIcon from './icons/MenuIcon';
import { X } from 'lucide-react';

interface HeaderProps {
    currentPath: string;
    navLinks: NavLink[];
}

const Header: React.FC<HeaderProps> = ({ currentPath, navLinks }) => {
    const [isMobileOpen, setIsMobileOpen] = React.useState(false);
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
                <div className="flex items-center justify-between py-3">
                    <RouterLink to="/" className="text-xl md:text-2xl font-black transition-transform transform hover:scale-105">
                        <span className="text-amber-400">CUSTODY</span>
                        <span>BUDDY</span>
                        <span className="text-amber-400">.COM</span>
                    </RouterLink>
                    <div className="hidden md:flex flex-wrap items-center justify-center gap-4">
                        {navLinks.map(link => renderLink(link))}
                    </div>
                    <button
                        type="button"
                        className="md:hidden p-2 rounded-lg border border-slate-700 text-white hover:border-amber-400 hover:text-amber-400 transition"
                        onClick={() => setIsMobileOpen(open => !open)}
                        aria-label="Toggle navigation menu"
                    >
                        {isMobileOpen ? <X className="w-6 h-6" /> : <MenuIcon />}
                    </button>
                </div>
            </div>

            {/* Mobile overlay and menu */}
            <div
                className={`md:hidden fixed inset-0 z-40 transition-opacity duration-300 ease-out ${isMobileOpen ? 'opacity-100 pointer-events-auto bg-slate-950/70' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsMobileOpen(false)}
                aria-hidden="true"
            />
            <div
                className={`md:hidden fixed top-0 right-0 z-50 w-72 max-w-[80vw] h-full bg-slate-900 shadow-2xl shadow-amber-400/10 border-l border-slate-800 transition-transform duration-300 ease-out ${
                    isMobileOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="p-5 space-y-4">
                    <div className="text-lg font-bold text-white">Menu</div>
                    <div className="flex flex-col gap-3">
                        {navLinks.map(link => (
                            <div key={link.href} onClick={() => setIsMobileOpen(false)}>
                                {renderLink(link)}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default React.memo(Header);
