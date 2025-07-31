# 🧠 Engine Spec: Project Composer Engine

---

## 🎯 Purpose

The **Project Composer Engine** is the smart completion assistant of PURAIFY.

It helps users move from a partial platform to a fully composed, production-ready structure by:
- Detecting missing components
- Recommending logical flows
- Suggesting best-practice architectures
- Connecting isolated elements into a working system

It acts as the “Build With Me” companion — helping users complete what they’ve started.

---

## ⚙️ Core Responsibilities

| Action               | Description                                                          |
|----------------------|----------------------------------------------------------------------|
| 🔧 Detect Missing Parts | Finds gaps in the platform (e.g. no auth, no submit handlers)         |
| 🧱 Suggest Architecture | Recommends structure based on platform goal (e.g. CRM, LMS)          |
| 🔄 Auto-complete Flows  | Proposes full trigger-action chains                                |
| 🧰 Provide Templates     | Suggests UI/API/component templates                                 |
| 📦 Assemble Working Setup | Connects user-built pieces into a consistent structure              |

## 🚫 What It Does NOT Do

- ❌ Does not force changes — suggestions only  
- ❌ Does not execute or validate proposals  
- ❌ Does not assume correctness — leaves that to the Validation Engine  

## 🔗 Engine Integrations

| Engine              | Role                                                      |
|---------------------|-----------------------------------------------------------|
| Knowledge Engine    | Provides current state of the project                     |
| Validation Engine   | Verifies proposals for schema and logic                   |
| Platform Builder    | Presents proposals to the user                            |
| Integration Manager | Offers to install required integrations                   |
| AI Interaction Layer| Provides natural explanations and queries                 |
| Feedback Loop Engine| Asks the user for approval on suggestions                 |

## 📥 Input Example

```json
{
  "user_id": "u_788",
  "platform_name": "MyCoursePro",
  "existing_parts": {
    "db_schema": "...",
    "forms": ["courseForm", "signupForm"]
  },
  "platform_goal": "פלטפורמה לניהול קורסים",
  "connected_integrations": ["Stripe", "Zoom"]
}
```

## 📤 Output Example

```json
{
  "missing_components": ["User Auth", "Admin Panel", "Webhook Handler"],
  "suggested_flows": [
    "On signup → create course enrollment",
    "On payment success → send Zoom link"
  ],
  "recommended_integrations": ["Mailchimp"],
  "component_templates": {
    "auth": "JWT with role-based scopes",
    "api": ["getCourse", "enrollUser", "sendCertificate"]
  }
}
```

## 🔄 Internal Flow

**Sample Input:**

```json
{
  "project_id": "pf_9001",
  "structure": {
    "entities": ["LeadForm"],
    "logic": [{ "trigger": "form_submit" }],
    "integrations": ["Slack"]
  }
}
```

**Step-by-Step:**
- Gap Detector identifies missing action for the trigger.
- Pattern Matcher notices similar platforms send to Slack and Airtable.
- Scaffolder proposes: `append_row → Airtable`.
- Feedback Loop asks: “Add Airtable step?”
- If confirmed, flow is added and marked as `draft_complete`.

**Output:**

```json
{
  "added_logic": [
    {
      "trigger": "form_submit",
      "action": "append_row",
      "platform": "Airtable",
      "target": "Leads Table"
    }
  ],
  "status": "draft_complete"
}
```

## 🧱 Internal Architecture

| Module                  | Description                                               |
|--------------------------|-----------------------------------------------------------|
| Gap Detector             | Analyzes blueprints for missing parts                     |
| Smart Scaffolder         | Suggests completions via templates and common flows       |
| AI Pattern Matcher       | Uses AI to compare with similar projects                  |
| Pre-Deployment Assembler | Builds unified structure before run                       |
| Version-aware Composer   | Adjusts output per environment (dev/staging/prod)         |

## 🌐 External Dependencies

| Service                | Purpose                                                  |
|------------------------|----------------------------------------------------------|
| GPT / AI Models        | Pattern matching, natural suggestions                    |
| Internal Blueprint DB  | Reference common patterns and solutions                  |
| Vault / Integration Manager | Credential/integration installation                 |

## 👥 User Interaction Triggers

| Scenario             | Trigger                                                            |
|----------------------|---------------------------------------------------------------------|
| During build         | “You added a form — add submit handler?”                           |
| Before deployment    | “This button does nothing — add email logic?”                      |
| With AI Suggestion   | “Similar apps also notify Teams — add this?”                       |
| On new project       | “Create starter kit for lead tracking platform?”                   |

## 💡 Future Enhancements

- Context-aware prioritization of suggestions  
- Visual suggestion preview in builder UI  
- Auto-sync with real usage analytics for better patterns  
- Support for undo/rollback per suggestion  
- Confidence scoring on each suggestion  

## 🧠 Summary

The Project Composer Engine is PURAIFY’s intelligent completion and assembly assistant.

It helps users finish what they started, improve what they forgot, and align platforms to proven practices — with no extra effort.

It doesn’t guess. It doesn’t enforce.  
It composes platforms with care.
