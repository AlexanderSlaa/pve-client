import { describe, it, expect, vi } from 'vitest';
import Cluster from '../../src/api/cluster';
import type { Client } from '../../src/index';

describe('Cluster API - ACME', () => {
  it('should list plugin options', () => {
    const client = { request: vi.fn().mockReturnValue([]) } as unknown as Client;
    const api = Cluster(client);
    expect(() => api.acme.plugins.options.index()).not.toThrow();
  });

  it('should update plugin options', () => {
    const client = { request: vi.fn().mockReturnValue({}) } as unknown as Client;
    const api = Cluster(client);
    expect(() => api.acme.plugins.options.update({ $body: { id: 'plugin1', type: 'dns' } } as never)).not.toThrow();
  });
});
