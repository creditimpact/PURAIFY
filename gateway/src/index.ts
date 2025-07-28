import express, { Request, Response } from "express";
import axios from "axios";

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
    const response = await axios.post(`${VAULT_URL}/vault/store`, req.body);
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
  const results: any[] = [];
  for (const action of blueprint.actions) {
    try {
      const response = await axios.post(`${EXECUTION_URL}/execute`, {
        action: action.type,
        project,
        params: action.params
      });
      results.push(response.data);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }
  res.json({ results });
});

const port = Number(process.env.PORT) || 4000;
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Gateway running on port ${port}`);
  });
}

export default app;

