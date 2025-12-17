import { CalculatorInputs, CalculationResult } from '@/types';

const toNumber = (value: string | undefined): number => {
    const parsed = Number(value);
    if (Number.isNaN(parsed)) return 0;
    return parsed;
};

const clampNonNegative = (value: number) => (value < 0 ? 0 : value);

const yearsBetween = (start?: string, end?: string): number => {
    if (!start || !end) return 0;
    const startDate = new Date(start);
    const endDate = new Date(end);
    if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) return 0;
    const diffMs = Math.max(0, endDate.getTime() - startDate.getTime());
    return diffMs / (1000 * 60 * 60 * 24 * 365.25);
};

export const calculateSupport = (inputs: CalculatorInputs): CalculationResult => {
    const notes: string[] = [];

    const payorIncome = clampNonNegative(toNumber(inputs.payorIncome));
    let recipientIncome = clampNonNegative(toNumber(inputs.recipientIncome));

    if (!inputs.recipientIncome || recipientIncome === 0) {
        recipientIncome = 30000;
        notes.push('Recipient income imputed based on minimum earning capacity.');
    }

    const numChildren = Math.max(0, parseInt(inputs.numChildren, 10) || 0);
    const payorParentingTime = clampNonNegative(toNumber(inputs.payorParentingTime));
    const recipientParentingTime = clampNonNegative(toNumber(inputs.recipientParentingTime));

    let childSupport = 0;
    let childSupportDirection: CalculationResult['childSupportDirection'] = 'none';

    if (numChildren > 0) {
        const incomeGap = Math.abs(payorIncome - recipientIncome);
        childSupport = Math.round(incomeGap * 0.015 * numChildren);

        if (payorParentingTime > recipientParentingTime) {
            childSupportDirection = 'recipient_to_payor';
        } else if (payorParentingTime < recipientParentingTime) {
            childSupportDirection = 'payor_to_recipient';
        } else {
            childSupportDirection = payorIncome >= recipientIncome ? 'payor_to_recipient' : 'recipient_to_payor';
        }
    }

    let undueHardshipApplied = false;
    const payerIncome =
        childSupportDirection === 'payor_to_recipient'
            ? payorIncome
            : childSupportDirection === 'recipient_to_payor'
              ? recipientIncome
              : 0;

    if (childSupportDirection !== 'none' && payerIncome > 0 && payerIncome < 30000) {
        undueHardshipApplied = true;
        childSupport = 0;
        notes.push('Undue hardship applied due to limited payer income.');
    }

    const incomeGap = Math.max(0, payorIncome - recipientIncome);
    const spousalSupportLow = Math.round(incomeGap * 0.015);
    const spousalSupportHigh = Math.round(incomeGap * 0.03);
    const spousalSupportMid = Math.round((spousalSupportLow + spousalSupportHigh) / 2);

    const childAdjustment =
        childSupportDirection === 'recipient_to_payor' ? childSupport : childSupportDirection === 'payor_to_recipient' ? -childSupport : 0;

    const combinedSupportLow = Math.max(0, spousalSupportLow + childAdjustment);
    const combinedSupportMid = Math.max(0, spousalSupportMid + childAdjustment);
    const combinedSupportHigh = Math.max(0, spousalSupportHigh + childAdjustment);

    const yearsTogether = yearsBetween(inputs.dateOfCohabitation || inputs.dateOfMarriage, inputs.dateOfSeparation);
    const minYears = Math.max(1, Math.round(yearsTogether * 0.3));
    const maxYears = Math.max(minYears, Math.round(yearsTogether * 0.6));
    const indefinite = yearsTogether >= 20;

    return {
        childSupport,
        childSupportDirection,
        undueHardshipApplied,
        spousalSupportLow,
        spousalSupportMid,
        spousalSupportHigh,
        combinedSupportLow,
        combinedSupportMid,
        combinedSupportHigh,
        duration: {
            minYears,
            maxYears,
            indefinite,
        },
        notes,
    };
};
