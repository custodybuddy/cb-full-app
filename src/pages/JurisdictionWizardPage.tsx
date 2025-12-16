import React, { useEffect, useMemo, useState } from 'react';

type WizardStep = 1 | 2 | 3 | 4 | 5;

interface ChildEntry {
    id: string;
    name: string;
    age: string;
}

const LOCAL_KEY_JURISDICTION = 'cb_jurisdiction';
const LOCAL_KEY_SELECTED_CHILD = 'cb_selected_child';

const provinces = [
    'Alberta',
    'British Columbia',
    'Manitoba',
    'New Brunswick',
    'Newfoundland and Labrador',
    'Nova Scotia',
    'Ontario',
    'Prince Edward Island',
    'Quebec',
    'Saskatchewan',
    'Northwest Territories',
    'Nunavut',
    'Yukon',
];

const wizardSteps: { id: WizardStep; title: string; description: string }[] = [
    { id: 1, title: 'Legal Framework', description: 'Confirm governing statute for this matter.' },
    { id: 2, title: 'Province / Territory', description: 'Set the jurisdiction for all later steps.' },
    { id: 3, title: 'Children', description: 'Record each child involved.' },
    { id: 4, title: 'Existing Orders', description: 'Note current orders or agreements.' },
    { id: 5, title: 'Goals', description: 'Clarify primary objectives.' },
];

