import { describe, it, expect } from 'vitest';
import * as NoVNC from '../../src/helpers/NoVNC.js';

describe('RetryableError', () => {
  it('is instance of Error and has retryable', () => {
    // @ts-expect-error: private
    const err = NoVNC.createConnectError('fail', true);
    expect(err).toBeInstanceOf(Error);
    expect('retryable' in err).toBe(true);
    expect(err.retryable).toBe(true);
  });
});