import { DiscordHook } from '@/libs/discord/webhook'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

describe("Discord webhook client", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("Throws when constructed without url", () => {
    expect(() => new DiscordHook("")).toThrow("DiscordHook class called without a webhook url")
  })

  it("Supports adding message and embeds", () => {
    const hook = new DiscordHook("url")
    const result = hook
      .message('Test message')
      .embed({
        title: 'Test submission',
        color: 12345,
        fields: [{ name: 'Name', value: 'Tester' }],
      });

    expect(result).toBe(hook)
  })
})
