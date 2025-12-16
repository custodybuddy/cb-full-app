import { blobToBase64, pdfToText } from '@/utils/fileUtils';
import { caseAnalysisSystemPrompt } from '@/prompts';
import { buildJurisdictionContext } from '@/utils/jurisdictionUtils';
import { AIServiceError } from '@/utils/aiError';
import type { CaseAnalysisReport } from '@/types/ai';
import { generateAndParseJson } from './responses';

/**
 * Prepares content chunks from files and text for the AI.
 * Converts images to base64 (as text hints) and extracts text from PDFs.
 */
export const prepareContentParts = async (files: File[], text: string): Promise<string[]> => {
    const fileParts = await Promise.all(files.map(async (file) => {
        if (file.type.startsWith('image/')) {
            const base64Data = await blobToBase64(file);
            return `--- START OF DOCUMENT: ${file.name} ---\nImage (base64): data:${file.type};base64,${base64Data}\n--- END OF DOCUMENT: ${file.name} ---`;
        }

        if (file.type === 'application/pdf') {
            const pdfText = await pdfToText(file);
            return `--- START OF DOCUMENT: ${file.name} ---\n${pdfText}\n--- END OF DOCUMENT: ${file.name} ---`;
        }

        return '';
    }));

    const parts: string[] = fileParts.filter(Boolean);

    if (text.trim()) {
        parts.push(`--- START OF PASTED TEXT ---\n${text}\n--- END OF PASTED TEXT ---`);
    }

    return parts;
};

export const analyzeCaseDocuments = async (contentParts: string[], jurisdiction: string): Promise<CaseAnalysisReport> => {
    const jurisdictionContext = buildJurisdictionContext(jurisdiction);
    const jurisdictionLine = jurisdictionContext.note
        ? `The user's jurisdiction is "${jurisdictionContext.display}". ${jurisdictionContext.note}`
        : `The user's jurisdiction is "${jurisdictionContext.display}".`;

    const personalizedPrompt = `${caseAnalysisSystemPrompt}\n\n**JURISDICTION CONTEXT:** ${jurisdictionLine} All legal analysis should be specific to this jurisdiction.`;

    try {
        return await generateAndParseJson<CaseAnalysisReport>({
            systemInstruction: personalizedPrompt,
            userPrompt: contentParts,
        });
    } catch (err) {
        if (err instanceof AIServiceError && err.code === 'parse') {
            return generateAndParseJson<CaseAnalysisReport>({
                systemInstruction: personalizedPrompt,
                userPrompt: contentParts,
                strictJsonOnly: true,
            });
        }
        throw err;
    }
};
