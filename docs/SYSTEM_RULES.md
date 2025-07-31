# ⚖️ PURAIFY System Rules — Flexible and Communicative

This document defines guiding principles and governance for the PURAIFY system with an emphasis on communication, understanding, and collaboration between Codex and human developers.  
It works **in tandem** with the [Contribution Protocol](CONTRIBUTION_PROTOCOL.md), which details day‑to‑day workflow steps and documentation requirements.

---

## ✅ General Principles

- Changes should maintain consistency and up-to-date documentation, but the system allows discretion and action even in uncertain situations.
- The system remains modular and extensible, allowing gradual experiments and changes.
- Priority is given to safety, clarity, and traceability, balanced with openness to learning and clarifications.
- All automated actions must be traceable, but actions are permitted when accompanied by comments or questions if there is uncertainty.
- Clear, communicative interaction with humans is critical — Codex must explain its reasoning and request help when needed.

---

## 🔄 Flow and Process Management

- Codex will follow defined blueprint flows but may deviate or propose alternatives when uncertain.
- For multi-step workflows, Codex maintains consistency but is flexible in actions between steps.
- Missing dependencies or unavailable resources will be clearly noted and documented, but Codex will try to continue operating where possible.
- State changes will be logged, with detailed explanations for any unusual or uncertain actions.

---

## 🔁 Handling Failures and Errors

- Upon failures, Codex will attempt retries using a flexible policy, communicating progress during retries.
- If retries fail, clear documentation and proposals for compensation or rollback will be added, including indications for human intervention.
- For partial successes, Codex will continue with accurate logging, even if the outcome is not perfect.

---

## 🔐 Permissions and Security

- Every action will have permission checks, but if permission status is unclear, Codex will add notes and questions instead of halting completely.
- Sensitive actions require additional approval, but Codex can propose communication methods to acquire this during execution.
- Codex will safeguard sensitive data and report anomalies immediately.

---

## 🧩 Validation and Assumptions

- Codex will validate blueprints before execution, but if uncertainties or missing parts are found, it will add detailed notes and request clarifications rather than stopping outright.
- Codex will verify existence of engines, actions, and integrations, and may propose tasks to complete missing parts.
- Blueprint changes will be accompanied by documentation updates and clear communication.

---

## 🧠 Communication and Reporting

- Codex will document all questions, ambiguities, and architectural notes in `codex-questions.md` with clear requests for clarification.
- Follow the formatting rules in the [Contribution Protocol](CONTRIBUTION_PROTOCOL.md) when adding `[Qx]` entries or todo items.
- Humans are expected to respond promptly, but Codex will continue working with partial information if no response is available.
- Codex will avoid repeating past mistakes by managing open questions and todos efficiently.
- Missing engines or resources will trigger todos but Codex will try to offer interim options where feasible.

---

## 🧪 Testing and Quality Assurance

- Codex will run automated tests when possible and maintain high standards but will allow marking tests as pending or unavailable with explanations.
- Testing status will be documented transparently with clear notes on missing coverage.

---

## 🔧 Documentation and Structure

- Codex will keep documentation close to the code and may add notes and explanations where certainty is lacking.
- Documentation will be clear, consistent, and continuously updated, with flexibility in how explanations are given.
- Significant infrastructure changes will be well documented with emphasis on communication.
- Engine-level todo files are forbidden. Track all tasks in the root `communication/codex-todo.md`.

---

## 🤝 Human Collaboration

- Codex will operate with open communication, reaching out with questions, suggestions, and clarifications.
- In cases of uncertainty, Codex will tag tasks with markers like `🔧 Requires human` but continue working as much as possible.
- All human interactions will be logged for ongoing tracking and improvement.

---

## 📜 Consistency and Alignment

- Codex will keep code and documentation consistent but allow controlled deviations with detailed explanations.
- All automated changes will be reversible and tracked.

---

## 📌 Additional Recommendations

- Encourage Codex to "think aloud" — add comments and explanations even when not strictly required.
- Ease creation of new tasks during runtime, including non-critical ones.
- Allow Codex to propose alternative approaches or interim solutions.
- Empower Codex to keep working with partial information to maintain momentum.

---

## 🚧 Handling Uncertainty & Blockers (Examples)

When Codex encounters a situation that is unclear or blocked:

1. **Document a question** in `codex-questions.md` using the `[Qx]` format.
2. **Tag a todo** with `🔧 Requires human` or `🌐 External constraint` in the appropriate `communication/codex-todo.md` file.
3. **Continue work where possible**, noting any assumptions or temporary workarounds in comments.

Example:

```
// 🧠 Codex Note: Missing `VAULT_SECRET`. Added [Q8] in codex-questions.md.
```

This approach keeps progress visible and encourages quick human feedback.

---

## Engine Independence and Dependencies

- Each engine **must be developed, tested, and deployable independently**, ensuring modularity and maintainability.
- Engines **may declare dependencies on other engines**, but these dependencies must be:
  - Clearly documented in the `ENGINE_DEPENDENCIES.md` file.
  - Managed exclusively via defined interfaces and API contracts.
- Codebases of different engines must remain **isolated** with no direct internal code coupling.
- Testing of each engine should be possible without requiring the entire system to run.
- This approach ensures flexibility and avoids tight coupling, while enabling modular development and integration.


## 🛑 Approval Requirement for Critical Changes

- Codex **must** request explicit human approval **before making any changes to critical system configurations or environment settings**, including but not limited to:
  - Docker and deployment configurations
  - Core environment variables and `.env` files
  - Contribution protocols, system governance rules, or changelogs
  - Engine dependencies and orchestration files
  - Any files or settings explicitly marked with approval flags (e.g., in `PROPOSED_ACTIONS_LOG.md` or similar)
- For **all other code changes**, including internal logic, bug fixes, refactors, and engine-specific updates, Codex is **allowed to proceed autonomously without prior approval**.
- This approach ensures agility in development while maintaining strict control over critical infrastructure and configuration aspects.
- When approval is needed, follow the **Proposed Actions Workflow** outlined in the [Contribution Protocol](CONTRIBUTION_PROTOCOL.md#-%EF%B8%8F-proposed-actions-workflow) and mirror updates in `PROPOSED_ACTIONS_LOG.md`.

---

For day-to-day guidance, refer to the [Contribution Protocol](CONTRIBUTION_PROTOCOL.md) which expands these rules with concrete steps.

Thank you for the collaboration,
**PURAIFY System Governance (Flexible and Communicative)**
