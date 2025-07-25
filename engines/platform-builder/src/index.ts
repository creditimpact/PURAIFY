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
  if (!prompt || !project) {
    return res.status(400).json({ error: 'prompt and project are required' });
  }

  // Very naive blueprint generation
  const blueprint: BlueprintResponse = {
    project,
    blueprint: {
      trigger: { type: 'manual' },
      actions: [
        { type: 'log_message', params: { message: prompt } }
      ]
    }
  };

  res.json(blueprint);
});

const port = Number(process.env.PORT) || 4001;
app.listen(port, () => {
  console.log(`Platform Builder running on port ${port}`);
});

export default app;

