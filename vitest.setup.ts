// Redirect all D:/Temp and /Temp references to c:/temp/vite for Vitest
import { beforeAll } from 'vitest';
import path from 'node:path';

beforeAll(() => {
  // Patch process.env.TEMP, TMP, and TMPDIR
  process.env.TEMP = 'c:/temp/vite';
  process.env.TMP = 'c:/temp/vite';
  process.env.TMPDIR = 'c:/temp/vite';

  // Patch os.tmpdir if possible
  try {
    const os = require('os');
    if (os && typeof os.tmpdir === 'function') {
      os.tmpdir = () => 'c:/temp/vite';
    }
  } catch {}

  // Patch globalThis if any test code uses it
  if (globalThis && typeof globalThis === 'object') {
    globalThis.TEMP = 'c:/temp/vite';
    globalThis.TMP = 'c:/temp/vite';
    globalThis.TMPDIR = 'c:/temp/vite';
  }
});
