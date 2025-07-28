import express, { Request, Response } from "express";
import axios from "axios";

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
    case 'log_message':
      console.log(params?.message);
      return res.json({ status: 'success' });
    case 'send_slack': {
      if (!project) {
        return res.status(400).json({ status: 'error', message: 'project required' });
      }
      try {
        const vaultUrl = process.env.VAULT_URL || 'http://localhost:4003';
        const { data } = await axios.get(`${vaultUrl}/vault/token/${project}/slack`);
        const token = data.token;
        console.log(`Would send Slack message '${params?.message}' with token ${token}`);
        return res.json({ status: 'success' });
      } catch (err: any) {
        if (axios.isAxiosError(err) && err.response?.status === 404) {
          return res.status(404).json({ status: 'error', message: 'Slack token not found' });
        }
        return res.status(500).json({ status: 'error', message: err.message });
      }
    }
    default:
      return res.status(400).json({ status: 'error', message: 'Unknown action' });
  }
});

const port = Number(process.env.PORT) || 4002;
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Execution Engine running on port ${port}`);
  });
}

export default app;