const JurisdictionWizardPage: React.FC = () => {
    const [step, setStep] = useState<WizardStep>(1);
    const [jurisdiction, setJurisdiction] = useState('');
    const [children, setChildren] = useState<ChildEntry[]>([]);
    const [selectedChildId, setSelectedChildId] = useState('');
    const [ordersNote, setOrdersNote] = useState('');
    const [goals, setGoals] = useState<string[]>([]);
    const [childName, setChildName] = useState('');
    const [childAge, setChildAge] = useState('');

    useEffect(() => {
        const storedJuris = localStorage.getItem(LOCAL_KEY_JURISDICTION) || '';
        const storedChild = localStorage.getItem(LOCAL_KEY_SELECTED_CHILD) || '';
        if (storedJuris) setJurisdiction(storedJuris);
        if (storedChild) setSelectedChildId(storedChild);
    }, []);

    useEffect(() => {
        localStorage.setItem(LOCAL_KEY_JURISDICTION, jurisdiction);
        if (!jurisdiction && step > 2) {
            setStep(2);
        }
    }, [jurisdiction, step]);

    useEffect(() => {
        if (selectedChildId) {
            localStorage.setItem(LOCAL_KEY_SELECTED_CHILD, selectedChildId);
        } else {
            localStorage.removeItem(LOCAL_KEY_SELECTED_CHILD);
        }
    }, [selectedChildId]);

    const progress = useMemo(() => {
        const currentIndex = wizardSteps.findIndex(s => s.id === step);
        return Math.round(((currentIndex + 1) / wizardSteps.length) * 100);
    }, [step]);

    const addChild = () => {
        if (!childName.trim()) return;
        const newChild: ChildEntry = {
            id: crypto.randomUUID(),
            name: childName.trim(),
            age: childAge.trim(),
        };
        setChildren(prev => [...prev, newChild]);
        setChildName('');
        setChildAge('');
    };

    const removeChild = (id: string) => {
        setChildren(prev => prev.filter(c => c.id !== id));
        if (selectedChildId === id) {
            setSelectedChildId('');
        }
    };

    const toggleGoal = (goal: string) => {
        setGoals(prev => prev.includes(goal) ? prev.filter(g => g !== goal) : [...prev, goal]);
    };

    const canProceed = () => {
        if (step === 2) return Boolean(jurisdiction);
        if (step === 3) return children.length > 0;
        return true;
    };

    const goNext = () => {
        if (!jurisdiction && step >= 2) return;
        if (!canProceed()) return;
        setStep(prev => Math.min(5, (prev + 1) as WizardStep));
    };

    const goBack = () => setStep(prev => Math.max(1, (prev - 1) as WizardStep));

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div className="space-y-3">
                        <p className="text-sm text-gray-300">Primary statute: <span className="font-semibold text-white">Divorce Act (Canada)</span>.</p>
                        <p className="text-sm text-gray-400">Confirm this applies to your situation. Provincial enforcement may still apply in later steps.</p>
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-3">
                        <label className="text-sm font-semibold text-gray-200">Province / Territory <span className="text-red-400">*</span></label>
                        <select
                            value={jurisdiction}
                            onChange={e => setJurisdiction(e.target.value)}
                            className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                        >
                            <option value="">Select one</option>
                            {provinces.map(p => (
                                <option key={p} value={p}>{p}</option>
                            ))}
                        </select>
                        {!jurisdiction && <p className="text-xs text-red-300">This is required before continuing.</p>}
                    </div>
                );
            case 3:
                return (
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-200">Child</label>
                            <input
                                value={childName}
                                onChange={e => setChildName(e.target.value)}
                                placeholder="Name"
                                className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                            />
                            <input
                                value={childAge}
                                onChange={e => setChildAge(e.target.value)}
                                placeholder="Age"
                                className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                            />
                            <button
                                type="button"
                                onClick={addChild}
                                className="w-full rounded-lg bg-amber-400 px-4 py-2 text-black font-semibold hover:bg-amber-300 transition-colors"
                            >
                                Add Child
                            </button>
                        </div>
                        <div className="space-y-2">
                            <p className="text-sm font-semibold text-gray-200">Children listed</p>
                            {children.length === 0 && <p className="text-sm text-gray-400">No children added yet.</p>}
                            <ul className="space-y-2">
                                {children.map(child => (
                                    <li key={child.id} className="card p-3">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-white font-semibold">{child.name || 'Unnamed'}</p>
                                                <p className="text-xs text-gray-400">{child.age ? `Age: ${child.age}` : 'Age not noted'}</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => setSelectedChildId(child.id)}
                                                    className={`text-xs px-3 py-1 rounded-full border ${selectedChildId === child.id ? 'border-amber-400 text-amber-400' : 'border-slate-600 text-gray-300'}`}
                                                >
                                                    Set primary
                                                </button>
                                                <button
                                                    onClick={() => removeChild(child.id)}
                                                    className="text-xs text-red-300 hover:text-red-200"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="space-y-3">
                        <p className="text-sm text-gray-300">List any existing orders, agreements, or parenting plans. Uploading will be added later.</p>
                        <textarea
                            value={ordersNote}
                            onChange={e => setOrdersNote(e.target.value)}
                            placeholder="E.g., Final order dated 2022-11-04, interim contact order dated 2023-03-18."
                            className="w-full min-h-[120px] rounded-lg border border-slate-700 bg-slate-900 p-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                        />
                    </div>
                );
            case 5:
                return (
                    <div className="space-y-3">
                        <p className="text-sm text-gray-300">Select the primary goals for this file.</p>
                        <div className="space-y-2">
                            {['Documentation', 'Compliance', 'Court preparation'].map(goal => (
                                <label key={goal} className="flex items-center gap-3 rounded-lg border border-slate-700 bg-slate-900 p-3 text-sm text-gray-200">
                                    <input
                                        type="checkbox"
                                        checked={goals.includes(goal)}
                                        onChange={() => toggleGoal(goal)}
                                        className="h-4 w-4 accent-amber-400"
                                    />
                                    {goal}
                                </label>
                            ))}
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <section className="px-4 py-10 md:py-14 bg-slate-950 min-h-screen">
            <div className="mx-auto max-w-3xl space-y-6">
                <header className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.2em] text-amber-300">Jurisdiction Onboarding</p>
                    <h1 className="text-2xl md:text-3xl font-black text-white">Configure your file</h1>
                    <p className="text-sm text-gray-400">A procedural intake to capture jurisdiction and scope. Progress is saved locally.</p>
                </header>

                <div className="card p-4">
                    <div className="flex items-center justify-between text-xs text-gray-300 mb-2">
                        <span>Step {step} of {wizardSteps.length}</span>
                        <span>{progress}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                        <div className="h-full bg-amber-400 transition-all" style={{ width: `${progress}%` }} />
                    </div>

                    <div className="mt-4 flex overflow-x-auto gap-2 pb-2">
                        {wizardSteps.map(s => (
                            <div
                                key={s.id}
                                className={`rounded-full px-3 py-1 text-xs border ${s.id === step ? 'border-amber-400 text-amber-300' : 'border-slate-700 text-gray-300'}`}
                            >
                                {s.title}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="card p-4 space-y-4">
                    <div>
                        <h2 className="text-lg font-semibold text-white">{wizardSteps.find(s => s.id === step)?.title}</h2>
                        <p className="text-sm text-gray-400">{wizardSteps.find(s => s.id === step)?.description}</p>
                    </div>
                    {renderStep()}
                    <div className="flex flex-col sm:flex-row justify-between gap-3 pt-2">
                        <button
                            type="button"
                            onClick={goBack}
                            disabled={step === 1}
                            className="w-full sm:w-auto rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-gray-200 hover:border-amber-400 disabled:opacity-50"
                        >
                            Back
                        </button>
                        <button
                            type="button"
                            onClick={goNext}
                            disabled={!canProceed() || step === 5}
                            className="w-full sm:w-auto rounded-lg bg-amber-400 px-6 py-2 text-sm font-bold text-black hover:bg-amber-300 disabled:opacity-50"
                        >
                            {step === 5 ? 'Completed' : 'Next'}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default JurisdictionWizardPage;
