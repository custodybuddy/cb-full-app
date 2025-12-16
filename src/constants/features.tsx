import React from 'react';

export type FeatureIcon = 'CalendarCheck' | 'Swords' | 'MailPlus' | 'ShieldHalfIcon' | 'ScaleIcon';

export interface Feature {
    id: string;
    icon: FeatureIcon;
    title: React.ReactNode;
    description: string;
    buttonText: string;
    link: string;
    isModal: boolean;
}

export const features: Feature[] = [
    {
        id: 'report-incident',
        icon: 'CalendarCheck',
        title: <>Report An Incident: <span className="text-amber-400">Catch Them</span> Red-Handed.</>,
        description: 'Transform toxic behavior into court-ready evidence with guided documentation, timestamps, and professional exports.',
        buttonText: 'DOCUMENT THEIR LIES',
        link: '#',
        isModal: true,
    },
    {
        id: 'case-analysis',
        icon: 'Swords',
        title: <>Family Law Case Analysis Tool: Level the <span className="text-amber-400">Playing Field</span>.</>,
        description: 'Decode legal documents with AI analysis, get plain English explanations, and receive next-step recommendations.',
        buttonText: 'EXPOSE THE TRUTH',
        link: '#',
        isModal: true,
    },
    {
        id: 'email-buddy',
        icon: 'MailPlus',
        title: <>Email Law Buddy: <span className="text-amber-400">Shut Down</span> the Games.</>,
        description: 'Stop emotional manipulation with professional, AI-drafted responses that maintain composure and build your legal case.',
        buttonText: 'STOP THE GAMES',
        link: '#',
        isModal: true,
    },
    {
        id: 'false-allegation',
        icon: 'ShieldHalfIcon',
        title: <>False Allegation: <span className="text-amber-400">Response Drafting</span>.</>,
        description: 'Produce structured, factual rebuttals to distorted claims.',
        buttonText: 'DRAFT REBUTTAL',
        link: '#',
        isModal: true,
    },
    {
        id: 'support-calculator',
        icon: 'ScaleIcon',
        title: <>SupportCalc CA: <span className="text-amber-400">Spousal & Child</span> Support.</>,
        description: 'Estimate SSAG spousal ranges and simplified child support set-offs with clear notes for Canadian family law.',
        buttonText: 'RUN CALCULATOR',
        link: '/support-calculator',
        isModal: false,
    },
];
