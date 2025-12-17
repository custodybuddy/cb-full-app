import React, { useMemo } from 'react';
import { formatMarkdown } from '@/utils/markdownParser';
import { hyperlinkText } from '@/utils/linkUtils';
import { sanitizeMarkdownHtml, linkifyLegislation } from '@/utils/stringUtils';

interface IncidentMarkdownProps {
    content: string;
    jurisdiction?: string;
    className?: string;
    linkify?: boolean;
}

/**
 * Reusable renderer for incident-report markdown with consistent typography and link styling.
 * It auto-links raw URLs, applies heading hierarchy, and keeps long URLs from overflowing.
 */
const IncidentMarkdown: React.FC<IncidentMarkdownProps> = ({ content, jurisdiction, className = '', linkify = false }) => {
    const html = useMemo(() => {
        const text = linkify && jurisdiction ? linkifyLegislation(content, jurisdiction) : content;
        const markdownHtml = formatMarkdown(text);
        const linkedHtml = hyperlinkText(markdownHtml);
        const normalized = linkedHtml.replace(/href="(www\.[^"]+)"/gi, 'href="https://$1"');
        return sanitizeMarkdownHtml(normalized);
    }, [content, jurisdiction, linkify]);

    return (
        <div
            className={`prose prose-invert prose-h2:text-2xl prose-h2:font-bold prose-h3:text-xl prose-h3:font-semibold prose-p:leading-7 prose-p:my-3 prose-li:leading-7 prose-li:my-2 prose-ul:list-disc prose-ol:list-decimal prose-ul:pl-6 prose-ol:pl-6 prose-ul:space-y-1 prose-ol:space-y-1 prose-a:text-amber-300 prose-a:underline-offset-2 hover:prose-a:underline focus-visible:prose-a:outline focus-visible:prose-a:outline-2 focus-visible:prose-a:outline-amber-400 break-words print:prose-invert:prose-a:text-blue-700 print:prose-invert:prose-a:underline ${className}`}
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
};

export default IncidentMarkdown;
