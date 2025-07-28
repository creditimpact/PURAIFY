# 🧠 Engine Spec: Vault Engine (Token & Secrets Store)

---

## 📌 Purpose

The Vault Engine serves as a secure, centralized store for **tokens**, **API keys**, **OAuth credentials**, and other secrets — used by platforms built within PURAIFY.

Every platform created by a user (e.g., Slack automation, Notion sync) requires tokens for access. Vault is the encrypted layer that stores and retrieves those tokens securely — per project, environment, and integration.

---

## ⚙️ Core Responsibilities

| Action                  | Description |
|-------------------------|-------------|
| 🔐 Store Token          | Encrypt and persist access_token / refresh_token with metadata |
| 🔑 Retrieve Token       | Return decrypted token if requestor is authorized |
| 🔄 Auto Refresh Token   | If token is near expiry, perform a refresh flow in background |
| 📊 Log Usage            | Track access events, refreshes, failures (sent to Logs Engine) |
| 🧪 Validate Requestor   | All callers must authenticate via `engine_id` and access token |

---

## 🧱 What Vault Does *NOT* Do

- ❌ Does not perform the OAuth flow itself → handled by `Integration Manager`
- ❌ Does not authorize requestors → that’s `Engine Control Core`’s job
- ❌ Does not store user/business data → only secrets and credentials

---

## 🔐 API Endpoints

| Route                                 | Method | Purpose                         | Auth |
|---------------------------------------|--------|----------------------------------|------|
| `/vault/store`                        | POST   | Store a new token securely       | ✅ Requires engine auth |
| `/vault/token/:project/:platform`     | GET    | Retrieve valid token for usage   | ✅ Requires engine auth |
| `/vault/delete/:project/:platform`    | DELETE | Delete token & revoke access     | ✅ Requires engine auth |

---

## 🧪 Input Example (POST /vault/store)

```json
{
  "engine_id": "execution",
  "project_id": "pf_203",
  "platform": "Slack",
  "token_data": {
    "access_token": "xoxb-abc...",
    "refresh_token": "rt-xyz...",
    "expires_in": 3600,
    "scopes": ["chat:write", "users:read"]
  }
}
```

---

## 📤 Output Example (GET /vault/token)

```json
{
  "access_token": "xoxb-abc...",
  "valid_until": "2025-08-10T12:00:00Z",
  "scopes": ["chat:write", "users:read"]
}
```

---

## 🧠 Token Fetch Logic

```text
1. Engine requests token via GET /vault/token/:project/:platform
2. Vault verifies:
   - Engine identity + token via Engine Control Core
   - Token validity & expiry
   - Required scopes match
3. If all pass → return token
4. If token expired → trigger refresh using refresh_token (if available)
5. If failed → return error
```

---

## 🧩 Dependencies

| Depends On          | Purpose |
|---------------------|---------|
| Engine Control Core | Verifies engine identity and permissions |
| Integration Manager | Provides token after OAuth flow |
| Monitoring Engine   | Records every access or failure |
| Cleanup Engine      | Deletes stored secrets when platform is deleted |

---

## 🛠️ Internal Architecture

| Module             | Description |
|--------------------|-------------|
| `SecretStore`      | Encrypted database that stores all secrets/tokens |
| `TokenManager`     | Handles storage, retrieval, refresh logic |
| `AccessResolver`   | Checks if requestor has permission (via Engine Control) |
| `EncryptionLayer`  | AES-256 or Cloud KMS integration |
| `ScopedSecrets`    | Tokens stored per environment (dev/staging/prod) and platform |

---


## 🔄 Flow Summary

### Store Token Flow

- Receives request from Integration Manager or UI  
- Validates engine identity  
- Encrypts and stores token with environment scope  
- Responds with metadata (no token value)

### Fetch Token Flow

- Receives request from Execution Engine  
- Validates caller via Engine Control  
- If allowed → decrypts and returns token  
- If expired → refreshes and updates  
- Logs all events

---

## 🔐 Security Highlights

- All tokens encrypted at rest and in transit  
- Only pre-approved engines can access vault  
- Every action logged with timestamp and engine ID  
- Scoped secrets: environment + project + platform

---

## 🔗 Supported Platforms

Supports storing tokens for:

- Slack (OAuth)
- Notion (OAuth)
- Google Workspace
- Stripe (API Keys)
- Any 3rd party system via manual token entry

---

## 💬 Example Usage (Codex Perspective)

> "Execution Engine needs Slack token for project pf_203"  
→ Fetch: `GET /vault/token/pf_203/slack`  
→ If valid, returns token or refreshes it behind the scenes.

---

## 📌 Final Note

Vault Engine is the **heart of secure connectivity** in PURAIFY.  
Without it, no API calls can run — and no platforms can connect safely.
