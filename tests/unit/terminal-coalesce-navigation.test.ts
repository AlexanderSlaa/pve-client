/// #include ./shared-mock-setup.ts
import { describe, it, expect } from 'vitest';
import { TerminalSession, bridgeTerminalSessionToSocket } from '../../src/helpers/Terminal.js';

describe('Terminal compatibility repair', () => {
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

  it('repairs orphan navigation fragments when compatibility mode is enabled', async () => {
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
      enableInputRepairCompatibility: true
    });

    await session.start();
    socket.readyState = mockedWs.MockWebSocket.OPEN;
    socket.emit('open');
    socket.emit('message', Buffer.from('OK'));

    browserSocket.emit('message', Buffer.from('\u001bOD', 'utf8'), true);
    browserSocket.emit('message', Buffer.from('D', 'utf8'), true);

    const inputFrames = socket.sent
      .filter((frame) => sentFrameText(frame).startsWith('0:'))
      .map((frame) => Buffer.isBuffer(frame) ? frame : Buffer.from(frame, 'utf8'));

    expect(inputFrames.length).toBe(2);
    expect(inputFrames[0]).toEqual(Buffer.from('0:3:\u001b[D', 'utf8'));
    expect(inputFrames[1]).toEqual(Buffer.from('0:3:\u001b[D', 'utf8'));
  });

  it('forwards mixed orphan bracket/final navigation bursts unchanged when compatibility mode is enabled', async () => {
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
      enableInputRepairCompatibility: true
    });

    await session.start();
    socket.readyState = mockedWs.MockWebSocket.OPEN;
    socket.emit('open');
    socket.emit('message', Buffer.from('OK'));

    browserSocket.emit('message', Buffer.from('\u001bOD', 'utf8'), true);
    browserSocket.emit('message', Buffer.from('[DD[D', 'utf8'), true);

    const inputFrames = socket.sent
      .filter((frame) => sentFrameText(frame).startsWith('0:'))
      .map((frame) => Buffer.isBuffer(frame) ? frame : Buffer.from(frame, 'utf8'));

    expect(inputFrames.length).toBe(2);
    expect(inputFrames[0]).toEqual(Buffer.from('0:3:\u001b[D', 'utf8'));
    expect(inputFrames[1]).toEqual(Buffer.from('0:5:[DD[D', 'utf8'));
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
});
