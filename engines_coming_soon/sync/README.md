# 🔁 Sync Engine

> This engine is part of the PURAIFY system. For the full architecture, see the main [README.md](../../README.md)

---

## 🧠 Overview

The **Sync Engine** ensures that data in PURAIFY stays in sync with **external platforms** like Notion, Airtable, HubSpot, Salesforce, and more.

It supports both **one-way** (pull or push) and **bidirectional synchronization**, based on schedules or real-time webhooks.  
It compares data, detects differences, maps schemas, resolves conflicts, and updates accordingly — all securely and efficiently.

Whether a user edits a record in Notion, or an automation modifies CRM data — the Sync Engine ensures it stays reflected across all systems.

---

## 📁 Engine Structure

```text
sync/
├── package.json
├── tsconfig.json
├── README.md
├── ENGINE_SPEC.md
├── src/
│   ├── index.ts
│   ├── scheduler.ts
│   ├── orchestrator.ts
│   ├── schema-mapper.ts
│   ├── delta-detector.ts
│   ├── conflict-resolver.ts
│   └── logger.ts
└── tests/
    ├── sync.test.ts
    └── integration.test.ts
```

> All tests live under `sync/tests/`.

## 🚀 Development Setup

Requires Node.js v20+.

```bash
npm ci
npm run dev
npm run test
```

Use the shared `.env` file from the repo root and set:

```
SYNC_PORT=3023
VAULT_URL=http://localhost:3001
INTEGRATION_MANAGER_URL=http://localhost:3010
MONITORING_URL=http://localhost:3009
```

Use `npm ci --prefer-offline` to install packages without network access.

---

## ⚙️ API Endpoint (MVP)

### POST `/sync/start`  
Triggers a sync job manually or registers a scheduled one.

#### Request Example

```json
{
  "project_id": "pf-456",
  "sync_type": "bidirectional",
  "source_platform": "Notion",
  "target_entity": "TasksTable",
  "schedule": "every_15_minutes"
}
```

#### Success Response

```json
{
  "status": "success",
  "synced_items": 42,
  "conflicts_detected": 1,
  "conflict_resolution": "auto_override_from_remote",
  "last_sync": "2025-07-25T12:00:00Z"
}
```

---

## 🧩 Role within the PURAIFY System

- **Input**: Sync configuration from UI, Gateway or trigger  
- **Process**: Pulls, compares, maps and resolves changes  
- **Output**: Updates external/internal targets + status reports  
- **Triggers**: Time-based (cron), webhook, or user-initiated  

### Typical Flow:
1. Builder or user defines a sync (e.g., “sync Notion to TasksTable”)  
2. Gateway or user triggers sync  
3. Vault provides credentials  
4. Sync Engine fetches records, detects differences  
5. Conflicts resolved (automatically or via Feedback Loop)  
6. Updates pushed, log saved, response returned  

---

## 🛠️ Internals & Responsibilities

| Module            | Responsibility                          |
|------------------|------------------------------------------|
| Scheduler         | Triggers jobs via cron or webhooks       |
| Orchestrator      | Coordinates pulling/pushing between systems |
| Schema Mapper     | Maps fields across platforms             |
| Delta Detector    | Finds added/updated/deleted items        |
| Conflict Resolver | Resolves content mismatches              |
| Sync Logger       | Logs sync operations and results         |

---

## 🔗 Dependencies

| Engine / Service       | Purpose                                           |
|------------------------|---------------------------------------------------|
| Vault Engine           | Provides credentials to external APIs             |
| Integration Manager    | Describes available services and scopes           |
| Monitoring Engine      | Receives status logs and errors                   |
| Execution Engine       | Invoked if sync requires active step (e.g., webhook call) |
| Feedback Loop          | Requests user input to resolve sync conflicts     |
| Engine Control         | Ensures actions are permitted before sync         |

---

## 👥 Example Use Cases

| Scenario                      | Description                                |
|-------------------------------|--------------------------------------------|
| Sync Notion with internal CRM | Pull tasks from Notion and update internal DB |
| Push new rows to Google Sheets| Daily push of processed records            |
| Bidirectional sync with Airtable | Mirror changes across platforms         |
| Conflict between sources      | Notify user via Feedback Loop for decision |
| View sync history             | Show log of last run in Monitoring dashboard |

---

## 📦 Technologies

- Node.js + TypeScript  
- Express.js  
- Axios  
- Cron Scheduler or BullMQ (planned)  
- JSON Schema validation (planned)  
- dotenv  

---

## 🚧 Development Notes

- Sync jobs support pull, push, and bidirectional modes.  
- Rate-limiting is platform-specific (e.g., Airtable 5/sec, Notion 3/sec).  
- Job Queue uses priority system (high, default, low) for smart ordering.  

### Conflict resolution strategies:
- `prefer_local`  
- `prefer_remote`  
- `manual_review` (via Feedback)  

> Logs follow structured format and will be pushed to Monitoring.

---

## 🧪 Testing

To run tests:

```bash
npm run test
```

Ensure that test config includes mock tokens via Vault and mock APIs via Integration Manager.

---

## 🧭 Summary

The Sync Engine is your real-time data liaison.  
It ensures your workspace reflects the most accurate truth — whether that truth lives in Notion, Airtable, or a customer CRM.  
It keeps your system aligned, clean, and aware — even when no one's watching.
