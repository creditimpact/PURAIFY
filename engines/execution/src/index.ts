import express, { Request, Response } from "express";
import fs from 'fs';
import path from 'path';
import { logMessage, sendSlack } from './actions.js';

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

interface ExecuteBody {
  action: string;
  project?: string;
  params?: Record<string, any>;
}

app.post('/execute', async (req: Request, res: Response) => {
  const { action, project, params } = req.body as ExecuteBody;
  if (!action) {
    return res.status(400).json({ status: 'error', message: 'action required' });
  }

  switch (action) {
    case 'log_message': {
      const result = await logMessage(params || {});
      return res.json(result);
    }
    case 'send_slack': {
      try {
        const result = await sendSlack(project!, params || {});
        if (result.status === 'error') {
          return res.status(result.message === 'Slack token not found' ? 404 : 400).json(result);
        }
        return res.json(result);
      } catch (err: any) {
        return res.status(500).json({ status: 'error', message: err.message });
      }
    }
    default:
      return res.status(400).json({ status: 'error', message: 'Unknown action' });
  }
});

const port = Number(process.env.EXECUTION_PORT || process.env.PORT) || 4002;
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Execution Engine running on port ${port}`);
  });
}

export default app;

