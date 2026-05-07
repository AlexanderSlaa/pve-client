import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Terminal } from '../../src/helpers/Terminal.js';

const mockedWs = vi.hoisted(() => {
  const wsCtorSpy = vi.fn();

  class MockWebSocket {
    static OPEN = 1;
    static CONNECTING = 0;

    public readyState = MockWebSocket.CONNECTING;
    public sent: string[] = [];
    public handlers = new Map<string, Array<(...args: unknown[]) => void>>();
    public headers?: Record<string, string>;

    constructor(
      public readonly url: string,
      options?: { headers?: Record<string, string> }
    ) {
      this.headers = options?.headers;
      wsCtorSpy(url, options);
    }

    on(event: string, listener: (...args: unknown[]) => void): void {
      const list = this.handlers.get(event) ?? [];
      list.push(listener);
      this.handlers.set(event, list);
    }

    send(payload: string): void {
      this.sent.push(payload);
    }

    close(): void {
      this.readyState = 3;
      const closeHandlers = this.handlers.get('close') ?? [];
      for (const handler of closeHandlers) handler();
    }
  }

  return { wsCtorSpy, MockWebSocket };
});

vi.mock('ws', () => ({
  default: mockedWs.MockWebSocket,
}));

describe('Terminal helper auth headers', () => {
  beforeEach(() => {
    mockedWs.wsCtorSpy.mockClear();
  });

  it('uses Authorization header when API token auth is active', async () => {
    const client = {
      sessionCookie: () => undefined,
      tokenAuthorizationHeader: () => 'PVEAPIToken=root@pam!id=secret',
    };
    const terminal = new Terminal(100, client as never);

    vi.spyOn(terminal as never, 'getConnectionInfo').mockResolvedValue({
      vmid: 100,
      node: 'pve',
      type: 'qemu',
      ticket: { port: 5900, ticket: 'ticket', upid: 'upid', user: 'root@pam' },
      websocketUrl: 'wss://pve.local/api2/json/ws',
      authMessage: 'root@pam:ticket\n',
    });

    await terminal.open({ reconnect: false });

    expect(mockedWs.wsCtorSpy).toHaveBeenCalledTimes(1);
    const [, options] = mockedWs.wsCtorSpy.mock.calls[0] as [string, { headers?: Record<string, string> }];
    expect(options.headers?.Authorization).toBe('PVEAPIToken=root@pam!id=secret');
    expect(options.headers?.Cookie).toBeUndefined();
  });

  it('uses Cookie header when session-cookie auth is active', async () => {
    const client = {
      sessionCookie: () => 'PVEAuthCookie=ticket-cookie',
      tokenAuthorizationHeader: () => undefined,
    };
    const terminal = new Terminal(101, client as never);

    vi.spyOn(terminal as never, 'getConnectionInfo').mockResolvedValue({
      vmid: 101,
      node: 'pve',
      type: 'lxc',
      ticket: { port: 5901, ticket: 'ticket2', upid: 'upid2', user: 'root@pam' },
      websocketUrl: 'wss://pve.local/api2/json/ws2',
      authMessage: 'root@pam:ticket2\n',
    });

    await terminal.open({ reconnect: false });

    expect(mockedWs.wsCtorSpy).toHaveBeenCalledTimes(1);
    const [, options] = mockedWs.wsCtorSpy.mock.calls[0] as [string, { headers?: Record<string, string> }];
    expect(options.headers?.Cookie).toBe('PVEAuthCookie=ticket-cookie');
    expect(options.headers?.Authorization).toBeUndefined();
  });

  it('fails fast when neither cookie nor API token auth is available', async () => {
    const client = {
      sessionCookie: () => undefined,
      tokenAuthorizationHeader: () => undefined,
    };
    const terminal = new Terminal(102, client as never);

    await expect(terminal.open({ reconnect: false })).rejects.toThrow(
      'Missing authentication for terminal websocket. Provide login cookie or API token.'
    );
    expect(mockedWs.wsCtorSpy).not.toHaveBeenCalled();
  });
});
