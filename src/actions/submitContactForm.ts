'use server';

import { discordNewError, discordNewMessage } from '@/libs/discord/actions';
import { dbPostContact } from '@/libs/supabase/actions';
import { ContactSchema, type ContactInput } from '@/validation/contactForm';

export type ContactActionState = {
  ok: boolean;
  message?: string;
  fieldErrors?: Partial<Record<keyof ContactInput, string[]>>;
  values?: Partial<ContactInput>;
};

export async function submitContactForm(
  _prevState: ContactActionState | undefined,
  formData: FormData
): Promise<ContactActionState> {
  try {
    // Extract form bindings and convert to database schema naming
    const values: ContactInput = {
      first_name: (formData.get('firstName') || '').toString().trim(),
      last_name: (formData.get('lastName') || '').toString().trim(),
      email: (formData.get('email') || '').toString().trim(),
      subject: (formData.get('subject') || '').toString().trim(),
      message: (formData.get('message') || '').toString().trim(),
      hp: (formData.get('hp') || '').toString(),
    };

    // Validate inputs
    const parsed = ContactSchema.safeParse(values);
    if (!parsed.success) {
      const { fieldErrors } = parsed.error.flatten();

      // HP triggered indicating a bot
      if (fieldErrors.hp) {
        return { ok: true, message: "We will contact you soon!" }
      }

      return { ok: false, fieldErrors };
    }

    // TODO: (future me) verify reCAPTCHA here:
    // const token = formData.get("g-recaptcha-response")?.toString();
    // if (!(await verifyCaptcha(token))) return { ok:false, message:"Captcha failed" };

    // Pass contact details to db handler
    const dbResult = await dbPostContact(parsed.data)
    if (!dbResult) {
      await discordNewError("Unable to write to database")
      return { ok: false, message: "Unable to store your request, an admin has been notified" }
    }

    // Form was successfully submitted
    await discordNewMessage(parsed.data)
    return { ok: true, message: `We will get in touch as soon as possible ${dbResult.first_name}!`, values };
  } catch (err) {
    await discordNewError("An unknown error occured")
    return { ok: false, message: "An unknown error occured and an admin has been notified" }
  }
}
