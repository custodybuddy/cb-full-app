export const CHILD_SUPPORT_RATE_TABLE = [
    { maxIncome: 50000, rate: 0.011 },
    { maxIncome: 100000, rate: 0.0095 },
    { maxIncome: Infinity, rate: 0.0085 }
];

export const PROVINCIAL_BASELINE_INCOME: Record<string, number> = {
    ontario: 35000,
    britishcolumbia: 34000,
    alberta: 36000,
    quebec: 32000,
    manitoba: 30000,
    saskatchewan: 30000,
    novascotia: 29000,
    newbrunswick: 29000,
    newfoundlandandlabrador: 30000,
    princeedwardisland: 28000,
    yukon: 38000,
    northwestterritories: 40000,
    nunavut: 40000
};

// Minimum-wage-ish baseline for imputing payor income when zero/negative.
export const PROVINCIAL_FULL_TIME_INCOME: Record<string, number> = {
    ontario: 32000,
    britishcolumbia: 31000,
    alberta: 33000,
    quebec: 30000,
    manitoba: 29000,
    saskatchewan: 29000,
    novascotia: 28000,
    newbrunswick: 28000,
    newfoundlandandlabrador: 28500,
    princeedwardisland: 27000,
    yukon: 36000,
    northwestterritories: 38000,
    nunavut: 38000
};

export const PROVINCIAL_AVG_INCOMES: Record<string, number> = {
    ontario: 52000,
    britishcolumbia: 50000,
    alberta: 54000,
    quebec: 48000,
    manitoba: 46000,
    saskatchewan: 47000,
    novaScotia: 45000,
    newBrunswick: 44000,
    newfoundlandandlabrador: 45000,
    princeedwardisland: 43000,
    yukon: 55000,
    northwestterritories: 60000,
    nunavut: 60000
};

// Approximate effective tax + CPP/EI rates for after-tax income estimation.
export const PROVINCIAL_TAX_RATES: Record<string, { federal: number; provincial: number; cpp: number; ei: number }> = {
    ontario: { federal: 0.15, provincial: 0.09, cpp: 0.052, ei: 0.016 },
    britishcolumbia: { federal: 0.15, provincial: 0.07, cpp: 0.052, ei: 0.016 },
    alberta: { federal: 0.15, provincial: 0.10, cpp: 0.052, ei: 0.016 },
    quebec: { federal: 0.15, provincial: 0.11, cpp: 0.052, ei: 0.016 },
    manitoba: { federal: 0.15, provincial: 0.108, cpp: 0.052, ei: 0.016 },
    saskatchewan: { federal: 0.15, provincial: 0.105, cpp: 0.052, ei: 0.016 },
    novascotia: { federal: 0.15, provincial: 0.10, cpp: 0.052, ei: 0.016 },
    newbrunswick: { federal: 0.15, provincial: 0.095, cpp: 0.052, ei: 0.016 },
    newfoundlandandlabrador: { federal: 0.15, provincial: 0.087, cpp: 0.052, ei: 0.016 },
    princeedwardisland: { federal: 0.15, provincial: 0.098, cpp: 0.052, ei: 0.016 },
    yukon: { federal: 0.15, provincial: 0.064, cpp: 0.052, ei: 0.016 },
    northwestterritories: { federal: 0.15, provincial: 0.059, cpp: 0.052, ei: 0.016 },
    nunavut: { federal: 0.15, provincial: 0.04, cpp: 0.052, ei: 0.016 }
};
