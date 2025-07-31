# 📝 Documentation Generator

> This engine is part of the PURAIFY system. For the full platform architecture, see the root [README.md](../../README.md)

---

## 🧠 Overview

The **Documentation Generator** is responsible for creating clear, structured, and user-friendly documentation from platform Blueprints — automatically.  
It converts logic, entities, integrations, and flows into readable docs for end-users, developers, and stakeholders.

This includes:

- System overviews
- Entity and logic breakdowns
- Integration descriptions
- API documentation (if applicable)
- Permission and auth structure
- Glossaries and changelogs

The output is available in various formats such as Markdown, PDF, or even as a hosted documentation site.

---

## 📁 Engine Structure

```text
documentation-generator/
├── package.json
├── tsconfig.json
├── README.md
├── ENGINE_SPEC.md
└── src/
    ├── index.ts
    ├── blueprint-reader.ts
    ├── doc-builder.ts
    ├── glossary-generator.ts
    └── export-layer.ts
```

Tests (if any) reside under `documentation-generator/tests/`.

---

## 🚀 Development Setup

Requires Node.js v20+

```bash
npm ci
npm run dev
npm run test
```

Use the shared `.env` file (`../../.env.example`) to configure:

- `DOC_GEN_PORT`
- `KNOWLEDGE_URL`
- `AI_SUMMARY_URL`
- `VAULT_URL`

Use `npm ci --prefer-offline` for installation in offline environments.

---

## ⚙️ API Endpoint

### POST `/generate-docs`

Generate documentation from a platform blueprint.

#### Request Body

```json
{
  "project_id": "pf_2023",
  "version": "v2.1",
  "blueprint": { ... },
  "output_format": "markdown",
  "language": "en"
}
```

#### Response (Markdown)

```markdown
# MyPlatform – Docs

## Overview
...

## Entities
...

## Logic
...

## API
...

## Integrations
...
```

Other formats: `pdf`, `webpage`, `notion_embed`.

---

## 🧩 Role within the PURAIFY System

| Step               | Source Engine       | Description                                         |
|--------------------|---------------------|-----------------------------------------------------|
| Fetch blueprint    | Knowledge Engine    | Gets full structure of the project                  |
| Detect changes     | Platform Builder    | Signals what has changed for incremental docs       |
| Summarize logic    | AI Interaction Layer| Converts rules into natural language                |
| Extract integrations | Vault Engine      | Lists tokens, permissions, scopes                   |
| Append real usage  | Logs Engine         | Enriches docs with real-world examples              |

---

## 🛠️ Internals & Responsibilities

- **Blueprint Reader**: Parses platform entities, actions, logic, and UI  
- **Doc Builder**: Creates documentation hierarchy (overview, logic, integrations, API)  
- **Glossary Generator**: Builds a dictionary of terms from the platform  
- **AI Summary Layer**: Writes natural-language explanations for flows and logic  
- **Export Layer**: Outputs docs in Markdown, PDF, Notion, or hosted format  

---

## 📦 Technologies

- Node.js (TypeScript)  
- Express.js (HTTP interface)  
- OpenAI / LLM integration (for summaries)  
- Markdown/PDF generators  
- dotenv for configuration  

---

## 🚧 Development Notes

The engine is stateless — all blueprint data must be passed in or fetched per request.

Future versions may include:

- Visual diagrams of logic flows  
- Automatic change logs between versions  
- Live preview of docs while editing  
- Hosted doc site per project (e.g., `docs.puraify.io/mycrm`)  

---

## 🧪 Example Use Cases

| Scenario                  | Description                                           |
|---------------------------|-------------------------------------------------------|
| Project completed         | Auto-generate docs as part of final step              |
| Developer wants README    | Outputs project summary in Markdown                   |
| Stakeholder wants overview| One-click PDF with diagrams and glossary              |
| Notion team space integration | Push docs directly into team's workspace        |

---

## 🧩 Dependencies

| Engine           | Purpose                                       |
|------------------|-----------------------------------------------|
| Knowledge Engine | Fetches blueprint and metadata                |
| Vault Engine     | Reads integration tokens and scopes           |
| Logs Engine      | Pulls usage samples for enriched documentation|
| Platform Builder | Listens for changes to update docs            |
| AI Interaction   | Generates summaries from raw logic            |

---

## 🧪 Testing

```bash
npm run test
```

Tests cover:

- Valid/invalid doc generation requests  
- Markdown export correctness  
- AI summary fallback handling  

---

## 🧭 Summary

The Documentation Generator makes it easy to understand, share, and maintain platforms built in PURAIFY.  
It’s the fastest way to create human‑friendly, always‑updated documentation — from nothing but a Blueprint.

**Clear docs. Zero effort. Built in.**
