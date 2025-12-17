import type { EmailBuddyResponse } from '@/types/ai';
import { generateAndParseJson } from './responses';
import { emailAnalyzerAndDrafterSystemPrompt, jargonExplanationSystemPrompt } from '@/prompts';

export const analyzeAndDraftEmailResponses = async (email: string): Promise<EmailBuddyResponse> => {
    return generateAndParseJson<EmailBuddyResponse>({
        systemInstruction: emailAnalyzerAndDrafterSystemPrompt,
        userPrompt: email,
    });
};

export const explainJargon = async (
    term: string,
    context: string
): Promise<{ explanation: string; suggested_question: string }> => {
    return generateAndParseJson<{ explanation: string; suggested_question: string }>({
        systemInstruction: jargonExplanationSystemPrompt,
        userPrompt: `Explain the term "${term}" in this context:\n${context}`,
    });
};
