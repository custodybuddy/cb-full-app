import { CalculatorInputs } from '@/types';
import { IncidentData } from '@/types/ai';

export type ValidationResult<TErrors = Record<string, string>> = {
    isValid: boolean;
    errors: TErrors;
};

export const validateSupportCalculator = (inputs: CalculatorInputs): ValidationResult => {
    const errors: Record<string, string> = {};
    let isValid = true;

    const payorInc = parseFloat(inputs.payorIncome);
    if (!inputs.payorIncome || isNaN(payorInc) || payorInc < 0) {
        errors.payorIncome = 'Please enter a valid positive income.';
        isValid = false;
    }

    const recipientInc = parseFloat(inputs.recipientIncome);
    if (!inputs.recipientIncome || isNaN(recipientInc) || recipientInc < 0) {
        errors.recipientIncome = 'Please enter a valid positive income.';
        isValid = false;
    }

    if (inputs.recipientAge) {
        const age = parseFloat(inputs.recipientAge);
        if (isNaN(age) || age < 16 || age > 120) {
            errors.recipientAge = 'Please enter a valid age (16-120).';
            isValid = false;
        }
    }

    const numChildren = parseInt(inputs.numChildren, 10);
    if (isNaN(numChildren) || numChildren < 0) {
        errors.numChildren = 'Invalid number.';
        isValid = false;
    } else if (numChildren > 0) {
        inputs.childAges.forEach((age, idx) => {
            const ageNum = parseFloat(age);
            if (!age || isNaN(ageNum) || ageNum < 0 || ageNum > 25) {
                errors[`childAge_${idx}`] = 'Age must be 0-25.';
                isValid = false;
            }
        });

        if (inputs.parentingType === 'shared') {
            const pct = parseFloat(inputs.sharedPercentage);
            if (isNaN(pct) || pct < 40 || pct > 60) {
                errors.sharedPercentage = 'Must be 40-60%.';
                isValid = false;
            }
        }
    }

    const specialExpenses = [
        { key: 'specialExpenseChildcare', label: 'Childcare' },
        { key: 'specialExpenseEducation', label: 'Education' },
        { key: 'specialExpenseHealth', label: 'Health' }
    ] as const;
    specialExpenses.forEach(item => {
        const val = inputs[item.key];
        if (val && parseFloat(val) < 0) {
            errors[item.key] = `${item.label} expense must be zero or positive.`;
            isValid = false;
        }
    });

    if (!inputs.dateOfSeparation) {
        errors.dateOfSeparation = 'Separation date is required.';
        isValid = false;
    }

    if (!inputs.dateOfCohabitation && !inputs.dateOfMarriage) {
        errors.dates = 'Please enter at least one start date (Cohabitation or Marriage).';
        isValid = false;
    } else if (inputs.dateOfSeparation) {
        const sep = new Date(inputs.dateOfSeparation);
        const cohab = inputs.dateOfCohabitation ? new Date(inputs.dateOfCohabitation) : null;
        const marr = inputs.dateOfMarriage ? new Date(inputs.dateOfMarriage) : null;

        if (cohab && cohab >= sep) {
            errors.dates = 'Cohabitation date must be before separation date.';
            isValid = false;
        }
        if (marr && marr >= sep) {
            errors.dates = 'Marriage date must be before separation date.';
            isValid = false;
        }
    }

    return { isValid, errors };
};

export const validateIncidentData = (incident: IncidentData): ValidationResult<string | null> => {
    if (!incident.narrative.trim()) {
        return { isValid: false, errors: 'Please provide a narrative of the incident.' };
    }
    if (!incident.jurisdiction.trim()) {
        return { isValid: false, errors: 'Please specify the jurisdiction (e.g., province or state).' };
    }
    if (!incident.incidentDate) {
        return { isValid: false, errors: 'Please select the date of the incident.' };
    }
    if (incident.otherPartiesInvolved.length === 0) {
        return { isValid: false, errors: 'Please select or add at least one other party involved.' };
    }
    return { isValid: true, errors: null };
};

export const validateCaseAnalysisForm = (files: File[], pastedText: string, jurisdiction: string) => {
    if (files.length === 0 && !pastedText.trim()) {
        return { isValid: false, error: 'Please upload at least one document or paste some text to analyze.' };
    }
    if (!jurisdiction.trim()) {
        return { isValid: false, error: 'Please specify the jurisdiction (e.g., province or state).' };
    }
    return { isValid: true, error: null };
};

export const validateEmailBuddyInput = (email: string) => {
    if (!email.trim()) {
        return { isValid: false, error: 'Please paste the email you received to get started.' };
    }
    return { isValid: true, error: null };
};
