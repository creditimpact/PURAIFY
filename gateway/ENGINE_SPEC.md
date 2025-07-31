# 🧠 Gateway Engine – System Orchestrator & API Entry Point

---

## 🎯 Purpose

The Gateway serves as the API hub and orchestration controller of the PURAIFY system.  
It is the central entry point for all incoming requests — from the frontend, CLI, external agents, or Codux.

Its main responsibilities are:
- Receiving, parsing, and validating incoming client requests
- Detecting the intended action and routing to the correct engine
- Performing basic authentication and permission checks
- Aggregating and formatting the response

It is the **"traffic controller"** of the system — no action flows without passing through it.

---

## ⚙️ Core Responsibilities

| Action                     | Description |
|---------------------------|-------------|
| 🌐 Receive REST/GraphQL   | Serves as the system’s main HTTP API |
| 🔄 Route to Engines       | Forwards to Vault, Execution, Platform Builder, etc. |
| 🛂 Basic Auth Check       | Validates user or engine token |
| 🧠 Intent Detection       | Interprets request to determine destination engine |
| 🧾 Response Aggregation   | Returns standardized responses to clients |
| 🔌 Future Extensibility   | Unified gateway for Codux, Admin UI, CLI, and external agents |

---

## 🚫 What the Gateway Does *Not* Do

To maintain separation of concerns and system modularity, the Gateway **does not** perform the following actions:

- ❌ It does **not** call or handle external APIs  
  (This is handled by the Execution Engine)

- ❌ It does **not** store or persist any data  
  (It only relays data between engines)

- ❌ It does **not** execute business logic of other engines  
  (Each engine owns its own logic; the Gateway only routes and aggregates)

The Gateway is strictly responsible for:
- Receiving  
- Validating  
- Routing  
- Aggregating  

---

## 🔗 Engine Integrations

The Gateway coordinates with the following PURAIFY engines during request processing:

| Engine              | Integration Role |
|---------------------|------------------|
| Vault Engine        | Token issuance, authentication checks |
| Execution Engine    | Executes flows and system actions |
| Platform Builder    | Processes project structure and blueprint changes |
| Validation Engine   | Validates project blueprints before execution via `/validation/check` |
| Knowledge Engine    | Retrieves or updates project knowledge |
| Engine Control      | Manages engine-level permissions and session validation |
| Monitoring Engine   | Logs request lifecycle and execution metrics |
| Feedback Loop       | Collects user input when automation lacks sufficient data |

> ⚠️ **Note:**  
> This list reflects the currently known engine integrations.  
> Codex should verify actual runtime dependencies by scanning Gateway route definitions and usage patterns.

Each engine must authenticate itself via `engine_id + token` when accessed by the Gateway.

---

## 📥 Typical Input Example

A client or external agent sends a request to the Gateway in the following format:

```json
{
  "route": "/run/action",
  "method": "POST",
  "user_id": "u_456",
  "engine": "execution",
  "payload": {
    "project_id": "pf_789",
    "action": "send_slack_message",
    "parameters": {
      "channel": "#support",
      "message": "New support ticket created"
    }
  }
}
```

---

## 📤 Successful Response Example

```json
{
  "status": "success",
  "engine": "execution",
  "result": {
    "platform": "Slack",
    "message_id": "msg_12345",
    "timestamp": "2025-07-28T12:34:00Z"
  }
}
```

---

## ❌ Error Response Example

```json
{
  "status": "fail",
  "reason": "Unauthorized engine",
  "engine": "vault"
}
```

These response structures are standardized to allow consistent handling across UI, CLI, and automation agents.

---

## 🔄 Typical Request Flow

1. The client sends a request to the Gateway (e.g. `/run/action`)
2. The `Auth Validator` checks user or engine credentials
3. The `Engine Router` determines the appropriate target engine
4. The request is forwarded to that engine (e.g., `execution`)
5. The response is collected by the `Gateway Controller`
6. The response is normalized and returned to the client
7. Optionally, the `Monitoring Engine` is notified for logging

---

## 📌 Internal Architecture (Proposed)

| Component             | Responsibility |
|-----------------------|----------------|
| Request Parser        | Extracts route, method, and metadata |
| Engine Router         | Decides which engine to forward to |
| Auth Validator        | Validates engine/user token |
| Gateway Controller    | Orchestrates the full flow |
| Flow Aggregator       | Handles multi-engine logic |
| Monitor Proxy         | Sends execution stats to Monitoring Engine |

> Note: These are modular and may evolve as the system grows.

---

## 💡 Future Enhancements

- Add full GraphQL support in parallel to REST
- Support for session management and engine-level rate limiting
- Swagger/OpenAPI documentation for all Gateway routes
- Admin UI for real-time request tracing and engine logs
- Built-in retry mechanism for failed downstream calls
