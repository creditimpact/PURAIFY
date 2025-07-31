# 🧠 AI Interaction Layer

> This engine is part of the PURAIFY system.  
> For the full system architecture, see the main [README.md](../../README.md).

---

## 🧠 Overview

The **AI Interaction Layer** is PURAIFY’s intelligent interface to LLMs (like GPT-4).  
Rather than naively “sending prompts,” this engine is designed to **structure requests**, **preserve context**, and **interpret results** in a way that other engines can trust and act on.

It allows PURAIFY to **ask the right questions** and **understand useful answers** — powering features like automatic debugging, smart suggestions, AI-assisted building, and documentation generation.

---

## 📁 Engine Structure

```text
ai-interaction/
├── package.json
├── tsconfig.json
├── README.md
├── ENGINE_SPEC.md
├── src/
│   ├── index.ts
│   ├── prompt-compiler.ts
│   ├── response-interpreter.ts
│   ├── context-manager.ts
│   └── router.ts
└── tests/
    └── interaction.test.ts
```

- `src/index.ts` — Express entry point for handling prompt requests.  
- `prompt-compiler.ts` — Builds structured prompts using templates and context.  
- `response-interpreter.ts` — Parses and validates AI responses.  
- `context-manager.ts` — Injects relevant metadata (platform, history).  
- `router.ts` — Routes based on task type (debug, suggest, document).

---

## 🚀 Development Setup

Requires Node.js v20+

```bash
npm ci
npm run dev
npm test
```

Environment configuration (`.env` or inherited):

- `OPENAI_API_KEY` – API token for GPT-4  
- `AI_MODEL` – Default model (e.g., gpt-4o)  
- `MAX_TOKENS` – Optional response token limit  
- `KNOWLEDGE_URL` – Optional for context injection  

Use `npm ci --prefer-offline` for offline installs.

---

## ⚙️ API Endpoint

**POST** `/ai/prompt`  
Accepts a structured AI interaction request. Builds and sends prompt to LLM, returns structured response.

### Request Example

```json
{
  "role": "system",
  "task": "analyze_code",
  "input": {
    "file": "login.js",
    "code_snippet": "function login() { ... }",
    "issue_description": "403 error"
  },
  "context": {
    "platform": "TaskBuilder",
    "user_feedback": "login fails silently"
  },
  "instruction": "חפש שגיאה בקוד והצע תיקון"
}
```

### Response Example

```json
{
  "analysis": "חסרה כותרת Authorization בבקשה",
  "suggested_fix": {
    "code_patch": "headers: { Authorization: `Bearer ${token}` }"
  }
}
```

---

## 🧩 Role within the PURAIFY System

This engine is not end-user-facing — it powers other engines with AI logic.  
Its outputs are used by:

| Engine / Module      | Purpose                                           |
|----------------------|---------------------------------------------------|
| Validation Engine     | Explain failed validations / suggest fixes       |
| Project Composer      | Auto-fill missing entities / logic               |
| Feedback Loop         | Phrase questions / suggestions clearly           |
| Documentation Generator | Convert blueprint to natural-language docs    |
| Logs Engine           | Explain common errors or anomalies               |
| Platform Builder      | Help generate forms/entities with intent-based prompts |

---

## 🛠️ Internals & Responsibilities

| Module               | Responsibility                                            |
|----------------------|-----------------------------------------------------------|
| Prompt Compiler       | Builds few-shot prompts with structure and intent         |
| Context Manager       | Injects relevant metadata (platform, schema, errors)      |
| Role Router           | Maps each request to the right task type                  |
| Response Interpreter  | Parses AI output into usable format                       |
| Feedback Integrator   | (Planned) Adjusts tone based on user response history     |

---

## 💬 Supported Task Types

| Task Name           | Description                                        |
|---------------------|----------------------------------------------------|
| analyze_code         | Detect problems in code snippets                   |
| generate_platform    | Build platform components from plain language      |
| rewrite_content      | Improve or rephrase content                        |
| debug_logic          | Find issues in logic/flow                          |
| extend_logic         | Add conditions, actions or triggers                |
| document_blueprint   | Convert Blueprint to natural-language docs         |
| ask_anything         | Freeform query handler ("just ask" mode)          |

---

## 📦 Technologies

- Node.js (TypeScript)  
- OpenAI SDK (gpt-4, gpt-4o)  
- Axios / fetch for HTTP  
- Zod / custom schemas for result parsing  
- Express.js for routing  

---

## 📌 Development Notes

- All prompt templates live under `/src/templates/` (coming soon).  
- Prompt includes injected metadata (permissions, platform, context).  
- Each request is stateless — no long-term memory is used.  
- Output is normalized: `{ intent, explanation, suggestions }`  
- Supports internal `debug_mode=true` flag for test harnesses.  

---

## 🧪 Testing

Run from root or engine folder:

```bash
npm test
```

Tests use mocked LLM responses for consistency.  
See `tests/interaction.test.ts` for cases like: prompt formatting, response parsing, fallback behavior.

---

## 👥 Example Use Cases

| Scenario                                      | Description                                               |
|----------------------------------------------|-----------------------------------------------------------|
| User asks: "איך מחברים Slack לטופס?"         | AI responds with steps and can generate connection logic |
| Validation error occurs in flow               | AI explains the error and suggests a fix                  |
| Composer can't generate entity name           | AI proposes one with related structure                    |
| Logs show repeated 403 errors                 | AI analyzes pattern and reports possible causes           |
| User writes vague logic instruction           | AI rewrites it into platform blueprint syntax             |

---

## 🧭 Summary

The AI Interaction Layer makes PURAIFY truly assistive.  
It’s the difference between “using AI” and “having an AI teammate.”  
By translating unclear input into precise intent — and smart answers into action —  
this engine turns language into logic.
