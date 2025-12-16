import React, { lazy, Suspense } from 'react';
import { useModal } from '../hooks/useModal';
import Modal from './Modal';
import SpinnerIcon from './icons/SpinnerIcon';
import { IncidentReportProvider } from '../contexts/IncidentReportContext';
import { EmailBuddyProvider } from '../contexts/EmailBuddyContext';
import { CaseAnalysisProvider } from '../contexts/CaseAnalysisContext';
import { FalseAllegationProvider } from '../contexts/FalseAllegationContext';
import { ModalType } from '../contexts/ModalContext';

const CaseAnalysisTool = lazy(() => import('./CaseAnalysisTool'));
const EmailLawBuddy = lazy(() => import('./EmailLawBuddy'));
const ReportAnIncident = lazy(() => import('./report-incident/ReportAnIncident'));
const FalseAllegationDrafting = lazy(() => import('./false-allegation/FalseAllegationDrafting'));

const SuspenseFallback: React.FC = () => (
    <div className="flex justify-center items-center h-full min-h-[400px]">
        <div className="text-center text-gray-400">
            <SpinnerIcon className="w-8 h-8 mx-auto mb-2 text-amber-400" />
            <p>Loading Tool...</p>
        </div>
    </div>
);

type ModalEntry = {
    id: ModalType;
    title: string;
    getElement: () => React.ReactNode;
};

const modalRegistry: ModalEntry[] = [
    {
        id: 'case-analysis',
        title: 'Family Law Case Analysis Tool',
        getElement: () => (
            <CaseAnalysisProvider>
                <Suspense fallback={<SuspenseFallback />}>
                    <CaseAnalysisTool isOpen />
                </Suspense>
            </CaseAnalysisProvider>
        )
    },
    {
        id: 'email-buddy',
        title: 'Email Law Buddy',
        getElement: () => (
            <EmailBuddyProvider>
                <Suspense fallback={<SuspenseFallback />}>
                    <EmailLawBuddy isOpen />
                </Suspense>
            </EmailBuddyProvider>
        )
    },
    {
        id: 'report-incident',
        title: 'Report An Incident',
        getElement: () => (
            <IncidentReportProvider>
                <Suspense fallback={<SuspenseFallback />}>
                    <ReportAnIncident isOpen />
                </Suspense>
            </IncidentReportProvider>
        )
    },
    {
        id: 'false-allegation',
        title: 'False Allegation Response Drafting',
        getElement: () => (
            <FalseAllegationProvider>
                <Suspense fallback={<SuspenseFallback />}>
                    <FalseAllegationDrafting isOpen onClose={() => undefined} />
                </Suspense>
            </FalseAllegationProvider>
        )
    }
];

const GlobalModals: React.FC = () => {
    const { activeModal, closeModal } = useModal();
    const activeEntry = modalRegistry.find(entry => entry.id === activeModal);

    return (
        activeEntry ? (
            <Modal isOpen onClose={closeModal} title={activeEntry.title}>
                {activeEntry.getElement()}
            </Modal>
        ) : null
    );
};

export default GlobalModals;
