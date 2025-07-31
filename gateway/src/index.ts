import express, { Request, Response } from "express";
import axios from "axios";
import { ActionResult } from "./types";
import fs from 'fs';
import path from 'path';

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

app.post('/gateway/build-platform', async (req: Request, res: Response) => {
  try {
    const response = await axios.post(`${BUILDER_URL}/builder/create`, req.body);
    res.json(response.data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/gateway/execute-action', async (req: Request, res: Response) => {
  try {
    const response = await axios.post(`${EXECUTION_URL}/execute`, req.body);
    res.json(response.data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/gateway/store-token', async (req: Request, res: Response) => {
  try {
    const response = await axios.post(`${VAULT_URL}/vault/token`, req.body);
    res.json(response.data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});


app.post('/gateway/run-blueprint', async (req: Request, res: Response) => {
  const { project, blueprint } = req.body || {};
  if (!project || !blueprint?.actions) {
    return res.status(400).json({ error: 'project and blueprint required' });
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
    } catch (err: any) {
      results.push({ status: 'error', error: err.message });
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

