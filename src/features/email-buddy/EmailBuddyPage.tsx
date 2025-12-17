import { FormEvent, useState } from 'react';
import { useEmailBuddy } from './useEmailBuddy';
import { EmailBuddyResult } from './EmailBuddyResult';

export function EmailBuddyPage() {
    const [rawEmail, setRawEmail] = useState('');
    const [jurisdiction, setJurisdiction] = useState('Ontario');
    const { analyze, result, loading, error, reset } = useEmailBuddy();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await analyze({ rawEmail, jurisdiction });
    };

    return (
        <div className="mx-auto max-w-4xl px-4 py-8 space-y-8">
            <header className="space-y-2">
                <h1 className="text-2xl font-bold text-slate-900">Email Law Buddy</h1>
                <p className="text-sm text-slate-600">
                    Paste a high-conflict email and get BIFF and Grey Rock response drafts, plus notes on how it may look in court.
                </p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex gap-3">
                    <select
                        value={jurisdiction}
                        onChange={e => setJurisdiction(e.target.value)}
                        className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
                    >
                        <option>Ontario</option>
                        <option>British Columbia</option>
                        <option>Alberta</option>
                    </select>
                </div>

                <textarea
                    value={rawEmail}
                    onChange={e => setRawEmail(e.target.value)}
                    placeholder="Paste the other parent's email here..."
                    className="h-56 w-full rounded-lg border border-slate-300 p-4 text-sm leading-relaxed focus:border-amber-500 focus:ring-2 focus:ring-amber-500"
                    disabled={loading}
                />

                <button
                    type="submit"
                    disabled={loading || !rawEmail.trim()}
                    className="w-full rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-700 disabled:opacity-60"
                >
                    {loading ? 'Analyzing email…' : 'Generate BIFF & Grey Rock Replies'}
                </button>
            </form>

            {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                    {error}
                </div>
            )}

      {result && (
        <EmailBuddyResult result={result} onReset={reset} />
      )}
        </div>
    );
}

export default EmailBuddyPage;
