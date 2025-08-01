function toAction(phrase) {
    const slack = phrase.match(/slack.*#(\S+)\s+(.*)/i);
    if (slack) {
        return { type: 'send_slack', params: { channel: `#${slack[1]}`, message: slack[2].trim() } };
    }
    const http = phrase.match(/http\s+(get|post|put|delete)\s+(https?:\/\/\S+)/i);
    if (http) {
        return { type: 'http_request', params: { method: http[1].toUpperCase(), url: http[2] } };
    }
    return { type: 'log_message', params: { message: phrase } };
}
export function parsePrompt(prompt) {
    const parts = String(prompt)
        .split(/\band\b|\bthen\b|,/i)
        .map(p => p.trim())
        .filter(Boolean);
    return parts.map(toAction);
}
