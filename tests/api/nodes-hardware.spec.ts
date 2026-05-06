import { describe, it, expect, vi } from 'vitest';
import { hardwareFactory } from '../../src/api/nodes/hardware.js';
import type { Client } from '../../src/index';

describe('Nodes API - hardware', () => {
  it('should list PCI devices', () => {
    const client = { request: vi.fn().mockReturnValue([]) } as unknown as Client;
    const api = hardwareFactory(client);
    expect(() => api.pci.get('pve')).not.toThrow();
  });
  it('should list USB devices', () => {
    const client = { request: vi.fn().mockReturnValue([]) } as unknown as Client;
    const api = hardwareFactory(client);
    expect(() => api.usb.get('pve')).not.toThrow();
  });
});
