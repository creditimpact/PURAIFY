import assert from 'assert';
import { parsePrompt } from '../src/parser.js';

const result = parsePrompt('send slack #general hello then http get http://ex.com');
assert.deepStrictEqual(result, [
  { type: 'send_slack', params: { channel: '#general', message: 'hello' } },
  { type: 'http_request', params: { method: 'GET', url: 'http://ex.com' } }
]);

