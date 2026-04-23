import { describe, it, expect, vi } from 'vitest';
import Nodes from '../../src/api/nodes';
import type { Client } from '../../src/index';
import { Client } from '../../src/index';

describe('Nodes API', () => {
  it('should export a function', () => {
    expect(typeof Nodes).toBe('function');
  });

  it('should create API object with expected endpoints', () => {
    const client = {} as unknown as Client;
    const api = Nodes(client);
    expect(api).toHaveProperty('list');
    expect(api).toHaveProperty('get');
    // Node-specific endpoints are nested:
    const nodeApi = api.get('testnode');
    expect(nodeApi).toHaveProperty('aplinfo');
    expect(nodeApi).toHaveProperty('apt');
    expect(nodeApi).toHaveProperty('lxc');
    expect(nodeApi).toHaveProperty('qemu');
  });

  it('should handle missing client gracefully', () => {
    import type { Client } from '../../src/index';
    expect(() => Nodes(undefined as unknown as Client)).not.toThrow();
  });

  it('should allow calling list endpoint', () => {
    const client = { request: vi.fn().mockReturnValue([]) } as unknown as Client;
    const api = Nodes(client);
    expect(() => api.list()).not.toThrow();
  });

  it('should allow calling get(node) endpoint', () => {
    const client = { request: vi.fn().mockReturnValue({}) } as unknown as Client;
    const api = Nodes(client);
    expect(() => api.get('testnode')).not.toThrow();
  });

  it('should allow calling lxc list endpoint for a node', () => {
    const client = { request: vi.fn().mockReturnValue([]) } as unknown as Client;
    const api = Nodes(client);
    const nodeApi = api.get('testnode');
    expect(() => nodeApi.lxc.list()).not.toThrow();
  });

  it('should allow calling qemu list endpoint for a node', () => {
    const client = { request: vi.fn().mockReturnValue([]) } as unknown as Client;
    const api = Nodes(client);
    const nodeApi = api.get('testnode');
    expect(() => nodeApi.qemu.list()).not.toThrow();
  });
});


