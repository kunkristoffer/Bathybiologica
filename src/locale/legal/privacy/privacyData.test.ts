import type { CountResult, PrivacyMessages, PrivacySectionNode } from "@/types/legal/privacy.types";
import { countPrivacyStats, PrivacyMessagesSchema } from "./privacyDataSchema";
import { describe, it, expect } from "vitest";

import NO from "./no.json";
import EN from "./en.json";

describe("Legal > Privacy JSON data", () => {
  it("Norwegian", () => {
    const result = PrivacyMessagesSchema.safeParse(NO);

    if (!result.success) {
      console.error(result.error.format());
    }

    expect(result.success).toBe(true);
  });
  it("English", () => {
    const result = PrivacyMessagesSchema.safeParse(EN);

    if (!result.success) {
      console.error(result.error.format());
    }

    expect(result.success).toBe(true);
  });
  it("Matching data", () => {
    const countNo = countPrivacyStats(NO as PrivacyMessages)
    const countEn = countPrivacyStats(EN as PrivacyMessages)
    expect(countNo).toStrictEqual(countEn);
  })
});
