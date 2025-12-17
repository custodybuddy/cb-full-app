import React from 'react';
import type { CaseAnalysisReport } from '@/types/ai';
import Feedback from '@/features/marketing/components/Feedback';
import LightbulbIcon from '@/components/icons/LightbulbIcon';
import GavelIcon from '@/components/icons/GavelIcon';
import AlertTriangleIcon from '@/components/icons/AlertTriangleIcon';
import FileTextIcon from '@/components/icons/FileTextIcon';
import AnalysisActionsBar from './AnalysisActionsBar';
import AnalysisReferences from './AnalysisReferences';
import SummaryPanel from './SummaryPanel';
import ObligationsPanel from './ObligationsPanel';
import FlagsPanel from './FlagsPanel';
import DetailsPanel from './DetailsPanel';

type AnalysisTab = 'summary' | 'obligations' | 'flags' | 'details';

interface ActionItemState {
    item: string;
    deadline?: string;
    source: string;
    completed: boolean;
}

const staticResponse: CaseAnalysisReport = {
    documentTypes: [
        { type: 'Parenting Plan', source: 'Upload: ParentingPlan.pdf' },
        { type: 'Email Thread', source: 'Paste: July 2023 Emails' },
    ],
    summary: 'The current agreement outlines weekly exchanges on Fridays and alternating holiday schedules. The recent communications indicate recurring late pickups and unapproved schedule changes without notice.',
    keyClauses: [
        {
            clause: 'Weekly exchange occurs every Friday at 6:00 PM at the designated exchange location.',
            explanation: 'This clause establishes a fixed exchange time and place that should be followed unless both parties agree in writing.',
            source: 'ParentingPlan.pdf, Section 3.2',
        },
        {
            clause: 'Parents must provide 48 hours notice for non-emergency schedule changes.',
            explanation: 'Failure to provide notice may be documented as a pattern of non-compliance.',
            source: 'ParentingPlan.pdf, Section 5.1',
        },
    ],
    discrepancies: [
        {
            description: 'Multiple messages indicate pickup delays of 30+ minutes without prior notice.',
            sources: ['Email Thread, July 14', 'Email Thread, July 28'],
        },
    ],
    legalJargon: [
        {
            term: 'Material breach',
            explanation: 'A significant violation of the agreement that affects the core obligations.',
        },
    ],
    actionItems: [
        {
            item: 'Document late pickups with dates, times, and message screenshots.',
            deadline: 'Ongoing',
            source: 'Email Thread, July 14',
        },
        {
            item: 'Send a concise notice requesting adherence to the 48-hour notice clause.',
            deadline: 'Within 7 days',
            source: 'ParentingPlan.pdf, Section 5.1',
        },
    ],
    legalInsights: 'Verify local rules on documenting parenting time violations and consider mediation before filing any motion.',
    suggestedNextSteps: 'Summarize the pattern in a timeline, attach supporting evidence, and request written confirmation for any schedule changes.',
    strategicCommunication: {
        recommendation: 'Keep responses short, factual, and focused on the schedule clause. Avoid accusations; cite specific dates and requested remedies.',
        draftEmail: 'Subject: Schedule Compliance\n\nHi [Name],\n\nPer Section 5.1 of our parenting plan, schedule changes require 48 hours notice. On July 14 and July 28 pickups were delayed without notice. Please confirm future changes at least 48 hours in advance and the expected pickup time for this Friday.\n\nThank you,\n[Your Name]',
    },
    disclaimer: 'Disclaimer: This document was created using artificial intelligence and is intended to provide helpful information. It is not a source of legal advice. We recommend that you verify the information for accuracy.',
};

const staticActionItems: ActionItemState[] = staticResponse.actionItems.map(item => ({
    ...item,
    completed: false,
}));

const tabConfig: { id: AnalysisTab; label: string; icon: React.ReactNode }[] = [
    { id: 'summary', label: 'Summary', icon: <LightbulbIcon className="w-4 h-4" /> },
    { id: 'obligations', label: 'Obligations', icon: <GavelIcon className="w-4 h-4" /> },
    { id: 'flags', label: 'Red Flags', icon: <AlertTriangleIcon className="w-4 h-4" /> },
    { id: 'details', label: 'Details', icon: <FileTextIcon className="w-4 h-4" /> },
];

const AnalysisResult: React.FC = () => {
    return (
        <div className="mt-6 animate-fade-in-up">
            <AnalysisActionsBar />

            <div role="tablist" aria-label="Analysis Sections" className="flex border-b border-slate-700 bg-slate-900 overflow-x-auto">
                {tabConfig.map(tab => (
                    <button
                        key={tab.id}
                        className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold transition-colors border-b-2 flex-shrink-0 ${tab.id === 'summary' ? 'border-amber-400 text-amber-400' : 'border-transparent text-gray-400'}`}
                        role="tab"
                        aria-selected={tab.id === 'summary'}
                        disabled
                    >
                        {tab.icon}
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="p-6 bg-slate-900 border-x border-b border-slate-700 rounded-b-lg prose prose-invert max-w-none">
                <section id="panel-summary" role="tabpanel" aria-labelledby="tab-summary" className="mb-8">
                    <SummaryPanel
                        summary={staticResponse.summary}
                        suggestedNextSteps={staticResponse.suggestedNextSteps}
                        strategicCommunication={staticResponse.strategicCommunication}
                    />
                </section>
                <section id="panel-obligations" role="tabpanel" aria-labelledby="tab-obligations" className="mb-8">
                    <ObligationsPanel
                        keyClauses={staticResponse.keyClauses}
                        actionItems={staticActionItems}
                    />
                </section>
                <section id="panel-flags" role="tabpanel" aria-labelledby="tab-flags" className="mb-8">
                    <FlagsPanel discrepancies={staticResponse.discrepancies} />
                </section>
                <section id="panel-details" role="tabpanel" aria-labelledby="tab-details" className="mb-8">
                    <DetailsPanel
                        legalJargon={staticResponse.legalJargon}
                        documentTypes={staticResponse.documentTypes}
                    />
                </section>
                <section className="mb-8">
                    <h4 className="text-xl font-bold text-gray-200 mb-3 flex items-center gap-2"><GavelIcon className="text-amber-400 w-5 h-5" />Legal References</h4>
                    <AnalysisReferences
                        legalInsights={staticResponse.legalInsights ?? ''}
                        sources={staticResponse.actionItems.map(item => item.source)}
                    />
                </section>

                <div className="pt-6 border-t border-slate-700/50 mt-8">
                    <p className="text-xs text-gray-500 italic">{staticResponse.disclaimer}</p>
                    <div className="no-pdf">
                        <Feedback />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalysisResult;
