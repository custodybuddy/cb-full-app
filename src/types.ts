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
    payorIncome: '',
    recipientIncome: '',
    recipientAge: '',
    jurisdiction: '',
    numChildren: '0',
    childAges: [],
    parentingType: 'primary',
    payorParentingTime: '50',
    recipientParentingTime: '50',
    sharedPercentage: '50',
    specialExpenseChildcare: '',
    specialExpenseEducation: '',
    specialExpenseHealth: '',
    dateOfCohabitation: '',
    dateOfMarriage: '',
    dateOfSeparation: ''
};
