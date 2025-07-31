# 🧠 Engine Spec: Deployment Planner

---

## 🎯 Purpose

The **Deployment Planner Engine** is responsible for transforming a completed platform into a live, running system.  
It handles planning, packaging, and launching platforms based on user configuration — including infrastructure selection, environment setup, build execution, and domain integration.

It is the final step between “what the user built” and “a deployed, working platform.”

---

## ⚙️ Core Responsibilities

| Action                 | Description                                                      |
|------------------------|------------------------------------------------------------------|
| 📦 Create Deployment Plan | Defines the strategy: cloud, local, preview-only                 |
| 🛠 Choose Infrastructure | Selects deployment target: Vercel, Netlify, Docker, etc.         |
| 🔐 Prepare Configs        | Injects ENV vars, secrets, webhooks via Vault                   |
| 🚀 Execute Deployment     | Triggers build, publish, integration                            |
| 📊 Return Status & Report | Returns URLs, logs, success/failure info                        |

## 🚫 What It Does NOT Do

- ❌ Does not validate blueprint structure → done by Validation Engine  
- ❌ Does not generate code → done upstream by builders  
- ❌ Does not authorize user actions → enforced by Engine Control  

## 🔗 Engine Integrations

| Engine             | Role                                                               |
|--------------------|---------------------------------------------------------------------|
| Vault Engine       | Fetches secrets, tokens, ENV values                                |
| Execution Engine   | Triggers actual deployment commands                                |
| Project Composer   | Supplies the finalized project and structure                       |
| Environment Manager| Decides which version/environment to use                           |
| Monitoring Engine  | Tracks status and logs of deployments                              |
| Feedback Loop      | Notifies user about success, failure, or manual steps              |

## 📥 Input Example

```json
{
  "user_id": "u-1024",
  "project_id": "pf-789",
  "deployment_type": "cloud_saas",
  "tech_stack": ["Next.js", "MongoDB", "Stripe"],
  "environment": {
    "ENV": "production",
    "REGION": "us-east-1"
  }
}
```

## 📤 Output Example (Success)

```json
{
  "status": "success",
  "deployed_to": "vercel",
  "dashboard_url": "https://mycourse.vercel.app",
  "env_configured": true,
  "next_steps": ["Connect domain", "Create admin user"]
}
```

## ❌ Output Example (Failure)

```json
{
  "status": "error",
  "reason": "Missing ENV: STRIPE_SECRET_KEY",
  "stage": "env_setup",
  "fix_suggestion": "Add Stripe key to Vault under 'platform-a'"
}
```

## 🔄 Deployment Flow

**Sample Input:**

```json
{
  "project_id": "pf_311",
  "target_env": "production",
  "deployer_id": "user_129",
  "version_name": "v3.2"
}
```

**Internal Flow:**

- Validation check → confirm readiness to deploy  
- Vault lookup → retrieve tokens, ENV, secrets  
- Planner builds deploy config: build type, infra, stack, region  
- Build Packager generates ready-to-run bundle (Docker image, ZIP, etc.)  
- Executor deploys to cloud/host platform  
- Environment Manager registers the deployment  
- Feedback Engine updates the user  
- Monitoring & Logs record full trace  

## 🧱 Internal Architecture

| Component              | Role                                         |
|------------------------|----------------------------------------------|
| Pre-Deployment Checker | Validates readiness before deploying         |
| Resource Planner       | Selects infra, allocates memory, routes      |
| Build Packager         | Generates deployment package                 |
| Deployment Executor    | Performs the actual deploy                   |
| Rollback Coordinator   | Reverts to previous version if needed        |

## 🌐 External Dependencies

| Service     | Purpose                          |
|-------------|----------------------------------|
| Vercel      | SaaS Deployment Target           |
| Netlify     | Static Website Deployment        |
| Railway     | Full-stack Hosting               |
| AWS / GCP   | Production Infra (custom)        |
| Vault Engine| Secrets Management               |
| Logs Engine | Execution logging and audit      |

## 👥 User Interaction Triggers

| Scenario               | Trigger                                 |
|------------------------|------------------------------------------|
| Deploy from Codux UI   | User clicks “Deploy to Production”       |
| Auto-deploy after edit | Triggered via webhook or rule            |
| Manual redeploy        | User requests rollback or re-publish     |

## 💡 Deployment Modes Supported

- ✅ Development (Preview / Local)  
- ✅ Staging (Intermediate QA)  
- ✅ Production (Live public system)  
- ✅ Canary / Gradual Rollouts  
- ✅ Rollback / Restore previous version  

## 🔐 Security Considerations

- Tokens and ENV retrieved securely from Vault  
- No user credentials are persisted  
- All actions are audited and logged  

## 🧠 Summary

The Deployment Planner is the final step in bringing a user's platform to life.  
It bridges the gap between "blueprint" and "live service" — choosing infrastructure, resolving configs, and executing deployment flows.

Like hitting “Publish” — but with full automation, control, and traceability.
