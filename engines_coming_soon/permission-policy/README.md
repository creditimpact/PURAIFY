# 🧠 Permission & Policy Engine

> This engine is part of the PURAIFY system. For full system overview, see the main `README.md`.

---

## 🧠 Overview

The **Permission & Policy Engine** governs access, actions, and control within user-created platforms in PURAIFY.

Its main job is to ensure that only the **right users** can perform the **right actions**, at the **right time** and under the **right conditions**.  
It supports **RBAC** (Role-Based Access Control) and **ABAC** (Attribute-Based Access Control) to enforce structured and dynamic permission models.

It is the rules engine and gatekeeper that safeguards every platform from unauthorized, unsafe, or unexpected behavior.

---

## 📁 Engine Structure

```text
permission-policy/
├── package.json
├── tsconfig.json
├── README.md
├── ENGINE_SPEC.md
├── codex-todo.md
└── src/
    ├── index.ts
    ├── roles.ts
    ├── rules.ts
    ├── evaluator.ts
    └── access-decision.ts
```

> Tests for this engine live in `permission-policy/tests/`.

---

## 🚀 Development Setup

Requires **Node.js v20+**

```bash
npm ci
npm run dev
npm test
```

- Use the shared `.env` file (`../../.env.example`) to configure `PERMISSION_PORT` and related internal engine URLs.
- Use `npm ci --prefer-offline` if installing without internet access.

---

## 🧩 Role within the PURAIFY System

**Input:** Access checks from Execution Engine, Gateway, or other engines  
**Output:** A real-time decision (`allowed: true/false`) and reasoning  
**Connects to:** Execution Engine, Vault Engine, Platform Builder, Engine Control

### 🔄 Example Flow

1. User attempts to delete a database via the platform UI  
2. Gateway forwards the request to Permission Engine  
3. Permission Engine checks:
   - user’s role in the project
   - time of day, environment, policy conditions  
4. Returns a response:  
   - `allowed: false`, with reason and alternatives

---

## ⚙️ API Endpoints

### `POST /permission/check`

#### 📥 Input

```json
{
  "user_id": "user_777",
  "project_id": "pf_123",
  "action": "deploy",
  "env": "production",
  "context": {
    "role": "editor",
    "time": "23:17",
    "location": "IL"
  }
}
```

#### 📤 Response

```json
{
  "allowed": false,
  "reason": "Editors cannot deploy to production",
  "required_permission": "admin"
}
```

---

## 🛠️ Internals & Responsibilities

- **Role Resolution** – Maps users to roles (admin, editor, viewer, etc.)
- **Policy Evaluation** – Applies permission rules, static or dynamic
- **Context-Aware Decisions** – Time, IP, environment, 2FA, etc.
- **Rule Overrides** – Allows edge-case logic (e.g., allow deploy only with OTP)
- **Decision Logging** – *(Planned)* Every check is auditable and traceable

---

## 📦 Technologies

- Node.js (TypeScript)
- Express.js
- Zod (for request validation)
- AES-256 (optional encryption of sensitive rules)
- *(Planned)* Redis for caching user-role mappings

---

## 🧪 Example Use Cases

| Scenario                           | Decision Outcome |
|------------------------------------|------------------|
| Admin attempts to delete DB at night | ✅ Allowed        |
| Editor tries to deploy to production | ❌ Blocked        |
| Viewer tries to edit schema         | ❌ Blocked        |
| Client user attempts export         | ✅ If allowed by rule |

---

## 🧩 Dependencies

| Engine            | Purpose                                           |
|------------------|---------------------------------------------------|
| Execution Engine | Confirms permission before acting                |
| Vault Engine     | Prevents access to tokens if not allowed         |
| Platform Builder | Pre-configures role mappings                     |
| Engine Control   | Logs and governs global authorization            |
| Feedback Engine  | Alerts user or requests escalation if denied     |

---

## 📐 Policy Definition Examples

### Example 1: “Only Admins can deploy to production”

```json
{
  "role": "admin",
  "action": "deploy",
  "env": "production"
}
```

### Example 2: “Block all destructive actions at night”

```json
{
  "time": { "after": "22:00" },
  "action": ["delete", "drop", "wipe"],
  "allowed": false
}
```

---

## 🧭 Summary

The **Permission & Policy Engine** is the **guardian of access** in PURAIFY.

It ensures that every user action is:

- ✅ **Authorized**  
- ⏱️ **Contextually valid**  
- 📜 **Policy-compliant**

It enforces **order and control** inside platforms — without requiring users to write a single rule themselves.

> Without this engine, platforms would be insecure by default.  
> With it, PURAIFY becomes **safe by design**.
