/**
 * Centralized terminology map keyed by jurisdiction.
 * Defaults to Canada Divorce Act language if no specific override is provided.
 */

export interface TermEntry {
    label: string;
    tooltip?: string;
    notes?: string;
}

export interface TerminologySet {
    decisionMakingResponsibility: TermEntry;
    parentingTime: TermEntry;
    courtOrderOrAgreement: TermEntry;
    applicant?: TermEntry;
    respondent?: TermEntry;
}

type JurisdictionKey =
    | 'canada'
    | 'alberta'
    | 'british_columbia'
    | 'manitoba'
    | 'new_brunswick'
    | 'newfoundland_and_labrador'
    | 'nova_scotia'
    | 'ontario'
    | 'prince_edward_island'
    | 'quebec'
    | 'saskatchewan'
    | 'northwest_territories'
    | 'nunavut'
    | 'yukon';

const DEFAULT_TERMINOLOGY: TerminologySet = {
    decisionMakingResponsibility: {
        label: 'Decision-making responsibility',
        tooltip: 'Divorce Act term for who makes significant decisions for the child. Avoid using “custody” in forms.',
    },
    parentingTime: {
        label: 'Parenting time',
        tooltip: 'Divorce Act term for when a child is in the care of a parent or another person. Avoid the term “access”.',
    },
    courtOrderOrAgreement: {
        label: 'Court order / agreement',
        tooltip: 'Any binding order or agreement that sets out parenting time or decision-making responsibility.',
    },
    applicant: {
        label: 'Applicant',
        tooltip: 'Party who starts the application (may be “claimant” in some courts). Use only if the context fits.',
    },
    respondent: {
        label: 'Respondent',
        tooltip: 'Party responding to the application (may be “respondent” or “defendant” depending on the court). Use only if the context fits.',
    },
};

// Jurisdiction-specific overrides (keep minimal; expand as needed)
const TERMINOLOGY_MAP: Partial<Record<JurisdictionKey, Partial<TerminologySet>>> = {
    quebec: {
        decisionMakingResponsibility: {
            label: 'Parental authority',
            tooltip: 'Quebec terminology analogous to decision-making responsibility under the Divorce Act.',
        },
    },
};

const normalizeJurisdictionKey = (input: string | null | undefined): JurisdictionKey | null => {
    if (!input) return null;
    const normalized = input.trim().toLowerCase();
    const match = normalized
        .replace(/[^a-z\s]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

    switch (match) {
        case 'alberta': return 'alberta';
        case 'british columbia':
        case 'bc':
        case 'b c': return 'british_columbia';
        case 'manitoba': return 'manitoba';
        case 'new brunswick': return 'new_brunswick';
        case 'newfoundland and labrador':
        case 'newfoundland':
        case 'labrador': return 'newfoundland_and_labrador';
        case 'nova scotia': return 'nova_scotia';
        case 'ontario': return 'ontario';
        case 'prince edward island':
        case 'pei': return 'prince_edward_island';
        case 'quebec':
        case 'québec': return 'quebec';
        case 'saskatchewan': return 'saskatchewan';
        case 'northwest territories':
        case 'nwt': return 'northwest_territories';
        case 'nunavut': return 'nunavut';
        case 'yukon': return 'yukon';
        default: return null;
    }
};

/**
 * Returns the terminology set for a jurisdiction, falling back to Canada Divorce Act wording.
 */
export const getTerminology = (jurisdiction?: string | null): TerminologySet => {
    const key = normalizeJurisdictionKey(jurisdiction);
    const overrides = key ? TERMINOLOGY_MAP[key] : undefined;

    return {
        decisionMakingResponsibility: overrides?.decisionMakingResponsibility || DEFAULT_TERMINOLOGY.decisionMakingResponsibility,
        parentingTime: overrides?.parentingTime || DEFAULT_TERMINOLOGY.parentingTime,
        courtOrderOrAgreement: overrides?.courtOrderOrAgreement || DEFAULT_TERMINOLOGY.courtOrderOrAgreement,
        applicant: overrides?.applicant || DEFAULT_TERMINOLOGY.applicant,
        respondent: overrides?.respondent || DEFAULT_TERMINOLOGY.respondent,
    };
};

/**
 * Helper to pull the saved jurisdiction from localStorage (if available) and return terminology.
 * Does not attempt geolocation or guessing.
 */
export const getSavedTerminology = (): TerminologySet => {
    let saved: string | null = null;
    try {
        saved = localStorage.getItem('cb_jurisdiction');
    } catch {
        saved = null;
    }
    return getTerminology(saved);
};
