import { describe, it, expect } from 'vitest';
import { loadEnv } from 'vite';

const env = loadEnv(process.env.NODE_ENV || 'test', process.cwd(), '');
Object.assign(process.env, env);
const deepseekKey = process.env.VITE_DEEPSEEK_API_KEY;
const runLiveTests = process.env.RUN_LIVE_AI_TESTS === '1';
const itWithKey = deepseekKey && runLiveTests ? it : it.skip;

const loadService = async () => import('./llmService');

describe('llmService', () => {
    itWithKey(
        'should generate structured incident analysis',
        async () => {
        const { analyzeIncident } = await loadService();
        const result = await analyzeIncident(
            'Ex refused to return child after scheduled time, became hostile when confronted.',
            'Ontario'
        );

        expect(result).toBeDefined();
        expect(result.summary).toBeTypeOf('string');
        expect(result.summary.length).toBeGreaterThan(10);
        expect(Array.isArray(result.actionItems)).toBe(true);
        expect(result.actionItems.length).toBeGreaterThan(0);
        },
        15000
    );

    itWithKey(
        'should include citations when available',
        async () => {
        const { analyzeIncident } = await loadService();
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
        },
        15000
    );

    it('should throw on validation failure', async () => {
        const { CustodyAIResponse } = await loadService();
        expect(() => CustodyAIResponse.parse({ invalid: 'structure' })).toThrow();
    });
});
