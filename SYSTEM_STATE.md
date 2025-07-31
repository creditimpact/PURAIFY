# PURAIFY — Live System State

This file documents the current **real-time** state of the PURAIFY platform.
As of now, most engines only contain scaffold code. The Vault Engine persists tokens to `tokens.json` (location overridable via `VAULT_DATA_FILE`) and exposes working token CRUD routes with AES-256 encryption when `VAULT_SECRET` is set.
---

## 🧱 System Build Status

| Component           | Description                                  | Status       | Entry File (Planned)              |
|---------------------|----------------------------------------------|--------------|-----------------------------------|
| Platform Builder    | Converts user prompts into structured blueprints | 🟢 In Progress | `engines/platform-builder/src/index.ts` |
| Vault Engine        | Stores and retrieves tokens per service/project | 🟢 In Progress | `engines/vault/src/index.ts`      |
| Execution Engine    | Executes actions defined in blueprint JSON     | 🟢 In Progress | `engines/execution/src/index.ts`  |
| Gateway             | API entry point and engine orchestrator        | 🟢 In Progress | `gateway/src/index.ts`            |
| Validation Engine   | Validates blueprints before execution          | 🟡 Planned     | `engines/validation/` (TBD)       |
| Logs Engine         | Tracks activity and runs (future)              | 🔲 Not Started | `engines/logs/` (TBD)             |

---

## 📂 Folder & Documentation Setup

✅ As of now, all engines have:
- Their folder structures initialized
- A dedicated `README.md` file with functional specification
- A placeholder `ENGINE_SPEC.md` for manual specs
- Listed entry point placeholders (`index.ts`)
- System-level README and Contribution Protocols written

> No active server, route, or logic has been coded yet.

---

## 🌐 Active APIs

| Engine            | APIs            | Status       |
|-------------------|------------------|--------------|
| Platform Builder  | `POST /builder/create` | 🟢 In Progress |
| Vault Engine      | `POST /vault/store`, `POST /vault/token`, `GET /vault/token/:project/:service`, `DELETE /vault/token/:project/:service`, `GET /vault/tokens/:project`, `DELETE /vault/tokens/:project`, `GET /vault/projects` | 🟢 In Progress |
| Execution Engine  | `POST /execute` | 🟢 In Progress |
| Gateway           | `POST /gateway/build-platform`, `POST /gateway/execute-action`, `POST /gateway/store-token`, `POST /gateway/run-blueprint` | 🟢 In Progress |

---

## 🔌 External Integrations

| Integration    | Status     | Notes |
|----------------|------------|-------|
| Slack          | 🟢 Basic   | `send_slack` posts via Slack API |
| Notion         | 🔲 Not Yet | Planned |
| Google Sheets  | 🔲 Not Yet | Planned |
| Email (SMTP)   | 🔲 Not Yet | Planned |

---

## 🚧 Immediate Next Steps

- [x] Implemented `POST /vault/store` endpoint for Vault Engine
- [x] Add `GET /vault/token/:project/:service` endpoint
- [x] Added `POST /vault/token` endpoint for simplified storage
- [x] Begin Gateway skeleton with routing between engines
- [x] Define actual blueprint structure for Platform Builder (initial interface implemented)
- [x] Add internal dev/test setup (e.g., nodemon, tsconfig)
- [x] Added `docker-compose.yml` to run all engines together
- [x] Node built-in test runner configured across engines

---
## 🔄 Next Integration Steps

- Each engine must fetch its own tokens from Vault as needed via endpoints like `GET /vault/token/:project/:service`.
- Gateway only orchestrates flow and stores new credentials; it does not fetch tokens for other engines.


## 🧠 Codex Notes Map
engines/vault/src/index.ts:
  Note: ✅ GET, POST and DELETE endpoints implemented with encrypted token persistence to `tokens.json` when `VAULT_SECRET` is set. Added listing endpoints `/vault/tokens/:project` and `/vault/projects`.
engines/platform-builder/src/index.ts:
  Note: ✅ Basic server with validation; parser supports "and", "then", comma lists
engines/execution/src/index.ts:
  Note: ✅ send_slack now calls Slack API via fetch; token fetched from Vault and 404 when missing
engines/execution/src/actions.ts:
  Note: ✅ Action handlers split into separate module for isolation
gateway/src/index.ts:
  Note: ✅ Gateway routing implemented; run-blueprint now continues after failures
integration-design:
  Note: ✅ Each engine fetches its own tokens from Vault during action execution; Gateway only routes calls and stores credentials.
root-level:
  Note: ENGINE_DEPENDENCIES.md, NAMESPACE_MAP.md and codex-todo.md added for cross-engine tracking. Engine-level codex-todo format expected.
  and human-todo.md added for manual environment tasks

---

## 🧭 Summary

The PURAIFY project is in the **early development phase**, with initial endpoints implemented for each engine.
The next step is to expand features, add validation, and integrate across engines.
Documentation updated for engine dependencies and namespace mapping to reflect current implementation.

---

Last updated: July 29, 2025
