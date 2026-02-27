import { describe, expect, it } from "vitest";
import { hashPassword, verifyPassword } from "./admin-auth";

describe("Admin Authentication", () => {
  it("should hash password correctly", () => {
    const password = "TestPassword123!";
    const hash = hashPassword(password);
    
    expect(hash).toBeDefined();
    expect(hash).not.toBe(password);
    expect(hash.length).toBe(64); // SHA256 hex length
  });

  it("should verify correct password", () => {
    const password = "TestPassword123!";
    const hash = hashPassword(password);
    
    const isValid = verifyPassword(password, hash);
    expect(isValid).toBe(true);
  });

  it("should reject incorrect password", () => {
    const password = "TestPassword123!";
    const wrongPassword = "WrongPassword456!";
    const hash = hashPassword(password);
    
    const isValid = verifyPassword(wrongPassword, hash);
    expect(isValid).toBe(false);
  });

  it("should handle empty passwords", () => {
    const hash = hashPassword("");
    const isValid = verifyPassword("", hash);
    
    expect(isValid).toBe(true);
  });

  it("should be case sensitive", () => {
    const password = "TestPassword123!";
    const upperPassword = "TESTPASSWORD123!";
    const hash = hashPassword(password);
    
    const isValid = verifyPassword(upperPassword, hash);
    expect(isValid).toBe(false);
  });
});
