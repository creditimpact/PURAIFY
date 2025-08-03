// Platform Builder engine tests
import assert from 'assert';
import { parsePrompt, detectPlatformType } from '../src/parser.js';

process.env.SKIP_CODEX_NOTES = '1';

// detect platform type
assert.strictEqual(detectPlatformType('Build a CRM platform'), 'CRM Platform');

// parse component action via alias
const parsed = await parsePrompt('please make a form');
assert.deepStrictEqual(parsed.actions[0], { type: 'add_component', params: { component: 'Forms', category: 'Input' } });

// GPT fallback for fuzzy prompt (mocked)
process.env.SKIP_CODEX_NOTES = '1';
globalThis.__mockAskGPTForBlueprintHints = async () => ({
  platformType: 'Support Platform',
  components: [
    { component: 'Signups', category: 'Users' },
    { component: 'Calendar Slots', category: 'Scheduler' },
    { component: 'Email Confirmations', category: 'Notifications' }
  ]
});
const fuzzy = await parsePrompt('Build a volunteer matching app with signups, calendar slots, and email confirmations');
assert.strictEqual(fuzzy.platformType, 'Support Platform');
assert.ok(fuzzy.actions.some(a => a.params?.component === 'Signups'));
assert.ok(fuzzy.actions.some(a => a.params?.component === 'Calendar Slots'));
assert.ok(fuzzy.actions.some(a => a.params?.component === 'Email Confirmations'));
