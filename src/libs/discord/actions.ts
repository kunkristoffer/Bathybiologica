import { DiscordHook } from "@/libs/discord/webhook";
import { Contact } from "@/validation/contactForm";

interface NewContactOptional {
  isSpam?: boolean,
  reason: string
}

export async function discordNewContact(form: Contact, options?: NewContactOptional) {
  try {
    const hook = new DiscordHook()

    hook.message("Contact us form has been used!")
    hook.embed({
      color: 1127128,
      fields: [
        { name: "Name", value: `${form.first_name} ${form.last_name}`, inline: true },
        { name: "Email", value: form.email, inline: true },
        { name: "Subject", value: form.subject },
        { name: "Message", value: form.message }
      ]
    })

    if (options?.isSpam) {
      hook.message("Contact us form has been used, but it looks like spam!")
      hook.mute()
    }

    if (options?.reason) {
      hook.embed({
        color: 16711680,
        fields: [
          { name: "Reason", value: options.reason }
        ]
      })
    }

    await hook.send()
  } catch (err) {
    throw err
  }
}

export async function discordNewError(message: string) {
  try {
    const hook = new DiscordHook()

    hook
      .message("An error occurred when the contact us form was used!")
      .embed({
        color: 16711680,
        fields: [
          { name: "Reason", value: message }
        ]
      })

    await hook.send()
  } catch (err) {
    console.error(err)
  }
}
