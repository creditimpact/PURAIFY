# Execution Engine

> This engine is part of the PURAIFY system. For full system overview, see the main [README.md](../../README.md)

## 🧠 Overview

The Execution Engine is a core component in the PURAIFY platform. Its primary responsibility is to **execute actionable steps** defined by other engines, primarily the Platform Builder and Gateway.

While other engines handle tasks like blueprint generation, validation, and credential storage — the Execution Engine is the **actor**. It receives executable instructions, retrieves necessary tokens from the Vault Engine, and performs external or internal actions such as sending a message, triggering an API, or writing to a data store.

It acts as the operational “hands” of PURAIFY, turning definitions into real-world effects.

---

## 📁 Engine Structure

```text
execution/
├── package.json
├── tsconfig.json
├── README.md
├── ENGINE_SPEC.md
├── codex-todo.md
└── src/
    └── index.ts
```
Tests for this engine live in `tests/execution/`.
## 🚀 Development Setup

Requires Node.js v20+.

```bash
npm ci
npm run dev
```

> Use `npm ci --prefer-offline` if installing without internet access.

- `src/index.ts` is the placeholder Express entry point for action execution.
- `package.json` manages dependencies and scripts.
- `tsconfig.json` contains TypeScript compiler settings.
- `README.md` (this file) outlines Execution's responsibilities.
- `ENGINE_SPEC.md` will hold the detailed manual spec for this engine.

---

## 🧩 Role within the PURAIFY System

- **Input:** Receives execution requests from the Gateway.
- **Dependency:** Pulls required credentials from the Vault Engine.
- **Output:** Returns structured responses back to the Gateway.
- **Triggers:** External APIs (Slack, Notion, Google Sheets, etc.) or internal services.

The Gateway orchestrates flows and decides *when* to trigger Execution. Execution Engine only handles the *how*.

Example Flow:

1. User submits intent: “Send a Slack message when someone registers.”
2. Platform Builder generates a blueprint with `send_slack` action.
3. Gateway passes the action to Execution Engine.
4. Execution Engine:
   - Retrieves Slack token from Vault
   - Sends the Slack message via API
   - Returns result to Gateway

---

## ⚙️ Planned API Endpoints

```
POST /execute
```

Request:
- Receives an action name and parameters.
- Optionally includes metadata (project, environment).

Example:
```json
{
  "action": "send_slack",
  "project": "demo-project-001",
  "params": {
    "channel": "#general",
    "message": "New user signed up!"
  }
}
```

Response:
```json
{
  "status": "success",
  "data": {
    "slack_message_id": "abc123xyz"
  }
}
```

Error example:
```json
{
  "status": "error",
  "message": "Missing Slack token in Vault"
}
```

---

## 🛠️ Internals & Responsibilities

- **Dynamic Routing:** Determines which function to run based on action name.
- **Credential Fetching:** Queries Vault Engine to retrieve API keys or tokens.
- **External Communication:** Uses Axios (or similar) to call third-party APIs.
- **Unified Output Format:** All responses follow a standard `{ status, data, error }` model.
- **Pluggable Design:** New integrations (e.g., Notion, Google Drive, Zapier) can be added modularly.

---

## 📦 Technologies

- Node.js (TypeScript)
- Express.js for routing
- Axios for HTTP requests
- (Future) Redis for token caching
- OpenAPI Spec for documentation

---

## 🚧 Development Notes

- Basic Vault integration implemented for the `send_slack` action. The engine fetches a token via `GET /vault/token/:project/slack` and logs the action.
- The engine will evolve to support retries, fallback handlers, and async task queues.
- Logs should be structured and sent to Logs Engine in the future.

---

## 🧪 Example Action List (MVP Scope)

| Action         | Description                       | Requires Vault Token |
|----------------|-----------------------------------|-----------------------|
| `send_slack`   | Sends message to Slack channel     | ✅                    |
| `http_request` | Generic HTTP POST/GET to API      | ✅ (if private)       |
| `log_message`  | Internal debug output             | ❌                    |
| `create_sheet` | Create row in Google Sheet        | ✅                    |

---

## 🧭 Summary

The Execution Engine is a **high-responsibility component** in PURAIFY.  
It is the runtime actor of automation. It does **not** build, store, or validate — it **executes**.

All business logic defined elsewhere ultimately passes through this engine to become action.

Without Execution Engine, PURAIFY would be all structure, no action.

