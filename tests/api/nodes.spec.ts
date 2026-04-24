import { describe, it, expect, vi } from 'vitest';
import { hardwareFactory } from '../../src/api/nodes/hardware.js';
import { lxcFactory } from '../../src/api/nodes/lxc.js';
import { qemuFactory } from '../../src/api/nodes/qemu.js';
import { aptFactory } from '../../src/api/nodes/apt.js';
import { cephFactory } from '../../src/api/nodes/ceph.js';
import { disksFactory } from '../../src/api/nodes/disks.js';
import { firewallFactory } from '../../src/api/nodes/firewall.js';
import { Client } from '../../src/index.js';

describe('Nodes API Modular Factories', () => {
  const client = { request: vi.fn() } as unknown as Client;

  it('hardwareFactory returns expected structure', () => {
    const api = hardwareFactory(client);
    expect(api).toHaveProperty('pci');
    expect(api).toHaveProperty('usb');
    expect(() => api.pci.index()).toThrow('Not implemented');
    expect(() => api.usb.index()).toThrow('Not implemented');
  });

  it('lxcFactory returns an object', () => {
    const api = lxcFactory(client);
    expect(typeof api).toBe('object');
  });

  it('qemuFactory returns an object', () => {
    const api = qemuFactory(client);
    expect(typeof api).toBe('object');
  });

  it('aptFactory returns an object', () => {
    const api = aptFactory(client);
    expect(typeof api).toBe('object');
  });

  it('cephFactory returns an object', () => {
    const api = cephFactory(client);
    expect(typeof api).toBe('object');
  });

  it('disksFactory returns an object', () => {
    const api = disksFactory(client);
    expect(typeof api).toBe('object');
  });

  it('firewallFactory returns an object', () => {
    const api = firewallFactory(client);
    expect(typeof api).toBe('object');
  });
});


