# Environment Setup

This project requires external services to function. See `.env.example` for required keys.

## Services
1. **Supabase**: Relational database, Auth, and Storage.
2. **Stripe**: Payment gateway for subscriptions.
3. **PayPal**: Alternative payment gateway.
4. **OpenAI**: Core AI engine for Spark AI.

## Local Development
1. Clone the repository.
2. Copy `.env.example` to `.env.local` and populate the keys.
3. Start the local database (Supabase CLI):
   ```bash
   supabase start
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
