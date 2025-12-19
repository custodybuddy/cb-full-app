import React from 'react';
import ReactConfetti from 'react-confetti';

const NewsletterSignup: React.FC = () => {
    const [email, setEmail] = React.useState('');
    const [isCelebrating, setIsCelebrating] = React.useState(false);
    const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });

    React.useEffect(() => {
        const updateSize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        updateSize();
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsCelebrating(true);
        setTimeout(() => setIsCelebrating(false), 2000);
        setEmail('');
    };

    return (
        <section className="bg-slate-950 border-t border-b border-slate-800 py-14 sm:py-16">
            {isCelebrating && (
                <ReactConfetti
                    width={dimensions.width}
                    height={dimensions.height}
                    numberOfPieces={150}
                    recycle={false}
                    colors={['#fbbf24', '#fef3c7', '#38bdf8', '#94a3b8']}
                    gravity={0.35}
                    className="pointer-events-none fixed inset-0 z-20"
                />
            )}
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 shadow-xl shadow-black/30">
                    <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] items-center">
                        <div>
                            <p className="text-sm uppercase tracking-[0.2em] text-amber-400/80 mb-2">Stay Informed</p>
                            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                                Get legal tips and product updates in your inbox.
                            </h2>
                            <p className="text-sm sm:text-base text-slate-300">
                                Receive practical guidance for self-represented parents, feature announcements, and resources to help
                                you navigate court confidently.
                            </p>
                        </div>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-center">
                            <label className="sr-only" htmlFor="newsletter-email">
                                Email address
                            </label>
                            <input
                                id="newsletter-email"
                                type="email"
                                required
                                value={email}
                                onChange={event => setEmail(event.target.value)}
                                placeholder="Enter your email"
                                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                            />
                            <button
                                type="submit"
                                className="w-full sm:w-auto rounded-lg bg-amber-500 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default React.memo(NewsletterSignup);
