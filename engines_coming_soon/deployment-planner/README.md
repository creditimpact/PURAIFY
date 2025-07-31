# Deployment Planner

> This engine is part of the PURAIFY system. For full system overview, see the main [README.md](../../README.md)

## 🧠 Overview

The **Deployment Planner Engine** is responsible for transforming completed platforms into live, running systems.  
It defines how, where, and when a platform is deployed — including selecting infrastructure (e.g. Vercel, Netlify, AWS), configuring environments (ENV, secrets, webhooks), and executing the deployment pipeline.

It is the "publish button" for platforms — with all the orchestration behind the scenes.

---

## 📁 Engine Structure

```text
deployment-planner/
├── package.json
├── tsconfig.json
├── README.md
├── ENGINE_SPEC.md
└── src/
    ├── index.ts
    ├── planner.ts
    ├── executor.ts
    └── rollback.ts
```

Tests for this engine live in `deployment-planner/tests/`

### 🚀 Development Setup

Requires Node.js v20+

```bash
npm ci
npm run dev
npm test
```

- Use the shared `.env` file (`../../.env.example`) to configure `DEPLOYMENT_PORT`, Vault/Execution URLs, and environment manager endpoints.  
- Use `npm ci --prefer-offline` if installing without internet access.

File responsibilities:

- `src/index.ts` – main Express entry point  
- `planner.ts` – handles strategy and config generation  
- `executor.ts` – performs the actual deploy call  
- `rollback.ts` – supports reversion on failure  
- `ENGINE_SPEC.md` – defines the formal spec for this engine

---

## 🧩 Role within the PURAIFY System

**Input:** Platform metadata, target environment, tech stack, deployment preferences  
**Output:** Live deployed platform (URL, version ID, result)  

**Depends on:**
- Vault (for secrets)  
- Validation (pre-checks)  
- Execution (run commands)  
- Environment Manager (version tagging)

### Example Flow

1. User clicks “Deploy to Production” in UI  
2. Gateway sends request to Deployment Planner  
3. Deployment Planner:
   - Verifies validity via Validation Engine  
   - Retrieves tokens/secrets via Vault  
   - Plans infra and environment  
   - Executes deployment  
4. Returns:
   - Deployment status  
   - Live URL  
   - Logs & next steps

---

## ⚙️ API Endpoint

### POST `/deploy`

Deploy a platform to a selected environment.

#### Request:

```json
{
  "project_id": "pf_311",
  "target_env": "production",
  "deployer_id": "user_129",
  "version_name": "v3.2"
}
```

#### Success Response:

```json
{
  "status": "success",
  "env": "production",
  "version_id": "ver_9831",
  "url": "https://run.puraify.app/app/lead-form-v3"
}
```

#### Error Example:

```json
{
  "status": "error",
  "reason": "Missing ENV: STRIPE_SECRET_KEY",
  "stage": "env_setup"
}
```

---

## 🧠 Responsibilities

| Task                     | Description                                      |
|--------------------------|--------------------------------------------------|
| Validate deploy readiness | Check if the platform is deployable              |
| Select infrastructure     | Choose between Vercel, Docker, Netlify, etc.     |
| Generate deployment plan  | Assemble build artifacts, stack configs          |
| Execute deployment        | Launch to environment via Execution Engine       |
| Report status             | Return logs, dashboard URL, and next steps       |
| Rollback on failure       | Revert to last known good version (if needed)    |

---

## 🧪 Example Use Cases

| Prompt / Input                   | Outcome                                           |
|----------------------------------|---------------------------------------------------|
| Deploy to staging                | Platform published to temporary preview URL       |
| Deploy to production with rollback | Full deployment + rollback config set             |
| Redeploy latest version          | Triggers re-run with same build settings          |
| Canary rollout                   | Partial traffic deployed, full after confirmation |

---

## 🔐 Secrets & Credentials

- All secrets and ENV values are pulled securely from **Vault Engine**.  
- Planner does **not persist** any secrets internally — it relies on real-time fetch and inject.

---

## 📦 Supported Targets

| Platform | Type                |
|----------|---------------------|
| Vercel   | Full-stack Serverless |
| Netlify  | Static/Edge           |
| Railway  | Backend + DB          |
| Docker   | Self-managed image    |
| AWS      | Custom production target |

---

## 🔄 Deployment Modes

| Mode        | Description                                |
|-------------|--------------------------------------------|
| dev         | Preview URL with logs                      |
| staging     | Pre-production validation                  |
| production  | Public-facing app                          |
| rollback    | Revert to older version                    |
| canary      | Deploy to partial traffic before full push |

---

## 🧩 Dependencies

| Engine             | Usage                                 |
|--------------------|----------------------------------------|
| Vault Engine        | Fetch ENV/tokens                      |
| Validation Engine   | Pre-check deploy validity             |
| Execution Engine    | Runs commands like build/push         |
| Environment Manager | Assigns version to env                |
| Monitoring Engine   | Tracks logs in real-time              |
| Cleanup Engine      | Cleans previous version (optional)    |
| Feedback Loop       | Notifies UI on deploy state           |

---

## 🛠️ Development Notes

- Each deploy generates a unique `version_id`  
- Can trigger automated re-deploy if ENV/token updates  
- Status logs are streamed to **Logs Engine** in real time  
- Supports “dry-run” mode (plan-only, no execution)

---

## 🧭 Summary

The Deployment Planner is the final activation point of the PURAIFY flow.  
It takes built systems and turns them into live software, fully deployed, monitored, and linked to environment managers and rollback logic.

> Without it — platforms stay theoretical.  
> With it — they're up and running, fast.
