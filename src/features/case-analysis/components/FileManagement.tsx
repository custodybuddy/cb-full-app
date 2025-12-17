import React from 'react';
import XIcon from '@/components/icons/XIcon';
import FileTextIcon from '@/components/icons/FileTextIcon';
import UploadCloudIcon from '@/components/icons/UploadCloudIcon';

const FileManagement: React.FC = () => {
    const sampleFiles = [
        { name: 'ParentingPlan.pdf', size: '1.2 MB' },
        { name: 'EmailThread-July.pdf', size: '0.8 MB' },
    ];

    return (
        <>
            <div className="relative border-2 border-dashed rounded-lg p-6 text-center border-slate-700">
                <input
                    id="file-upload"
                    type="file"
                    multiple
                    className="absolute inset-0 w-full h-full opacity-0 cursor-not-allowed"
                    accept=".jpeg,.jpg,.png,.webp,.pdf"
                    disabled
                    aria-labelledby="dropzone-label"
                />
                <div className="flex flex-col items-center justify-center pointer-events-none">
                    <UploadCloudIcon />
                    <p id="dropzone-label" className="mt-2 font-semibold text-white">
                        Click or drag & drop documents
                    </p>
                    <p className="text-xs text-gray-400">PDF (≤50 pages), JPG, PNG, WEBP (≤10MB each)</p>
                </div>
            </div>

            <div className="space-y-2 mt-4">
                <div className="flex justify-between items-center">
                    <h4 className="text-sm font-semibold text-gray-300">Selected Files ({sampleFiles.length}):</h4>
                    <button
                        className="text-xs text-amber-400 hover:text-amber-300 font-semibold transition-colors disabled:opacity-50"
                        disabled
                    >
                        Clear All
                    </button>
                </div>
                <ul className="space-y-2 max-h-32 overflow-y-auto pr-2">
                    {sampleFiles.map((file) => (
                        <li key={file.name} className="flex items-center justify-between bg-slate-700 p-2 rounded-lg text-sm border border-slate-600 shadow-md">
                            <div className="flex items-center gap-2 overflow-hidden">
                                <FileTextIcon className="w-5 h-5 text-amber-400 flex-shrink-0" />
                                <span className="text-gray-200 truncate font-medium" aria-label={`Selected file: ${file.name}`}>{file.name}</span>
                                <span className="text-gray-400 text-xs flex-shrink-0">({file.size})</span>
                            </div>
                            <button
                                className="text-gray-400 hover:text-white transition-all duration-200 ease-out flex-shrink-0 ml-2 disabled:opacity-50"
                                aria-label={`Remove file ${file.name}`}
                                disabled
                            >
                                <XIcon className="w-5 h-5" />
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default FileManagement;
