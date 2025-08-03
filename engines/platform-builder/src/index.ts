import express, { Request, Response } from "express";

import { parsePrompt, BlueprintAction, detectPlatformType } from './parser.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export async function logEvent(level: string, message: string) {
  const logsUrl = process.env.LOGS_URL || 'http://localhost:4005';
  try {
    await fetch(`${logsUrl}/monitoring/logs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ level, message, engine: 'platform-builder' })
    });
  } catch {}
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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
  platformType?: string;
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
  const platformType = detectPlatformType(prompt);

  const blueprint: BlueprintResponse = {
    project,
    blueprint: {
      platformType,
      trigger: { type: 'manual' },
      actions
    }
  };
  logEvent('info', `blueprint created for ${project}`);
  res.json(blueprint);
});

const port = Number(process.env.BUILDER_PORT || process.env.PORT) || 4001;
if (process.argv[1] === __filename) {
  app.listen(port, () => {
    console.log(`Platform Builder running on port ${port}`);
  });
}

export default app;
