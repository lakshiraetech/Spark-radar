# Deployment

Spark Radar is optimized for Vercel.

## Process
1. Code pushed to `main` branch triggers a Vercel build.
2. Build script runs linting, typechecking, and tests.
3. Database migrations must be applied using Supabase CLI before/during deployment if schema changes are present.

## Production Checklist
- [ ] Environment variables configured in Vercel.
- [ ] Supabase project upgraded to production tier.
- [ ] Stripe/PayPal webhook endpoints configured with live URLs.
- [ ] DNS and custom domain setup.
- [ ] Security headers enabled.
