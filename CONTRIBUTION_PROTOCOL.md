# PURAIFY Contribution Protocol

This document defines the required standards for contributing code and documentation to the PURAIFY system — either by human developers or automated agents (such as Codux or GPT).

The goal is to maintain a consistent, traceable, and fully documented codebase that is always in sync with its implementation state.

---

## 🧠 Purpose

PURAIFY is a modular, multi-engine system. For this reason, **every code change must include proper documentation updates** — across system-level and engine-specific files.

This ensures the system is:
- Understandable to AI agents (e.g., Codux)
- Traceable by contributors
- Expandable without chaos
- Aligned with its own blueprint principles

---

## ✅ Mandatory Actions for Every Contribution

Every time you:
- Add a file, endpoint, engine, or integration
- Remove or rename a file
- Change engine behavior
- Extend system capabilities

You **must update the following files**:

---

### 1. `README.md` (Root)

- Add/Update entries in the **📁 Project Structure** section
- Update the engine list in **⚙️ Core Engines** (add/remove/change status)
- Reflect new or removed components clearly

---

### 2. `SYSTEM_STATE.md`

This file reflects the current operational snapshot of PURAIFY.

Update it to:
- Add new engines or mark progress (✅ / 🟡 / 🔲)
- Add new endpoints
- Show current status (e.g., “under construction”, “ready”, “connected to gateway”)
- Track live capabilities

---

### 3. The relevant engine’s `README.md`

If you touch a specific engine:
- Add the new route to the API documentation
- Update its capabilities and responsibilities
- Clarify integration points if modified

#### 🔄 Per-Engine Structure Maintenance

Whenever you:
- Add, remove or reorganize files/folders inside an engine
- Change entrypoints, core logic files, or structure

You **must update** that engine’s `README.md` to reflect the new structure.

Each engine’s README must include:
- A `📁 Engine Structure` section with an updated tree view
- Short explanation of key files

#### 🔄 Engine Development Tracking

Whenever you are actively working on an engine — adding features, wiring
connections, refactoring logic, or developing endpoints — you **must update**
that engine’s `README.md` to reflect:
- The engine’s current role and capabilities
- Which features/endpoints are implemented, in progress, or planned
- Any current connections to other engines (e.g. “This engine now interacts with
  the Execution engine via X endpoint”)
- The current development status (even partial or WIP)
- Any assumptions or architectural decisions made so far

This keeps each README as a *live mirror* of the engine’s real state.

---

### 4. Optional: Add to `CHANGELOG.md` (future)

You may log versioned changes here for long-term releases.

---

## ✍️ Format Guidelines

- All documentation must be written in clear English.
- Use consistent Markdown headers and formatting (e.g., `##`, tables, code blocks).
- Keep documentation close to the code it describes.
- Use examples (inputs/outputs) when defining new endpoints.

---

## ⚠️ Violations

Changes that do not follow this protocol will be flagged and rejected — whether by human reviewers or future CI checks.

This protocol is required for all code merges, pull requests, or AI-generated changes.

---

## 🤖 Codux/GPT Integration

When working with Codux or similar systems:
- Start each prompt with:  
  `Please follow the PURAIFY Contribution Protocol.`  
- Make sure to instruct Codux to **update all documentation** as part of the request.
- Ensure `README.md`, `SYSTEM_STATE.md`, and engine docs reflect changes accurately.

---

## 🤖 Codex Responsibilities

### 🔍 Engine Awareness via ENGINES_INDEX.md

Before performing tasks involving cross-engine logic, Codex must:

1. Check for the presence of `ENGINES_INDEX.md` in the root directory.
2. Use this file to determine:
   - Which engines exist (✅)
   - Which engines are missing but required (🔲)
   - Dependency chains between engines

❗ Codex must never fill or update this file automatically. It is manually maintained and considered source-of-truth for orchestration logic.

If a missing engine prevents task execution:
- Log a Codex Note or add a todo in `codex-todo.md`
- Await human clarification before proceeding

---

## 🧠 Codex Internal Notes and Self-Tasks

