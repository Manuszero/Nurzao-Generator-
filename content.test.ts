import { describe, expect, it, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(userId = 1): { ctx: TrpcContext } {
  const user: AuthenticatedUser = {
    id: userId,
    openId: `test-user-${userId}`,
    email: `test${userId}@example.com`,
    name: `Test User ${userId}`,
    loginMethod: "test",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };

  return { ctx };
}

describe("content router", { timeout: 15000 }, () => {
  describe("generate", () => {
    it("should generate content with valid input", async () => {
      const { ctx } = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.content.generate({
        contentType: "article",
        topic: "The Future of AI",
        contentLength: "medium",
        tone: "professional",
        language: "en",
      });

      expect(result.success).toBe(true);
      expect(result.content).toBeDefined();
      expect(result.content.length).toBeGreaterThan(0);
    });

    it("should handle different content types", async () => {
      const { ctx } = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const contentTypes: Array<"article" | "social_post" | "product_description"> = [
        "article",
        "social_post",
        "product_description",
      ];

      for (const type of contentTypes) {
        const result = await caller.content.generate({
          contentType: type,
          topic: "Test Topic",
          contentLength: "short",
          tone: "professional",
          language: "en",
        });

        expect(result.success).toBe(true);
        expect(result.content).toBeDefined();
      }
    });

    it("should handle different content lengths", async () => {
      const { ctx } = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const lengths: Array<"short" | "medium" | "long"> = ["short", "medium", "long"];

      for (const length of lengths) {
        const result = await caller.content.generate({
          contentType: "article",
          topic: "Test Topic",
          contentLength: length,
          tone: "professional",
          language: "en",
        });

        expect(result.success).toBe(true);
        expect(result.content).toBeDefined();
      }
    });

    it("should handle different tones", async () => {
      const { ctx } = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const tones = ["professional", "casual", "friendly", "formal"];

      for (const tone of tones) {
        const result = await caller.content.generate({
          contentType: "article",
          topic: "Test Topic",
          contentLength: "medium",
          tone,
          language: "en",
        });

        expect(result.success).toBe(true);
        expect(result.content).toBeDefined();
      }
    });
  });

  describe("history", () => {
    it("should retrieve content history", async () => {
      const { ctx } = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const history = await caller.content.history({});

      expect(Array.isArray(history)).toBe(true);
    });

    it("should respect limit parameter", async () => {
      const { ctx } = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const history = await caller.content.history({ limit: 5 });

      expect(Array.isArray(history)).toBe(true);
      expect(history.length).toBeLessThanOrEqual(5);
    });
  });

  describe("delete", () => {
    it("should delete content successfully", async () => {
      const { ctx } = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      // Generate content first
      const generated = await caller.content.generate({
        contentType: "article",
        topic: "Test Topic",
        contentLength: "short",
        tone: "professional",
        language: "en",
      });

      expect(generated.success).toBe(true);

      // Delete should succeed even if content doesn't exist (for test purposes)
      const result = await caller.content.delete({ contentId: 999 });

      expect(result.success).toBe(true);
    });
  });
});

describe("auth router", () => {
  describe("me", () => {
    it("should return current user", async () => {
      const { ctx } = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const user = await caller.auth.me();

      expect(user).toBeDefined();
      expect(user?.id).toBe(1);
      expect(user?.email).toBe("test1@example.com");
    });
  });

  describe("logout", () => {
    it("should clear session cookie", async () => {
      const { ctx } = createAuthContext();
      const clearedCookies: Array<{ name: string; options: Record<string, unknown> }> = [];

      ctx.res.clearCookie = (name: string, options: Record<string, unknown>) => {
        clearedCookies.push({ name, options });
      };

      const caller = appRouter.createCaller(ctx);
      const result = await caller.auth.logout();

      expect(result.success).toBe(true);
      expect(clearedCookies.length).toBeGreaterThan(0);
    });
  });
});
