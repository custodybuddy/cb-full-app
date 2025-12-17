import React, { useState } from 'react';
import type { EmailBuddyResponse } from '@/types/ai';
import EmailInputForm from './components/EmailInputForm';
import GeneratedResponses from './components/GeneratedResponses';
import EmailLoadingState from './components/EmailLoadingState';
import { useEmailBuddy } from './useEmailBuddy';

const DISCLAIMER_TEXT =
    'Disclaimer: This document was created using artificial intelligence and is intended to provide helpful information. It is not a source of legal advice. We recommend that you verify the information for accuracy.';

const EXAMPLE_EMAIL =
    'You were 30 minutes late again. This is unacceptable and proves you do not respect our agreement. I will be changing next week’s pickup time and expect you to reimburse me for the extra childcare costs.';

const EXAMPLE_RESPONSE: EmailBuddyResponse = {
    originalTone: 'Demanding and accusatory, using time pressure and blame.',
    keyDemands: [
        'Change the next exchange time unilaterally.',
        'Reimburse additional childcare expenses.',
    ],
    riskFlags: [
        'Attempts to rewrite the schedule without mutual consent.',
        'Blaming language that could escalate conflict.',
    ],
    biffReply:
        'Thanks for the update. I will follow the current exchange schedule in our agreement. Please send any childcare receipts so I can review them promptly.',
    greyRockReply:
        'Noted. I will be at the scheduled exchange time. Send the childcare receipts when available.',
    notesForCourt: [
        'Message criticizes compliance and proposes a unilateral change.',
        'Response focuses on the existing agreement and documentation.',
    ],
};

const EmailLawBuddy: React.FC<{ isOpen?: boolean }> = () => {
    const [emailText, setEmailText] = useState('');

    const { analyze, result, loading, error, reset } = useEmailBuddy();

    const handleSubmit = async () => {
        await analyze({ rawEmail: emailText, jurisdiction: 'Ontario' });
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
                onExample={() => setEmailText(EXAMPLE_EMAIL)}
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
                    response={result || EXAMPLE_RESPONSE}
                    disclaimer={DISCLAIMER_TEXT}
                    onReset={result ? handleReset : undefined}
                    resetDisabled={loading}
                />
            )}
        </div>
    );
};

export default EmailLawBuddy;
