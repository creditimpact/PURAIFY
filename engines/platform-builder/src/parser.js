export function parsePrompt(prompt) {
    const messages = String(prompt)
        .split(/\band\b|\bthen\b|,/i)
        .map(p => p.trim())
        .filter(Boolean);
    return messages.map(m => ({ type: 'log_message', params: { message: m } }));
}
