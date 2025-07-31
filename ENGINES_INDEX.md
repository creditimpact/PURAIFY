# 🔍 ENGINES_INDEX.md — Full Engine Registry

| Engine Name             | Description                                                  | Required? | Exists? | Depends On                                  |
|-------------------------|--------------------------------------------------------------|-----------|---------|---------------------------------------------|
| Vault Engine            | Secure token and secrets storage and management         | Yes       | ✅     | Engine Control, Execution Engine, Integration Manager |
| Execution Engine        | Executes user-defined actions and API calls          | Yes       | ✅     | Vault Engine, Engine Control, Feedback Loop  |
| Platform Builder        | Generates blueprints from user prompts (visual UI planned) | Yes       | ✅     | Knowledge Engine, Validation Engine, Integration Manager |
| Gateway Engine          | Central API entry point and request router          | Yes       | ✅     | All engines                                  |
| Knowledge Engine        | Parses and formalizes platform blueprints          | Yes       | 🛠      | Platform Builder, Validation Engine          |
| Validation Engine       | Validates platform blueprints and logic          | Yes       | ✅      | Knowledge Engine, Execution Engine, Vault Engine |
| Integration Manager     | Manages OAuth and API connections to external platforms      | Yes       | 🛠      | Vault Engine, Execution Engine                |
| Monitoring & Logs Engine| Tracks logs, errors, and performance across the system       | Yes       | ✅     | Execution Engine, Validation Engine           |
| Feedback Loop           | Manages user interaction, approvals, and confirmations       | Yes       | 🛠      | Execution Engine, Validation Engine           |
| AI Interaction Layer    | Mediates GPT communication for suggestions and analysis      | No        | 🛠      | Knowledge Engine, Feedback Loop               |
| Project Composer        | Automatically completes and organizes platform components    | No        | 🛠      | Knowledge Engine, Validation Engine           |
| Deployment Planner      | Plans and manages platform deployment and releases         | No        | 🛠      | Execution Engine, Environment Manager         |
| Documentation Generator | Auto-generates platform documentation          | No        | 🛠      | Knowledge Engine, Platform Builder            |
| Permission & Policy Engine | Manages roles, permissions, and policies            | Yes       | 🛠      | Engine Control, Execution Engine               |
| Environment Manager     | Manages environments, versions, and config per platform      | No        | 🛠      | Deployment Planner, Vault Engine               |
| Cleanup / Destroy Engine| Handles secure deletion and cleanup of platforms and data    | No        | 🛠      | Vault Engine, Execution Engine, Environment Manager |
| Engine Control Core     | Central authority for engine permission and flow control     | Yes       | 🛠      | All engines                                   |
| Sync Engine             | Synchronizes data between system and external platforms      | No        | 🛠      | Vault Engine, Integration Manager              |
