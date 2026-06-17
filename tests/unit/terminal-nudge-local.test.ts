/// #include ./shared-mock-setup.ts
import { describe, it, expect, vi } from 'vitest';
import { attachLocalPromptNudge } from '../../src/helpers/LocalPromptNudge.js';

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
