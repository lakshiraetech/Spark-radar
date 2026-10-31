// Derives the local Supabase `anon` API key from the shared dev JWT secret,
// so the key never has to be committed as a literal.
import { createHmac } from "node:crypto";

const secret = process.env.SUPABASE_JWT_SECRET;
if (!secret) {
  throw new Error("SUPABASE_JWT_SECRET is required to derive the anon key");
}

const encode = (value) => Buffer.from(JSON.stringify(value)).toString("base64url");
const issuedAt = Math.floor(Date.now() / 1000);
const header = encode({ alg: "HS256", typ: "JWT" });
const payload = encode({
  role: "anon",
  iss: "supabase",
  iat: issuedAt,
  exp: issuedAt + 60 * 60 * 24 * 365 * 10,
});
const signature = createHmac("sha256", secret)
  .update(`${header}.${payload}`)
  .digest("base64url");

process.stdout.write(`${header}.${payload}.${signature}`);
