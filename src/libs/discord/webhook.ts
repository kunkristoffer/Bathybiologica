import { DiscordBody, DiscordEmbeds } from "@/types/discord.types"

export class DiscordHook {
  private static readonly MAX_EMBEDS_PER_HOOK = 10
  private static readonly MAX_FIELDS_PER_EMBED = 25

  private webhookUrl: string = ""
  body: DiscordBody = {}

  constructor(url: string) {
    if (!url || url.length === 0) {
      throw new Error("DiscordHook class called without a webhook url")
    }
    this.webhookUrl = url
  }

  /** Add a message to the webhook, will be displayed before any embeds */
  message(message: string) {
    this.body.content = message
    return this
  }

  /** Embed a block to the webhook, each block can contain 25 fields */
  embed({ title, color, fields }: DiscordEmbeds) {
    if (fields.length > DiscordHook.MAX_FIELDS_PER_EMBED) {
      throw new Error("Discord webhook embed called with too many items, max is 25")
    }

    this.body.embeds ??= []
    if (this.body.embeds.length >= DiscordHook.MAX_EMBEDS_PER_HOOK) {
      throw new Error("Discord webhook messages can contain a maximum of 10 embeds")
    }

    this.body.embeds.push({ title, color, fields })

    return this
  }

  /** Mute notifications for the webhook, basically adds `@silent` mode */
  mute() {
    this.body.flags = 4096
  }

  /** Finalizes and sends webhook */
  async send() {
    try {
      // Validate that hook has content
      if (!this.body.content || !this.body.embeds?.length) throw new Error("Discord webhook called without message or embeds")

      // Send message
      const response = await fetch(this.webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this.body),
        cache: "no-store"
      })

      // Check for ok response to validate successful submission
      if (!response.ok) {
        const text = await response.text().catch(() => "");
        throw new Error(`An error occurred when processing fetch in discordHook: ${response.statusText} - ${text}`)
      }

      return response
    } catch (err) {
      console.error(err)
    }
  }
}
