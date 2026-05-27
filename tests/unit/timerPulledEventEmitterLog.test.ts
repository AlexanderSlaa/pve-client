import { describe, it, expect, vi } from 'vitest';
import { TimerPulledEventEmitter } from '../../src/helpers/TimerPulledEventEmitter.js';

describe('TimerPulledEventEmitter error log', () => {
  it('logs error with event key', async () => {
    const emitter = new TimerPulledEventEmitter(async ({ publish }) => {
      throw new Error('fail');
    });
    emitter.stop();
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    await emitter.pullNow();
    expect(spy).toHaveBeenCalled();
    const call = spy.mock.calls.find(([msg]) => msg.includes('event key'));
    expect(call).toBeTruthy();
    spy.mockRestore();
  });
});