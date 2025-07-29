### vault
Currently standalone; no direct engine dependencies.

### platform-builder
Provides blueprint generation to Gateway via `/builder/create`.
Currently has no runtime dependencies on other engines.

### execution
- depends on: vault (`/vault/token/:project/:service`)
- provides: action execution via `/execute`

### gateway
- depends on: vault (`/vault/token` & `/vault/token/:project/:service`)
- depends on: platform-builder (`/builder/create`)
- depends on: execution (`/execute`)

### knowledge-engine
- depends on: vault (/vault/token/fetch)
- depends on: platform-builder (/platform/blueprint/:id)

### validation-engine
- depends on: knowledge-engine (/knowledge/blueprint/:id)
- depends on: vault (/vault/token/verify)

### integration-manager
- depends on: vault (/vault/token)

### monitoring-logs-engine
- depends on: execution (/exec/logs)
- depends on: validation-engine (/validation/report)

### feedback-loop-engine
- depends on: execution (/exec/approval)
- depends on: validation-engine (/validation/warnings)

### ai-interaction-layer
- depends on: knowledge-engine (/knowledge/ai/request)

### project-composer
- depends on: knowledge-engine (/knowledge/composer)

### deployment-planner
- depends on: vault (/vault/token/fetch)
- depends on: validation-engine (/validation/status)
- depends on: execution (/exec/deploy)

### documentation-generator
- depends on: knowledge-engine (/knowledge/docs)

### permission-policy-engine
- depends on: execution (/exec/permission)
- depends on: engine-control (/control/authorize)

### environment-manager
- depends on: deployment-planner (/deploy/plan)
- depends on: vault (/vault/env/fetch)

### cleanup-destroy-engine
- depends on: vault (/vault/token/destroy)
- depends on: environment-manager (/env/cleanup)
- depends on: execution (/exec/stop)

### engine-control-core
- depends on: all engines (central control)

### sync-engine
- depends on: vault (/vault/token/fetch)
- depends on: integration-manager (/integration/info)
- depends on: execution (/exec/sync)
