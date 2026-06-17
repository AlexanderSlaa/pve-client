import { describe, it, expect, vi } from 'vitest';
import Access from '../../src/api/access';
import type { Client } from '../../src/index';

describe('Access API - TFA', () => {
  it('should list TFA entries', () => {
    const client = { request: vi.fn().mockReturnValue([]) } as unknown as Client;
    const api = Access(client);
    expect(() => api.tfa.index()).not.toThrow();
  });
  it('should create TFA entry', () => {
    const client = { request: vi.fn().mockReturnValue({ id: 'tfa1' }) } as unknown as Client;
    const api = Access(client);
    expect(() => api.tfa.create({ $path: { userid: 'root@pam' }, $body: { type: 'totp' } } as never)).not.toThrow();
  });
});
