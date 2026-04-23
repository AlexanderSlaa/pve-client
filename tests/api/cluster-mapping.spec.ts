import { describe, it, expect, vi } from 'vitest';
import Cluster from '../../src/api/cluster';
import type { Client } from '../../src/index';

describe('Cluster API - mapping', () => {
  it('should list hardware mappings (not implemented)', () => {
    const client = { request: vi.fn() } as unknown as Client;
    const api = Cluster(client);
    expect(() => api.mapping.index()).toThrow('Not implemented');
  });
  it('should create hardware mapping (not implemented)', () => {
    const client = { request: vi.fn() } as unknown as Client;
    const api = Cluster(client);
    expect(() => api.mapping.create({ $body: { id: 'map1' } })).toThrow('Not implemented');
  });
});
