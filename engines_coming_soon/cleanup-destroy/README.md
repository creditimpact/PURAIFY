# Cleanup / Destroy Engine

> This engine is part of the PURAIFY system. For full system overview, see the main [README.md](../../README.md)

## 🧠 Overview

The Cleanup / Destroy Engine is PURAIFY’s **secure deletion and teardown engine**.  
It is responsible for safely and reliably removing platforms, environments, integrations, tokens, and runtime processes — with no residual access, orphaned credentials, or unintended exposure.

It offers structured cleanup operations, delayed deletion with undo support, and protection mechanisms like double confirmation and audit logging.

This engine helps ensure that PURAIFY remains **clean, secure, and compliant**, especially in environments with many active automations or sensitive third-party connections.

---

## 📁 Engine Structure

```text
cleanup/
├── package.json
├── tsconfig.json
├── README.md
├── ENGINE_SPEC.md
├── codex-todo.md
└── src/
    ├── index.ts
    ├── orchestrator.ts
    ├── integrationReleaser.ts
    ├── environmentSweeper.ts
    ├── vaultCleaner.ts
    ├── graceManager.ts
    └── auditTrail.ts
```

Tests live under `engines/cleanup/tests/`.

---

## 🚀 Development Setup

Requires Node.js v20+.

```bash
npm ci
npm run dev
npm test
```

Use the shared `.env` (`../../.env.example`) to configure `CLEANUP_PORT` and internal service URLs.

Use `npm ci --prefer-offline` if installing without internet access.

---

## 🧩 Role within the PURAIFY System

- **Input**: Receives deletion instructions from UI, Gateway, or Cron jobs.  
- **Output**: Performs cascade teardown of tokens, environments, and integrations.  
- **Dependency**: Coordinates with Vault Engine, Execution Engine, and others for full removal.  
- **Undo Option**: Stores grace-period deletion state for recovery.  

### Example Flow

1. User clicks "Delete Project"  
2. Gateway sends request to Cleanup Engine  
3. Cleanup Engine:
   - Validates via Engine Control  
   - Halts any executions  
   - Revokes secrets and disconnects integrations  
   - Triggers grace period window  
   - Audit + feedback sent to Monitoring / Feedback Engine  

---

## ⚙️ API Endpoints

### `POST /cleanup/project`

Triggers deletion process for a project. Can support immediate or delayed deletion.

**Request Example:**

```json
{
  "user_id": "user_999",
  "project_id": "pf_234",
  "action": "delete_project",
  "delete_integrations": true,
  "grace_period": true
}
```

**Response:**

```json
{
  "status": "deletion_pending",
  "deleted_at": "2025-07-25T20:12:00Z",
  "undo_available_until": "2025-07-27T20:12:00Z"
}
```

---

## 🛠️ Internals & Responsibilities

- **Deletion Orchestrator**: Runs full teardown sequence by dependency order.  
- **Integration Releaser**: Disconnects OAuth, APIs, Webhooks.  
- **Vault Cleaner**: Revokes and deletes tokens/secrets from Vault Engine.  
- **Environment Sweeper**: Removes temporary and active environments.  
- **Grace Manager**: Manages undo window and delayed execution.  
- **Audit Logger**: Emits deletion records to monitoring engine.  

---

## 📦 Technologies

- Node.js (TypeScript)  
- Express.js  
- Axios (for cross-engine calls)  
- AES encryption (optional for deletion audit)  
- JSON file or Redis-based grace queue (planned)  

---

## 🚧 Development Notes

- Grace periods default to 48h unless configured.  
- All deletion actions are routed through Engine Control.  
- Logs include user ID, timestamp, and deletion scope.  
- Residual checks will validate deletion completeness (optional phase).  
- OTP or confirmation phrases required in user-initiated flows.  

---

## 🧪 Example Use Cases

| Scenario              | Outcome                                          |
|-----------------------|--------------------------------------------------|
| Delete platform       | Blueprint + secrets + envs + logs are wiped     |
| Disconnect Slack      | OAuth revoked + token removed from Vault        |
| Clean preview         | Environments older than 7 days are destroyed    |
| Undo project delete   | Within grace period, project is recovered       |

---

## 🧩 Dependencies

| Engine               | Purpose                                           |
|----------------------|---------------------------------------------------|
| Vault Engine         | Deletes credentials tied to project               |
| Execution Engine     | Cancels active flows, disables scheduled tasks    |
| Integration Manager  | Revokes OAuth tokens, API endpoints               |
| Feedback Engine      | Sends user confirmation and undo link             |
| Environment Manager  | Removes dev/staging/preview environments          |
| Monitoring Engine    | Logs the deletion lifecycle                       |

---

## 🧪 Testing

Run:

```bash
npm run test
```

Tests live in `engines/cleanup/tests/` and validate:

- Safe teardown flows  
- Token revocation  
- Grace period tracking  
- Residual scan (optional)  

---

## 🧭 Summary

The Cleanup / Destroy Engine ensures that when something ends in PURAIFY — it ends cleanly, completely, and safely.  
No secrets left behind. No permissions lingering. No guesswork.

It turns teardown into a well-defined, auditable, and recoverable process — protecting both users and the system itself.
