# PURAIFY — Autonomous Platform Builder

## 🧠 What is PURAIFY?

PURAIFY is a modular, AI-assisted system that allows users to define digital platforms in natural language — and automatically turns those ideas into working, executable backends.

Users can describe a system like:
> “I want to send a Slack message when someone submits a form.”

And PURAIFY will:
1. Interpret the intent
2. Generate a structured automation blueprint
3. Store any required credentials (e.g. Slack tokens)
4. Execute the automation when triggered
5. Return results and allow expansion

This enables fast creation of business logic and automations — without writing code manually.

---

## 🔧 Core Architecture

PURAIFY is composed of specialized engines, each with a single responsibility:

| Engine | Purpose | Status |
|---|---|---|
| Platform Builder | Converts user prompts into structured blueprints | 🟢 In Progress |
| Vault Engine | Stores API tokens and credentials securely (encrypted in `tokens.json` when `VAULT_SECRET` is set) | 🟢 In Progress |
| Execution Engine | Executes actions defined in the blueprint (e.g. Slack API) | 🟢 In Progress |
| Gateway | Routes requests and orchestrates calls between engines | 🟢 In Progress |
| Validation Engine | Ensures blueprints are well-formed before execution | 🟢 In Progress |

Each engine is an isolated microservice that communicates through internal APIs.
Each engine fetches its own tokens from the Vault Engine when needed; the Gateway only orchestrates requests and stores new credentials.

---

## 📁 Project Structure

This is a monorepo organized by engine:

```
puraify/
├── engines/
│   ├── vault/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── src/
│   │   │   └── index.ts            ← Entry point for Vault Engine
│   │   ├── README.md               ← Vault Engine specification
│   │   ├── ENGINE_SPEC.md          ← Engine specification (must stay updated)
│   │   ├── codex-todo.md           ← Local tasks
│   │   └── tests/                  ← Vault tests
│   ├── platform-builder/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── src/
│   │   │   └── index.ts            ← Entry point for Platform Builder
│   │   ├── README.md               ← Platform Builder specification
│   │   ├── ENGINE_SPEC.md          ← Engine specification (must stay updated)
│   │   ├── codex-todo.md           ← Local tasks
│   │   └── tests/                  ← Platform Builder tests
│   ├── execution/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── src/
│   │   │   └── index.ts            ← Entry point for Execution Engine
│   │   ├── README.md               ← Execution Engine specification
│   │   ├── ENGINE_SPEC.md          ← Engine specification (must stay updated)
│   │   ├── codex-todo.md           ← Local tasks
│   │   └── tests/                  ← Execution Engine tests
│   ├── validation/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── src/
│   │   │   └── index.ts            ← Entry point for Validation Engine
│   │   ├── README.md               ← Validation Engine specification
│   │   ├── ENGINE_SPEC.md          ← Engine specification (must stay updated)
│   │   ├── codex-todo.md           ← Local tasks
│   │   └── tests/                  ← Validation Engine tests
├── gateway/
│   ├── tests/                      ← Gateway tests
│   ├── package.json
│   ├── tsconfig.json
│   ├── src/
│   │   └── index.ts                ← Main API router for the PURAIFY system
│   ├── README.md                   ← Gateway specification
│   ├── ENGINE_SPEC.md              ← Engine specification (must stay updated)
│   └── codex-todo.md               ← Local tasks
├── docker-compose.yml              ← Docker Compose configuration
├── .env.example                    ← Sample environment variables
├── ENGINE_DEPENDENCIES.md          ← Declared engine relationships
├── NAMESPACE_MAP.md                ← Cross-engine name map
├── docs/SYSTEM_RULES.md                 ← High-level system policies
├── docs/codex-questions.md              ← Architecture question log
├── docs/codex-todo.md                   ← Global tasks
├── docs/codex-notes.md              ← Codex internal notes and process log
├── docs/human-todo.md              ← Manual setup tasks
├── docs/CODEX_TODO_FORMAT.md            ← Standard todo file format
├── README.md                       ← You are here — main project overview
```

Automated tests for each engine live inside that engine's `tests/` directory (e.g., `engines/vault/tests/` or `gateway/tests/`). Run them with `npm test` in the engine folder. Tests execute via Node's built-in module loader through each engine's `run-tests.js` script.

Each engine is self-contained, and its README defines its APIs, responsibilities, and integration points.

---

## 🔮 Future Goals

- Expand the **Validation Engine** with deeper schema checks and policy enforcement
- Integrate with **frontend builders** to auto-generate UIs
- Support **scheduling, async tasks**, and conditional logic
- Enable a **blueprint marketplace** for sharing and reusing flows
- Connect to more external services (Google Drive, Airtable, Zapier, etc.)

---

## 🚀 Getting Started
Requires Node.js v20+.

To start working on the project:

1. Pick an engine (e.g., `vault`)
2. Navigate to its folder and run:
   ```bash
   npm install
   npm run dev
   npm test
   ```
3. Copy `.env.example` to `.env` in the repository root and adjust service URLs if needed.
3. Use the Gateway to connect everything (`docker-compose up` to run all engines)
4. Orchestrate a full workflow via `POST /gateway/run-blueprint`.
   This endpoint executes each action sequentially and returns a
   `results` array detailing success or error for every step.

---

## 🤝 Contributing

Each engine has isolated logic and can be worked on independently.

You can contribute by:
- Improving an engine
- Adding a new service integration (Slack, Notion, etc.)
- Expanding the Gateway with new orchestration flows
- Creating reusable blueprints
- Ensure all new engines or updates follow the **Engine Structure & Best Practices** checklist described in `CONTRIBUTION_PROTOCOL.md`.

Please see [CONTRIBUTION_PROTOCOL.md](docs/CONTRIBUTION_PROTOCOL.md) for required
documentation rules. The latest implementation snapshot is kept in
[SYSTEM_STATE.md](SYSTEM_STATE.md).
Environment or configuration updates follow the "Proposed Actions" workflow defined in
`CONTRIBUTION_PROTOCOL.md` and logged in `docs/PROPOSED_ACTIONS_LOG.md`.
Manual setup tasks that need human attention are tracked in `docs/human-todo.md`.

---

Happy building,  
**The PURAIFY Team**
