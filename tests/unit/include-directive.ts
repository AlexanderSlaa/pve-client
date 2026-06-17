import { Plugin } from 'vite';
import * as fs from 'node:fs';
import * as path from 'node:path';

/**
 * Vite plugin that resolves `/// #include ./path/to/file.ts` directives.
 *
 * ─────────────────────────────────────────────────────────────
 * What we're solving
 * ─────────────────────────────────────────────────────────────
 *
 * When splitting terminal.test.ts (1,050 lines) into focused files,
 * each split needs the ~55 line `vi.hoisted` + `vi.mock('ws')` setup.
 * Duplicating that in every file defeats the purpose of splitting.
 *
 * But you can't import it from a shared module because Vitest hoists
 * `vi.mock` above all imports—the shared module hasn't been loaded yet
 * by the time the mock factory runs.
 *
 * ─────────────────────────────────────────────────────────────
 * How this works
 * ─────────────────────────────────────────────────────────────
 *
 * At Vite transform time (before Vitest sees the source), this plugin
 * scans test files for lines like:
 *
 *   /// #include ./shared-mock-setup.ts
 *
 * It replaces that single line with the entire contents of the referenced
 * file. Vitest then sees the included code as if it were written inline.
 *
 * This gives us:
 *   - Single source of truth (shared-mock-setup.ts)
 *   - No hoisting conflicts (code appears local to each file)
 *   - No runtime overhead (inlined at compile time)
 */
export function includeDirective(): Plugin {
  return {
    name: 'include-directive',
    enforce: 'pre' as const,

    transform(code: string, id: string) {
      // Only process test files
      if (!id.endsWith('.test.ts')) return null;

      const lines = code.split(/\r?\n/);
      const newLines: string[] = [];

      for (const line of lines) {
        const match = line.match(/^\/\/\/\s*#include\s+(.+)$/);
        if (!match) {
          newLines.push(line);
          continue;
        }

        const includePath = match[1].trim();
        const resolved = path.resolve(path.dirname(id), includePath);
        const includedContent = fs.readFileSync(resolved, 'utf-8');

        /* prettier-ignore */
        newLines.push(`// --- included: ${includePath} ---`);
        newLines.push(includedContent);
        newLines.push(`// --- end include: ${includePath} ---`);
      }

      return newLines.join('\n');
    },
  };
}
