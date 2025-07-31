# 🧠 Engine Spec: Engine Control Core

---

## Overview

The **Engine Control Core** is the **policy and permissions gatekeeper** of the PURAIFY system.  
It ensures that no action is performed without proper authorization, platform availability, and compliance with defined policies and feature flags.

> It does **not perform actions** — it **controls who can**.

Every request from an internal engine — whether it's building, executing, deleting, or syncing — passes through **Engine Control** for real-time validation and regulation.

---

## 📁 Engine Structure

```text
engine-control/
├── package.json
├── tsconfig.json
├── README.md
├── ENGINE_SPEC.md
├── src/
│   ├── index.ts
│   ├── engine-registry.ts
│   ├── permissions.ts
│   ├── feature-flags.ts
│   ├── platform-status.ts
│   └── logs.ts
└── tests/
    └── control.test.ts
```

---

## 🚀 Development Setup

Requires Node.js v20+.

```bash
npm ci
npm run dev
npm test
```

Use the root `.env` (or copy `../../.env.example`) and configure `ENGINE_CONTROL_PORT` and optional feature toggles.

For offline installation:

```bash
npm ci --prefer-offline
```

---

## 🧩 Role within the PURAIFY System

- **Receives**: Permission requests from any engine  
- **Validates**: Action is permitted for engine, user, and platform  
- **Evaluates**: Platform status, scopes, flags, and rate limits  
- **Responds**: Approval or denial + reason  
- **Logs**: Every attempt and decision  

### 🔁 Example Flow

Execution Engine wants to send a Slack message:

1. Sends request: `send_message` on `Slack`  
2. Engine Control:  
   - Checks if `execution_engine` is authorized  
   - Confirms Slack is not in maintenance  
   - Logs request  
   - Approves or blocks based on rules  
   - Returns structured result  

---

## ⚙️ API Endpoints

### `POST /engine-control/check`

Receives a permission check request from another engine.

#### ✅ Request:

```json
{
  "engine_id": "execution_engine",
  "platform": "Slack",
  "requested_action": "send_message",
  "user_id": "user_123"
}
```

#### ✅ Response (allowed):

```json
{
  "action_allowed": true,
  "platform_status": "active",
  "scopes_required": ["chat.write"]
}
```

#### ❌ Response (blocked):

```json
{
  "action_allowed": false,
  "reason": "Slack API currently down",
  "platform_status": "maintenance"
}
```

---

## 🛠️ Internals & Responsibilities

| File                | Responsibility                                                           |
|---------------------|---------------------------------------------------------------------------|
| `engine-registry.ts` | Defines registered engines, scopes, and allowed actions                 |
| `permissions.ts`     | Core permission engine that checks action rules                         |
| `feature-flags.ts`   | Determines if a feature is enabled for the requester                    |
| `platform-status.ts` | Integrates with platform availability tracker (Slack, Gmail, etc.)      |
| `logs.ts`            | Sends structured logs to Logs Engine                                    |

---

## 📦 Technologies

- Node.js (TypeScript)  
- Express.js  
- In-memory and file-based registry (for now)  
- Planned Redis cache for rate limits  
- AES verification for engine tokens  

---

## 🚧 Development Notes

- Every engine must authenticate with a signed `engine_token`  
- All checks are deny-by-default unless explicitly approved  
- Feature flags can be scoped per user, project, version, or date  
- Supports maintenance overrides (e.g., block all Slack actions for 1 hour)  
- Logs include engine ID, user ID, action, platform, timestamp, and result  

---

## 🧪 Example Scenarios

| Scenario                         | Behavior                        |
|----------------------------------|----------------------------------|
| Slack API is down                | All Slack actions are blocked    |
| `execution_engine` not authorized for Gmail | Action denied          |
| Beta feature not enabled for user | Action blocked (flag off)        |
| Load is too high                 | Action deferred or rate-limited |
| Feature allowed only after date  | Action delayed until enabled    |

---

## 🧩 Dependencies

### Queried by:

- Execution Engine  
- Vault Engine  
- Platform Builder  
- Cleanup Engine  
- Monitoring Engine (for logging decisions)

### Integrates with (but does not call directly):

- Feature Flags Service  
- Platform Status Service  
- Logs Engine  

---

## 🧪 Testing

Run tests locally via:

```bash
npm run test
```

Tests cover:

- Authorization logic  
- Flag evaluation  
- Platform status handling  
- Input validation  

---

## 🧭 Summary

The **Engine Control Core** is the **rule enforcer** of the PURAIFY platform.  
It doesn’t build, validate, or run — **it controls who can**.

> No engine proceeds without its green light.  
> It’s the invisible shield that turns a flexible automation system into a safe, compliant, and scalable one.

**Without Engine Control, there is chaos.**  
**With Engine Control — there is confidence.**
