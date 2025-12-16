import { describe, it, expect } from 'vitest';
import {
    validateSupportCalculator,
    validateIncidentData,
    validateCaseAnalysisForm,
    validateEmailBuddyInput
} from '@/validation/forms';
import { DEFAULT_INPUTS } from '@/types';

describe('validation schemas', () => {
    it('accepts a valid support calculator payload', () => {
        const valid = {
            ...DEFAULT_INPUTS,
            payorIncome: '80000',
            recipientIncome: '40000',
            recipientAge: '35',
            numChildren: '2',
            childAges: ['5', '8'],
            dateOfSeparation: '2023-01-01',
            dateOfCohabitation: '2010-01-01'
        };
        const result = validateSupportCalculator(valid);
        expect(result.isValid).toBe(true);
        expect(result.errors).toEqual({});
    });

    it('flags invalid support calculator fields', () => {
        const invalid = {
            ...DEFAULT_INPUTS,
            payorIncome: '-1',
            recipientIncome: '',
            recipientAge: '10',
            numChildren: '-1',
            childAges: [],
            dateOfSeparation: '',
            dateOfCohabitation: '',
            dateOfMarriage: ''
        };
        const result = validateSupportCalculator(invalid);
        expect(result.isValid).toBe(false);
        expect(result.errors.payorIncome).toBeDefined();
        expect(result.errors.recipientIncome).toBeDefined();
        expect(result.errors.recipientAge).toBeDefined();
        expect(result.errors.numChildren).toBeDefined();
        expect(result.errors.dateOfSeparation).toBeDefined();
        expect(result.errors.dates).toBeDefined();
    });

    it('requires incident fields', () => {
        const result = validateIncidentData({
            narrative: '',
            jurisdiction: '',
            incidentDate: '',
            otherPartiesInvolved: [],
            childrenPresent: [],
            location: ''
        });
        expect(result.isValid).toBe(false);
        expect(result.errors).toBeTruthy();
    });

    it('validates case analysis inputs', () => {
        const empty = validateCaseAnalysisForm([], '', '');
        expect(empty.isValid).toBe(false);
        const missingJurisdiction = validateCaseAnalysisForm([new File(['x'], 'a.txt')], '', '');
        expect(missingJurisdiction.isValid).toBe(false);
        const ok = validateCaseAnalysisForm([], 'text', 'Ontario');
        expect(ok.isValid).toBe(true);
    });

    it('validates email buddy input', () => {
        expect(validateEmailBuddyInput('').isValid).toBe(false);
        expect(validateEmailBuddyInput('hello').isValid).toBe(true);
    });
});
