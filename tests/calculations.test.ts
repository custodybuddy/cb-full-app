import { describe, it, expect } from 'vitest';
import { calculateSupport } from '../src/utils/calculations';
import { CalculatorInputs, DEFAULT_INPUTS } from '../src/types';

const baseInputs = (overrides: Partial<CalculatorInputs>): CalculatorInputs => ({
    ...DEFAULT_INPUTS,
    payorIncome: '120000',
    recipientIncome: '0',
    numChildren: '0',
    sharedPercentage: '50',
    parentingType: 'primary',
    childAges: [],
    dateOfSeparation: '2024-01-01',
    dateOfCohabitation: '2000-01-01',
    jurisdiction: 'Ontario',
    ...overrides
});

describe('calculateSupport', () => {
    it('uses without-child formula when no children', () => {
        const result = calculateSupport(baseInputs({ recipientIncome: '30000', numChildren: '0' }));
        expect(result.childSupport).toBe(0);
        expect(result.spousalSupportLow).toBeGreaterThanOrEqual(0);
        expect(result.spousalSupportHigh).toBeGreaterThanOrEqual(result.spousalSupportLow);
    });

    it('uses with-child formula when children > 0', () => {
        const result = calculateSupport(
            baseInputs({
                recipientIncome: '30000',
                numChildren: '2',
                childAges: ['5', '8'],
                parentingType: 'primary'
            })
        );
        expect(result.childSupport).toBeGreaterThanOrEqual(0);
        expect(result.spousalSupportLow).toBeGreaterThanOrEqual(0);
        expect(result.spousalSupportHigh).toBeGreaterThanOrEqual(result.spousalSupportLow);
    });

    it('imputes recipient income when missing/zero', () => {
        const result = calculateSupport(
            baseInputs({
                recipientIncome: '',
                numChildren: '0'
            })
        );
        expect(result.spousalSupportLow).toBeGreaterThan(0);
        expect(result.notes.some(n => n.toLowerCase().includes('imputed'))).toBe(true);
    });

    it('applies offset when lower-income parent has less time and owes child support', () => {
        const result = calculateSupport(
            baseInputs({
                payorIncome: '120000',
                recipientIncome: '40000',
                numChildren: '2',
                childAges: ['5', '8'],
                parentingType: 'primary',
                payorParentingTime: '70',
                recipientParentingTime: '30'
            })
        );
        expect(result.childSupportDirection).toBe('recipient_to_payor');
        expect(result.combinedSupportMid).toBeGreaterThanOrEqual(result.spousalSupportMid - result.childSupport);
    });

    it('applies undue hardship reduction for lower-income payer', () => {
        const result = calculateSupport(
            baseInputs({
                payorIncome: '50000',
                recipientIncome: '25000',
                numChildren: '2',
                childAges: ['6', '9'],
                parentingType: 'primary',
                payorParentingTime: '70',
                recipientParentingTime: '30'
            })
        );
        expect(result.undueHardshipApplied).toBe(true);
        expect(result.childSupport).toBe(0);
        expect(result.notes.some(n => n.toLowerCase().includes('undue hardship'))).toBe(true);
    });
});
