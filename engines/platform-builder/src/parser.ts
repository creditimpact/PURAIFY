import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { askGPTForBlueprintHints } from './gpt-helper.js';

export interface BlueprintAction {
  type: string;
  params?: Record<string, any>;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const knowledgeDir = path.resolve(__dirname, '../../../platform-knowledge');
function readJson(file: string, fallback: any) {
  try {
    return JSON.parse(fs.readFileSync(path.join(knowledgeDir, file), 'utf-8'));
  } catch {
    return fallback;
  }
}

export type PlatformTypeEntry = string | { name: string; aliases: string[] };
export const platformTypes: PlatformTypeEntry[] = readJson('platform-types.json', []);
export const platformComponents: Record<string, string[]> = readJson('platform-components.json', {});
export const componentAliases: Record<string, string> = readJson('component-aliases.json', {});
export const platformArchetypes: Record<string, string[]> = readJson('platform-archetypes.json', {});

function findCategory(component: string): string | undefined {
  for (const [category, comps] of Object.entries(platformComponents)) {
    if (comps.some(c => c.toLowerCase() === component.toLowerCase())) {
      return category;
    }
  }
}

export function detectPlatformType(prompt: string): string | undefined {
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

function toAction(phrase: string): BlueprintAction {
  const slack = phrase.match(/slack.*#(\S+)\s+(.*)/i);
  if (slack) {
    return {
      type: 'send_slack',
      params: { channel: `#${slack[1]}`, message: slack[2].trim() }
    };
  }
  const http = phrase.match(/http\s+(get|post|put|delete)\s+(https?:\/\/\S+)/i);
  if (http) {
    return {
      type: 'http_request',
      params: { method: http[1].toUpperCase(), url: http[2] }
    };
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

function parseActions(prompt: string): BlueprintAction[] {
  const parts = String(prompt)
    .split(/\band\b|\bthen\b|,/i)
    .map(p => p.trim())
    .filter(Boolean);
  return parts.map(toAction);
}

function isKnownPlatformType(type: string): boolean {
  return platformTypes.some(t => {
    const name = typeof t === 'string' ? t : t.name;
    return name.toLowerCase() === type.toLowerCase();
  });
}

function logMissingPlatformType(type: string) {
  if (process.env.SKIP_CODEX_NOTES === '1') return;
  try {
    const notesPath = path.resolve(__dirname, '../../../communication/codex-notes.md');
    const note = `engines/platform-builder/src/parser.ts:\n  Note: Suggested platform type "${type}"\n`;
    fs.appendFileSync(notesPath, note);
  } catch {}
}

export async function parsePrompt(prompt: string): Promise<{ platformType: string; actions: BlueprintAction[] }> {
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
        const action: BlueprintAction = {
          type: 'add_component',
          params: { component: hint.component, category }
        };
        actions.push(action);
        components.push(action);
      }
    }
  }
  return { platformType, actions };
}
