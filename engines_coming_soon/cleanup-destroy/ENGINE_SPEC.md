# 🧠 Engine Spec: Cleanup / Destroy Engine

---

## 🎯 Purpose

The Cleanup / Destroy Engine is responsible for **secure deletion, cleanup, and teardown** of entire platforms, environments, tokens, and integrations.  
It ensures that no orphaned credentials, active processes, or stale configurations are left behind.

This engine serves as the **final gatekeeper** for responsible removal — combining automation with audit, double confirmation, and recovery options.

---

## ⚙️ Core Responsibilities

| Action                  | Description                                                        |
|-------------------------|--------------------------------------------------------------------|
| 🗑️ Delete Platform         | Removes platform structure, blueprints, environments, and access  |
| 🔌 Disconnect Integrations | Cancels OAuth, Webhooks, API keys from Integration Manager       |
| 🧼 Clean Environments      | Deletes dev, preview, staging environments and temp data         |
| 🪪 Revoke Tokens           | Deletes secrets from Vault Engine                                |
| ⏳ Grace Period & Undo     | Marks for deletion with undo window, delayed purge               |

## 🚫 What It Does NOT Do

- ❌ Does not decide if action is authorized → Engine Control handles that  
- ❌ Does not log by itself → only emits structured log events  
- ❌ Does not determine what to delete → acts on system/user command  

## 🔗 Engine Integrations

| Engine             | Role                                                        |
|--------------------|-------------------------------------------------------------|
| Vault Engine       | Deletes all project tokens and secrets                      |
| Integration Manager| Revokes OAuth tokens and Webhooks                           |
| Execution Engine   | Stops scheduled/active executions                           |
| Environment Manager| Cleans project environments and config                      |
| Feedback Loop      | Notifies user, supports undo                                |
| Engine Control     | Validates if the delete action is allowed                   |
| Monitoring Engine  | Logs deletion request and result                            |

## 📥 Input Example

```json
{
  "user_id": "user_999",
  "project_id": "pf_234",
  "action": "delete_project",
  "delete_integrations": true,
  "grace_period": true
}
```

## 📤 Output Example (With Grace Period)

```json
{
  "status": "deletion_pending",
  "deleted_at": "2025-07-25T20:12:00Z",
  "undo_available_until": "2025-07-27T20:12:00Z"
}
```

## 🔄 Execution Flow

1. **Authorization Check via Engine Control**  
2. **Stop Activity**: cancel executions, schedulers, webhooks  
3. **Grace Period (optional)**: mark for deletion with recovery window  
4. **Resource Cleanup**: Vault, environments, integrations  
5. **Final Purge** after timeout or explicit confirmation  
6. **Emit Logs + Audit Trail**: who triggered, when, what was affected  

## 🧱 Internal Architecture

| Module               | Responsibility                                                  |
|----------------------|------------------------------------------------------------------|
| Deletion Orchestrator| Manages the teardown sequence                                   |
| Integration Releaser | Disconnects and deauthenticates services                        |
| Environment Sweeper  | Removes environments, previews, temp configs                    |
| Token Destroyer      | Deletes secrets from Vault by scope                             |
| Grace Manager        | Holds state for undo period                                     |
| Audit & Trail Logger | Emits events to the monitoring/logging system                   |

## 🔐 Safety Features

| Feature              | Purpose                                                        |
|----------------------|----------------------------------------------------------------|
| Double Confirmation  | Prevents accidental deletion via OTP / typing                  |
| Grace Period         | Allows undo within 24–72h                                      |
| Partial Delete Mode  | e.g., delete runtime but retain secrets                        |
| Residual Checker     | Scans for leftovers (tokens, hooks, envs)                      |

## 👥 User Interaction Triggers

| Scenario                 | Trigger                                      |
|--------------------------|----------------------------------------------|
| Delete project           | Button + OTP / confirmation dialog           |
| Undo deletion            | Inline UI link in notification               |
| Residual check           | Triggered manually or auto post-deletion     |
| Inactive preview cleanup | Cronjob or scheduler-based                   |

## 🌐 External Dependencies

| System         | Usage                                         |
|----------------|-----------------------------------------------|
| Vault Engine   | Secure credential deletion                    |
| OAuth providers| Revoke app access (Slack, Google, etc.)       |
| Logs / Monitoring | Records the operation                      |
| Feedback UI    | Allows user notification + undo prompt        |

## 🧠 Summary

The Cleanup / Destroy Engine is PURAIFY’s janitor, shield, and final safeguard.  
It cleans up everything that is no longer needed — safely, traceably, and with guardrails.

It doesn’t just delete — it revokes, releases, and resets, so that nothing harmful or insecure lingers after the user leaves.
