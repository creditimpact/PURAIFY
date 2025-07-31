import express, { Request, Response } from "express";

import { parsePrompt, BlueprintAction } from './parser.js';
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

interface Blueprint {
  trigger: { type: string };
  actions: BlueprintAction[];
}

interface BlueprintResponse {
  project: string;
  blueprint: Blueprint;
}

const app = express();
app.use(express.json());

app.post('/builder/create', (req: Request, res: Response) => {
  const { prompt, project } = req.body || {};
  if (typeof prompt !== 'string' || typeof project !== 'string') {
    return res.status(400).json({ error: 'prompt and project are required' });
  }

  const actions: BlueprintAction[] = parsePrompt(prompt);

  const blueprint: BlueprintResponse = {
    project,
    blueprint: {
      trigger: { type: 'manual' },
      actions
    }
  };

  res.json(blueprint);
});

const port = Number(process.env.BUILDER_PORT || process.env.PORT) || 4001;
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Platform Builder running on port ${port}`);
  });
}

export default app;

