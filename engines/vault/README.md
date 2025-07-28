# Vault Engine

> This engine is part of the PURAIFY system. For full system overview, see the main [README.md](../../README.md)

## 🧠 Overview

The Vault Engine is the **secure credential store** within the PURAIFY ecosystem. Its role is to manage and provide access to **API keys, tokens, secrets, and credentials** needed by other engines (e.g., Execution Engine) to interact with external systems such as Slack, Notion, Gmail, Google Sheets, and more.

It functions as a centralized "secret manager", allowing engines to **query for credentials by service and project** in a secure and structured way.

The Vault Engine does not execute actions or orchestrate flows — it exists to **hold and serve sensitive authentication data** safely and efficiently.

---

## 📁 Engine Structure
```text
vault/
├── package.json
├── tsconfig.json
├── README.md
├── ENGINE_SPEC.md
├── codex-todo.md
└── src/
    └── index.ts
```
Tests for this engine live in `tests/vault/`.
## 🚀 Development Setup

Requires Node.js v20+.

```bash
npm ci
npm run dev
npm test
```

> Use `npm ci --prefer-offline` if installing without internet access.


- `src/index.ts` is the main Express entry point handling Vault routes.
- `package.json` lists dependencies and scripts (currently minimal).
- `README.md` (this file) documents Vault usage and API.
- `ENGINE_SPEC.md` is reserved for a detailed manual specification.

---

## 🧩 Role within the PURAIFY System

- **Stores credentials** per project and service.
- **Serves tokens on demand** to authorized internal engines (such as Execution).
- **Interfaces with Gateway** to accept token creation, deletion, and retrieval requests.
- Will later support encryption at rest, expiration policies, and user-based access control.

Example Flow:
1. During platform setup, the user provides a Slack token via the PURAIFY UI.
2. Gateway sends the token to the Vault Engine with project metadata.
3. Token is securely stored under `project:platform-a`, `service:slack`.
4. Later, when Execution Engine needs to send a Slack message, it requests the token from Vault by service+project.
5. Vault responds with the correct token (or error if missing).

---

## ⚙️ API Endpoints

### `POST /vault/store`

Stores a token for a specific service and project.

**Request Body**

```json
{
  "projectId": "platform-a",
  "service": "slack",
  "token": "xoxb-abc123xyz"
}
```

**Response**

```json
{
  "success": true
}
```

### `POST /vault/token` *(planned)*

```
POST /vault/token
```
Save a token for a specific service and project.

```json
{
  "project": "platform-a",
  "service": "slack",
  "token": "xoxb-abc123xyz"
}
```

```
GET /vault/token/:project/:service
```
Retrieve the token for a given service in a given project.

Response:
```json
{
  "token": "xoxb-abc123xyz"
}
```

```
DELETE /vault/token/:project/:service
```
Remove stored token.

This endpoint is **implemented** in `src/index.ts` and deletes the token entry if it exists.

---

## 🛠️ Internals & Responsibilities

- **Token Storage:** Stores credentials in memory (for MVP), later to be replaced with Redis or encrypted DB.
- **Keyed Access:** Tokens are indexed by `project + service` pairs.
- **Strict API Exposure:** Only internal engines or trusted gateway should access the Vault endpoints.
- **Pluggable Storage Backend:** Abstraction layer allows switching between in-memory, Redis, or cloud vaults (e.g., HashiCorp Vault, AWS Secrets Manager).
- **No User Auth at this stage:** Vault is assumed to be behind internal firewall; future versions may support scoped tokens and fine-grained permissions.

---

## 📦 Technologies

- Node.js (TypeScript)
- Express.js
- (Planned) Redis for secure token storage
- Optional: AES encryption on stored tokens

---

## 🚧 Development Notes

- For MVP: tokens are stored in memory using a simple in-app map object.
- Vault assumes secure, trusted internal access — no external exposure in MVP.
- The Vault will eventually support token expiration, rotation, and audit logging.

---

## 🧪 Example Use Cases

| Action               | Triggered By       | Description                                 |
|----------------------|--------------------|---------------------------------------------|
| `store_token`        | Gateway / UI       | User provides Slack token during setup      |
| `get_token`          | Execution Engine   | Needs Slack token to send message           |
| `delete_token`       | Gateway / Admin    | Token no longer needed or invalidated       |

---

## 🧭 Summary

The Vault Engine is the **trusted, centralized credential store** of PURAIFY.  
It plays a critical background role, enabling other engines to securely interact with third-party APIs without directly storing or managing credentials themselves.

Without Vault, PURAIFY would have no way to authenticate actions reliably or securely.

