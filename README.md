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
| Platform Builder | Converts user prompts into structured blueprints | 🔲 Not Started |
| Vault Engine | Stores API tokens and credentials securely | 🟢 In Progress |
| Execution Engine | Executes actions defined in the blueprint (e.g. Slack API) | 🔲 Not Started |
| Gateway | Routes requests and orchestrates calls between engines | 🔲 Not Started |

Each engine is an isolated microservice that communicates through internal APIs.

---

## 📁 Project Structure

This is a monorepo organized by engine:

```
puraify/
├── engines/
│   ├── vault/
│   │   ├── src/
│   │   │   └── index.ts            ← Entry point for Vault Engine
│   │   └── README.md               ← Vault Engine specification
│   ├── platform-builder/
│   │   ├── src/
│   │   │   └── index.ts            ← Entry point for Platform Builder
│   │   └── README.md               ← Platform Builder specification
│   ├── execution/
│   │   ├── src/
│   │   │   └── index.ts            ← Entry point for Execution Engine
│   │   └── README.md               ← Execution Engine specification
├── gateway/
│   ├── src/
│   │   └── index.ts                ← Main API router for the PURAIFY system
│   └── README.md                   ← Gateway specification
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

To start working on the project:

1. Pick an engine (e.g., `vault`)
2. Read its `README.md` inside `engines/vault/`
3. Run its dev server or use Docker Compose (coming soon)
4. Use the Gateway to connect everything

---

## 🤝 Contributing

Each engine has isolated logic and can be worked on independently.

You can contribute by:
- Improving an engine
- Adding a new service integration (Slack, Notion, etc.)
- Expanding the Gateway with new orchestration flows
- Creating reusable blueprints

---

Happy building,  
**The PURAIFY Team**
