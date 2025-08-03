import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { askGPTForBlueprintHints } from './gpt-helper.js';

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
  for (const type of platformTypes) {
    if (typeof type === 'string') {
      if (lower.includes(type.toLowerCase())) {
        return type;
      }
    } else {
      const names = [type.name, ...(type.aliases || [])];
      if (names.some(n => lower.includes(n.toLowerCase()))) {
        return type.name;
      }
    }
  }
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
function parseActions(prompt) {
  const parts = String(prompt)
    .split(/\band\b|\bthen\b|,/i)
    .map(p => p.trim())
    .filter(Boolean);
  return parts.map(toAction);
}
function isKnownPlatformType(type) {
  return platformTypes.some(t => {
    const name = typeof t === 'string' ? t : t.name;
    return name.toLowerCase() === type.toLowerCase();
  });
}
function logMissingPlatformType(type) {
  if (process.env.SKIP_CODEX_NOTES === '1') return;
  try {
    const notesPath = path.resolve(__dirname, '../../../communication/codex-notes.md');
    const note = `engines/platform-builder/src/parser.ts:\n  Note: Suggested platform type "${type}"\n`;
    fs.appendFileSync(notesPath, note);
  } catch {}
}
export async function parsePrompt(prompt) {
  const actions = parseActions(prompt);
  let platformType = detectPlatformType(prompt) || 'unknown';
  const components = actions.filter(a => a.type === 'add_component');
  if (platformType === 'unknown' || components.length === 0) {
    const hints = await askGPTForBlueprintHints(prompt);
    if (platformType === 'unknown' && hints.platformType && hints.platformType !== 'unknown') {
      platformType = hints.platformType;
      if (!isKnownPlatformType(platformType)) {
        logMissingPlatformType(platformType);
      }
    }
    for (const hint of hints.components || []) {
      const exists = components.some(c => c.params?.component.toLowerCase() === hint.component.toLowerCase());
      if (!exists) {
        const category = hint.category || findCategory(hint.component);
        const action = { type: 'add_component', params: { component: hint.component, category } };
        actions.push(action);
        components.push(action);
      }
    }
  }
  return { platformType, actions };
}
