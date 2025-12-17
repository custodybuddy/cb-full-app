import type { FalseAllegationResponse } from '@/types/ai';

export interface FalseAllegationInput {
    text: string;
    category: string;
    evidence: string;
    otherCategoryText?: string;
}

export const draftFalseAllegationResponse = async (
    _allegations: FalseAllegationInput[]
): Promise<FalseAllegationResponse> => ({
    // TODO(custodybuddy): Replace with real drafting output.
    rebuttals: [],
    suggested_overall_next_steps: 'Placeholder next steps. Add real guidance output here.',
});
