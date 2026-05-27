import { describe, it, expect } from 'vitest';
import { bodyToBuffer } from '../../src/fetch.js';

describe('fetch pipe type-guard', () => {
  it('detects object with pipe function', async () => {
    // Simulate a Node.js Readable-like object with pipe
    const fakeStream = {
      pipe: () => 'ok',
      async *[Symbol.asyncIterator]() {
        yield Buffer.from('abc');
      }
    };
    const result = await bodyToBuffer(fakeStream);
    expect(result).toBeInstanceOf(Buffer);
    expect(result.toString()).toBe('abc');
  });
  it('ignores object without pipe', async () => {
    const body = { notPipe: true };
    await expect(bodyToBuffer(body)).rejects.toBeInstanceOf(TypeError);
  });
});