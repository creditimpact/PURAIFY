import test from 'node:test';
import assert from 'assert';
import { encodeToken, decodeToken } from '../../engines/vault/dist/storage.js';

test('encodeToken/decodeToken round trip', () => {
  const token = 'secret123';
  const encoded = encodeToken(token);
  const decoded = decodeToken(encoded);
  assert.strictEqual(decoded, token);
});
