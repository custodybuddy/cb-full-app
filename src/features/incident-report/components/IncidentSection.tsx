import React from 'react';

interface IncidentSectionProps {
    title: string;
    icon?: React.ReactNode;
    children: React.ReactNode;
}

const IncidentSection: React.FC<IncidentSectionProps> = ({ title, icon, children }) => (
    <div className="pt-8 space-y-3">
        <h3 className="text-2xl font-bold text-gray-100 mb-2 flex items-center gap-2">
            {icon}
            {title}
        </h3>
        {children}
    </div>
);

export default IncidentSection;
