import { describe, it, expect, vi } from 'vitest';
import Nodes from '../../src/api/nodes';
import type { Client } from '../../src/index';

describe('Nodes API - hardware', () => {
  it('should list PCI devices (not implemented)', () => {
    const client = { request: vi.fn() } as unknown as Client;
    const api = Nodes(client);
    expect(() => api.node('pve').hardware.pci.index()).toThrow('Not implemented');
  });
  it('should list USB devices (not implemented)', () => {
    const client = { request: vi.fn() } as unknown as Client;
    const api = Nodes(client);
    expect(() => api.node('pve').hardware.usb.index()).toThrow('Not implemented');
  });
});
