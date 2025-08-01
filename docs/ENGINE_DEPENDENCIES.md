### vault
Currently standalone; no direct engine dependencies.

### platform-builder
Provides blueprint generation to Gateway via `/builder/create`.
- depends on: monitoring-logs-engine (`/monitoring/logs` for blueprint logging)

### execution
- depends on: vault (`/vault/token/:project/:service`)
- provides: action execution via `/execute`
- external: Slack API via `send_slack` action
- external: generic HTTP APIs via `http_request` action
- external: Google Sheets API via `create_sheet` action
- depends on: monitoring-logs-engine (`/monitoring/logs` for execution logging)

### gateway
- depends on: vault (`/vault/token` for storing credentials)
- depends on: platform-builder (`/builder/create`)
- depends on: execution (`/execute`)
- depends on: validation (`/validation/check` for blueprint verification)
- depends on: monitoring-logs-engine (`/monitoring/logs` for request logging)

### knowledge-engine
- depends on: vault (/vault/token/fetch)
- depends on: platform-builder (/platform/blueprint/:id)

### validation-engine
- depends on: knowledge-engine (/knowledge/blueprint/:id)
- depends on: vault (/vault/token/verify)
- depends on: monitoring-logs-engine (`/monitoring/logs` for validation events)

### integration-manager
- depends on: vault (/vault/token)

### monitoring-logs-engine
- depends on: none (other engines POST logs here)

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
