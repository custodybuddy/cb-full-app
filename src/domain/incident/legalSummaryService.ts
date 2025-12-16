import type { IncidentData } from '@/types/ai';
import type {
    LegalSummaryResponse,
    AllegationSummary,
    JurisdictionInfo,
    BehaviorType,
} from '@/types/legal';
import { mapAllegationToStatutes } from '@/data/legalReferences';
import { getCurrentIsoTimestamp } from '@/utils/dateTime';

const readEnv = (key: string): string | undefined => {
    if (typeof process !== 'undefined' && process.env?.[key]) return process.env[key];
    if (typeof import.meta !== 'undefined') return (import.meta as any).env?.[key];
    return undefined;
};

const resolveApiEndpoint = (): string | undefined =>
    readEnv('LEGAL_SUMMARY_API_URL') || readEnv('VITE_LEGAL_SUMMARY_API_URL');

const FALLBACK_BEHAVIOR: BehaviorType = 'manipulation';

const BEHAVIOR_KEYWORDS: Record<BehaviorType, RegExp[]> = {
    isolation: [/\bblock(ed|ing)?\b/i, /\bwithheld?\b/i, /\bno contact\b/i],
    intimidation: [/\byell(ing)?\b/i, /\bthreat\b/i, /\bafraid\b/i, /\bscare(d)?\b/i],
    surveillance: [/\btrack(ing)?\b/i, /\bmonitor(ing)?\b/i, /\bspy/i],
    economicAbuse: [/\bmoney\b/i, /\bfinancial\b/i, /\bsupport\b/i, /\bwithhold(ing)? funds\b/i],
    threats: [/\bthreat(en(ed|ing)?)?\b/i, /\bharm\b/i],
    litigationAbuse: [/\bcourt\b/i, /\blawyer\b/i, /\bfals(e|ely)\b/i],
    manipulation: [/\bguilt\b/i, /\bmanipulat/i, /\bpressure\b/i],
    propertyDamage: [/\bdamage(d)?\b/i, /\bproperty\b/i, /\bbroke\b/i],
};

const BEHAVIOR_SUMMARY_SNIPPETS: Record<BehaviorType, string> = {
    isolation: 'Patterns that cut the other parent or children off from support or communication.',
    intimidation: 'Conduct that could be perceived as coercive, threatening, or designed to instill fear.',
    surveillance: 'Monitoring, tracking, or collecting information on the other parent without consent.',
    economicAbuse: 'Control or disruption of financial resources, support, or necessities.',
    threats: 'Direct or implied threats toward the parent, children, or property.',
    litigationAbuse: 'Using legal processes to harass or create unnecessary burden.',
    manipulation: 'Attempts to pressure, guilt, or distort facts to gain compliance.',
    propertyDamage: 'Destruction or tampering with property to intimidate or retaliate.',
};

const behaviorLabel = (behavior: BehaviorType) => behavior.replace(/([A-Z])/g, ' $1').toLowerCase();

const isLegalSummaryResponse = (data: unknown): data is LegalSummaryResponse => {
    if (!data || typeof data !== 'object') return false;
    const candidate = data as LegalSummaryResponse;
    return Array.isArray(candidate.allegations) && !!candidate.jurisdiction;
};

const inferBehaviors = (narrative: string): BehaviorType[] => {
    const text = narrative.toLowerCase();
    const matches: BehaviorType[] = [];

    (Object.keys(BEHAVIOR_KEYWORDS) as BehaviorType[]).forEach((behavior) => {
        if (BEHAVIOR_KEYWORDS[behavior].some((pattern) => pattern.test(text))) {
            matches.push(behavior);
        }
    });

    if (!matches.length) return [FALLBACK_BEHAVIOR];
    return Array.from(new Set(matches)).slice(0, 3);
};

const buildAllegation = (
    incident: IncidentData,
    jurisdiction: JurisdictionInfo,
    behavior: BehaviorType
): AllegationSummary => {
    const statutes = mapAllegationToStatutes(behavior, jurisdiction);
    const descriptor = behaviorLabel(behavior);
    const summary = [
        `The narrative suggests possible ${descriptor} in ${jurisdiction.region}.`,
        BEHAVIOR_SUMMARY_SNIPPETS[behavior],
        'This is an automated mapping; replace with an AI-generated, jurisdiction-aware summary when available.',
    ].join(' ');

    return {
        raw: incident.narrative,
        type: behavior,
        statutes,
        summary,
    };
};

const buildFallbackResponse = (
    incident: IncidentData,
    jurisdiction: JurisdictionInfo
): LegalSummaryResponse => {
    const behaviors = inferBehaviors(incident.narrative);
    const allegations = behaviors.map((behavior) => buildAllegation(incident, jurisdiction, behavior));

    return {
        allegations,
        jurisdiction,
        generatedAt: getCurrentIsoTimestamp(),
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

            if (!response.ok) {
                throw new Error(`Legal summary API returned ${response.status}`);
            }

            const data = await response.json();
            if (isLegalSummaryResponse(data)) {
                return {
                    ...data,
                    generatedAt: data.generatedAt || getCurrentIsoTimestamp(),
                };
            }
        } catch (error) {
            console.warn('Falling back to local legal summary mapping:', error);
        }
    }

    return buildFallbackResponse(incident, jurisdiction);
}
