export type ParentingType = 'primary' | 'shared' | 'split';

export interface CalculatorInputs {
    payorIncome: string;
    recipientIncome: string;
    recipientAge: string;
    jurisdiction?: string;
    numChildren: string;
    childAges: string[];
    parentingType: ParentingType;
    payorParentingTime: string;
    recipientParentingTime: string;
    sharedPercentage: string;
    specialExpenseChildcare: string;
    specialExpenseEducation: string;
    specialExpenseHealth: string;
    dateOfCohabitation: string;
    dateOfMarriage: string;
    dateOfSeparation: string;
}

export interface SupportDuration {
    minYears: number;
    maxYears: number;
    indefinite: boolean;
}

export interface CalculationResult {
    childSupport: number;
    childSupportDirection: 'payor_to_recipient' | 'recipient_to_payor' | 'none';
    undueHardshipApplied?: boolean;
    spousalSupportLow: number;
    spousalSupportMid: number;
    spousalSupportHigh: number;
    combinedSupportLow: number;
    combinedSupportMid: number;
    combinedSupportHigh: number;
    specialExpensesTotal?: number;
    specialExpensesPayorShare?: number;
    specialExpensesRecipientShare?: number;
    duration: SupportDuration;
    notes: string[];
}

export const DEFAULT_INPUTS: CalculatorInputs = {
    payorIncome: '95000',
    recipientIncome: '55000',
    recipientAge: '42',
    jurisdiction: 'Ontario',
    numChildren: '2',
    childAges: ['6', '9'],
    parentingType: 'shared',
    payorParentingTime: '50',
    recipientParentingTime: '50',
    sharedPercentage: '50',
    specialExpenseChildcare: '350',
    specialExpenseEducation: '80',
    specialExpenseHealth: '120',
    dateOfCohabitation: '',
    dateOfMarriage: '',
    dateOfSeparation: '',
};
