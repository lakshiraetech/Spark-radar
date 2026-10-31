#!/bin/sh
# The supabase/postgres image ships GoTrue's base `auth` schema but without the
# enum types that newer GoTrue migrations expect to already exist, so those are
# created (idempotently) before `auth migrate` runs.
set -e

export PGPASSWORD="${POSTGRES_PASSWORD:-postgres}"
PSQL="psql -h ${PGHOST:-db} -U ${POSTGRES_USER:-supabase_admin} -d ${POSTGRES_DB:-postgres} -v ON_ERROR_STOP=1"

echo "[base44] waiting for postgres"
until pg_isready -h "${PGHOST:-db}" -U "${POSTGRES_USER:-supabase_admin}" -d "${POSTGRES_DB:-postgres}" >/dev/null 2>&1; do
  sleep 1
done

echo "[base44] ensuring auth enum types"
$PSQL <<'SQL'
do $$ begin
  create type auth.aal_level as enum ('aal1', 'aal2', 'aal3');
exception when duplicate_object then null; end $$;

do $$ begin
  create type auth.code_challenge_method as enum ('s256', 'plain');
exception when duplicate_object then null; end $$;

do $$ begin
  create type auth.factor_status as enum ('unverified', 'verified');
exception when duplicate_object then null; end $$;

do $$ begin
  create type auth.factor_type as enum ('totp', 'webauthn', 'phone');
exception when duplicate_object then null; end $$;

do $$ begin
  create type auth.one_time_token_type as enum (
    'confirmation_token', 'reauthentication_token', 'recovery_token',
    'email_change_token_new', 'email_change_token_current', 'phone_change_token'
  );
exception when duplicate_object then null; end $$;
SQL
