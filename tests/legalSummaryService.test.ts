import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

vi.mock('../src/constants', () => ({
    mapAllegationToStatutes: vi.fn(() => [{ label: 'Statute', link: 'https://example.com' }]),
}));

import { mapIncidentToLegalSummary } from '@/domain';
import { JurisdictionInfo } from '../src/types/legal';

const mockJurisdiction: JurisdictionInfo = {
    id: 'ontario',
    region: 'Ontario',
    country: 'CA',
};

const clearEnv = () => {
    delete process.env.LEGAL_SUMMARY_API_URL;
    delete process.env.VITE_LEGAL_SUMMARY_API_URL;
};

describe('mapIncidentToLegalSummary', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
        clearEnv();
    });

    afterEach(() => {
        clearEnv();
    });

    it('uses API endpoint when configured and returns API payload', async () => {
        process.env.LEGAL_SUMMARY_API_URL = 'https://example.com/legal-summary';
        const mockResponse = {
            allegations: [],
            jurisdiction: mockJurisdiction,
            generatedAt: '2024-01-01T00:00:00Z',
        };

        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            ok: true,
            json: async () => mockResponse,
        }));

        const result = await mapIncidentToLegalSummary(
            { narrative: 'test', jurisdiction: 'Ontario', incidentDate: '', otherPartiesInvolved: [], childrenPresent: [], location: '' },
            mockJurisdiction
        );

        expect(result.jurisdiction.region).toBe('Ontario');
        expect(result.generatedAt).toBe('2024-01-01T00:00:00Z');
        expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it('falls back to heuristic mapping when API fails', async () => {
        vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network')));

        const result = await mapIncidentToLegalSummary(
            {
                narrative: 'He yelled, threatened, and withheld money, causing fear.',
                jurisdiction: 'Ontario',
                incidentDate: '',
                otherPartiesInvolved: [],
                childrenPresent: [],
                location: '',
            },
            mockJurisdiction
        );

        expect(result.allegations.length).toBeGreaterThan(0);
        expect(result.allegations[0].statutes.length).toBeGreaterThan(0);
        expect(result.generatedAt).toBeTruthy();
    });
});
