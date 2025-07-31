# ✅ Validation Engine

> This engine is part of the PURAIFY system. For the full platform architecture, see the main [README.md](../../README.md).

---

## 🧠 Overview

The **Validation Engine** is responsible for ensuring that every Blueprint in PURAIFY is **syntactically valid, structurally complete, and internally consistent** before execution.

It acts as a critical **quality gate** between the Platform Builder and the Execution Engine.  
It verifies schema structure, required fields, valid references, and (in the future) policy compliance and integration availability.

Currently, the engine performs minimal checks (e.g., presence of `actions` array), but is designed to scale into a full schema and policy validator.

---

## 📁 Engine Structure

```text
validation/
├── package.json
├── tsconfig.json
├── README.md
├── ENGINE_SPEC.md
├── codex-todo.md
├── run-tests.js
├── src/
│   ├── index.ts
│   ├── schema.ts       # Blueprint interfaces and result types
│   ├── validator.ts    # Core validation logic
│   └── policy.ts       # Future: permission / policy enforcement
└── tests/
    ├── sample.test.js
    └── codex-test-todo.md
```

Tests for this engine live under `validation/tests/`.

---

## 🚀 Development Setup

Requires Node.js v20+

```bash
npm ci
npm run dev
npm run test
```

Use the shared `.env` file (`../../.env.example`) to configure:

- `VALIDATION_PORT`
- `KNOWLEDGE_URL` (optional future dependency)
- `ENGINE_CONTROL_URL` (optional future policy checks)

Use `npm ci --prefer-offline` if installing without internet access.

---

## ⚙️ API Endpoint

**POST /validation/check**
Validates a Blueprint object.

**Current behavior:** checks for `trigger.type`, ensures actions are known (`log_message`, `send_slack`, `http_request`, `create_sheet`), and validates required parameters. Returns structured `{ valid, errors, warnings }`.
**Planned:** expand to type checking, cross-reference validation, policy rules, and token availability.

### Request Body

```json
{
  "blueprint": {
    "actions": [
      { "type": "log_message", "params": { "message": "Hello" } }
    ]
  }
}
```

### Successful Response

```json
{
  "valid": true,
  "errors": [],
  "warnings": []
}
```

### Invalid Example

```json
{
  "valid": false,
  "errors": [
    {
      "field": "actions[0].type",
      "reason": "Unknown action type: 'log_mesage'"
    }
  ],
  "warnings": []
}
```

---

## 🧩 Role within the PURAIFY System

- **Input:** Blueprint JSON object (usually from Platform Builder or Gateway).
- **Output:** A validation result with structured `valid`, `errors`, and `warnings` keys.
- **Consumers:** Gateway (for validation before deploy), Platform Builder (for live feedback), Execution Engine (for dry-run checks).

### Typical Flow

1. Builder generates a new Blueprint  
2. Gateway sends it to `POST /validation/check`  
3. Validation Engine parses and checks schema  
4. If valid: execution proceeds  
5. If invalid: response includes structured error list for UI  

---

## 🛠️ Internals & Responsibilities

- **Schema Validation:** Ensures required fields exist (actions, triggers, etc.)
- **Type Checking:** Validates data types for common fields (planned)
- **Cross-Reference:** Ensures that action references (e.g., entities, fields) exist (planned)
- **Policy Checks:** Future enforcement of platform-level or org-level policies
- **Dry Run Capability:** Simulate execution feasibility (planned)
- **Token Verification:** Ensure Vault credentials exist for integration-based actions (planned)

---

## 📦 Technologies

- Node.js (TypeScript)
- Express.js for routing
- Zod or JSON Schema (planned)
- dotenv / internal config

---

## 🚧 Development Notes

Current implementation is minimal for MVP validation.

**Future roadmap includes:**

- Full blueprint JSON schema support
- Integration with Engine Control for policy enforcement
- Integration with Knowledge Engine for reference validation
- Live validation support (per-form, per-logic rule)

---

## 🧪 Testing

Run tests from the engine root:

```bash
npm run test
```

All test cases are located in `validation/tests/`.

Future versions will include full unit and schema coverage with mocks for external engine calls.

---

## 🧪 Example Use Cases

| Scenario                              | Description                                                        |
|---------------------------------------|--------------------------------------------------------------------|
| User edits form in Platform Builder   | Live validation triggers and checks Blueprint                      |
| Gateway receives full Blueprint from UI | Performs validation before allowing publish/deploy               |
| Developer sends invalid field via API | Receives structured validation errors in response                  |
| Blueprint refers to unknown action    | Validation Engine blocks with helpful error message                |

---

## 🧩 Dependencies

| Engine / Service      | Purpose / Integration                                 |
|------------------------|-------------------------------------------------------|
| Platform Builder       | Sends generated Blueprints for validation            |
| Gateway                | Relays validation results to clients                 |
| Knowledge Engine       | (Planned) Provides schema definitions, context       |
| Vault Engine           | (Planned) Verifies integration tokens exist          |
| Engine Control Core    | (Planned) Enforces permission/policy-based validation|
| Monitoring Engine      | Logs validation attempts and errors |

---

## 🧭 Summary

The Validation Engine is the quality filter between idea and execution.  
It ensures that everything PURAIFY runs is valid, secure, and complete.

As the platform grows, this engine will become the enforcer of standards,  
integrity, and policy — helping builders and clients avoid bad automations.
