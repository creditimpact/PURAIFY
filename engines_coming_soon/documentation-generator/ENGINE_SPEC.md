# 🧠 Engine Spec: Documentation Generator

## 🎯 Purpose

The Documentation Generator Engine creates human-readable documentation for platforms built in PURAIFY.  
It transforms the platform's blueprint, logic, and integrations into clear, structured, and shareable documentation — automatically and on demand.

Its goal is to make every system explainable: for developers, stakeholders, and end-users.  
Whether it's a README, PDF, or a full docs website — it delivers clear insights into how the platform works, what it does, and how to use it.

---

## ⚙️ Core Responsibilities

| Action                      | Description                                                             |
|-----------------------------|-------------------------------------------------------------------------|
| 📄 Generate End-User Docs    | Creates natural-language guides explaining how the system is used       |
| 🧑‍💻 Generate Technical Docs | Describes platform structure: entities, fields, triggers, actions       |
| 🔌 Document Integrations     | Details connected services and their available operations               |
| 📤 Export Documentation      | Allows export to Markdown, PDF, Notion, README, or hosted docs          |
| 🧾 Generate API Reference     | (If applicable) Generates endpoint documentation from blueprint         |
| 🔄 Auto-update Documentation | Updates docs when platform changes (new version, new field, etc.)       |

---

## 🚫 What It Does NOT Do

- ❌ Does not create or modify platforms  
- ❌ Does not execute flows or perform validations  
- ❌ Does not store project state (relies on external data sources)  

---

## 🔗 Engine Integrations

| Engine              | Role                                                                  |
|---------------------|-----------------------------------------------------------------------|
| Platform Builder    | Provides real-time updates of the platform’s logic and fields         |
| Knowledge Engine    | Supplies the full blueprint with structure and metadata               |
| Execution Engine    | Informs available actions and dynamic examples                        |
| Vault Engine        | Used to reference auth types and permission scopes                    |
| Logs Engine         | Supplies usage examples for enriched documentation                    |
| AI Interaction Layer| Converts technical logic into natural, user-friendly descriptions     |

---

## 📥 Input Example

```json
{
  "project_id": "pf-2023",
  "blueprint": {
    "entities": [...],
    "actions": [...],
    "logic": [...]
  },
  "user_flows": ["signup", "submit_form", "notify_slack"],
  "output_format": "markdown"
}
```

---

## 📤 Output Example (Markdown)

```markdown
# MyCRM Platform – Documentation

## Overview
MyCRM is a lightweight sales tracking tool with Slack and Notion integrations.

## Entities
- Lead: name, status, email
- Task: title, due_date, assigned_to

## Logic
- On `status = hot` → Send Slack message to #sales
- On `form_submitted` → Create new lead

## API (Auto-generated)
- POST /leads → Create new lead
- GET /tasks → Retrieve tasks

## Integrations
- Slack: chat:write
- Notion: pages:read, databases:write

## Auth
OAuth via PURAIFY Vault
```

---

## 🔄 Execution Flow

### Input

```json
{
  "project_id": "pf_455",
  "version": "v2.1",
  "language": "he",
  "format": "markdown"
}
```

### Flow

1. Load full platform blueprint from Knowledge Engine  
2. Parse entities, logic, UI flows, integrations  
3. Use AI Layer to generate natural language explanations  
4. Build full docs structure: overview, glossary, API, changelog  
5. Export to requested format (Markdown, PDF, Web)  

---

## 🧱 Internal Architecture

| Module             | Description                                                                 |
|--------------------|-----------------------------------------------------------------------------|
| Structure Reader   | Parses platform blueprint and project metadata                              |
| AI Summary Builder | Converts internal logic into user-friendly explanations                     |
| Glossary Generator | Creates a terminology dictionary from entities, fields, actions             |
| Change Tracker     | Detects differences between versions for changelogs                         |
| Export Layer       | Outputs the docs in multiple formats (Markdown, Notion, Web)                |

---

## 🌐 External Dependencies

| Service / Engine     | Purpose                                        |
|----------------------|------------------------------------------------|
| Knowledge Engine     | Provides complete project structure            |
| Platform Builder     | Supplies live updates and annotations          |
| AI Interaction Layer | Generates natural-language sections            |
| Logs Engine          | Provides real-world usage examples             |
| Vault Engine         | Lists used permissions or scopes               |
| Project Composer     | Adds templates and style settings for generated docs |

---

## 👥 User Interaction Triggers

| Scenario                | Trigger                                      |
|-------------------------|----------------------------------------------|
| After project creation  | User clicks "Generate Docs" in dashboard     |
| At version deployment   | Auto‑generation of updated docs              |
| From Codux/AI Interface | User requests summary for a form or module   |
| Manual request via API  | Direct POST /generate-docs call              |

---

## 💡 Future Enhancements

- Auto-generated diagrams of flow logic and entities  
- Themeable documentation websites (like Stripe Docs)  
- Embedded examples from Logs Engine  
- Support for multiple documentation languages  
- Real-time preview during platform editing  

---

## 🧠 Summary

The Documentation Generator is the voice of PURAIFY.  
It translates complex systems into human-readable docs that are easy to share, understand, and maintain.

It helps teams build faster, onboard quicker, and communicate better — all without writing a word.
