import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' }); // טוען את מפתח ה-API

export interface GPTComponentHint {
  component: string;
  category?: string;
}

export interface GPTBlueprintHints {
  platformType?: string;
  components: GPTComponentHint[];
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

Return the result in this exact JSON format:

{
  "platformType": "string",
  "components": [
    { "component": "string", "category": "string" }
  ]
}

Use clear internal naming. If unsure, make the best educated guess.`;

  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemInstruction },
          { role: 'user', content: prompt }
        ]
      })
    });

    const data = await res.json();
    const text = data?.choices?.[0]?.message?.content || '{}';
    return JSON.parse(text);

  } catch {
    return { platformType: 'unknown', components: [] };
  }
}