Codex may encounter ideas, inconsistencies, or potential improvements that are **outside the scope of the current task**. This protocol allows Codex to track such insights responsibly and persistently.

### 🔹 Allowed Tracking Methods

Codex may use one of two approaches (or both):

#### A. Inline Codex Notes in Code

Place structured comment blocks at the top of `src/index.ts` or near relevant code:

/**
 * 🧠 Codex Note:
 * - Noticed SYSTEM_STATE lists /vault/get but router exposes /vault/token/:project/:service
 * - Should unify naming
 * - Consider updating SYSTEM_STATE.md accordingly
 */

These are Codex-facing notes intended for future context — not user documentation.

#### B. Local codex-todo.md File (Optional)

In each engine folder (e.g., engines/vault/), Codex may maintain a codex-todo.md file for multi-item tracking:

## TODO
- [ ] Unify endpoint name with SYSTEM_STATE
- [ ] Add error fallback for missing project token
- [x] Normalize Vault request shape

Each item should be concise and traceable to implementation points.

🔁 Execution Rules  
Whenever Codex completes a task originally recorded as a note or todo:

✅ Remove the item (or mark it as completed)  
✅ Update the relevant documentation:  

- README.md of the engine  
- SYSTEM_STATE.md if API/state changed  
- Any other impacted files (including the root README or contribution protocol)  

This ensures internal alignment and traceability of thought process.

🔍 Codex Notes Location Tracking  
Whenever Codex creates an inline note inside any engine file (for example `src/index.ts`), it must also record that note in SYSTEM_STATE.md under a new section titled ## 🧠 Codex Notes Map.

This map lists all currently active Codex Notes and their locations. Example:

🧠 Codex Notes Map  
engines/vault/src/index.ts:  
  Note: Align /vault/get with documented /vault/token/:project/:service  

engines/execution/src/index.ts:  
  Note: Execution engine still lacks action runner registry  

Notes tracked here must be updated or removed once resolved. If a file is restructured, migrate the note entry accordingly so future runs can revisit the correct context.

🔍 Responsibility  
Before starting any new task in a given engine:

- Scan for Codex Notes or open todos  
- Prioritize handling any unresolved technical debt that may affect the new task  

This approach enables autonomous continuity across async work sessions.

❗ Handling Failed or Unresolved Tasks  
If Codex cannot complete a task due to technical limitations, missing dependencies, or external blockers:

✅ Leave the task unchecked ([ ]) in codex-todo.md  
✅ Keep the corresponding entry in SYSTEM_STATE.md > 🧠 Codex Notes Map  
✅ If human intervention is needed, tag the task as 🔧 Requires human  
✅ If external constraints apply (e.g., internet, credentials), tag it as 🌐 External constraint  
✅ You may explain the failure inline:

- [ ] Install lockfile 🔧 Requires human — npm registry access needed

This ensures unresolved items are visible, tagged, and tracked across sessions.

---

📘 Engine Specification Awareness  
Each engine folder may include an ENGINE_SPEC.md file describing its responsibilities, endpoints, integrations, and behavior.

If Codex runs out of todos or Codex Notes, it should:

- Check whether ENGINE_SPEC.md exists  
- Review it for hints, expectations, or discrepancies  
- Log potential tasks or missing capabilities based on it  

If ENGINE_SPEC.md is missing or incomplete, Codex may log a todo or a note requesting clarification or manual input.

---

📁 Folder & File Naming Conventions  
Entry file per engine: always `src/index.ts`.  
Todos file: `codex-todo.md` lives in each engine root.  
Module files: use descriptive names like `token-service.ts` or `blueprint-validator.ts`.  
API route naming: follow `/engine/action` pattern.

| Expected File   | Purpose                          |
|-----------------|---------------------------------|
| src/index.ts    | Express entry point for the engine |
| README.md       | Engine overview and API documentation |
| ENGINE_SPEC.md  | Manual spec and design notes     |
| codex-todo.md   | Local task list for Codex        |
| tests/<engine>/ | Test suite location              |

---

📁 New File: ENGINE_DEPENDENCIES.md  
This file lives at the root of the repo and defines dependencies between engines.

