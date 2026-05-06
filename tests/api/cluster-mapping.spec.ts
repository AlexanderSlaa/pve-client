import { describe, it, expect, vi } from 'vitest';
import Cluster from '../../src/api/cluster';
import type { Client } from '../../src/index';

describe('Cluster API - mapping', () => {
  it('should list hardware mappings', () => {
    const client = { request: vi.fn().mockReturnValue([]) } as unknown as Client;
    const api = Cluster(client);
    expect(() => api.mapping.index()).not.toThrow();
  });
  it('should create PCI hardware mapping', () => {
    const client = { request: vi.fn().mockReturnValue({}) } as unknown as Client;
    const api = Cluster(client);
    expect(() => api.mapping.pci.create({ $body: { id: 'map1' } } as never)).not.toThrow();
  });
});
