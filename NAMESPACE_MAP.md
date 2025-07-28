# Namespace Map

## File/Module Names

| Engine           | File/Module                | Notes                           |
|------------------|----------------------------|---------------------------------|
| vault            | src/index.ts               | Express routes for credential storage |
| platform-builder | src/index.ts               | Blueprint generation server |
| execution        | src/index.ts               | Executes actions |
| gateway          | src/index.ts               | Main API gateway |
| knowledge        | knowledge.parser.ts        | Planned module placeholder      |
| validation       | validation.checker.ts      | Planned module placeholder      |
| integration      | integration.manager.ts     | Planned module placeholder      |
| monitoring       | monitoring.engine.ts       | Planned module placeholder      |
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
| vault            | /vault/token              | Token & secrets API            |
| platform-builder | /builder/create           | Platform creation & updates    |
| execution        | /execute                  | Run actions & flows            |
| gateway          | /gateway/*                    | API gateway router
| gateway          | /gateway/run-blueprint           | Orchestrates sequential execution
| knowledge        | /knowledge/blueprint      | Planned                       |
| validation       | /validation/check         | Planned                       |
| integration      | /integration/connect      | Planned                       |
| monitoring       | /monitoring/logs          | Planned                       |
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
