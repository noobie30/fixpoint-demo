# checkout-service (Fixpoint demo target)

A tiny checkout validation service used to demonstrate **Fixpoint**, an autonomous
incident-response agent. This repo is intentionally seeded with a regression:

- A "refactor" PR removed the null-guard in `CheckoutValidator.validateCountry`, so a
  **guest checkout with no country crashes** (`TypeError` → HTTP 500) in production.

Fixpoint detects the incident, correlates it to the offending PR, opens a **revert PR**
(mitigation) and a **fix PR** with a regression test (remediation). It never merges.

```bash
npm install
npm test
```
