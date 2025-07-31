# 🧠 Engine Spec: Validation Engine

---

## 🎯 Purpose

The **Validation Engine** serves as the structural “gatekeeper” for every platform and automation built in PURAIFY.  
Its job is to **ensure** that every Blueprint (created or edited in the Platform Builder, or submitted via API) is **syntactically and structurally valid** — before any logic gets executed.

It acts as the **first line of defense** against broken automations, data model issues, or logic errors — catching mistakes early and making the entire system safer and more predictable.

---

## ⚙️ Core Responsibilities

| Action                     | Description                                                                 |
|---------------------------|-----------------------------------------------------------------------------|
| 🧐 Validate Blueprint Structure | Checks that all required fields, entities, relations, and logic rules exist and are properly formed |
| 🔢 Type & Schema Checking     | Verifies correct data types, allowed values, array structures, and unique constraints |
| 🧩 Cross-Reference Checks     | Ensures all actions, triggers, and entities referenced actually exist in the Blueprint |
| 🛡️ Policy & Permission Checks | (Planned) Enforces platform, user, or org policies on Blueprint structure, field access, and logic use |
| 🔌 Integration Validation     | (Planned) Checks referenced integrations are properly connected and configured (e.g., Slack, Notion) |
| 🧪 Dry-Run Flows              | (Optional) Performs a non-executing simulation to check if logic is feasible given current Blueprint and integrations |

## 🚫 What It Does NOT Do

- ❌ Does not execute any Blueprint logic or automations (Execution Engine does that)
- ❌ Does not update or modify Blueprints (handled by Platform Builder)
- ❌ Does not authorize actions or API access (Engine Control’s responsibility)
- ❌ Does not store any data — validation is always stateless

## 🔗 Engine Integrations

| Engine            | Role                                                                 |
|------------------|----------------------------------------------------------------------|
| Platform Builder | Provides Blueprints and partial changes for validation on-the-fly    |
| Knowledge Engine | Stores Blueprint schemas and historical validation results           |
| Execution Engine | (Dry-run) Can simulate if an automation would pass validation before real execution |
| Vault Engine      | (Planned) Verifies required tokens for integrations exist before approving Blueprint |
| Monitoring Engine | Receives logs of failed/successful validations for audit/compliance |
| Engine Control    | Performs policy enforcement and advanced permission checks during validation |

## 📥 Input Example

```json
{
  "blueprint": {
    "entities": [
      { "name": "lead", "fields": [ "name", "email", "status" ] }
    ],
    "logic": [
      { "trigger": "status == hot", "action": "send_slack_message", "target": "#sales" }
    ],
    "ui": {
      "layout": "kanban",
      "group_by": "status"
    }
  }
}
```

## 📤 Output Example (Valid)

```json
{
  "valid": true,
  "errors": [],
  "warnings": []
}
```

## ❌ Output Example (Invalid)

```json
{
  "valid": false,
  "errors": [
    {
      "field": "logic[0].action",
      "reason": "Unknown action type: send_slak_message (did you mean send_slack_message?)"
    },
    {
      "field": "entities[0].fields[2]",
      "reason": "Missing required field: ‘owner’"
    }
  ],
  "warnings": [
    {
      "field": "ui.layout",
      "reason": "‘kanban’ layout requires at least one relation"
    }
  ]
}
```

## 🔄 Validation Flow

1. **Input Reception**  
   Receives Blueprint or partial Blueprint (single form, logic rule, etc.) for validation

2. **Schema Check**  
   Validates against expected Blueprint JSON schema

3. **Field & Type Check**  
   Ensures all required fields are present, data types match, constraints enforced

4. **Cross-Reference**  
   Checks all references to entities, fields, actions, and integrations are resolvable

5. **Policy Enforcement (if enabled)**  
   Applies organization or user-level validation rules (e.g., required fields, forbidden actions)

6. **Integration Validation (planned)**  
   Confirms referenced integrations are connected and tokens available

7. **Response Generation**  
   Returns result (valid/invalid) with detailed error and warning list

## 🧱 Internal Architecture

| Module               | Description                                                                       |
|----------------------|-----------------------------------------------------------------------------------|
| SchemaValidator       | JSON schema validation for entire Blueprint                                      |
| FieldChecker          | Checks for missing/extra fields, data type correctness, allowed values           |
| CrossReferenceEngine  | Validates references across logic, entities, fields, and integrations            |
| PolicyEnforcer        | Enforces validation rules, custom policies, and permission constraints           |
| IntegrationVerifier   | Confirms integrations/tokens are present and correct (future)                    |
| DryRunSimulator       | (Optional) Simulates logic without execution for feasibility checks              |
| ValidatorAPI          | Receives external validation requests (from UI, Gateway, other engines)         |

## 🌐 External & Internal Dependencies

| Service / Module      | Purpose                                                     |
|------------------------|-------------------------------------------------------------|
| Knowledge Engine       | Blueprint schema repository, stores validation logs        |
| Platform Builder       | Triggers validation after every edit/change                |
| Engine Control Core    | Policy definitions and permission schema                   |
| Vault Engine           | (Planned) Checks for required integration tokens           |
| Monitoring Engine      | Audit logging and error/warning telemetry                  |

### Current Implementation
The engine verifies that `trigger.type` exists and that the `actions` array contains at least one action with a `type` string.


## 👥 User Interaction Triggers

| Scenario                  | Trigger                                                                    |
|---------------------------|-----------------------------------------------------------------------------|
| Creating new entity/form  | User adds field or entity in Platform Builder — triggers live validation   |
| Editing logic/rules       | User modifies automation — triggers immediate schema and reference validation |
| Integrating a new service | Adding new integration — checks required tokens and permissions            |
| Publishing Blueprint      | Final validation before Blueprint can be deployed or executed              |
| API Blueprint submission  | Incoming Blueprint from external client via Gateway API                    |

## 📌 Key Notes

- Validation is stateless — each request is validated in full, no data is persisted  
- All error and warning messages are structured for direct display in UI  
- Supports live validation — every change in Platform Builder can trigger real-time feedback  
- Extensible policy layer — easy to add new rules or checks per customer/org  
- Every validation is logged to Monitoring Engine for compliance and debugging  

## 💡 Future Enhancements

- Advanced policy enforcement (row-level security, custom logic constraints)  
- Validation for integration scopes/permissions per Blueprint  
- Interactive “fix suggestions” in error/warning output (AI-powered)  
- Visual validation report (UI rendering of problems in context)  
- Real-time webhook to notify other engines on failed validation  
- Cross-Blueprint validation (checking dependencies between projects)  

## 🧠 Summary

The Validation Engine is the “QA gate” for every platform and automation in PURAIFY.  
It ensures no broken logic, missing fields, or invalid integration can reach execution.  
Stateless, rigorous, and extensible — it keeps platform creation safe and predictable for everyone, from builders to end-users.
