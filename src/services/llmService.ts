import OpenAI from 'openai';
import { z } from 'zod';

const DEEPSEEK_API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY;
const deepseekClient = DEEPSEEK_API_KEY
    ? new OpenAI({
          apiKey: DEEPSEEK_API_KEY,
          baseURL: typeof window === 'undefined' ? 'http://localhost:3000/api/deepseek' : `${window.location.origin}/api/deepseek`,
          dangerouslyAllowBrowser: true,
      })
    : null;
export const CustodyAIResponse = z.object({
    summary: z.string().max(500),
    severity: z.string().optional(),
    actionItems: z.array(z.string()),
    legalNotes: z.array(z.string()),
    citations: z
        .array(
            z.object({
                claim: z.string(),
                source: z.object({
                    title: z.string(),
                    url: z.string().url(),
                    snippet: z.string(),
                }),
            })
        )
        .optional(),
});

export type CustodyAIResponse = z.infer<typeof CustodyAIResponse>;

export const EmailBuddyResponseSchema = z.object({
    originalTone: z.string(),
    keyDemands: z.array(z.string()),
    riskFlags: z.array(z.string()),
    biffReply: z.string(),
    greyRockReply: z.string(),
    notesForCourt: z.array(z.string()),
});

export type EmailBuddyResponse = z.infer<typeof EmailBuddyResponseSchema>;

export const CaseAnalysisResponseSchema = z.object({
    overview: z.string(),
    obligations: z.array(z.string()),
    rights: z.array(z.string()).optional(),
    deadlines: z.array(z.string()),
    conflicts: z.array(z.string()),
    actionItems: z.array(z.string()),
    notesForLawyer: z.array(z.string()),
});

export type CaseAnalysisResponse = z.infer<typeof CaseAnalysisResponseSchema>;

export const SupportExplanationResponse = z.object({
    plainLanguageSummary: z.string(),
    keyFactors: z.array(z.string()),
    edgeCases: z.array(z.string()),
    documentationTips: z.array(z.string()),
});

export type SupportExplanationResponse = z.infer<typeof SupportExplanationResponse>;

const parseJson = (content: string | null | undefined) => {
    if (!content) return null;
    try {
        return JSON.parse(content);
    } catch {
        return null;
    }
};

async function callDeepseek<T>(
    schema: z.ZodSchema<T>,
    systemPrompt: string,
    userPrompt: string,
    {
        temperature = 0.1,
        maxTokens = 800,
    }: { temperature?: number; maxTokens?: number } = {}
): Promise<T | null> {
    if (!deepseekClient) return null;

    try {
        const response = await deepseekClient.chat.completions.create({
            model: 'deepseek-chat',
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userPrompt },
            ],
            response_format: { type: 'json_object' },
            temperature,
            max_tokens: maxTokens,
            tools: [],
            tool_choice: 'none',
        });

        const parsed = schema.safeParse(parseJson(response.choices[0].message.content));
        if (parsed.success) return parsed.data;
    } catch (error) {
        console.warn('DeepSeek failed:', error);
    }

    return null;
}

export async function analyzeIncident(
    narrative: string,
    jurisdiction: string
): Promise<CustodyAIResponse> {
    if (!deepseekClient) {
        throw new Error('No DeepSeek client configured. Set VITE_DEEPSEEK_API_KEY.');
    }

    const prompt = `Analyze co-parenting incident in ${jurisdiction}:\n\n${narrative}`;
    const system = `You are CustodyBuddy AI. Respond ONLY in valid JSON matching this exact schema. NO markdown, NO extra text, NO tools:

{
  "summary": "2-3 sentence professional analysis",
  "severity": "Low|Medium|High",
  "actionItems": ["Action 1", "Action 2"],
  "legalNotes": ["Legal note 1", "Legal note 2"]
}`;

    const deepseekResult = await callDeepseek(
        CustodyAIResponse,
        system,
        prompt,
        { temperature: 0.1, maxTokens: 800 }
    );
    if (deepseekResult) return deepseekResult;
    throw new Error('DeepSeek analysis failed.');
}

