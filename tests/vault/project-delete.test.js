import assert from 'assert';
import { deleteProjectTokens } from '../../engines/vault/src/storage.js';

const store = { myproj: { slack: 'abc', notion: 'def' } };
assert.strictEqual(deleteProjectTokens(store, 'myproj'), true);
assert.deepStrictEqual(store, {});
assert.strictEqual(deleteProjectTokens(store, 'missing'), false);
