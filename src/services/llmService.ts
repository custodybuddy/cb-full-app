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
    analysis: z.object({
        tone: z.string(),
        summary: z.string(),
        key_demands: z.array(z.string()),
        legal_jargon: z.array(
            z.object({
                term: z.string(),
                context: z.string(),
            })
        ),
    }),
    drafts: z.object({
        biff: z.string(),
        greyRock: z.string(),
        friendlyAssertive: z.string(),
    }),
});

export type EmailBuddyResponse = z.infer<typeof EmailBuddyResponseSchema>;

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

    if (deepseekClient) {
        try {
            const response = await deepseekClient.chat.completions.create({
                model: 'deepseek-chat',
                messages: [
                    { role: 'system', content: system },
                    { role: 'user', content: prompt },
                ],
                response_format: { type: 'json_object' },
                temperature: 0.1,
                max_tokens: 800,
                tools: [],
                tool_choice: 'none',
            });

            const parsed = CustodyAIResponse.safeParse(
                JSON.parse(response.choices[0].message.content || '{}')
            );
            if (parsed.success) return parsed.data;
        } catch (error) {
            console.warn('DeepSeek failed:', error);
        }
    }

    if (geminiClient) {
        try {
            const model = geminiClient.getGenerativeModel({ model: 'gemini-1.5-flash' });
            const result = await model.generateContent([system, prompt]);

            const parsed = CustodyAIResponse.safeParse(
                JSON.parse(result.response.text())
            );
            if (parsed.success) return parsed.data;
        } catch (error) {
            console.warn('Gemini failed:', error);
        }
    }

    throw new Error('No working AI clients. Check VITE_DEEPSEEK_API_KEY');
}

export async function analyzeEmail(
    emailText: string
): Promise<EmailBuddyResponse> {
    const prompt = `Analyze this co-parenting email and draft responses:\\n\\n${emailText}`;
    const system = `You are CustodyBuddy AI. Respond ONLY in valid JSON matching this exact schema. NO markdown, NO extra text, NO tools:\n\n{\n  \"analysis\": {\n    \"tone\": \"Short tone description\",\n    \"summary\": \"2-3 sentence summary\",\n    \"key_demands\": [\"Key demand or question\"],\n    \"legal_jargon\": [{\"term\": \"Legal term\", \"context\": \"Where it appears\"}]\n  },\n  \"drafts\": {\n    \"biff\": \"Brief, Informative, Friendly, Firm draft\",\n    \"greyRock\": \"Grey Rock draft\",\n    \"friendlyAssertive\": \"Friendly assertive draft\"\n  }\n}`;

    if (deepseekClient) {
        try {
            const response = await deepseekClient.chat.completions.create({
                model: 'deepseek-chat',
                messages: [
                    { role: 'system', content: system },
                    { role: 'user', content: prompt },
                ],
                response_format: { type: 'json_object' },
                temperature: 0.2,
                max_tokens: 1200,
                tools: [],
                tool_choice: 'none',
            });

            const parsed = EmailBuddyResponseSchema.safeParse(
                JSON.parse(response.choices[0].message.content || '{}')
            );
            if (parsed.success) return parsed.data;
        } catch (error) {
            console.warn('DeepSeek failed:', error);
        }
    }

    if (geminiClient) {
        try {
            const model = geminiClient.getGenerativeModel({ model: 'gemini-1.5-flash' });
            const result = await model.generateContent([system, prompt]);

            const parsed = EmailBuddyResponseSchema.safeParse(
                JSON.parse(result.response.text())
            );
            if (parsed.success) return parsed.data;
        } catch (error) {
            console.warn('Gemini failed:', error);
        }
    }

    throw new Error('No working AI clients. Check VITE_DEEPSEEK_API_KEY');
}