Each engine should be listed with the other engines it depends on, including relevant route examples. Codex must keep this file updated when new engine interactions occur or routes are added/removed.

Format example:

### vault
- depends on: platform-builder (/platform/blueprint/:id)
- depends on: execution (/exec/token/verify)

---

🧠 New File: codex-todo.md (root-level)  
This root-level file contains system-level tasks — across engines, protocol-wide changes, or multi-engine coordination. Codex uses this to track global efforts, like standardizing formats, adding shared infra files, or resolving architectural questions.

Engine-specific tasks should not go here — they belong inside the engine folders.

---

📃 System Contracts  
Codex must consult SYSTEM_RULES.md before executing logic that depends on cross-engine behavior, error fallback strategies, user permissions, or handling missing components.

---

🧠 Codex Question Log  
Architecture doubts or unresolved system questions may be recorded in `codex-questions.md`.

Each entry should be labeled as `[Qx]`.

Human contributors respond using `[Ax]` in the Answers section.

Codex should review this file regularly and avoid repeating unresolved mistakes.

---

🧪 Testing Strategy  
Each engine must place tests under `tests/<engine>/` and expose an `npm run test` script in its package.json.

If Codex cannot run tests due to environment limits, create a `codex-test-todo.md` in that engine with planned tests and the blocker (e.g., 🌐 external constraint).

---

📊 Engine Progress & Phase Tracking  
SYSTEM_STATE.md tracks each engine’s progress percentage and phase. Phases reflect implementation maturity:

| Phase          | Meaning                                   |
|----------------|-------------------------------------------|
| 📁 Initialized | Folder created, basic files exist         |
| 🔧 Routes Stubbed | API routes defined but logic incomplete  |
| 🔄 Logic Wired | Core logic implemented and linked          |
| ✅ Integrated  | Connected to Gateway and other engines     |
| 🧪 Tested      | Automated tests passing                     |

Update the progress percentage and phase whenever functionality advances.

---

🔁 Periodic Reflection Task  
Every 5 tasks Codex should scan the repository for undocumented code, unused files or functions, and mismatches with SYSTEM_STATE.md.

Record findings in `codex-todo.md` or under Reflection Notes in SYSTEM_STATE.md.

---

💬 Human Prompt Response Types

| Type       | Description                   | Action Codex Should Take                |
|------------|-------------------------------|---------------------------------------|
| 🔧 Instruction | Clear command to execute     | Perform it, log result, and update docs |
| ❓ Question | Open-ended question or clarification | Answer only, don’t perform changes    |
| 💡 Idea    | Concept or suggestion          | Log to codex-todo.md under 💡 Ideas     |

---

✅ Example: Adding a new action to Execution Engine  
If you add a new action called `send_email` to Execution:

- Add its route + input/output to `execution/README.md`  
- Add a status line in `SYSTEM_STATE.md` under Execution  
- Confirm `execution/src/index.ts` exists and is mapped in root README.md  

---

🧭 Summary

| What You Did           | Must Update                                |
|-----------------------|--------------------------------------------|
| Added a new engine    | Root README.md, SYSTEM_STATE.md             |
| Added endpoint to engine | Engine’s README.md, SYSTEM_STATE.md         |
| Changed how Gateway routes | Gateway README.md, README.md               |
| Added feature across multiple engines | All relevant engine docs + root files |

Keep PURAIFY structured.
Make it understandable by humans and machines.
Build like the system builds itself.

---

## 📌 Proposed Actions Workflow

Environment or configuration updates require a transparent approval process:

1. Add a bullet under `## Proposed Actions` in `codex-todo.md` describing the change, rationale, and expected impact.
2. Add the same entry to `PROPOSED_ACTIONS_LOG.md` with status **Proposed**.
3. Wait for an explicit human response of `YES` before applying the change.
4. After approval, implement the change, update relevant docs, and update the log entry to **Executed** with date and approver.
5. Keep both the todo item and log for historical reference.

This ensures all environment changes are reviewed and fully traceable.

Thanks,  
PURAIFY System Protocol
