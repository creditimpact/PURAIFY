import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { validateBlueprint } from './validator.js';

function loadEnv() {
  const paths = [
    path.resolve(__dirname, '../.env'),
    path.resolve(__dirname, '../../../.env')
  ];
  for (const p of paths) {
    if (fs.existsSync(p)) {
      for (const line of fs.readFileSync(p, 'utf-8').split('\n')) {
        const m = line.match(/^([^#=\s]+)\s*=\s*(.*)$/);
        if (m && !process.env[m[1]]) {
          process.env[m[1]] = m[2];
        }
      }
    }
  }
}
loadEnv();

const app = express();
app.use(express.json());

app.post('/validation/check', (req: Request, res: Response) => {
  const { blueprint } = req.body || {};
  if (!blueprint) {
    return res.status(400).json({ valid: false, errors: [{ field: 'blueprint', reason: 'blueprint required' }], warnings: [] });
  }

  const result = validateBlueprint(blueprint);
  if (!result.valid) {
    return res.status(400).json(result);
  }
  return res.json(result);
});

const port = Number(process.env.VALIDATION_PORT || process.env.PORT) || 4004;
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Validation Engine running on port ${port}`);
  });
}

export default app;
