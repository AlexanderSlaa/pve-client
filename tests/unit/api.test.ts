import {describe, expect, it, vi} from 'vitest';
import {Client} from '../../src/index.js';

describe('API Endpoints', () => {
	it('calls /version endpoint', async () => {
		const client = new Client({
			baseUrl: 'https://pve.local',
			apiToken: 'token',
			fetch: vi.fn(),
		});
		const requestSpy = vi.spyOn(client, 'request').mockResolvedValue({version: '1.2.3'} as never);

		const result = await client.api.version.version();

		expect(requestSpy).toHaveBeenCalledWith('/version', 'GET', {});
		expect(result).toEqual({version: '1.2.3'});
	});

	it('calls /access/users endpoint', async () => {
		const client = new Client({
			baseUrl: 'https://pve.local',
			apiToken: 'token',
			fetch: vi.fn(),
		});
		const requestSpy = vi.spyOn(client, 'request').mockResolvedValue([{userid: 'root@pam'}] as never);

		const result = await client.api.access.users.index();

		expect(requestSpy).toHaveBeenCalledWith('/access/users', 'GET', {});
		expect(result).toEqual([{userid: 'root@pam'}]);
	});

	// Regression: cluster.status was a statusFactory sub-object, not a callable.
	//   Caused: "TypeError: client.api.cluster.status is not a function"
	it('calls GET /cluster/status via client.api.cluster.status()', async () => {
		const client = new Client({
			baseUrl: 'https://pve.local',
			apiToken: 'token',
			fetch: vi.fn(),
		});
		const mockStatus = [{ id: 'pve', name: 'pve', type: 'cluster' as const }];
		const requestSpy = vi.spyOn(client, 'request').mockResolvedValue(mockStatus as never);

		const result = await client.api.cluster.status();

		expect(requestSpy).toHaveBeenCalledWith('/cluster/status', 'GET', {});
		expect(result).toEqual(mockStatus);
	});

	// Regression: client.api.cluster.nextid was missing, causing the runtime error:
	//   "TypeError: clusterApi.nextid is not a function" in clone-from-template
	it('calls GET /cluster/nextid via client.api.cluster.nextid()', async () => {
		const client = new Client({
			baseUrl: 'https://pve.local',
			apiToken: 'token',
			fetch: vi.fn(),
		});
		const requestSpy = vi.spyOn(client, 'request').mockResolvedValue(200 as never);

		const result = await client.api.cluster.nextid();

		expect(requestSpy).toHaveBeenCalledWith('/cluster/nextid', 'GET', {});
		expect(result).toBe(200);
	});

	it('calls GET /cluster/nextid with optional vmid query param', async () => {
		const client = new Client({
			baseUrl: 'https://pve.local',
			apiToken: 'token',
			fetch: vi.fn(),
		});
		const requestSpy = vi.spyOn(client, 'request').mockResolvedValue(300 as never);

		const result = await client.api.cluster.nextid({ $query: { vmid: 300 } });

		expect(requestSpy).toHaveBeenCalledWith('/cluster/nextid', 'GET', { $query: { vmid: 300 } });
		expect(result).toBe(300);
	});

	// Regression: client.api.nodes.list was missing, causing the runtime error:
	//   "Connection/auth error: TypeError: client.api.nodes.list is not a function"
	it('calls GET /nodes via client.api.nodes.list()', async () => {
		const client = new Client({
			baseUrl: 'https://pve.local',
			apiToken: 'token',
			fetch: vi.fn(),
		});
		const mockNodes = [{ node: 'pve', status: 'online' }];
		const requestSpy = vi.spyOn(client, 'request').mockResolvedValue(mockNodes as never);

		const result = await client.api.nodes.list();

		expect(requestSpy).toHaveBeenCalledWith('/nodes', 'GET', {});
		expect(result).toEqual(mockNodes);
	});

	it('client.api.nodes.get(node) returns node-scoped sub-APIs', () => {
		const client = new Client({
			baseUrl: 'https://pve.local',
			apiToken: 'token',
			fetch: vi.fn(),
		});

		const nodeApi = client.api.nodes.get('pve');

		expect(typeof nodeApi.qemu).toBe('object');
		expect(typeof nodeApi.lxc).toBe('object');
	});

	// Regression: nodes.get(node).qemu.vmid was missing, causing:
	//   "TypeError: typedNodeApi.qemu.vmid is not a function" in clone-from-template
	it('calls POST /nodes/{node}/qemu/{vmid}/clone via nodes.get(node).qemu.vmid(id).clone()', async () => {
		const client = new Client({
			baseUrl: 'https://pve.local',
			apiToken: 'token',
			fetch: vi.fn(),
		});
		const requestSpy = vi.spyOn(client, 'request').mockResolvedValue('UPID:pve:001:clone' as never);

		const upid = await client.api.nodes.get('pve').qemu.vmid(101).clone({
			$path: { node: 'pve', vmid: 101 },
			$body: { newid: 200, name: 'cloned-vm', full: 1 },
		});

		expect(requestSpy).toHaveBeenCalledWith(
			'/nodes/{node}/qemu/{vmid}/clone',
			'POST',
			expect.objectContaining({ $path: { node: 'pve', vmid: 101 } })
		);
		expect(upid).toBe('UPID:pve:001:clone');
	});

	// Regression: nodes.get(node).lxc.id was missing, causing the same pattern
	//   for LXC container clone operations
	it('calls POST /nodes/{node}/lxc/{vmid}/clone via nodes.get(node).lxc.id(vmid).clone()', async () => {
		const client = new Client({
			baseUrl: 'https://pve.local',
			apiToken: 'token',
			fetch: vi.fn(),
		});
		const requestSpy = vi.spyOn(client, 'request').mockResolvedValue('UPID:pve:002:clone' as never);

		const upid = await client.api.nodes.get('pve').lxc.id(201).clone({
			$path: { node: 'pve', vmid: 201 },
			$body: { newid: 300, hostname: 'cloned-ct', full: 1 },
		});

		expect(requestSpy).toHaveBeenCalledWith(
			'/nodes/{node}/lxc/{vmid}/clone',
			'POST',
			expect.objectContaining({ $path: { node: 'pve', vmid: 201 } })
		);
		expect(upid).toBe('UPID:pve:002:clone');
	});
});
