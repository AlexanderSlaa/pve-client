import { describe, it, expect, vi } from 'vitest';
import Cluster from '../../src/api/cluster';
import type { Client } from '../../src/index';
import { Client } from '../../src/index';

describe('Cluster API', () => {
  it('should export a function', () => {
    expect(typeof Cluster).toBe('function');
  });

  it('should create API object with expected endpoints', () => {
    const client = {} as unknown as Client;
    const api = Cluster(client);
    expect(api).toHaveProperty('index');
    expect(api).toHaveProperty('acme');
    expect(api).toHaveProperty('backup');
    expect(api).toHaveProperty('ceph');
    expect(api).toHaveProperty('bulk_action');
    expect(api).toHaveProperty('backup_info');
    // Add more endpoint checks as needed
  });

  it('should handle missing client gracefully', () => {
    import type { Client } from '../../src/index';
    expect(() => Cluster(undefined as unknown as Client)).not.toThrow();
  });

  it('should allow calling index endpoint', () => {
    const client = { request: vi.fn().mockReturnValue([]) } as unknown as Client;
    const api = Cluster(client);
    expect(() => api.index()).not.toThrow();
  });

  it('should allow calling backup.index endpoint', () => {
    const client = { request: vi.fn().mockReturnValue([]) } as unknown as Client;
    const api = Cluster(client);
    expect(() => api.backup.index()).not.toThrow();
  });

  it('should allow calling backup_info.index endpoint', () => {
    const client = { request: vi.fn().mockReturnValue([]) } as unknown as Client;
    const api = Cluster(client);
    expect(() => api.backup_info.index()).not.toThrow();
  });
});

