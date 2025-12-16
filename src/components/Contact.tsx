import React, { useState } from 'react';
import UserIcon from './icons/UserIcon';
import MailIcon from './icons/MailIcon';
import SpinnerIcon from './icons/SpinnerIcon';
import FormInput from './common/FormInput';
import AlertTriangleIcon from './icons/AlertTriangleIcon';

const WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL;
const isWebhookConfigured = Boolean(WEBHOOK_URL);

type FormState = 'idle' | 'loading' | 'success' | 'error';
interface FormData {
    name: string;
    email: string;
    message: string;
}
interface FormErrors {
    name?: string;
    email?: string;
    message?: string;
}

const AnimatedSuccessIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="64"
        height="64"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path className="checkmark__circle" d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline className="checkmark__check" points="22 4 12 14.01 9 11.01" />
    </svg>
);


const Contact: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });
    const [errors, setErrors] = useState<FormErrors>({});
    const [formState, setFormState] = useState<FormState>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required.';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email address is invalid.';
        }
        if (!formData.message.trim()) newErrors.message = 'Message is required.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isWebhookConfigured || !WEBHOOK_URL) {
            setFormState('error');
            setErrorMessage('Contact form is temporarily unavailable. Please email us directly.');
            return;
        }

        if (!validateForm()) return;

        setFormState('loading');
        setErrorMessage('');

        try {
            const response = await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            
            setFormState('success');
            setFormData({ name: '', email: '', message: '' });

        } catch (error) {
            setFormState('error');
            setErrorMessage('Something went wrong. Please try again later.');
            console.error('Failed to send message:', error);
        }
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
                    {formState === 'success' ? (
                        <div role="status" className="bg-green-500/10 border border-green-500/30 text-green-300 text-center rounded-lg p-8 animate-scale-in">
                           <AnimatedSuccessIcon className="text-green-400 mx-auto animate-success-icon" />
                            <h3 className="text-2xl font-bold mt-4">Message Sent!</h3>
                            <p className="mt-2">Thank you for reaching out. We'll get back to you if a response is needed.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} noValidate className="space-y-6 text-left" aria-live="polite">
                            <FormInput
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your Name"
                                required
                                error={errors.name}
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
                                error={errors.email}
                                icon={<MailIcon className="h-5 w-5 text-gray-400" />}
                            />
                            <FormInput
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Your Message"
                                required
                                error={errors.message}
                                icon={<div />} // No icon for textarea
                                isTextArea
                            />
                            
                            {formState === 'error' && (
                                <div className="bg-red-900/20 border border-red-500/50 text-red-400 text-sm rounded-lg p-3 flex items-center gap-3" role="alert">
                                    <AlertTriangleIcon className="w-5 h-5 flex-shrink-0" />
                                    <p>{errorMessage}</p>
                                </div>
                            )}

                            <div className="text-center">
                                <button
                                    type="submit"
                                    disabled={formState === 'loading' || !isWebhookConfigured}
                                    className="inline-flex items-center justify-center bg-amber-400 text-black font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-200 ease-out motion-safe:hover:scale-105 motion-safe:active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {!isWebhookConfigured ? (
                                        'Contact temporarily unavailable'
                                    ) : formState === 'loading' ? (
                                        <>
                                            <SpinnerIcon className="w-5 h-5 mr-2" />
                                            Sending...
                                        </>
                                    ) : (
                                        'Send Message'
                                    )}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Contact;
