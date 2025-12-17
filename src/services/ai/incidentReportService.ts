import type { IncidentData, IncidentReport } from '@/types/ai';

export const generateIncidentReport = async (_incidentData: IncidentData): Promise<IncidentReport> => ({
    // TODO(custodybuddy): Replace with real incident report drafting logic.
    title: 'Incident Report (Placeholder)',
    category: 'Other',
    severity: 'Low',
    severityJustification: 'Placeholder severity explanation.',
    professionalSummary: 'Placeholder summary. Wire up drafting when ready.',
    observedImpact: 'Placeholder impact. Add analysis output here.',
    legalInsights: 'Placeholder legal insights. Add jurisdiction-specific logic here.',
    sources: [],
});
