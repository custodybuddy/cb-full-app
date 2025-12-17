import React from 'react';
import FileTextIcon from '@/components/icons/FileTextIcon';
import type { CaseAnalysisReport } from '@/types/ai';

interface DetailsPanelProps {
    legalJargon: CaseAnalysisReport['legalJargon'];
    documentTypes: CaseAnalysisReport['documentTypes'];
}

const DetailsPanel: React.FC<DetailsPanelProps> = ({ legalJargon = [], documentTypes = [] }) => {
    if (!legalJargon.length && !documentTypes.length) return null;
    return (
        <div className="space-y-8">
            {legalJargon.length > 0 && (
                <div>
                    <h4 className="text-xl font-bold text-gray-200 mb-3">Legal Jargon Explained</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose">
                        {legalJargon.map((item, i) => (
                            <div key={i} className="p-3 bg-slate-800 rounded-md">
                                <p className="font-semibold text-amber-300 whitespace-pre-wrap">
                                    {item.term}
                                </p>
                                <p className="text-sm text-gray-400 mt-1 whitespace-pre-wrap">
                                    {item.explanation}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {documentTypes.length > 0 && (
                <div>
                    <h4 className="text-xl font-bold text-gray-200 mb-3">Analyzed Documents</h4>
                    <div className="flex flex-wrap gap-2 not-prose">
                        {documentTypes.map((item, i) => (
                            <div key={i} className="flex items-center gap-2 bg-slate-800 text-sm text-gray-300 px-3 py-1 rounded-full">
                                <FileTextIcon className="w-4 h-4 text-amber-400" />
                                <span>
                                    {item.source}: <span className="font-semibold">{item.type}</span>
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DetailsPanel;
