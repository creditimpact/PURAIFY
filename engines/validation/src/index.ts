import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

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
    return res.status(400).json({ error: 'blueprint required' });
  }
  // Simple placeholder validation
  if (!Array.isArray(blueprint.actions)) {
    return res.status(400).json({ error: 'actions array required' });
  }
  return res.json({ valid: true });
});

const port = Number(process.env.VALIDATION_PORT || process.env.PORT) || 4004;
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Validation Engine running on port ${port}`);
  });
}

export default app;
