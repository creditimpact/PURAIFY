# ⚖️ PURAIFY System Rules

This file defines high-level system behavior policies and governance for the PURAIFY platform.  
Codex **must** consult this file before performing complex orchestration, error handling, or assumptions.

---

## ✅ General Principles

- All system changes must maintain consistency across code and documentation.  
- Preserve system modularity, scalability, and backwards compatibility.  
- Codex should always prioritize safety, clarity, and traceability over speed.  
- Automated changes must be fully reversible and auditable.  
- Clear communication is mandatory when human intervention or clarification is needed.  
- Codex must log all uncertainties, questions, or architectural doubts to `codex-questions.md`.

---

## 🔄 Flow Execution Rules

- Codex executes flows strictly according to defined blueprint logic.  
- Multi-step workflows must follow explicit orchestration sequences; no implicit assumptions.  
- Missing dependencies or resources cause Codex to pause and log todos instead of guessing.  
- All state changes and side effects must be logged and tracked consistently.  
- Parallel or asynchronous steps must maintain data integrity and consistency.

---

## 🔁 Retry & Failure Logic

- Failed steps should trigger retries with exponential backoff or configured policies.  
- Exhausted retries must invoke failure handlers or fallback mechanisms.  
- Failures require detailed logging and human notification for persistent issues.  
- Partial successes, rollbacks, and compensations must be clearly documented and align with blueprint expectations.

---

## 🔐 User Consent & Authorization Policies

- Every action requires valid authorization tokens or engine credentials.  
- Unauthorized or expired requests must be rejected immediately with clear error messages.  
- Sensitive operations require explicit user consent or secondary approval workflows.  
- Codex must verify all permissions before execution and log authorization outcomes.  
- Maintain secure audit trails of user consent.

---

## 🧩 Blueprint Assumptions & Validation

- Blueprints must be validated for correctness before execution.  
- Codex must consult the Validation Engine or equivalent for blueprint integrity.  
- Missing or ambiguous blueprint elements cause execution to halt with detailed logging.  
- Codex must verify existence and enabled status of referenced engines, actions, and integrations.  
- Blueprint changes must trigger re-validation and documentation updates.

---

## 🧠 Codex Communication & Reporting

- Codex logs all architecture questions, uncertainties, and anomalies to `codex-questions.md`.  
- Human contributors review and respond promptly to these logs.  
- Codex avoids repeating failures on unresolved issues by tracking open questions.  
- Missing engines, dependencies, or critical resources trigger todos in `codex-todo.md` awaiting human input.  
- Clear escalation paths and guidance must be documented and followed.

---

## 🔄 Dependency & Engine Management

- Codex must always consult `ENGINES_INDEX.md` before cross-engine tasks.  
- If a required engine is missing or disabled, Codex must not proceed automatically.  
- Codex may propose scaffolding or todos but must not add engines without explicit instructions.  
- Engine dependencies must be declared and updated in `ENGINE_DEPENDENCIES.md`.  
- Route or contract changes must be promptly reflected in documentation.

---

## 🧪 Testing & Quality Assurance

- Every engine must have automated unit and integration tests.  
- Codex should run tests when modifying engines or logic.  
- If unable to run tests (e.g., environment limits), Codex creates a `codex-test-todo.md` with explanation.  
- Test coverage and status tracked in `SYSTEM_STATE.md`.  
- Code changes must not degrade coverage or break functionality without documented exceptions.

---

## 🔧 Structural & Documentation Guidelines

- Follow strict naming conventions and folder structures.  
- Documentation must be clear, consistent, and kept close to code.  
- Codex must update root and engine-level `README.md`, `SYSTEM_STATE.md`, and relevant docs on changes.  
- Major refactors require coordinated multi-file documentation updates.  
- Include blueprint and API examples where applicable.

---

## 🗂️ Versioning & Change Tracking

- Log significant changes with version numbers and dates in `CHANGELOG.md`.  
- Maintain traceability of merges, pull requests, and commits.  
- Deprecated engines/features must be clearly marked and removed following deprecation policy.

---

## 📌 Environment Change Approval Workflow

- Codex must track every proposed modification to environment setup, configuration, dependencies, or protocols.
- Log each proposal in `codex-todo.md` under a new heading `## Proposed Actions` with its description, rationale, and expected impact.
- Do not implement the change until a human explicitly approves with "YES".
- Upon approval, update the environment, document the action with date and approver, and mark the item complete.
- If rejected or unanswered, keep the proposal pending and note the outcome.
- All environment changes must remain version-controlled for auditability.
---

## 🛡️ Security & Privacy Guidelines

- All data access and mutations must comply with system-wide security policies.  
- Sensitive data must be handled according to encryption and access control rules.  
- Codex must avoid exposing sensitive information in logs or outputs.  
- Any detected security anomalies must trigger immediate alerts and human review.

---

## 🔍 Continuous Monitoring & Alerts

- Codex must report abnormal patterns, repeated failures, or performance degradation.  
- Critical issues or repeated user-impacting failures require immediate escalation.  
- Monitoring metrics should be updated regularly to reflect engine health and usage.

---

## 🕒 Performance & Resource Management

- Codex should monitor resource usage and avoid long-running blocking operations.  
- Retries and workflows should consider rate limits and system load.  
- Parallelization must be balanced with resource constraints and data consistency.

---

## 🧩 Blueprint & Data Schema Evolution

- Changes to blueprint schemas require backward compatibility checks.  
- Codex must validate version compatibility before applying changes.  
- Migration steps or warnings should be documented and triggered automatically when needed.

---

## 📚 Documentation & Knowledge Sharing

- Codex should log architectural decisions and rationale for future reference.  
- Major protocol or design changes must be documented clearly and shared with stakeholders.  
- Codex must reference official documentation in all generated code or API contracts.

---

## ⚙️ Operational Continuity & Recovery

- Codex must maintain state checkpoints to enable recovery after failures.  
- In case of partial failure, recovery or compensation logic should be applied where possible.  
- System-wide fallback strategies must be documented and invoked when necessary.

---

## 🤝 Human Collaboration & Feedback

- Codex should solicit human input when ambiguities or conflicts arise.  
- All human responses must be logged and incorporated in subsequent runs.  
- Clear guidelines for escalation and intervention must be maintained.

---

## 📜 Compliance & Auditability

- All operations must be auditable with timestamps, user/engine IDs, and outcomes.  
- Codex must comply with relevant regulatory requirements (e.g., GDPR, HIPAA if applicable).  
- Audit logs must be securely stored and accessible for review.

---

Thanks,  
**PURAIFY System Governance**
