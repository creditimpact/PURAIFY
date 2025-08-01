# PURAIFY Contribution Protocol

This protocol defines how both human developers and Codex contribute to the PURAIFY repository.  It ensures code and documentation stay in sync across engines and the project as a whole.
It complements the broader policies described in [SYSTEM_RULES.md](SYSTEM_RULES.md). Read both documents together to understand responsibilities and approval flows.

---

## 🧠 Purpose

PURAIFY is a modular multi‑engine platform.  **Every change to the codebase must be mirrored in the documentation** so the system remains:

- Understandable by humans and automated agents
- Traceable and easy to navigate
- Expandable without chaos
- Aligned with its own design principles

---

## 🤝 Working with Codex as a Team Developer

Codex participates in development just like a human contributor. Always:

- **Ask for clarification** when uncertain and log the question in `../communication/codex-questions.md` using `[Qx]` markers.
- **Report missing code or documentation** in the related `../communication/human-todo.md` file so a human contributor can provide the missing pieces.
- **Propose alternative solutions** through a todo entry or inline Codex Note when multiple approaches exist.
- **Tag blockers** with `🔧 Requires human` or `🌐 External constraint` in `../communication/human-todo.md` to signal where progress stops.
- **Seek approval for critical configuration or governance changes** before editing files. Record the approver and date.

Update questions and approvals once resolved so the history stays clear.

---

## ✅ Core Documentation Updates

Whenever you:

- Add, remove or rename a file
- Change engine behaviour or extend capabilities
- Introduce a new endpoint, engine or integration

You **must** update the following files:

### 1. Root `README.md`
- Reflect added or removed components in **📁 Project Structure**
- Update the engine list in **⚙️ Core Engines**

### 2. `SYSTEM_STATE.md`
- Record new engines or progress status (✅ / 🟡 / 🔲)
- List new endpoints and current capabilities

### 3. The affected engine’s `README.md` and `ENGINE_SPEC.md`
- Document new routes, responsibilities and integration points
- Keep the `📁 Engine Structure` tree and status information current

### 4. (Optional) `CHANGELOG.md`
- Use for versioned release notes if maintained

Before changing code, read the relevant engine's `ENGINE_SPEC.md` and `README.md` to confirm behaviour.  Update them alongside your commits and note the approver in the commit or todo when edits require sign off.

---

## ✍️ Format Guidelines

- Write in clear English using consistent Markdown headers
- Keep docs close to the code they describe
- Provide input/output examples for new endpoints

## 🔄 Continuous Documentation Sync

Every code change must be reflected in documentation during the same commit.

- Update affected `ENGINE_SPEC.md` and engine `README.md` files when implementing new routes or behaviour.
- Record approvals for spec updates in commit messages or in the todo entry that prompted the change.
- Verify specs and docs before coding to avoid drift.

## ⚠️ Violations

Changes that ignore this protocol may be rejected during review or CI checks.  The rules apply to all pull requests and Codex operations.

---

## 📌 Codex Task Files

The repository tracks Codex-related tasks and questions in three root documents.

- **`codex-todo.md`** – unified backlog for all engines. Update when adding or completing tasks.
- **`codex-proposed-actions.md`** – proposed architectural or configuration changes. Mirror updates in `PROPOSED_ACTIONS_LOG.md`.
- **`codex-questions.md`** – open questions for human clarification. Mark answers with `[Ax]` entries.

Always keep these files current so work remains visible across sessions.

---

## 📚 Work & Communication Map

This map shows where information lives and how contributors should communicate.

### Communication Documents

| Document & Path | Purpose | When to Update |
|-----------------|---------|----------------|
| [`codex-todo.md`](../communication/codex-todo.md) | Unified backlog for all engines | Add or complete tasks here. |
| [`codex-proposed-actions.md`](../communication/codex-proposed-actions.md) | Suggested system changes from Codex | Update when proposing or resolving an action. |
| [`codex-questions.md`](../communication/codex-questions.md) | Log of open architectural questions | Add `[Qx]` entries when uncertain. Humans reply with `[Ax]`. |
| [`PROPOSED_ACTIONS_LOG.md`](PROPOSED_ACTIONS_LOG.md) | History of environment/config changes | Mirror proposals from todo files and update after approval/execution. |
| [`human-todo.md`](../communication/human-todo.md) | Tasks requiring human intervention or missing context | Tag tasks with `🔧 Requires human` or `🌐 External constraint`. |
| [`SYSTEM_STATE.md`](SYSTEM_STATE.md) | Snapshot of engine progress | Update whenever features change. |
| [`codex-notes.md`](../communication/codex-notes.md) | Codex notes, questions, and process logs | Record internal observations. |
| `ENGINE_SPEC.md` (per engine) | Canonical behaviour specification | Keep in sync with code; propose edits via todo + log. |
| [`ENGINES_INDEX.md`](ENGINES_INDEX.md) | Registry of all engines and their status | Consult before assuming an engine exists. Do **not** auto‑update. |
| [`ENGINE_DEPENDENCIES.md`](ENGINE_DEPENDENCIES.md) | Declares runtime dependencies between engines | Update when new cross‑engine calls are added or removed. |
| [`NAMESPACE_MAP.md`](NAMESPACE_MAP.md) | Maps file and route names across engines | Reference to avoid conflicts when creating modules or endpoints. |
### Todo File Usage

