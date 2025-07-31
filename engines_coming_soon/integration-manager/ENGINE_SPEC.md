# 🧠 Engine Spec: Integration Manager

---

## 🎯 Purpose

The **Integration Manager** is the "switchboard" of PURAIFY — responsible for managing how user-built platforms connect to external services like Slack, Gmail, Notion, Trello, and more.

It handles all aspects of external platform connectivity:
- OAuth flows
- API key registration
- Scopes and permissions
- Platform schemas and capabilities
- Connection status and health monitoring

It does **not** execute actions or store tokens — it defines and manages the *how* of connecting.

---

## ⚙️ Core Responsibilities

| Action                     | Description                                                             |
|---------------------------|-------------------------------------------------------------------------|
| 🔑 Manage OAuth Flow       | Launch and handle external authorization processes                      |
| 🔐 Store Auth Metadata     | Client ID, scopes, auth method — but not tokens                         |
| 📋 Build Service Descriptors | Describe what each platform can do (actions, triggers, scopes)         |
| 🧪 Health Checks           | Monitor if connection is active, valid, and usable                      |
| 🔄 Sync with Vault Engine  | Pass issued tokens to Vault for secure storage                          |
| 🌐 Webhook Management      | Setup incoming/outgoing webhooks as part of integration                 |

## 🚫 What It Does NOT Do

- ❌ Does not store or encrypt access tokens → Vault Engine handles that  
- ❌ Does not execute any action → Execution Engine handles execution  
- ❌ Does not authorize actions → Engine Control handles policy enforcement  

## 🔗 Engine Integrations

| Engine            | Role                                                             |
|------------------|------------------------------------------------------------------|
| Vault Engine      | Receives tokens after successful auth                           |
| Execution Engine  | Pulls platform metadata (endpoints, scopes)                     |
| Platform Builder  | Displays available integrations for use                         |
| Validation Engine | Uses schema to verify integration structure                     |
| Feedback Loop     | Triggered when auth fails, expires, or needs renewal            |
| Knowledge Engine  | Registers available integration metadata globally               |

## 📥 Input Example — New Integration Setup

```json
{
  "user_id": "u_001",
  "project_id": "pf_321",
  "platform": "Slack",
  "auth_type": "OAuth",
  "client_id": "abc123",
  "client_secret": "xyz789",
  "scopes": ["chat:write", "users:read"]
}
```

## 📤 Output Example — Integration Status

```json
{
  "platform": "Slack",
  "status": "connected",
  "scopes": ["chat:write", "users:read"],
  "expires_in": 7200,
  "connected_at": "2025-07-25T10:00:00Z"
}
```

## 🧱 Internal Architecture

| Module                   | Description                                                                 |
|--------------------------|-----------------------------------------------------------------------------|
| Integration Registry     | Stores all supported platforms and their metadata                          |
| Auth Handler             | Manages OAuth, API Key, or custom setup                                     |
| Service Descriptor Builder | Generates capabilities: triggers, actions, required scopes                 |
| Health Checker           | Verifies if connection is active or expiring                                |
| Webhook Orchestrator     | Handles inbound and outbound webhook registration and flow                  |

## 🌐 External Dependencies

| Service         | Purpose                                                  |
|-----------------|----------------------------------------------------------|
| Slack, Gmail, etc. | External platforms to connect                          |
| OAuth Providers  | External auth via 3-legged flow                         |
| Webhook Targets  | Define and consume webhook events                        |
| Vault Engine     | Secure token storage                                     |
| Execution Engine | Needs integration metadata to execute valid actions     |

## 🔄 Data Flow

### 📥 Input

```json
{
  "user_id": "user_001",
  "platform": "Notion",
  "method": "oauth",
  "requested_scopes": ["databases:read", "pages:write"]
}
```

### Internal Process

- Lookup Notion metadata in Integration Registry  
- Redirect user to OAuth URL with appropriate params  
- On callback, extract token and send to Vault  
- Register integration in Knowledge Engine  
- Build and share descriptor with Execution Engine  

### 📤 Output

```json
{
  "platform": "Notion",
  "connected": true,
  "scopes": ["databases:read", "pages:write"],
  "token_valid": true
}
```

## 👥 User-Facing Scenarios

| Scenario                     | Behavior                                                   |
|------------------------------|------------------------------------------------------------|
| "Connect to Slack"           | Starts OAuth, shows scopes, saves to Vault                |
| "Connection expired"         | Suggest re-authentication via UI                          |
| "Send form to Google Sheets" | Execution Engine pulls valid actions from Integration Manager |
| "Receive webhook from Typeform" | Webhook setup handled internally                      |

## 💡 Design Considerations

- Supports both global credentials (PURAIFY-wide) and user-specific auth  
- Each platform uses a unified model: scopes, actions, auth method, health  
- Enables sandbox testing mode for integrations  
- Supports bidirectional events — trigger and response  

## 🧠 Summary

The Integration Manager is the connection layer between PURAIFY and the external world.  
It ensures users can link their platforms (Slack, Gmail, Notion, etc.) into their custom automations, while keeping authentication flows, platform descriptions, and connection health managed in a modular, scalable way.

Without this engine, PURAIFY would have no consistent way to understand, verify, or prepare external service connections.
