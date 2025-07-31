# 🧠 Engine Spec: Engine Control Core

## 🎯 Purpose

The Engine Control Core serves as the regulatory and coordination center for all other PURAIFY engines.  
It doesn’t perform actions itself — but no engine is allowed to act without its approval.

It enforces permissions, policies, platform availability, and feature flags before any action is allowed.  
Think of it as the "Traffic Cop" of PURAIFY — ensuring safe, rule-based automation at scale.

---

## ⚙️ Core Responsibilities

| Domain                 | Description                                                                 |
|------------------------|-----------------------------------------------------------------------------|
| ✅ Permission Control   | Validates if a given engine is allowed to perform an action on a given platform |
| ⛔ Action Blocking      | Blocks illegal, unregistered, or sensitive actions based on policy         |
| 🕹️ Engine Registration  | Each engine must register with ID, allowed scopes, and platforms            |
| 📊 Audit Trail Logging | Logs every request with engine, action, outcome, and timestamp             |
| 🧰 Feature Flag Dispatch| Enables/disables features per user/version/condition                      |
| 🛡️ Load Management     | Defers or throttles actions during high load                               |
| 🔁 Platform Availability| Prevents actions on temporarily disabled platforms (e.g., Slack outage)    |

---

## 🚫 What It Does NOT Do

- ❌ Does not execute actions (Execution Engine handles that)  
- ❌ Does not store business data  
- ❌ Does not validate blueprint structure (Validation Engine handles that)

---

## 🔗 Engine Integrations

| Engine             | Usage                                                             |
|--------------------|-------------------------------------------------------------------|
| Execution Engine   | Must get approval before executing any action                     |
| Vault Engine       | Checks access rights before revealing sensitive tokens            |
| Cleanup Engine     | Permissioned deletions, policy checks                             |
| Platform Builder   | Controls which engines can initiate platform creation             |
| Monitoring Engine  | Receives decision logs, flags, and policy violation reports       |

---

## 📥 Input Example – Permission Request

```json
{
  "engine_id": "execution_engine",
  "platform": "Slack",
  "requested_action": "send_message",
  "user_id": "user_8743"
}
```

## 📤 Output Example – Approval

```json
{
  "action_allowed": true,
  "scopes_required": ["chat.write"],
  "platform_status": "active",
  "rate_limit_remaining": 78
}
```

## 📤 Output Example – Rejection

```json
{
  "action_allowed": false,
  "reason": "Slack API currently disabled",
  "platform_status": "maintenance"
}
```

---

## 🧱 Internal Architecture

| Module                 | Description                                                                 |
|------------------------|-----------------------------------------------------------------------------|
| Engine Registry        | Stores which engines are allowed to perform which actions and platforms     |
| Permission Checker     | Evaluates incoming requests against policy, context, and scopes             |
| Platform Status Monitor| Tracks third-party API/platform availability                                |
| Traffic Logger         | Logs all permission attempts and results                                    |
| Feature Flag Dispatcher| Determines if experimental features are enabled for the context             |
| Load Controller        | Applies rate limits, defers requests, and avoids overuse during spikes      |

---

## 🔄 Information Flow

### Input: Permission Check Request

```json
{
  "engine_id": "execution",
  "platform": "Slack",
  "requested_action": "send_message",
  "user_id": "user_983"
}
```

### Process:

1. Validate engine ID and registration  
2. Check platform status (active / maintenance)  
3. Apply relevant policy filters and user/environment scopes  
4. Log the attempt with timestamp and reason  
5. Return approval or rejection  

### Output: Permission Decision

```json
{
  "action_allowed": false,
  "reason": "User lacks required scope",
  "scopes_required": ["chat.write"]
}
```

---

## 🌐 External Dependencies

| Service             | Purpose                                         |
|---------------------|-------------------------------------------------|
| Feature Flags API   | Stores and resolves feature activation conditions |
| Platform Monitor    | Monitors platform status (Slack, Gmail, etc.)   |
| Logs Engine         | Receives audit logs                            |
| Token Signing       | Verifies engine identity via signed tokens     |

---

## 👥 User-Facing Interfaces

| Location         | View                                                                  |
|------------------|-----------------------------------------------------------------------|
| Debug Console    | “Action blocked – Gmail is currently unavailable”                    |
| Logs Dashboard   | List of all denied/approved requests with engine/user/reason          |
| Admin Panel      | Manage engine permissions, platform policies, and feature toggles     |
| Feature Console  | Toggle new functionality for specific users or roles                  |

---

## 💡 Notable Behaviors

- All engines must authenticate using a signed `engine_token`  
- Default behavior is **deny-by-default** — explicit allow is required  
- Tracks every attempt — including failed or denied requests  
- Can delay requests and instruct caller to “retry after X minutes”  
- Supports scoped rollout of features to beta users or test groups  

---

## 🧠 Summary

The Engine Control Core is the gatekeeper of the PURAIFY system.  
Without it, any engine could act unchecked — potentially breaking integrations or security.  
With it, every action is governed, logged, and controlled — ensuring safety, traceability, and scalable orchestration.

It doesn’t run — but nothing runs without it.
