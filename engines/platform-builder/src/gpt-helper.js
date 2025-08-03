export async function askGPTForBlueprintHints(prompt) {
  const mock = globalThis.__mockAskGPTForBlueprintHints;
  if (typeof mock === 'function') {
    return await mock(prompt);
  }
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return { platformType: 'unknown', components: [] };
  }
  const systemInstruction = `You are helping build internal blueprints for a low-code system.\n\nFrom the user prompt, identify:\n- The most likely platformType (from known categories like CRM, Support Platform, Education Platform, etc.)\n- The components involved (using normalized terms: Users, Tickets, Login, Scheduler, Webhook, Email Alerts, etc.)\n\nReturn ONLY a JSON object in this exact format:\n\n{\n  "platformType": "string",\n  "components": [\n    { "component": "string", "category": "string" }\n  ]\n}\n\nUse clear internal naming. If unsure, make the best educated guess.`;
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
    try {
      return JSON.parse(text);
    } catch (err) {
      console.error('Failed to parse GPT hints:', text, err);
      return { platformType: 'unknown', components: [] };
    }
  } catch (err) {
    console.error('askGPTForBlueprintHints error:', err);
    return { platformType: 'unknown', components: [] };
  }
}
