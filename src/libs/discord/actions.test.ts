import { DiscordHook } from '@/libs/discord/webhook'
import { DiscordEmbeds } from '@/types/discord.types';
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

    const message = "Test message"
    hook.message(message)
    expect(hook.body.content).toBe(message)

    const embed = {
      title: 'Test submission',
      color: 12345,
      fields: [{ name: 'Test', value: 'Tester' }],
    }
    hook.embed(embed);
    expect(hook.body.embeds).toContainEqual(embed)
  })

  it("Throws when adding more than 25 fields at a time", () => {
    const hook = new DiscordHook("url")

    const fields = Array.from(Array(26), (x) => ({ name: 'Test', value: 'Tester' }))
    const embeds = {
      title: 'Test submission',
      color: 12345,
      fields,
    }

    expect(() => hook.embed(embeds)).toThrow("Discord webhook embed called with too many items, max is 25")
  })

  it("Throws when adding more than 10 embeds", () => {
    const hook = new DiscordHook("url")

    const embed = {
      title: 'Test submission',
      color: 12345,
      fields: [{ name: "Test", value: "Message" }]
    }

    const EMBEDS_LIMIT = 10
    for (let i = 0; i < EMBEDS_LIMIT; i++) {
      hook.embed(embed)
    }

    expect(() => hook.embed(embed)).toThrow("Discord webhook messages can contain a maximum of 10 embeds")
  })
})
