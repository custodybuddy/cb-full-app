import { useState } from 'react';
import { calculateSupport } from '@/utils/calculations';
import { CalculatorInputs, CalculationResult, DEFAULT_INPUTS } from '@/types';
import { validateSupportCalculator } from '@/validation/forms';

export const useSupportCalculator = () => {
    const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_INPUTS);
    const [results, setResults] = useState<CalculationResult | null>(null);
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
        } else {
            setResults(null);
        }
    };

    return {
        inputs,
        results,
        errors,
        handleInputChange,
        handleChildAgeChange,
        handleCalculate,
    };
};
