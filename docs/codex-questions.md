# ❓ Codex Questions & Architecture Doubts

This file tracks open questions, unclear assumptions, or logic gaps Codex encounters during system understanding.

---

## 🧠 Questions from Codex

### [Q1] Title or summary
**Context:**  
File: `engines/execution/src/task-runner.ts`  
Issue: `SYSTEM_RULES.md` does not define what to do if no Validation Engine exists.  
Suggested Options:  
- Should I block execution?  
- Should I log a fallback note?  

_Status: ✅ Answered in [A1]_

### [Q2] Missing engine registry information
**Context:**
File: `ENGINES_INDEX.md`
Issue: The file is currently empty and does not list existing engines or their statuses.
Suggested Options:
- Populate table with all current engines and mark whether they are required and present
- Remove file if not needed

_Status: ✅ Answered in [A2]_

### [Q3] Empty docker-compose configuration
**Context:**
File: `docker-compose.yml`
Issue: The file exists but contains no service definitions.
Suggested Options:
- Provide initial service setup for engines and gateway
- Document why it is intentionally empty

_Status: ✅ Answered in [A3]_

### [Q4] Test infrastructure inconsistencies
**Context:**
Docs reference `tests/<engine>/` and `npm run test`, but no tests directory or scripts are present.
Suggested Options:
- Add basic test structure and scripts per `CONTRIBUTION_PROTOCOL.md`
- Clarify if tests are deferred for now

_Status: ✅ Answered in [A4]_

### [Q5] Partial engine dependency declarations
**Context:**
File: `ENGINE_DEPENDENCIES.md`
Issue: Only Vault dependencies are documented; other engines have none listed.
Suggested Options:
- Document dependencies for Platform Builder, Execution Engine, and Gateway
- Clarify if dependencies are intentionally omitted

_Status: ✅ Answered in [A5]_

### [Q6] Placeholder namespace mapping
**Context:**
File: `NAMESPACE_MAP.md`
Issue: Tables list `example.ts` and placeholder routes only.
Suggested Options:
- Replace with actual module and route names
- Remove file if not used yet

_Status: ✅ Answered in [A6]_

### [Q7] Token fetch responsibility
**Context:**
File: `SYSTEM_STATE.md` (integration-design note)
Issue: Unclear whether Gateway or Execution Engine should request tokens from Vault during action execution.
Suggested Options:
- Decide on a single flow and document it in ENGINE_DEPENDENCIES.md and engine READMEs

_Status: ✅ Answered in [A7]_

---

## ✅ Human Answers

### [A1]
If no Validation Engine exists, block the flow and log a Codex Note requesting clarification.
_Status: ✅ Resolved_

### [A2]
ENGINES_INDEX.md has been populated with all engines and status columns. The issue about it being empty is resolved.
_Status: ✅ Resolved_

### [A3]
docker-compose.yml now defines services for Platform Builder, Execution, Vault and Gateway. Configuration is no longer empty.
_Status: ✅ Resolved_

### [A4]
Tests directories and npm scripts exist for each engine. Sample tests run via `npm test`.
_Status: ✅ Resolved_

### [A5]
ENGINE_DEPENDENCIES.md now lists dependencies for multiple engines beyond Vault.
_Status: ✅ Resolved_

### [A6]
NAMESPACE_MAP.md includes real file names and planned modules. Placeholders remain until new engines are implemented.
_Status: ✅ Resolved_

### [A7]
Execution Engine is responsible for fetching tokens from the Vault during action execution. Gateway only orchestrates requests.
_Status: ✅ Resolved_


### [Q8] Test runner inconsistency
**Context:**
Docs mention Node built-in test runner but package.json uses uvu. Should we switch to Node built-in or update docs to prefer uvu?
_Status: ✅ Resolved_

### [A8]
The repository now uses Node's built-in test runner across all engines. Removed unused uvu dependency from package.json.
_Status: ✅ Resolved_
