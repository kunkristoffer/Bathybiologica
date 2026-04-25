// lib/privacySchema.ts
import { CountResult, PrivacyMessages, PrivacySectionNode } from "@/types/legal/privacy.types";
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

export function countPrivacyStats(data: PrivacyMessages): CountResult {
  const result: CountResult = {
    sections: 0,
    paragraphs: 0,
    reasons: 0,
    meta: 0,
    totalBlocks: 0,
  }

  function traverse(node: PrivacySectionNode) {
    result.sections++

    for (const block of node.content) {
      result.totalBlocks++

      switch (block.type) {
        case "paragraph":
          result.paragraphs++
          break
        case "reason":
          result.reasons++
          break
        case "meta":
          result.meta++
          break
      }
    }

    if (node.children) {
      for (const child of node.children) {
        traverse(child)
      }
    }
  }

  for (const section of data.sections) {
    traverse(section)
  }

  return result
}
