import { describe, it, expect, vi } from 'vitest';
import Pools from '../../src/api/pools';
import type { Client } from '../../src/index';
import { Client } from '../../src/index';

describe('Pools API', () => {
  it('should export a function', () => {
    expect(typeof Pools).toBe('function');
  });

  it('should create API object with expected endpoints', () => {
    const client = {} as unknown as Client;
    const api = Pools(client);
    expect(api).toHaveProperty('index');
    expect(api).toHaveProperty('create');
    expect(api).toHaveProperty('update');
    expect(api).toHaveProperty('delete');
    expect(api).toHaveProperty('id');
    // Add more endpoint checks as needed
  });

  it('should handle missing client gracefully', () => {
    import type { Client } from '../../src/index';
    expect(() => Pools(undefined as unknown as Client)).not.toThrow();
  });

  it('should allow calling index endpoint', () => {
    const client = { request: vi.fn().mockReturnValue([]) } as unknown as Client;
    const api = Pools(client);
    expect(() => api.index()).not.toThrow();
  });

  it('should allow calling id sub-endpoint', () => {
    const client = { request: vi.fn().mockReturnValue({}) } as unknown as Client;
    const api = Pools(client);
    expect(() => api.id('testpool')).not.toThrow();
  });
});

