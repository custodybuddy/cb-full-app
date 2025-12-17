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

export async function analyzeIncident(
    narrative: string,
    jurisdiction: string
): Promise<CustodyAIResponse> {
    const prompt = `Analyze incident in ${jurisdiction}: ${narrative}`;
    const system = 'Respond ONLY in JSON matching this schema. NO tools.';

    // DeepSeek-R1 primary
    if (deepseekClient) {
        try {
            const response = await deepseekClient.chat.completions.create({
                model: 'deepseek-r1',
                messages: [
                    { role: 'system', content: system },
                    { role: 'user', content: prompt },
                ],
                response_format: { type: 'json_object' },
                temperature: 0.1,
                tools: [],
                tool_choice: 'none',
            });

            const parsed = CustodyAIResponse.safeParse(
                JSON.parse(response.choices[0].message.content || '{}')
            );
            if (parsed.success) return parsed.data;
        } catch {
            // fall through to fallback
        }
    }

    // Gemini fallback (implement if needed)
    void geminiClient;

    throw new Error('DeepSeek unavailable - configure VITE_DEEPSEEK_API_KEY');
}
