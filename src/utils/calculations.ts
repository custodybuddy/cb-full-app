import { CalculatorInputs, CalculationResult, SupportDuration } from '@/types';
import {
    CHILD_SUPPORT_RATE_TABLE,
    PROVINCIAL_AVG_INCOMES,
    PROVINCIAL_BASELINE_INCOME,
    PROVINCIAL_FULL_TIME_INCOME,
    PROVINCIAL_TAX_RATES
} from '@/data/calculator';

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
const roundCurrency = (value: number) => Math.round(value);

const toDate = (value?: string) => {
    if (!value) return null;
    const d = new Date(value);
    return isNaN(d.getTime()) ? null : d;
};

const yearsBetween = (start: Date, end: Date) => {
    const startMs = start.getTime();
    const endMs = end.getTime();
    if (isNaN(startMs) || isNaN(endMs) || endMs <= startMs) return 0;

    // Use exact milliseconds to account for leap years; divide by average year length
    const diffMs = endMs - startMs;
    return diffMs / (1000 * 60 * 60 * 24 * 365.2425);
};

const deriveRelationshipYears = (inputs: CalculatorInputs) => {
    const separation = toDate(inputs.dateOfSeparation);
    const cohab = toDate(inputs.dateOfCohabitation);
    const marriage = toDate(inputs.dateOfMarriage);

    if (!separation) return 0;

    const starts = [cohab, marriage].filter(Boolean) as Date[];
    if (!starts.length) return 0;

    const earliest = starts.reduce((earliestDate, current) => (current < earliestDate ? current : earliestDate));
    return yearsBetween(earliest, separation);
};

const normalizeCurrency = (value: number) => Math.max(0, Math.round(value));

const buildAmountRange = (base: number, lowRate: number, highRate: number, cap?: number) => {
    const lowRaw = base * lowRate;
    const highRaw = base * highRate;
    const lowCapped = cap ? Math.min(lowRaw, cap) : lowRaw;
    const highCapped = cap ? Math.min(highRaw, cap) : highRaw;
    const low = normalizeCurrency(lowCapped);
    const high = normalizeCurrency(highCapped);
    const mid = normalizeCurrency((low + high) / 2);
    return { low, mid, high };
};

const getChildSupportRate = (income: number) =>
    CHILD_SUPPORT_RATE_TABLE.find(entry => income < entry.maxIncome)?.rate ?? CHILD_SUPPORT_RATE_TABLE[0].rate;

const getImputedPayorIncome = (rawIncome: number, province?: string) => {
    if (rawIncome > 0) return { income: rawIncome, note: null as string | null };

    const provinceKey = normalizeProvinceKey(province);
    const minimumWageIncome = PROVINCIAL_FULL_TIME_INCOME[provinceKey] ?? 0;
    const baselineIncome = PROVINCIAL_BASELINE_INCOME[provinceKey] ?? 0;
    const imputedIncome = minimumWageIncome || baselineIncome || 0;

    if (imputedIncome <= 0) {
        return { income: rawIncome, note: null as string | null };
    }

    return {
        income: imputedIncome,
        note: `Payor income imputed to $${imputedIncome.toLocaleString(
            'en-CA'
        )} based on provincial minimum full-time income.`
    };
};

