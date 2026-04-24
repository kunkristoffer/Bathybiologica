// lib/privacySchema.ts
import { z } from "zod";

export const PrivacyMetaSchema = z.object({
  type: z.literal("meta"),
  text: z.string(),
});

export const PrivacyParagraphSchema = z.object({
  type: z.literal("paragraph"),
  text: z.string(),
});

export const PrivacyReasonSchema = z.object({
  type: z.literal("reason"),
  what: z.string(),
  why: z.string(),
  how: z.string(),
});

export const PrivacyBlockSchema = z.union([
  PrivacyMetaSchema,
  PrivacyParagraphSchema,
  PrivacyReasonSchema,
]);

export const PrivacySectionNodeSchema: z.ZodType<any> = z.object({
  id: z.string(),
  title: z.string(),
  index: z.array(z.number()).optional(),
  level: z.number().optional(),
  content: z.array(PrivacyBlockSchema),
  children: z.lazy(() => z.array(PrivacySectionNodeSchema)).optional(),
});

export const PrivacyMessagesSchema = z.object({
  static: z.object({
    what: z.string(),
    why: z.string(),
    how: z.string(),
  }),
  sections: z.array(PrivacySectionNodeSchema),
});
