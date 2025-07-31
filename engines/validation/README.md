# Validation Engine

> This engine is part of the PURAIFY system. For the overall architecture see the root [README.md](../../README.md).

## 🧠 Overview

The Validation Engine checks generated blueprints before they are executed. It ensures required fields exist and that actions reference known integrations. For now it only verifies that a blueprint contains an `actions` array.

---

## 📁 Engine Structure

```text
validation/
├── package.json
├── tsconfig.json
├── README.md
├── ENGINE_SPEC.md
├── codex-todo.md
├── run-tests.js
├── src/
│   └── index.ts
└── tests/
    ├── codex-test-todo.md
    └── sample.test.js
```

Tests for this engine live in `tests/` inside the Validation engine folder.

## 🚀 Development Setup

Requires Node.js v20+.

```bash
npm ci
npm run dev
npm test
```

Use the shared `.env` file (`../../.env.example`) to configure `VALIDATION_PORT` and related URLs.

> Use `npm ci --prefer-offline` if installing without internet access.

---

## ⚙️ API Endpoint

### `POST /validation/check`

Validate a blueprint object. Currently returns `{ valid: true }` if the blueprint includes an `actions` array.

**Request Body**
```json
{
  "blueprint": {
    "actions": []
  }
}
```

**Response**
```json
{ "valid": true }
```

---

## 🧩 Dependencies
The Validation Engine has no runtime dependencies yet but will later integrate with the Knowledge Engine and Execution Engine.

## 🧪 Testing
Run `npm run test` inside `engines/validation` or `npm test` from the repo root. Tests use Node's built-in loader.

---

## 🧭 Summary

The Validation Engine ensures blueprints are well‑formed before execution. More comprehensive schema checks will be added as other engines mature.
