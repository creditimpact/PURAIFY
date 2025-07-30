import { readdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dir = path.join(__dirname, 'tests');
for (const file of readdirSync(dir)) {
  if (file.endsWith('.js')) {
    console.log(`Running ${file}`);
    await import(path.join(dir, file));
  }
}
console.log('All tests passed');
