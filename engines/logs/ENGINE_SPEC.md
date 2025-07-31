# 🧠 Engine Spec: Monitoring & Logs Engine

---

## 🎯 Purpose
The Logs Engine captures and stores operational events from other PURAIFY engines. Each entry includes a timestamp, severity level and message.

---

## 📁 File Structure
```text
logs/
  src/index.ts       Express server with routes
  tests/             Basic unit tests
  package.json       NPM config
```

---

## 📌 Routes
| Route | Method | Description |
|-------|-------|-------------|
| `/monitoring/logs` | POST | Store a log entry |
| `/monitoring/logs` | GET | Retrieve all stored logs |

---

## 🔄 Flow
1. An engine performs an action and sends a POST request to `/monitoring/logs` with the message.
2. Logs Engine writes the entry to `logs.json`.
3. Operators can fetch logs via `GET /monitoring/logs` for debugging.

---

## 🧩 Dependencies
None. Other engines depend on this engine for logging.

## 🧪 Testing
`npm run test` executes tests in `tests/`.
