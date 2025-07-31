# Integration Manager

> This engine is part of the PURAIFY system. For full system overview, see the main [README.md](../../README.md)

## 🧠 Overview

The **Integration Manager** is PURAIFY's internal bridge to the outside world.  
Its purpose is to manage, configure, and describe all external platform connections that user-built platforms may rely on — including Slack, Notion, Gmail, Google Sheets, and more.

It handles:
- Authentication flows (OAuth, API Key, etc.)
- Connection metadata
- Action and scope descriptions
- Webhook registration and management
- Connection status and health

> It does *not* store tokens — only manages how tokens are obtained and what capabilities they unlock.

---

## 📁 Engine Structure

```text
integration-manager/
├── package.json
├── tsconfig.json
├── README.md
├── ENGINE_SPEC.md
├── codex-todo.md
└── src/
    ├── index.ts
    ├── registry/
    ├── handlers/
    ├── descriptors/
    └── health/
```

Tests for this engine live in `tests/` inside the `integration-manager` folder.

### 🚀 Development Setup

Requires Node.js v20+.

```bash
npm ci
npm run dev
npm test
```

Use the shared `.env` file (`../../.env.example`) to configure `INTEGRATION_PORT` and related URLs.

Use `npm ci --prefer-offline` if installing without internet access.

- `src/index.ts` – Express entry point  
- `registry/` – Holds definitions for supported platforms  
- `handlers/` – Manages OAuth/API Key flows  
- `descriptors/` – Builds and exports platform schemas (scopes, actions)  
- `health/` – Validates active connections and availability  

---

## 🧩 Role within the PURAIFY System

**Input:** Requests to initiate or validate connections to external platforms  
**Output:** Status reports, schema metadata, and updated integration state

**Connects to:**
- **Vault Engine** — for token storage  
- **Execution Engine** — consumes platform capabilities  
- **Platform Builder** — to list available integrations  
- **Feedback Loop** — for error handling and reconnect prompts  

### Example Flow:
1. User clicks “Connect to Slack” from platform UI  
2. Integration Manager launches OAuth flow  
3. After auth success, token is stored via Vault  
4. Integration metadata is published to Execution + Knowledge Engines  
5. Feedback loop is updated with success or failure  

---

## ⚙️ API Endpoints (Planned)

### `POST /integrations/connect`

Initiates a connection setup (OAuth or API Key).  
Expects platform name, method, scopes, and metadata.

```json
{
  "user_id": "u_001",
  "platform": "Slack",
  "auth_type": "OAuth",
  "client_id": "abc",
  "client_secret": "xyz",
  "scopes": ["chat:write"]
}
```

---

### `GET /integrations/status/:project/:platform`

Returns current connection status and scopes for a specific platform.

```json
{
  "platform": "Slack",
  "status": "connected",
  "scopes": ["chat:write", "users:read"],
  "expires_in": 7200
}
```

---

### `GET /integrations/available`

Returns list of supported external platforms and their connection types, required scopes, etc.

```json
[
  {
    "platform": "Notion",
    "auth_method": "OAuth",
    "scopes_required": ["pages:write", "databases:read"]
  }
]
```

---

### `POST /integrations/refresh/:project/:platform`

Triggers a token refresh or reconnection attempt for an expiring/invalid platform integration.

---

## 🛠️ Internals & Responsibilities

- **OAuth Flow Management:** Launch, callback, and exchange logic for tokens  
- **Descriptor Generation:** Defines each platform's available actions, triggers, and auth model  
- **Webhook Setup:** Creates/validates incoming and outgoing webhooks per integration  
- **Vault Sync:** Securely hands off issued tokens to the Vault Engine  
- **Health Checks:** Actively checks if connection is working and not expired  

---

## 📦 Technologies

- Node.js (TypeScript)  
- Express.js  
- Axios  
- OAuth2 / REST integration clients  
- Vault integration via REST  
- (Planned) Redis for connection caching  

---

## 🧪 Example Use Cases

| Scenario                    | Outcome                                             |
|-----------------------------|-----------------------------------------------------|
| “Connect to Gmail”          | Starts OAuth flow, saves token via Vault            |
| “My Slack connection expired” | Returns status: invalid, triggers feedback        |
| “What can Notion do?”       | Returns available actions, scopes, triggers         |
| “Receive form from Typeform” | Webhook setup and verification triggered           |

---

## 🧩 Dependencies

- **Vault Engine:** stores actual access tokens  
- **Feedback Engine:** notifies user on failures  
- **Execution Engine:** consumes platform schemas  
- **Knowledge Engine:** registers new available integrations  

---

## 🧭 Summary

The **Integration Manager** is the control tower for external service connectivity.  
It doesn’t run actions or store tokens, but it defines the rules of connection and enables the rest of the system to securely interact with third-party platforms.

Without this engine, PURAIFY wouldn't know what platforms exist, how to connect to them, or what they're capable of.
