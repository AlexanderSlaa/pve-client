// Redirect all D:/Temp and /Temp references to c:/temp/vite for Vitest
import { beforeAll } from 'vitest';
import os from 'os';
import path from 'path';

let realTmpdir: string;

beforeAll(() => {
  // Save the real tmpdir
  realTmpdir = os.tmpdir();
  const viteTmp = path.join(realTmpdir, 'vite');

  // Patch process.env.TEMP, TMP, and TMPDIR
  process.env.TEMP = viteTmp;
  process.env.TMP = viteTmp;
  process.env.TMPDIR = viteTmp;

  // Patch os.tmpdir to return vite subdir
  os.tmpdir = () => viteTmp;

  // Patch globalThis if any test code uses it
  if (globalThis && typeof globalThis === 'object') {
    globalThis.TEMP = viteTmp;
    globalThis.TMP = viteTmp;
    globalThis.TMPDIR = viteTmp;
  }
});
