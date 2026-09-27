# Payments

Spark Radar uses a `PaymentGateway` abstraction layer to allow multiple payment providers seamlessly.

## Architecture
- **StripeAdapter**: Implements `PaymentGateway` for Stripe API.
- **PayPalAdapter**: Implements `PaymentGateway` for PayPal API.

## Core Operations
- `createCheckout`: Generates a checkout session for plans.
- `createSubscription`: Directly manages subscriptions.
- `cancelSubscription`, `pauseSubscription`, `resumeSubscription`.

## Webhooks
Webhooks are essential for verifying payment success. Never trust client-side success callbacks.
- **Signature Verification**: Ensure webhooks originate from Stripe/PayPal.
- **Idempotency**: Prevent processing the same webhook event twice using `audit_logs` or a dedicated `webhook_events` table.
