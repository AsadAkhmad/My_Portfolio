import bcrypt from "bcryptjs";

const password = process.argv[2];

if (!password) {
  console.error("Usage: npm run admin:hash-password -- '<your password>'");
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 12);

// Next.js expands $-prefixed sequences in .env files (e.g. for referencing other
// variables), which corrupts bcrypt hashes like $2b$12$... unless every $ is escaped
// as \$. See https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables#referencing-other-variables
const escapedHash = hash.replace(/\$/g, "\\$");

console.log("\nAdd this to your .env file:\n");
console.log(`ADMIN_PASSWORD_HASH="${escapedHash}"`);
console.log();
