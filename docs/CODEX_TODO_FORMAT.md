# codex-todo Format Guide

This document defines the standard structure for all `codex-todo.md` files used across the PURAIFY repository.

## Sections

A todo file contains two main sections:

1. `## TODO` – a checklist of tasks for that engine or the root project.
2. `## Proposed Actions` – environment or configuration changes that require approval.

### TODO Items

- Use Markdown checkboxes: `- [ ]` for open tasks and `- [x]` for completed ones.
- Keep each task concise and actionable.
- Optional tags can be appended for clarity:
  - `🔧 Requires human` – task needs human input or permission.
  - `🌐 External constraint` – blocked by network or other external factors.
- Once a task is done, mark it with `[x]` and keep it for history until the file is cleaned up.

### Proposed Actions

This section tracks environment or configuration updates. Each entry should follow:

```
- [PA<n>] Description. Impact: <short impact>. **Status: Proposed/Approved/Executed**
```

Mirror each proposal in `PROPOSED_ACTIONS_LOG.md` with the same ID. Update both locations when the status changes.

## Example

```markdown
## TODO
- [ ] Add /vault/rotate-token endpoint
- [ ] Document token schema 🔧 Requires human

## Proposed Actions
- [PA4] Introduce Redis for Vault storage. Impact: persistent tokens. **Status: Proposed**
```

Following this format ensures automated tools and human contributors can track progress consistently across all engines.
