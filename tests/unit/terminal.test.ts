import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Terminal, TerminalSession, bridgeTerminalSessionToSocket, openTerminalBridge } from '../../src/helpers/Terminal.js';
import { attachLocalPromptNudge } from '../../src/helpers/LocalPromptNudge.js';

const mockedWs = vi.hoisted(() => {
  const wsCtorSpy = vi.fn();

  class MockWebSocket {
    static OPEN = 1;
    static CONNECTING = 0;

    public readyState = MockWebSocket.CONNECTING;
    public sent: Array<string | Buffer> = [];
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

    emit(event: string, ...args: unknown[]): void {
      const list = this.handlers.get(event) ?? [];
      for (const handler of list) handler(...args);
    }

    send(payload: string | Buffer): void {
      this.sent.push(payload);
    }

    close(): void {
      this.readyState = 3;
      this.emit('close');
    }
  }

  return { wsCtorSpy, MockWebSocket };
});

function sentFrameText(frame: string | Buffer): string {
  return typeof frame === 'string' ? frame : frame.toString('utf8');
}

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

describe('Terminal session resiliency', () => {
  it('does not throw on socket error when consumer has no error listener', async () => {
    const socket = new mockedWs.MockWebSocket('wss://pve.local/ws');
    const session = new TerminalSession(
      async () => ({
        socket: socket as never,
        info: {
          vmid: 100,
          node: 'pve',
          type: 'qemu',
          ticket: { port: 5900, ticket: 'ticket', upid: 'upid', user: 'root@pam' },
          websocketUrl: 'wss://pve.local/ws',
          authMessage: 'root@pam:ticket\n'
        }
      }),
      {
        reconnect: false,
        reconnectIntervalMs: 1500,
        reconnectMaxAttempts: 1
      }
    );

    await session.start();

    expect(() => {
      socket.emit('error', new Error('WebSocket was closed before the connection was established'));
    }).not.toThrow();
  });

  it('bridge closes session safely when browser closes before session ready', async () => {
    const socket = new mockedWs.MockWebSocket('wss://pve.local/ws');
    const session = new TerminalSession(
      async () => ({
        socket: socket as never,
        info: {
          vmid: 100,
          node: 'pve',
          type: 'qemu',
          ticket: { port: 5900, ticket: 'ticket', upid: 'upid', user: 'root@pam' },
          websocketUrl: 'wss://pve.local/ws',
          authMessage: 'root@pam:ticket\n'
        }
      }),
      {
        reconnect: false,
        reconnectIntervalMs: 1500,
        reconnectMaxAttempts: 1
      }
    );

    const browserSocket = new mockedWs.MockWebSocket('ws://browser') as never;
    bridgeTerminalSessionToSocket(session, browserSocket);

    await session.start();

    expect(() => {
      browserSocket.emit('close');
      socket.emit('error', new Error('WebSocket was closed before the connection was established'));
    }).not.toThrow();
  });

  it('still sends prompt nudge when pre-ready queued input is only carriage return', async () => {
    vi.useFakeTimers();

    const socket = new mockedWs.MockWebSocket('wss://pve.local/ws');
    const session = new TerminalSession(
      async () => ({
        socket: socket as never,
        info: {
          vmid: 100,
          node: 'pve',
          type: 'qemu',
          ticket: { port: 5900, ticket: 'ticket', upid: 'upid', user: 'root@pam' },
          websocketUrl: 'wss://pve.local/ws',
          authMessage: 'root@pam:ticket\n'
        }
      }),
      {
        reconnect: false,
        reconnectIntervalMs: 1500,
        reconnectMaxAttempts: 1
      }
    );

    const browserSocket = new mockedWs.MockWebSocket('ws://browser') as never;
    bridgeTerminalSessionToSocket(session, browserSocket, { promptNudgeMs: 50 });

    // Browser sends initial Enter before terminal session is ready.
    browserSocket.emit('message', '\r');

    await session.start();

    // Complete websocket handshake and mark connected.
    socket.readyState = mockedWs.MockWebSocket.OPEN;
    socket.emit('open');
    socket.emit('message', Buffer.from('OK'));

    await vi.advanceTimersByTimeAsync(60);

    // First send is queued Enter flush, second is fallback prompt nudge.
    const stdinFrames = socket.sent.filter((frame) => sentFrameText(frame) === '0:1:\r');
    expect(stdinFrames.length).toBe(2);

    vi.useRealTimers();
  });

  it('preserves browser input sent before bridge is attached via openTerminalBridge', async () => {
    const socket = new mockedWs.MockWebSocket('wss://pve.local/ws');
    const session = new TerminalSession(
      async () => ({
        socket: socket as never,
        info: {
          vmid: 100,
          node: 'pve',
          type: 'qemu',
          ticket: { port: 5900, ticket: 'ticket', upid: 'upid', user: 'root@pam' },
          websocketUrl: 'wss://pve.local/ws',
          authMessage: 'root@pam:ticket\n'
        }
      }),
      {
        reconnect: false,
        reconnectIntervalMs: 1500,
        reconnectMaxAttempts: 1
      }
    );

    let releaseOpen: (() => void) | undefined;
    const openGate = new Promise<void>((resolve) => {
      releaseOpen = resolve;
    });

    const terminal = {
      open: vi.fn(async () => {
        await openGate;
        await session.start();
        return session;
      })
    } as unknown as Terminal;

    const browserSocket = new mockedWs.MockWebSocket('ws://browser') as never;
    const openPromise = openTerminalBridge(terminal, browserSocket, {}, { promptNudgeMs: 60_000 });

    // Simulate initial keypress sent right after browser ws open, before session ready/bridge attach.
    browserSocket.emit('message', '\r');

    releaseOpen?.();
    await openPromise;

    socket.readyState = mockedWs.MockWebSocket.OPEN;
    socket.emit('open');
    socket.emit('message', Buffer.from('OK'));

    const stdinFrames = socket.sent.filter((frame) => sentFrameText(frame) === '0:1:\r');
    expect(stdinFrames.length).toBe(1);
  });

  it('does not send prompt nudge after substantial early terminal output if user has not typed input', async () => {
    vi.useFakeTimers();

    const socket = new mockedWs.MockWebSocket('wss://pve.local/ws');
    const session = new TerminalSession(
      async () => ({
        socket: socket as never,
        info: {
          vmid: 100,
          node: 'pve',
          type: 'qemu',
          ticket: { port: 5900, ticket: 'ticket', upid: 'upid', user: 'root@pam' },
          websocketUrl: 'wss://pve.local/ws',
          authMessage: 'root@pam:ticket\n'
        }
      }),
      {
        reconnect: false,
        reconnectIntervalMs: 1500,
        reconnectMaxAttempts: 1
      }
    );

    const browserSocket = new mockedWs.MockWebSocket('ws://browser') as never;
    bridgeTerminalSessionToSocket(session, browserSocket, { promptNudgeMs: 50 });

    await session.start();
    socket.readyState = mockedWs.MockWebSocket.OPEN;
    socket.emit('open');
    socket.emit('message', Buffer.from('OK'));
    socket.readyState = mockedWs.MockWebSocket.OPEN;
    socket.emit('message', Buffer.from('banner-output-too-large\n'));

    await vi.advanceTimersByTimeAsync(60);

    const stdinFrames = socket.sent.filter((frame) => sentFrameText(frame) === '0:1:\r');
    expect(stdinFrames.length).toBe(0);

    vi.useRealTimers();
  });

  it('still sends prompt nudge after small early terminal output', async () => {
    vi.useFakeTimers();

    const socket = new mockedWs.MockWebSocket('wss://pve.local/ws');
    const session = new TerminalSession(
      async () => ({
        socket: socket as never,
        info: {
          vmid: 100,
          node: 'pve',
          type: 'qemu',
          ticket: { port: 5900, ticket: 'ticket', upid: 'upid', user: 'root@pam' },
          websocketUrl: 'wss://pve.local/ws',
          authMessage: 'root@pam:ticket\n'
        }
      }),
      {
        reconnect: false,
        reconnectIntervalMs: 1500,
        reconnectMaxAttempts: 1
      }
    );

    const browserSocket = new mockedWs.MockWebSocket('ws://browser') as never;
    bridgeTerminalSessionToSocket(session, browserSocket, { promptNudgeMs: 50, promptNudgeMaxOutputBytes: 8 });

    await session.start();
    socket.readyState = mockedWs.MockWebSocket.OPEN;
    socket.emit('open');
    socket.emit('message', Buffer.from('OK'));
    socket.emit('message', Buffer.from('1234'));

    await vi.advanceTimersByTimeAsync(60);

    const stdinFrames = socket.sent.filter((frame) => sentFrameText(frame) === '0:1:\r');
    expect(stdinFrames.length).toBe(1);

    vi.useRealTimers();
  });

  it('applies latest resize once before forwarding stdin', async () => {
    const socket = new mockedWs.MockWebSocket('wss://pve.local/ws');
    const session = new TerminalSession(
      async () => ({
        socket: socket as never,
        info: {
          vmid: 100,
          node: 'pve',
          type: 'qemu',
          ticket: { port: 5900, ticket: 'ticket', upid: 'upid', user: 'root@pam' },
          websocketUrl: 'wss://pve.local/ws',
          authMessage: 'root@pam:ticket\n'
        }
      }),
      {
        reconnect: false,
        reconnectIntervalMs: 1500,
        reconnectMaxAttempts: 1
      }
    );

    const browserSocket = new mockedWs.MockWebSocket('ws://browser') as never;
    bridgeTerminalSessionToSocket(session, browserSocket, { promptNudgeMs: 60_000 });

    await session.start();
    socket.readyState = mockedWs.MockWebSocket.OPEN;
    socket.emit('open');
    socket.emit('message', Buffer.from('OK'));

    browserSocket.emit('message', 'R:120:40');
    browserSocket.emit('message', 'abc');

    const resizeFrames = socket.sent.filter((frame) => sentFrameText(frame) === '1:120:40:');
    const stdinFrames = socket.sent.filter((frame) => sentFrameText(frame) === '0:3:abc');
    expect(resizeFrames.length).toBe(1);
    expect(stdinFrames.length).toBe(1);
    expect(socket.sent.findIndex((frame) => sentFrameText(frame) === '1:120:40:'))
      .toBeLessThan(socket.sent.findIndex((frame) => sentFrameText(frame) === '0:3:abc'));
  });

  it('accepts structured json resize and input frames', async () => {
    const socket = new mockedWs.MockWebSocket('wss://pve.local/ws');
    const session = new TerminalSession(
      async () => ({
        socket: socket as never,
        info: {
          vmid: 100,
          node: 'pve',
          type: 'qemu',
          ticket: { port: 5900, ticket: 'ticket', upid: 'upid', user: 'root@pam' },
          websocketUrl: 'wss://pve.local/ws',
          authMessage: 'root@pam:ticket\n'
        }
      }),
      {
        reconnect: false,
        reconnectIntervalMs: 1500,
        reconnectMaxAttempts: 1
      }
    );

    const browserSocket = new mockedWs.MockWebSocket('ws://browser') as never;
    bridgeTerminalSessionToSocket(session, browserSocket, { promptNudgeMs: 60_000 });

    await session.start();
    socket.readyState = mockedWs.MockWebSocket.OPEN;
    socket.emit('open');
    socket.emit('message', Buffer.from('OK'));

    browserSocket.emit('message', JSON.stringify({ type: 'resize', cols: 90, rows: 33 }));
    browserSocket.emit('message', JSON.stringify({ type: 'input', data: 'R:not-a-resize' }));

    const resizeFrames = socket.sent.filter((frame) => sentFrameText(frame) === '1:90:33:');
    const inputFrames = socket.sent.filter((frame) => sentFrameText(frame) === '0:14:R:not-a-resize');

    expect(resizeFrames.length).toBe(1);
    expect(inputFrames.length).toBe(1);
  });

  it('applies resize metadata embedded in structured input frames', async () => {
    const socket = new mockedWs.MockWebSocket('wss://pve.local/ws');
    const session = new TerminalSession(
      async () => ({
        socket: socket as never,
        info: {
          vmid: 100,
          node: 'pve',
          type: 'qemu',
          ticket: { port: 5900, ticket: 'ticket', upid: 'upid', user: 'root@pam' },
          websocketUrl: 'wss://pve.local/ws',
          authMessage: 'root@pam:ticket\n'
        }
      }),
      {
        reconnect: false,
        reconnectIntervalMs: 1500,
        reconnectMaxAttempts: 1
      }
    );

    const browserSocket = new mockedWs.MockWebSocket('ws://browser') as never;
    bridgeTerminalSessionToSocket(session, browserSocket, { promptNudgeMs: 60_000 });

    await session.start();
    socket.readyState = mockedWs.MockWebSocket.OPEN;
    socket.emit('open');
    socket.emit('message', Buffer.from('OK'));

    browserSocket.emit('message', JSON.stringify({ type: 'input', data: 'x', cols: 132, rows: 44 }));

    const resizeFrames = socket.sent.filter((frame) => sentFrameText(frame) === '1:132:44:');
    const inputFrames = socket.sent.filter((frame) => sentFrameText(frame) === '0:1:x');

    expect(resizeFrames.length).toBe(1);
    expect(inputFrames.length).toBe(1);
    expect(socket.sent.findIndex((frame) => sentFrameText(frame) === '1:132:44:'))
      .toBeLessThan(socket.sent.findIndex((frame) => sentFrameText(frame) === '0:1:x'));
  });

  it('preserves binary arrow-key escape bytes in input frames', async () => {
    const socket = new mockedWs.MockWebSocket('wss://pve.local/ws');
    const session = new TerminalSession(
      async () => ({
        socket: socket as never,
        info: {
          vmid: 100,
          node: 'pve',
          type: 'qemu',
          ticket: { port: 5900, ticket: 'ticket', upid: 'upid', user: 'root@pam' },
          websocketUrl: 'wss://pve.local/ws',
          authMessage: 'root@pam:ticket\n'
        }
      }),
      {
        reconnect: false,
        reconnectIntervalMs: 1500,
        reconnectMaxAttempts: 1
      }
    );

    const browserSocket = new mockedWs.MockWebSocket('ws://browser') as never;
    bridgeTerminalSessionToSocket(session, browserSocket, { promptNudgeMs: 60_000 });

    await session.start();
    socket.readyState = mockedWs.MockWebSocket.OPEN;
    socket.emit('open');
    socket.emit('message', Buffer.from('OK'));

    browserSocket.emit('message', Buffer.from('\u001bOD', 'utf8'), true);
    browserSocket.emit('message', Buffer.from('\u001b[D', 'utf8'), true);

    const inputFrames = socket.sent
      .filter((frame) => sentFrameText(frame).startsWith('0:3:'))
      .map((frame) => Buffer.isBuffer(frame) ? frame : Buffer.from(frame, 'utf8'));

    expect(inputFrames.length).toBe(2);
    expect(inputFrames[0]).toEqual(Buffer.from('0:3:\u001bOD', 'utf8'));
    expect(inputFrames[1]).toEqual(Buffer.from('0:3:\u001b[D', 'utf8'));
  });

  it('preserves held SS3 left/right repeats without rewriting', async () => {
    const socket = new mockedWs.MockWebSocket('wss://pve.local/ws');
    const session = new TerminalSession(
      async () => ({
        socket: socket as never,
        info: {
          vmid: 100,
          node: 'pve',
          type: 'qemu',
          ticket: { port: 5900, ticket: 'ticket', upid: 'upid', user: 'root@pam' },
          websocketUrl: 'wss://pve.local/ws',
          authMessage: 'root@pam:ticket\n'
        }
      }),
      {
        reconnect: false,
        reconnectIntervalMs: 1500,
        reconnectMaxAttempts: 1
      }
    );

    const browserSocket = new mockedWs.MockWebSocket('ws://browser') as never;
    bridgeTerminalSessionToSocket(session, browserSocket, { promptNudgeMs: 60_000 });

    await session.start();
    socket.readyState = mockedWs.MockWebSocket.OPEN;
    socket.emit('open');
    socket.emit('message', Buffer.from('OK'));

    browserSocket.emit('message', Buffer.from('\u001bOD\u001bOD\u001bOD', 'utf8'), true);
    browserSocket.emit('message', Buffer.from('\u001bOC\u001bOC\u001bOC', 'utf8'), true);

    const leftFrame = socket.sent
      .map((frame) => Buffer.isBuffer(frame) ? frame : Buffer.from(frame, 'utf8'))
      .find((frame) => frame.equals(Buffer.from('0:9:\u001bOD\u001bOD\u001bOD', 'utf8')));
    const rightFrame = socket.sent
      .map((frame) => Buffer.isBuffer(frame) ? frame : Buffer.from(frame, 'utf8'))
      .find((frame) => frame.equals(Buffer.from('0:9:\u001bOC\u001bOC\u001bOC', 'utf8')));

    expect(leftFrame).toBeDefined();
    expect(rightFrame).toBeDefined();
  });

  it('does not repair missing-escape navigation fragments', async () => {
    const socket = new mockedWs.MockWebSocket('wss://pve.local/ws');
    const session = new TerminalSession(
      async () => ({
        socket: socket as never,
        info: {
          vmid: 100,
          node: 'pve',
          type: 'qemu',
          ticket: { port: 5900, ticket: 'ticket', upid: 'upid', user: 'root@pam' },
          websocketUrl: 'wss://pve.local/ws',
          authMessage: 'root@pam:ticket\n'
        }
      }),
      {
        reconnect: false,
        reconnectIntervalMs: 1500,
        reconnectMaxAttempts: 1
      }
    );

    const browserSocket = new mockedWs.MockWebSocket('ws://browser') as never;
    bridgeTerminalSessionToSocket(session, browserSocket, { promptNudgeMs: 60_000 });

    await session.start();
    socket.readyState = mockedWs.MockWebSocket.OPEN;
    socket.emit('open');
    socket.emit('message', Buffer.from('OK'));

    browserSocket.emit('message', Buffer.from('[D', 'utf8'), true);
    browserSocket.emit('message', '[C');
    browserSocket.emit('message', 'OA');

    const inputFrames = socket.sent
      .filter((frame) => sentFrameText(frame).startsWith('0:'))
      .map((frame) => Buffer.isBuffer(frame) ? frame : Buffer.from(frame, 'utf8'));

    expect(inputFrames.length).toBe(3);
    expect(inputFrames[0]).toEqual(Buffer.from('0:2:[D', 'utf8'));
    expect(inputFrames[1]).toEqual(Buffer.from('0:2:[C', 'utf8'));
    expect(inputFrames[2]).toEqual(Buffer.from('0:2:OA', 'utf8'));
  });

  it('does not repair batched and parameterized missing-escape fragments', async () => {
    const socket = new mockedWs.MockWebSocket('wss://pve.local/ws');
    const session = new TerminalSession(
      async () => ({
        socket: socket as never,
        info: {
          vmid: 100,
          node: 'pve',
          type: 'qemu',
          ticket: { port: 5900, ticket: 'ticket', upid: 'upid', user: 'root@pam' },
          websocketUrl: 'wss://pve.local/ws',
          authMessage: 'root@pam:ticket\n'
        }
      }),
      {
        reconnect: false,
        reconnectIntervalMs: 1500,
        reconnectMaxAttempts: 1
      }
    );

    const browserSocket = new mockedWs.MockWebSocket('ws://browser') as never;
    bridgeTerminalSessionToSocket(session, browserSocket, { promptNudgeMs: 60_000 });

    await session.start();
    socket.readyState = mockedWs.MockWebSocket.OPEN;
    socket.emit('open');
    socket.emit('message', Buffer.from('OK'));

    browserSocket.emit('message', Buffer.from('[D[3~[1;5C', 'utf8'), true);

    const inputFrames = socket.sent
      .filter((frame) => sentFrameText(frame).startsWith('0:10:'))
      .map((frame) => Buffer.isBuffer(frame) ? frame : Buffer.from(frame, 'utf8'));

    expect(inputFrames.length).toBe(1);
    expect(inputFrames[0]).toEqual(Buffer.from('0:10:[D[3~[1;5C', 'utf8'));
  });

  it('does not repair malformed ODD/OC bursts', async () => {
    const socket = new mockedWs.MockWebSocket('wss://pve.local/ws');
    const session = new TerminalSession(
      async () => ({
        socket: socket as never,
        info: {
          vmid: 100,
          node: 'pve',
          type: 'qemu',
          ticket: { port: 5900, ticket: 'ticket', upid: 'upid', user: 'root@pam' },
          websocketUrl: 'wss://pve.local/ws',
          authMessage: 'root@pam:ticket\n'
        }
      }),
      {
        reconnect: false,
        reconnectIntervalMs: 1500,
        reconnectMaxAttempts: 1
      }
    );

    const browserSocket = new mockedWs.MockWebSocket('ws://browser') as never;
    bridgeTerminalSessionToSocket(session, browserSocket, { promptNudgeMs: 60_000 });

    await session.start();
    socket.readyState = mockedWs.MockWebSocket.OPEN;
    socket.emit('open');
    socket.emit('message', Buffer.from('OK'));

    browserSocket.emit('message', Buffer.from('ODDOC', 'utf8'), true);

    const inputFrames = socket.sent
      .filter((frame) => sentFrameText(frame).startsWith('0:5:'))
      .map((frame) => Buffer.isBuffer(frame) ? frame : Buffer.from(frame, 'utf8'));

    expect(inputFrames.length).toBe(1);
    expect(inputFrames[0]).toEqual(Buffer.from('0:5:ODDOC', 'utf8'));
  });

  it('does not remap single uppercase letters in binary input', async () => {
    const socket = new mockedWs.MockWebSocket('wss://pve.local/ws');
    const session = new TerminalSession(
      async () => ({
        socket: socket as never,
        info: {
          vmid: 100,
          node: 'pve',
          type: 'qemu',
          ticket: { port: 5900, ticket: 'ticket', upid: 'upid', user: 'root@pam' },
          websocketUrl: 'wss://pve.local/ws',
          authMessage: 'root@pam:ticket\n'
        }
      }),
      {
        reconnect: false,
        reconnectIntervalMs: 1500,
        reconnectMaxAttempts: 1
      }
    );

    const browserSocket = new mockedWs.MockWebSocket('ws://browser') as never;
    bridgeTerminalSessionToSocket(session, browserSocket, { promptNudgeMs: 60_000 });

    await session.start();
    socket.readyState = mockedWs.MockWebSocket.OPEN;
    socket.emit('open');
    socket.emit('message', Buffer.from('OK'));

    browserSocket.emit('message', Buffer.from('D', 'utf8'), true);

    const inputFrames = socket.sent
      .filter((frame) => sentFrameText(frame) === '0:1:D')
      .map((frame) => Buffer.isBuffer(frame) ? frame : Buffer.from(frame, 'utf8'));

    expect(inputFrames.length).toBe(1);
    expect(inputFrames[0]).toEqual(Buffer.from('0:1:D', 'utf8'));
  });

  it('drops text stdin when strict two-lane mode disables text input frames', async () => {
    const socket = new mockedWs.MockWebSocket('wss://pve.local/ws');
    const session = new TerminalSession(
      async () => ({
        socket: socket as never,
        info: {
          vmid: 100,
          node: 'pve',
          type: 'qemu',
          ticket: { port: 5900, ticket: 'ticket', upid: 'upid', user: 'root@pam' },
          websocketUrl: 'wss://pve.local/ws',
          authMessage: 'root@pam:ticket\n'
        }
      }),
      {
        reconnect: false,
        reconnectIntervalMs: 1500,
        reconnectMaxAttempts: 1
      }
    );

    const browserSocket = new mockedWs.MockWebSocket('ws://browser') as never;
    bridgeTerminalSessionToSocket(session, browserSocket, {
      promptNudgeMs: 60_000,
      allowTextInputFrames: false
    });

    await session.start();
    socket.readyState = mockedWs.MockWebSocket.OPEN;
    socket.emit('open');
    socket.emit('message', Buffer.from('OK'));

    browserSocket.emit('message', 'abc');
    browserSocket.emit('message', JSON.stringify({ type: 'input', data: 'def' }));
    browserSocket.emit('message', Buffer.from('ghi', 'utf8'), true);

    const textAbcFrames = socket.sent.filter((frame) => sentFrameText(frame) === '0:3:abc');
    const textDefFrames = socket.sent.filter((frame) => sentFrameText(frame) === '0:3:def');
    const binaryGhiFrames = socket.sent.filter((frame) => sentFrameText(frame) === '0:3:ghi');

    expect(textAbcFrames.length).toBe(0);
    expect(textDefFrames.length).toBe(0);
    expect(binaryGhiFrames.length).toBe(1);
  });
});

describe('Local terminal prompt nudge', () => {
  it('sends one delayed carriage return after ready', async () => {
    vi.useFakeTimers();

    const listeners = new Map<string, Array<() => void>>();
    const session = {
      on(event: 'ready' | 'close', listener: () => void) {
        const list = listeners.get(event) ?? [];
        list.push(listener);
        listeners.set(event, list);
      },
      write: vi.fn(() => true),
    };

    const cleanup = attachLocalPromptNudge(session, 50);

    for (const listener of listeners.get('ready') ?? []) listener();
    await vi.advanceTimersByTimeAsync(60);

    expect(session.write).toHaveBeenCalledTimes(1);
    expect(session.write).toHaveBeenCalledWith('\r');

    cleanup();
    vi.useRealTimers();
  });
});
