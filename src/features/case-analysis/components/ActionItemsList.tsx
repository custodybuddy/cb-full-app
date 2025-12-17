import React from 'react';
import Trash2Icon from '@/components/icons/Trash2Icon';

interface ActionItem {
    item: string;
    deadline?: string;
    source: string;
    completed: boolean;
}

interface ActionItemsListProps {
    items: ActionItem[];
}

const ActionItemsList: React.FC<ActionItemsListProps> = ({ items }) => {
    if (!items.length) return null;

    return (
        <div>
            <h4 className="text-xl font-bold text-gray-200 mb-3">Action Items & Deadlines</h4>
            <ul className="space-y-3 text-gray-300 not-prose">
                {items.map((item, i) => (
                    <li
                        key={i}
                        className={`task-item flex items-start gap-3 p-3 bg-slate-800 rounded-md border border-slate-700 ${item.completed ? 'completed' : ''}`}
                    >
                        <input
                            type="checkbox"
                            id={`action-item-${i}`}
                            checked={item.completed}
                            className="mt-1 h-5 w-5 flex-shrink-0 rounded border-gray-400 bg-slate-700 text-amber-400 focus:ring-amber-500 cursor-pointer no-pdf"
                            disabled
                        />
                        <div className="flex-grow">
                            <label htmlFor={`action-item-${i}`} className="task-text cursor-pointer">
                                <span className="whitespace-pre-wrap">{item.item}</span>
                                {item.deadline && (
                                    <span className="ml-2 text-sm font-semibold text-amber-400">(Deadline: {item.deadline})</span>
                                )}
                            </label>
                            <p className="text-xs text-gray-500 mt-1">(Source: {item.source})</p>
                        </div>
                        <button
                            className="flex-shrink-0 text-gray-500 hover:text-red-400 transition-colors p-1 rounded-full no-pdf"
                            aria-label={`Delete action item: ${item.item}`}
                            disabled
                        >
                            <Trash2Icon className="w-4 h-4" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ActionItemsList;
