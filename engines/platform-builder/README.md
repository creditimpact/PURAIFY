# Platform Builder Engine

**Status:** ✅ implemented (basic blueprint generation; advanced UI planned)

> This engine is part of the PURAIFY system. For full system overview, see the main [README.md](../../README.md)

## 🧠 Overview

The Platform Builder Engine is the **entry point** of PURAIFY’s creation process.  
Its role is to transform a user's high-level intent or description (e.g., "I want a form that sends an email") into a **structured, machine-readable blueprint** that defines how the system should behave.

This blueprint becomes the foundation for further validation, execution, and automation.

It is essentially the "compiler" for business logic — converting ideas into a formalized instruction set (JSON) that the rest of the platform can act on.

---

## 📁 Engine Structure

```text
platform-builder/
├── package.json
├── tsconfig.json
├── README.md
├── ENGINE_SPEC.md
├── codex-todo.md
└── src/
    └── index.ts
```
Tests for this engine live in `tests/` inside the Platform Builder folder.
## 🚀 Development Setup

Requires Node.js v20+.

```bash
npm ci
npm run dev
npm test
```

Copy `../../.env.example` to `.env` to configure `BUILDER_PORT` and service URLs.

> Use `npm ci --prefer-offline` if installing without internet access.

- `src/index.ts` is the planned Express entry point for blueprint generation.
- `package.json` defines dependencies and scripts.
- `tsconfig.json` contains TypeScript compiler settings.
- `README.md` (this file) describes the engine's purpose and API.
- `ENGINE_SPEC.md` contains the canonical specification for this engine and must remain in sync with the implemented code.

## 🧪 Local Prompt Runner

Test how the builder parses a prompt without running the server:

```bash
node run-prompt.ts "Build a task management system with a form, users, and Slack notifications"
```

This prints the detected platform type, referenced components, and the generated blueprint JSON.

---

## 🧩 Role within the PURAIFY System

- **Input:** Natural language or structured intent from the user (usually via the Gateway or Codux).
- **Output:** A structured `Blueprint` that defines the actions, triggers, data, services, and dependencies of a platform.
- **Connects to:** Gateway (input), Execution Engine (indirectly via blueprint), Validation Engine (for blueprint correctness, later on).

Example Flow:
1. User types: “I want a system that sends a Slack alert when someone submits a form.”
2. Gateway forwards this intent to Platform Builder.
3. Platform Builder returns a `Blueprint` JSON with:
   - trigger: `form_submitted`
   - action: `send_slack`
   - params: `{ channel: "#general" }`

---

## 📦 Example Blueprint Format

```json
{
  "project": "slack-alert-platform",
  "blueprint": {
    "platformType": "CRM Platform",
    "trigger": {
      "type": "form_submission",
      "fields": ["name", "email"]
    },
    "actions": [
      {
        "type": "send_slack",
        "params": {
          "channel": "#alerts",
          "message": "New form submitted: {{name}}, {{email}}"
        }
      }
    ]
  }
}
```

This blueprint can later be:
- **validated** (via Validation Engine)
- **executed** (via Execution Engine)
- **stored and reused** for similar projects

---

## ⚙️ API Endpoints

```
POST /builder/create
```

Input: High-level JSON instruction or prompt string

```json
{
  "prompt": "I want a system that emails me when a form is filled",
  "project": "lead-capture"
}
```

Output: Blueprint JSON

The response conforms to the `Blueprint` interface defined in `src/index.ts`.

```json
{
  "project": "lead-capture",
  "blueprint": {
    "platformType": "CRM Platform",
    "trigger": { "type": "form_submission" },
    "actions": [
      { "type": "send_email", "params": { "to": "you@example.com" } }
    ]
  }
}
```

---

## 🛠️ Internals & Responsibilities

- **Prompt Parsing / Understanding:** (Initially manual or stubbed, later powered by GPT or Codux)
- **Blueprint Generation:** Output a standardized JSON object with triggers and actions.
- **Knowledge Base Loading:** Uses `/platform-knowledge/` definitions for platform types and components.
- **Schema Validation:** (planned) ensure blueprint complies with global schema format.
- **Metadata Handling:** Tag each blueprint with project ID, timestamps, etc.

---

## 📦 Technologies

- Node.js (TypeScript)
- Express.js
- Zod or JSON Schema for blueprint validation (optional)
- (Planned) GPT-4 / Codux / AI models to assist in generation

---

## 🚧 Development Notes

- Prompt parsing supports simple Slack and HTTP commands.
  - `send slack #channel message` → `send_slack`
  - `http get https://example.com` → `http_request`
- Loads platform definitions from `/platform-knowledge/` for component and platform type recognition.
- Phrases are still split on `and`, `then`, or commas.
- Every generated blueprint is logged to the Monitoring & Logs Engine.
- In the future, builder will support:
  - 🛠 Multiple triggers and conditional flows
  - 🛠 Rich UI/UX generation hints
  - 🛠 Contextual clarification (e.g., "Which email address to send to?")

---

## 🧪 Example Use Cases

| Prompt | Blueprint Outcome |
|--------|-------------------|
| "Notify me in Slack when a user signs up" | `trigger: user_signup`, `action: send_slack` |
| "Save responses in Google Sheet" | `trigger: form_submit`, `action: create_google_sheet_row` |
| "Send email when checkbox is checked" | `trigger: checkbox_checked`, `action: send_email` |


## 🧩 Dependencies
Currently self-contained. Other engines consume the generated blueprints via Gateway.

## 🧪 Testing
Run `npm run test` inside `engines/platform-builder` or `npm test` from the repo root. Tests reside in `engines/platform-builder/tests/`.

---

## 🧭 Summary

The Platform Builder Engine is the **translator of ideas into logic**.  
It takes what the user *wants* and outputs what PURAIFY can *build and run*.

It defines the blueprint that **powers all subsequent engines**.

Without it, PURAIFY wouldn't know what to do — it's the brain that starts it all.
