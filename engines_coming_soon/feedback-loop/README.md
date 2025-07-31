# Feedback Loop Engine

> This engine is part of the PURAIFY system. For full system overview, see the main [README.md](../../README.md)

## 🧠 Overview

The **Feedback Loop Engine** is the *conversational checkpoint* inside PURAIFY’s automation system.

Its core mission is to provide **user oversight** before executing sensitive or high-risk actions.  
It intercepts operations, asks for approval, suggests corrections, and ensures that the user stays **informed and in control**.

This engine prevents the platform from “running wild” by requiring confirmation for:
- Risky or destructive actions
- AI-generated suggestions or logic changes
- Missing configurations or unknown states

It’s not just a blocker — it’s a collaborative layer between user and automation.

---

## 📁 Engine Structure

```text
feedback-loop/
├── package.json
├── tsconfig.json
├── README.md
├── ENGINE_SPEC.md
├── codex-todo.md
└── src/
    ├── index.ts
    ├── dispatcher.ts
    ├── interceptors/
    │   └── action-interceptor.ts
    ├── suggestions/
    │   └── suggestor.ts
    └── tracker.ts
```

Tests for this engine live in `tests/` inside the `feedback-loop` folder.

---

## 🚀 Development Setup

Requires Node.js v20+.

```bash
npm ci
npm run dev
npm test
```

Use the shared `.env` file (`../../.env.example`) to configure `FEEDBACK_PORT` and related service URLs.

Use `npm ci --prefer-offline` if installing without internet access.

---

## 🧩 Role within the PURAIFY System

- **Input**: Action from Platform Builder, Execution Engine, or Validation Engine  
- **Output**: Decision: approve, reject, suggest change, or pause  
- **Connects to**: UI Prompt Layer, AI Suggestion Layer, Logs Engine, Execution Engine

### Example Flow

1. Execution Engine wants to delete user data  
2. Feedback Engine intercepts → sends approval prompt to UI  
3. User responds: “Create backup first”  
4. Feedback stores response and returns instruction  
5. Execution Engine proceeds accordingly  

---

## ⚙️ API Endpoints (MVP Scope)

### POST `/feedback/request`  
Trigger a user-facing approval or suggestion.

**Request:**

```json
{
  "user_id": "u_123",
  "project_id": "pf_456",
  "type": "action_approval",
  "reason": "This action will delete all records",
  "action": "delete_all_records",
  "default": "paused"
}
```

**Response (example):**

```json
{
  "status": "approved",
  "user_id": "u_123",
  "timestamp": "2025-07-25T15:30:00Z",
  "remember_decision": true
}
```

---

## 🧪 Use Cases

| Scenario                     | Prompt Result              |
|------------------------------|----------------------------|
| Mass email to 500 users      | Requires confirmation      |
| Deleting integration tokens  | “Want to back them up?”    |
| User creates infinite loop   | “Detected recursion. Proceed?” |
| AI generates risky flow      | “Review before applying?”  |

---

## 🛠️ Internals & Responsibilities

- **Action Interceptor**: Pauses execution and triggers prompts  
- **Suggestion Engine**: Offers possible corrections or completions  
- **User Prompt Dispatcher**: Sends prompts via UI, Slack, or Email  
- **Resolution Tracker**: Stores decisions for future automation  
- **Adaptive Learning Core**: Learns user patterns to reduce over-prompting  

---

## 📦 Technologies

- Node.js (TypeScript)  
- Express.js  
- In-memory decision cache (planned Redis)  
- Optional webhook dispatchers for Slack/email  

---

## 🚧 Development Notes

- Prompts can be routed to internal UI or external notification systems  
- Supports “pending queue” — execution is blocked until user responds  

**Future additions:**
- Two-factor approvals  
- Approval expiration windows  
- Smart filtering of low-risk prompts  

---

## 🧪 Testing

Run:

```bash
npm run test
```

inside `engines/feedback-loop`  
or run `npm test` from the root.

All prompts, decisions, and test inputs are simulated via mock interceptors.

---

## 🧭 Summary

The Feedback Loop Engine is the user’s voice in the automation loop.  
It ensures safety, context, and confidence — turning PURAIFY into a collaborative automation system that doesn’t act blindly.

It’s not just about stopping mistakes — it’s about giving users the power to say:  
✅ “Yes, proceed” | ❌ “No, wait” | 💡 “Here’s a better way”.
