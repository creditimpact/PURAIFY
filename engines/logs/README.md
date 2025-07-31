# Monitoring & Logs Engine

> This engine is part of the PURAIFY system. For a full overview see the root [README](../../README.md).

## 🧠 Overview

The Monitoring & Logs Engine records runtime events from other engines. It exposes a simple HTTP API for creating and retrieving log entries. Logs are persisted to `logs.json` on disk so information survives restarts.

This MVP implementation only stores logs locally. Future versions may stream to a centralized store or external monitoring service.

---

## 📁 Engine Structure

```text
logs/
├── package.json
├── tsconfig.json
├── src/
│   └── index.ts            ← Entry point for Logs Engine
├── README.md
├── ENGINE_SPEC.md
├── codex-todo.md
└── tests/
```

---

## ⚙️ API Endpoints

### `POST /monitoring/logs`
Create a new log entry.

Request body:
```json
{
  "level": "info",
  "message": "Something happened",
  "engine": "execution"
}
```
Response:
```json
{ "success": true }
```

### `GET /monitoring/logs`
Return all stored log entries.

Response:
```json
{ "logs": [ { "timestamp": "...", "level": "info", "message": "..." } ] }
```

---

## 🧩 Dependencies
No runtime dependencies on other engines. Other engines simply POST log entries here.

## 🧪 Testing
Run `npm run test` inside `engines/logs`.
