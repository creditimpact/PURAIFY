import assert from 'assert';
import { parsePrompt } from '../src/parser.js';

const result = parsePrompt('First step then second step and third step');
assert.deepStrictEqual(result, [
  { type: 'log_message', params: { message: 'First step' } },
  { type: 'log_message', params: { message: 'second step' } },
  { type: 'log_message', params: { message: 'third step' } }
]);
