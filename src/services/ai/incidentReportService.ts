import { incidentReportSystemPrompt } from '@/prompts';
import { buildJurisdictionContext } from '@/utils/jurisdictionUtils';
import type { IncidentData, IncidentReport } from '@/types/ai';
import { generateAndParseJson } from './responses';

export const generateIncidentReport = (data: IncidentData): Promise<IncidentReport> => {
    const jurisdictionContext = buildJurisdictionContext(data.jurisdiction);
    const jurisdictionLine = jurisdictionContext.note
        ? `${jurisdictionContext.display} — ${jurisdictionContext.note}`
        : jurisdictionContext.display;

    const prompt = [
        `Jurisdiction: ${jurisdictionLine}`,
        `Incident Date: ${data.incidentDate}`,
        `Location: ${data.location || 'Not specified'}`,
        `Other Parties Involved: ${data.otherPartiesInvolved.join(', ') || 'None specified'}`,
        `Children Present/Affected: ${data.childrenPresent.join(', ') || 'None specified'}`,
        '',
        "User's Narrative:",
        data.narrative.trim(),
    ].join('\n');

    return generateAndParseJson<IncidentReport>({
        systemInstruction: incidentReportSystemPrompt,
        userPrompt: prompt,
    });
};
