import { falseAllegationResponseSystemPrompt } from '@/prompts';
import { generateAndParseJson } from './responses';
import { FalseAllegationResponse } from '@/types/ai';
import { AllegationItem } from '@/contexts/FalseAllegationContext'; // Import AllegationItem

export const draftFalseAllegationResponse = (allegations: AllegationItem[]): Promise<FalseAllegationResponse> => {
    const formattedAllegationsAndEvidence = allegations.map(a =>
        `• Allegation (${a.category === 'Other' ? a.otherCategoryText : a.category || 'Uncategorized'}): ${a.text}\n  Evidence: ${a.evidence || 'Not provided'}`
    ).join('\n');

    const userPrompt = `Allegations and Evidence:\n${formattedAllegationsAndEvidence}`;

    return generateAndParseJson<FalseAllegationResponse>({
        systemInstruction: falseAllegationResponseSystemPrompt,
        userPrompt: userPrompt,
    });
};
