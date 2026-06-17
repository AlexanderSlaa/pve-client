/// #include ./shared-mock-setup.ts
import { describe, it, expect, vi } from 'vitest';
import { TerminalSession, bridgeTerminalSessionToSocket } from '../../src/helpers/Terminal.js';

describe('Terminal input normalization & coalescing', () => {
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

  it('normalizes SS3 cursor keys when normalizeSs3CursorKeys is enabled', async () => {
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
      normalizeSs3CursorKeys: true
    });

    await session.start();
    socket.readyState = mockedWs.MockWebSocket.OPEN;
    socket.emit('open');
    socket.emit('message', Buffer.from('OK'));

    browserSocket.emit('message', Buffer.from('\u001bOD\u001bOC\u001bOA\u001bOB', 'utf8'), true);

    const inputFrames = socket.sent
      .filter((frame) => sentFrameText(frame).startsWith('0:12:'))
      .map((frame) => Buffer.isBuffer(frame) ? frame : Buffer.from(frame, 'utf8'));

    expect(inputFrames.length).toBe(1);
    expect(inputFrames[0]).toEqual(Buffer.from('0:12:\u001b[D\u001b[C\u001b[A\u001b[B', 'utf8'));
  });

  it('normalizes only up/down SS3 keys in vertical-only mode', async () => {
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
      normalizeSs3CursorKeys: true,
      normalizeSs3CursorKeysMode: 'vertical-only'
    });

    await session.start();
    socket.readyState = mockedWs.MockWebSocket.OPEN;
    socket.emit('open');
    socket.emit('message', Buffer.from('OK'));

    browserSocket.emit('message', Buffer.from('\u001bOD\u001bOC\u001bOA\u001bOB', 'utf8'), true);

    const inputFrames = socket.sent
      .filter((frame) => sentFrameText(frame).startsWith('0:12:'))
      .map((frame) => Buffer.isBuffer(frame) ? frame : Buffer.from(frame, 'utf8'));

    expect(inputFrames.length).toBe(1);
    expect(inputFrames[0]).toEqual(Buffer.from('0:12:\u001bOD\u001bOC\u001b[A\u001b[B', 'utf8'));
  });

  it('simplifies modified cursor keys when simplifyModifiedCursorKeys is enabled', async () => {
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
      simplifyModifiedCursorKeys: true
    });

    await session.start();
    socket.readyState = mockedWs.MockWebSocket.OPEN;
    socket.emit('open');
    socket.emit('message', Buffer.from('OK'));

    browserSocket.emit('message', Buffer.from('\u001b[1;2D\u001b[1;2C\u001b[1;5A', 'utf8'), true);

    const inputFrames = socket.sent
      .filter((frame) => sentFrameText(frame).startsWith('0:9:'))
      .map((frame) => Buffer.isBuffer(frame) ? frame : Buffer.from(frame, 'utf8'));

    expect(inputFrames.length).toBe(1);
    expect(inputFrames[0]).toEqual(Buffer.from('0:9:\u001b[D\u001b[C\u001b[A', 'utf8'));
  });

  it('coalesces split ANSI key sequences across input frames', async () => {
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
      normalizeSs3CursorKeys: true
    });

    await session.start();
    socket.readyState = mockedWs.MockWebSocket.OPEN;
    socket.emit('open');
    socket.emit('message', Buffer.from('OK'));

    browserSocket.emit('message', Buffer.from('\u001b', 'utf8'), true);
    browserSocket.emit('message', Buffer.from('O', 'utf8'), true);
    browserSocket.emit('message', Buffer.from('D', 'utf8'), true);
    browserSocket.emit('message', Buffer.from('\u001b[3', 'utf8'), true);
    browserSocket.emit('message', Buffer.from('~', 'utf8'), true);

    const writtenFrames = socket.sent
      .map((frame) => Buffer.isBuffer(frame) ? frame : Buffer.from(frame, 'utf8'))
      .filter((frame) => frame.toString('utf8').startsWith('0:'));

    expect(writtenFrames.find((frame) => frame.equals(Buffer.from('0:3:\u001b[D', 'utf8')))).toBeDefined();
    expect(writtenFrames.find((frame) => frame.equals(Buffer.from('0:4:\u001b[3~', 'utf8')))).toBeDefined();
  });

  it('coalesces split home key prefixes across input frames', async () => {
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
      normalizeSs3CursorKeys: true
    });

    await session.start();
    socket.readyState = mockedWs.MockWebSocket.OPEN;
    socket.emit('open');
    socket.emit('message', Buffer.from('OK'));

    browserSocket.emit('message', Buffer.from('\u001b[', 'utf8'), true);
    browserSocket.emit('message', Buffer.from('H', 'utf8'), true);

    const writtenFrames = socket.sent
      .map((frame) => Buffer.isBuffer(frame) ? frame : Buffer.from(frame, 'utf8'))
      .filter((frame) => frame.toString('utf8').startsWith('0:'));

    expect(writtenFrames.find((frame) => frame.equals(Buffer.from('0:3:\u001b[H', 'utf8')))).toBeDefined();
  });

  it('coalesces split csi arrow keys across input frames', async () => {
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
      normalizeSs3CursorKeys: true
    });

    await session.start();
    socket.readyState = mockedWs.MockWebSocket.OPEN;
    socket.emit('open');
    socket.emit('message', Buffer.from('OK'));

    browserSocket.emit('message', Buffer.from('\u001b[', 'utf8'), true);
    browserSocket.emit('message', Buffer.from('D', 'utf8'), true);

    const writtenFrames = socket.sent
      .map((frame) => Buffer.isBuffer(frame) ? frame : Buffer.from(frame, 'utf8'))
      .filter((frame) => frame.toString('utf8').startsWith('0:'));

    expect(writtenFrames.find((frame) => frame.equals(Buffer.from('0:3:\u001b[D', 'utf8')))).toBeDefined();
  });

  it('does not buffer non-key CSI fragments ahead of later input', async () => {
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
      normalizeSs3CursorKeys: true
    });

    await session.start();
    socket.readyState = mockedWs.MockWebSocket.OPEN;
    socket.emit('open');
    socket.emit('message', Buffer.from('OK'));

    browserSocket.emit('message', Buffer.from('\u001b[23;', 'utf8'), true);
    browserSocket.emit('message', Buffer.from('\r', 'utf8'), true);

    const writtenFrames = socket.sent
      .map((frame) => Buffer.isBuffer(frame) ? frame : Buffer.from(frame, 'utf8'))
      .filter((frame) => frame.toString('utf8').startsWith('0:'));

    const frameTexts = writtenFrames.map((frame) => frame.toString('utf8'));
    expect(frameTexts.some((text) => text.includes('\u001b[23;'))).toBe(true);
    expect(frameTexts.some((text) => text.endsWith('\r'))).toBe(true);
  });

  it('coalesces repeated navigation keys when coalesceNavigationRepeats is enabled', async () => {
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
    bridgeTerminalSessionToSocket(session, browserSocket, {
      promptNudgeMs: 60_000,
      normalizeSs3CursorKeys: true,
      coalesceNavigationRepeats: true,
      navigationRepeatCoalesceMs: 5
    });

    await session.start();
    socket.readyState = mockedWs.MockWebSocket.OPEN;
    socket.emit('open');
    socket.emit('message', Buffer.from('OK'));

    browserSocket.emit('message', Buffer.from('\u001bOD', 'utf8'), true);
    browserSocket.emit('message', Buffer.from('\u001bOD', 'utf8'), true);

    await vi.advanceTimersByTimeAsync(6);

    const inputFrames = socket.sent
      .filter((frame) => sentFrameText(frame).startsWith('0:'))
      .map((frame) => Buffer.isBuffer(frame) ? frame : Buffer.from(frame, 'utf8'));

    expect(inputFrames.length).toBe(1);
    expect(inputFrames[0]).toEqual(Buffer.from('0:6:\u001b[D\u001b[D', 'utf8'));

    vi.useRealTimers();
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