- Use `../communication/codex-todo.md` for tasks Codex can complete autonomously.
  - Example: `[ ] Implement new token refresh logic in Execution Engine`
- Use `../communication/human-todo.md` for missing code or documentation and anything needing manual help.
  - Example: `[ ] Provide API spec for Vault integration 🔧 Requires human`


### Workflow Guidelines

1. **Start of a session** – read `SYSTEM_STATE.md`, `../communication/codex-notes.md`, `../communication/codex-todo.md`, `../communication/human-todo.md` and `../communication/codex-questions.md` for unresolved items.
2. **During work** – document new tasks in the appropriate todo file. For environment or configuration changes, add a proposal under `## Proposed Actions` and mirror it in `PROPOSED_ACTIONS_LOG.md`.
3. **When blocked or unsure** – create a `[Qx]` entry in `../communication/codex-questions.md` and record the blocking task in `../communication/human-todo.md` tagged with `🔧 Requires human` or `🌐 External constraint`.
4. **After completing a task** – mark the checkbox in the todo file, update engine READMEs and specs, and adjust `SYSTEM_STATE.md` progress and log new notes in `../communication/codex-notes.md`.
5. **End of session** – ensure all updates are committed and summarise outstanding todos so future sessions have context.

### System Memory Tools

- `SYSTEM_STATE.md` keeps a real-time view of engine status. `../communication/codex-notes.md` tracks all internal notes, questions, and logs.
- Todo files act as persistent memory of pending tasks. Together with the notes map they allow Codex to resume work seamlessly.
- `PROPOSED_ACTIONS_LOG.md` provides historical context for environment changes so configuration is never altered without approval.
- Open questions in these files represent tasks waiting for human input.  Codex will pause that work until feedback arrives, ensuring sessions remain connected over time.

### Recommendations

- Review this map regularly to stay oriented.
- Keep documentation changes close to code changes for traceability.
- When in doubt, prefer adding a question or todo rather than guessing. Clear communication keeps the system healthy.

---

## 🤖 Codex Responsibilities

### 🔍 Engine Awareness via `ENGINES_INDEX.md`

1. Check `ENGINES_INDEX.md` to see which engines exist and the required dependencies.
2. Never update this file automatically—it is manually maintained.
3. If a missing engine blocks a task, add a note to `../communication/human-todo.md` tagged with `🔧 Requires human` and wait for clarification.

### 🧠 Codex Notes and Self‑Tasks

Codex may create inline comment blocks or todo entries when encountering ideas or inconsistencies.

- Inline notes start with `/** 🧠 Codex Note:` and are meant for future context.
- When a note or todo is resolved, remove it and update the relevant docs.
- Record all active notes in `../communication/codex-notes.md` so future sessions can locate them.
- Do not store notes in `SYSTEM_STATE.md`; keep them only in `../communication/codex-notes.md`.
- If a task cannot be completed due to external limits, keep it open with the appropriate tag and document the blocker.

---

## 📘 `ENGINE_SPEC.md` – Engine Specification

Every engine must include an up‑to‑date `ENGINE_SPEC.md` describing:

1. **Engine goals and scope**
2. **API interfaces** with examples
3. **Dependencies and integrations**
4. **File structure/system map**

Before starting work, read the spec.  Propose changes via todo + `PROPOSED_ACTIONS_LOG.md` and wait for approval before editing the file.

Tests should verify behaviour against the spec.

---

## 📁 Folder & File Naming Conventions

- Entry file per engine: `src/index.ts`
- Todos are tracked centrally in `../communication/codex-todo.md` at the repository root
- Use descriptive module names like `token-service.ts`
- API routes follow the `/engine/action` pattern

| Expected File   | Purpose                                   |
|-----------------|-------------------------------------------|
| `src/index.ts`  | Express entry point for the engine        |
| `README.md`     | Engine overview and API documentation     |
| `ENGINE_SPEC.md`| Manual spec and design notes              |
| `../communication/codex-todo.md` (root) | Central task list for all engines |
| `tests/`        | Test suite location inside each engine    |


## 🛠 Engine Structure & Best Practices Checklist
For every engine in this system, ensure these items exist and remain current:

