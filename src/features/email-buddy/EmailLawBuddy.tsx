import React, { useState } from 'react';
import type { EmailBuddyResponse } from '@/types/ai';
import EmailInputForm from './components/EmailInputForm';
import GeneratedResponses from './components/GeneratedResponses';
import EmailLoadingState from './components/EmailLoadingState';
import { useEmailAnalysis } from './useEmailAnalysis';

const EmailLawBuddy: React.FC<{ isOpen?: boolean }> = () => {
    const disclaimerText = 'Disclaimer: This document was created using artificial intelligence and is intended to provide helpful information. It is not a source of legal advice. We recommend that you verify the information for accuracy.';
    const exampleEmail =
        'You were 30 minutes late again. This is unacceptable and proves you do not respect our agreement. I will be changing next week’s pickup time and expect you to reimburse me for the extra childcare costs.';
    const exampleResponse: EmailBuddyResponse = {
        analysis: {
            tone: 'Demanding and accusatory',
            summary: 'The sender alleges missed pickup, changes the schedule, and requests reimbursement.',
            key_demands: [
                'Move the exchange time earlier for the birthday party.',
                'Send payment for Section 7 expenses.',
            ],
            legal_jargon: [
                { term: 'Right of First Refusal', context: 'Referenced in the schedule change request.' },
                { term: 'Section 7 expenses', context: 'Requested reimbursement for shared child expenses.' },
            ],
        },
        drafts: {
            biff: 'Thanks for the update. I will follow the court-ordered exchange time and confirm the payment details.',
            greyRock: 'Noted. The exchange time remains as ordered.',
            friendlyAssertive: 'Thanks for the update. I will follow the ordered exchange time and can confirm payment once I receive receipts.',
        },
    };
    const [emailText, setEmailText] = useState('');

    const { analyze, result, loading, error, reset } = useEmailAnalysis();

    const handleSubmit = async () => {
        await analyze(emailText);
    };

    const handleReset = () => {
        setEmailText('');
        reset();
    };

    return (
        <div className="min-h-[40vh] space-y-8">
            <EmailInputForm
                value={emailText}
                onChange={setEmailText}
                onSubmit={handleSubmit}
                onExample={() => setEmailText(exampleEmail)}
                loading={loading}
            />
            {error && (
                <div className="rounded-lg border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-200">
                    {error}
                </div>
            )}
            {loading ? (
                <EmailLoadingState />
            ) : (
                <GeneratedResponses
                    response={result || exampleResponse}
                    disclaimer={disclaimerText}
                    onReset={result ? handleReset : undefined}
                    resetDisabled={loading}
                />
            )}
        </div>
    );
};

export default EmailLawBuddy;
