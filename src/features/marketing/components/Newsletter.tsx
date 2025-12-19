import React from 'react';

const Newsletter: React.FC = () => {
    return (
        <section className="bg-slate-950 border-t border-slate-800 py-14 md:py-20">
            <div className="container mx-auto px-4">
                <div className="rounded-3xl border border-amber-400/30 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-8 md:p-10 shadow-2xl shadow-amber-500/10">
                    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                        <div className="max-w-2xl space-y-3">
                            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-400">
                                Stay Ahead
                            </p>
                            <h2 className="text-3xl md:text-4xl font-black text-white">
                                Legal tips and product updates, delivered calmly.
                            </h2>
                            <p className="text-slate-300 text-sm md:text-base">
                                Join our newsletter to get trauma-informed guidance, new AI tools, and privacy-first feature releases.
                            </p>
                        </div>
                        <form className="w-full max-w-md space-y-3">
                            <label className="block text-sm font-semibold text-slate-200">
                                Email address
                            </label>
                            <div className="flex flex-col gap-3 sm:flex-row">
                                <input
                                    type="email"
                                    required
                                    placeholder="you@example.com"
                                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                                />
                                <button
                                    type="submit"
                                    className="sm:w-40 rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                                >
                                    Subscribe
                                </button>
                            </div>
                            <p className="text-xs text-slate-400">
                                No spam. Unsubscribe anytime. We never sell or train models on your email.
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
