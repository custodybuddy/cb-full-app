import { describe, it, expect } from 'vitest';
import { compileLegalReferences, deriveReadableTitle, getDomainFromUrl } from '@/domain/legalRefs';

describe('compileLegalReferences', () => {
    it('extracts inline links and merges with sources', () => {
        const insights = 'Refer to [Family Law Act](https://www.ontario.ca/laws/statute/90f03) and [Case Example](https://www.canlii.org/en/).';
        const sources = ['https://www.canlii.org/en/', 'https://example.com/extra'];

        const result = compileLegalReferences({ legalInsights: insights, sources });
        expect(result.caseLawReferences.some(ref => ref.url.includes('canlii'))).toBe(true);
        expect(result.statuteReferences.some(ref => ref.url.includes('ontario.ca'))).toBe(true);
    });
});

describe('helpers', () => {
    it('deriveReadableTitle uses path segment', () => {
        expect(deriveReadableTitle('https://example.com/foo-bar')).toBe('foo bar');
    });

    it('getDomainFromUrl extracts domain', () => {
        expect(getDomainFromUrl('https://www.example.com/path')).toBe('example.com');
    });
});