export async function analyzeEmailBuddy(input: {
    rawEmail: string;
    jurisdiction: string;
}): Promise<EmailBuddyResponse> {
    if (!deepseekClient) {
        throw new Error('No DeepSeek client configured. Set VITE_DEEPSEEK_API_KEY.');
    }

    const system = `You are CustodyBuddy Email Law Buddy, helping self-represented parents in high-conflict co-parenting.

Task:
- Analyze the OTHER parent's email.
- Identify tone, key demands, and any red flags (threats, gaslighting, boundary violations).
- Draft TWO responses:
  - "biffReply": Brief, Informative, Friendly, Firm.
  - "greyRockReply": Minimal emotional engagement; neutral and concise.
- Add "notesForCourt": how this email and your reply might be perceived by a family court judge in the given jurisdiction.

CRITICAL:
- Do NOT give legal advice.
- Do NOT tell the user what to file or which motion to bring.
- Focus on communication hygiene and documentation.
- Be trauma-informed and non-judgmental.

Respond ONLY as valid JSON in this exact shape:
{
  "originalTone": "string",
  "keyDemands": ["string"],
  "riskFlags": ["string"],
  "biffReply": "string",
  "greyRockReply": "string",
  "notesForCourt": ["string"]
}`;

    const prompt = `Jurisdiction: ${input.jurisdiction}

Other parent's email:
${input.rawEmail}`.trim();

    const deepseekResult = await callDeepseek(
        EmailBuddyResponseSchema,
        system,
        prompt,
        { temperature: 0.2, maxTokens: 1200 }
    );
    if (deepseekResult) return deepseekResult;
    throw new Error('Email Buddy analysis failed.');
}

export async function analyzeCaseDocuments(input: {
    jurisdiction: string;
    mainText: string;
    secondaryText?: string;
}): Promise<CaseAnalysisResponse> {
    if (!deepseekClient) {
        throw new Error('No DeepSeek client configured. Set VITE_DEEPSEEK_API_KEY.');
    }

    const system = `You are CustodyBuddy Case Analysis, helping self-represented parents interpret existing court orders, agreements, and parenting plans.

Your job:
- Identify clear obligations, rights, and deadlines.
- Spot conflicts or inconsistencies between documents (e.g., order vs. agreement).
- Suggest neutral, practical "actionItems" for tracking compliance and preparing questions for a lawyer.
- Do NOT give legal advice, do NOT say what motions to file. Stay informational and neutral.

Return ONLY valid JSON with this exact shape:
{
  "overview": "2-4 sentence plain-language summary of what these documents are mainly doing.",
  "obligations": ["Obligation 1", "Obligation 2"],
  "rights": ["Right 1", "Right 2"],
  "deadlines": ["Deadline or timeframe 1", "Deadline 2"],
  "conflicts": ["Conflict or ambiguity 1", "Conflict 2"],
  "actionItems": ["Track X", "Document Y"],
  "notesForLawyer": ["Ask lawyer about...", "Clarify whether..."]
}`;

    const prompt = `Jurisdiction: ${input.jurisdiction}

Primary document text:
${input.mainText}

${input.secondaryText ? `Secondary / related document text:
${input.secondaryText}` : ''}`.trim();

    const deepseekResult = await callDeepseek(
        CaseAnalysisResponseSchema,
        system,
        prompt,
        { temperature: 0.15, maxTokens: 1600 }
    );
    if (deepseekResult) return deepseekResult;
    throw new Error('Case analysis failed.');
}

export async function explainSupportResult(input: {
    jurisdiction: string;
    calculatedAmount: number;
    inputsSummary: string;
}): Promise<SupportExplanationResponse> {
    if (!deepseekClient) {
        throw new Error('No DeepSeek client configured. Set VITE_DEEPSEEK_API_KEY.');
    }

    const systemPrompt = `You are CustodyBuddy Support Explainer. The child/spousal support AMOUNT has already been calculated by a separate guideline calculator.

Your role:
- Explain in plain language why this amount makes sense based on the inputs.
- Highlight key factors driving the result (income, parenting time, number/ages of children, special expenses).
- Flag any common edge cases where the user should get legal advice or check local guidelines.
- Suggest neutral "documentationTips" (what to keep records of) without giving legal advice.

STRICT RULES:
- Do NOT recalculate support amounts.
- Do NOT say what should be paid—just explain the already-calculated result.
- Do NOT tell the user what motion or form to file.
- Be neutral, trauma-informed, and non-judgmental.

Return ONLY valid JSON shaped exactly as:
{
  "plainLanguageSummary": "string",
  "keyFactors": ["string"],
  "edgeCases": ["string"],
  "documentationTips": ["string"]
}`;

    const userContent = `Jurisdiction: ${input.jurisdiction}

Calculated support amount (already computed by a guideline calculator):
${input.calculatedAmount}

Calculator inputs (summary):
${input.inputsSummary}`.trim();

    const deepseekResult = await callDeepseek(
        SupportExplanationResponse,
        systemPrompt,
        userContent,
        { temperature: 0.15, maxTokens: 900 }
    );
    if (deepseekResult) return deepseekResult;
    throw new Error('Support explanation failed.');
}
