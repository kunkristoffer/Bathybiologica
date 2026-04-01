'use server';

import { discordNewError, discordNewContact } from '@/libs/discord/actions';
import { verifyRecaptcha } from '@/libs/recaptcha/verify';
import { dbPostContact } from '@/libs/supabase/contact/actions';
import { ContactSchema, type ContactInput } from '@/validation/contactForm';

export type ContactActionState = {
  ok: boolean;
  message?: string;
  fieldErrors?: Partial<Record<keyof ContactInput, string[]>>;
  values?: Partial<ContactInput>;
};

export async function submitContactForm(
  _prevState: ContactActionState | undefined,
  formData: FormData,
): Promise<ContactActionState> {
  try {
    // Extract form bindings and convert to database schema naming
    const values: ContactInput = {
      first_name: (formData.get('firstName') || '').toString().trim(),
      last_name: (formData.get('lastName') || '').toString().trim(),
      email: (formData.get('email') || '').toString().trim(),
      subject: (formData.get('subject') || '').toString().trim(),
      message: (formData.get('message') || '').toString().trim(),
      consent: (formData.get('consent')) === "on",
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

      // Formdata missing, returning vales so user can correct them
      return { ok: false, fieldErrors, values };
    }

    // Extract reCAPTCHA
    const recaptchaToken = (formData.get('recaptchaToken') || '').toString().trim();
    const recaptcha = await verifyRecaptcha({
      token: recaptchaToken,
      expectedAction: 'submit',
      minScore: 0.5,
    });

    if (!recaptcha.ok) {
      // Recaptcha failed, but for now we'll let them through cause the messages are funny
      await discordNewContact(parsed.data, { isSpam: true, reason: `reCaptcha gave this submission a score of ${recaptcha.score} / 1.0` })
      return { ok: false, message: "We will contact you soon!" }
    }

    // Pass contact details to db handler
    const { error } = await dbPostContact(parsed.data)
    if (error) {
      // await discordNewContact(parsed.data, { reason: error.message })
      await discordNewError(`Contact form database error: ${JSON.stringify(error)}`)
      return { ok: false, message: "Unable to store your request, an admin has been notified" }
    }

    // Form was successfully submitted
    await discordNewContact(parsed.data)
    return { ok: true, message: `We will get in touch as soon as possible ${parsed.data.first_name}!`, values };
  } catch (error) {
    await discordNewError(`Contact form unknown error: ${typeof error === "string" ? error : JSON.stringify(error)}`)
    return { ok: false, message: "An error occurred while handling your request, an admin has been notified" }
  }
}
