import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

// Location for the token store file can be overridden for testing
// or custom deployments via the VAULT_DATA_FILE environment variable.
const DATA_FILE = process.env.VAULT_DATA_FILE || path.join(__dirname, 'tokens.json');

const ALGORITHM = 'aes-256-ctr';
const SECRET = (process.env.VAULT_SECRET || 'puraify_default_secret_key_32bytes!').slice(0, 32);

function encrypt(text: string): string {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(SECRET), iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decryptMaybe(data: string): string {
  try {
    const [ivHex, encHex] = data.split(':');
    if (!ivHex || !encHex) return data;
    const iv = Buffer.from(ivHex, 'hex');
    const encrypted = Buffer.from(encHex, 'hex');
    const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(SECRET), iv);
    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    return decrypted.toString();
  } catch {
    return data;
  }
}

export type TokenStore = Record<string, Record<string, string>>;

export function loadStore(): TokenStore {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    const store: TokenStore = JSON.parse(data);
    // decrypt values if encrypted
    for (const project of Object.keys(store)) {
      for (const service of Object.keys(store[project])) {
        store[project][service] = decryptMaybe(store[project][service]);
      }
    }
    return store;
  } catch {
    return {};
  }
}

export function saveStore(store: TokenStore): void {
  const toSave: TokenStore = {};
  for (const project of Object.keys(store)) {
    toSave[project] = {};
    for (const service of Object.keys(store[project])) {
      toSave[project][service] = encrypt(store[project][service]);
    }
  }
  fs.writeFileSync(DATA_FILE, JSON.stringify(toSave, null, 2));
}

/**
 * Remove all tokens for the given project from the in-memory store.
 * Returns true if the project existed and was removed.
 */
export function deleteProjectTokens(store: TokenStore, project: string): boolean {
  if (store[project]) {
    delete store[project];
    return true;
  }
  return false;
}
