# Environment Manager Engine

> This engine is part of the PURAIFY system. For full system overview, see the main [README.md](../../README.md)

---

## 🧠 Overview

The Environment Manager Engine handles platform **environment separation**, **version tracking**, and **configuration control** across the development lifecycle.  
It gives users (and internal tools) the ability to create and manage isolated runtime environments like `development`, `staging`, `production`, or temporary `preview` links.

This engine is the **source of truth** for environment-specific logic, tokens, feature flags, and platform state snapshots.  
It enables CI/CD-style flows inside a no-code platform — with clarity, rollback safety, and structured promotion processes.

---

## 📁 Engine Structure

```text
environment-manager/
├── package.json
├── tsconfig.json
├── README.md
├── ENGINE_SPEC.md
├── src/
│   ├── index.ts
│   ├── environments.ts
│   ├── versions.ts
│   └── config-store.ts
└── tests/
    └── sample.test.ts
```

## 🚀 Development Setup

Requires Node.js v20+.

```bash
npm ci
npm run dev
npm test
```

Use the shared `.env` file (`../../.env.example`) to configure `ENV_MANAGER_PORT` and service URLs.  
Use `npm ci --prefer-offline` if installing without internet access.

---

## 🧩 Role within the PURAIFY System

**Input:** Requests to create environments, promote versions, manage environment configs  
**Output:** Structured state object with version links, ENV metadata, and promotion readiness  

**Connects to:**

- Vault Engine — for environment-specific token separation  
- Execution Engine — to run platform logic with correct config  
- Validation Engine — ensures correctness before deployment  
- Monitoring Engine — logs activity by environment/version  
- Deployment Planner — pulls active environment state  

---

## ⚙️ API Endpoints

### `POST /env/create`  
Create a new environment from an existing one.

**Request:**

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

**Response:**

```json
{
  "status": "env_created",
  "env": "staging",
  "linked_version": "v1.4.3",
  "url": "https://preview.puraify.app/pf-777/staging"
}
```

---

### `POST /env/promote`  
Promote a version from one environment to another (e.g., staging → production).

**Request:**

```json
{
  "project_id": "pf-777",
  "source_env": "staging",
  "target_env": "production"
}
```

**Response:**

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

---

## 🧪 Example Use Cases

| Prompt / Action                         | Result                                   |
|----------------------------------------|------------------------------------------|
| “Create a staging env from dev”        | `env_created` with isolated config       |
| “Promote v3.1 from staging to production” | `ready_for_deploy` with diff summary     |
| “Rollback production to v2.9”          | Version pointer reset and config reverted |
| “Compare staging and prod configs”     | Returns ENV+flags diff                   |
| “Add preview env for QA demo”          | Temporary isolated environment created   |

---

## 🛠️ Internals & Responsibilities

- **Environment Registry**: Tracks all environments per project  
- **Version Manager**: Stores and links platform state by environment  
- **Config Store**: Holds ENV vars, flags, and keys (referencing Vault)  
- **Promotion Module**: Clones and links versions across envs  
- **Audit Logger**: Tracks user/version/env activity (for Monitoring)  

---

## 📦 Technologies

- Node.js (TypeScript)  
- Express.js  
- Internal JSON-based config and version store (initially)  
- Planned support for Redis, Git-style backend for version diffs  
- Vault integration for secret separation  

---

## 🔗 Dependencies

| Engine             | Use                                           |
|--------------------|-----------------------------------------------|
| Vault Engine       | Manages ENV tokens separately per env         |
| Deployment Planner | Pulls final version from Environment Manager  |
| Validation Engine  | Runs validation prior to promotion            |
| Monitoring Engine  | Logs actions per version/env                  |
| Platform Builder   | Used to generate preview of given env         |

---

## 🚧 Development Notes

- All ENV tokens are isolated — staging and prod use different Vault entries  
- Promotion flow includes diff check before allowing upgrade  
- Preview environments have expiration timers (planned)  
- Every change is versioned — even config updates  
- Snapshots are internally timestamped and revertible  

---

## 📊 Sample Version Log

```json
{
  "project_id": "pf-877",
  "env": "staging",
  "version": "v3.0.2",
  "created_by": "user_044",
  "timestamp": "2025-07-30T13:22:10Z",
  "changes": {
    "flows_updated": 1,
    "feature_flags": ["BETA_FORM"],
    "env_vars_changed": ["BASE_URL"]
  }
}
```

---

## 🧭 Summary

The Environment Manager Engine ensures safe, clear, and structured control over your no-code platform’s lifecycle.  
From previews to production — every version, flag, and API key is tracked and isolated.

This engine empowers teams to move fast without breaking prod, and brings CI/CD-style governance to visual development.
