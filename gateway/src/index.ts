import express, { Request, Response } from "express";
import axios from "axios";
import { ActionResult } from "./types";
import fs from 'fs';
import path from 'path';

export async function logEvent(level: string, message: string) {
  const logsUrl = process.env.LOGS_URL || 'http://localhost:4005';
  try {
    await axios.post(`${logsUrl}/monitoring/logs`, { level, message, engine: 'gateway' });
  } catch {}
}

export async function runBlueprint(project: string, blueprint: any): Promise<{ results: ActionResult[] }> {
  const validationUrl = process.env.VALIDATION_URL || 'http://localhost:4004';
  const executionUrl = process.env.EXECUTION_URL || 'http://localhost:4002';

  const valRes = await fetch(`${validationUrl}/validation/check`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ blueprint })
  });
  const valData = await valRes.json();
  if (!valData.valid) {
    throw new Error('validation failed');
  }

  const results: ActionResult[] = [];
  for (const action of blueprint.actions) {
    try {
      const res = await fetch(`${executionUrl}/execute`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: action.type, project, params: action.params })
      });
      const data = await res.json().catch(() => undefined);
      if (!res.ok) throw new Error(data?.error || res.statusText);
      results.push({ status: 'success', data });
    } catch (err: any) {
      results.push({ status: 'error', error: err.message });
    }
  }

  return { results };
}

function loadEnv() {
  const paths = [
    path.resolve(__dirname, '../.env'),
    path.resolve(__dirname, '../../.env')
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

const BUILDER_URL = process.env.BUILDER_URL || "http://localhost:4001";
const EXECUTION_URL = process.env.EXECUTION_URL || "http://localhost:4002";
const VAULT_URL = process.env.VAULT_URL || "http://localhost:4003";
const VALIDATION_URL = process.env.VALIDATION_URL || "http://localhost:4004";

app.post('/gateway/build-platform', async (req: Request, res: Response) => {
  try {
    logEvent('info', 'build-platform request');
    const response = await axios.post(`${BUILDER_URL}/builder/create`, req.body);
    res.json(response.data);
  } catch (err: any) {
    logEvent('error', 'build-platform failed');
    res.status(500).json({ error: err.message });
  }
});

app.post('/gateway/execute-action', async (req: Request, res: Response) => {
  try {
    logEvent('info', 'execute-action request');
    const response = await axios.post(`${EXECUTION_URL}/execute`, req.body);
    res.json(response.data);
  } catch (err: any) {
    logEvent('error', 'execute-action failed');
    res.status(500).json({ error: err.message });
  }
});

app.post('/gateway/store-token', async (req: Request, res: Response) => {
  try {
    logEvent('info', 'store-token request');
    const response = await axios.post(`${VAULT_URL}/vault/token`, req.body);
    res.json(response.data);
  } catch (err: any) {
    logEvent('error', 'store-token failed');
    res.status(500).json({ error: err.message });
  }
});


app.post('/gateway/run-blueprint', async (req: Request, res: Response) => {
  const { project, blueprint } = req.body || {};
  if (!project || !blueprint?.actions) {
    return res.status(400).json({ error: 'project and blueprint required' });
  }
  // Validate blueprint via Validation Engine before execution
  try {
    logEvent('info', 'run-blueprint validation start');
    const validateRes = await axios.post(`${VALIDATION_URL}/validation/check`, { blueprint });
    if (!validateRes.data?.valid) {
      logEvent('error', 'run-blueprint validation failed');
      return res.status(400).json(validateRes.data);
    }
  } catch (err: any) {
    // If validation service fails, halt execution and return error
    logEvent('error', 'run-blueprint validation error');
    return res.status(500).json({ error: err.message });
  }
  const results: ActionResult[] = [];
  for (const action of blueprint.actions) {
    try {
      const response = await axios.post(`${EXECUTION_URL}/execute`, {
        action: action.type,
        project,
        params: action.params
      });
      results.push({ status: 'success', data: response.data });
      logEvent('info', `${action.type} success`);
    } catch (err: any) {
      results.push({ status: 'error', error: err.message });
      logEvent('error', `${action.type} failed`);
    }
  }
  res.json({ results });
});

const port = Number(process.env.GATEWAY_PORT || process.env.PORT) || 4000;
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Gateway running on port ${port}`);
  });
}

export default app;

