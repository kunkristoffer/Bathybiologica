import { DiscordBody, DiscordEmbeds, DiscordEmbedsField } from "@/types/discord.types"

export class DiscordHook {
  private webhookUrl: string = ""
  private embeds: DiscordEmbeds[] = []
  private body: DiscordBody = {}

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
  embed({ title, color, fields }: { title?: string, color?: string | number, fields: DiscordEmbedsField[] }) {
    const fieldsSliced = fields.slice(0, 25)

    if (fieldsSliced) {
      this.embeds.push({
        title,
        color,
        fields: fieldsSliced
      })
    }

    return this
  }

  /** Finalizes and sends webhook */
  async send() {
    try {
      // Validate that hook has postable content
      if (this.embeds.length === 0 || this.embeds.length > 10) {
        throw new Error("Hooks must contain at least one embed as message, or max 10")
      }

      // Build payload
      const payload: DiscordBody = {
        ...this.body,
        embeds: this.embeds,
      }

      // Send message
      const response = await fetch(this.webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),
        cache: "no-store"
      })

      // Check for ok response to validate successful submission
      if (!response.ok) {
        const text = await response.text().catch(() => "");
        throw new Error(`An error occured when proccessing fetch in discordHook: ${response.statusText} - ${text}`)
      }
    } catch (err) {
      console.error(err)
    }
  }
}
