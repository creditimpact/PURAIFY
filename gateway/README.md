# Gateway

> This engine is part of the PURAIFY system. For full system overview, see the main [README.md](../README.md)

## 🧠 Overview

The Gateway is the **central coordinator** of the PURAIFY system.  
It functions as the primary API entry point for the platform, handling user requests, routing them to the appropriate internal engines (Vault, Platform Builder, Execution, etc.), and composing responses back to the client.

The Gateway itself does not contain any business logic — instead, it is responsible for:
- **Orchestration**
- **Validation of request shape**
- **Authentication (in the future)**
- **Delegation to engines**

It is essentially the brainstem that connects and controls the flow of data between PURAIFY’s modular components.

---

## 📁 Engine Structure

```text
gateway/
├── package.json
├── tsconfig.json
├── README.md
├── ENGINE_SPEC.md
├── codex-todo.md
└── src/
    └── index.ts
```
Tests for this engine live in `tests/gateway/`.
## 🚀 Development Setup

Requires Node.js v20+.

```bash
npm ci
npm run dev
npm test
```

> Use `npm ci --prefer-offline` if installing without internet access.

- `src/index.ts` is the central Express router that delegates to all engines.
- `package.json` defines Gateway dependencies and scripts.
- `tsconfig.json` contains TypeScript compiler settings.
- `README.md` (this file) explains routing behavior and planned endpoints.
- `ENGINE_SPEC.md` will contain a detailed manual specification.
- `README.md` (this file) explains routing behavior and planned endpoints.

---

## 🧩 Role within the PURAIFY System

- Accepts requests from Codux, GPT, UI clients, or developers.
- Dispatches instructions to specific engines based on intent:
  - `POST /create` → Builder
  - `POST /execute` → Execution
  - `POST /vault/token` → Vault
- Combines engine responses into unified output.
- Acts as a firewall: prevents direct access to internal engines from external users.

Example Flow:
1. User sends: `POST /gateway/build-platform` with high-level description
2. Gateway → Platform Builder → returns a blueprint
3. Gateway → Execution Engine to run initial setup action
4. Gateway → returns success + results to user

---

## ⚙️ Planned API Endpoints

```
POST /gateway/build-platform
```
Passes prompt to Platform Builder and returns the blueprint.

```
POST /gateway/execute-action
```
Forwards action to Execution Engine and returns result.

```
POST /gateway/store-token
```
Sends token to Vault Engine for storage.

```
POST /gateway/run-blueprint
```
Iterates over a blueprint's actions and invokes the Execution Engine sequentially.

> More endpoints may be added as new capabilities emerge (validation, feedback, logs, etc.)

---

## 🛠️ Internals & Responsibilities

- **Routing Layer:** Determines which engine to invoke per route.
- **Standardized Request Format:** Expects incoming requests to follow defined shape.
- **Error Handling:** Converts engine errors into readable client errors.
- **Logging:** Basic request/response logging for now; later integrates with Logs Engine.
- **Security:** No external exposure of internal engines. Only Gateway communicates with outside world.

---

## 📦 Technologies

- Node.js (TypeScript)
- Express.js
- Axios (for internal engine communication)
- CORS + middleware
- dotenv / config loader

---

## 🚧 Development Notes

- Gateway is intentionally “thin” – it does not do logic, only routing and orchestration.
- Future versions will include:
  - JWT-based auth
  - Rate limiting / API keys
  - Smart fallback/retry logic

---

## 🧪 Example Use Cases

| Endpoint | Description |
|----------|-------------|
| `POST /gateway/build-platform` | User sends prompt, receives blueprint |
| `POST /gateway/execute-action` | Triggers execution of defined step |
| `POST /gateway/store-token` | Saves credentials for 3rd-party service |

---

## 🧭 Summary

The Gateway is the **front-door and conductor** of the PURAIFY platform.  
It ensures that each engine can focus on its own logic, while requests flow cleanly, securely, and consistently.

Without the Gateway, PURAIFY would be a disconnected set of tools.  
It makes the system **feel unified** and **work seamlessly**.
