import React from 'react';

interface EmailInputFormProps {
    value: string;
    onChange: (value: string) => void;
    onSubmit: () => void;
    onExample?: () => void;
    loading?: boolean;
}

const EmailInputForm: React.FC<EmailInputFormProps> = ({
    value,
    onChange,
    onSubmit,
    onExample,
    loading = false,
}) => {
    const MAX_EMAIL_CHARS = 6000;

    return (
        <form
            className="space-y-6"
            onSubmit={event => {
                event.preventDefault();
                onSubmit();
            }}
        >
            <p className="text-gray-400 text-sm">
                Paste a high-conflict email below. Our AI will analyze it and instantly generate professional, court-ready draft responses using proven de-escalation techniques.
            </p>

            <div className="text-center text-sm bg-slate-900 p-3 rounded-lg border border-slate-700">
                <p className="text-gray-400">
                    Need to write an email from scratch?
                    <span className="font-semibold text-amber-400 ml-2">Visit our Template Library →</span>
                </p>
            </div>

            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <label htmlFor="received-email" className="block text-sm font-medium text-gray-300">
                        Email You Received
                    </label>
                    <button
                        className="text-xs text-amber-400 font-semibold transition-colors disabled:opacity-50"
                        type="button"
                        onClick={onExample}
                        disabled={!onExample || loading}
                    >
                        Show Example
                    </button>
                </div>
                <textarea
                    id="received-email"
                    value={value}
                    onChange={event => onChange(event.target.value)}
                    className="w-full h-40 p-3 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none transition-shadow duration-200"
                    maxLength={MAX_EMAIL_CHARS}
                    aria-describedby="received-email-help"
                    disabled={loading}
                />
                <p id="received-email-help" className="text-xs text-gray-400">Up to {MAX_EMAIL_CHARS.toLocaleString()} characters.</p>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-700">
                <button
                    disabled={loading || value.trim().length === 0}
                    type="submit"
                    className="inline-flex items-center justify-center bg-amber-400 text-black font-bold py-2 px-6 rounded-full shadow-lg transition-all duration-200 ease-out disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Analyzing...' : 'Generate Responses'}
                </button>
            </div>
        </form>
    );
};

export default EmailInputForm;
