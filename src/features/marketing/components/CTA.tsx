
import React from 'react';

const CTA: React.FC = () => {
    return (
        <section className="bg-amber-400 text-slate-900 py-12 md:py-16 text-center animate-fade-in" aria-hidden>
            <div className="container mx-auto px-4">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 text-slate-900">
                    Ready to get organized?
                </h2>
                <p className="text-lg md:text-xl max-w-3xl mx-auto mb-6 font-medium">
                    Keep your co-parenting evidence, emails, and reports in one place with AI structure and clarity.
                </p>
                <a
                    href="#features"
                    className="inline-block bg-slate-900 text-amber-400 font-bold py-4 px-10 rounded-full shadow-lg transition-all duration-200 ease-out motion-safe:hover:scale-105 motion-safe:active:scale-95 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 focus:ring-offset-amber-400"
                >
                    Explore the tools
                </a>
            </div>
        </section>
    );
};

export default React.memo(CTA);
