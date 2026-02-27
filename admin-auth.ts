import crypto from "crypto";

export function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

export function generateAdminToken(email: string): string {
  const timestamp = Date.now();
  const data = `${email}:${timestamp}`;
  return crypto.createHmac("sha256", "admin-secret-key").update(data).digest("hex");
}
