import { describe, it, expect, vi } from 'vitest';
import Access from '../../src/api/access';
import type { Client } from '../../src/index';

describe('Access API', () => {
  it('should export a function', () => {
    expect(typeof Access).toBe('function');
  });

  it('should create API object with expected endpoints', () => {
    const client = {} as unknown as Client;
    const api = Access(client);
    expect(api).toHaveProperty('roles');
    expect(api).toHaveProperty('groups');
    expect(api).toHaveProperty('domains');
    expect(api).toHaveProperty('permissions');
    expect(api).toHaveProperty('tfa');
  });

  it('should handle missing client gracefully', () => {
    expect(() => Access(undefined as unknown as Client)).not.toThrow();
  });

  it('should allow calling roles index endpoint', () => {
    const client = { request: vi.fn().mockReturnValue([]) } as unknown as Client;
    const api = Access(client);
    expect(() => api.roles.index()).not.toThrow();
  });

  it('should allow calling groups index endpoint', () => {
    const client = { request: vi.fn().mockReturnValue([]) } as unknown as Client;
    const api = Access(client);
    expect(() => api.groups.index()).not.toThrow();
  });
});
