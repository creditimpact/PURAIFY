# 🧠 Engine Spec: Monitoring & Logs Engine

---

## 🎯 Purpose

The **Monitoring & Logs Engine** is the centralized telemetry and observability system of PURAIFY.  
It records **every action, event, and anomaly** that occurs across all engines — including executions, validations, failures, retries, alerts, and performance stats.

This engine serves as the **“black box”** of every platform created in PURAIFY, enabling transparent debugging, technical support, analytics, and historical replay.

---

## ⚙️ Core Responsibilities

| Action             | Description                                                      |
|--------------------|------------------------------------------------------------------|
| 📝 Log Every Event | Records all engine calls — what, when, and from where            |
| ❌ Track Errors    | Captures error events, messages, stack traces                    |
| 📈 Monitor Performance | Logs durations, retries, load metrics                        |
| 📢 Trigger Alerts  | Sends alerts (Slack, UI, email) for critical errors              |
| 📊 Support Dashboards | Provides analytics on flows, errors, usage                   |
| 🔁 Support Replay  | Enables session playback and correlation between users           |

## 🚫 What It Does NOT Do

- ❌ It does not validate whether actions are allowed → that's Engine Control.  
- ❌ It does not retry or modify actions → only observes and records.  
- ❌ It does not resolve issues → alerts the relevant engine or user.  

## 🔗 Engine Integrations

| Engine            | Role                                                                 |
|------------------|----------------------------------------------------------------------|
| Execution Engine | Sends logs on actions, durations, retries, errors                    |
| Validation Engine | Reports validation errors                                            |
| Vault Engine     | Reports access or credential failures                                |
| Platform Builder | Tracks logic/config changes during blueprint authoring              |
| Feedback Loop    | Triggered when a critical issue needs user attention                |
| Engine Control   | Shares logs for audit/regulation purposes                           |

## 📥 Input Example — Execution Log

```json
{
  "project_id": "pf_123",
  "event_type": "execution",
  "platform": "Slack",
  "action": "send_message",
  "status": "success",
  "duration_ms": 842,
  "timestamp": "2025-07-25T14:01:00Z"
}
```

## 📤 Output Example — Alert Trigger

```json
{
  "project_id": "pf_123",
  "event_type": "error",
  "severity": "high",
  "message": "Failed to send message – token expired",
  "triggered_by": "execution_engine",
  "notified": true
}
```

## 🔄 Sample Flow

### REST Endpoints

| Method & Route          | Purpose                          |
|-------------------------|----------------------------------|
| `POST /monitoring/logs` | Ingest a structured log event    |
| `POST /monitoring/alert`| Record a high severity alert     |
| `GET  /monitoring/logs` | Query stored logs by filter      |

### Error Input:

```json
{
  "project_id": "pf_880",
  "flow_id": "lead_submit",
  "engine": "execution",
  "status": "error",
  "error_type": "api_timeout",
  "platform": "Notion",
  "duration_ms": 4232,
  "timestamp": "2025-07-25T18:45:00Z"
}
```

### Internal Processing:

- Received by Structured Logs Collector  
- Passed to Error Aggregator (to detect severity & frequency)  
- If critical → Alert Dispatcher triggers alert  
- Log indexed in time-series storage (e.g., Clickhouse/Elastic)  
- Available via Query API to UI or other engines  

### Output (query):

```json
{
  "logs": [
    {
      "type": "action_error",
      "platform": "Slack",
      "message": "Invalid token",
      "timestamp": "2025-07-25T17:00:00Z"
    },
    {
      "type": "flow_run",
      "status": "success",
      "duration_ms": 178,
      "timestamp": "2025-07-25T17:01:20Z"
    }
  ]
}
```

## 🧱 Internal Architecture

| Module                   | Description                                                    |
|--------------------------|----------------------------------------------------------------|
| Structured Logs Collector | Accepts JSON log events from any engine                       |
| Error Aggregator         | Groups errors by type, source, user, frequency                 |
| Performance Monitor      | Measures latency, retries, timeouts                           |
| Alerts Dispatcher        | Sends notifications for critical issues                       |
| Query & Search API       | Enables querying by project, engine, time, status             |
| Audit Trail Tracker      | Builds audit timeline per user/project/flow                   |

## 🌐 External Integrations

| Service          | Purpose                                 |
|------------------|-----------------------------------------|
| Slack            | Sends real-time alerts                  |
| Email / UI       | Displays failures and user-facing issues |
| Elastic / Clickhouse | Stores time-series logs            |
| Datadog / Sentry | Optional external observability providers |

## 👥 Example Use Cases

| Scenario              | What Happens                                                 |
|------------------------|-------------------------------------------------------------|
| Action Fails           | Error is logged, shown in dashboard                         |
| Token Expired          | Alert is triggered to user/admin                            |
| Performance Spikes     | Logged for analysis or rate limiting                        |
| Support Debugging      | Audit Trail shows what user did and when                    |
| Critical Platform Crash| Replay mode shows session history                           |

## 💡 Future Enhancements

- Visual session playback (“what led to the crash?”)  
- Real-time streaming to analytics dashboards  
- Fine-grained alert policy editor  
- Auto-correlation of failures to recent deployments  
- Smart deduplication of common error floods  

## 🧠 Summary

The Monitoring & Logs Engine is PURAIFY’s eyes and ears.  
It observes everything — and surfaces only what matters.  

Without it, support would be blind, users would be confused,  
and systems would silently fail.  

With it — issues are caught early, debugged quickly, and tracked clearly.
