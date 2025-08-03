import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const knowledgeDir = path.resolve(__dirname, '../../../platform-knowledge');
function readJson(file, fallback) {
  try {
    return JSON.parse(fs.readFileSync(path.join(knowledgeDir, file), 'utf-8'));
  } catch {
    return fallback;
  }
}
export const platformTypes = readJson('platform-types.json', []);
export const platformComponents = readJson('platform-components.json', {});
export const componentAliases = readJson('component-aliases.json', {});
export const platformArchetypes = readJson('platform-archetypes.json', {});
function findCategory(component) {
  for (const [category, comps] of Object.entries(platformComponents)) {
    if (comps.some(c => c.toLowerCase() === component.toLowerCase())) {
      return category;
    }
  }
}
export function detectPlatformType(prompt) {
  const lower = prompt.toLowerCase();
  return platformTypes.find(t => lower.includes(t.toLowerCase()));
}
function toAction(phrase) {
  const slack = phrase.match(/slack.*#(\S+)\s+(.*)/i);
  if (slack) {
    return { type: 'send_slack', params: { channel: `#${slack[1]}`, message: slack[2].trim() } };
  }
  const http = phrase.match(/http\s+(get|post|put|delete)\s+(https?:\/\/\S+)/i);
  if (http) {
    return { type: 'http_request', params: { method: http[1].toUpperCase(), url: http[2] } };
  }
  const lower = phrase.toLowerCase();
  for (const [alias, comp] of Object.entries(componentAliases)) {
    if (lower.includes(alias.toLowerCase())) {
      const category = findCategory(comp);
      return { type: 'add_component', params: { component: comp, category } };
    }
  }
  for (const [category, comps] of Object.entries(platformComponents)) {
    for (const comp of comps) {
      if (lower.includes(comp.toLowerCase())) {
        return { type: 'add_component', params: { component: comp, category } };
      }
    }
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
