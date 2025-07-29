import express, { Request, Response } from "express";

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
      if (!params?.channel || !params?.message) {
        return res.status(400).json({ status: 'error', message: 'channel and message required' });
      }
      try {
        const vaultUrl = process.env.VAULT_URL || 'http://localhost:4003';
        const tokenResp = await fetch(`${vaultUrl}/vault/token/${project}/slack`);
        if (tokenResp.status === 404) {
          return res.status(404).json({ status: 'error', message: 'Slack token not found' });
        }
        if (!tokenResp.ok) {
          throw new Error(`Vault error: ${tokenResp.status}`);
        }
        const { token } = await tokenResp.json();
        const slackResp = await fetch('https://slack.com/api/chat.postMessage', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ channel: params.channel, text: params.message })
        });
        const slackJson = await slackResp.json();
        if (!slackJson.ok) {
          return res.status(500).json({ status: 'error', message: slackJson.error });
        }
        return res.json({ status: 'success', data: { ts: slackJson.ts } });
      } catch (err: any) {
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

