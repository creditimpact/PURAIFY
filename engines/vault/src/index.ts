import express, { Request, Response } from "express";

const app = express();
app.use(express.json());

// simple in-memory store: { [projectId]: { [service]: token } }
const tokenStore: Record<string, Record<string, string>> = {};

app.post('/vault/store', (req: Request, res: Response) => {
  const { projectId, service, token } = req.body || {};
  if (!projectId || !service || !token) {
    return res.status(400).json({ error: 'projectId, service and token are required' });
  }
  if (!tokenStore[projectId]) {
    tokenStore[projectId] = {};
  }
  tokenStore[projectId][service] = token;
  return res.json({ success: true });
});

app.get('/vault/token/:project/:service', (req: Request, res: Response) => {
  const { project, service } = req.params;
  const token = tokenStore[project]?.[service];
  if (!token) {
    return res.status(404).json({ error: 'Token not found' });
  }
  return res.json({ token });
});

const port = Number(process.env.PORT) || 4003;
app.listen(port, () => {
  console.log(`Vault engine running on port ${port}`);
});

export default app;

