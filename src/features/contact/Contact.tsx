import React, { useState } from 'react';
import UserIcon from '@/components/icons/UserIcon';
import MailIcon from '@/components/icons/MailIcon';
import FormInput from '@/components/common/FormInput';
interface FormData {
    name: string;
    email: string;
    message: string;
}
const Contact: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <section id="contact" className="bg-slate-950 py-20 md:py-32">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 animate-fade-in-up">
                    Get In <span className="text-amber-400">Touch</span>
                </h2>
                <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 animate-fade-in-up delay-100">
                    Have a question or feedback? We'd love to hear from you.
                </p>

                <div className="max-w-xl mx-auto animate-fade-in-up delay-200 border-2 border-amber-400 rounded-lg p-6">
                    <form onSubmit={handleSubmit} noValidate className="space-y-6 text-left" aria-live="polite">
                        <FormInput
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your Name"
                            required
                            icon={<UserIcon className="h-5 w-5 text-gray-400" />}
                        />
                        <FormInput
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Your Email"
                            required
                            icon={<MailIcon className="h-5 w-5 text-gray-400" />}
                        />
                        <FormInput
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Your Message"
                            required
                            icon={<div />} // No icon for textarea
                            isTextArea
                        />

                        <div className="text-center space-y-2">
                            <button
                                type="submit"
                                className="inline-flex items-center justify-center bg-amber-400 text-black font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-200 ease-out motion-safe:hover:scale-105 motion-safe:active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                            >
                                Send Message
                            </button>
                            <p className="text-xs text-gray-400">Submission is disabled in the skeleton build.</p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
