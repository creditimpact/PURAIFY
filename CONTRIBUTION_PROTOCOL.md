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
