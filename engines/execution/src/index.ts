import express, { Request, Response } from "express";

const app = express();
app.use(express.json());

interface ExecuteBody {
  action: string;
  project?: string;
  params?: Record<string, any>;
}

app.post('/execute', async (req: Request, res: Response) => {
  const { action, params } = req.body as ExecuteBody;
  if (!action) {
    return res.status(400).json({ status: 'error', message: 'action required' });
  }

  switch (action) {
    case 'log_message':
      console.log(params?.message);
      return res.json({ status: 'success' });
    default:
      return res.status(400).json({ status: 'error', message: 'Unknown action' });
  }
});

const port = Number(process.env.PORT) || 4002;
app.listen(port, () => {
  console.log(`Execution Engine running on port ${port}`);
});

export default app;

