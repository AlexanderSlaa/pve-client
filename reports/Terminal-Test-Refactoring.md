# Terminal Test Refactoring Lessons

## Goal

Split `tests/unit/terminal.test.ts` (1,050 lines) into focused test files to enforce the `max-lines: 750` ESLint rule — same extraction pattern used for `Terminal.ts` → `terminal-utils.ts` + `terminal-bridge.ts`.

## Final Result ✅

| File | Tests | Notes |
|---|---|---|
| `terminal-auth.test.ts` | 3 | Authorization/Cookie header tests |
| `terminal-bridge.test.ts` | 9 | Socket error, browser-close, prompt nudge (fake timers), openTerminalBridge preserve-input, resize (3 incl. JSON) |
| `terminal-normalization.test.ts` | 11 | Binary arrow-key, SS3 repeats, normalize SS3, vertical-only, simplify modified, coalesce split ANSI/home/CSI, no-buffer non-key, coalesce nav repeats (fake timers), drops text stdin |
| `terminal-coalesce-navigation.test.ts` | 6 | No-repair missing-escape, repair orphans, forward mixed bursts, no-repair batched, no-repair malformed ODD/OC, no-remap uppercase |
| `terminal-nudge-local.test.ts` | 1 | Standalone local prompt nudge test |

**Total: 30 terminal tests across 5 files, all 199 tests passing, lint clean.**

## The Core Problem: Vitest `vi.mock` Hoisting

Every terminal test uses a mocked `ws` module (WebSocket). The original file had this at the top:

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Terminal, TerminalSession, ... } from '../../src/helpers/Terminal.js';

const mockedWs = vi.hoisted(() => {
  const wsCtorSpy = vi.fn();
  class MockWebSocket { ... }
  return { wsCtorSpy, MockWebSocket };
});

vi.mock('ws', () => ({
  default: mockedWs.MockWebSocket,
}));
```

`vi.hoisted` runs **before** any imports. `vi.mock` also hoists **above** imports, but **after** `vi.hoisted`. The factory function in `vi.mock` can reference the result of `vi.hoisted` — but only if both are in the **same module**.

## What We Tried (and Why It Failed)

### Attempt 1: Shared importable mock module

Put the mock class + `vi.mock` in `shared-mock-setup.ts` and `import { mockedWs }` from each test file.

**Failed with:** `ReferenceError: Cannot access 'mockedWs' before initialization`

**Why:** `vi.mock` factory runs before imports. The imported `mockedWs` variable hasn't been initialized yet. Even though `vi.hoisted` runs first, the *export* of that value is still subject to the ESM import ordering — the importing module's `vi.mock` (if any) runs before its imports resolve.

### Attempt 2: `vi.hoisted` + shared module with `vi.mock` inside

Same as Attempt 1 but placed `vi.mock` inside the shared module itself.

**Failed with:** `SyntaxError: Cannot export hoisted variable. You can control hoisting behavior by placing the import from this file first.`

**Why:** Vitest does not allow `export const x = vi.hoisted(...)` — hoisted values must be local `const` declarations, not exports. The error message hints at reordering imports, but that only helps if the hoisted value stays in the test file.

### Attempt 3: Non-exported hoisted value + getter function

```typescript
// shared-mock-setup.ts
const mockedWsModule = vi.hoisted(() => { ... });

export function getMockedWs() {
  return mockedWsModule;
}
```

**Failed with:** `ReferenceError: getMockedWs is not defined`

**Why:** Calling `getMockedWs()` at module top level (outside a test) still runs during import evaluation — which happens after `vi.mock` hoisting. The mock wasn't needed at this stage, but the getter was called too late to matter. The real problem: you can't share a `vi.hoisted` result across modules in a way that's also usable inside another module's `vi.mock` factory.

### Attempt 4: Compile-time include directive (✅ Working)

A Vite pre-transform plugin that replaces `/// #include ./shared-mock-setup.ts` with the actual file contents.

```typescript
// terminal-auth.test.ts (first line)
/// #include ./shared-mock-setup.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Terminal } from '../../src/helpers/Terminal.js';
```

After Vite transforms, the file looks like:

```typescript
const mockedWs = vi.hoisted(() => { ... });
function sentFrameText(...) { ... }
vi.mock('ws', () => ({ default: mockedWs.MockWebSocket }));

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Terminal } from '../../src/helpers/Terminal.js';
```

**Why this works:** Vitest sees `vi.hoisted` and `vi.mock` as if they were written locally in the test file. No cross-module boundary, no import ordering issues.

#### ESLint complication

ESLint runs on source files **before** Vite transforms. It sees `mockedWs` and `sentFrameText` as undefined variables.

**Fix:** Add `tests/unit/shared-mock-setup.ts` to ESLint's `ignores` array. The file is intentionally not a valid standalone module — it's a compile-time fragment.

```javascript
// eslint.config.js
{
  ignores: ["dist/**", "node_modules/**", ..., "tests/unit/shared-mock-setup.ts"]
}
```

## Key Takeaways

1. **Vitest mock hoisting is a fundamental ESM constraint** — not a bug. `vi.mock` factories must run before imports, which means they can't reference imported values.

2. **`vi.hoisted` values cannot be exported** — Vitest explicitly blocks this. They must stay in the declaring module.

3. **`vi.doMock` doesn't help** — it's the dynamic (non-hoisted) variant, which doesn't work with static imports.

4. **Compile-time inlining is a valid workaround** — a simple Vite `transform` plugin with `enforce: 'pre'` can preprocess `/// #include` directives before Vitest's transform pipeline runs.

5. **Shared mock setup works when self-contained** — if `vi.hoisted` and `vi.mock` are in the same file AND that file is the test file (via inlining), everything works.

6. **ESLint and Vite see different code** — ESLint analyzes source files; Vite transforms them. Any preprocessor pattern (include directives, macro expansion) will create a gap between what ESLint sees and what runs at test time. Always account for this in your lint config.

## Files Created

| File | Purpose |
|---|---|
| `tests/unit/shared-mock-setup.ts` | Mock WebSocket class + `vi.mock` — included but never imported |
| `tests/unit/include-directive.ts` | Vite plugin for `/// #include` preprocessor directives |
| `vitest.config.ts` | Registers `includeDirective()` plugin |
| `eslint.config.js` | Adds `shared-mock-setup.ts` to ignores |

## Rule of Thumb

> If you need to share `vi.hoisted` mock setup across test files, either:
> 1. Keep the mock local to each file (boilerplate, but simplest), or
> 2. Use a compile-time include directive (single source of truth, ESLint-aware setup required)

Don't try to import `vi.hoisted` values across module boundaries — the hoisting barrier is fundamental to how Vitest processes ESM.
