import { describe, it, expect, vi } from 'vitest';
import Cluster from '../../src/api/cluster';
import type { Client } from '../../src/index';

describe('Cluster API - SDN', () => {
  it('should list SDN fabrics (not implemented)', () => {
    const client = { request: vi.fn() } as unknown as Client;
    const api = Cluster(client);
    expect(() => api.sdn.fabrics.index()).toThrow('Not implemented');
  });
  it('should create SDN fabric (not implemented)', () => {
    const client = { request: vi.fn() } as unknown as Client;
    const api = Cluster(client);
    expect(() => api.sdn.fabrics.create({ $body: { id: 'test' } })).toThrow('Not implemented');
  });
});
