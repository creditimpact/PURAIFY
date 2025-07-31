import express, { Request, Response } from 'express';
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

interface LogEntry {
  timestamp: string;
  level: string;
  message: string;
  engine?: string;
}

const DATA_FILE = process.env.LOGS_DATA_FILE || path.join(__dirname, 'logs.json');

function loadLogs(): LogEntry[] {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function saveLogs(logs: LogEntry[]): void {
  fs.writeFileSync(DATA_FILE, JSON.stringify(logs, null, 2));
}

let logs = loadLogs();

const app = express();
app.use(express.json());

app.post('/monitoring/logs', (req: Request, res: Response) => {
  const { level = 'info', message, engine } = req.body || {};
  if (!message) {
    return res.status(400).json({ error: 'message required' });
  }
  const entry: LogEntry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    engine,
  };
  logs.push(entry);
  saveLogs(logs);
  res.json({ success: true });
});

app.get('/monitoring/logs', (_req: Request, res: Response) => {
  res.json({ logs });
});

const port = Number(process.env.LOGS_PORT || process.env.PORT) || 4005;
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Logs Engine running on port ${port}`);
  });
}

export default app;
