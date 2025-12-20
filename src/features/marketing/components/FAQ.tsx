import React from 'react';

type FAQItem = {
    question: string;
    answer: string;
};

const faqs: FAQItem[] = [
    {
        question: 'How is my data protected when using the AI?',
        answer: 'Content is sent over HTTPS to the AI provider and encrypted in transit. It is used one-time to generate your structured result, is not retained to train generalized models, and we do not store server-side copies—your entries remain in your browser unless you export them.',
    },
    {
        question: 'How does CustodyBuddy handle my data and AI usage?',
        answer: 'We are a stateless, client-side app. Your narratives stay in your browser memory and only the text you submit is sent to the AI for a one-time response. We do not store documents or build a server-side history.',
    },
    {
        question: 'What about data privacy, encryption, and model training?',
        answer: 'Text you submit is sent over HTTPS to the AI provider, encrypted in transit. Responses are used only to generate your result; they are not used to train generalized models. We do not keep server-side copies—your entries stay in your browser unless you export them.',
    },
    {
        question: 'Is this legal advice?',
        answer: 'No. CustodyBuddy provides documentation help and plain-language explanations so you can stay organized. It cannot tell you what motion to file or predict outcomes.',
    },
    {
        question: 'Which AI models power the tools?',
        answer: 'We use OpenAI-compatible clients to reach DeepSeek models for structured JSON output. The prompts are locked to avoid legal advice and keep responses court-appropriate.',
    },
    {
        question: 'Can I export what the AI generates?',
        answer: 'Yes. Incident reports and case analysis summaries can be copied or exported so you can share them with counsel or include them in your personal records.',
    },
];

const FAQ: React.FC = () => {
    return null;
};

export default FAQ;
