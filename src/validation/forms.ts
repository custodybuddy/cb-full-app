import type { CalculatorInputs } from '@/types';
import type { IncidentData } from '@/types/ai';

export const validateSupportCalculator = (
    inputs: CalculatorInputs
): { isValid: boolean; errors: Record<string, string> } => {
    const errors: Record<string, string> = {};

    const payorIncome = Number(inputs.payorIncome);
    const recipientIncome = Number(inputs.recipientIncome);
    const recipientAge = Number(inputs.recipientAge);
    const numChildren = parseInt(inputs.numChildren, 10);

    if (!inputs.payorIncome || Number.isNaN(payorIncome) || payorIncome <= 0) {
        errors.payorIncome = 'Payor income must be greater than zero.';
    }
    if (!inputs.recipientIncome || Number.isNaN(recipientIncome) || recipientIncome < 0) {
        errors.recipientIncome = 'Recipient income is required.';
    }
    if (!inputs.recipientAge || Number.isNaN(recipientAge) || recipientAge < 18) {
        errors.recipientAge = 'Recipient age must be at least 18.';
    }
    if (Number.isNaN(numChildren) || numChildren < 0) {
        errors.numChildren = 'Number of children must be zero or more.';
    }
    if (!inputs.dateOfSeparation) {
        errors.dateOfSeparation = 'Date of separation is required.';
    }
    if (!inputs.dateOfCohabitation && !inputs.dateOfMarriage) {
        errors.dates = 'Provide cohabitation or marriage date.';
    }

    return { isValid: Object.keys(errors).length === 0, errors };
};

export const validateIncidentData = (
    incidentData: IncidentData
): { isValid: boolean; errors: string | null } => {
    if (!incidentData.narrative.trim()) return { isValid: false, errors: 'Narrative is required.' };
    if (!incidentData.jurisdiction.trim()) return { isValid: false, errors: 'Jurisdiction is required.' };
    if (!incidentData.incidentDate) return { isValid: false, errors: 'Incident date is required.' };
    if (incidentData.otherPartiesInvolved.length === 0) return { isValid: false, errors: 'Other parties are required.' };

    return { isValid: true, errors: null };
};

export const validateCaseAnalysisForm = (
    files: File[],
    pastedText: string,
    jurisdiction: string
): { isValid: boolean; error: string | null } => {
    if (!files.length && !pastedText.trim()) {
        return { isValid: false, error: 'Provide files or pasted text.' };
    }
    if (!jurisdiction.trim()) {
        return { isValid: false, error: 'Jurisdiction is required.' };
    }
    return { isValid: true, error: null };
};

export const validateEmailBuddyInput = (
    email: string
): { isValid: boolean; error: string | null } => {
    if (!email.trim()) {
        return { isValid: false, error: 'Email content is required.' };
    }
    return { isValid: true, error: null };
};
