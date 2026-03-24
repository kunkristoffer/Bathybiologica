import type { DiscordEmbeds, DiscordEmbedsField } from '@/types/discord.types';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'
import { http, HttpResponse } from "msw"
import { setupServer } from "msw/node"
import { DiscordHook } from '@/libs/discord/webhook'

const webhookUrl = process.env.TEST_DISCORD_WEBHOOK!
const server = setupServer()

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

// Close server after all tests
afterAll(() => server.close())

// Reset handlers after each test for test isolation
afterEach(() => server.resetHandlers())


describe("Discord webhook client", () => {
  it("Throws when constructed without url", () => {
    expect(() => new DiscordHook("")).toThrow("DiscordHook class called without a webhook url")
  })

  it("Supports adding message and embeds", () => {
    const hook = new DiscordHook(webhookUrl)

    const message = "Test message"
    hook.message(message)
    expect(hook.body.content).toBe(message)

    const embed: DiscordEmbeds = {
      title: 'Test submission',
      color: 12345,
      fields: [{ name: 'Test', value: 'Tester' }],
    }
    hook.embed(embed);
    expect(hook.body.embeds).toContainEqual(embed)
  })

  it("Throws when adding more than 25 fields at a time", () => {
    const hook = new DiscordHook(webhookUrl)

    const fields: DiscordEmbedsField[] = Array.from(Array(26), (x) => ({ name: 'Test', value: 'Tester' }))
    const embeds: DiscordEmbeds = {
      title: 'Test submission',
      color: 12345,
      fields,
    }

    expect(() => hook.embed(embeds)).toThrow("Discord webhook embed called with too many items, max is 25")
  })

  it("Throws when adding more than 10 embeds", () => {
    const hook = new DiscordHook(webhookUrl)

    const embed: DiscordEmbeds = {
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

  it("Constructs and sends valid payload", () => {
    const hook = new DiscordHook(webhookUrl)
  })
})
