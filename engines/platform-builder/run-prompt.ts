import { parsePrompt, detectPlatformType } from './src/parser.js';
import type { BlueprintAction } from './src/parser.js';

const prompt = process.argv[2];

if (!prompt) {
  console.error('Usage: node run-prompt.ts "<prompt>"');
  process.exit(1);
}

const platformType = detectPlatformType(prompt);
const actions: BlueprintAction[] = parsePrompt(prompt);
const components = Array.from(new Set(
  actions
    .filter(a => a.type === 'add_component')
    .map(a => a.params?.component)
    .filter((c): c is string => Boolean(c))
));

const blueprint = {
  platformType,
  trigger: { type: 'manual' },
  actions
};

console.log(`🧠 Platform Type: ${platformType ?? 'unknown'}`);
console.log(`🧩 Components: ${JSON.stringify(components)}`);
console.log('📦 Blueprint:');
console.log(JSON.stringify(blueprint, null, 2));
