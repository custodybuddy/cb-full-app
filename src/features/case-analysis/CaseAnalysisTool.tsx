import React from 'react';
import FileManagement from './components/FileManagement';
import AnalysisResult from './components/AnalysisResult';
import Button from '@/components/ui/Button';
import FormRow from '@/components/ui/FormRow';

const CaseAnalysisTool: React.FC<{ isOpen?: boolean }> = () => {
    const MAX_PASTED_CHARS = 8000;

    return (
        <div className="space-y-6">
            <p className="text-gray-400 text-sm">
                Upload court orders, separation agreements, or difficult emails. Our AI will analyze them, identify key obligations, flag potential conflicts, and suggest next steps. All uploaded files are processed securely and are not stored.
            </p>

            <FileManagement />

            <FormRow
                label="Or paste text here:"
                htmlFor="pasted-text"
                description={`Up to ${MAX_PASTED_CHARS.toLocaleString()} characters.`}
            >
                <textarea
                    id="pasted-text"
                    defaultValue="Paste email content or legal text here..."
                    className="w-full h-32 p-3 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none transition-shadow duration-200"
                    readOnly
                    aria-describedby="pasted-text-help"
                />
            </FormRow>

            <FormRow
                label="Jurisdiction (Province/State)"
                htmlFor="jurisdiction-case"
                required
            >
                <input
                    type="text"
                    id="jurisdiction-case"
                    name="jurisdiction"
                    defaultValue="Ontario, Canada"
                    placeholder="e.g., Ontario, Canada"
                    className="w-full p-2 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none"
                    readOnly
                    required
                />
            </FormRow>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-4 border-t border-slate-700">
                <Button
                    disabled
                    variant="ghost"
                    className="flex items-center gap-2 text-sm"
                >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74"/><path d="M3 4v5h5"/></svg>
                    Start Over
                </Button>
                <Button
                    disabled
                    fullWidth
                    className="w-full sm:w-auto"
                >
                    Analyze Documents
                </Button>
            </div>

            <div className="pt-6 border-t border-slate-700">
                <AnalysisResult />
            </div>
        </div>
    );
};

export default CaseAnalysisTool;