const calculateChildSupport = (
    inputs: CalculatorInputs,
    overrides?: { payorIncome?: number; recipientIncome?: number; extraNotes?: string[] }
) => {
    const payorIncomeRaw = parseFloat(inputs.payorIncome) || 0;
    const { income: payorIncome, note: payorImputeNote } = getImputedPayorIncome(
        payorIncomeRaw,
        inputs.jurisdiction
    );
    const recipientIncome = overrides?.recipientIncome ?? (parseFloat(inputs.recipientIncome) || 0);
    const payorIncomeUsed = overrides?.payorIncome ?? payorIncome;
    const children = parseInt(inputs.numChildren, 10) || 0;

    const payorTimeRaw = parseFloat(inputs.payorParentingTime) || 0;
    const recipientTimeRaw = parseFloat(inputs.recipientParentingTime) || Math.max(0, 100 - payorTimeRaw);
    const totalTime = Math.max(payorTimeRaw + recipientTimeRaw, 1);
    const payorTime = clamp((payorTimeRaw / totalTime) * 100, 0, 100);
    const recipientTime = clamp((recipientTimeRaw / totalTime) * 100, 0, 100);

    const imputationNote = payorImputeNote && children > 0 ? [payorImputeNote] : [];
    const extraNotes = overrides?.extraNotes ?? [];

    if (children === 0) {
        return {
            amount: 0,
            direction: 'none' as CalculationResult['childSupportDirection'],
            notes: ['No children entered; child support not calculated.', ...imputationNote, ...extraNotes],
            payorIncomeUsed,
            payorImputationNote: payorImputeNote
        };
    }

    // Simplified guideline-inspired rates using a small lookup table
    const baseRate = getChildSupportRate(payorIncomeUsed);

    if (inputs.parentingType === 'primary') {
        const payerIsPayor = payorTime < recipientTime;
        const payerIncome = payerIsPayor ? payorIncomeUsed : recipientIncome;
        const minimumWageIncome = PROVINCIAL_FULL_TIME_INCOME[normalizeProvinceKey(inputs.jurisdiction)] || 0;
        const cap = minimumWageIncome > 0 ? minimumWageIncome * 0.2 * children : Infinity;
        const amount = normalizeCurrency(Math.min(payerIncome * baseRate * children, cap));

        return {
            amount,
            direction: payerIsPayor ? 'payor_to_recipient' : 'recipient_to_payor',
            notes: [
                `Primary parenting: payment from lower-time parent using rate ${Math.round(baseRate * 10000) / 100}% for ${children} child(ren).`,
                `Parenting time entered at ${payorTime.toFixed(1)}% (payor) vs ${recipientTime.toFixed(1)}% (recipient).`,
                ...imputationNote,
                ...extraNotes
            ],
            payorIncomeUsed: payerIncome,
            payorImputationNote: payorImputeNote
        };
    }

    // Shared custody set-off approach
    const sharedRate = 0.0085;
    const payorObligation = payorIncomeUsed * sharedRate * children;
    const recipientObligation = recipientIncome * sharedRate * children;
    const rawSetOff = Math.abs(payorObligation - recipientObligation);
    const closeness = 1 - Math.min(Math.abs(payorTime - recipientTime) / 100, 1);
    const balanceFactor = 0.6 + 0.4 * closeness; // reduces toward 0.6 when time diverges
    const adjustedAmount = normalizeCurrency(rawSetOff * balanceFactor);

    return {
        amount: adjustedAmount,
        direction: payorObligation >= recipientObligation ? 'payor_to_recipient' : 'recipient_to_payor',
        notes: [
            `Shared custody set-off: each parent's obligation calculated with rate ${Math.round(sharedRate * 10000) / 100}%.`,
            `Parenting time entered at ${payorTime.toFixed(1)}% (payor) vs ${recipientTime.toFixed(1)}% (recipient); adjustment factor ${balanceFactor.toFixed(2)} applied.`,
            ...imputationNote,
            ...extraNotes
        ],
        payorIncomeUsed,
        payorImputationNote: payorImputeNote
    };
};

const isIndefiniteDuration = (relationshipYears: number, recipientAge: number) => {
    const ruleOf65 = recipientAge + relationshipYears >= 65;
    return relationshipYears >= 20 || ruleOf65;
};

const calculateDuration = (relationshipYears: number, recipientAge: number): SupportDuration => {
    const minYears = parseFloat((relationshipYears * 0.5).toFixed(1));
    const maxYears = parseFloat((relationshipYears * 1).toFixed(1));
    const longTerm = isIndefiniteDuration(relationshipYears, recipientAge);

    return {
        minYears: clamp(minYears, 0, 25),
        maxYears: clamp(maxYears, 0, 25),
        indefinite: longTerm
    };
};

const calculateSpousalSupport = (
    incomeGap: number,
    relationshipYears: number,
    usesWithChildFormula: boolean
) => {
    if (incomeGap <= 0) {
        return {
            low: 0,
            mid: 0,
            high: 0,
            notes: ['No positive income gap after child support; spousal support set to $0.']
        };
    }

    if (usesWithChildFormula) {
        // Simplified SSAG With Child Support: 40%–46% of INDI gap (approximated with post-child-support income gap).
        const { low, mid, high } = buildAmountRange(incomeGap, 0.4, 0.46);

        return {
            low,
            mid,
            high,
            notes: [
                'With child support formula: 40–46% of the post-child-support income gap (simplified INDI approximation).'
            ]
        };
    }

    // SSAG Without Child Support: 1.5%–2% of gross income gap for each year together, capped at 50% of the gap.
    const yearsFactor = clamp(relationshipYears, 0.5, 25);
    const cap = incomeGap * 0.5;
    const { low, mid, high } = buildAmountRange(incomeGap * yearsFactor, 0.015, 0.02, cap);

    return {
        low,
        mid,
        high,
        notes: [
            `Without child support formula: 1.5–2% of the income gap × ${yearsFactor.toFixed(1)} year factor.`,
            'Amounts capped at 50% of the gross income gap per SSAG limits.'
        ]
    };
};

