# 🧠 Engine Spec: Feedback Loop Engine

---

## 🎯 Purpose

The **Feedback Loop Engine** serves as the user’s safety net within the PURAIFY system.  
Its mission is to **pause**, **explain**, and **ask for approval** before the system executes sensitive or high-impact actions.

It ensures transparency, control, and trust — by turning automation into a **conversation**, not a black box.

Typical use cases:
- Asking for permission before mass emails or destructive changes  
- Offering corrections or completions for invalid flows  
- Explaining why a step was paused and what options exist  

---

## ⚙️ Core Responsibilities

| Action               | Description                                                  |
|----------------------|--------------------------------------------------------------|
| ✅ Request User Approval | Prompt user before executing critical action                 |
| 🧠 Provide Human Context | Explain why system paused or flagged something               |
| 🔄 Suggest Fixes         | Offer smart completions or alternatives                      |
| ⛔ Pause on Condition    | Hold action until manual confirmation                        |
| 💬 Track Decisions       | Remember user preferences for future automation             |

## 🚫 What It Does NOT Do

- ❌ Does not execute the action — only intercepts and pauses  
- ❌ Does not decide if action is allowed — that’s Engine Control  
- ❌ Does not implement corrections — only suggests and requests approval  

## 🔗 Engine Integrations

| Engine             | Role                                                                 |
|--------------------|----------------------------------------------------------------------|
| Execution Engine   | Pauses critical executions for user input                            |
| Validation Engine  | Suggests corrections after failed checks                             |
| Logs Engine        | Logs all approvals and rejections                                    |
| Platform Builder   | Flags destructive changes (e.g. removing triggers)                   |
| Knowledge Engine   | Supplies context and possible completions                            |
| AI Layer           | Crafts messages and suggestions for human readability                |

## 📥 Input Example — Action Approval

```json
{
  "user_id": "u_123",
  "project_id": "pf_456",
  "type": "action_approval",
  "reason": "הפעולה תשלח מיילים ל-300 משתמשים",
  "action": "send_mass_email",
  "default": "paused"
}
```

## 📤 Output Example — User Response

```json
{
  "status": "approved",
  "user_id": "u_123",
  "action": "send_mass_email",
  "timestamp": "2025-07-25T15:30:00Z",
  "remember_decision": true
}
```

## 🔄 Flow Example: Critical Deletion

**Input:**

```json
{
  "user_id": "user_923",
  "action": "delete_project",
  "risk_level": "high",
  "requires_confirmation": true,
  "suggestion": "אפשר לשמור Snapshot לפני?"
}
```

**Process:**
- Action Interceptor halts the deletion  
- User Prompt Dispatcher shows: “Delete project? Want to create snapshot first?”  
- User selects: `create_snapshot_first`  
- Resolution Tracker logs decision  
- Outcome depends on user input  

**Output:**

```json
{
  "proceed": false,
  "user_choice": "create_snapshot_first",
  "reason": "user_preference"
}
```

## 🧱 Internal Architecture

| Module                | Description                                               |
|------------------------|-----------------------------------------------------------|
| Action Interceptor     | Listens to high-risk or invalid actions                  |
| Suggestion Engine      | Generates fix/completion options                         |
| User Prompt Dispatcher | Sends prompts to UI, Slack, or email                     |
| Resolution Tracker     | Logs decisions and preferences                           |
| Adaptive Learning Core | Learns user patterns to reduce noise                     |

## 🌐 External Dependencies

| Service         | Purpose                                       |
|------------------|-----------------------------------------------|
| Slack / Email UI | Sends approvals & receives replies            |
| Internal UI      | Dashboard notifications & prompts             |
| OTP / Auth System| For secure confirmations                      |

## 👥 User Interaction Triggers

| Scenario           | Trigger                                                 |
|--------------------|----------------------------------------------------------|
| Risky action       | "This will affect all users. Are you sure?"              |
| Destructive change | "Deleting this will remove data. Confirm?"              |
| Missing config     | "No Gmail integration found. Add it now?"               |
| Infinite logic loop| "Detected circular dependency. Stop?"                   |

## 💡 Smart Behavior

- 🕒 Supports pending queue — pauses action until user responds  
- 🔁 Learns from user history — reduces prompts over time  
- 🗂️ Logs all prompts/responses — for audit and UX  
- 🔐 Optional 2FA / OTP flows for sensitive steps  

## 🧠 Summary

The Feedback Loop Engine is your system’s human guardian.  
It ensures users feel safe, informed, and in control — even in a fully automated environment.  

It’s not just UX — it’s operational safety and trust, built into every flow.
