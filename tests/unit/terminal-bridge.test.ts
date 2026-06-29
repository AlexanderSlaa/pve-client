/// #include ./shared-mock-setup.ts
import { describe, it, expect, vi } from 'vitest';
import { Terminal, TerminalSession, bridgeTerminalSessionToSocket, openTerminalBridge } from '../../src/helpers/Terminal.js';

describe('Terminal bridge session tests', () => {
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
});
