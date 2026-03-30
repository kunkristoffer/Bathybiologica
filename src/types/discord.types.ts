export interface DiscordBody {
  username?: string,
  avatar_url?: string,
  content?: string,
  embeds?: DiscordEmbeds[]
}

export interface DiscordEmbeds {
  title?: string
  /** Discord uses decimal instead of hex */
  color?: number
  fields: DiscordEmbedsField[]
}

export interface DiscordEmbedsField {
  name: string
  value: string
  inline?: boolean
}
