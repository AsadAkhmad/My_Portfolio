import bcrypt from "bcryptjs";

// A valid bcrypt hash always starts with $2a$, $2b$, or $2y$ followed by a cost
// factor. If this doesn't match, .env's $ characters were almost certainly
// mangled by Next.js's env variable expansion (run `npm run admin:hash-password`,
// which escapes them correctly, rather than pasting a raw hash into .env).
const BCRYPT_HASH_PATTERN = /^\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}$/;

export async function verifyPassword(password: string): Promise<boolean> {
  const hash = process.env.ADMIN_PASSWORD_HASH;
  if (!hash) {
    throw new Error("ADMIN_PASSWORD_HASH is not set. Add it to your .env file.");
  }
  if (!BCRYPT_HASH_PATTERN.test(hash)) {
    throw new Error(
      "ADMIN_PASSWORD_HASH is malformed (missing its $2b$... prefix). This usually means the $ " +
        "characters were stripped by Next.js's .env variable expansion. Regenerate it with " +
        "`npm run admin:hash-password -- 'your password'`, which escapes them correctly."
    );
  }
  return bcrypt.compare(password, hash);
}
