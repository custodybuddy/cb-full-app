## CustodyBuddy LLM Integration Blueprint

### 1. App and Privacy Model

- App: CustodyBuddy – a client-side SPA (React 19 + TypeScript + Vite + Tailwind) for self‑represented parents in high‑conflict co‑parenting.
- Privacy: Stateless. No persistent storage of user documents; all data lives in memory in the browser and is sent only in ephemeral AI API calls.
- Role of LLM:
    - Never calculates official legal outcomes or gives legal advice.
    - Transforms user inputs into structured, court‑ready narratives, explanations, and communication drafts.
    - Provides education, clarity, and documentation suggestions, not strategy.


### 2. Tech Stack and LLM Clients

- Frontend only (static hosting: Netlify/Vercel/GitHub Pages).
- LLM providers:
    - **Primary**: DeepSeek via OpenAI‑compatible SDK.
        - Client: `new OpenAI({ apiKey: VITE_DEEPSEEK_API_KEY, baseURL: 'https://api.deepseek.com' })`.
        - Model: `deepseek-chat` (stable, production‑ready).
    - **Fallback**: Google Gemini via `@google/generative-ai`.
        - Model: `gemini-1.5-flash`.
- Environment variables (Vite):
    - `VITE_DEEPSEEK_API_KEY`
    - `VITE_GEMINI_API_KEY`

LLM usage is centralized in `src/services/llmService.ts`.

### 3. General LLM Call Pattern

All service functions follow this pattern:

1. Construct a **strict system prompt** that:
    - Explains the feature’s purpose and constraints.
    - Bans legal advice and procedural instructions (no “file X motion”, no “you should sue”).
    - Requires **JSON‑only** output in a specific shape.
2. Build a `userContent` string that includes jurisdiction plus the user’s raw text (incident, email, document, etc.).
3. Call DeepSeek first:
```ts
const res = await deepseekClient.chat.completions.create({
  model: 'deepseek-chat',
  messages: [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userContent },
  ],
  response_format: { type: 'json_object' },
  temperature: 0.1–0.2,
  max_tokens: N,
  tools: [],
  tool_choice: 'none',
});
const json = JSON.parse(res.choices[0].message.content || '{}');
const parsed = Schema.safeParse(json);
if (parsed.success) return parsed.data;
```

4. If DeepSeek fails or schema validation fails, call Gemini with the same prompts and schema expectations.
5. If both fail, throw a descriptive error.

### 4. Shared Service: `src/services/llmService.ts`

This module:

- Creates **two clients**: `deepseekClient` and `geminiClient`.
- Defines **Zod schemas and TS types** per feature:
    - `CustodyAIResponse` – incident analysis.
    - `EmailBuddyResponse` – email tone + BIFF and Grey Rock drafts.
    - `CaseAnalysisResponse` – obligations, deadlines, conflicts.
    - `SupportExplanationResponse` – explanations of pre‑calculated support.
    - `FalseAllegationResponse` – calm rebuttal + documentation + safety notes.
- Exports feature‑specific functions:
    - `analyzeIncident({ narrative, jurisdiction, ... })`.
    - `analyzeEmailBuddy({ rawEmail, jurisdiction })`.
    - `analyzeCaseDocuments({ mainText, secondaryText?, jurisdiction })`.
    - `explainSupportResult({ calculatedAmount, inputsSummary, jurisdiction })`.
    - `analyzeFalseAllegation({ allegationText, userContext?, jurisdiction })`.

Each function enforces JSON structure with Zod and guarantees typed, validated outputs to the UI.

### 5. Feature Hooks (Context–Service–UI Pattern)

Each feature folder uses a custom hook that wraps a single service function and manages UI state:

- `src/features/incident-report/useIncidentAnalysis.ts`
    - Calls `analyzeIncident`, exposes `{ runAnalysis, result, loading, error, reset }`.
- `src/features/email-buddy/useEmailBuddy.ts`
    - Calls `analyzeEmailBuddy`, exposes BIFF/Grey Rock drafts, tone, demands.
- `src/features/case-analysis/useCaseAnalysis.ts`
    - Calls `analyzeCaseDocuments`, exposes overview, obligations, deadlines, conflicts.
- `src/features/support-calculator/useSupportExplanation.ts`
    - Calls `explainSupportResult` using an already‑computed numeric support amount and calculator inputs.
- `src/features/false-allegation/useFalseAllegation.ts`
    - Calls `analyzeFalseAllegation` and returns structured rebuttal and planning info.

Hooks never talk directly to providers; they only import from `llmService`.

### 6. UI Components

Each feature has a primary page component in its folder, wired to the hook:

- `IncidentReportPage.tsx` (incident-report)
- `EmailBuddyPage.tsx` (email-buddy)
- `CaseAnalysisPage.tsx` (case-analysis)
- `SupportCalculatorPage.tsx` (support-calculator)
- `FalseAllegationPage.tsx` (false-allegation)

All of them:

- Render forms to capture user text plus jurisdiction and context.
- Call the corresponding hook’s function on submit.
- Render `loading`, `error`, and the structured result fields (summary, lists, drafts) in Tailwind UI blocks.
- Do **not** store results anywhere beyond React state.

Routes in `src/routes.ts` map to these pages using lazy loading, e.g.:

```ts
{
  path: '/incident-report',
  element: lazy(() => import('@/features/incident-report/IncidentReportPage')),
  feature: 'incident-report',
}
```


### 7. Safety, Scope, and Tone

Every system prompt follows these global policies:

- **No legal advice**:
    - Do not recommend filing motions, choosing forms, or predicting case outcomes.
- **Documentation‑first**:
    - Focus on clarifying facts, obligations, timelines, and communication style.
    - Always encourage record‑keeping (messages, logs, receipts) without specifying legal strategy.
- **Trauma‑informed and neutral**:
    - Validate user stress without name‑calling or diagnosing the other parent.
    - Language must be court‑appropriate: objective, calm, and focused on behavior and facts.
- **JSON‑only output**:
    - All responses must match the declared JSON schema; no markdown or extra text.


### 8. Testing

- `src/services/llmService.test.ts` contains **opt‑in live tests** for the LLM layer.
- Live API calls only run when `RUN_LIVE_AI_TESTS=1` is set in the environment.
- Tests verify:
    - The models are reachable (no “model not exist”).
    - Outputs conform to Zod schemas.
    - Errors are handled gracefully.


### 9. What the LLM Should Do When Extending the App

When asked to add a new feature (e.g., a new legal helper):

1. **Define a Zod schema + TypeScript type** in `llmService.ts` for the new structured output.
2. **Add a new service function** in `llmService.ts` that:
    - Builds a strict system prompt consistent with the global policies above.
    - Calls DeepSeek (and optionally Gemini fallback) with JSON‑only output and no tools.
    - Validates with Zod and returns typed data.
3. **Create a feature hook** under `src/features/<feature>/useX.ts` that wraps the service call and exposes `{ result, loading, error, reset }`.
4. **Create a page component** under `src/features/<feature>/` that:
    - Renders inputs relevant to the task.
    - Calls the hook on submit.
    - Displays the structured result in a trauma‑informed, court‑ready way.
5. **Add a route** in `src/routes.ts` pointing to the new page.

The LLM should **never bypass `llmService.ts`**, should maintain the stateless privacy model, and should preserve the “education, clarity, documentation—not legal advice” boundary in all new prompts.
