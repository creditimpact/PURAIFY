import assert from 'assert';
import { validateBlueprint } from '../src/validator.js';

const bpValid = {
  trigger: { type: 'manual' },
  actions: [
    { type: 'log_message', params: { message: 'hi' } },
    { type: 'http_request', params: { url: 'http://example.com' } }
  ]
};

assert.deepStrictEqual(validateBlueprint(bpValid).valid, true);

const bpInvalid = {
  trigger: { type: 'manual' },
  actions: [ { type: 'unknown' } ]
};

const res = validateBlueprint(bpInvalid);
assert.strictEqual(res.valid, false);
assert.ok(res.errors.find(e => e.field === 'actions[0].type'));
