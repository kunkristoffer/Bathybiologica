import { DiscordHook } from "@/libs/discord/webhook";
import { Contact } from "@/validation/contactForm";

export async function discordNewMessage(form: Contact) {
  try {
    const url = process.env.DISCORD_WEBHOOK!
    const hook = new DiscordHook(url)

    hook
      .message("Contact us form has been used!")
      .embed({
        color: 1127128,
        fields: [
          { name: "Name", value: `${form.first_name} ${form.last_name}`, inline: true },
          { name: "Email", value: form.email, inline: true },
          { name: "Subject", value: form.subject },
          { name: "Message", value: form.message }
        ]
      })
      .send()
  } catch (err) {
    console.log(err)
  }
}

export async function discordNewError(message: string) {
  try {
    const url = process.env.DISCORD_WEBHOOK!
    const hook = new DiscordHook(url)

    hook
      .message("An error occured when the contact us form was used!")
      .embed({
        color: 16711680,
        fields: [
          { name: "Reason", value: message }
        ]
      })
      .send()
  } catch (err) {
    console.log(err)
  }
}
