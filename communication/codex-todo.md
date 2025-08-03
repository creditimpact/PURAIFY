# codex-todo.md

## 🎯 Goal
Track all system-wide and per-engine tasks in one place

---

## 🔧 Global Tasks
- [x] Example: Align all engine specs with SYSTEM_STATE
- [ ] Create integration tests that run blueprint creation via Gateway and execute actions 🌐 External constraint (npm install blocked)

---

## 📚 Platform Knowledge

- [x] Add platform-knowledge module with platform types and components

---

## 🧩 Platform Builder

- [ ] Blueprint parsing tests 🌐 External constraint (assert library only, needs supertest)
- [ ] Mock GPT fallback in parser tests

## 🔐 Vault

- [ ] Vault API integration tests 🌐 External constraint (supertest not available offline)

## 🏃 Execution

- [ ] Test send_slack posts message using mock server 🌐 External constraint (fetch-mock not available offline)
- [ ] Test create_sheet posts to Google API using mock server 🌐 External constraint (fetch-mock not available offline)

## 🧪 Validation

- [ ] Validate blueprint schema via /validation/check 🌐 External constraint (supertest not available offline)

## 📜 Gateway

- [ ] Integration test for full pipeline via Gateway 🔧 Requires dependencies
  - Blocked: npm install cannot run (no internet)
- [x] Validate `/gateway/run-blueprint` continues after failed actions
  - Implemented using axios and mock HTTP servers

## 📝 Knowledge Engine

## 📦 Integration Manager

## 📊 Monitoring & Logs Engine
- [ ] Stream logs to external service (e.g., Loki) in future
- [ ] API integration tests for /monitoring/logs 🌐 External constraint (supertest not available)

## 🔁 Feedback Loop

## 💬 AI Interaction Layer

## 🧱 Project Composer

## 🚀 Deployment Planner

## 📚 Documentation Generator

## 🛡️ Permission & Policy Engine

## 🌐 Environment Manager

## 🧹 Cleanup / Destroy Engine

## 🛂 Engine Control Core

## 🔄 Sync Engine
