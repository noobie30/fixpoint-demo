# Checkout Service

This repository contains a checkout service for processing orders.

## Checkout Service API

### Request Structure

The checkout service expects a request object with the following structure:

```
{
  guest: boolean,         // Whether the user is checking out as a guest
  country: string | null, // ISO country code (e.g., 'US', 'CA', 'GB', etc.)
  items: number           // Number of items in the cart (must be >= 1)
}
```

#### Example

```
{
  "guest": false,
  "country": "US",
  "items": 2
}
```

### Response Structure

- **Success (201 Created):**
  - Returns `{ orderId: string }` in the body.

- **Validation Error (400 Bad Request):**
  - Returns `{ error: string }` in the body if the request is invalid (e.g., unsupported country, empty cart).

- **Unexpected Error (500 Internal Server Error):**
  - If an unexpected error occurs (not a validation error), the service will surface it as a 500 error in production.

### Error Handling Details

- **400 Bad Request:**
  - Returned when the request fails validation. For example:
    - `items` is missing or less than 1 (empty cart)
    - `country` is not one of the supported countries (`US`, `CA`, `GB`, `DE`, `FR`, `IN`)

- **500 Internal Server Error:**
  - Returned for any unexpected error that is not a validation error. These are not expected during normal operation.

### Supported Countries

- US
- CA
- GB
- DE
- FR
- IN

### Example Error Responses

**Empty Cart:**
```
Status: 400
Body: { "error": "Cart must contain at least one item" }
```

**Unsupported Country:**
```
Status: 400
Body: { "error": "Country ZZ is not supported" }
```

**Unexpected Error:**
```
Status: 500
Body: { "error": "Internal Server Error" }
```

---

For more details, see the implementation in `src/checkout/checkout.service.ts` and `src/checkout/checkout.validator.ts`.
