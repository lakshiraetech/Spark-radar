#!/bin/sh
# Development start command: sync dependencies from the lockfile when it
# changed, then run the Next.js dev server with live reload.
set -e

cd /app

if [ ! -d node_modules ] || [ ! -f node_modules/.base44-lock ] || ! cmp -s package-lock.json node_modules/.base44-lock; then
  echo "[base44] installing dependencies from package-lock.json"
  npm ci --no-audit --no-fund
  cp package-lock.json node_modules/.base44-lock
fi

export NEXT_PUBLIC_SUPABASE_ANON_KEY="$(node .base44/make-anon-key.mjs)"

exec npx next dev --hostname 0.0.0.0 --port 3000
