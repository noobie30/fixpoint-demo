import { CheckoutRequest, CheckoutValidator, ValidationError } from './checkout.validator';

export interface OrderResult {
  status: number;
  body: Record<string, any>;
}

/** Thin HTTP-ish wrapper: ValidationError → 400, anything unexpected → 500. */
export class CheckoutService {
  private readonly validator = new CheckoutValidator();

  createOrder(req: CheckoutRequest): OrderResult {
    try {
      this.validator.validate(req);
    } catch (e) {
      if (e instanceof ValidationError) return { status: 400, body: { error: e.message } };
      throw e; // unexpected → surfaces as a 500 in production
    }
    return { status: 201, body: { orderId: 'ord_' + Math.random().toString(36).slice(2, 8) } };
  }
}
