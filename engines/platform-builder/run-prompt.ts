import { parsePrompt, detectPlatformType } from './src/parser.js';
import type { BlueprintAction } from './src/parser.js';

const prompt = process.argv.slice(2).join(' ');

if (!prompt) {
  console.error('Usage: node run-prompt.ts "<prompt>"');
  process.exit(1);
}

console.log("📦 Prompt received:", prompt);

(async () => {
  try {
    const platformType = await detectPlatformType(prompt);
    const actions: BlueprintAction[] = await parsePrompt(prompt);

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

    console.log(`\n🧠 Platform Type: ${platformType ?? 'unknown'}`);
    console.log(`🧩 Components: ${JSON.stringify(components)}`);
    console.log('\n📦 Blueprint:');
    console.log(JSON.stringify(blueprint, null, 2));
  } catch (err) {
    console.error('\n❌ Error while building blueprint:');
    console.error(err);
  }
})();
