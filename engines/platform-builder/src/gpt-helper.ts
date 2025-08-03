import 'dotenv/config';
console.log('🔑 Loaded API key:', process.env.OPENAI_API_KEY?.slice(0, 10) + '...');

export interface GPTComponentHint {
  component: string;
  category?: string;
}

export interface GPTBlueprintHints {
  platformType?: string;
  components: GPTComponentHint[];
}

function sanitizeGPTResponse(text: string): string {
  return text
    .replace(/^\s*```(?:json)?\s*\n?/, '')
    .replace(/\n?```\s*$/, '')
    .trim();
}

export async function askGPTForBlueprintHints(prompt: string): Promise<GPTBlueprintHints> {
  const mock = (globalThis as any).__mockAskGPTForBlueprintHints;
  if (typeof mock === 'function') {
    return await mock(prompt);
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return { platformType: 'unknown', components: [] };
  }

  const systemInstruction = `You are helping build internal blueprints for a low-code system.

From the user prompt, identify:
- The most likely platformType (from known categories like CRM, Support Platform, Education Platform, etc.)
- The components involved (using normalized terms: Users, Tickets, Login, Scheduler, Webhook, Email Alerts, etc.)

Return ONLY a JSON object in this exact format:

{
  "platformType": "string",
  "components": [
    { "component": "string", "category": "string" }
  ]
}

Return ONLY raw JSON. Do NOT include any code fences like \`\`\`json or language tags. Just the JSON object.

Use clear internal naming. If unsure, make the best educated guess.`;

  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemInstruction },
          { role: 'user', content: prompt }
        ]
      })
    });

    const data = await res.json();
    const text = data?.choices?.[0]?.message?.content || '{}';
    const cleanText = sanitizeGPTResponse(text);
    try {
      return JSON.parse(cleanText);
    } catch (err) {
      console.error('Failed to parse GPT hints:', cleanText, err);
      return { platformType: 'unknown', components: [] };
    }
  } catch (err) {
    console.error('askGPTForBlueprintHints error:', err);
    return { platformType: 'unknown', components: [] };
  }
}
