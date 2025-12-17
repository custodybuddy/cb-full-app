export type JurisdictionCountry = 'CA' | 'US';

export type BehaviorType =
    | 'isolation'
    | 'intimidation'
    | 'surveillance'
    | 'economicAbuse'
    | 'threats'
    | 'litigationAbuse'
    | 'manipulation'
    | 'propertyDamage';

export interface StatuteRef {
    label: string;
    link: string;
}

export interface JurisdictionInfo {
    id: string;
    region: string;
    country: JurisdictionCountry;
}

export interface AllegationSummary {
    raw: string;
    type: BehaviorType;
    statutes: StatuteRef[];
    summary: string;
}

export interface LegalSummaryResponse {
    allegations: AllegationSummary[];
    jurisdiction: JurisdictionInfo;
    generatedAt: string;
}