const normalizeProvinceKey = (province?: string) =>
    province?.toLowerCase().replace(/\s+/g, '') || '';

const getImputedRecipientIncome = (
    rawRecipientIncome: number,
    payorIncome: number,
    relationshipYears: number,
    province?: string
) => {
    if (rawRecipientIncome > 0) {
        return { income: rawRecipientIncome, note: null as string | null };
    }

    const relationshipFactor = 1 + clamp(relationshipYears / 20, 0, 0.5); // up to +50% for long-term
    const provinceKey = normalizeProvinceKey(province);
    const provincialBaseline = PROVINCIAL_AVG_INCOMES[provinceKey] ?? 0;
    const baseImpute = provincialBaseline > 0 ? provincialBaseline : payorIncome * 0.2;

    const imputed = normalizeCurrency(baseImpute * relationshipFactor);
    const sourceText = provincialBaseline > 0 ? 'provincial average income' : 'payor income proxy';
    return {
        income: imputed,
        note: `Recipient income imputed to $${imputed.toLocaleString('en-CA')} using ${sourceText} and relationship length.`
    };
};

const calculateNetIncome = (income: number, province?: string) => {
    if (!income || income <= 0) return 0;
    const key = normalizeProvinceKey(province);
    const rates = PROVINCIAL_TAX_RATES[key] ?? { federal: 0.15, provincial: 0.1, cpp: 0.052, ei: 0.016 };
    const basicFederal = 15000;
    const basicProvincial = 11000;
    const taxableIncome = Math.max(0, income - basicFederal - basicProvincial);
    const tax =
        taxableIncome * (rates.federal + rates.provincial) +
        Math.max(0, Math.min(income, 66800) * rates.cpp) +
        Math.max(0, Math.min(income, 61500) * rates.ei);
    const net = income - tax;
    return Math.max(0, Math.round(net));
};

