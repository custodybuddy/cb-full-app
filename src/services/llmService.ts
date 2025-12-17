import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { z } from 'zod';

const DEEPSEEK_API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY;
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const deepseekClient = DEEPSEEK_API_KEY
    ? new OpenAI({
          apiKey: DEEPSEEK_API_KEY,
          baseURL: 'https://api.deepseek.com',
          dangerouslyAllowBrowser: true,
      })
    : null;

const geminiClient = GEMINI_API_KEY ? new GoogleGenerativeAI(GEMINI_API_KEY) : null;

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

async function callGemini<T>(
    schema: z.ZodSchema<T>,
    systemPrompt: string,
    userPrompt: string
): Promise<T | null> {
    if (!geminiClient) return null;

    try {
        const model = geminiClient.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const result = await model.generateContent([systemPrompt, userPrompt]);
        const parsed = schema.safeParse(parseJson(result.response.text()));
        if (parsed.success) return parsed.data;
    } catch (error) {
        console.warn('Gemini failed:', error);
    }

    return null;
}

export async function analyzeIncident(
    narrative: string,
    jurisdiction: string
): Promise<CustodyAIResponse> {
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

    const geminiResult = await callGemini(CustodyAIResponse, system, prompt);
    if (geminiResult) return geminiResult;

    throw new Error('No working AI clients. Check VITE_DEEPSEEK_API_KEY');
}

export async function analyzeEmailBuddy(input: {
    rawEmail: string;
    jurisdiction: string;
}): Promise<EmailBuddyResponse> {
    if (!deepseekClient && !geminiClient) {
        throw new Error('No working AI clients. Check VITE_DEEPSEEK_API_KEY');
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

    const geminiResult = await callGemini(EmailBuddyResponseSchema, system, prompt);
    if (geminiResult) return geminiResult;

    throw new Error('Email Buddy analysis failed with all providers.');
}
