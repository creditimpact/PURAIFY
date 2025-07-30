// Vault project delete test
import assert from 'assert';
import { deleteProjectTokens } from '../src/storage.js';

const store = { myproj: { slack: 'abc', notion: 'def' } };
assert.strictEqual(deleteProjectTokens(store, 'myproj'), true);
assert.deepStrictEqual(store, {});
assert.strictEqual(deleteProjectTokens(store, 'missing'), false);
