import React from 'react';
import { exampleData } from '@/constants/exampleData';
import EmailInputForm from './components/EmailInputForm';
import GeneratedResponses from './components/GeneratedResponses';

const EmailLawBuddy: React.FC<{ isOpen?: boolean }> = () => {
    const disclaimerText = 'Disclaimer: This document was created using artificial intelligence and is intended to provide helpful information. It is not a source of legal advice. We recommend that you verify the information for accuracy.';

    return (
        <div className="min-h-[40vh] space-y-8">
            <EmailInputForm />
            <GeneratedResponses
                response={exampleData.response}
                disclaimer={disclaimerText}
            />
        </div>
    );
};

export default EmailLawBuddy;
