import React from 'react';
import ExternalLinkIcon from '@/components/icons/ExternalLinkIcon';
import GavelIcon from '@/components/icons/GavelIcon';
import { compileLegalReferences, deriveReadableTitle, getDomainFromUrl, LegalReference } from '@/domain/legalRefs';
import { ensureAbsoluteUrl } from '@/utils/linkUtils';

interface ReportReferencesProps {
    legalInsights: string;
    sources: string[];
}

const ReferenceList: React.FC<{ title: string; references: LegalReference[] }> = ({ title, references }) => (
    <div>
        <p className="font-semibold text-amber-300 mb-2">{title}</p>
        <ul className="list-disc pl-6 space-y-2">
            {references.map((ref, idx) => (
                <li key={`${title}-${idx}`}>
                    <a
                        href={ensureAbsoluteUrl(ref.url)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-300 underline-offset-2 hover:underline break-words inline-flex items-center gap-1"
                    >
                        {ref.label || deriveReadableTitle(ref.url)}
                        <ExternalLinkIcon />
                    </a>
                    <div className="text-xs text-gray-400 break-words">{ensureAbsoluteUrl(ref.url)}</div>
                    {ref.context && <span className="text-gray-400"> — {ref.context}</span>}
                </li>
            ))}
        </ul>
    </div>
);

const ReportReferences: React.FC<ReportReferencesProps> = ({ legalInsights, sources }) => {
    const legalReferences = compileLegalReferences({
        legalInsights,
        sources,
    });

    const normalizeUrl = (url: string) => ensureAbsoluteUrl(url).replace(/\/+$/, '').toLowerCase();

    const referenceUrls = new Set(
        [...legalReferences.statuteReferences, ...legalReferences.caseLawReferences].map(ref => normalizeUrl(ref.url))
    );

    const additionalSources = (sources || [])
        .map(src => ensureAbsoluteUrl(src))
        .filter(src => !referenceUrls.has(normalizeUrl(src)));

    if (
        legalReferences.statuteReferences.length === 0 &&
        legalReferences.caseLawReferences.length === 0 &&
        additionalSources.length === 0
    ) {
        return null;
    }

    return (
        <div className="pt-8 space-y-3">
            <h3 className="text-2xl font-bold text-gray-100 mb-2 flex items-center gap-2">
                <GavelIcon className="text-amber-400 w-5 h-5" />
                Legal References & Sources
            </h3>
            <div className="space-y-4 text-sm text-gray-300">
                {legalReferences.statuteReferences.length > 0 && (
                    <ReferenceList title="Statutes & Guidelines" references={legalReferences.statuteReferences} />
                )}
                {legalReferences.caseLawReferences.length > 0 && (
                    <ReferenceList title="Case Law" references={legalReferences.caseLawReferences} />
                )}
                {additionalSources.length > 0 && (
                    <div>
                        <p className="font-semibold text-amber-300 mb-2">Additional Sources</p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-300">
                            {additionalSources.map((source, i) => (
                                <li key={`source-${i}`}>
                                    <a
                                        href={source}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-amber-300 underline-offset-2 hover:underline inline-flex items-center gap-1.5 group break-words"
                                    >
                                        <span className="group-hover:text-amber-200">{getDomainFromUrl(source)}</span>
                                        <ExternalLinkIcon />
                                    </a>
                                    <div className="text-xs text-gray-400 break-words">{source}</div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReportReferences;
