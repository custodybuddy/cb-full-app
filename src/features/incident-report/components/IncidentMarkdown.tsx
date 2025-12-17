import React from 'react';

interface IncidentMarkdownProps {
    content: string;
    className?: string;
}

const IncidentMarkdown: React.FC<IncidentMarkdownProps> = ({ content, className = '' }) => {
    return (
        <div className={`text-gray-200 whitespace-pre-wrap leading-7 break-words ${className}`}>
            {content}
        </div>
    );
};

export default IncidentMarkdown;
