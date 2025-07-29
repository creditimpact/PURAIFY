import express, { Request, Response } from "express";
import { loadStore, saveStore, TokenStore, deleteProjectTokens } from "./storage";

const app = express();
app.use(express.json());

// token store persisted to disk
let tokenStore: TokenStore = loadStore();

app.post('/vault/store', (req: Request, res: Response) => {
  const { projectId, service, token } = req.body || {};
  if (typeof projectId !== 'string' || !projectId.trim() ||
      typeof service !== 'string' || !service.trim() ||
      typeof token !== 'string' || !token.trim()) {
    return res.status(400).json({ error: 'projectId, service and token are required' });
  }
  if (!tokenStore[projectId]) {
    tokenStore[projectId] = {};
  }
  tokenStore[projectId][service] = token;
  saveStore(tokenStore);
  return res.json({ success: true });
});

// Preferred endpoint using "project" for consistency
app.post('/vault/token', (req: Request, res: Response) => {
  const { project, service, token } = req.body || {};
  if (typeof project !== 'string' || !project.trim() ||
      typeof service !== 'string' || !service.trim() ||
      typeof token !== 'string' || !token.trim()) {
    return res.status(400).json({ error: 'project, service and token are required' });
  }
  if (!tokenStore[project]) {
    tokenStore[project] = {};
  }
  tokenStore[project][service] = token;
  saveStore(tokenStore);
  return res.json({ success: true });
});

app.get('/vault/token/:project/:service', (req: Request, res: Response) => {
  const { project, service } = req.params;
  if (!project || !service) {
    return res.status(400).json({ error: 'project and service required' });
  }
  const token = tokenStore[project]?.[service];
  if (!token) {
    return res.status(404).json({ error: 'Token not found' });
  }
  return res.json({ token });
});

app.delete('/vault/token/:project/:service', (req: Request, res: Response) => {
  const { project, service } = req.params;
  if (!project || !service) {
    return res.status(400).json({ error: 'project and service required' });
  }
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

app.get('/vault/tokens/:project', (req: Request, res: Response) => {
  const { project } = req.params;
  if (!project) {
    return res.status(400).json({ error: 'project required' });
  }
  const tokens = tokenStore[project];
  if (!tokens) {
    return res.status(404).json({ error: 'Project not found' });
  }
  return res.json({ tokens });
});

app.delete('/vault/tokens/:project', (req: Request, res: Response) => {
  const { project } = req.params;
  if (!project) {
    return res.status(400).json({ error: 'project required' });
  }
  if (deleteProjectTokens(tokenStore, project)) {
    saveStore(tokenStore);
    return res.json({ success: true });
  }
  return res.status(404).json({ error: 'Project not found' });
});

app.get('/vault/projects', (_req: Request, res: Response) => {
  return res.json({ projects: Object.keys(tokenStore) });
});

const port = Number(process.env.PORT) || 4003;
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Vault engine running on port ${port}`);
  });
}

export default app;

