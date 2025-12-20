import React, { useState } from 'react';
import FormInput from '@/components/common/FormInput';
import MailIcon from '@/components/icons/MailIcon';
import UserIcon from '@/components/icons/UserIcon';

const StayInTouch: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleContactSubmit = (event: React.FormEvent) => {
        event.preventDefault();
    };

    const handleNewsletterSubmit = (event: React.FormEvent) => {
        event.preventDefault();
    };

    return (
        <section className="bg-slate-950 border-t border-slate-900/70 py-14 md:py-18">
            <div className="container mx-auto px-4">
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-black/15">
                        <div className="space-y-2">
                            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-400">
                                Newsletter
                            </p>
                            <h2 className="text-2xl font-bold text-white">Stay updated</h2>
                            <p className="text-sm text-slate-400">
                                Legal tips, new tools, and privacy-first releases.
                            </p>
                        </div>
                        <form className="mt-4 space-y-3" onSubmit={handleNewsletterSubmit} noValidate>
                            <label className="sr-only" htmlFor="newsletter-email">
                                Email address
                            </label>
                            <div className="flex flex-col gap-3 sm:flex-row">
                                <input
                                    id="newsletter-email"
                                    type="email"
                                    required
                                    placeholder="you@example.com"
                                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                                />
                                <button
                                    type="submit"
                                    className="sm:w-36 rounded-lg bg-amber-500 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                                >
                                    Subscribe
                                </button>
                            </div>
                            <p className="text-xs text-slate-400">
                                No spam. Unsubscribe anytime.
                            </p>
                        </form>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-black/15">
                        <div className="space-y-2 text-left">
                            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-400">
                                Contact
                            </p>
                            <h3 className="text-2xl font-bold text-white">Get in touch</h3>
                            <p className="text-sm text-slate-400">
                                Questions or feedback? Send a quick note.
                            </p>
                        </div>
                        <form className="mt-4 space-y-4" onSubmit={handleContactSubmit} noValidate aria-live="polite">
                            <FormInput
                                id="contact-name"
                                name="name"
                                value={name}
                                onChange={event => setName(event.target.value)}
                                placeholder="Your Name"
                                required
                                icon={<UserIcon className="h-5 w-5 text-gray-400" />}
                            />
                            <FormInput
                                id="contact-email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={event => setEmail(event.target.value)}
                                placeholder="Your Email"
                                required
                                icon={<MailIcon className="h-5 w-5 text-gray-400" />}
                            />
                            <FormInput
                                id="contact-message"
                                name="message"
                                value={message}
                                onChange={event => setMessage(event.target.value)}
                                placeholder="Your Message"
                                required
                                icon={<div />}
                                isTextArea
                            />
                            <div className="space-y-1">
                                <button
                                    type="submit"
                                    className="inline-flex items-center justify-center rounded-lg bg-amber-400 px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg transition hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                                >
                                    Send
                                </button>
                                <p className="text-xs text-gray-500">Submission is disabled in the skeleton build.</p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default React.memo(StayInTouch);
