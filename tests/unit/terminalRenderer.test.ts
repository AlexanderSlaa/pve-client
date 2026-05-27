import { describe, it, expect } from 'vitest';
import { TerminalRenderer } from '../../src/helpers/Terminal.js';

describe('TerminalRenderer', () => {
  it('throws if input exceeds max buffer size', () => {
    const renderer = new TerminalRenderer();
    const big = 'x'.repeat(1024 * 1024 + 1);
    expect(() => renderer.write(big)).toThrow(/max buffer size/);
  });
});