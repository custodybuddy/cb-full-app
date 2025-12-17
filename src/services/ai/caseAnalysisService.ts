import type { CaseAnalysisReport } from '@/types/ai';

export const prepareContentParts = async (files: File[], pastedText: string): Promise<unknown[]> => {
    // TODO(custodybuddy): Replace with real file parsing + normalization logic.
    return [
        {
            type: 'placeholder',
            fileCount: files.length,
            pastedText,
        },
    ];
};

export const analyzeCaseDocuments = async (
    _contentParts: unknown[],
    _jurisdiction: string
): Promise<CaseAnalysisReport> => ({
    documentTypes: [],
    summary: 'Placeholder response. Hook up real analysis when restarting the AI layer.',
    keyClauses: [],
    discrepancies: [],
    legalJargon: [],
    actionItems: [],
    suggestedNextSteps: 'Add suggested next steps once analysis is re-enabled.',
    disclaimer: 'TODO(custodybuddy): Replace with real AI disclaimer text.',
});
