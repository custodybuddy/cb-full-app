import type { CaseAnalysisReport } from '@/types/ai';
import { blobToBase64, pdfToText } from '@/utils/fileUtils';
import { generateAndParseJson } from './responses';
import { caseAnalysisSystemPrompt } from '@/prompts';
import { AIServiceError } from '@/utils/aiError';

export const prepareContentParts = async (files: File[], pastedText: string): Promise<string[]> => {
    const parts: string[] = [];

    for (const file of files) {
        if (file.type.startsWith('image/')) {
            const base64 = await blobToBase64(file);
            parts.push(
                [
                    `START OF DOCUMENT: ${file.name}`,
                    `data:${file.type};base64,${base64}`,
                    `END OF DOCUMENT: ${file.name}`,
                ].join('\n')
            );
        } else if (file.type === 'application/pdf') {
            const text = await pdfToText(file);
            parts.push(
                [
                    `START OF DOCUMENT: ${file.name}`,
                    text,
                    `END OF DOCUMENT: ${file.name}`,
                ].join('\n')
            );
        } else {
            parts.push(
                [
                    `START OF DOCUMENT: ${file.name}`,
                    'Unsupported document type provided.',
                    `END OF DOCUMENT: ${file.name}`,
                ].join('\n')
            );
        }
    }

    if (pastedText.trim()) {
        parts.push(['START OF PASTED TEXT', pastedText, 'END OF PASTED TEXT'].join('\n'));
    }

    return parts;
};

export const analyzeCaseDocuments = async (
    contentParts: unknown[],
    jurisdiction: string
): Promise<CaseAnalysisReport> => {
    const systemInstruction = `${caseAnalysisSystemPrompt}\nJurisdiction: ${jurisdiction}`;
    try {
        return await generateAndParseJson<CaseAnalysisReport>({
            systemInstruction,
            userPrompt: contentParts as string[],
        });
    } catch (error) {
        if (error instanceof AIServiceError && error.code === 'parse') {
            return generateAndParseJson<CaseAnalysisReport>({
                systemInstruction,
                userPrompt: contentParts as string[],
                strictJsonOnly: true,
            });
        }
        throw error;
    }
};
