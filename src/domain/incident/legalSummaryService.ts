import type { IncidentData } from '@/types/ai';
import type { LegalSummaryResponse, JurisdictionInfo, AllegationSummary, BehaviorType } from '@/types/legal';
import { mapAllegationToStatutes } from '@/constants';

const readEnv = (key: string): string | undefined => {
    if (typeof process !== 'undefined' && process.env?.[key]) return process.env[key];
    if (typeof import.meta !== 'undefined') return (import.meta as any).env?.[key];
    return undefined;
};

const resolveApiEndpoint = (): string | undefined =>
    readEnv('LEGAL_SUMMARY_API_URL') || readEnv('VITE_LEGAL_SUMMARY_API_URL');

const BEHAVIOR_KEYWORDS: Record<BehaviorType, RegExp[]> = {
    isolation: [/(withhold|no contact|block)/i],
    intimidation: [/(yell|threat|afraid|scare)/i],
    surveillance: [/(track|monitor|spy)/i],
    economicAbuse: [/(withhold money|financial|support)/i],
    threats: [/(threat|harm)/i],
    litigationAbuse: [/(court|lawyer|filing)/i],
    manipulation: [/(guilt|manipulat|pressure)/i],
    propertyDamage: [/(damage|broke|property)/i],
};

const inferBehaviors = (narrative: string): BehaviorType[] => {
    const matches: BehaviorType[] = [];
    (Object.keys(BEHAVIOR_KEYWORDS) as BehaviorType[]).forEach((behavior) => {
        if (BEHAVIOR_KEYWORDS[behavior].some((pattern) => pattern.test(narrative))) {
            matches.push(behavior);
        }
    });
    return matches.length ? Array.from(new Set(matches)) : ['manipulation'];
};

const buildAllegation = (incident: IncidentData, jurisdiction: JurisdictionInfo, behavior: BehaviorType): AllegationSummary => ({
    raw: incident.narrative,
    type: behavior,
    statutes: mapAllegationToStatutes(behavior, jurisdiction),
    summary: `Heuristic summary for ${behavior}.`,
});

const isLegalSummaryResponse = (data: unknown): data is LegalSummaryResponse => {
    if (!data || typeof data !== 'object') return false;
    const candidate = data as LegalSummaryResponse;
    return Array.isArray(candidate.allegations) && !!candidate.jurisdiction;
};

const buildFallbackResponse = (incident: IncidentData, jurisdiction: JurisdictionInfo): LegalSummaryResponse => {
    const allegations = inferBehaviors(incident.narrative).map((behavior) =>
        buildAllegation(incident, jurisdiction, behavior)
    );
    return {
        allegations,
        jurisdiction,
        generatedAt: new Date().toISOString(),
    };
};

export async function mapIncidentToLegalSummary(
    incident: IncidentData,
    jurisdiction: JurisdictionInfo
): Promise<LegalSummaryResponse> {
    const endpoint = resolveApiEndpoint();

    if (endpoint) {
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ incident, jurisdiction }),
            });

            if (response.ok) {
                const data = await response.json();
                if (isLegalSummaryResponse(data)) {
                    return {
                        ...data,
                        generatedAt: data.generatedAt || new Date().toISOString(),
                    };
                }
            }
        } catch {
            // fall through to heuristic mapping
        }
    }

    return buildFallbackResponse(incident, jurisdiction);
}
