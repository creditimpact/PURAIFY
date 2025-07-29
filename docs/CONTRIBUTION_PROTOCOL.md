# PURAIFY Contribution Protocol

This protocol defines how both human developers and Codex contribute to the PURAIFY repository.  It ensures code and documentation stay in sync across engines and the project as a whole.

---

## 🧠 Purpose

PURAIFY is a modular multi‑engine platform.  **Every change to the codebase must be mirrored in the documentation** so the system remains:

- Understandable by humans and automated agents
- Traceable and easy to navigate
- Expandable without chaos
- Aligned with its own design principles

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

---

## ✍️ Format Guidelines

- Write in clear English using consistent Markdown headers
- Keep docs close to the code they describe
- Provide input/output examples for new endpoints

## ⚠️ Violations

Changes that ignore this protocol may be rejected during review or CI checks.  The rules apply to all pull requests and Codex operations.

---

## 📚 Work & Communication Map

This map shows where information lives and how contributors should communicate.

### Communication Documents

| Document & Path | Purpose | When to Update |
|-----------------|---------|----------------|
| [`codex-todo.md`](codex-todo.md) | Global backlog and reflection items | Add tasks or ideas spanning multiple engines. Mark complete when done. |
| `engines/*/codex-todo.md` | Engine‑specific todos following [`CODEX_TODO_FORMAT.md`](CODEX_TODO_FORMAT.md) | Track implementation tasks within that engine. |
| [`PROPOSED_ACTIONS_LOG.md`](PROPOSED_ACTIONS_LOG.md) | History of environment/config changes | Mirror proposals from todo files and update after approval/execution. |
| [`codex-questions.md`](codex-questions.md) | Log of open architectural questions | Add `[Qx]` entries when uncertain. Humans reply with `[Ax]`. |
| [`human-todo.md`](human-todo.md) | Manual steps requiring human help | Tag tasks with `🔧 Requires human` or `🌐 External constraint`. |
| [`SYSTEM_STATE.md`](../SYSTEM_STATE.md) | Snapshot of engine progress and the **Codex Notes Map** | Update whenever features or notes change. |
| `ENGINE_SPEC.md` (per engine) | Canonical behaviour specification | Keep in sync with code; propose edits via todo + log. |
| [`ENGINES_INDEX.md`](../ENGINES_INDEX.md) | Registry of all engines and their status | Consult before assuming an engine exists. Do **not** auto‑update. |
| [`ENGINE_DEPENDENCIES.md`](../ENGINE_DEPENDENCIES.md) | Declares runtime dependencies between engines | Update when new cross‑engine calls are added or removed. |
| [`NAMESPACE_MAP.md`](../NAMESPACE_MAP.md) | Maps file and route names across engines | Reference to avoid conflicts when creating modules or endpoints. |

### Workflow Guidelines

1. **Start of a session** – read `SYSTEM_STATE.md`, root `codex-todo.md` and any engine todo files you plan to modify. Check `codex-questions.md` for unresolved items.
2. **During work** – document new tasks in the appropriate todo file. For environment or configuration changes, add a proposal under `## Proposed Actions` and mirror it in `PROPOSED_ACTIONS_LOG.md`.
3. **When blocked or unsure** – create a `[Qx]` entry in `codex-questions.md` and tag related tasks with `🔧 Requires human` or `🌐 External constraint` in the todo list.
4. **After completing a task** – mark the checkbox in the todo file, update engine READMEs and specs, and adjust `SYSTEM_STATE.md` progress or notes.
5. **End of session** – ensure all updates are committed and summarise outstanding todos so future sessions have context.

### System Memory Tools

- `SYSTEM_STATE.md` keeps a real‑time view of engine status and houses the **Codex Notes Map** for tracking inline notes across files.
- Todo files act as persistent memory of pending tasks. Together with the notes map they allow Codex to resume work seamlessly.
- `PROPOSED_ACTIONS_LOG.md` provides historical context for environment changes so configuration is never altered without approval.

### Recommendations

- Review this map regularly to stay oriented.
- Keep documentation changes close to code changes for traceability.
- When in doubt, prefer adding a question or todo rather than guessing. Clear communication keeps the system healthy.

---

## 🤖 Codex Responsibilities

### 🔍 Engine Awareness via `ENGINES_INDEX.md`

1. Check `ENGINES_INDEX.md` to see which engines exist and the required dependencies.
2. Never update this file automatically—it is manually maintained.
3. If a missing engine blocks a task, add a note to `codex-todo.md` and wait for human clarification.

### 🧠 Codex Notes and Self‑Tasks

Codex may create inline comment blocks or todo entries when encountering ideas or inconsistencies.

- Inline notes start with `/** 🧠 Codex Note:` and are meant for future context.
- Engine folders can hold their own `codex-todo.md` for local tasks.
- When a note or todo is resolved, remove it and update the relevant docs.
- Track all active notes in `SYSTEM_STATE.md` under **Codex Notes Map** so future sessions can locate them.
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
- Todos file: `codex-todo.md` in each engine root (see [`CODEX_TODO_FORMAT.md`](CODEX_TODO_FORMAT.md))
- Use descriptive module names like `token-service.ts`
- API routes follow the `/engine/action` pattern

| Expected File   | Purpose                                   |
|-----------------|-------------------------------------------|
| `src/index.ts`  | Express entry point for the engine        |
| `README.md`     | Engine overview and API documentation     |
| `ENGINE_SPEC.md`| Manual spec and design notes              |
| `codex-todo.md` | Local task list for Codex                 |
| `tests/`        | Test suite location inside each engine    |

---

## 🔗 `ENGINE_DEPENDENCIES.md` and Engine Independence

`ENGINE_DEPENDENCIES.md` lists which engines rely on others and the routes involved.  Keep it updated when new interactions are added.

Each engine must remain deployable and testable on its own.  Dependencies are managed only through documented interfaces and should not create direct code coupling.

---

## 📃 System Contracts and Question Log

- Consult [`SYSTEM_RULES.md`](SYSTEM_RULES.md) before implementing cross‑engine behaviour or permission logic.
- Use [`codex-questions.md`](codex-questions.md) to document uncertainties.  Human contributors respond using the matching `[Ax]` labels.

---

## 🧪 Testing Strategy

- Place tests inside each engine’s `tests/` folder and expose an `npm run test` script.
- If tests cannot run due to environment limits, create a `codex-test-todo.md` in that engine noting the blocker.

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

Every five tasks, scan the repository for undocumented code or mismatches with `SYSTEM_STATE.md`.  Record findings in `codex-todo.md` or under *Reflection Notes* in `SYSTEM_STATE.md`.

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

1. Add a bullet under `## Proposed Actions` in the relevant `codex-todo.md` describing the change and impact.
2. Mirror the entry in `PROPOSED_ACTIONS_LOG.md` with **Status: Proposed**.
3. Wait for explicit human approval before applying the change.
4. After execution, update both the todo item and the log entry to **Executed** with the approver and date.

---

