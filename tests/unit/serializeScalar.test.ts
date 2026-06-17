import { describe, it, expect } from 'vitest';
import { Client } from '../../src/index.js';

describe('serializeScalar', () => {
  const client = new Client({ baseUrl: 'http://x', apiToken: 't' });
  // @ts-expect-error: access private
  const serializeScalar = client.serializeScalar.bind(client);

  it('throws on NaN', () => {
    expect(() => serializeScalar(NaN)).toThrow();
  });
  it('throws on Infinity', () => {
    expect(() => serializeScalar(Infinity)).toThrow();
  });
  it('throws on -Infinity', () => {
    expect(() => serializeScalar(-Infinity)).toThrow();
  });
  it('throws on Symbol', () => {
    expect(() => serializeScalar(Symbol('x'))).toThrow();
  });
  it('throws on undefined', () => {
    expect(() => serializeScalar(undefined)).toThrow();
  });
  it('throws on null', () => {
    expect(() => serializeScalar(null)).toThrow();
  });
});