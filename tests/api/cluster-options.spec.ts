import { describe, it, expect, vi } from 'vitest';
import Cluster from '../../src/api/cluster';
import type { Client } from '../../src/index';

describe('Cluster API - options', () => {
  it('should get cluster options', () => {
    const client = { request: vi.fn().mockReturnValue({}) } as unknown as Client;
    const api = Cluster(client);
    expect(() => api.options.get_options()).not.toThrow();
  });
  it('should update cluster options', () => {
    const client = { request: vi.fn().mockReturnValue({}) } as unknown as Client;
    const api = Cluster(client);
    expect(() => api.options.set_options({ $body: { migration: 'secure' } } as never)).not.toThrow();
  });
});
