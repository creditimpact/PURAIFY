/**
 * 🧠 Codex Note:
 * - GET /vault/token/:project/:service endpoint not yet implemented
 * - Dev environment cannot run without npm packages (ts-node, express)
 *   because npm install fails in offline mode. Consider providing a lockfile
 *   or pre-install instructions for codex.
 */
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

export default app;

