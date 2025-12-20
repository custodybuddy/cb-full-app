# CustodyBuddy.com

**Your Ally in Co-Parenting with a Toxic Ex.**
*AI-Powered Legal Toolkit for Self-Represented Parents.*

## 📘 Executive Summary

CustodyBuddy is a client-side, single-page application (SPA) designed to help self-represented parents dealing with high-conflict co-parenting. It transforms emotional, chaotic situations into objective, court-ready documentation using advanced AI.

**Core Value:** Transform stress into strategy, and manipulation into court evidence.
**Privacy Model:** Stateless architecture. No database storage of user documents; all processing happens in-memory or via ephemeral AI API calls to ensure user privacy.

---

## 🛠 Technology Stack

*   **Frontend:** React 19, TypeScript, Tailwind CSS
*   **AI Engine:** OpenAI Responses API (`openai`, default model: `gpt-4o-mini-2024-07-18`)
*   **State Management:** React Context API + Custom Hooks
*   **Document Processing:** PDF.js (Parsing), html2canvas + jsPDF (Exporting)
*   **Routing:** Custom Hash Routing (Stateless SPA)
*   **Styling:** Mobile-first, utility-first design system (Slate/Amber theme)

---

## 🚀 Core Features

### 1. Report An Incident ("Catch Them Red-Handed")
Converts emotional narratives into objective, professional logs.
*   **Input:** Date, Location, Parties, Narrative.
*   **AI Output:** Severity Rating, Professional Summary, Legal Insights based on Jurisdiction.
*   **Key Tech:** Dynamic form validation, PDF generation.

### 2. Email Law Buddy ("Stop The Games")
Analyzes high-conflict emails and drafts court-ready responses.
*   **Input:** Paste a toxic email.
*   **AI Output:** Tone analysis, Demand extraction, BIFF (Brief, Informative, Friendly, Firm) & Grey Rock drafts.
*   **Key Tech:** Tone analysis prompting, Clipboard integration.

### 3. Case Analysis Tool ("Level The Playing Field")
Analyzes legal documents to find obligations and discrepancies.
*   **Input:** Upload PDF/Images or paste text.
*   **AI Output:** Key Clauses, Action Items, Conflict detection between docs.
*   **Key Tech:** PDF.js text extraction, Multi-file context processing.

### 4. Knowledge & Resources
*   **Template Library:** Pre-written, high-conflict specific email templates.
*   **Resources:** Curated books and provincial Legal Aid links.

---

## 🏗 Architecture

The application follows a **Context-Service-UI** pattern:

1.  **UI Component:** User inputs data (e.g., `ReportAnIncident.tsx`).
2.  **Context:** State is updated via custom hooks (e.g., `useIncidentReporter`).
3.  **Service:** `openaiService.ts` assembles the prompt using `prompts.ts`.
4.  **AI:** Request sent to OpenAI Responses API (Stateless). Default model is `gpt-4o-mini-2024-07-18`; override with `VITE_OPENAI_MODEL`/`OPENAI_MODEL` if needed.
5.  **Response:** JSON is validated against TypeScript schemas and returned to UI.

### Directory Structure

```text
/
├── components/          # UI building blocks (Header, Footer, shared UI)
├── features/            # Product experiences
│   ├── case-analysis/   # File upload & analysis display
│   ├── email-buddy/     # Email drafting & tone switching
│   ├── incident-report/ # Incident form & report display
│   └── [others]         # Calculators, resources, onboarding
├── contexts/            # Global State (Context API)
├── services/            # API Communication (openaiService)
├── hooks/               # Custom React Hooks
├── utils/               # Helpers (PDF parsing, Exporting)
├── types/               # TypeScript Definitions & AI Schemas
├── prompts.ts           # System Instructions (The AI "Brain")
└── routes.ts            # Navigation Config
```

---

## 🎨 UX & Accessibility

*   **Visual:** High contrast (Navy/Gold), Text Sizer hook (`useTextSizer`).
*   **Auditory:** Text-to-Speech integration (`useTextToSpeech`) for reports and emails.
*   **Trauma-Informed:** Validating feedback, objective AI tone, explicit privacy assurances.

---

## 🔒 Security & Deployment

*   **API Key:** Injected via `process.env.OPENAI_API_KEY` (with backward-compat fallbacks).
*   **Data Privacy:** Zero-retention policy. Documents are processed in RAM and discarded immediately.
*   **Hosting:** Optimized for static hosting (Netlify/Vercel/GitHub Pages).
