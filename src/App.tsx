import React, { Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { routes, externalLinks, NavLink } from '@/routes';
import { ModalProvider } from '@/contexts/ModalContext';
import GlobalModals from '@/components/GlobalModals';
import { useConsent } from '@/hooks/useConsent';
import ConsentModal from '@/components/ConsentModal';
import SpinnerIcon from '@/components/icons/SpinnerIcon';
import TopLoadingBar from '@/components/TopLoadingBar';
import { isOpenAIConfigured } from '@/utils/envUtils';

const PageFallback: React.FC = () => (
    <div className="flex justify-center items-center min-h-screen">
        <div className="text-center text-gray-400 animate-fade-in">
             <div className="text-2xl font-black mb-4">
                <span className="text-amber-400">CUSTODY</span>
                <span>BUDDY</span>
                <span className="text-amber-400">.COM</span>
            </div>
            <SpinnerIcon className="w-10 h-10 mx-auto mb-4 text-amber-400" />
            <p className="text-lg">Loading Content...</p>
        </div>
    </div>
);


const App: React.FC = () => {
    const apiKeyConfigured = isOpenAIConfigured();
    const location = useLocation();
    const { consentGiven, acceptConsent } = useConsent();

    // Logic to prepare links for Header and Footer
    const headerNavLinks: NavLink[] = [
        ...routes
            .filter(r => r.inHeader)
            .map(r => ({ href: r.path, text: r.label, isExternal: false })),
        ...externalLinks
            .filter(l => l.inHeader)
            .map(l => ({ href: l.href, text: l.text, isExternal: true }))
    ];

    const footerNavLinks: NavLink[] = [
        ...routes
            .filter(r => r.inFooter)
            .map(r => ({ href: r.path, text: r.label, isExternal: false })),
        ...externalLinks
            .filter(l => l.inFooter)
            .map(l => ({ href: l.href, text: l.text, isExternal: true }))
    ];

    if (!apiKeyConfigured) {
        return (
            <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-6">
                <div className="max-w-xl text-center space-y-4">
                    <div className="text-2xl font-black">
                        <span className="text-amber-400">CUSTODY</span>
                        <span>BUDDY</span>
                        <span className="text-amber-400">.COM</span>
                    </div>
                    <p className="text-lg text-amber-300 font-semibold">AI service is not configured.</p>
                    <p className="text-sm text-gray-300">
                        Please set the <code className="font-mono text-amber-200">OPENAI_API_KEY</code> (or <code className="font-mono text-amber-200">VITE_OPENAI_API_KEY</code>) environment variable and reload the page.
                    </p>
                    <p className="text-xs text-gray-400">
                        This app runs client-side only; your API key is required to call OpenAI for document analysis and drafting tools.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <ModalProvider>
            <div className="bg-slate-900 text-white">
                <TopLoadingBar isLoading={false} />
                <Header currentPath={location.pathname} navLinks={headerNavLinks} />
                <main>
                            <Suspense fallback={<PageFallback />}>
                                <Routes>
                                    {routes.map(({ path, component: Component }) => (
                                        <React.Fragment key={path}>
                                            <Route path={path} element={<Component />} />
                                        </React.Fragment>
                                    ))}
                                </Routes>
                            </Suspense>
                        </main>
                <Footer currentPath={location.pathname} navLinks={footerNavLinks} />
                <GlobalModals />
                {!consentGiven && <ConsentModal onAccept={acceptConsent} />}
            </div>
        </ModalProvider>
    );
};
export default App;
