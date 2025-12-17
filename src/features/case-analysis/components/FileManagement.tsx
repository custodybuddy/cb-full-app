import React, { useState } from 'react';
import XIcon from '@/components/icons/XIcon';
import FileTextIcon from '@/components/icons/FileTextIcon';
import AlertTriangleIcon from '@/components/icons/AlertTriangleIcon';
import CheckCircleIcon from '@/components/icons/CheckCircleIcon';
import { useCaseAnalysisState, useCaseAnalysisActions } from '../useCaseAnalysis';
import UploadCloudIcon from '@/components/icons/UploadCloudIcon';
import { getPdfPageCount } from '@/utils/fileUtils';

const FileManagement: React.FC = () => {
    const { files, isLoading } = useCaseAnalysisState();
    const { setFiles: onFilesChange } = useCaseAnalysisActions();
    const [fileError, setFileError] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [justDropped, setJustDropped] = useState(false);
    const [isValidating, setIsValidating] = useState(false);

    const processFiles = async (selectedFiles: FileList) => {
        setIsValidating(true);
        const newFiles: File[] = [];
        const newErrors: string[] = [];
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
        const maxSizeInBytes = 10 * 1024 * 1024; // 10MB
        const maxPdfPages = 50;
    
        for (const file of Array.from(selectedFiles)) {
            if (files.some(existingFile => existingFile.name === file.name)) {
                newErrors.push(`"${file.name}" is already in the list.`);
                continue;
            }
            if (!allowedTypes.includes(file.type)) {
                newErrors.push(`"${file.name}": Invalid type. Only JPG, PNG, WEBP, or PDF are allowed.`);
                continue;
            }
            if (file.size > maxSizeInBytes) {
                newErrors.push(`"${file.name}" is too large (${(file.size / 1024 / 1024).toFixed(1)}MB). Max size is 10MB.`);
                continue;
            }
            if (file.type === 'application/pdf') {
                try {
                    const pages = await getPdfPageCount(file);
                    if (pages > maxPdfPages) {
                        newErrors.push(`"${file.name}" has ${pages} pages. Max allowed is ${maxPdfPages} pages.`);
                        continue;
                    }
                } catch {
                    newErrors.push(`"${file.name}" could not be read. Please check the file and try again.`);
                    continue;
                }
            }
            newFiles.push(file);
        }
    
        if (newFiles.length > 0) {
            onFilesChange(prevFiles => [...prevFiles, ...newFiles]);
    
            setJustDropped(true);
            setTimeout(() => setJustDropped(false), 500);
        }
    
        if (newErrors.length > 0) {
            setFileError(newErrors.join('\n'));
        } else {
            setFileError(null);
        }
        setIsValidating(false);
    };

    const removeFile = (indexToRemove: number) => {
        onFilesChange(files.filter((_, index) => index !== indexToRemove));
    };

    const clearAllFiles = () => {
        onFilesChange([]);
        setFileError(null);
        const fileInput = document.getElementById('file-upload') as HTMLInputElement;
        if (fileInput) {
            fileInput.value = '';
        }
    };
    
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files;
        if (selectedFiles) {
            await processFiles(selectedFiles);
            e.target.value = '';
        }
    };

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (isLoading) return;
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (isLoading || isValidating) return;
        const droppedFiles = e.dataTransfer.files;
        if (droppedFiles && droppedFiles.length > 0) {
            processFiles(droppedFiles);
        }
    };

    const getDropzoneClassName = () => {
        const baseClasses = 'relative border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 ease-out';
        if (justDropped) return `${baseClasses} !border-green-500 bg-green-900/20`;
        if (isDragging) return `${baseClasses} border-amber-400 bg-slate-800 scale-105`;
        if (isLoading || isValidating) return `${baseClasses} border-slate-700 opacity-50 cursor-not-allowed`;
        return `${baseClasses} border-slate-700 hover:border-amber-400`;
    };

    return (
        <>
            <div
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className={getDropzoneClassName()}
            >
                <input
                    id="file-upload"
                    type="file"
                    multiple
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    accept=".jpeg,.jpg,.png,.webp,.pdf"
                    onChange={handleFileChange}
                    disabled={isLoading || isValidating}
                    aria-labelledby="dropzone-label"
                />
                <div className="flex flex-col items-center justify-center pointer-events-none">
                    {justDropped ? <CheckCircleIcon /> : <UploadCloudIcon />}
                    <p id="dropzone-label" className={`mt-2 font-semibold transition-colors duration-200 ${justDropped ? 'text-green-400' : 'text-white'}`}>
                        {justDropped ? 'Files Accepted!' : isDragging ? 'Drop your files here' : 'Click or drag & drop documents'}
                    </p>
                    <p className="text-xs text-gray-400">PDF (≤50 pages), JPG, PNG, WEBP (≤10MB each)</p>
                </div>
            </div>

            {fileError && (
                <div className="bg-red-900/20 border border-red-500/50 text-red-400 text-sm rounded-lg p-3 flex items-start gap-3 animate-fade-in-up-fast mt-2" role="alert">
                    <AlertTriangleIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <p className="flex-grow whitespace-pre-wrap">{fileError}</p>
                    <button 
                        onClick={() => setFileError(null)}
                        className="text-red-400 hover:text-white transition-colors duration-200"
                        aria-label="Dismiss file error message"
                    >
                        <XIcon className="w-5 h-5" />
                    </button>
                </div>
            )}
            
            {files.length > 0 && (
                <div className="space-y-2 animate-fade-in-up-fast">
                    <div className="flex justify-between items-center">
                        <h4 className="text-sm font-semibold text-gray-300">Selected Files ({files.length}):</h4>
                        <button
                            onClick={clearAllFiles}
                            className="text-xs text-amber-400 hover:text-amber-300 font-semibold transition-colors disabled:opacity-50"
                            disabled={isLoading}
                        >
                            Clear All
                        </button>
                    </div>
                    <ul className="space-y-2 max-h-32 overflow-y-auto pr-2">
                        {files.map((file, index) => (
                            <li key={file.name} className="flex items-center justify-between bg-slate-700 p-2 rounded-lg text-sm border border-slate-600 shadow-md">
                                <div className="flex items-center gap-2 overflow-hidden">
                                    <FileTextIcon className="w-5 h-5 text-amber-400 flex-shrink-0" />
                                    <span className="text-gray-200 truncate font-medium" aria-label={`Selected file: ${file.name}`}>{file.name}</span>
                                    <span className="text-gray-400 text-xs flex-shrink-0">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                                </div>
                                <button
                                    onClick={() => removeFile(index)}
                                    className="text-gray-400 hover:text-white transition-all duration-200 ease-out flex-shrink-0 ml-2 disabled:opacity-50 transform motion-safe:hover:scale-110 motion-safe:active:scale-95"
                                    aria-label={`Remove file ${file.name}`}
                                    disabled={isLoading}
                                >
                                    <XIcon className="w-5 h-5" />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
};

export default FileManagement;
