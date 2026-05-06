import { describe, it, expect, vi } from 'vitest';
import Cluster from '../../src/api/cluster';
import type { Client } from '../../src/index';

describe('Cluster API - replication', () => {
  it('should list replication jobs', () => {
    const client = { request: vi.fn().mockReturnValue([]) } as unknown as Client;
    const api = Cluster(client);
    expect(() => api.replication.index()).not.toThrow();
  });
  it('should create replication job', () => {
    const client = { request: vi.fn().mockReturnValue({}) } as unknown as Client;
    const api = Cluster(client);
    expect(() => api.replication.create({ $body: { id: 'job1' } } as never)).not.toThrow();
  });
});
