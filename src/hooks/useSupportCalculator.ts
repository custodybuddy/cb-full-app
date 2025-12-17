import { useState } from 'react';
import { calculateSupport } from '@/utils/calculations';
import { CalculatorInputs, CalculationResult, DEFAULT_INPUTS } from '@/types';
import { validateSupportCalculator } from '@/validation/forms';

export const useSupportCalculator = () => {
    const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_INPUTS);
    const [results, setResults] = useState<CalculationResult | null>(() => calculateSupport(DEFAULT_INPUTS));
    const [errors, setErrors] = useState<Record<string, string>>({});

    const clearFieldError = (field: keyof CalculatorInputs | string) => {
        setErrors(prev => {
            if (!prev[field as string]) return prev;
            const next = { ...prev };
            delete next[field as string];
            return next;
        });
    };

    const handleInputChange = (field: keyof CalculatorInputs, value: any) => {
        setInputs(prev => {
            const next = { ...prev, [field]: value };
            if (field === 'numChildren') {
                const count = Math.max(0, parseInt(value, 10) || 0);
                const currentAges = prev.childAges || [];
                next.childAges =
                    currentAges.length >= count
                        ? currentAges.slice(0, count)
                        : [...currentAges, ...Array(count - currentAges.length).fill('')];
            }
            return next;
        });

        clearFieldError(field);

        if (['dateOfCohabitation', 'dateOfMarriage', 'dateOfSeparation'].includes(field)) {
            clearFieldError('dates');
        }

        if (field === 'numChildren') {
            setErrors(prev => {
                const next = { ...prev };
                Object.keys(next).forEach(key => {
                    if (key.startsWith('childAge_')) delete next[key];
                });
                return next;
            });
        }
    };

    const handleChildAgeChange = (index: number, value: string) => {
        const newAges = [...inputs.childAges];
        newAges[index] = value;
        setInputs(prev => ({ ...prev, childAges: newAges }));
        clearFieldError(`childAge_${index}`);
    };

    const handleCalculate = () => {
        const validation = validateSupportCalculator(inputs);
        setErrors(validation.errors);

        if (validation.isValid) {
            const calculatedResults = calculateSupport(inputs);
            setResults(calculatedResults);
            return calculatedResults;
        } else {
            setResults(null);
            return null;
        }
    };

    const getExplanationContext = (nextResult?: CalculationResult | null) => {
        const contextResult = nextResult ?? results;
        if (!contextResult) return null;
        return {
            amount: contextResult.combinedSupportMid,
            inputsSummary: buildInputsSummary(inputs, contextResult),
        };
    };

    return {
        inputs,
        results,
        errors,
        handleInputChange,
        handleChildAgeChange,
        handleCalculate,
        getExplanationContext,
    };
};

const formatCurrency = (value: number) => `$${value.toLocaleString('en-CA', { maximumFractionDigits: 0 })}`;

const buildInputsSummary = (inputs: CalculatorInputs, result?: CalculationResult | null) => {
    const payorIncome = Number(inputs.payorIncome) || 0;
    const recipientIncome = Number(inputs.recipientIncome) || 0;
    const numChildren = Math.max(0, parseInt(inputs.numChildren, 10) || 0);
    const childcare = Number(inputs.specialExpenseChildcare) || 0;
    const education = Number(inputs.specialExpenseEducation) || 0;
    const health = Number(inputs.specialExpenseHealth) || 0;
    const section7Total = childcare + education + health;

    const parts: string[] = [
        `Payor income: ${formatCurrency(payorIncome)}`,
        `Recipient income: ${formatCurrency(recipientIncome)}`,
        `Parenting time split: Payor ${inputs.payorParentingTime || '0'}% / Recipient ${inputs.recipientParentingTime || '0'}%`,
        `Parenting type: ${inputs.parentingType}`,
    ];

    if (numChildren > 0) {
        const ages = inputs.childAges.filter(Boolean).join(', ') || 'ages undisclosed';
        parts.push(`${numChildren} child${numChildren > 1 ? 'ren' : ''} (ages ${ages})`);
    }

    if (section7Total > 0) {
        parts.push(
            `Section 7 monthly: ${formatCurrency(section7Total)} (childcare ${formatCurrency(childcare)}, health ${formatCurrency(
                health
            )}, education ${formatCurrency(education)})`
        );
    }

    if (result) {
        parts.push(`Guideline combined midpoint: ${formatCurrency(result.combinedSupportMid)}`);
        parts.push(`Child support direction: ${result.childSupportDirection}`);
        if (result.undueHardshipApplied) {
            parts.push('Undue hardship adjustment applied');
        }
    }

    return parts.join('; ');
};
