# Project Composer Engine

> This engine is part of the PURAIFY system. For full system overview, see the main [README.md](../../README.md)

---

## 🧠 Overview

The **Project Composer Engine** is the intelligent completion engine of PURAIFY.  
It analyzes partially built platforms and helps users fill in the gaps — suggesting missing components, logic, integrations, and best-practice structures.

It does **not** run or validate anything — it composes a full picture based on what already exists.

This engine powers the “Build With Me” experience — letting users go from “half built” to “ready to launch” in minutes.

---

## 📁 Engine Structure

```text
project-composer/
├── package.json
├── tsconfig.json
├── README.md
├── ENGINE_SPEC.md
├── codex-todo.md
├── src/
│   ├── index.ts
│   ├── detectors/
│   └── templates/
└── tests/
    └── composer.test.ts
```

Tests for this engine live in `project-composer/tests/`.

### 🚀 Development Setup

Requires Node.js v20+.

```bash
npm ci
npm run dev
npm test
```

Use the shared `.env` file (`../../.env.example`) to configure `COMPOSER_PORT` and related URLs.

Use `npm ci --prefer-offline` if installing without internet access.

---

## 🧩 Role within the PURAIFY System

- **Input**: Partial or in-progress platform blueprint  
- **Output**: Smart completion suggestions — logic, structure, integrations  
- **Triggered by**: Gateway, Codux, or user action  
- **Relies on**: Knowledge Engine (platform state), Validation Engine (to verify), Feedback Loop (for user confirmation)

### Example Flow:

1. User builds: form + logic, but forgets an action  
2. Gateway → sends partial state to Project Composer  
3. Composer returns:
   - `missing_components`
   - `recommended_actions`
   - `proposed templates`
4. Platform Builder asks the user: “Add these?”  
5. User approves → platform is completed and ready to run  

---

## ⚙️ API Endpoint

```bash
POST /composer/complete
```

**Input**: Partial platform structure with goal and known integrations

```json
{
  "project_id": "pf_1001",
  "platform_goal": "CRM for leads",
  "existing_parts": {
    "forms": ["leadForm"],
    "logic": [{ "trigger": "form_submit" }]
  },
  "integrations": ["Slack"]
}
```

**Output**: Draft completion suggestions

```json
{
  "missing_components": ["User Auth", "Admin Panel"],
  "suggested_flows": [
    "On form_submit → notify Slack",
    "On form_submit → append to Google Sheet"
  ],
  "recommended_integrations": ["Airtable"],
  "component_templates": {
    "auth": "JWT with scopes",
    "api": ["getLeads", "addNote"]
  },
  "status": "draft_complete"
}
```

---

## 🛠️ Internals & Responsibilities

- **Gap Detection**: Finds missing logic, components, and configs  
- **Flow Suggestion**: Based on known best practices  
- **Template Matching**: UI/API/snippets returned per context  
- **Scaffold Composition**: Connects incomplete pieces into a viable structure  
- **Environment Awareness**: Output may vary by dev/staging/prod  

---

## 📦 Technologies

- Node.js (TypeScript)  
- Express.js  
- GPT (via Codux or AI Layer)  
- Internal template libraries  
- Optional: Zod / JSON Schema (for future structure validation)  

---

## 🚧 Development Notes

- `GapDetector` module scans blueprint JSON for common holes  
- Uses GPT to recommend best-practice logic when `platform_goal` is known  
- Will integrate with Platform Builder to visualize completions  
- Draft mode only — changes applied only after user confirms via UI  

---

## 🧪 Example Use Cases

| Scenario                    | Outcome                                     |
|----------------------------|---------------------------------------------|
| User builds only forms     | Composer adds missing actions (submit logic) |
| Trigger exists, no target  | Suggests actions: send_email, add_row       |
| Project goal = “LMS”       | Proposes enrollments, certificates, dashboards |
| User connects Stripe       | Composer adds “on payment” flows            |

---

## 🧩 Dependencies

This engine connects with:

- **Knowledge Engine** – for current state of platform  
- **Platform Builder** – for visualizing and applying completions  
- **Validation Engine** – to confirm structure integrity  
- **Vault / Integration Manager** – when suggesting new integrations  
- **Feedback Loop Engine** – for asking the user: “Apply this?”

---

## 🧭 Summary

The Project Composer Engine brings unfinished platforms to life.  

It looks at what the user already built — and offers what they likely forgot.  

It completes the blueprint, scaffolds smart defaults, and ensures every platform is deployable, connected, and production-worthy.  

It’s not just a helper.  
It’s a **composer**.
