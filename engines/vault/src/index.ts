import express, { Request, Response } from "express";
import {
  loadStore,
  saveStore,
  TokenStore,
  encodeToken,
  decodeToken,
} from "./storage";

const app = express();
app.use(express.json());

// token store persisted to disk
let tokenStore: TokenStore = loadStore();

function isValidId(id: string): boolean {
  return /^[a-zA-Z0-9_-]+$/.test(id);
}

app.post('/vault/store', (req: Request, res: Response) => {
  const { projectId, service, token } = req.body || {};
  if (!projectId || !service || !token) {
    return res.status(400).json({ error: 'projectId, service and token are required' });
  }
  if (!isValidId(projectId) || !isValidId(service) || typeof token !== 'string') {
    return res.status(400).json({ error: 'invalid input' });
  }
  if (!tokenStore[projectId]) {
    tokenStore[projectId] = {};
  }
  tokenStore[projectId][service] = encodeToken(token);
  saveStore(tokenStore);
  return res.json({ success: true });
});

// Preferred endpoint using "project" for consistency
app.post('/vault/token', (req: Request, res: Response) => {
  const { project, service, token } = req.body || {};
  if (!project || !service || !token) {
    return res.status(400).json({ error: 'project, service and token are required' });
  }
  if (!isValidId(project) || !isValidId(service) || typeof token !== 'string') {
    return res.status(400).json({ error: 'invalid input' });
  }
  if (!tokenStore[project]) {
    tokenStore[project] = {};
  }
  tokenStore[project][service] = encodeToken(token);
  saveStore(tokenStore);
  return res.json({ success: true });
});

app.get('/vault/token/:project/:service', (req: Request, res: Response) => {
  const { project, service } = req.params;
  const token = tokenStore[project]?.[service];
  if (!token) {
    return res.status(404).json({ error: 'Token not found' });
  }
  return res.json({ token: decodeToken(token) });
});

app.delete('/vault/token/:project/:service', (req: Request, res: Response) => {
  const { project, service } = req.params;
  if (tokenStore[project]?.[service]) {
    delete tokenStore[project][service];
    if (Object.keys(tokenStore[project]).length === 0) {
      delete tokenStore[project];
    }
    saveStore(tokenStore);
    return res.json({ success: true });
  }
  return res.status(404).json({ error: 'Token not found' });
});

const port = Number(process.env.PORT) || 4003;
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Vault engine running on port ${port}`);
  });
}

export default app;

