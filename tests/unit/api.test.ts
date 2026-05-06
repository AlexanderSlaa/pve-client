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

	it('calls /cluster/status endpoint', async () => {
		const client = new Client({
			baseUrl: 'https://pve.local',
			apiToken: 'token',
			fetch: vi.fn(),
		});
		const requestSpy = vi.spyOn(client, 'request').mockResolvedValue([{name: 'node1'}] as never);

		const result = await client.api.cluster.status.index();

		expect(requestSpy).toHaveBeenCalledWith('/cluster/ha/status', 'GET', {});
		expect(result).toEqual([{name: 'node1'}]);
	});
});
