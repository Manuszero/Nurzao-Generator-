import { describe, expect, it } from "vitest";
import { generateContentWithForgeAPI } from "./ai";

describe("AI Content Generation", { timeout: 15000 }, () => {
  it("should generate content with valid input", async () => {
    const input = {
      contentType: "article" as const,
      topic: "Artificial Intelligence",
      contentLength: "medium" as const,
      tone: "professional",
      language: "en",
    };

    const content = await generateContentWithForgeAPI(input);
    
    expect(content).toBeDefined();
    expect(content.length).toBeGreaterThan(0);
    expect(typeof content).toBe("string");
    expect(content).toContain("Artificial Intelligence");
  });

  it("should generate social media post", async () => {
    const input = {
      contentType: "social_post" as const,
      topic: "Machine Learning",
      contentLength: "short" as const,
      tone: "casual",
      language: "en",
    };

    const content = await generateContentWithForgeAPI(input);
    
    expect(content).toBeDefined();
    expect(content.length).toBeGreaterThan(0);
    expect(content).toContain("Machine Learning");
  });

  it("should generate product description", async () => {
    const input = {
      contentType: "product_description" as const,
      topic: "Smart Watch",
      contentLength: "long" as const,
      tone: "persuasive",
      language: "en",
    };

    const content = await generateContentWithForgeAPI(input);
    
    expect(content).toBeDefined();
    expect(content.length).toBeGreaterThan(0);
    expect(content).toContain("Smart Watch");
  });

  it("should handle Arabic language", async () => {
    const input = {
      contentType: "article" as const,
      topic: "الذكاء الاصطناعي",
      contentLength: "medium" as const,
      tone: "professional",
      language: "ar",
    };

    const content = await generateContentWithForgeAPI(input);
    
    expect(content).toBeDefined();
    expect(content.length).toBeGreaterThan(0);
  });

  it("should handle different content lengths", async () => {
    const lengths = ["short", "medium", "long"] as const;
    
    for (const length of lengths) {
      const input = {
        contentType: "article" as const,
        topic: "Test Topic",
        contentLength: length,
        tone: "professional",
        language: "en",
      };

      const content = await generateContentWithForgeAPI(input);
      expect(content).toBeDefined();
      expect(content.length).toBeGreaterThan(0);
    }
  });
});
