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

## 🧠 Codex Internal Notes and Self-Tasks

Codex may encounter ideas, inconsistencies, or potential improvements that are **outside the scope of the current task**. This protocol allows Codex to track such insights responsibly and persistently.

### 🔹 Allowed Tracking Methods

Codex may use one of two approaches (or both):

#### A. Inline Codex Notes in Code

Place structured comment blocks at the top of `src/index.ts` or near relevant code:

```ts
/**
 * 🧠 Codex Note:
 * - Noticed SYSTEM_STATE lists /vault/get but router exposes /vault/token/:project/:service
 * - Should unify naming
 * - Consider updating SYSTEM_STATE.md accordingly
 */
```

These are Codex-facing notes intended for future context — not user documentation.

#### B. Local codex-todo.md File (Optional)

In each engine folder (e.g., engines/vault/), Codex may maintain a codex-todo.md file for multi-item tracking:

```md
## TODO
- [ ] Unify endpoint name with SYSTEM_STATE
- [ ] Add error fallback for missing project token
- [x] Normalize Vault request shape
```

Each item should be concise and traceable to implementation points.

### 🔁 Execution Rules

Whenever Codex completes a task originally recorded as a note or todo:

✅ Remove the item (or mark it as completed)

✅ Update the relevant documentation:

- README.md of the engine
- SYSTEM_STATE.md if API/state changed
- Any other impacted files (including the root README or contribution protocol)

This ensures internal alignment and traceability of thought process.

### 🔍 Codex Notes Location Tracking

Whenever Codex creates an inline note inside any engine file (for example
`src/index.ts`), it must also record that note in `SYSTEM_STATE.md` under a new
section titled `## 🧠 Codex Notes Map`.

This map lists all currently active Codex Notes and their locations. Example:

```
🧠 Codex Notes Map
engines/vault/src/index.ts:
  Note: Align /vault/get with documented /vault/token/:project/:service

engines/execution/src/index.ts:
  Note: Execution engine still lacks action runner registry
```

Notes tracked here must be updated or removed once resolved. If a file is
restructured, migrate the note entry accordingly so future runs can revisit the
correct context.

### 🔍 Responsibility

Before starting any new task in a given engine:

- Scan for Codex Notes or open todos
- Prioritize handling any unresolved technical debt that may affect the new task

This approach enables autonomous continuity across async work sessions.

---

## ✅ Example: Adding a new action to Execution Engine

If you add a new action called `send_email` to Execution:
- Add its route + input/output to `execution/README.md`
- Add a status line in `SYSTEM_STATE.md` under Execution
- Confirm `execution/src/index.ts` exists and is mapped in root `README.md`

---

## 🧭 Summary

| What You Did                     | Must Update                            |
|----------------------------------|----------------------------------------|
| Added a new engine               | Root `README.md`, `SYSTEM_STATE.md`    |
| Added endpoint to engine         | Engine’s `README.md`, `SYSTEM_STATE.md`|
| Changed how Gateway routes       | Gateway `README.md`, `README.md`       |
| Added feature across multiple engines | All relevant engine docs + root files |

Keep PURAIFY structured.  
Make it understandable by humans *and* machines.  
Build like the system builds itself.

---

Thanks,  
**PURAIFY System Protocol**
