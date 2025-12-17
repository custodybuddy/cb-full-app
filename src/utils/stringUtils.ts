import { IncidentReport, CaseAnalysisReport } from '@/types/ai';

/**
 * Cleans a string for text-to-speech by normalizing whitespace.
 * @param text The input string to clean.
 * @returns A plain text string.
 */
export const cleanMarkdownForSpeech = (text: string): string => {
    return text.replace(/\s+/g, ' ').trim();
};

/**
 * Cleans a draft email string for text-to-speech.
 * Removes the subject line and placeholder brackets.
 * @param emailText The email draft string.
 * @returns A plain text string.
 */
export const cleanEmailForSpeech = (emailText: string): string => {
    return emailText
        .replace(/Subject: Re: .*\n\n/i, '')
        .replace(/\[(.*?)\]/g, '$1')
        .trim();
};


/**
 * Cleans a structured case analysis object and formats it into a single plain text string for text-to-speech.
 * @param analysis The structured analysis object.
 * @returns A plain text string suitable for speech synthesis.
 */
export const cleanAnalysisForSpeech = (analysis: CaseAnalysisReport): string => {
    let speechText = "AI Analysis. ";

    if (analysis.summary) {
        speechText += "Summary: " + analysis.summary + ". ";
    }
    if (analysis.keyClauses && analysis.keyClauses.length > 0) {
        speechText += "Key Clauses and Obligations: ";
        speechText += analysis.keyClauses.map((c: any) => `${c.clause}: ${c.explanation}`).join('. ');
        speechText += ". ";
    }
    if (analysis.discrepancies && analysis.discrepancies.length > 0) {
        speechText += "Potential Discrepancies and Flags: ";
        speechText += analysis.discrepancies.map((d: any) => d.description).join('. ');
        speechText += ". ";
    }
    if (analysis.actionItems && analysis.actionItems.length > 0) {
        speechText += "Action Items and Deadlines: ";
        speechText += analysis.actionItems.map((item: any) => item.item).join('. ');
        speechText += ". ";
    }
    if (analysis.suggestedNextSteps) {
        speechText += "Suggested Next Steps: " + analysis.suggestedNextSteps + ". ";
    }
    
    return cleanMarkdownForSpeech(speechText);
};

/**
 * Cleans an incident report object and formats it into a single plain text string for text-to-speech.
 * @param report The IncidentReport object.
 * @returns A plain text string suitable for speech synthesis.
 */
export const cleanReportForSpeech = (report: IncidentReport): string => {
    let speechText = `Incident Report. Title: ${report.title}. `;
    speechText += `Category: ${report.category}. Severity: ${report.severity}. Justification: ${report.severityJustification}. `;
    speechText += `Professional Summary: ${report.professionalSummary}. `;
    speechText += `Observed Impact: ${report.observedImpact}. `;
    speechText += `Legal Insights: ${report.legalInsights}. `;
    return cleanMarkdownForSpeech(speechText);
};
