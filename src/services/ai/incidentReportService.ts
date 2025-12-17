import type { IncidentData, IncidentReport } from '@/types/ai';
import { generateAndParseJson } from './responses';
import { incidentReportSystemPrompt } from '@/prompts';

export const generateIncidentReport = async (incidentData: IncidentData): Promise<IncidentReport> => {
    const userPrompt = [
        `Jurisdiction: ${incidentData.jurisdiction}`,
        `Incident date: ${incidentData.incidentDate}`,
        `Location: ${incidentData.location || 'Not provided'}`,
        `Other parties involved: ${incidentData.otherPartiesInvolved.join(', ') || 'None provided'}`,
        `Children present: ${incidentData.childrenPresent.join(', ') || 'None provided'}`,
        '',
        'Narrative:',
        incidentData.narrative,
    ].join('\n');

    return generateAndParseJson<IncidentReport>({
        systemInstruction: incidentReportSystemPrompt,
        userPrompt,
    });
};
