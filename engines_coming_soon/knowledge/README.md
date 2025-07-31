# Knowledge Engine

> This engine is part of the PURAIFY system. For the overall architecture, see the root [README.md](../../README.md).

---

## 🧠 Overview

The **Knowledge Engine** is the **platform modeler** of PURAIFY.  
It receives structured platform definitions from the **Platform Builder** or **Project Composer**, and transforms them into a unified, canonical **Blueprint**.

This blueprint represents the full picture of what the user has built: entities, logic, views, integrations, and relationships.

It acts as the internal “truth layer” — informing all other engines how the platform is structured.

---

## 📁 Engine Structure

```text
knowledge/
├── package.json
├── tsconfig.json
├── README.md
├── ENGINE_SPEC.md
├── codex-todo.md
└── src/
    ├── index.ts
    ├── blueprint-builder.ts
    ├── schema-mapper.ts
    └── store/
        ├── knowledge-store.ts
        └── diff-tracker.ts
```

Tests live in `knowledge/tests/`.

---

## 🚀 Development Setup

Requires Node.js v20+.

```bash
npm ci
npm run dev
npm test
```

Use the shared `.env` (`../../.env.example`) to configure `KNOWLEDGE_PORT` and internal engine URLs.  
Use `npm ci --prefer-offline` if installing without internet access.

---

## 🧩 Role within the PURAIFY System

**Input**: Raw platform data from Builder or Composer (UI, fields, logic, integrations)  
**Output**: Normalized Blueprint object  
**Used by**: Validation Engine, Execution Engine, Documentation Generator, Feedback Loop

**Example Flow**:

1. User creates a new platform with UI and logic  
2. Builder sends the structure to Knowledge Engine  
3. Knowledge Engine produces a canonical Blueprint  
4. Other engines consume this blueprint to validate, document, or execute

---

## 📦 Example Input

```json
{
  "project_id": "pf_001",
  "platform_name": "LeadsBoard",
  "ui": {
    "views": ["kanban", "table"],
    "fields": ["name", "status", "email"]
  },
  "logic_rules": [
    { "if": "status == hot", "then": "send_slack_message" }
  ],
  "integrations": ["Slack", "Notion"]
}
```

---

## 📤 Example Output – Blueprint

```json
{
  "project_id": "pf_001",
  "type": "Task Management",
  "entities": ["lead"],
  "fields": ["name", "status", "email"],
  "logic": [
    {
      "trigger": "status == hot",
      "action": "send_slack_message"
    }
  ],
  "integrations": ["Slack", "Notion"],
  "views": ["kanban", "table"]
}
```

---

## ⚙️ API Endpoints (Planned)

```bash
POST /knowledge/parse
# Receive structured input and return a normalized blueprint

GET /knowledge/blueprint/:project_id
# Return the full blueprint for a given project

GET /knowledge/changes/:project_id
# Return the diff log between blueprint versions
```

All endpoints return structured JSON with `{ status, data, error }`.

---

## 🛠️ Internals & Responsibilities

- **Blueprint Builder**: Converts UI and logic into unified blueprint  
- **Schema Mapper**: Normalizes entities, views, logic, integrations  
- **Knowledge Store**: Persists blueprint versions per project  
- **Diff Tracker**: Logs changes to platform definitions  
- **Query API**: Allows other engines to fetch full or partial blueprints  

---

## 🧪 Testing

Run:

```bash
npm run test
```

Inside `engines/knowledge`  
Or from root:

```bash
npm test
```

**Test coverage includes**:

- Input-to-blueprint conversion  
- Versioning and diff tracking  
- Structural validation against schema (planned)

---

## 💡 Notes & Behavior

- If input is missing critical data (e.g. field name, view type), the engine may trigger a completion prompt via the Feedback Engine or AI Layer  
- Blueprints are versioned and changes are tracked per platform  
- Supports schema-less platforms as well (automation-only, backend-only)

---

## 🧪 Example Use Cases

| Scenario                   | Outcome                                  |
|----------------------------|------------------------------------------|
| User builds new UI and rules | New blueprint version created          |
| Composer forks a platform   | Blueprint is duplicated and re-keyed   |
| Docs Generator runs         | Retrieves blueprint and renders docs   |
| Validation runs on deploy   | Checks blueprint shape for correctness |

---

## 🧭 Summary

The Knowledge Engine is the unified memory and structure layer of PURAIFY.  
It builds, updates, and exposes blueprints for all engines to consume.

It doesn’t validate, execute, or guess — it simply describes with precision what exists.

Without it, other engines wouldn’t know what the user built — or how to act on it.
