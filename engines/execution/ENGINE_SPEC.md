# 🧠 Engine Spec: Execution Engine

---

## 🎯 Purpose

The Execution Engine is responsible for **performing** the actions defined by users inside their automation flows and platforms.  
It is the executor — it does **not** validate, authorize, or reason.  
Its job is to **run what it is told**, reliably and securely.

Common actions include:
- Sending emails
- Creating database records
- Posting to Slack
- Triggering webhooks

---

## ⚙️ Core Responsibilities

| Action                       | Description |
|------------------------------|-------------|
| ⚙️ Execute Action by Trigger | Handles actions like `send_email`, `create_record`, `call_webhook` |
| 🔐 Fetch Token from Vault    | Retrieves credentials for platform before execution |
| 📤 Perform External Call     | Makes actual HTTP/API call to external service |
| 🧾 Log Execution Result      | Records status, success/failure, and metadata |
| 🧪 Handle Complex Flows      | Executes multi-step automations (via flow definitions) |

---

## 🚫 What It Does *NOT* Do

- ❌ Does **not** decide whether action is allowed → that's Engine Control
- ❌ Does **not** persist business data → it just transmits
- ❌ Does **not** generate logic → only executes predefined tasks

---

## 🔗 Engine Integrations

| Engine               | Role |
|----------------------|------|
| Vault Engine         | Provides platform tokens for execution |
| Engine Control Core  | Confirms if action is authorized |
| Validation Engine    | Uses Execution for test flows |
| Monitoring Engine    | Logs every request and result |
| Feedback Loop Engine | Notified if execution fails or requires user input |
| Knowledge Engine     | Supplies action definitions and schema |

---

## 📥 Input Example

```json
{
  "project_id": "pf_456",
  "user_id": "u_123",
  "action": "send_slack_message",
  "platform": "Slack",
  "parameters": {
    "channel": "#sales",
    "message": "New lead received!"
  }
}
```

---

## 📤 Output Example (Success)

```json
{
  "status": "success",
  "platform": "Slack",
  "action": "send_slack_message",
  "timestamp": "2025-07-25T15:30:00Z"
}
```

---

## ❌ Output Example (Failure)

```json
{
  "status": "fail",
  "reason": "Missing token or insufficient scope",
  "platform": "Slack",
  "action": "send_slack_message"
}
```

---

## 🔄 Execution Flow

### Sample Input:

```json
{
  "project_id": "pf_123",
  "flow_id": "flow_abc",
  "action": {
    "type": "send_message",
    "platform": "Slack",
    "payload": {
      "channel": "#sales",
      "text": "New lead received from {{user.name}}"
    }
  },
  "user_context": {
    "role": "editor",
    "auth_scope": "slack:write"
  }
}
```

### Internal Flow:

1. Task received by `Task Dispatcher`
2. Authorization checked via Engine Control
3. Token fetched from Vault
4. Variable substitution by `Input Resolver`
5. Platform Adapter is selected and executed
6. Execution result logged via `State Tracker`
7. Logs sent to Monitoring Engine
8. Final result returned to caller

---

## 🧱 Internal Architecture

| Module                  | Description |
|-------------------------|-------------|
| Task Dispatcher         | Receives job and assigns to correct adapter |
| Adapter Layer           | Slack, Gmail, REST, etc. — each has an adapter |
| Execution Sandbox       | Secure runtime (supports timeouts, retries, isolation) |
| Input Resolver          | Replaces variables (e.g., `{{user.email}}`) with real data |
| State Tracker           | Tracks execution state and logs results |
| Secure Context Injector | Ensures auth tokens and permissions are ready |

---

## 🌐 External Dependencies

| Service                  | Purpose |
|--------------------------|---------|
| Slack / Gmail / Notion   | Executes actual actions |
| Webhook Endpoints        | Sends dynamic payloads to third-party servers |
| Vault Engine             | Provides credentials |
| Logs Engine              | Records technical logs |
| Feedback Engine          | User notification and fallback |
| Engine Control Core      | Authorization check |

---

## 👥 User Interaction Triggers

| Scenario                  | Trigger |
|---------------------------|---------|
| Manual flow execution     | User clicks “Run Now” |
| Scheduled task            | Triggered via platform scheduler |
| Automated test run        | Platform executes validation |
| External webhook trigger  | Incoming request to `/execute` endpoint |

---

## 💡 Future Enhancements

- Built-in retry mechanism per adapter
- Execution graph visualizer (via Admin UI)
- Parallel execution of multi-step flows
- Dynamic rate limiters per platform
- Metrics exporter for Prometheus / Grafana

---

## 🧠 Summary

The Execution Engine is the **hands** of the PURAIFY system.  
It only runs what has been built, approved, and authorized.  
It doesn’t decide — it executes.  
Fast, traceable, secure — it connects your platforms to the real world.
