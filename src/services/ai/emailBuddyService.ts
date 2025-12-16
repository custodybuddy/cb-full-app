import { emailAnalyzerAndDrafterSystemPrompt, jargonExplanationSystemPrompt } from '@/prompts';
import { generateAndParseJson } from './responses';
import type { EmailBuddyResponse } from '@/types/ai';

export const analyzeAndDraftEmailResponses = (receivedEmail: string): Promise<EmailBuddyResponse> => {
    return generateAndParseJson<EmailBuddyResponse>({
        systemInstruction: emailAnalyzerAndDrafterSystemPrompt,
        userPrompt: receivedEmail,
    });
};

export const explainJargon = (
    term: string,
    context: string
): Promise<{ explanation: string; suggested_question: string; }> => {
    const prompt = `Term: "${term}"\nContext: "${context}"`;
    return generateAndParseJson<{ explanation: string; suggested_question: string; }>({
        systemInstruction: jargonExplanationSystemPrompt,
        userPrompt: prompt,
    });
};
