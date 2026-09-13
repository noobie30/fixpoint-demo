import { CheckoutValidator, ValidationError, CheckoutRequest } from './checkout.validator';

describe('CheckoutValidator', () => {
  let validator: CheckoutValidator;
  beforeEach(() => {
    validator = new CheckoutValidator();
  });

  it('throws ValidationError if country is null', () => {
    const req: CheckoutRequest = { guest: true, country: null, items: 2 };
    expect(() => validator.validate(req)).toThrow(ValidationError);
    expect(() => validator.validate(req)).toThrow('Country is required');
  });

  it('throws ValidationError if country is not supported', () => {
    const req: CheckoutRequest = { guest: true, country: 'ZZ', items: 2 };
    expect(() => validator.validate(req)).toThrow(ValidationError);
    expect(() => validator.validate(req)).toThrow('Country ZZ is not supported');
  });

  it('passes for supported country', () => {
    const req: CheckoutRequest = { guest: true, country: 'us', items: 2 };
    expect(validator.validate(req)).toEqual({ ok: true });
  });

  it('throws ValidationError if items < 1', () => {
    const req: CheckoutRequest = { guest: true, country: 'US', items: 0 };
    expect(() => validator.validate(req)).toThrow(ValidationError);
    expect(() => validator.validate(req)).toThrow('Cart must contain at least one item');
  });
});
