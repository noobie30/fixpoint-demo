export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export interface CheckoutRequest {
  guest: boolean;
  country: string | null;
  items: number;
}

const SUPPORTED_COUNTRIES = ['US', 'CA', 'GB', 'DE', 'FR', 'IN'];

export class CheckoutValidator {
  validate(req: CheckoutRequest): { ok: true } {
    this.validateItems(req);
    this.validateCountry(req);
    return { ok: true };
  }

  private validateItems(req: CheckoutRequest): void {
    if (!req.items || req.items < 1) {
      throw new ValidationError('Cart must contain at least one item');
    }
  }

  private validateCountry(req: CheckoutRequest): void {
    if (!req.country || typeof req.country !== 'string') {
      throw new ValidationError('Country is required');
    }
    // refactor: normalize country up-front for cleaner comparison
    const normalized = req.country.toUpperCase();
    if (!SUPPORTED_COUNTRIES.includes(normalized)) {
      throw new ValidationError(`Country ${normalized} is not supported`);
    }
  }
}
