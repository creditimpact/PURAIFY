import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { addLog, queryLogs } from './service.js';

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

app.post('/monitoring/logs', (req: Request, res: Response) => {
  const { level = 'info', message, engine } = req.body || {};
  if (!message) {
    return res.status(400).json({ error: 'message required' });
  }
  addLog({ level, message, engine });
  res.json({ success: true });
});

app.post('/monitoring/alert', (req: Request, res: Response) => {
  const { message, severity = 'critical', engine } = req.body || {};
  if (!message) {
    return res.status(400).json({ error: 'message required' });
  }
  addLog({ level: severity, message, engine });
  res.json({ received: true });
});

app.get('/monitoring/logs', (req: Request, res: Response) => {
  const { engine, level } = req.query as any;
  const logs = queryLogs({ engine, level });
  res.json({ logs });
});

const port = Number(process.env.LOGS_PORT || process.env.PORT) || 4005;
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Logs Engine running on port ${port}`);
  });
}

export default app;
