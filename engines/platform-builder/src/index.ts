import express, { Request, Response } from "express";

interface BlueprintAction {
  type: string;
  params?: Record<string, any>;
}

interface Blueprint {
  trigger: { type: string };
  actions: BlueprintAction[];
}

interface BlueprintResponse {
  project: string;
  blueprint: Blueprint;
}

const app = express();
app.use(express.json());

app.post('/builder/create', (req: Request, res: Response) => {
  const { prompt, project } = req.body || {};
  if (typeof prompt !== 'string' || typeof project !== 'string') {
    return res.status(400).json({ error: 'prompt and project are required' });
  }

  const messages = String(prompt)
    .split(/\band\b|\bthen\b|,/i)
    .map(p => p.trim())
    .filter(Boolean);
  const actions: BlueprintAction[] = messages.map(m => ({ type: 'log_message', params: { message: m } }));

  const blueprint: BlueprintResponse = {
    project,
    blueprint: {
      trigger: { type: 'manual' },
      actions
    }
  };

  res.json(blueprint);
});

const port = Number(process.env.PORT) || 4001;
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Platform Builder running on port ${port}`);
  });
}

export default app;

