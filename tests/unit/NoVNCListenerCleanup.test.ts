import { describe, it, expect } from 'vitest';
import { NoVNCFacade } from '../../src/helpers/NoVNC.js';

describe('NoVNCFacade listener cleanup', () => {
  it('removes event listener from correct RFB instance', () => {
    let addCount = 0;
    let removeCount = 0;
    const fakeRfb = {
      addEventListener: () => { addCount++; },
      removeEventListener: () => { removeCount++; }
    };
    const facade = new NoVNCFacade();
    // @ts-expect-error: private
    facade.rfb = fakeRfb;
    const off = facade.on('connect', () => {});
    expect(addCount).toBe(1);
    off();
    expect(removeCount).toBe(1);
  });
});