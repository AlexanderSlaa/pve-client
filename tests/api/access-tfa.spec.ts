import { describe, it, expect, vi } from 'vitest';
import Access from '../../src/api/access';
import type { Client } from '../../src/index';

describe('Access API - TFA', () => {
  it('should list TFA entries (not implemented)', () => {
    const client = { request: vi.fn() } as unknown as Client;
    const api = Access(client);
    expect(() => api.tfa.index()).toThrow('Not implemented');
  });
  it('should create TFA entry (not implemented)', () => {
    const client = { request: vi.fn() } as unknown as Client;
    const api = Access(client);
    expect(() => api.tfa.create({ $body: { id: 'tfa1' } })).toThrow('Not implemented');
  });
});
