import { CheckoutValidator, ValidationError } from './checkout.validator';

describe('CheckoutValidator', () => {
  const v = new CheckoutValidator();

  it('accepts a valid checkout', () => {
    expect(v.validate({ guest: false, country: 'US', items: 2 })).toEqual({ ok: true });
  });

  it('rejects an empty cart', () => {
    expect(() => v.validate({ guest: false, country: 'US', items: 0 })).toThrow(ValidationError);
  });

  it('rejects an unsupported country', () => {
    expect(() => v.validate({ guest: false, country: 'ZZ', items: 1 })).toThrow(ValidationError);
  });

  it('rejects guest checkout with no country (no crash)', () => {
    expect(() => v.validate({ guest: true, country: null, items: 1 })).toThrow(ValidationError);
  });
});
