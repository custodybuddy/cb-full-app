import React, { useState, useEffect } from 'react';
import Modal from '../Modal';
import { useFalseAllegation } from '../../hooks/useFalseAllegation';
import { v4 as uuidv4 } from 'uuid'; // Import uuidv4
import SpinnerIcon from '../icons/SpinnerIcon';

interface FalseAllegationDraftingProps {
    isOpen: boolean;
    onClose: () => void;
}

const FalseAllegationDrafting: React.FC<FalseAllegationDraftingProps> = ({ isOpen, onClose }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const { state, actions } = useFalseAllegation();

    const [tempAllegationInput, setTempAllegationInput] = useState('');
    const [singleAllegationInput, setSingleAllegationInput] = useState('');

    const totalSteps = 5;

    const handleParseAllegations = () => {
        // Split by new lines, filter out empty strings
        const parsed = tempAllegationInput.split(/\r?\n\r?\n|\r?\n/).map(s => s.trim()).filter(Boolean);
        if (parsed.length > 0) {
            // Map parsed strings to AllegationItem objects with unique IDs
            const newAllegations = parsed.map(text => ({ id: uuidv4(), text, category: '', evidence: '' }));
            actions.setAllegations([...state.allegations, ...newAllegations]);
            setTempAllegationInput('');
        }
    };

    const handleAddSingleAllegation = () => {
        if (singleAllegationInput.trim()) {
            actions.addAllegation(singleAllegationInput.trim());
            setSingleAllegationInput('');
        }
    };

    const nextStep = () => {
        actions.setError(null); // Clear any previous errors

        // Validation for each step before proceeding
        if (currentStep === 1 && state.allegations.length === 0) {
            actions.setError('Please add at least one allegation to proceed.');
            return;
        }
        if (currentStep === 2) {
            const uncategorized = state.allegations.filter(a => !a.category || (a.category === 'Other' && !a.otherCategoryText?.trim()));
            if (uncategorized.length > 0) {
                actions.setError('Please categorize all allegations before proceeding.');
                return;
            }
        }
        if (currentStep === 3) {
            const unevidenced = state.allegations.filter(a => !a.evidence.trim());
            if (unevidenced.length > 0) {
                actions.setError('Please provide evidence for all allegations before proceeding.');
                return;
            }
            // If all validations pass for step 3, trigger AI response generation
            actions.handleDraftResponse();
        }

        if (currentStep < totalSteps) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const prevStep = () => {
        actions.setError(null); // Clear any previous errors
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div>
                        <h3 className="text-xl font-bold mb-4 text-amber-400">1. Allegation Intake</h3>
                        {state.error && (
                            <div className="bg-red-900/20 border border-red-500/50 text-red-400 text-sm rounded-lg p-3 mb-4 flex items-center gap-3" role="alert">
                                {state.error}
                            </div>
                        )}
                        <p className="text-gray-300 mb-6">Enter each false allegation separately. You can paste a block of text, and we'll help you break it down, or add them one by one.</p>

                        {/* Option A: Paste allegation text */}
                        <div className="mb-6 bg-slate-800 p-4 rounded-lg border-2 border-amber-400">
                            <label htmlFor="paste-allegations" className="block text-gray-400 text-sm font-bold mb-2">Paste Allegation Text (Multi-line)</label>
                            <textarea
                                id="paste-allegations"
                                className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                                rows={5}
                                placeholder="Paste the full text of the allegations here. Each distinct allegation should ideally be on a new line or separated by double line breaks."
                                value={tempAllegationInput}
                                onChange={(e) => setTempAllegationInput(e.target.value)}
                            ></textarea>
                            <button
                                onClick={handleParseAllegations}
                                className="mt-3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
                            >
                                Parse Allegations
                            </button>
                        </div>

                        {/* Option B: Manually add allegations one at a time */}
                        <div className="mb-6 bg-slate-800 p-4 rounded-lg border-2 border-amber-400">
                            <label htmlFor="single-allegation" className="block text-gray-400 text-sm font-bold mb-2">Add Single Allegation</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    id="single-allegation"
                                    className="flex-grow p-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                                    placeholder="Enter one allegation"
                                    value={singleAllegationInput}
                                    onChange={(e) => setSingleAllegationInput(e.target.value)}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            handleAddSingleAllegation();
                                        }
                                    }}
                                />
                                <button
                                    onClick={handleAddSingleAllegation}
                                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
                                >
                                    Add
                                </button>
                            </div>
                        </div>

                        {/* Display allegations as a numbered list */}
                        {state.allegations.length > 0 && (
                            <div className="bg-slate-800 p-4 rounded-lg border-2 border-amber-400">
                                <h4 className="text-lg font-bold mb-2 text-white">Current Allegations:</h4>
                                <ol className="list-decimal list-inside text-gray-300 space-y-2">
                                    {state.allegations.map((allegation) => (
                                        <li key={allegation.id} className="flex justify-between items-center bg-slate-700 p-2 rounded">
                                            <span>{allegation.text}</span>
                                            <button
                                                onClick={() => actions.removeAllegation(allegation.id)}
                                                className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-1 px-2 rounded transition-colors duration-200"
                                            >
                                                Remove
                                            </button>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        )}
                    </div>
                );
            case 2:
                const categories = [
                    'Parenting time / access',
                    'Communication behavior',
                    'Abuse / safety claim',
                    'Financial misconduct',
                    'Mental health / stability claim',
                    'Other',
                ];
                const [currentAllegationIndex, setCurrentAllegationIndex] = useState(0);
                
                // Initialize local state from context for the current allegation
                const currentAllegation = state.allegations[currentAllegationIndex];
                const [selectedCategory, setSelectedCategory] = useState(currentAllegation?.category || '');
                const [otherCategoryText, setOtherCategoryText] = useState(currentAllegation?.otherCategoryText || '');

                // Effect to update local state when moving to a different allegation
                useEffect(() => {
                    if (currentAllegation) {
                        setSelectedCategory(currentAllegation.category || '');
                        setOtherCategoryText(currentAllegation.otherCategoryText || '');
                    }
                }, [currentAllegationIndex, currentAllegation]);


                const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
                    const newCategory = e.target.value;
                    setSelectedCategory(newCategory);
                    if (newCategory !== 'Other') {
                        setOtherCategoryText('');
                        actions.updateAllegationCategory(currentAllegation.id, newCategory);
                    } else {
                        // Pass current otherCategoryText or empty string if it was just changed to 'Other'
                        actions.updateAllegationCategory(currentAllegation.id, newCategory, otherCategoryText);
                    }
                };

                const handleOtherCategoryTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                    const newText = e.target.value;
                    setOtherCategoryText(newText);
                    actions.updateAllegationCategory(currentAllegation.id, selectedCategory, newText);
                };

                const goToNextAllegationInStep = () => {
                    // Check if current allegation is categorized before moving
                    if (!selectedCategory || (selectedCategory === 'Other' && !otherCategoryText.trim())) {
                        actions.setError('Please select a category for the current allegation.');
                        return;
                    }
                    actions.setError(null); // Clear error

                    if (currentAllegationIndex < state.allegations.length - 1) {
                        setCurrentAllegationIndex(prev => prev + 1);
                    } else {
                        // All allegations categorized, can move to next step
                        nextStep(); 
                    }
                };

                const goToPrevAllegationInStep = () => {
                    actions.setError(null); // Clear error
                    if (currentAllegationIndex > 0) {
                        setCurrentAllegationIndex(prev => prev - 1);
                    } else {
                        // If on first allegation, go back to step 1
                        prevStep();
                    }
                };
                
                return (
                    <div>
                        <h3 className="text-xl font-bold mb-4 text-amber-400">2. Allegation Classification</h3>
                        {state.error && (
                            <div className="bg-red-900/20 border border-red-500/50 text-red-400 text-sm rounded-lg p-3 mb-4 flex items-center gap-3" role="alert">
                                {state.error}
                            </div>
                        )}
                        <p className="text-gray-300 mb-4">
                            Select a category for each allegation. This helps the AI understand the context for drafting your rebuttal.
                        </p>

                            <div className="bg-slate-800 p-4 rounded-lg border-2 border-amber-400 mb-6">
                                <p className="text-gray-400 text-sm mb-2">Allegation {currentAllegationIndex + 1} of {state.allegations.length}</p>
                                <p className="text-white font-semibold mb-4">{currentAllegation.text}</p>

                                <label htmlFor="category-select" className="block text-gray-400 text-sm font-bold mb-2">Select Category:</label>
                                <select
                                    id="category-select"
                                    className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                                    value={selectedCategory}
                                    onChange={handleCategoryChange}
                                >
                                    <option value="">-- Select a category --</option>
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>

                                {selectedCategory === 'Other' && (
                                    <div className="mt-4">
                                        <label htmlFor="other-category-text" className="block text-gray-400 text-sm font-bold mb-2">Specify Other Category:</label>
                                        <input
                                            type="text"
                                            id="other-category-text"
                                            className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                                            placeholder="e.g., School Issues, Health Records"
                                            value={otherCategoryText}
                                            onChange={handleOtherCategoryTextChange}
                                        />
                                    </div>
                                )}
                            </div>
                        <div className="flex justify-between">
                            <button
                                onClick={goToPrevAllegationInStep}
                                disabled={currentAllegationIndex === 0 && currentStep === 2}
                                className="bg-gray-700 text-white px-4 py-2 rounded disabled:opacity-50"
                            >
                                {currentAllegationIndex === 0 ? 'Back to Intake' : 'Previous Allegation'}
                            </button>
                            <button
                                onClick={goToNextAllegationInStep}
                                disabled={!selectedCategory || (selectedCategory === 'Other' && !otherCategoryText.trim())}
                                className="bg-amber-500 text-black px-4 py-2 rounded disabled:opacity-50"
                            >
                                {currentAllegationIndex === state.allegations.length - 1 ? 'Continue to Evidence' : 'Next Allegation'}
                            </button>
                        </div>
                    </div>
                );
            case 3:
                const [currentEvidenceAllegationIndex, setCurrentEvidenceAllegationIndex] = useState(0);
                
                const currentEvidenceAllegation = state.allegations[currentEvidenceAllegationIndex];
                const [allegationEvidence, setAllegationEvidence] = useState(currentEvidenceAllegation?.evidence || '');

                useEffect(() => {
                    if (currentEvidenceAllegation) {
                        setAllegationEvidence(currentEvidenceAllegation.evidence || '');
                    }
                }, [currentEvidenceAllegationIndex, currentEvidenceAllegation]);

                const handleEvidenceChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    const newEvidence = e.target.value;
                    setAllegationEvidence(newEvidence);
                    actions.updateAllegationEvidence(currentEvidenceAllegation.id, newEvidence);
                };

                const goToNextEvidenceAllegationInStep = () => {
                    if (!allegationEvidence.trim()) {
                        actions.setError('Please provide evidence for the current allegation.');
                        return;
                    }
                    actions.setError(null);

                    if (currentEvidenceAllegationIndex < state.allegations.length - 1) {
                        setCurrentEvidenceAllegationIndex(prev => prev + 1);
                    } else {
                        // All allegations have evidence, can move to next step
                        nextStep();
                    }
                };

                const goToPrevEvidenceAllegationInStep = () => {
                    actions.setError(null);
                    if (currentEvidenceAllegationIndex > 0) {
                        setCurrentEvidenceAllegationIndex(prev => prev - 1);
                    } else {
                        // If on first allegation, go back to step 2
                        prevStep(); 
                    }
                };

                return (
                    <div>
                        <h3 className="text-xl font-bold mb-4 text-amber-400">3. Evidence-First Response Grid</h3>
                        {state.error && (
                            <div className="bg-red-900/20 border border-red-500/50 text-red-400 text-sm rounded-lg p-3 mb-4 flex items-center gap-3" role="alert">
                                {state.error}
                            </div>
                        )}
                        <p className="text-gray-300 mb-4">
                            Provide factual evidence for the current allegation. Focus on objective data (dates, times, documents).
                        </p>

                        {currentEvidenceAllegation && (
                            <div className="bg-slate-800 p-4 rounded-lg border-2 border-amber-400 mb-6">
                                <p className="text-gray-400 text-sm mb-2">Allegation {currentEvidenceAllegationIndex + 1} of {state.allegations.length}</p>
                                <p className="text-white font-semibold mb-2">{currentEvidenceAllegation.text}</p>
                                <p className="text-gray-400 text-sm mb-4">Category: {currentEvidenceAllegation.category === 'Other' ? currentEvidenceAllegation.otherCategoryText : currentEvidenceAllegation.category}</p>

                                <label htmlFor="allegation-evidence" className="block text-gray-400 text-sm font-bold mb-2">Evidence for this Allegation:</label>
                                <textarea
                                    id="allegation-evidence"
                                    className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                                    rows={6}
                                    placeholder="e.g., 'Email dated 2023-10-26, 3:15 PM, where I stated I would be late.', 'Court Order Section 4.b, signed 2022-01-15.'"
                                    value={allegationEvidence}
                                    onChange={handleEvidenceChange}
                                ></textarea>
                            </div>
                        )}
                        <div className="flex justify-between">
                            <button
                                onClick={goToPrevEvidenceAllegationInStep}
                                disabled={currentEvidenceAllegationIndex === 0 && currentStep === 3}
                                className="bg-gray-700 text-white px-4 py-2 rounded disabled:opacity-50"
                            >
                                {currentEvidenceAllegationIndex === 0 ? 'Back to Classification' : 'Previous Allegation'}
                            </button>
                            <button
                                onClick={goToNextEvidenceAllegationInStep}
                                disabled={!allegationEvidence.trim()}
                                className="bg-amber-500 text-black px-4 py-2 rounded disabled:opacity-50"
                            >
                                {currentEvidenceAllegationIndex === state.allegations.length - 1 ? 'Generate Draft' : 'Next Allegation'}
                            </button>
                        </div>
                    </div>
                );
            case 4:
                // AI Response and Safeguard Review
                return (
                    <div>
                        <h3 className="text-xl font-bold mb-4 text-amber-400">4. Draft Preview & Safeguard Check</h3>
                        <p className="text-gray-300 mb-6">Review the AI-generated draft rebuttals below. Pay close attention to any flagged sentences or phrases, and manually edit them if necessary.</p>

                        {state.isLoading && (
                            <div className="text-center text-gray-400 py-8">
                                <SpinnerIcon className="w-8 h-8 mx-auto mb-2 text-amber-400 animate-spin" />
                                <p>Generating rebuttals and performing safeguard checks...</p>
                            </div>
                        )}

                        {state.error && (
                            <div className="bg-red-900/20 border border-red-500/50 text-red-400 text-sm rounded-lg p-3 mb-4 flex items-center gap-3" role="alert">
                                {state.error}
                            </div>
                        )}

                        {state.response && state.response.rebuttals.length > 0 && (
                            <div className="space-y-6">
                                {state.response.rebuttals.map((rebuttalItem, index) => (
                                    <div key={index} className="bg-slate-800 p-4 rounded-lg border-2 border-amber-400">
                                        <p className="text-gray-400 text-sm mb-2">For Allegation: "{rebuttalItem.allegation_text}"</p>
                                        <p className="text-white mb-4 whitespace-pre-wrap">{rebuttalItem.rebuttal_paragraph}</p>

                                        {rebuttalItem.safeguard_flags && rebuttalItem.safeguard_flags.length > 0 && (
                                            <div className="mt-4 border-t border-red-700 pt-4">
                                                <p className="text-red-400 font-bold mb-2">Safeguard Flags:</p>
                                                {rebuttalItem.safeguard_flags.map((flag, flagIndex) => (
                                                    <div key={flagIndex} className="bg-red-900/20 p-2 rounded-md mb-2">
                                                        <p className="text-red-300 text-sm font-semibold">Flag: {flag.flag_type.replace(/_/g, ' ')}</p>
                                                        <p className="text-red-200 text-xs italic">Sentence: "{flag.sentence_or_phrase}"</p>
                                                        <p className="text-red-100 text-xs">Suggestion: {flag.suggestion}</p>
                                                        {/* Future: Add buttons for user to manually edit or remove */}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                                <div className="bg-slate-800 p-4 rounded-lg border-2 border-amber-400 mt-6">
                                    <h4 className="text-lg font-bold mb-2 text-amber-400">Suggested Overall Next Steps:</h4>
                                    <p className="text-white whitespace-pre-wrap">{state.response.suggested_overall_next_steps}</p>
                                </div>
                            </div>
                        )}
                    </div>
                );
            case 5:
                return (
                    <div>
                        <h3 className="text-xl font-bold mb-4 text-amber-400">5. Export / Download</h3>
                        <p className="text-gray-300 mb-6">Your rebuttals are ready! You can now export them for your records or legal proceedings.</p>

                        {state.response && state.response.rebuttals.length > 0 && (
                            <div className="space-y-4 mb-6">
                                <h4 className="text-lg font-bold text-white mb-2">Final Rebuttals:</h4>
                                {state.response.rebuttals.map((rebuttalItem, index) => (
                                    <div key={index} className="bg-slate-800 p-4 rounded-lg border-2 border-amber-400">
                                        <p className="text-gray-400 text-sm mb-2">For Allegation: "{rebuttalItem.allegation_text}"</p>
                                        <p className="text-white whitespace-pre-wrap">{rebuttalItem.rebuttal_paragraph}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => alert('Export to Text functionality coming soon!')}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full shadow-lg transition-colors duration-200"
                            >
                                Export to Text
                            </button>
                            <button
                                onClick={() => alert('Export to PDF functionality coming soon!')}
                                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-full shadow-lg transition-colors duration-200"
                            >
                                Export to PDF
                            </button>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="False Allegation Response Drafting">
            <div className="p-4 text-white">
                <div className="mb-4">
                    {renderStepContent()}
                </div>
                <div className="flex justify-between mt-6">
                    <button
                        onClick={prevStep}
                        disabled={currentStep === 1 || state.isLoading}
                        className="bg-gray-700 text-white px-4 py-2 rounded disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <button
                        onClick={nextStep}
                        disabled={currentStep === totalSteps || (currentStep === 1 && state.allegations.length === 0) || state.isLoading || (currentStep === 4 && !state.response)}
                        className="bg-amber-500 text-black px-4 py-2 rounded disabled:opacity-50"
                    >
                        {state.isLoading ? 'Generating...' : (currentStep === totalSteps ? 'Finish' : 'Next')}
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default FalseAllegationDrafting;
