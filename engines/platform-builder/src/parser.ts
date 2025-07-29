export interface BlueprintAction {
  type: string;
  params?: Record<string, any>;
}

export function parsePrompt(prompt: string): BlueprintAction[] {
  const messages = String(prompt)
    .split(/\band\b|\bthen\b|,/i)
    .map(p => p.trim())
    .filter(Boolean);
  return messages.map(m => ({ type: 'log_message', params: { message: m } }));
}
