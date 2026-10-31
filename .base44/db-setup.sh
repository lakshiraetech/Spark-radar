#!/bin/sh
# One-shot database setup for local development, run after GoTrue migrations:
#   1. give PostgREST's `authenticator` role a password
#   2. expose the auth helpers used by RLS policies
#   3. apply supabase/migrations/*.sql (first boot only)
#   4. apply supabase/seed.sql (idempotent)
#   5. mark the database as initialised
set -e

export PGPASSWORD="${POSTGRES_PASSWORD:-postgres}"
PSQL="psql -h ${PGHOST:-db} -U ${POSTGRES_USER:-supabase_admin} -d ${POSTGRES_DB:-postgres} -v ON_ERROR_STOP=1"

echo "[base44] waiting for postgres"
until pg_isready -h "${PGHOST:-db}" -U "${POSTGRES_USER:-supabase_admin}" -d "${POSTGRES_DB:-postgres}" >/dev/null 2>&1; do
  sleep 1
done

echo "[base44] configuring api roles"
$PSQL -c "ALTER USER authenticator WITH PASSWORD 'postgres';"
$PSQL -c "GRANT USAGE ON SCHEMA auth TO anon, authenticated, service_role;"
$PSQL -c "GRANT EXECUTE ON FUNCTION auth.uid() TO anon, authenticated, service_role;"
$PSQL -c "GRANT EXECUTE ON FUNCTION auth.role() TO anon, authenticated, service_role;"
$PSQL -c "GRANT EXECUTE ON FUNCTION auth.email() TO anon, authenticated, service_role;"

if [ "$($PSQL -tAc "SELECT to_regclass('public.profiles')")" = "" ]; then
  for migration in /supabase/migrations/*.sql; do
    echo "[base44] applying $(basename "$migration")"
    $PSQL -f "$migration"
  done
else
  echo "[base44] migrations already applied"
fi

if [ -f /supabase/seed.sql ]; then
  echo "[base44] applying seed.sql"
  $PSQL -f /supabase/seed.sql
fi

$PSQL -c "CREATE SCHEMA IF NOT EXISTS base44;"
$PSQL -c "CREATE TABLE IF NOT EXISTS base44.env_ready (ready boolean PRIMARY KEY DEFAULT true);"
$PSQL -c "INSERT INTO base44.env_ready DEFAULT VALUES ON CONFLICT DO NOTHING;"

echo "[base44] database ready"
