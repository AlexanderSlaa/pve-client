import { describe, it, expect } from 'vitest';
import { Client } from '../../src/index.js';
import { TimerPulledEventEmitter } from '../../src/helpers/TimerPulledEventEmitter.js';

describe('eventMonitors type', () => {
  it('stores and retrieves TimerPulledEventEmitter with correct type', () => {
    const client = new Client({ baseUrl: 'http://x', apiToken: 't' });
    // @ts-expect-error: access private
    const map = client.eventMonitors;
    const emitter = new TimerPulledEventEmitter(() => {});
    map.set('test', emitter);
    // @ts-expect-error: access private
    const result = map.get('test');
    expect(result).toBeInstanceOf(TimerPulledEventEmitter);
  });
});