- **README.md** – explains the engine purpose and usage. Include examples and list available endpoints.
- **ENGINE_SPEC.md** – technical specification of all endpoints, key functions, data structures and dependencies. Document input/output schemas and error formats.
- **run-tests.js** and a /tests directory – at least one working unit or integration test demonstrating the engine logic.
- **Separated Logic Layer** – keep business logic in a dedicated module such as `actions.ts`, `logic.ts` or `service.ts` instead of inline in `src/index.ts`.
- **Engine Registration** – update `NAMESPACE_MAP.md` with the engine name, entry point and responsibilities, and declare dependencies in `ENGINE_DEPENDENCIES.md`.
- **Documentation of Dependencies** – document any use of other engines' APIs in both `README.md` and `ENGINE_SPEC.md`.
- **Synchronize Code, Tests and Docs** – any code or API change must be mirrored in docs and tests. Missing documentation or tests should be logged as a TODO.
---

## 🔗 `ENGINE_DEPENDENCIES.md` and Engine Independence

`ENGINE_DEPENDENCIES.md` lists which engines rely on others and the routes involved.  Keep it updated when new interactions are added.

Each engine must remain deployable and testable on its own.  Dependencies are managed only through documented interfaces and should not create direct code coupling.

---

## 📃 System Contracts and Question Log

- Consult [`SYSTEM_RULES.md`](SYSTEM_RULES.md) for policies on error handling, permissions, and security before any sensitive work.
- When rules are unclear, pause and ask for guidance in `../communication/codex-questions.md` rather than guessing.
- Use that same file to document design doubts or missing context. Human contributors reply using `[Ax]` labels so the conversation is archived.

---

## 🧪 Testing Strategy

- Place tests inside each engine’s `tests/` folder and expose an `npm run test` script.
- Run `npm test` whenever you modify engine logic.  Capture results in the pull request summary.
- If tests cannot run because dependencies fail to install or other environment limits, create a `codex-test-todo.md` in that engine noting the blocker and tag it with `🌐 External constraint`.

## 📊 Engine Progress & Phase Tracking

`SYSTEM_STATE.md` records progress percentage and phase for every engine.  Update it whenever functionality advances.

Phases:

| Phase             | Meaning                                   |
|-------------------|-------------------------------------------|
| 📁 Initialized    | Folder created, basic files exist         |
| 🔧 Routes Stubbed | API routes defined but logic incomplete   |
| 🔄 Logic Wired    | Core logic implemented and linked         |
| ✅ Integrated     | Connected to Gateway and other engines    |
| 🧪 Tested         | Automated tests passing                   |

---

## 🔁 Periodic Reflection Task

Every five tasks, scan the repository for undocumented code or mismatches with `SYSTEM_STATE.md`.  Record findings in `../communication/codex-todo.md` or under *Reflection Notes* in `SYSTEM_STATE.md`.

## 💬 Human Prompt Response Types

| Type          | Description                             | Action Codex Should Take              |
|---------------|-----------------------------------------|---------------------------------------|
| 🔧 Instruction | Clear command to execute                | Perform it, log result and update docs|
| ❓ Question    | Open‑ended question or clarification   | Answer only, no code changes          |
| 💡 Idea       | Concept or suggestion                   | Log to codex-todo.md under 💡 Ideas    |

## ✅ Example: Adding a new action to Execution Engine

1. Document the route and input/output in `execution/README.md`
2. Add a status line in `SYSTEM_STATE.md` under Execution
3. Confirm `execution/src/index.ts` exists and is mapped in the root `README.md`

## 🧭 Summary

| What You Did                        | Must Update                               |
|------------------------------------|-------------------------------------------|
| Added a new engine                  | Root `README.md`, `SYSTEM_STATE.md`       |
| Added endpoint to engine            | Engine `README.md`, `SYSTEM_STATE.md`     |
| Changed how Gateway routes          | `gateway/README.md`, root `README.md`     |
| Added feature across multiple engines | All relevant engine docs + root files  |

Keep PURAIFY structured and understandable.  Build like the system builds itself.

---

## 📌 Proposed Actions Workflow

1. Create an entry in `../communication/codex-proposed-actions.md` with a unique `[PA<n>]` tag.
   - Format it as `[PA<n>] Description. Impact: <short impact>. **Status: Proposed**`.
2. Mirror the proposal in `PROPOSED_ACTIONS_LOG.md` using the same ID and mark **Status: Proposed**.
3. Request human approval by leaving a note in the pull request or `../communication/codex-questions.md`.
4. If no response arrives, keep the proposal open and continue other tasks; do not execute.
5. Once approved, update both files to **Approved** with the approver name and date.
6. After implementing the change, mark **Executed** and record who executed it and when.

---

## 🗒️ Versioning and Changelog Management

`CHANGELOG.md`, if present, captures user-facing release notes.

- Update it when features or behaviour change in a way that affects end users.
- Group entries by version heading (e.g., `## v0.2.0`) with the date.
- Keep the log brief and link to pull requests for details.


