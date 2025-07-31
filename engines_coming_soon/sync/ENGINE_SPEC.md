# 🧠 Engine Spec: Sync Engine

---

## 🎯 Purpose

The Sync Engine keeps PURAIFY in sync with external platforms such as **Notion, Airtable, HubSpot, Salesforce**, and others.  
It ensures **data consistency and up-to-date state** across systems through **scheduled**, **event-driven**, or **manual synchronization**.

It supports both **pull** (fetching data) and **push** (sending updates), and resolves conflicts between sources based on defined policies.

---

## ⚙️ Core Responsibilities

| Action              | Description                                                             |
|---------------------|-------------------------------------------------------------------------|
| 🔁 One-way Sync      | Pull or push data on schedule or trigger                                |
| 🔄 Bidirectional Sync| Compare and merge changes between systems                               |
| 📆 Schedule Management| Set up time-based or event-based sync jobs                             |
| 🔍 Delta Detection   | Identify added, updated, or removed records                             |
| ⚔️ Conflict Resolution| Decide outcome when data differs between systems                        |
| 🧩 Schema Mapping    | Translate between mismatched field names and types                      |

## 🚫 What It Does NOT Do

- ❌ Does not execute logic or actions — that's handled by the Execution Engine  
- ❌ Does not persist data long-term — it coordinates updates, not storage  
- ❌ Does not manage authentication — Vault & Integration Manager handle auth  

## 🔗 Engine Integrations

| Engine            | Role                                                              |
|-------------------|-------------------------------------------------------------------|
| Vault Engine      | Supplies tokens and credentials securely                         |
| Integration Manager| Provides platform metadata, scopes, endpoints                   |
| Monitoring Engine | Receives logs and sync status updates                            |
| Execution Engine  | Executes action-based sync steps when needed                     |
| Feedback Loop     | Asks user to resolve conflicts interactively                     |
| Engine Control    | Validates permissions before sync runs                           |

## 📥 Input Example

```json
{
  "project_id": "pf-456",
  "sync_type": "bidirectional",
  "source_platform": "Notion",
  "target_entity": "TasksTable",
  "schedule": "every_15_minutes"
}
```

## 📤 Output Example

```json
{
  "status": "success",
  "synced_items": 42,
  "conflicts_detected": 1,
  "conflict_resolution": "auto_override_from_remote",
  "last_sync": "2025-07-25T12:00:00Z"
}
```

## 🔄 Sync Flow: Internal Sequence

### Sample Input:

```json
{
  "sync_id": "sync_7744",
  "project_id": "pf-701",
  "source": "Notion",
  "target": "TasksTable",
  "mode": "bidirectional",
  "schedule": "every_hour"
}
```

### Internal Flow:

1. Scheduler triggers job (time-based or event-based)  
2. Vault provides secure API tokens  
3. Orchestrator connects to platforms and pulls current state  
4. Delta Detector identifies changes since last sync  
5. Schema Mapper aligns fields across systems  
6. Conflict Resolver chooses which side wins  
7. Sync Logger records outcome and sends logs to Monitoring  
8. Feedback Loop engages user if manual decision is needed  

## 🧱 Internal Architecture

| Module               | Description                                          |
|----------------------|------------------------------------------------------|
| Sync Scheduler        | Triggers syncs via time or webhook                  |
| Connector Orchestrator| Manages connections to external platforms          |
| Schema Mapper         | Maps fields and formats between sources            |
| Delta Detector        | Detects what’s changed between two sources         |
| Conflict Resolver     | Resolves discrepancies between systems             |
| Sync Logger           | Logs success/failure for monitoring and audit      |

## 🌐 External Dependencies

| Platform             | Purpose                                       |
|----------------------|-----------------------------------------------|
| Notion, Airtable, HubSpot, etc. | Data sync sources and destinations       |
| Webhook Providers    | Trigger real-time syncs                       |
| Cron / Scheduler     | Time-based execution of sync jobs             |
| OAuth Services       | Auth handled through Vault & Integration Manager |

## 👥 User Interaction Triggers

| Scenario             | Trigger                                                   |
|----------------------|-----------------------------------------------------------|
| Manual sync start    | User initiates sync from UI                               |
| Scheduled sync job   | Configured via schedule settings                          |
| Conflict detected    | User asked to resolve via Feedback Engine                 |
| Sync summary reporting| Shown to user in Monitoring dashboard                    |

## 📌 Additional Notes

- Supports polling and webhook-based triggers  
- Works offline-first with local sync logs and queuing  
- Supports rate limiting per platform  
- Can prioritize critical sync jobs over low-priority ones  
- Every step is logged and auditable via Monitoring  

## 🧠 Summary

The Sync Engine is the bridge between your system and the outside world.  
It ensures your data stays current, clean, and connected, no matter where changes originate.  
Without it — you're operating in the dark with outdated data.  
With it — you stay ahead of reality.
