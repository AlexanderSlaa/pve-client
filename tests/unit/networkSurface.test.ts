import { describe, it, expectTypeOf } from 'vitest';
import type { NodesAPI } from '../../src/api/nodes/types.js';

/**
 * Canary test for network API surface.
 *
 * Ensures /nodes/{node}/network and /nodes/{node}/network/{iface} exist
 * and have properly typed methods, parameters, and return types.
 */
describe('Network API surface', () => {
    type Network = NodesAPI['/nodes/{node}/network'];
    type NetworkIface = NodesAPI['/nodes/{node}/network/{iface}'];

    type NetworkGetReturn = Network['GET']['return'];
    type NetworkPostBody = Network['POST']['parameters']['$body'];
    type NetworkIfaceGetReturn = NetworkIface['GET']['return'];

    describe('GET /nodes/{node}/network', () => {
        it('has iface (required string)', () => {
            expectTypeOf<NetworkGetReturn[number]>().toHaveProperty('iface').toBeString();
        });

        it('has type with network interface types', () => {
            expectTypeOf<NetworkGetReturn[number]>().toHaveProperty('type').toBeString();
        });

        it('has active as boolean', () => {
            expectTypeOf<NetworkGetReturn[number]>().toHaveProperty('active').toBeBoolean();
        });

        it('has method enum (loopback | dhcp | manual | static | auto)', () => {
            expectTypeOf<NetworkGetReturn[number]>().toHaveProperty('method');
        });

        it('has bridge_ports', () => {
            expectTypeOf<NetworkGetReturn[number]>().toHaveProperty('bridge_ports').toBeString();
        });

        it('has mtu as number', () => {
            expectTypeOf<NetworkGetReturn[number]>().toHaveProperty('mtu').toBeNumber();
        });

        it('has gateway', () => {
            expectTypeOf<NetworkGetReturn[number]>().toHaveProperty('gateway').toBeString();
        });

        it('has cidr', () => {
            expectTypeOf<NetworkGetReturn[number]>().toHaveProperty('cidr').toBeString();
        });

        it('has netmask', () => {
            expectTypeOf<NetworkGetReturn[number]>().toHaveProperty('netmask').toBeString();
        });

        it('has bond_mode', () => {
            expectTypeOf<NetworkGetReturn[number]>().toHaveProperty('bond_mode');
        });

        it('has autostart as boolean', () => {
            expectTypeOf<NetworkGetReturn[number]>().toHaveProperty('autostart').toBeBoolean();
        });
    });

    describe('POST /nodes/{node}/network', () => {
        it('requires iface in body', () => {
            expectTypeOf<NetworkPostBody>().toHaveProperty('iface').toBeString();
        });

        it('requires type in body', () => {
            expectTypeOf<NetworkPostBody>().toHaveProperty('type').toBeString();
        });

        it('has optional bridge_ports', () => {
            expectTypeOf<NetworkPostBody>().toHaveProperty('bridge_ports');
        });

        it('has optional method', () => {
            expectTypeOf<NetworkPostBody>().toHaveProperty('method');
        });
    });

    describe('GET /nodes/{node}/network/{iface}', () => {
        it('has method', () => {
            expectTypeOf<NetworkIfaceGetReturn>().toHaveProperty('method').toBeString();
        });

        it('has type', () => {
            expectTypeOf<NetworkIfaceGetReturn>().toHaveProperty('type').toBeString();
        });
    });
});
