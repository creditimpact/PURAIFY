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
| Vault Engine | Stores API tokens and credentials securely | 🟢 In Progress |
| Execution Engine | Executes actions defined in the blueprint (e.g. Slack API) | 🟢 In Progress |
| Gateway | Routes requests and orchestrates calls between engines | 🟢 In Progress |

Each engine is an isolated microservice that communicates through internal APIs.

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
│   │   ├── ENGINE_SPEC.md          ← Manual spec placeholder
│   │   └── codex-todo.md           ← Local tasks
│   ├── platform-builder/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── src/
│   │   │   └── index.ts            ← Entry point for Platform Builder
│   │   ├── README.md               ← Platform Builder specification
│   │   ├── ENGINE_SPEC.md          ← Manual spec placeholder
│   │   └── codex-todo.md           ← Local tasks
│   ├── execution/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── src/
│   │   │   └── index.ts            ← Entry point for Execution Engine
│   │   ├── README.md               ← Execution Engine specification
│   │   ├── ENGINE_SPEC.md          ← Manual spec placeholder
│   │   └── codex-todo.md           ← Local tasks
├── tests/
│   ├── vault/                      ← Vault tests
│   ├── platform-builder/           ← Platform Builder tests
│   └── execution/                  ← Execution Engine tests
├── gateway/
│   ├── package.json
│   ├── tsconfig.json
│   ├── src/
│   │   └── index.ts                ← Main API router for the PURAIFY system
│   ├── README.md                   ← Gateway specification
│   └── ENGINE_SPEC.md              ← Manual spec placeholder
├── docker-compose.yml              ← (Planned) Multi-service setup
├── README.md                       ← You are here — main project overview
```

Each engine is self-contained, and its README defines its APIs, responsibilities, and integration points.

---

## 🔮 Future Goals

- Add a **Validation Engine** to ensure blueprints are complete and safe
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
   ```
3. Use the Gateway to connect everything (Docker Compose coming soon)

---

## 🤝 Contributing

Each engine has isolated logic and can be worked on independently.

You can contribute by:
- Improving an engine
- Adding a new service integration (Slack, Notion, etc.)
- Expanding the Gateway with new orchestration flows
- Creating reusable blueprints

Please see [CONTRIBUTION_PROTOCOL.md](CONTRIBUTION_PROTOCOL.md) for required
documentation rules. The latest implementation snapshot is kept in
[SYSTEM_STATE.md](SYSTEM_STATE.md).

---

Happy building,  
**The PURAIFY Team**
