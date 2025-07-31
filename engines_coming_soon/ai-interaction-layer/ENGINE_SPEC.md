# 🧠 Engine Spec: AI Interaction Layer

---

## 🎯 Purpose

The **AI Interaction Layer** serves as a smart, context-aware interface between PURAIFY's internal engines and external language models like OpenAI’s GPT.  
Its role is **not** just to send prompts — but to mediate, interpret, and maintain consistency, intent, and structure when engaging with AI.

It builds rich, task-oriented prompts, routes intent to the right model, interprets results into actionable formats, and provides helpful, structured replies to the requesting engine.

---

## ⚙️ Core Responsibilities

| Action                     | Description                                                                 |
|---------------------------|-----------------------------------------------------------------------------|
| 🧾 Build Structured Prompts | Uses templates, context, and few-shot examples to craft prompts             |
| 🧠 Intent Recognition       | Extracts what the user or engine wants: explain, fix, generate              |
| 🔁 Context Management       | Maintains long-range session state, platform metadata, error history        |
| 🧪 Model Routing            | Chooses model (e.g., GPT-4, GPT-4o, Claude) based on task                   |
| 📥 Receive Internal Requests| Called by other engines to get AI assistance (explanation, suggestion, fix)|
| 📤 Return Normalized Results| Always returns results in expected schema (e.g., JSON, text, patch)        |

## 🚫 What It Does NOT Do

- ❌ Does not autonomously execute changes or act on behalf of the user  
- ❌ Does not persist internal decisions or data (stateless between calls)  
- ❌ Does not override system logic — only advises or structures input  

## 🔗 Engine Integrations

| Engine            | Role                                                              |
|------------------|-------------------------------------------------------------------|
| Knowledge Engine | Provides structured platform metadata, schemas, components        |
| Validation Engine| Asks for help analyzing or fixing validation failures             |
| Feedback Loop    | Uses AI to phrase confirmations, suggestions, or warnings         |
| Logs Engine      | Sends error context for analysis or explanation                   |
| Project Composer | Asks for suggestions to complete or enhance a project             |
| Documentation Gen| Converts code/blueprint to human-readable documentation           |

## 📥 Input Example: System Prompt

```json
{
  "role": "system",
  "task": "analyze_code",
  "input": {
    "file": "login.js",
    "code_snippet": "...",
    "issue_description": "403 error when logging in"
  },
  "context": {
    "platform": "TaskBuilder",
    "auth_method": "JWT",
    "user_feedback": "login fails without reason"
  },
  "instruction": "חפש שגיאה בקוד והצע תיקון נקודתי"
}
```

## 📤 Output Example: Suggested Fix

```json
{
  "analysis": "הקוד לא שולח את הטוקן בכותרת Authorization",
  "suggested_fix": {
    "code_patch": "headers: { Authorization: `Bearer ${token}` }"
  }
}
```

## 🔄 AI Flow Lifecycle

1. **Request received from internal engine**  
2. **Prompt Compiler** assembles full prompt with context and intent  
3. **Role Router** determines if it's debug/design/clarification/documentation  
4. **Model** selected dynamically (e.g., GPT-4o)  
5. **Result** parsed by Response Interpreter  
6. **Returns** normalized output to calling engine  

## 🧱 Internal Architecture

| Module              | Description                                                                 |
|---------------------|-----------------------------------------------------------------------------|
| Prompt Compiler      | Builds dynamic, role-specific prompts using templates                      |
| Context Manager      | Injects blueprint structure, platform config, error history                |
| Role Router          | Decides AI interaction type (e.g., debug vs generate)                      |
| Response Interpreter | Parses AI output into structured, reliable schema                         |
| Feedback Integrator  | Adjusts tone or phrasing based on user responses and preferences           |

## 🌐 External Dependencies

| Service                  | Purpose                                    |
|--------------------------|--------------------------------------------|
| OpenAI GPT-4/4o          | Primary language model                     |
| Anthropic Claude (optional)| Secondary AI provider                    |
| Other LLM APIs           | Future support for fallback or specialized tasks |

## 🧩 Sample Intent Mappings

| User Input                            | AI Task           | Output               |
|--------------------------------------|-------------------|----------------------|
| “מה הבעיה בקוד הזה?”                 | analyze_code       | Suggested fix        |
| “תשפר לי את הניסוח של הודעה ללקוח”   | rewrite_content    | Text                 |
| “צור לי טופס להזמנת פגישות”         | generate_platform  | Blueprint            |
| “שלח גם מייל אחרי יומיים”           | extend_logic       | Platform patch       |
| “יש פה באג בלולאה?”                 | debug_logic        | Explanation + fix    |

## 🧠 Summary

The AI Interaction Layer is the conversational core of PURAIFY.  
It translates human intent into machine structure — and vice versa.  
It doesn’t guess or invent — it guides, proposes, and enables clarity.  

This engine ensures that GPT becomes a useful assistant, not a black box — helping every user and engine interact in smarter, safer, and more contextual ways.
