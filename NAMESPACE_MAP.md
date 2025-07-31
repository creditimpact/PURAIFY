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
| knowledge        | knowledge.parser.ts        | 🛠 planned module placeholder      |
| validation       | src/index.ts, src/validator.ts | Blueprint validation logic |
| integration      | integration.manager.ts     | 🛠 planned module placeholder      |
| monitoring       | src/index.ts               | Logs Engine server |
| feedback-loop    | feedback.loop.ts           | 🛠 planned module placeholder      |
| ai-interaction   | ai.interaction.ts          | 🛠 planned module placeholder      |
| project-composer | project.composer.ts        | 🛠 planned module placeholder      |
| deployment-planner | deployment.planner.ts     | 🛠 planned module placeholder      |
| documentation    | documentation.generator.ts | 🛠 planned module placeholder      |
| permission       | permission.engine.ts       | 🛠 planned module placeholder      |
| environment      | environment.manager.ts     | 🛠 planned module placeholder      |
| cleanup          | cleanup.engine.ts          | 🛠 planned module placeholder      |
| engine-control   | engine.control.core.ts     | Core control engine (stable)    |
| sync             | sync.engine.ts             | 🛠 planned module placeholder      |

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
| knowledge        | /knowledge/blueprint      | 🛠 planned                       |
| validation       | /validation/check         | ✅ implemented                   |
| integration      | /integration/connect      | 🛠 planned                       |
| monitoring       | /monitoring/logs          | ✅ implemented                   |
| feedback-loop    | /feedback/requests        | 🛠 planned                       |
| ai-interaction   | /ai/interaction           | 🛠 planned                       |
| project-composer | /composer/assemble        | 🛠 planned                       |
| deployment-planner | /deployment/start        | 🛠 planned                       |
| documentation    | /docs/generate            | 🛠 planned                       |
| permission       | /permission/check         | 🛠 planned                       |
| environment      | /environment/manage       | 🛠 planned                       |
| cleanup          | /cleanup/delete           | 🛠 planned                       |
| engine-control   | /control/authorize        | Core authorization control    |
| sync             | /sync/data                | 🛠 planned                       |
