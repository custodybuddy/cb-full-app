import React from 'react';

interface IncidentHeaderBadgesProps {
    title: string;
    category: string;
    severity: string;
    severityClass: string;
    incidentDate?: string;
    jurisdiction?: string;
    location?: string;
    severityJustification: string;
}

const IncidentHeaderBadges: React.FC<IncidentHeaderBadgesProps> = ({
    title,
    category,
    severity,
    severityClass,
    incidentDate,
    jurisdiction,
    location,
    severityJustification,
}) => (
    <div className="not-prose text-center text-center md:text-left">
        <h1 className="text-3xl font-black text-gray-100 mb-3 text-center md:text-left">{title}</h1>
        <div className="flex flex-wrap gap-2 text-xs text-gray-200 justify-center">
            <span className="px-2 py-1 rounded-full bg-slate-800 border border-slate-700">Category: {category}</span>
            <span className={`px-2 py-1 rounded-full text-xs border ${severityClass}`}>Severity: {severity}</span>
            {incidentDate && (
                <span className="px-2 py-1 rounded-full bg-slate-800 border border-slate-700">Date: {incidentDate}</span>
            )}
            {jurisdiction && (
                <span className="px-2 py-1 rounded-full bg-slate-800 border border-slate-700">Jurisdiction: {jurisdiction}</span>
            )}
            {location && (
                <span className="px-2 py-1 rounded-full bg-slate-800 border border-slate-700">Location: {location}</span>
            )}
        </div>
        <p className={`mt-2 text-sm italic p-2 rounded-md text-center ${severityClass}`}>{severityJustification}</p>
    </div>
);

export default IncidentHeaderBadges;
