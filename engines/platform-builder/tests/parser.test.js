import assert from 'assert';
import { parsePrompt } from '../src/parser.js';

process.env.SKIP_CODEX_NOTES = '1';
const result = await parsePrompt('send slack #general hello then http get http://ex.com');
assert.deepStrictEqual(result.actions, [
  { type: 'send_slack', params: { channel: '#general', message: 'hello' } },
  { type: 'http_request', params: { method: 'GET', url: 'http://ex.com' } }
]);

