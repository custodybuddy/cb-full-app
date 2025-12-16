import React from 'react';
import SupportCalculatorContent from '../components/support-calculator/SupportCalculatorContent';

const SupportCalculatorPage: React.FC = () => {
    return (
        <div className="bg-slate-900 text-white min-h-screen py-10 md:py-16">
            <SupportCalculatorContent layout="page" />
        </div>
    );
};

export default SupportCalculatorPage;
