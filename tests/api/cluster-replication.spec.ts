import { describe, it, expect, vi } from 'vitest';
import Cluster from '../../src/api/cluster';
import type { Client } from '../../src/index';

describe('Cluster API - replication', () => {
  it('should list replication jobs (not implemented)', () => {
    const client = { request: vi.fn() } as unknown as Client;
    const api = Cluster(client);
    expect(() => api.replication.index()).toThrow('Not implemented');
  });
  it('should create replication job (not implemented)', () => {
    const client = { request: vi.fn() } as unknown as Client;
    const api = Cluster(client);
    expect(() => api.replication.create({ $body: { id: 'job1' } })).toThrow('Not implemented');
  });
});
