import { describe, it, expect, vi } from 'vitest';
import Cluster from '../../src/api/cluster';
import type { Client } from '../../src/index';

describe('Cluster API - options', () => {
  it('should get cluster options (not implemented)', () => {
    const client = { request: vi.fn() } as unknown as Client;
    const api = Cluster(client);
    expect(() => api.options.index()).toThrow('Not implemented');
  });
  it('should update cluster options (not implemented)', () => {
    const client = { request: vi.fn() } as unknown as Client;
    const api = Cluster(client);
    expect(() => api.options.update({ $body: { migration: 'secure' } })).toThrow('Not implemented');
  });
});
