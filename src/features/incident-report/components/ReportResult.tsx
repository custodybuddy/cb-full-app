import React from 'react';
import type { IncidentData, IncidentReport } from '@/types/ai';
import IncidentMarkdown from './IncidentMarkdown';

import AlertTriangleIcon from '@/components/icons/AlertTriangleIcon';
import GavelIcon from '@/components/icons/GavelIcon';
import UsersIcon from '@/components/icons/UsersIcon';
import ReportActionsBar from './ReportActionsBar';
import ReportReferences from './ReportReferences';
import ReportFooterControls from './ReportFooterControls';
import IncidentHeaderBadges from './IncidentHeaderBadges';
import IncidentSection from './IncidentSection';

const severityStyles: { [key: string]: string } = {
    Low: 'bg-green-500/20 text-green-300 border-green-500/30',
    Medium: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    High: 'bg-red-500/20 text-red-300 border-red-500/30',
};

const staticIncident: IncidentData = {
    narrative: 'On July 14, pickup was 45 minutes late without notice. The child waited with a grandparent and missed a scheduled activity.',
    jurisdiction: 'Ontario, Canada',
    incidentDate: '2023-07-14',
    otherPartiesInvolved: ['Ex-spouse/Co-parent', 'Witness'],
    childrenPresent: ['Child A'],
    location: 'Community Center Parking Lot',
};

const staticReport: IncidentReport = {
    title: 'Late Pickup Without Notice',
    category: 'Schedule Violation',
    severity: 'Medium',
    severityJustification: 'Delay exceeded 30 minutes and resulted in missed scheduled activities.',
    professionalSummary: 'On July 14, the scheduled pickup did not occur at the agreed time. The other parent arrived 45 minutes late without prior notice, causing the child to remain with a grandparent and miss a planned activity.',
    observedImpact: 'The child expressed frustration and anxiety about the delay. The missed activity caused disappointment and disrupted the evening routine.',
    legalInsights: 'Document the pattern of late pickups with timestamps and consider sending a written reminder referencing the exchange clause in the parenting plan.',
    sources: ['Parenting Plan, Section 3.2', 'Email Thread, July 14'],
};

const ReportResult: React.FC = () => {
    return (
        <div className="animate-fade-in-up max-w-5xl mx-auto">
            <div className="sr-only" role="status" aria-live="polite">Incident report generated.</div>
            <ReportActionsBar />

            <div
                className="p-8 bg-slate-900 border-x border-b border-slate-700 rounded-b-lg prose prose-invert max-w-none space-y-10 leading-7 print:bg-white print:text-slate-900 print:prose-headings:text-slate-900 print:border print:border-slate-200 print:shadow-none print:leading-8 print:prose-invert:prose-headings:text-slate-900 print:prose-invert:prose-p:text-slate-900"
            >
                <IncidentHeaderBadges
                    title={staticReport.title}
                    category={staticReport.category}
                    severity={staticReport.severity}
                    severityClass={severityStyles[staticReport.severity]}
                    incidentDate={staticIncident.incidentDate}
                    jurisdiction={staticIncident.jurisdiction}
                    location={staticIncident.location}
                    severityJustification={staticReport.severityJustification}
                />

                <section className="space-y-10 divide-y divide-slate-800/70 print:divide-slate-200">
                    <IncidentSection title="Professional Summary" icon={<UsersIcon />}>
                        <IncidentMarkdown content={staticReport.professionalSummary} className="max-w-3xl" />
                    </IncidentSection>
                    <IncidentSection title="Observed Impact on Children" icon={<AlertTriangleIcon className="text-yellow-400 w-5 h-5" />}>
                        <IncidentMarkdown content={staticReport.observedImpact} className="max-w-3xl" />
                    </IncidentSection>
                    <IncidentSection title={`Legal Insights (${staticIncident.jurisdiction})`} icon={<GavelIcon className="text-amber-400 w-5 h-5" />}>
                        <IncidentMarkdown content={staticReport.legalInsights} className="max-w-3xl" />
                    </IncidentSection>
                    <ReportReferences legalInsights={staticReport.legalInsights} sources={staticReport.sources || []} />
                </section>

                <div className="pt-6 border-t border-slate-700/50 mt-8">
                    <p className="text-center md:text-left text-xs text-gray-500 italic">Disclaimer: This document was created using artificial intelligence and is intended to provide helpful information. It is not a source of legal advice. We recommend that you verify the information for accuracy.</p>
                    <ReportFooterControls />
                </div>
            </div>
        </div>
    );
};

export default ReportResult;
