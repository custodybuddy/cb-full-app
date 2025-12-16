import { describe, it, expect } from 'vitest';
import {
    DEFAULT_JURISDICTION,
    JURISDICTION_NAMES,
    resolveJurisdiction,
    JURISDICTIONS,
    getJurisdictionMetadata,
} from '../src/constants/index';

describe('jurisdiction defaults', () => {
    it('keeps DEFAULT_JURISDICTION aligned with metadata list', () => {
        // Ensure we did not accidentally shadow metadata with the UI names array.
        expect(DEFAULT_JURISDICTION).toBeTruthy();
        expect(DEFAULT_JURISDICTION.id).toBe('ontario');
        expect(getJurisdictionMetadata('ontario')?.region).toBe(DEFAULT_JURISDICTION.region);
    });

    it('resolveJurisdiction falls back to DEFAULT_JURISDICTION when empty', () => {
        const resolved = resolveJurisdiction();
        expect(resolved.id).toBe(DEFAULT_JURISDICTION.id);
        expect(resolved.region).toBe(DEFAULT_JURISDICTION.region);
    });

    it('UI-friendly JURISDICTION_NAMES does not replace metadata JURISDICTIONS', () => {
        expect(JURISDICTION_NAMES.length).toBeGreaterThan(0);
        // Metadata array should still carry objects, not strings.
        expect(Array.isArray(JURISDICTIONS)).toBe(true);
        expect(typeof JURISDICTIONS[0]).toBe('object');
        expect((JURISDICTIONS[0] as any).region).toBeDefined();
    });
});
