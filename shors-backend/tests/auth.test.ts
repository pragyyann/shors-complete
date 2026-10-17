import { test, describe } from "node:test";
import assert from "node:assert/strict";
import bcrypt from "bcrypt";
import { AuthService } from "../src/services/auth.service.js";
import { ApiError } from "../src/utils/ApiError.js";

describe("Authentication & Password Verification Tests", () => {
  const TEST_PASSWORD = "StrongAdminPassword123!";
  const SALT_ROUNDS = 10;

  test("bcrypt hashing and verification with 10 salt rounds", async () => {
    const hash = await bcrypt.hash(TEST_PASSWORD, SALT_ROUNDS);
    assert.ok(hash.startsWith("$2b$10$") || hash.startsWith("$2a$10$"));

    const isMatch = await bcrypt.compare(TEST_PASSWORD, hash);
    assert.equal(isMatch, true, "Valid password should match bcrypt hash");

    const isWrongMatch = await bcrypt.compare("WrongPassword123!", hash);
    assert.equal(isWrongMatch, false, "Invalid password should not match bcrypt hash");
  });

  test("AuthService.login succeeds with correct email and matching password", async () => {
    const passwordHash = await bcrypt.hash(TEST_PASSWORD, SALT_ROUNDS);

    const mockAdminRecord = {
      id: 1,
      name: "Super Admin",
      email: "admin@shors.in",
      password: passwordHash,
      role: "ADMIN",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const mockPrisma = {
      admin: {
        findUnique: async ({ where }: { where: { email: string } }) => {
          if (where.email === "admin@shors.in") {
            return mockAdminRecord;
          }
          return null;
        },
      },
    } as any;

    const authService = new AuthService(mockPrisma);
    const result = await authService.login("admin@shors.in", TEST_PASSWORD);

    assert.ok(result.token, "JWT token should be generated");
    assert.equal(result.user.email, "admin@shors.in");
    assert.equal(result.user.role, "ADMIN");
    assert.equal(result.user.name, "Super Admin");
  });

  test("AuthService.login handles whitespace and uppercase casing in email gracefully", async () => {
    const passwordHash = await bcrypt.hash(TEST_PASSWORD, SALT_ROUNDS);

    const mockAdminRecord = {
      id: 1,
      name: "Super Admin",
      email: "admin@shors.in",
      password: passwordHash,
      role: "ADMIN",
    };

    const mockPrisma = {
      admin: {
        findUnique: async ({ where }: { where: { email: string } }) => {
          if (where.email === "admin@shors.in") {
            return mockAdminRecord;
          }
          return null;
        },
      },
    } as any;

    const authService = new AuthService(mockPrisma);
    // User types "  ADMIN@SHORS.IN  "
    const result = await authService.login("  ADMIN@SHORS.IN  ", TEST_PASSWORD);

    assert.ok(result.token);
    assert.equal(result.user.email, "admin@shors.in");
  });

  test("AuthService.login rejects invalid password with HTTP 401", async () => {
    const passwordHash = await bcrypt.hash(TEST_PASSWORD, SALT_ROUNDS);

    const mockAdminRecord = {
      id: 1,
      name: "Super Admin",
      email: "admin@shors.in",
      password: passwordHash,
      role: "ADMIN",
    };

    const mockPrisma = {
      admin: {
        findUnique: async () => mockAdminRecord,
      },
    } as any;

    const authService = new AuthService(mockPrisma);

    await assert.rejects(
      async () => {
        await authService.login("admin@shors.in", "WrongPassword999!");
      },
      (err: any) => {
        assert.ok(err instanceof ApiError);
        assert.equal(err.statusCode, 401);
        assert.equal(err.message, "Invalid email or password");
        return true;
      }
    );
  });

  test("AuthService.login rejects non-existent email with HTTP 401", async () => {
    const mockPrisma = {
      admin: {
        findUnique: async () => null,
      },
    } as any;

    const authService = new AuthService(mockPrisma);

    await assert.rejects(
      async () => {
        await authService.login("unknown@shors.in", TEST_PASSWORD);
      },
      (err: any) => {
        assert.ok(err instanceof ApiError);
        assert.equal(err.statusCode, 401);
        assert.equal(err.message, "Invalid email or password");
        return true;
      }
    );
  });

  test("Password reset safety validations: password length and existence requirements", () => {
    const validateResetPasswordInput = (password: string | undefined) => {
      if (!password) {
        throw new Error("ADMIN_RESET_PASSWORD is required");
      }
      if (password.length < 8) {
        throw new Error("Password must be at least 8 characters long");
      }
      return true;
    };

    assert.throws(() => validateResetPasswordInput(undefined), /is required/);
    assert.throws(() => validateResetPasswordInput(""), /is required/);
    assert.throws(() => validateResetPasswordInput("short"), /at least 8 characters/);
    assert.equal(validateResetPasswordInput("LongEnoughPass123!"), true);
  });
});
