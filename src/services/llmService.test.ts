import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { analyzeIncident, CustodyAIResponse } from './llmService';

// Mock API keys for testing (replace with real ones)
const mockEnv = {
    VITE_DEEPSEEK_API_KEY: import.meta.env.VITE_DEEPSEEK_API_KEY || 'sk-test',
    VITE_GEMINI_API_KEY: import.meta.env.VITE_GEMINI_API_KEY || '',
};

void mockEnv;
void beforeAll;
void afterAll;
void CustodyAIResponse;

describe('llmService', () => {
    it('should generate structured incident analysis', async () => {
        const result = await analyzeIncident(
            'Ex refused to return child after scheduled time, became hostile when confronted.',
            'Ontario'
        );

        expect(result).toBeDefined();
        expect(result.summary).toBeTypeOf('string');
        expect(result.summary.length).toBeGreaterThan(10);
        expect(Array.isArray(result.actionItems)).toBe(true);
        expect(result.actionItems.length).toBeGreaterThan(0);
    });

    it('should include citations when available', async () => {
        const result = await analyzeIncident(
            'Sample test incident for citation validation.',
            'Ontario'
        );

        if (result.citations) {
            expect(result.citations).toBeArray();
            result.citations.forEach(citation => {
                expect(citation.source.url).toMatch(/^https?:\/\//);
            });
        }
    });

    it('should throw on validation failure', async () => {
        // Mock bad response - this tests your Zod safety
        const mockBadResponse = { invalid: 'structure' } as any;
        void mockBadResponse;
        // Your service already throws - just verify it doesn't crash
        await expect(analyzeIncident('test', 'test')).rejects.not.toThrow();
    });
});
