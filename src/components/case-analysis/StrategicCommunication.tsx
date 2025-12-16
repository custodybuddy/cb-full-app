import React from 'react';
import LightbulbIcon from '../icons/LightbulbIcon';
import ClipboardIcon from '../icons/ClipboardIcon';
import ClipboardCheckIcon from '../icons/ClipboardCheckIcon';
import PencilIcon from '../icons/PencilIcon';
import { sanitizeMarkdownHtml, linkifyLegislation } from '../../utils/stringUtils';
import { formatMarkdown } from '../../utils/markdownParser';
import { hyperlinkText } from '../../utils/linkUtils';

interface StrategicCommunicationProps {
    recommendation: string;
    jurisdiction: string;
    draftEmail: string;
    isEditing: boolean;
    isCopied: boolean;
    onToggleEdit: () => void;
    onCopy: () => void;
    onDraftChange: (value: string) => void;
}

const StrategicCommunication: React.FC<StrategicCommunicationProps> = ({
    recommendation,
    jurisdiction,
    draftEmail,
    isEditing,
    isCopied,
    onToggleEdit,
    onCopy,
    onDraftChange,
}) => (
    <div className="p-4 bg-slate-800 border border-amber-400/50 rounded-lg not-prose">
        <h4 className="text-lg font-bold text-amber-400 mb-3 flex items-center gap-2">
            <LightbulbIcon className="w-5 h-5 text-amber-400" />
            Strategic Communication Prompt
        </h4>
        <p
            className="text-sm text-gray-300 mb-4"
            dangerouslySetInnerHTML={{
                __html: sanitizeMarkdownHtml(hyperlinkText(linkifyLegislation(recommendation, jurisdiction))),
            }}
        />
        <div className="p-3 bg-slate-900 rounded-md border border-slate-700 relative">
            <div className="absolute top-2 right-2 flex items-center gap-1 z-10 no-pdf">
                <button
                    onClick={onToggleEdit}
                    className="flex items-center gap-1.5 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-1 px-2 rounded-md transition-all text-xs"
                >
                    <PencilIcon className="w-3 h-3" />
                    <span>{isEditing ? 'Save' : 'Edit'}</span>
                </button>
                <button
                    onClick={onCopy}
                    className="flex items-center gap-1.5 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-1 px-2 rounded-md transition-all text-xs"
                    aria-label="Copy draft email"
                >
                    {isCopied ? <ClipboardCheckIcon /> : <ClipboardIcon />}
                    <span>{isCopied ? 'Copied!' : 'Copy'}</span>
                </button>
            </div>
            {isEditing ? (
                <textarea
                    value={draftEmail}
                    onChange={(e) => onDraftChange(e.target.value)}
                    className="w-full h-48 mt-8 p-0 bg-transparent border-0 focus:outline-none focus:ring-0 resize-none text-sm text-gray-300 font-sans"
                    aria-label="Edit strategic email draft"
                />
            ) : (
                <div
                    className="text-gray-300 leading-relaxed break-words prose prose-invert max-w-none text-sm pt-8"
                    dangerouslySetInnerHTML={{ __html: sanitizeMarkdownHtml(formatMarkdown(draftEmail)) }}
                />
            )}
        </div>
    </div>
);

export default StrategicCommunication;
