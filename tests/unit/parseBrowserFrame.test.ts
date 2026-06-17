import { describe, it, expect } from 'vitest';
import { parseBrowserFrame } from '../../src/helpers/Terminal.js';

describe('parseBrowserFrame', () => {
  it('returns input kind for malformed legacy resize', () => {
    const result = parseBrowserFrame('R:bad', 'R:');
    expect(result.kind).toBe('input');
  });
  it('returns input kind for missing colon', () => {
    const result = parseBrowserFrame('R:123', 'R:');
    expect(result.kind).toBe('input');
  });
});