import { describe, it, expect, vi } from 'vitest';
import Version from '../../src/api/version';
import type { Client } from '../../src/index';

describe('Version API', () => {
  it('should export a function', () => {
    expect(typeof Version).toBe('function');
  });

  it('should create API object with expected endpoints', () => {
    const client = {} as unknown as Client;
    const api = Version(client);
    expect(api).toHaveProperty('version');
  });

  it('should handle missing client gracefully', () => {
    expect(() => Version(undefined as unknown as Client)).not.toThrow();
  });

  it('should allow calling version endpoint', () => {
    const client = { request: vi.fn().mockReturnValue({}) } as unknown as Client;
    const api = Version(client);
    expect(() => api.version()).not.toThrow();
  });
});

