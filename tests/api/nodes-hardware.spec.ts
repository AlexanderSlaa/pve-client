import { describe, it, expect, vi } from 'vitest';
import { hardwareFactory } from '../../src/api/nodes/hardware.js';
import type { Client } from '../../src/index';

describe('Nodes API - hardware', () => {
  it('should list PCI devices (not implemented)', () => {
    const client = { request: vi.fn() } as unknown as Client;
    const api = hardwareFactory(client);
    expect(() => api.pci.index()).toThrow('Not implemented');
  });
  it('should list USB devices (not implemented)', () => {
    const client = { request: vi.fn() } as unknown as Client;
    const api = hardwareFactory(client);
    expect(() => api.usb.index()).toThrow('Not implemented');
  });
});
