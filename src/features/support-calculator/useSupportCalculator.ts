import { useState } from 'react';
import { CalculatorInputs, CalculationResult, DEFAULT_INPUTS } from '@/types';

export const useSupportCalculator = () => {
    const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_INPUTS);
    const [results, setResults] = useState<CalculationResult | null>(null);
    const [errors] = useState<Record<string, string>>({});

    const handleInputChange = (field: keyof CalculatorInputs, value: any) => {
        setInputs(prev => ({ ...prev, [field]: value }));
    };

    const handleChildAgeChange = (index: number, value: string) => {
        const newAges = [...(inputs.childAges || [])];
        newAges[index] = value;
        setInputs(prev => ({ ...prev, childAges: newAges }));
    };

    const handleCalculate = () => {
        setResults(null);
    };

    return {
        inputs,
        results,
        errors,
        handleInputChange,
        handleChildAgeChange,
        handleCalculate
    };
};
