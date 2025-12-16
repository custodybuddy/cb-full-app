import {
    getJurisdictionMetadata,
    normalizeJurisdiction,
    JurisdictionMetadata,
} from '../data/jurisdictions';

interface JurisdictionContext {
    display: string;
    metadata?: JurisdictionMetadata;
    note?: string;
}

/**
 * Normalizes a jurisdiction string and returns metadata-driven context for prompts/UI.
 * Falls back to the raw input if no match is found.
 */
export const buildJurisdictionContext = (input: string): JurisdictionContext => {
    const normalized = normalizeJurisdiction(input);
    const metadata = getJurisdictionMetadata(normalized);
    if (!metadata) {
        return {
            display: input.trim(),
        };
    }

    const noteParts: string[] = [];
    if (metadata.notes) {
        noteParts.push(metadata.notes);
    }
    if (metadata.country === 'CA' && metadata.hasUnifiedFamilyCourt !== undefined) {
        noteParts.push(metadata.hasUnifiedFamilyCourt
            ? 'Unified family court is available in at least some regions.'
            : 'No unified family court province-wide.');
    }
    if (metadata.country === 'US' && metadata.usesUCCJEA) {
        noteParts.push('UCCJEA applies: home-state (last 6 months) governs custody jurisdiction.');
    }

    return {
        display: metadata.region,
        metadata,
        note: noteParts.join(' '),
    };
};
