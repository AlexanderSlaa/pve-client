// Shared mock setup — inlined via /// #include directive.
// Do NOT import vi here. Do NOT export. Code is inlined, not module-loaded.
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
