import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import {
  getUserContentHistory,
  saveGeneratedContent,
  deleteGeneratedContent,
} from "./db";
import { generateContentWithForgeAPI } from "./ai";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  content: router({
    generate: protectedProcedure
      .input(
        z.object({
          contentType: z.enum(["article", "social_post", "product_description"]),
          topic: z.string().min(1),
          contentLength: z.enum(["short", "medium", "long"]),
          tone: z.string().default("professional"),
          language: z.string().default("en"),
        })
      )
      .mutation(async ({ ctx, input }) => {
        try {
          const generatedText = await generateContentWithForgeAPI(input);
          
          await saveGeneratedContent(
            ctx.user.id,
            input.contentType,
            input.topic,
            input.contentLength,
            generatedText,
            input.tone,
            input.language
          );
          
          return { success: true, content: generatedText };
        } catch (error) {
          console.error("Content generation error:", error);
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to generate content" });
        }
      }),
    
    history: protectedProcedure
      .input(z.object({ limit: z.number().default(20) }).optional())
      .query(async ({ ctx, input }) => {
        return await getUserContentHistory(ctx.user.id, input?.limit ?? 20);
      }),
    
    delete: protectedProcedure
      .input(z.object({ contentId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        await deleteGeneratedContent(input.contentId, ctx.user.id);
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
