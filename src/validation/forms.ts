import type { CalculatorInputs } from '@/types';
import type { IncidentData } from '@/types/ai';

export const validateSupportCalculator = (
    inputs: CalculatorInputs
): { isValid: boolean; errors: Record<string, string> } => {
    const errors: Record<string, string> = {};
    let isValid = true;

    const payorIncome = parseFloat(inputs.payorIncome);
    if (!inputs.payorIncome || Number.isNaN(payorIncome) || payorIncome < 0) {
        errors.payorIncome = 'Please enter a valid positive income.';
        isValid = false;
    }

    const recipientIncome = parseFloat(inputs.recipientIncome);
    if (!inputs.recipientIncome || Number.isNaN(recipientIncome) || recipientIncome < 0) {
        errors.recipientIncome = 'Please enter a valid positive income.';
        isValid = false;
    }

    if (inputs.recipientAge) {
        const age = parseFloat(inputs.recipientAge);
        if (Number.isNaN(age) || age < 16 || age > 120) {
            errors.recipientAge = 'Please enter a valid age (16-120).';
            isValid = false;
        }
    }

    const numChildren = parseInt(inputs.numChildren, 10);
    if (Number.isNaN(numChildren) || numChildren < 0) {
        errors.numChildren = 'Invalid number.';
        isValid = false;
    } else if (numChildren > 0) {
        inputs.childAges.forEach((ageValue, index) => {
            const age = parseFloat(ageValue);
            if (!ageValue || Number.isNaN(age) || age < 0 || age > 25) {
                errors[`childAge_${index}`] = 'Age must be 0-25.';
                isValid = false;
            }
        });

        if (inputs.parentingType === 'shared') {
            const shared = parseFloat(inputs.sharedPercentage);
            if (Number.isNaN(shared) || shared < 40 || shared > 60) {
                errors.sharedPercentage = 'Must be 40-60%.';
                isValid = false;
            }
        }
    }

    if (!inputs.dateOfSeparation) {
        errors.dateOfSeparation = 'Separation date is required.';
        isValid = false;
    }

    if (!inputs.dateOfCohabitation && !inputs.dateOfMarriage) {
        errors.dates = 'Please enter at least one start date (Cohabitation or Marriage).';
        isValid = false;
    } else if (inputs.dateOfSeparation) {
        const separation = new Date(inputs.dateOfSeparation);
        const cohabitation = inputs.dateOfCohabitation ? new Date(inputs.dateOfCohabitation) : null;
        const marriage = inputs.dateOfMarriage ? new Date(inputs.dateOfMarriage) : null;

        if (cohabitation && cohabitation >= separation) {
            errors.dates = 'Cohabitation date must be before separation date.';
            isValid = false;
        }
        if (marriage && marriage >= separation) {
            errors.dates = 'Marriage date must be before separation date.';
            isValid = false;
        }
    }

    return { isValid, errors };
};

export const validateIncidentData = (
    incidentData: IncidentData
): { isValid: boolean; errors: string | null } => {
    const isValid =
        incidentData.narrative.trim().length > 0 &&
        incidentData.jurisdiction.trim().length > 0 &&
        incidentData.incidentDate.trim().length > 0 &&
        incidentData.otherPartiesInvolved.length > 0;

    return {
        isValid,
        errors: isValid ? null : 'Please complete all required incident fields.',
    };
};

export const validateCaseAnalysisForm = (
    files: File[],
    pastedText: string,
    jurisdiction: string
): { isValid: boolean; error: string | null } => {
    if (files.length === 0 && !pastedText.trim()) {
        return { isValid: false, error: 'Please upload files or paste text to analyze.' };
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
        return { isValid: false, error: 'Please paste an email to analyze.' };
    }

    return { isValid: true, error: null };
};
