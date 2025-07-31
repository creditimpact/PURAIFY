# Namespace Map

## File/Module Names

| Engine           | File/Module                | Notes                           |
|------------------|----------------------------|---------------------------------|
| vault            | src/index.ts               | Express routes for credential storage |
| vault            | src/storage.ts             | Loads and saves tokens to disk |
| platform-builder | src/index.ts               | Blueprint generation server |
| execution        | src/index.ts               | Executes actions |
| execution        | src/actions.ts             | Individual action handlers |
| gateway          | src/index.ts               | Main API gateway |
| gateway          | src/types.ts               | Shared ActionResult interface |
| knowledge        | knowledge.parser.ts        | Planned module placeholder      |
| validation       | src/index.ts, src/validator.ts | Blueprint validation logic |
| integration      | integration.manager.ts     | Planned module placeholder      |
| monitoring       | src/index.ts               | Logs Engine server |
| feedback-loop    | feedback.loop.ts           | Planned module placeholder      |
| ai-interaction   | ai.interaction.ts          | Planned module placeholder      |
| project-composer | project.composer.ts        | Planned module placeholder      |
| deployment-planner | deployment.planner.ts     | Planned module placeholder      |
| documentation    | documentation.generator.ts | Planned module placeholder      |
| permission       | permission.engine.ts       | Planned module placeholder      |
| environment      | environment.manager.ts     | Planned module placeholder      |
| cleanup          | cleanup.engine.ts          | Planned module placeholder      |
| engine-control   | engine.control.core.ts     | Core control engine (stable)    |
| sync             | sync.engine.ts             | Planned module placeholder      |

---

## Routes

| Engine           | Route                     | Notes                          |
|------------------|---------------------------|--------------------------------|
| vault            | /vault/store              | Legacy token storage route |
| vault            | /vault/token              | Create token entry |
| vault            | /vault/token/:project/:service | Fetch stored token |
| vault            | DELETE /vault/token/:project/:service | Remove token |
| vault            | /vault/tokens/:project | List tokens for a project |
| vault            | DELETE /vault/tokens/:project | Remove all tokens for a project |
| vault            | /vault/projects | List projects with stored tokens |
| platform-builder | /builder/create           | Platform creation & updates    |
| execution        | /execute                  | Run actions & flows            |
| gateway          | /gateway/*                    | API gateway router |
| gateway          | /gateway/build-platform       | Passes prompt to Builder |
| gateway          | /gateway/execute-action       | Runs single action via Execution |
| gateway          | /gateway/store-token          | Saves credentials via Vault |
| gateway          | /gateway/run-blueprint        | Validates then executes blueprint sequentially |
| knowledge        | /knowledge/blueprint      | Planned                       |
| validation       | /validation/check         | Implemented                   |
| integration      | /integration/connect      | Planned                       |
| monitoring       | /monitoring/logs          | Implemented                   |
| feedback-loop    | /feedback/requests        | Planned                       |
| ai-interaction   | /ai/interaction           | Planned                       |
| project-composer | /composer/assemble        | Planned                       |
| deployment-planner | /deployment/start        | Planned                       |
| documentation    | /docs/generate            | Planned                       |
| permission       | /permission/check         | Planned                       |
| environment      | /environment/manage       | Planned                       |
| cleanup          | /cleanup/delete           | Planned                       |
| engine-control   | /control/authorize        | Core authorization control    |
| sync             | /sync/data                | Planned                       |
