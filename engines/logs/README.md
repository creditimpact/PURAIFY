## 📡 Monitoring & Logs Engine

**Status:** ✅ implemented (basic log ingestion; advanced alerting planned)

> This engine is part of the PURAIFY system. For full system overview, see the main [README.md](../../README.md)

---

## 🧠 Overview

The **Monitoring & Logs Engine** is PURAIFY’s central observability and logging component.  
It records **every event** happening across the platform: executions, validations, failures, retries, alerts, and performance metrics.

It enables developers and users to **trace issues**, **understand behavior**, and **visualize system health**.  
It is the **black box** for every project built with PURAIFY.

---

## 📁 Engine Structure

```text
monitoring/
├── package.json
├── tsconfig.json
├── README.md
├── ENGINE_SPEC.md
├── src/
│   ├── index.ts
│   ├── collector.ts           # Receives structured logs
│   ├── alert-dispatcher.ts    # Triggers Slack/Email/UI alerts
│   ├── query.ts               # Supports search/filtering
│   └── aggregator.ts          # Groups repeated errors
├── tests/
│   └── sample.test.js
```

All logs are JSON-based and follow a standardized schema.

---

## 🚀 Development Setup

Requires Node.js v20+

```bash
npm ci
npm run dev
npm run test
```

Use `.env` to configure:

- `MONITORING_PORT`  
- `ALERT_WEBHOOK_URL` (e.g., Slack)  
- `LOG_STORAGE_ENGINE` (e.g., "clickhouse" / "local" / "elastic")  

Use `npm ci --prefer-offline` if working in offline environments.

---

## ⚙️ API Endpoints

### `POST /monitoring/logs`
Ingest a structured log from another engine.

#### Request Example

```json
{
  "project_id": "pf_001",
  "event_type": "execution",
  "engine": "execution",
  "platform": "Slack",
  "action": "send_message",
  "status": "success",
  "duration_ms": 1540,
  "timestamp": "2025-07-25T12:10:00Z"
}
```

#### Response

```json
{ "received": true }
```

---

### `POST /monitoring/alert`
Send a high-priority event alert.

```json
{
  "project_id": "pf_001",
  "severity": "critical",
  "message": "Slack token expired",
  "triggered_by": "execution_engine"
}
```

> Triggers Slack webhook, email, or in-app notification.

---

### `GET /monitoring/logs`
Query logs by filters.

**Supported filters:**

- `engine` – filter by originating engine
- `level` – filter by log level

---

## 🧩 Role within the PURAIFY System

| Source Engine     | What It Logs                             |
|-------------------|------------------------------------------|
| Execution Engine  | All action attempts (success, retry, error) |
| Validation Engine | Blueprint errors, missing fields, warnings |
| Platform Builder  | Changes to entities, logic, or integrations |
| Vault Engine      | Token retrieval failures                 |
| Engine Control    | Audit logs of permission decisions       |
| Feedback Loop     | User-visible alerts triggered by system failures |

---

## 🔁 Typical Log Flow

1. Execution fails due to expired token  
2. Error sent to `/log` with status: `"error"`  
3. Aggregator detects repeated token failures  
4. Alert sent via Slack and flagged in Monitoring UI  
5. Support or user inspects logs via `/logs?project_id=pf_001`  

---

## 🛠️ Internals & Responsibilities

| Module              | Responsibility                            |
|---------------------|--------------------------------------------|
| `collector.ts`      | Receives all log events from engines       |
| `alert-dispatcher.ts` | Sends critical alerts to Slack/email/UI |
| `aggregator.ts`     | Groups similar errors for reporting        |
| `query.ts`          | Supports filtering and search              |
| `replay.ts` (🛠 planned)| Reconstructs session history               |

---

## 📦 Technologies

- Node.js (TypeScript)  
- Express.js  
- Dotenv  
- JSON log schema  
- Clickhouse / Elastic (optional)  
- Slack Webhooks / Nodemailer  

---

## 📊 Example Log Output

```json
{
  "type": "action_error",
  "engine": "execution",
  "platform": "Slack",
  "message": "Missing token for Slack API",
  "status": "error",
  "timestamp": "2025-07-25T12:15:00Z"
}
```

---

## 📢 Example Alert

```json
{
  "severity": "high",
  "message": "Webhook to Notion failed 5 times in 10 minutes",
  "project_id": "pf_999",
  "triggered_by": "execution_engine",
  "notified": true
}
```

---

## 🧪 Testing

Run:

```bash
npm run test
```

Tests include:

- Log ingestion  
- Alert triggering  
- Input validation  
- Grouping behavior  
- Query/filter logic  

All tests live in `monitoring/tests/`.

---

## 👀 Where the User Encounters It

| Scenario              | User Experience                                 |
|------------------------|-------------------------------------------------|
| “Send email” fails     | User sees “token expired” + link to logs        |
| Publish fails          | “Deployment failed – Gmail unreachable”         |
| Silent bug in flow     | User can view session log & replay steps        |
| Support call           | Audit trail shows who did what, when            |

---

## 📌 Key Notes

- Every log includes timestamp, engine, status, platform, and optional `duration_ms`  
- Logs stored in `info`, `warning`, `error`, `critical` levels  
- Compatible with external log services (Datadog, Sentry, etc.)  
- Easily integrates with dashboards and analytics tools  

---

## 🧭 Summary

The Monitoring & Logs Engine is the backbone of observability in PURAIFY.  
It tracks everything, catches issues early, and surfaces what matters most.

Whether you're debugging an issue, tracking system behavior, or getting alerts —  
this engine ensures that you see what really happened, and when.
