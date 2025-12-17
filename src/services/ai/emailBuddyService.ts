import type { EmailBuddyResponse } from '@/types/ai';

export const analyzeAndDraftEmailResponses = async (_email: string): Promise<EmailBuddyResponse> => ({
    // TODO(custodybuddy): Replace with real analysis + drafting results.
    analysis: {
        tone: 'Placeholder',
        summary: 'Placeholder summary. Connect to new analysis logic when ready.',
        key_demands: [],
        legal_jargon: [],
    },
    drafts: {
        biff: 'TODO(custodybuddy): Replace with BIFF draft output.',
        greyRock: 'TODO(custodybuddy): Replace with Grey Rock draft output.',
        friendlyAssertive: 'TODO(custodybuddy): Replace with Friendly Assertive draft output.',
    },
});

export const explainJargon = async (
    _term: string,
    _context: string
): Promise<{ explanation: string; suggested_question: string }> => ({
    // TODO(custodybuddy): Replace with real term explanation + suggested question.
    explanation: 'Placeholder explanation. Connect to the new jargon helper logic.',
    suggested_question: 'TODO(custodybuddy): Add a follow-up question here.',
});
