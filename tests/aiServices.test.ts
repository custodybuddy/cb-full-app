import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
vi.mock('../src/services/ai/responses', () => ({
    generateAndParseJson: vi.fn(),
}));

import { analyzeCaseDocuments } from '../src/services/ai/caseAnalysisService';
import { analyzeAndDraftEmailResponses, explainJargon } from '../src/services/ai/emailBuddyService';
import { generateIncidentReport } from '../src/services/ai/incidentReportService';
import { generateAndParseJson } from '../src/services/ai/responses';
import { AIServiceError } from '../src/utils/aiError';

const mockGen = generateAndParseJson as unknown as Mock;

describe('feature AI services', () => {
    beforeEach(() => {
        mockGen.mockReset();
    });

    it('analyzeCaseDocuments passes jurisdiction context and retries on parse errors', async () => {
        mockGen
            .mockRejectedValueOnce(new AIServiceError('parse', 'bad json'))
            .mockResolvedValueOnce({ ok: true });

        const result = await analyzeCaseDocuments(['DOC'], 'Ontario');
        expect(result).toEqual({ ok: true });
        expect(mockGen).toHaveBeenCalledTimes(2);
        const firstCall = mockGen.mock.calls[0][0];
        const secondCall = mockGen.mock.calls[1][0];
        expect(firstCall.userPrompt).toEqual(['DOC']);
        expect(firstCall.systemInstruction).toMatch(/Ontario/);
        expect(secondCall.strictJsonOnly).toBe(true);
    });

    it('analyzeAndDraftEmailResponses forwards the email text', async () => {
        mockGen.mockResolvedValueOnce({ drafts: {} });
        await analyzeAndDraftEmailResponses('hello world');
        const call = mockGen.mock.calls[0][0];
        expect(call.userPrompt).toBe('hello world');
        expect(call.systemInstruction).toMatch(/communication analyst/i);
    });

    it('explainJargon formats the prompt with term and context', async () => {
        mockGen.mockResolvedValueOnce({ explanation: 'x', suggested_question: 'y' });
        await explainJargon('UCCJEA', 'custody jurisdiction');
        const call = mockGen.mock.calls[0][0];
        expect(call.userPrompt).toContain('UCCJEA');
        expect(call.userPrompt).toContain('custody jurisdiction');
    });

    it('generateIncidentReport includes key incident fields', async () => {
        mockGen.mockResolvedValueOnce({ title: 'ok' });
        await generateIncidentReport({
            narrative: 'example narrative',
            jurisdiction: 'Ontario',
            incidentDate: '2024-01-01',
            otherPartiesInvolved: ['Other Parent'],
            childrenPresent: ['Child'],
            location: 'Home',
        });
        const call = mockGen.mock.calls[0][0];
        expect(call.userPrompt).toContain('Ontario');
        expect(call.userPrompt).toContain('example narrative');
        expect(call.userPrompt).toContain('2024-01-01');
    });
});
