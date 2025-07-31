# 🧠 Engine Spec: Environment Manager Engine

---

## 🎯 Purpose

The Environment Manager is responsible for managing platform environments (like `development`, `staging`, `production`, or `preview`), version history, and configuration settings.  
It provides structured, auditable control over how platforms evolve — enabling rollback, environment-specific configs, validation gates, and secure separation of secrets.  
Think of it as **GitOps for No-Code**.

---

## ⚙️ Core Responsibilities

| Action                    | Description                                                             |
|---------------------------|-------------------------------------------------------------------------|
| 🧱 Create Environments     | Clone or define new environments (dev, staging, prod, preview)          |
| 🔁 Manage Versions         | Track environment-specific versions, enable rollbacks, compare diffs     |
| 🔐 Set Environment Configs | Manage API keys, ENV vars, feature flags per environment                 |
| 🧪 Validate Before Promote | Run validation on versions before production approval                    |
| 🔄 Promote & Sync          | Move platform state between environments with rules or approvals         |
| 📊 Track History           | Audit every version push/change with user + timestamp                    |

## 🚫 What It Does NOT Do

- ❌ Does not handle actual deployment → that’s the job of Deployment Planner  
- ❌ Does not store secrets → relies on Vault Engine for secure token management  
- ❌ Does not approve changes → it manages state, not permissions  

## 🔗 Engine Integrations

| Engine             | Role                                                                 |
|--------------------|----------------------------------------------------------------------|
| Deployment Planner | Executes deploys based on env status                                 |
| Vault Engine       | Provides separate tokens per environment                             |
| Validation Engine  | Validates version correctness before promotion                       |
| Monitoring Engine  | Logs per environment and version activity                            |
| Feedback Loop      | Gets user confirmation before risky changes                          |

## 📥 Input Example — Create New Environment

```json
{
  "project_id": "pf-777",
  "new_environment": "staging",
  "base_from": "development",
  "env_variables": {
    "API_KEY": "stg-xxxxxx",
    "BASE_URL": "https://staging.myapp.com"
  }
}
```

## 📤 Output Example — Promote to Production

```json
{
  "status": "ready_for_deploy",
  "version": "v2.3.1",
  "environment": "production",
  "diff_from_previous": {
    "entities_added": ["Notification"],
    "logic_changed": 2,
    "env_updated": ["API_KEY"]
  }
}
```

## 🔨 Internal Architecture

| Component             | Description                                                        |
|------------------------|--------------------------------------------------------------------|
| Environment Registry   | Stores all existing environments per project                       |
| Config Store           | Holds ENV vars, flags, keys per environment                        |
| Version Manager        | Tracks every change, links versions to environments                |
| Isolation Layer        | Separates runtime tokens/configs per env                           |
| Clone & Promote        | Copies platform state across environments securely                 |

## 🔄 Example Flow — Clone Dev to Staging

**Input:**

```json
{
  "project_id": "pf_872",
  "env_name": "staging",
  "base_env": "dev"
}
```

**Flow:**

- Duplicates current dev version into staging  
- Copies ENV config and secrets (with isolation)  
- Creates new URL for staging preview  
- Marks environment as active, ready for testing  

**Output:**

```json
{
  "status": "env_created",
  "env": "staging",
  "linked_version": "v1.4.3",
  "url": "https://preview.puraify.app/pf_872/staging"
}
```

## 📊 Example Version Record

```json
{
  "version": "v3.2.0",
  "created_by": "user_018",
  "environment": "staging",
  "timestamp": "2025-07-30T10:22:31Z",
  "changes": {
    "updated_flows": 3,
    "env_changed": true,
    "flags_added": ["BETA_FORM"]
  }
}
```

## 🌐 External Dependencies

| Service           | Purpose                                   |
|-------------------|-------------------------------------------|
| Vault Engine      | Token isolation per env                   |
| Logs Engine       | Records each env/version event            |
| Feedback Engine   | User confirmation for critical actions    |
| Builder           | Provides base logic for environment       |
| Gateway           | Sends user requests (create/promote/update) |

## 💡 Additional Notes

- All environments are isolated: runtime configs, Vault entries, logs  
- Every version action is tracked: who, what, when  
- Supports temporary envs (preview links, QA, demo)  
- Can enforce policies: e.g. "must test in staging before prod"  
- Environment → Version → Config is strictly managed  

## 🧠 Summary

The Environment Manager Engine adds discipline, clarity, and traceability to platform lifecycle in PURAIFY.  
It gives no-code builders a modern Git-like experience: manage states, promote with confidence, and recover fast when needed.  

This engine enables serious, scalable workflows — turning ideas into controlled releases.