export const calculateSupport = (inputs: CalculatorInputs): CalculationResult => {
    const payorIncome = parseFloat(inputs.payorIncome) || 0;
    const rawRecipientIncome = parseFloat(inputs.recipientIncome) || 0;
    const relationshipYears = deriveRelationshipYears(inputs);
    const recipientAge = parseFloat(inputs.recipientAge) || 0;
    const children = parseInt(inputs.numChildren, 10) || 0;
    const payorTimePct = clamp(parseFloat(inputs.payorParentingTime) || 0, 0, 100);
    const recipientTimePct = clamp(
        parseFloat(inputs.recipientParentingTime) || Math.max(0, 100 - payorTimePct),
        0,
        100
    );

    const { income: recipientIncome, note: imputationNote } = getImputedRecipientIncome(
        rawRecipientIncome,
        payorIncome,
        relationshipYears,
        inputs.jurisdiction
    );

    const payorNet = calculateNetIncome(payorIncome, inputs.jurisdiction);
    const recipientNet = calculateNetIncome(recipientIncome, inputs.jurisdiction);
    const taxRate =
        (PROVINCIAL_TAX_RATES[normalizeProvinceKey(inputs.jurisdiction)] && PROVINCIAL_TAX_RATES[normalizeProvinceKey(inputs.jurisdiction)])
            ? PROVINCIAL_TAX_RATES[normalizeProvinceKey(inputs.jurisdiction)]
            : undefined;
    const approxTaxPct = taxRate ? Math.round((taxRate.federal + taxRate.provincial + taxRate.cpp + taxRate.ei) * 100) : null;
    const taxNote = approxTaxPct
        ? `Incomes adjusted to ~${approxTaxPct}% effective tax (fed/prov + CPP/EI and basic credits) for calculations.`
        : 'Incomes adjusted for estimated taxes/CPP/EI and basic credits.';

    const {
        amount: childSupport,
        direction,
        notes: childNotes,
        payorIncomeUsed,
        payorImputationNote
    } = calculateChildSupport(inputs, {
        payorIncome: payorNet,
        recipientIncome: recipientNet,
        extraNotes: [taxNote]
    });
    const lowerIncomePays =
        (direction === 'payor_to_recipient' && payorIncomeUsed < recipientIncome) ||
        (direction === 'recipient_to_payor' && recipientIncome < payorIncome);
    const lowerIncomeHasLessTime =
        (payorIncomeUsed < recipientIncome && payorTimePct < recipientTimePct) ||
        (recipientIncome < payorIncome && recipientTimePct < payorTimePct);
    const timeGap = Math.abs(payorTimePct - recipientTimePct);
    const undueHardshipApplied = children > 0 && lowerIncomePays && lowerIncomeHasLessTime && timeGap >= 10 && childSupport > 0;
    const adjustedChildSupport = undueHardshipApplied ? 0 : childSupport;
    const payorNetAfterChild =
        direction === 'payor_to_recipient'
            ? payorIncomeUsed - adjustedChildSupport
            : payorIncomeUsed + adjustedChildSupport;
    const recipientNetAfterChild =
        direction === 'recipient_to_payor'
            ? recipientIncome - adjustedChildSupport
            : recipientIncome + adjustedChildSupport;

    const incomeGap = Math.max(0, payorNetAfterChild - recipientNetAfterChild);
    const usesWithChildFormula = children > 0;

    const spousal = calculateSpousalSupport(incomeGap, relationshipYears, usesWithChildFormula);

    const duration = calculateDuration(relationshipYears, recipientAge);

    const netSupport = (amount: number) => {
        if (direction === 'payor_to_recipient') return amount + adjustedChildSupport;
        if (direction === 'recipient_to_payor') return amount - adjustedChildSupport;
        return amount;
    };

    // If lower-income parent has less parenting time and owes child support, offset with spousal.
    const lowerIncomeIsRecipient = recipientIncome < payorIncome;
    const lowerIncomeHasLessTimeForOffset = lowerIncomeIsRecipient
        ? recipientTimePct < payorTimePct
        : payorTimePct < recipientTimePct;
    const offsetChildSupport =
        lowerIncomeIsRecipient && lowerIncomeHasLessTimeForOffset && direction === 'recipient_to_payor'
            ? adjustedChildSupport
            : 0;

    const combinedSupportLow = roundCurrency(netSupport(spousal.low) + offsetChildSupport);
    const combinedSupportMid = roundCurrency(netSupport(spousal.mid) + offsetChildSupport);
    const combinedSupportHigh = roundCurrency(netSupport(spousal.high) + offsetChildSupport);

    const combinedNote =
        direction === 'recipient_to_payor' || direction === 'payor_to_recipient'
            ? `Combined (recipient perspective): $${combinedSupportMid.toLocaleString(
                  'en-CA'
              )} using midpoint after offsetting child support. ${
                  offsetChildSupport
                      ? 'Lower-income parent paying child support receives an offset via spousal support.'
                      : ''
              }`
            : `Combined (recipient perspective): $${combinedSupportMid.toLocaleString('en-CA')} using midpoint.`;

    const notes: string[] = [
        ...childNotes,
        ...(undueHardshipApplied
            ? ['Undue hardship applied: lower-income parent’s child support obligation reduced to $0.']
            : []),
        `Relationship length estimated at ${relationshipYears ? relationshipYears.toFixed(1) : '0'} years.`,
        ...(imputationNote ? [imputationNote] : []),
        ...(payorImputationNote ? [payorImputationNote] : []),
        ...spousal.notes,
        combinedNote
    ];

    if (duration.indefinite) {
        notes.push('Longer relationship or Rule of 65 triggered: duration may be indefinite.');
    } else {
        notes.push(`Typical duration range: ${duration.minYears}-${duration.maxYears} years.`);
    }

    return {
        childSupport: adjustedChildSupport,
        childSupportDirection: direction,
        undueHardshipApplied,
        spousalSupportLow: spousal.low,
        spousalSupportMid: spousal.mid,
        spousalSupportHigh: spousal.high,
        combinedSupportLow,
        combinedSupportMid,
        combinedSupportHigh,
        duration,
        notes
    };
};
