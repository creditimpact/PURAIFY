import fs from 'fs';
import path, { dirname } from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DATA_FILE = process.env.VAULT_DATA_FILE || path.join(__dirname, 'tokens.json');

const ALGORITHM = 'aes-256-ctr';
const SECRET = (process.env.VAULT_SECRET || 'puraify_default_secret_key_32bytes!').slice(0, 32);

function encrypt(text) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(SECRET), iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decryptMaybe(data) {
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

export function loadStore() {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    const store = JSON.parse(data);
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

export function saveStore(store) {
  const toSave = {};
  for (const project of Object.keys(store)) {
    toSave[project] = {};
    for (const service of Object.keys(store[project])) {
      toSave[project][service] = encrypt(store[project][service]);
    }
  }
  fs.writeFileSync(DATA_FILE, JSON.stringify(toSave, null, 2));
}

export function deleteProjectTokens(store, project) {
  if (store[project]) {
    delete store[project];
    return true;
  }
  return false;
}
