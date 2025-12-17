import React from 'react';
import type { EmailBuddyResponse } from '@/types/ai';
import EmailInputForm from './components/EmailInputForm';
import GeneratedResponses from './components/GeneratedResponses';

const EmailLawBuddy: React.FC<{ isOpen?: boolean }> = () => {
    const disclaimerText = 'Disclaimer: This document was created using artificial intelligence and is intended to provide helpful information. It is not a source of legal advice. We recommend that you verify the information for accuracy.';
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

    return (
        <div className="min-h-[40vh] space-y-8">
            <EmailInputForm />
            <GeneratedResponses
                response={exampleResponse}
                disclaimer={disclaimerText}
            />
        </div>
    );
};

export default EmailLawBuddy;
