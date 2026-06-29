import { describe, it, expect, vi } from 'vitest';
import Cluster from '../../src/api/cluster';
import type { Client } from '../../src/index';

describe('Cluster API - SDN', () => {
  it('should list SDN config', () => {
    const client = { request: vi.fn().mockReturnValue([]) } as unknown as Client;
    const api = Cluster(client);
    expect(() => api.sdn.index()).not.toThrow();
  });
  it('should reload SDN', () => {
    const client = { request: vi.fn().mockReturnValue({}) } as unknown as Client;
    const api = Cluster(client);
    expect(() => api.sdn.reload({} as never)).not.toThrow();
  });
});
