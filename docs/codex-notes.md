# Codex Notes
This file stores ongoing Codex notes, questions, and internal process logs. Keep new entries chronological.

## 🧠 Codex Notes Map
engines/vault/src/index.ts:
  Note: ✅ GET, POST and DELETE endpoints implemented with encrypted token persistence to `tokens.json` when `VAULT_SECRET` is set. Added listing endpoints `/vault/tokens/:project` and `/vault/projects`.
engines/platform-builder/src/index.ts:
  Note: ✅ Basic server with validation; parser supports "and", "then", comma lists
engines/execution/src/index.ts:
  Note: ✅ send_slack now calls Slack API via fetch; token fetched from Vault and 404 when missing
engines/execution/src/actions.ts:
  Note: ✅ Action handlers split into separate module for isolation
gateway/src/index.ts:
  Note: ✅ Gateway routing implemented; run-blueprint now continues after failures
integration-design:
  Note: ✅ Each engine fetches its own tokens from Vault during action execution; Gateway only routes calls and stores credentials.
root-level:
  Note: ENGINE_DEPENDENCIES.md, NAMESPACE_MAP.md and codex-todo.md added for cross-engine tracking. Engine-level codex-todo format expected.
  and human-todo.md added for manual environment tasks
engines/validation/src/index.ts:
  Note: ✅ Basic /validation/check endpoint created; returns { valid: true } when actions array exists.
