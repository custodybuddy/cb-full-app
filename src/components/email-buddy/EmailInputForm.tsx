import React from 'react';

interface EmailInputFormProps {
    value: string;
    maxChars: number;
    onChange: (value: string) => void;
    onGenerate: () => void;
    onShowExample: () => void;
    onVisitLibrary: () => void;
    errorMessage?: string | null;
}

const EmailInputForm: React.FC<EmailInputFormProps> = ({
    value,
    maxChars,
    onChange,
    onGenerate,
    onShowExample,
    onVisitLibrary,
    errorMessage,
}) => (
    <div className="space-y-6">
        <p className="text-gray-400 text-sm">
            Paste a high-conflict email below. Our AI will analyze it and instantly generate professional, court-ready draft responses using proven de-escalation techniques.
        </p>

        <div className="text-center text-sm bg-slate-900 p-3 rounded-lg border border-slate-700">
            <p className="text-gray-400">
                Need to write an email from scratch?
                <a href="#/template-library" onClick={onVisitLibrary} className="font-semibold text-amber-400 hover:text-amber-300 ml-2">
                    Visit our Template Library →
                </a>
            </p>
        </div>

        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <label htmlFor="received-email" className="block text-sm font-medium text-gray-300">
                    Email You Received
                </label>
                <button onClick={onShowExample} className="text-xs text-amber-400 hover:text-amber-300 font-semibold transition-colors">
                    Show Example
                </button>
            </div>
            <textarea
                id="received-email"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Paste the full email here..."
                className="w-full h-40 p-3 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none transition-shadow duration-200"
                maxLength={maxChars}
                aria-describedby="received-email-help"
            />
            <p id="received-email-help" className="text-xs text-gray-400">Up to {maxChars.toLocaleString()} characters.</p>
            {errorMessage && (
                <div className="text-xs text-red-400" role="alert">
                    {errorMessage}
                </div>
            )}
        </div>
        
        <div className="flex justify-end pt-4 border-t border-slate-700">
             <button
                onClick={onGenerate}
                disabled={!value.trim()}
                className="inline-flex items-center justify-center bg-amber-400 text-black font-bold py-2 px-6 rounded-full shadow-lg transition-all duration-200 ease-out motion-safe:hover:scale-105 motion-safe:active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Generate Responses
            </button>
        </div>
    </div>
);

export default EmailInputForm;
