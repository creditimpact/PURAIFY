import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(__dirname, 'tokens.json');

export type TokenStore = Record<string, Record<string, string>>;

export function loadStore(): TokenStore {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return {};
  }
}

export function saveStore(store: TokenStore): void {
  fs.writeFileSync(DATA_FILE, JSON.stringify(store, null, 2));
}
